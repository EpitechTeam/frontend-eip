import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBAlert, MDBNav, MDBNavItem, MDBNavLink, MDBTabContent, MDBTabPane } from 'mdbreact';
import { getProfile, setProfile } from "../../reducer/profile";
import AlgoliaPlaces from 'algolia-places-react';
import {connect} from "react-redux";
import { resetPassword } from '../../reducer/authenticate';

const mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        profile: state.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: (token) => { dispatch(getProfile(token))},
        setProfile: (token, state) => { dispatch(setProfile(token, state))},
        resetPassword: (token, password) => {dispatch(resetPassword(token, password))}
    }
}

class EditProfile extends React.Component {
    state = {
        email : "",
        lastname : "",
        firstname : "",
        location : "",
        siret : "",
        company : "",
        phone : "",
        erreurEditMessage : "",
        validEditMessage : "",
        activeItem: "1",
        password : "",
        password1 : ""
    }

    componentDidMount() {
        this.props.getProfile(this.props.authenticate.token)
        let profile = this.props.profile.profile
        this.setState({
            email : profile.email,
            firstname : profile.name,
            lastname : profile.surname,
            location : profile.location,
            phone : profile.phone,
            siret : profile.siret,
            company : profile.company
        })
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
          this.setState({
            activeItem: tab
          });
        }
    }

    verifyFormMDP = () => {
        if (this.state.password === this.state.password1) {
            this.props.resetPassword(this.props.authenticate.token, this.state.password)
        }
    }

    verifyForm = () => {
        console.log("verification form")
        if (this.state.email.indexOf('@') === -1 || this.state.email.indexOf('.') === -1) {
            this.setState({erreurEditMessage : "L'email n'est pas valide."})
        }
        else if (this.state.firstname === "" || this.state.firstname.length > 100) {
            this.setState({erreurEditMessage : "Le prénom renseigné n'est pas valide"})

        } 
        else if (this.state.lastname === "" || this.state.lastname.length > 100) {
            this.setState({erreurEditMessage : "Le nom de famille renseigné n'est pas valide"})

        }
        else if (this.state.location === "") {
            this.setState({erreurEditMessage : "La ville renseignée n'est pas valide"})

        }
        else if (this.state.phone === "") {
            this.setState({erreurEditMessage : "Le numéro de téléphone renseigné n'est pas valide"})

        }
        else if (typeof this.state.email1 !== "undefined") {
            if (this.state.email1 !== this.state.email) {
                this.setState({erreurEditMessage : "L'email n'est pas identique."})
            }
            else {
                this.saveInfo()
                this.setState({erreurEditMessage : "", validEditMessage : "Les informations ont été enregistrés avec succès."})
            }
        }
        else {
            console.log("here")
            this.saveInfo()
            this.setState({erreurEditMessage : "", validEditMessage : "Les informations ont été enregistrés avec succès."})
        }
        return
    }

    saveInfo = () => {
        this.props.setProfile(this.props.authenticate.token, this.state)
    }

    handleChange = event => {
        this.setState({[event.target.name] : event.target.value})
    }

    render() {
        return (
            <div className="mt-5">
            <MDBContainer>
            <MDBRow center>
                <MDBCol className="mt-3" md="6">
                <MDBNav className="nav-tabs">
                <MDBNavItem>
                    <MDBNavLink to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >
                    Contact
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >
                    Entreprise
                    </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to="#" active={this.state.activeItem === "3"} onClick={this.toggle("3")} role="tab" >
                    Mot de passe
                    </MDBNavLink>
                </MDBNavItem>
                </MDBNav>
                <MDBTabContent activeItem={this.state.activeItem} >
                <MDBTabPane tabId="1" role="tabpanel">
                <p className="h4 mt-3 text-center mb-4">Information</p>
                {
                    this.state.erreurEditMessage !== "" ?
                    <MDBAlert className="mb-2" color="danger">{this.state.erreurEditMessage}</MDBAlert>
                    : ""
                }
                {
                    this.state.validEditMessage !== "" ?
                    <MDBAlert className="mb-2" color="success">{this.state.validEditMessage}</MDBAlert>
                    : ""
                }
                <label htmlFor="firstname" className="grey-text">
                Prénom
                </label>
                <input
                value={this.state.firstname}
                onChange={this.handleChange}
                name="firstname"
                type="text"
                id="firstname"
                className="form-control"
                />
                <br />
                <label htmlFor="lastname" className="grey-text">
                Nom de famille
                </label>
                <input
                value={this.state.lastname}
                onChange={this.handleChange}
                name="lastname"
                type="text"
                id="lastname"
                className="form-control"
                />
                <br />
                <label htmlFor="email" className="grey-text">
                Email
                </label>
                <input
                value={this.state.email}
                onChange={this.handleChange}
                name="email"
                type="email"
                id="email"
                className="form-control"
                />
                <br />
                <label
                htmlFor="email1"
                className="grey-text"
                >
                Confirm your email
                </label>
                <input
                onChange={this.handleChange}
                name="email1"
                type="email"
                id="email1"
                className="form-control"
                />
                <br />
                <label htmlFor="phone" className="grey-text">
                Numéro de téléphone
                </label>
                <input
                value={this.state.phone}
                onChange={this.handleChange}
                name="phone"
                type="phone"
                id="phone"
                className="form-control"
                />
                <br />
                <label htmlFor="location" className="grey-text">
                Ville
                </label>
                <div id="searchDevenirFreelance" className="form-lg">
                <AlgoliaPlaces
                placeholder='Pays, Région, Ville...'
        
                options={{
                appId: 'plIOZH1K5KVK',
                apiKey: 'd3dabd9d74c1378eec2667aac653e04a',
                language: 'fr',
                countries: ['fr', 'de'],
                type: 'city',
                }}
                
                onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => 
                this.setState({location : suggestion.name})}
        
                onLimit={({ message }) => 
                console.log('Fired when you reached your current rate limit.')}
        
                onError={({ message }) => 
                console.log('Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.')}
                />
                </div>    
                <div className="text-center mt-4">
                <MDBBtn onClick={this.verifyForm} className="w-100" color="unique" type="submit">
                    Sauvegarder
                </MDBBtn>
                </div>
                </MDBTabPane>
                <MDBTabPane tabId="2" role="tabpanel">
                <p className="h4 mt-3 text-center mb-4">Société</p>
                {
                    this.state.erreurEditMessage !== "" ?
                    <MDBAlert className="mb-2" color="danger">{this.state.erreurEditMessage}</MDBAlert>
                    : ""
                }
                {
                    this.state.validEditMessage !== "" ?
                    <MDBAlert className="mb-2" color="success">{this.state.validEditMessage}</MDBAlert>
                    : ""
                }
                <label htmlFor="siret" className="grey-text">
                Siret
                </label>
                <input
                value={this.state.siret}
                onChange={this.handleChange}
                name="siret"
                type="text"
                id="siret"
                className="form-control"
                />
                <br />
                <label htmlFor="tva" className="grey-text">
                Numéro de TVA (Optionel)
                </label>
                <input
                value={this.state.tva}
                onChange={this.handleChange}
                name="tva"
                type="text"
                id="tva"
                className="form-control"
                />
                <br />
                <label htmlFor="company" className="grey-text">
                Nom de la société (optionel)
                </label>
                <input
                value={this.state.company}
                onChange={this.handleChange}
                name="company"
                type="text"
                id="company"
                className="form-control"
                />
                <br />
                <div className="text-center mt-4">
                <MDBBtn onClick={this.verifyForm} className="w-100" color="unique" type="submit">
                    Sauvegarder
                </MDBBtn>
                </div>
                </MDBTabPane>
                <MDBTabPane tabId="3" role="tabpanel">
                <p className="h4 mt-3 text-center mb-4">Mot de passe</p>
                {
                    this.state.erreurEditMessage !== "" ?
                    <MDBAlert className="mb-2" color="danger">{this.state.erreurEditMessage}</MDBAlert>
                    : ""
                }
                {
                    this.state.validEditMessage !== "" ?
                    <MDBAlert className="mb-2" color="success">{this.state.validEditMessage}</MDBAlert>
                    : ""
                }
                <label htmlFor="password" className="grey-text">
                Mot de passe
                </label>
                <input
                value={this.state.password}
                onChange={this.handleChange}
                name="password"
                type="password"
                id="password"
                className="form-control"
                />
                <br />
                <label htmlFor="password1" className="grey-text">
                Confirmez votre mot de passe
                </label>
                <input
                value={this.state.password1}
                onChange={this.handleChange}
                name="password1"
                type="password"
                id="password1"
                className="form-control"
                />
                <br />
                <div className="text-center mt-4">
                <MDBBtn onClick={this.verifyFormMDP} className="w-100" color="unique" type="submit">
                    Sauvegarder
                </MDBBtn>
                </div>
                </MDBTabPane>
                </MDBTabContent> 
                </MDBCol>
            </MDBRow>
            </MDBContainer>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)