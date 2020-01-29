import React from 'react'
import './devenirFreelance.css'
import AlgoliaPlaces from 'algolia-places-react';
import {connect} from "react-redux";
import {registerFreelance} from '../../../reducer/authenticate'
import { MDBAlert } from "mdbreact";

const mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        language: state.language,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (body) => {
            dispatch(registerFreelance(body))
        }
    }
}

class DevenirFreelance extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email : "",
            name : "",
            firstname : "",
            password : "",
            ville : ""
        }
    }

    checkForm = () => {        
        let erreur = false
        let message = ""

        if (this.props.authenticate.authenticate !== "false") {
            message = "Vous etes deja connecté"
            erreur = true
        }
        if (this.state.email.indexOf('@') !== -1 && this.state.email.indexOf('.') === -1) {
            message = " Probleme avec l'email"
            erreur = true
        }
        if (this.state.name === "") {
            message = " Probleme name"
            erreur = true
        }
        if (this.state.firstname === "") {
            message = " Probleme firstname"
            erreur = true
        }
        if (this.state.password.length < 7) {
            message = " Probleme password"
            erreur = true
        }
        if (this.state.ville === "") {
            message = " Probleme ville"
            erreur = true
        }

        if (!erreur) {
            this.props.register(this.state)
        }
        else {
            this.setState({erreur : true, erreurMessage : message})
        }
    }

    handleChange = event => {
        this.setState({[event.target.name] : event.target.value})
    }

    render() {
        return (
            <div>
            <div className="specialContainerDevenirFreelance">
                    <div className="view lighten-3 setHeightDevenirFreelance">
                    <div className="mask">
                        <div className="container h-100">
                        <div className="row align-items-center h-100">
                            <div className="col-md-6">
                            <h1 className="mb-4">Obtenez <span className="text-warning">un revenu</span><br />en <span className="cyan-text">gérant</span> des biens immobiliers</h1>
                            <p className="mb-4 pb-2 dark-grey-text">Gérer des biens immobiliers vous tente? Willally vous propose de vous associer avec des propriétaires
                            Airbnb et de générer un revenu.</p>
                            <a href="#searchDevenirFreelance">
                                <button href="searchDevenirFreelance" type="button" className="btn btn-primary btn-rounded btn-md ml-md-0">Commencer</button>
                            </a>
                            </div>
                            <div className="col-md-6">
                            <img src="https://mdbootstrap.com/img/illustrations/hiker-man-colour.svg" alt="" className="img-fluid" />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>


                    <div className="dark-grey-text text-center">
                    <h3 className="font-weight-bold pt-5 pb-2">Devenez freelance dans l'immobilier</h3>
                    <div className="row mx-3">
                      <div className="col-md-4 px-4 mb-4">
                        <div className="view">
                          <img  src="https://mdbootstrap.com/img/illustrations/drawkit-drawing-man-colour.svg" className="img-fluid" alt="smaple" />
                        </div>
                      </div>
                      <div className="col-md-4 px-4 mb-4">
                        <div className="view">
                          <img src="https://mdbootstrap.com/img/illustrations/drawkit-phone-conversation-colour.svg" className="img-fluid" alt="smaple" />
                        </div>
                      </div>
                      <div className="col-md-4 px-4 mb-4">
                        <div className="view">
                          <img src="https://mdbootstrap.com/img/illustrations/app-user-colour.svg" className="img-fluid" alt="smaple" />
                        </div>
                      </div>
                    </div>
                  </div>

                    <div className="text-center px-md-5 mx-md-5 dark-grey-text">
                    <div className="row mb-5">
                        <div className="col-md-4 mx-auto">
                        <div className="view mb-4 pb-2">
                            <img src="https://mdbootstrap.com/img/illustrations/undraw_connected_world_wuay.svg" className="img-fluid" alt="smaple" />
                        </div>
                        </div>
                    </div>
                    <h3 className="font-weight-bold mb-4 pb-2">Willally disponible partout</h3>
                    <p className="text-center mx-auto mb-4 pb-2">Rejoignez Willally et faites partie du réseau des freelances partenaires partout à travers le monde.</p>
                    <button type="button" className="btn btn-deep-purple btn-rounded">Je commence</button>
                    </div>

                    <div>
                    <div className="row">
                        <div className="col-lg-7 mb-4 align-self-center text-center text-lg-left">
                        <h2 className="h2 mb-5">Notre app</h2>
                        <p className="text-muted mb-4">L'app Willally permet de voir vos missions et de voir les informations nécessaires aux réservations à venir. Vous pouvez gérer votre compte, vos revenus, contactez les voyageurs et bien plus encore.</p>
                        <button type="button" className="btn btn-cyan waves-effect btn-md ml-lg-0"><i className="fab fa-apple fa-lg pr-1" /> App Store</button>
                        <button type="button" className="btn btn-cyan waves-effect btn-md"><i className="fab fa-google-play fa-lg pr-1" /> Google Play</button>
                        </div>
                        <div className="col-lg-5 mb-4">
                        <div className="view overlay">
                            <img className="img-fluid mx-auto" src="https://mdbootstrap.com/img/illustrations/app-user-colour.svg" alt="Sample" />
                            <a href="/">
                            <div className="mask rgba-white-slight" />
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="team-section text-center dark-grey-text">
                    <h3 className="font-weight-bold mb-4 pb-2">Ils sont partenaires!</h3>
                    <p className="text-center w-responsive mx-auto mb-5">Willally promet de satisfaire propriétaires comme partenaires.</p>
                    <div className="row text-center">
                        <div className="col-md-4 mb-4">
                        <div className="testimonial">
                            <div className="avatar mx-auto">
                            <img alt="" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(1).jpg" className="rounded-circle z-depth-1 img-fluid" />
                            </div>
                            <h4 className="font-weight-bold dark-grey-text mt-4">Anna Deynah</h4>
                            <h6 className="font-weight-bold blue-text my-3">Web Designer</h6>
                            <p className="font-weight-normal dark-grey-text">
                            <i className="fas fa-quote-left pr-2" />Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                            eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.</p>
                            <div className="orange-text">
                            <i className="fas fa-star"> </i>
                            <i className="fas fa-star"> </i>
                            <i className="fas fa-star"> </i>
                            <i className="fas fa-star"> </i>
                            <i className="fas fa-star-half-alt"> </i>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-4 mb-4">
                        <div className="testimonial">
                            <div className="avatar mx-auto">
                            <img alt="" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(8).jpg" className="rounded-circle z-depth-1 img-fluid" />
                            </div>
                            <h4 className="font-weight-bold dark-grey-text mt-4">John Doe</h4>
                            <h6 className="font-weight-bold blue-text my-3">Web Developer</h6>
                            <p className="font-weight-normal dark-grey-text">
                            <i className="fas fa-quote-left pr-2" />Ut enim ad minima veniam, quis nostrum exercitationem ullam
                            corporis suscipit laboriosam, nisi ut aliquid commodi.</p>
                            <div className="orange-text">
                            <i className="fas fa-star"> </i>
                            <i className="fas fa-star"> </i>
                            <i className="fas fa-star"> </i>
                            <i className="fas fa-star"> </i>
                            <i className="fas fa-star"> </i>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-4 mb-4">
                        <div className="testimonial">
                            <div className="avatar mx-auto">
                            <img alt="" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg" className="rounded-circle z-depth-1 img-fluid" />
                            </div>
                            <h4 className="font-weight-bold dark-grey-text mt-4">Maria Kate</h4>
                            <h6 className="font-weight-bold blue-text my-3">Photographer</h6>
                            <p className="font-weight-normal dark-grey-text">
                            <i className="fas fa-quote-left pr-2" />At vero eos et accusamus et iusto odio dignissimos ducimus qui
                            blanditiis praesentium voluptatum deleniti atque corrupti.</p>
                            <div className="orange-text">
                            <i className="fas fa-star"> </i>
                            <i className="fas fa-star"> </i>
                            <i className="fas fa-star"> </i>
                            <i className="fas fa-star"> </i>
                            <i className="far fa-star"> </i>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
  
                    <div className="dark-grey-text">
                    <div className="row pr-lg-5">
                        <div className="col-md-7 mb-4">
                        <div className="view">
                            <img src="https://mdbootstrap.com/img/illustrations/graphics(4).png" className="img-fluid" alt="smaple" />
                        </div>
                        </div>
                        <div className="col-md-5 d-flex align-items-center">
                        <div>
                            <h3 className="font-weight-bold mb-4">Restez indépendant</h3>
                            <p>Vous êtes libres d'intérompre un partenariat à tout moment. Gérez vous-même vos revenus.</p>
                            <button type="button" className="btn btn-orange btn-rounded mx-0">Commencer</button>
                        </div>
                        </div>
                    </div>
                    </div>
                    </div>

                    <div>
                    <div className="white-text grey p-5 rounded">
                        <h3 className="text-center font-weight-bold mb-4 pb-2">Être partenaire c'est ...</h3>
                        <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="row">
                            <div className="col-6 pr-0">
                                <h4 className="display-4 text-right mb-0 count-up" data-from={0} data-to={42} data-time={2000}>1</h4>
                            </div>
                            <div className="col-6">
                                <p className="text-uppercase font-weight-normal mb-1">Source de revenus</p>
                                <p className="mb-0"><i className="fas fa-briefcase fa-2x mb-0" /></p>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="row">
                            <div className="col-6 pr-0">
                                <h4 className="display-4 text-right mb-0 count1" data-from={0} data-to={3500} data-time={2000}>124</h4>
                            </div>
                            <div className="col-6">
                                <p className="text-uppercase font-weight-normal mb-1">Freelances</p>
                                <p className="mb-0"><i className="fas fa-user fa-2x mb-0" /></p>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="row">
                            <div className="col-6 pr-0">
                                <h4 className="display-4 text-right"><span className="d-flex justify-content-end"><span className="count2" data-from={0} data-to={100} data-time={2000}>100</span> %</span></h4>
                            </div>
                            <div className="col-6">
                                <p className="text-uppercase font-weight-normal mb-1">Satisfaction</p>
                                <p className="mb-0"><i className="fas fa-smile fa-2x mb-0" /></p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="specialContainerDevenirFreelance">
                        <div className="dark-grey-text p-5">
                        <div className="row">
                        <div className="col-md-5 mb-4 mb-md-0">
                            <div className="view">
                            <img src="https://mdbootstrap.com/img/illustrations/undraw_Group_chat_unwm.svg" className="img-fluid" alt="smaple" />
                            </div>
                        </div>
                        <div className="col-md-7 mb-lg-0 mb-4">
                            <h3 className="font-weight-bold my-3">Inscription</h3>
                            <p className="text-muted mb-4 pb-2">Devenez partenaire et commencez à générer des revenus!</p>
                            {
                                this.state.erreur ? 
                                <MDBAlert color="danger">{this.state.erreurMessage}</MDBAlert>
                                : ""
                            }
                            {
                                this.props.authenticate.erreurRegisterMessage !== "" ?
                                <MDBAlert color="danger">{this.props.authenticate.erreurRegisterMessage}</MDBAlert>
                                : ""
                            }
                            
                            <div className="row d-flex justify-content-center">
                                    <div className="col-md-6 col-lg-4">
                                    <div className="md-form md-outline form-lg">
                                        <input onChange={this.handleChange} name="firstname" type="text" id="form1" className="form-control form-control-lg" />
                                        <label htmlFor="form1">{this.state.firstname === "" ? "Prénom" : ""}</label>
                                    </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                    <div className="md-form md-outline form-lg">
                                        <input onChange={this.handleChange} name="email"  type="text" id="form2" className="form-control form-control-lg" />
                                        <label htmlFor="form2">{this.state.email === "" ? "Email" : ""}</label>
                                    </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                    <div className="md-form md-outline form-lg">
                                        <input onChange={this.handleChange} name="password" type="password" id="form3" className="form-control form-control-lg" />
                                        <label htmlFor="form3">{this.state.password === "" ? "Password" : ""}</label>
                                    </div>
                                    </div>
                            </div>
                            <div className="row d-flex justify-content-center">
                                    <div className="col-md-6 col-lg-4">
                                    <div className="md-form md-outline form-lg">
                                        <input onChange={this.handleChange} name="name" type="text" id="form4" className="form-control form-control-lg" />
                                        <label htmlFor="form4">{this.state.name === "" ? "Name" : ""}</label>
                                    </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                    <div id="searchDevenirFreelance" className="md-form md-outline form-lg">
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
                                    this.setState({ville : suggestion.name})}
                            
                                    onLimit={({ message }) => 
                                    console.log('Fired when you reached your current rate limit.')}
                            
                                    onError={({ message }) => 
                                    console.log('Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.')}
                                    />
                                    </div>  
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-4">
                                    <button onClick={this.checkForm} className="btn btn-block btn-primary my-4">S'inscrire</button>
                                    </div>
                                   
                            </div>
                        </div>
                        </div>

                    </div>
                
                    </div>
                    
                    </div>
                 </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DevenirFreelance)
