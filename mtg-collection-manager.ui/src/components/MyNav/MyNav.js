import React from 'react';


import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBNav,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdown,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFormInline,
  MDBAnimation
} from "mdbreact";
import { NavLink as RRNavLink } from 'react-router-dom';

import auth from '../../auth/auth';

import './MyNav.scss';

const defaultSearchValue = '';

class MyNav extends React.Component {
  state = {
    navCollapsed: true,
    searchParams: defaultSearchValue,
    fireRedirect: false,
    collapseID: "",
  }
  toggleNavbar = () => this.setState({ navCollapsed: !this.state.navCollapsed });

  updateSearch = (e) => this.setState({ searchParams: e.target.value })

  toggleCollapse = collapseID => () =>
  this.setState(prevState => ({
    collapseID: prevState.collapseID !== collapseID ? collapseID : ""
  }));

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
      navItems =  <MDBDropdownMenu>
                    <MDBDropdownItem>
                      <MDBNavLink to="/home">Account</MDBNavLink>
                    </MDBDropdownItem>
                      <MDBDropdownItem divider />
                    <MDBDropdownItem className="nav-dd-item">
                    <MDBNavLink className="navbar-nav-link" tag={RRNavLink} to="/landingPage" onClick={this.logoutClickEvent}>Logout</MDBNavLink>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
    } else{
                  /*  LOGGED OUT DROP DOWN   */
      navItems =  <MDBDropdownMenu right className="nav-dd-menu">
                    <MDBDropdownItem className="nav-dd-item">
                      <MDBNavLink className="navbar-nav-link" tag={RRNavLink} to="/login">Login</MDBNavLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem className="nav-dd-item">
                      <MDBNavLink className="navbar-nav-link" tag={RRNavLink} to="/registerUser">Register</MDBNavLink>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
    }

    return (
      <div className="MyNav">
        <MDBNavbar dark expand="md" fixed="top">
          <MDBContainer>
            <MDBNav navbar className="col">
              <MDBNavbarBrand className="col-1" href="#"><MDBNavLink to={authed ? "/home" : "/landingpage"}><strong>MTG Binder</strong></MDBNavLink></MDBNavbarBrand>
              {/* --  NAVIGATION BROWSE/DECKS  -- */}
             {
                  /*<MDBNavItem className="col-2">
                  <MDBNavLink className="navbar-nav-link" tag={RRNavLink} to="/browse">
                    Browse
                  </MDBNavLink>
                </MDBNavItem>*/
             }

                <MDBNavItem className="col-2">
                  <MDBNavLink className="navbar-nav-link" tag={RRNavLink} to="/decks">
                    Decks
                  </MDBNavLink>
                </MDBNavItem>

                <MDBNavItem className="col-2">
                  <MDBNavLink className="navbar-nav-link" tag={RRNavLink} to="/binders">
                    Binders
                  </MDBNavLink>
                </MDBNavItem>
                
                <MDBNavItem className="col-2">
                  <MDBNavLink className="navbar-nav-link" tag={RRNavLink} to="/search">
                    Search
                  </MDBNavLink>
                </MDBNavItem>

                <MDBDropdown>
                  <MDBDropdownToggle nav caret isOpen={!navCollapsed} toggle={this.toggleNavbar}>
                    <div className="d-none d-md-inline">Account</div>
                  </MDBDropdownToggle>
                  {navItems}
                </MDBDropdown>
              </MDBNav>
            </MDBContainer>
        </MDBNavbar>

        {/*fireRedirect && (
          <Redirect to={searchUrl}/>
        )*/}
      </div>
    );
  }
}

export default MyNav;

