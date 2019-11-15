import React from 'react'
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
} from "mdbreact";
import './header.css'
import Login from '../../component/login/login';
import {connect} from "react-redux";
import {logout} from '../../reducer/authenticate'

const mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        language: state.language,
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
        modal: false,
        whiteHeader: true
    };

    constructor(props) {
        super(props);

        if (typeof document !== "undefined") {
            window.onscroll = () => {
                if (this.isHomePage() && window.pageYOffset === 0) {
                    this.setState({
                        whiteHeader: false
                    });
                }
                if (window.pageYOffset >= 10) {
                    this.setState({
                        whiteHeader: true
                    });
                }
            };
        }
    }

    isHomePage = () => {
        if (typeof document !== "undefined")
            return (window.location.pathname === "/");
        return false;
    };

    componentDidMount() {
        if (this.isHomePage()) {
            this.setState({
                whiteHeader: false
            });
        }
    }

    setWhiteHeader = () => {
        if (typeof document !== "undefined") {
            document.getElementById("main-body").style.marginTop = "56px";
            this.setState({
                whiteHeader: true
            });
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps === this.props)
            return;
        if (!this.isHomePage()) {
            this.setState({
                whiteHeader: true
            });
        }
    }

    toggleCollapse = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        return (
            <header id="headerNavbar">
                <MDBModal isOpen={this.state.modal && this.props.authenticate.authenticate === "false"}
                          toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>Connection</MDBModalHeader>
                    <MDBModalBody>
                        <Login/>
                    </MDBModalBody>
                </MDBModal>


                <MDBNavbar fixed="top" id="main-header"
                           className={`flexible-navbar home-header ${this.state.whiteHeader ? "white-header" : ""}`} light
                           expand="md">
                    <a href="/" title="home">
                        <MDBNavbarBrand>
                            <strong className="black-text">EIP</strong>
                        </MDBNavbarBrand>
                    </a>
                    <MDBNavbarToggler onClick={this.toggleCollapse}/>
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav right>
                            {
                                this.props.authenticate.authenticate === "false" ?
                                    <React.Fragment>
                                        <MDBNavItem>
                                            <a className="border border-light rounded mr-1 nav-link Ripple-parent"
                                               rel="noopener noreferrer" href="/create-profile">Je suis freelance</a>
                                        </MDBNavItem>
                                        <MDBNavItem>
                                            <MDBNavLink onClick={this.toggle} className="meConnecter" to="#">Me
                                                connecter</MDBNavLink>
                                        </MDBNavItem>
                                    </React.Fragment>
                                    : ""
                            }
                            {
                                this.props.authenticate.role === "freelance" ?
                                    <React.Fragment>
                                        <MDBNavItem>
                                            <MDBNavLink className="meConnecter"
                                                        onClick={() => this.setWhiteHeader()}
                                                        to="/missions">Missions</MDBNavLink>
                                        </MDBNavItem>
                                        <MDBNavItem>
                                            <MDBNavLink className="meConnecter"
                                                        onClick={() => this.setWhiteHeader()}
                                                        to="/dashboard/freelancer">Dashboard</MDBNavLink>
                                        </MDBNavItem>
                                        <MDBNavItem>
                                            <MDBNavLink className="meConnecter"
                                                        onClick={() => this.setWhiteHeader()}
                                                        to="/analytics/views">Statistiques</MDBNavLink>
                                        </MDBNavItem>
                                        <MDBNavItem>
                                            <MDBNavLink className="meConnecter"
                                                        onClick={() => this.setWhiteHeader()}
                                                        to="/messages" >Messages</MDBNavLink>
                                        </MDBNavItem>
                                        <MDBNavItem>
                                            <MDBDropdown>
                                                <MDBDropdownToggle nav caret>
                                                    <span className="mr-2">Mon profil freelance</span>
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu>
                                                    <MDBDropdownItem href="/profile/">Modifier mon
                                                        profil</MDBDropdownItem>
                                                    <MDBDropdownItem href="#!">Modifier mes
                                                        disponibilités</MDBDropdownItem>
                                                    <MDBDropdownItem href="#!">Parametre de mon
                                                        entreprise</MDBDropdownItem>
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </MDBNavItem>
                                        <MDBNavItem>
                                            <MDBDropdown>
                                                <MDBDropdownToggle className="pt-1 pb-0 dopdown-toggle" nav caret>
                                                    <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg"
                                                         className="rounded-circle z-depth-0"
                                                         style={{height: "35px", padding: 0}} alt=""/>
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu className="dropdown-default" right>
                                                    <MDBDropdownItem href="/parametres">Parametres</MDBDropdownItem>
                                                    <MDBDropdownItem href="#" onClick={this.props.logout}>Log
                                                        out</MDBDropdownItem>
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
