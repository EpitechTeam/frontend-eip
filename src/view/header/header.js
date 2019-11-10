import React from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse } from "mdbreact";
import './header.css'

class Header extends React.Component {
    state = {
        isOpen: false
      };
      
      toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
      }
      
    render () {
        return (
            <header id="headerNavbar">
                <MDBNavbar color="light-blue lighten-5" dark expand="md">
                <a href="/" title="home">
                    <MDBNavbarBrand>
                    <strong className="white-text">EIP</strong>
                    </MDBNavbarBrand>
                </a>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                <MDBNavbarNav right>
                    <MDBNavItem className="borderNavItem">
                        <MDBNavLink className="linkNavbar" to="/partenaire">Je suis freelance</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem className="borderNavItem">
                        <MDBNavLink className="linkNavbar" to="/proprietaire">Chercher un partenaire</MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        </header>
        )
    }
}

export default Header