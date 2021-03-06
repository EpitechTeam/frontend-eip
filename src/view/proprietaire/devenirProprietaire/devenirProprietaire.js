import React from 'react'
import {
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBContainer,
}
from 'mdbreact'
import CreateProprietaire from '../../../component/createProprietaire/createProprietaire'
import {connect} from "react-redux";
import LazyLoad from 'react-lazy-load';
import './devenirProprietaire.css'

const mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        language: state.language
    }
}

function importAll(r) {
  let images = {};
  // eslint-disable-next-line
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

// eslint-disable-next-line
const images = importAll(require.context('../../../assets/', false, /\.(png|jpe?g|svg)$/));

class DevenirProprietaire extends React.Component {
    state = {
        modal: false,
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    render () {
        return (
            <div>
            <MDBModal isOpen={this.state.modal && this.props.authenticate.authenticate === "false"}
                          toggle={this.toggle}>
                <MDBModalHeader toggle={this.toggle}>Inscription</MDBModalHeader>
                <MDBModalBody>
                    <CreateProprietaire/>
                </MDBModalBody>
            </MDBModal>

            <div className="view lighten-3 setHeightDevenirFreelance">
                    <div className="mask">
                        <div className="container h-100">
                        <div className="row align-items-center h-100">
                            <div className="col-md-6">
                            <h1 className="mb-4">Trouvez <span className="text-warning">un freelance</span><br /><span className="cyan-text">pour s'occuper</span> de votre logement</h1>
                            <p className="mb-4 pb-2 dark-grey-text">Confiez votre logement à un partenaire de confiance qui vous aidera à gérer vos biens. </p>
                            <a href="#searchDevenirFreelance">
                                <button  onClick={this.toggle} type="button" className="btn btn-primary btn-rounded btn-md ml-md-0">Commencer</button>
                            </a>
                            </div>
                            <div className="col-md-6">
                            <LazyLoad offsetRight={100} offsetLeft={100} debounce={false} height={500} throttle={0}>
                            <img alt="maison" className="w-100" src={images["house.png"]}/>
                            </LazyLoad>
                            </div>
                        </div>
                        </div>
                    </div>
            </div>
            <MDBContainer>
          <section className="mt-5 section pb-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 pr-lg-5">
              <LazyLoad offsetRight={100} offsetLeft={100} debounce={false} height={500} throttle={0}>
                <img src={images["details.png"]} className="img-fluid aos-init aos-animate" alt="dashboard" data-aos="fade-right" />
                </LazyLoad>
              </div>
              <div className="col-md-6 pl-lg-5">
                <p className="subtitle aos-init aos-animate" data-aos="fade-up">01</p>
                <h2 className="section-title aos-init aos-animate" data-aos="fade-up" data-aos-delay={200}>Trouvez votre partenaire</h2>
                <p className="mb-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay={400}>Willally vous propose de potentiels partenaires dans la ville choisie.
                Prenez contact, devenez partenaires et gérez vos biens en toute simplicité.</p>
                <ul className="list-unstyled">
                  <li className="d-flex mb-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay={500}>
                    <div className="pr-3 pr-lg-5">
                      <i className="fa fa-check text-secondary bg-white shadow icon-sm" />
                    </div>
                    <div>
                      <h5>Fiabilité</h5>
                      <p>Les freelances disponibles sur la plateforme sont vérifiés et validés. Soyez sereins.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-5 section overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-md-6 pr-lg-5">
              <p className="subtitle aos-init aos-animate" data-aos="fade-up">02</p>
              <h2 className="section-title aos-init aos-animate" data-aos="fade-up" data-aos-delay={200}>Tableau de bord</h2>
              <p data-aos="fade-up" data-aos-delay={300} className="aos-init aos-animate">Willally vous donne accès à un tableau de bord pour vous permettre de suivre les réservations, vos revenus et d'autres informations essentielles.
                  Chaque réservation sera proposée à votre partenaire sous forme de mission.</p>
              <p className="mb-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay={400}>En plus, gardez un oeil sur les statistiques avec des outils en temps réel.</p>
            </div>
            <div className="col-md-6 pl-lg-5">
            <LazyLoad offsetRight={100} offsetLeft={100} debounce={false} height={500} throttle={0}>
              <img src={images["stats.png"]} className="img-fluid aos-init aos-animate" alt="dashboard" data-aos="fade-left" data-aos-delay={200} />
              </LazyLoad>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-5 section pb-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 pr-lg-5">
              <LazyLoad offsetRight={100} offsetLeft={100} debounce={false} height={500} throttle={0}>
                <img src={images["revenue.png"]} className="img-fluid aos-init aos-animate" alt="dashboard" data-aos="fade-right" />
                </LazyLoad>
              </div>
              <div className="col-md-6 pl-lg-5">
                <p className="subtitle aos-init aos-animate" data-aos="fade-up">03</p>
                <h2 className="section-title aos-init aos-animate" data-aos="fade-up" data-aos-delay={200}>Conservez une rentabilité élevée.</h2>
                <p className="mb-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay={400}>La plateforme Willally vous évite de perdre de l'argent et de conserver une rentabilité élevée.</p>
                <ul className="list-unstyled">
                  <li className="d-flex mb-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay={500}>
                    <div className="pr-3 pr-lg-5">
                      <i className="fa fa-check text-secondary bg-white shadow icon-sm" />
                    </div>
                    <div>
                      <h5>Paiements sécurisés</h5>
                      <p>Les transactions sur Willally sont sécurisées, tout comme vos données bancaires.</p>
                    </div>
                  </li>
                  <li className="d-flex aos-init aos-animate" data-aos="fade-up" data-aos-delay={550}>
                    <div className="pr-3 pr-lg-5">
                      <i className="fa fa-check text-secondary bg-white shadow icon-sm" />
                    </div>
                    <div>
                      <h5>Fiable</h5>
                      <p>Lorem ipsum dolor sit amet consectetur elit sed do eiusmod tempor incididunt labore dolore
                        magna.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        </MDBContainer>
       
                    <div className="mt-5 white-text grey p-5 rounded">
                        <h3 className="text-center font-weight-bold mb-4 pb-2">Willally c'est ...</h3>
                        <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="row">
                            <div className="col-6 pr-0">
                                <h4 className="display-4 text-right mb-0 count-up" data-from={0} data-to={42} data-time={2000}>42</h4>
                            </div>
                            <div className="col-6">
                                <p className="text-uppercase font-weight-normal mb-1">Propriétaires</p>
                                <p className="mb-0"><i className="fas fa-briefcase fa-2x mb-0" /></p>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="row">
                            <div className="col-6 pr-0">
                                <h4 className="display-4 text-right mb-0 count1" data-from={0} data-to={3500} data-time={2000}>3,500</h4>
                            </div>
                            <div className="col-6">
                                <p className="text-uppercase font-weight-normal mb-1">Réservations</p>
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
                    <MDBContainer>
            <section className="mt-5 pricing py-5">
            <p className="subtitle aos-init aos-animate" data-aos="fade-up">04</p>
            <h2 className="section-title aos-init aos-animate">Tarif de la solution</h2>
            <div>
              <div className="row">
                {/* Free Tier */}
                <div className="col-lg-4">
                  <div className="card mb-5 mb-lg-0">
                    <div className="card-body">
                      <h5 className="card-title text-muted text-uppercase text-center">First</h5>
                      <h6 className="card-price text-center">9€<span className="period">/mois</span></h6>
                      <hr />
                      <ul className="fa-ul">
                        <li><span className="fa-li"><i className="fas fa-check" /></span>1 Logement</li>
                        <li><span className="fa-li"><i className="fas fa-check" /></span>Difusion de votre annonce sur les sites partenaires</li>
                        <li><span className="fa-li"><i className="fas fa-check" /></span>Pas de commision</li>
                        <li><span className="fa-li"><i className="fas fa-check" /></span>Réedition des comptes</li>
                        <li><span className="fa-li"><i className="fas fa-check" /></span>Statistiques avancés</li>
                        <li><span className="fa-li"><i className="fas fa-check" /></span>Trouver un partenaire</li>
                        <li className="text-muted"><span className="fa-li"><i className="fas fa-times" /></span>Litige</li>
                        <li className="text-muted"><span className="fa-li"><i className="fas fa-times" /></span>SAV</li>
                      </ul>
                      <button  onClick={this.toggle} type="button" className="btn btn-primary btn-block btn-rounded btn-md ml-md-0 text-uppercase">Commencer</button>
                    </div>
                  </div>
                </div>
                {/* Plus Tier */}
                <div className="col-lg-4">
                  <div className="card mb-5 mb-lg-0">
                    <div className="card-body">
                      <h5 className="card-title text-muted text-uppercase text-center">Plus</h5>
                      <h6 className="card-price text-center">19€<span className="period">/mois</span></h6>
                      <hr />
                      <ul className="fa-ul">
                      <li><span className="fa-li"><i className="fas fa-check" /></span>1 - 3 Logements</li>
                      <li><span className="fa-li"><i className="fas fa-check" /></span>Difusion de votre annonce sur les sites partenaires</li>
                      <li><span className="fa-li"><i className="fas fa-check" /></span>Pas de commision</li>
                      <li><span className="fa-li"><i className="fas fa-check" /></span>Réedition des comptes</li>
                      <li><span className="fa-li"><i className="fas fa-check" /></span>Statistiques avancés</li>
                      <li><span className="fa-li"><i className="fas fa-check" /></span>Trouver un partenaire</li>
                      <li><span className="fa-li"><i className="fas fa-check" /></span>Litige</li>
                      <li><span className="fa-li"><i className="fas fa-check" /></span>SAV</li>
                      </ul>
                      <button  onClick={this.toggle} type="button" className="btn btn-primary btn-rounded btn-block btn-md ml-md-0 text-uppercase">Commencer</button>
                      </div>
                  </div>
                </div>
                {/* Pro Tier */}
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title text-muted text-uppercase text-center">Pro</h5>
                      <h6 className="card-price text-center">99€<span className="period">/mois</span></h6>
                      <hr />
                      <ul className="fa-ul">
                      <li><span className="fa-li"><i className="fas fa-check" /></span>1 - 10 Logement</li>
                      <li><span className="fa-li"><i className="fas fa-check" /></span>Difusion de votre annonce sur les sites partenaires</li>
                      <li><span className="fa-li"><i className="fas fa-check" /></span>Pas de commision</li>
                      <li><span className="fa-li"><i className="fas fa-check" /></span>Réedition des comptes</li>
                      <li><span className="fa-li"><i className="fas fa-check" /></span>Statistiques avancés</li>
                      <li><span className="fa-li"><i className="fas fa-check" /></span>Trouver un partenaire</li>
                      <li><span className="fa-li"><i className="fas fa-check" /></span>Litige</li>
                      <li><span className="fa-li"><i className="fas fa-check" /></span>SAV</li>
                      </ul>
                      <button  onClick={this.toggle} type="button" className="btn btn-primary btn-rounded btn-block btn-md ml-md-0 text-uppercase">Commencer</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          </MDBContainer>  
            </div>
        )
    }
}

export default connect(mapStateToProps)(DevenirProprietaire)
