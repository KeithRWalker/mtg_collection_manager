import React from 'react';

import {
    //Collapse,
    Navbar,
    //NavbarToggler,
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

import './MyNav.scss';

class MyNav extends React.Component {
    state = {
        collapsed: true
    }
    toggleNavbar = () => {
        this.setState({ collapsed: !this.state.collapsed });
    }

    render() {
        const { collapsed } = this.state;
        const { authed } = this.props;

        let navItems;

        if(authed){                             // LOGGED IN DROPDOWN
            navItems =  <DropdownMenu right>
                            <DropdownItem ><NavLink tag={RRNavLink} to="/home">Account</NavLink></DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem><NavLink tag={RRNavLink} to="/home">Logout</NavLink></DropdownItem>
                        </DropdownMenu>
        }
        
        else{                                   // LOGGED OUT DROP DOWN
            navItems =  <DropdownMenu right>
                            <DropdownItem><NavLink tag={RRNavLink} to="/home">Login</NavLink></DropdownItem>
                            <DropdownItem><NavLink tag={RRNavLink} to="/registerUser">Register</NavLink></DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem><NavLink tag={RRNavLink} to="/home">Login with Google</NavLink></DropdownItem>
                        </DropdownMenu>
        }

        return (
            <div className="MyNav">
                <Navbar color="dark" dark expand="lg">
                    <NavbarBrand href="/">MTG Binder</NavbarBrand>
                        <Nav navbar className="col-8">
{
                                    // -- NAVIGATION BROWSE/DECKS  -- //  
}
                            <NavItem className="col-1">
                                <NavLink href="/components/">
                                    Browse
                                </NavLink>
                            </NavItem>

                            <NavItem className="col-1">
                                <NavLink href="https://github.com/reactstrap/reactstrap">
                                    Decks
                                </NavLink>
                            </NavItem>
{ 
                                    // -- SEARCH BAR  -- //  
}
                            <NavItem className="col-12 mx-auto">
                                <InputGroup>
                                <Input />
                                    <InputGroupAddon addonType="append">
                                        <Button color="success">
                                            Search
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </NavItem>
                        </Nav>
{ 
                                    // -- LOGIN/REGISTER/ACCOUNT DROPDOWN -- //  
}
                        <Nav navbar className="col-1 ml-auto">
                            <ButtonDropdown nav isOpen={!collapsed} toggle={this.toggleNavbar} className="col-1 mx-auto">
                                <DropdownToggle caret color="info" className=""> Account </DropdownToggle>
                            {navItems}
                            </ButtonDropdown>
                        </Nav>
                </Navbar>
            </div>
        );
    }
}

export default MyNav;
