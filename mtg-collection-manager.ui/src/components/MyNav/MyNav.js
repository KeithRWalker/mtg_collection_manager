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
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

import auth from '../../auth/auth';

import './MyNav.scss';

const defaultSearchValue = '';

class MyNav extends React.Component {
  state = {
    navCollapsed: true,
    searchParams: defaultSearchValue,
    fireRedirect: false,
  }
  toggleNavbar = () => this.setState({ navCollapsed: !this.state.navCollapsed });

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
    const { navCollapsed } = this.state;
    //const searchUrl = `/search/${searchParams.replace(/\s/g,'+')}`;
    const { authed } = this.props;
    let navItems;
    if(authed){
                  /*  LOGGED IN DROPDOWN  */
      navItems =  <DropdownMenu right className="nav-dd-menu">
                    <DropdownItem className="nav-dd-item">
                      <NavLink className="navbar-nav-link" tag={RRNavLink} to="/home">Account</NavLink>
                    </DropdownItem>
                      <DropdownItem divider />
                    <DropdownItem className="nav-dd-item">
                    <NavLink className="navbar-nav-link" tag={RRNavLink} to="/landingPage" onClick={this.logoutClickEvent}>Logout</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
    } else{
                  /*  LOGGED OUT DROP DOWN   */
      navItems =  <DropdownMenu right className="nav-dd-menu">
                    <DropdownItem className="nav-dd-item">
                      <NavLink className="navbar-nav-link" tag={RRNavLink} to="/login">Login</NavLink>
                    </DropdownItem>
                    <DropdownItem className="nav-dd-item">
                      <NavLink className="navbar-nav-link" tag={RRNavLink} to="/registerUser">Register</NavLink>
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
                <NavLink className="navbar-nav-link" tag={RRNavLink} to="/browse">
                  Browse
                </NavLink>
              </NavItem>
              <NavItem className="col-2">
                <NavLink className="navbar-nav-link" tag={RRNavLink} to="/decks">
                  Decks
                </NavLink>
              </NavItem>
              <NavItem className="col-2">
                <NavLink className="navbar-nav-link" tag={RRNavLink} to="/binders">
                  Binders
                </NavLink>
              </NavItem>
              <NavItem className="col-2">
                <NavLink className="navbar-nav-link" tag={RRNavLink} to="/search">
                  Search
                </NavLink>
              </NavItem>
            </Nav>

            {/* --  LOGIN/REGISTER/ACCOUNT DROPDOWN  -- */}
            <Nav>
            <ButtonDropdown nav className="col-2 nav-dd" isOpen={!navCollapsed} toggle={this.toggleNavbar}>
              <DropdownToggle caret className="dd-account">
                Account
              </DropdownToggle>
              {navItems}
            </ButtonDropdown>
            </Nav>
        </Navbar>

        {/*fireRedirect && (
          <Redirect to={searchUrl}/>
        )*/}
      </div>
    );
  }
}

export default MyNav;
