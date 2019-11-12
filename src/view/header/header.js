import React from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBModal, MDBModalHeader, MDBModalBody,
        MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import './header.css'
import Login from '../../component/login/login';
import {connect} from "react-redux";
import { logout } from '../../reducer/authenticate'


const mapStateToProps = (state) => {
  return {
    authenticate : state.authenticate,
    language : state.language,
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => {
        dispatch(logout())
      }
    }
  }

class Header extends React.Component {
    state = {
        isOpen: false,
        modal: false
    }
      
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }
      
    toggle = () => {
        this.setState({
          modal: !this.state.modal
        })
    }
      
      
    render () {
        return (
            <header id="headerNavbar">
                <MDBModal isOpen={this.state.modal && this.props.authenticate.authenticate === "false"} toggle={this.toggle}>
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
                    {
                        this.props.authenticate.authenticate === "false" ?
                        <React.Fragment>
                            <MDBNavItem>
                                <a className="border border-light rounded mr-1 nav-link Ripple-parent" rel="noopener noreferrer" href="/create-profile">Je suis freelance</a>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink onClick={this.toggle} className="meConnecter" to="#">Me connecter</MDBNavLink>
                            </MDBNavItem>
                        </React.Fragment>
                        : ""
                    }
                    {
                        this.props.authenticate.role === "freelance" ?
                        <React.Fragment>
                            <MDBNavItem>
                                <MDBNavLink className="meConnecter" to="/missions">Missions</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink className="meConnecter" to="/dashboard/freelancer">Dashboard</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink className="meConnecter" to="/analytics/views">Statistiques</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink className="meConnecter" to="/messages">Messages</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle className="pt-0 dopdown-toggle" nav>
                                        <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" className="rounded-circle z-depth-0"
                                            style={{ height: "35px", padding: 0 }} alt="" />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" right>
                                        <MDBDropdownItem href="/parametres">Parametres</MDBDropdownItem>
                                        <MDBDropdownItem href="#" onClick={this.props.logout}>Log out</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </React.Fragment>
                        : ""
                    }
                </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        </header>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)