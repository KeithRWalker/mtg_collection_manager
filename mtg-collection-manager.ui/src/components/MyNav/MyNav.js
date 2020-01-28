import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonDropdown,
  Input,
  InputGroup,
  Button,
  Form
} from 'reactstrap';
import { NavLink as RRNavLink, Redirect } from 'react-router-dom';

import auth from '../../auth/auth';

import './MyNav.scss';

const defaultSearchValue = '';

class MyNav extends React.Component {
  state = {
    collapsed: true,
    searchParams: defaultSearchValue,
    fireRedirect: false,
  }
  toggleNavbar = () => this.setState({ collapsed: !this.state.collapsed });

  updateSearch = (e) => this.setState({ searchParams: e.target.value })

  searchSubmit = () => {
    this.setState({ fireRedirect: true });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.setState({ fireRedirect: true });
    }
  }

  logoutClickEvent = (e) => {
    e.preventDefault();
    auth.logoutUser()
    this.props.logout();
  };



  render() {
    const { collapsed, searchParams, fireRedirect } = this.state;
    //const { from } = this.props.location.state || '/';
    const searchUrl = `/search/${searchParams.replace(/\s/g,'+')}`;
    const { authed } = this.props;
    let navItems;
    if(authed){
                  /*  LOGGED IN DROPDOWN  */
      navItems =  <DropdownMenu>
                    <DropdownItem >
                      <NavLink tag={RRNavLink} to="/home">Account</NavLink>
                    </DropdownItem>
                      <DropdownItem divider />
                    <DropdownItem>
                    <NavLink tag={RRNavLink} to="/landingPage" onClick={this.logoutClickEvent}>Logout</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
    } else{
                  /*  LOGGED OUT DROP DOWN   */
      navItems =  <DropdownMenu>
                    <DropdownItem>
                      <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink tag={RRNavLink} to="/registerUser">Register</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
    }

    return (
      <div className="MyNav">
        <Navbar className="row wrap" expand="lg">
          
            <Nav navbar className="col">
            <NavbarBrand className="col-1" href="/">MTG Binder</NavbarBrand>
            {/* --  NAVIGATION BROWSE/DECKS  -- */}
              <NavItem className="col-2">
                <NavLink tag={RRNavLink} to="/browse">
                  Browse
                </NavLink>
              </NavItem>
              <NavItem className="col-2">
                <NavLink href="/decks">
                  Decks
                </NavLink>
              </NavItem>
              <NavItem className="col-2">
                <NavLink href="/user/collection">
                  Your Collection
                </NavLink>
              </NavItem>

              {/* --  SEARCH BAR  -- */}
              <NavItem className="col-5">
              
                <InputGroup className="">
                <Input
                  className ="search-bar"
                  type="search"
                  name="navSearch"
                  id="navSearch"
                  placeholder="Search"
                  value={searchParams}
                  onChange={this.updateSearch}
                  onKeyPress={this.handleKeyPress}
                  />
                    <Button
                      className="search-bar-submit"
                      type="search"
                      onClick={this.searchSubmit}>
                      Search
                    </Button>
                </InputGroup>
              </NavItem>
            </Nav>

            {/* --  LOGIN/REGISTER/ACCOUNT DROPDOWN  -- */}
            <Nav>
            <NavItem className="col-3">
            <ButtonDropdown nav isOpen={!collapsed} toggle={this.toggleNavbar} className="">
              <DropdownToggle caret className="dropdown-account">
                Account
              </DropdownToggle>
              {navItems}
            </ButtonDropdown>
          </NavItem>
            </Nav>
        </Navbar>

        {fireRedirect && (
          <Redirect to={searchUrl}/>
        )}
      </div>
    );
  }
}

export default MyNav;
