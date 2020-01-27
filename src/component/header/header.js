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
        profile: state.profile
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
        if (typeof document !== "undefined") {
            return (window.location.pathname === "/");
        }
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
                    <MDBModalHeader toggle={this.toggle}>Connexion</MDBModalHeader>
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
                                               rel="noopener noreferrer" href="/create-profile-proprietaire">Je suis propriétaire</a>
                                        </MDBNavItem>
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
                                        <MDBNavItem className="marginANavs">
                                            <a className={ this.state.whiteHeader ? "meConnecterBlack" : "meConnecter"} href="/app/missions">Missions</a>
                                        </MDBNavItem>
                                        <MDBNavItem className="marginANavs">
                                            <a className={ this.state.whiteHeader ? "meConnecterBlack" : "meConnecter"} href="/app/dashboard">Dashboard</a>
                                        </MDBNavItem>
                                        <MDBNavItem className="marginANavs">
                                            <a className={ this.state.whiteHeader ? "meConnecterBlack" : "meConnecter"} href="/app/messages" >Messages</a>
                                        </MDBNavItem>
                                        <MDBNavItem>
                                            <MDBDropdown>
                                                <MDBDropdownToggle nav caret>
                                                    <span className="mr-2">Mon profil freelance</span>
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu>
                                                <div className="menuDropDown">
                                                <a href="/profile">Mon profil</a>
                                                <a href="/profile">Modifier mes disponibilités</a>
                                                <a href="/profile/parameters">Parametre de mon entreprise</a>
                                                </div>
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </MDBNavItem>
                                        <MDBNavItem>
                                            <MDBDropdown>
                                                <MDBDropdownToggle className="pt-1 pb-0 dopdown-toggle" nav caret>
                                                    <img src={this.props.profile.profile.avatar}
                                                         className="rounded-circle z-depth-0"
                                                         style={{height: "35px", padding: 0}} alt=""/>
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu className="dropdown-default" right>
                                                <div className="menuDropDown">
                                                <a href="/profile/parameters">Parametres</a>
                                                <MDBDropdownItem href="#" onClick={this.props.logout}>Log out</MDBDropdownItem>
                                                </div>
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </MDBNavItem>
                                    </React.Fragment>
                                    : ""
                            }
                            {
                                this.props.authenticate.role === "proprietaire" && this.props.authenticate.paid === "true" ? 
                                <React.Fragment>
                                        <MDBNavItem className="marginANavs">
                                        <a className={ this.state.whiteHeader ? "meConnecterBlack" : "meConnecter"} href="/app/missions">Missions</a>
                                        </MDBNavItem>
                                        <MDBNavItem className="marginANavs">
                                            <a className={ this.state.whiteHeader ? "meConnecterBlack" : "meConnecter"} href="/app/dashboard">Dashboard</a>
                                        </MDBNavItem>
                                        <MDBNavItem className="marginANavs">
                                            <a className={ this.state.whiteHeader ? "meConnecterBlack" : "meConnecter"} href="/app/messages" >Messages</a>
                                        </MDBNavItem>
                                        <MDBNavItem>
                                            <MDBDropdown>
                                                <MDBDropdownToggle nav caret>
                                                    <span className="mr-2">Mon profil</span>
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu>
                                                <div className="menuDropDown">
                                                <a href="/profile">Mon profil</a>
                                                </div>
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </MDBNavItem>
                                        <MDBNavItem>
                                            <MDBDropdown>
                                                <MDBDropdownToggle className="pt-1 pb-0 dopdown-toggle" nav caret>
                                                    <img src={this.props.profile.profile.avatar}
                                                         className="rounded-circle z-depth-0"
                                                         style={{height: "35px", padding: 0}} alt=""/>
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu className="dropdown-default" right>
                                                <div className="menuDropDown">
                                                <a href="/profile/parameters">Parametres</a>
                                                <MDBDropdownItem href="#" onClick={this.props.logout}>Log out</MDBDropdownItem>
                                                </div>
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </MDBNavItem>
                                    </React.Fragment>
                                : 
                                    ""
                            }
                            {
                                this.props.authenticate.role === "proprietaire" && this.props.authenticate.paid === "false" ?
                                <React.Fragment>
                                        <MDBNavItem>
                                        <a className="border border-light rounded mr-1 nav-link Ripple-parent"
                                        rel="noopener noreferrer" href="/create-profile-proprietaire/plan">Compléter mon profil</a>
                                        </MDBNavItem>
                                        <MDBNavItem>
                                            <MDBDropdown>
                                                <MDBDropdownToggle nav caret>
                                                    <span className="mr-2">Mon profil</span>
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu>
                                                <div className="menuDropDown">
                                                <a href="/profile">Mon profil</a>
                                                </div>
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </MDBNavItem>
                                        <MDBNavItem>
                                            <MDBDropdown>
                                                <MDBDropdownToggle className="pt-1 pb-0 dopdown-toggle" nav caret>
                                                    <img src={this.props.profile.profile.avatar}
                                                        className="rounded-circle z-depth-0"
                                                        style={{height: "35px", padding: 0}} alt=""/>
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu className="dropdown-default" right>
                                                <div className="menuDropDown">
                                                <a href="/profile/parameters">Parametres</a>
                                                <MDBDropdownItem href="#" onClick={this.props.logout}>Log out</MDBDropdownItem>
                                                </div>
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                        </MDBNavItem>
                                    </React.Fragment> : ""
                            }
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </header>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
