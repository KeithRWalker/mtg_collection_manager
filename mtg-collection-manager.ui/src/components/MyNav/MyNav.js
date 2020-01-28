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
  InputGroupAddon,
  Button
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

import auth from '../../auth/auth';

import './MyNav.scss';

class MyNav extends React.Component {
  state = {
    collapsed: true
  }
  toggleNavbar = () => this.setState({ collapsed: !this.state.collapsed });

  logoutClickEvent = (e) => {
    e.preventDefault();
    auth.logoutUser()
    this.props.logout();
  };

  render() {
    const { collapsed } = this.state;
    const { authed } = this.props;
    let navItems;
    if(authed){
                  /*  LOGGED IN DROPDOWN  */
      navItems =  <DropdownMenu left>
                    <DropdownItem >
                      <NavLink tag={RRNavLink} to="/home">Account</NavLink>
                    </DropdownItem>
                      <DropdownItem divider />
                    <DropdownItem>
                    <NavLink tag={RRNavLink} to="/landingPage" onClick={this.logoutClickEvent}>Logout</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
    }
        
    else{
                  /*  LOGGED OUT DROP DOWN   */
      navItems =  <DropdownMenu left>
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
              <NavItem className="col-1">
                <NavLink tag={RRNavLink} to="/browse/1">
                  Browse
                </NavLink>
              </NavItem>
              <NavItem className="col-1">
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
                <Input className ="search-bar"/>
                  <InputGroupAddon className="" addonType="append">
                    <Button className="">
                      Search
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </NavItem>
              
              <NavItem className="col-3">
                <ButtonDropdown nav isOpen={!collapsed} toggle={this.toggleNavbar} className="">
                  <DropdownToggle caret className="dropdown-account">
                    Account
                  </DropdownToggle>
                  {navItems}
                </ButtonDropdown>
              </NavItem>
            </Nav>

            {/* --  LOGIN/REGISTER/ACCOUNT DROPDOWN  -- */}
        </Navbar>
      </div>
    );
  }
}

export default MyNav;
