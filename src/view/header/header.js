import React from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBModal, MDBModalHeader, MDBModalBody } from "mdbreact";
import './header.css'
import Login from '../../component/login/login';

class Header extends React.Component {
    state = {
        isOpen: false,
        modal: false
    };
      
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
      
    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }
      
      
    render () {
        return (
            <header id="headerNavbar">
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Connection</MDBModalHeader>
                    <MDBModalBody>
                        <Login/>
                    </MDBModalBody>
                </MDBModal>


                <MDBNavbar className="flexible-navbar" light expand="md">
                <a href="/" title="home">
                    <MDBNavbarBrand>
                    <strong className="black-text">EIP</strong>
                    </MDBNavbarBrand>
                </a>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                <MDBNavbarNav right>
                    <MDBNavItem>
                        <a className="border border-light rounded mr-1 nav-link Ripple-parent" rel="noopener noreferrer" href="/create-profile">Je suis freelance</a>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink onClick={this.toggle} className="meConnecter" to="#">Me connecter</MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        </header>
        )
    }
}

export default Header