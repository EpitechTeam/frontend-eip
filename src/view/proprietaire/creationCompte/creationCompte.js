import React from 'react'
import { connect } from 'react-redux'
import { MDBContainer } from 'mdbreact'

const mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        language: state.language
    }
}

class CreationCompte extends React.Component {
    render() {
        return (
            <div>
            <MDBContainer>
                <section className="mt-5 pricing py-5">
                <h2 className="section-title aos-init aos-animate">Choisissez une offre</h2>
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
                        <a href="/create-profile-proprietaire/checkout?plan=first">
                        <button onClick={this.toggle} type="button" className="btn btn-primary btn-block btn-rounded btn-md ml-md-0 text-uppercase">Commencer</button>
                        </a>
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
                        <a href="/create-profile-proprietaire/checkout?plan=plus">
                        <button onClick={this.toggle} type="button" className="btn btn-primary btn-block btn-rounded btn-md ml-md-0 text-uppercase">Commencer</button>
                        </a>                        </div>
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
                        <a href="/create-profile-proprietaire/checkout?plan=pro">
                        <button onClick={this.toggle} type="button" className="btn btn-primary btn-block btn-rounded btn-md ml-md-0 text-uppercase">Commencer</button>
                        </a>                        </div>
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

export default connect(mapStateToProps)(CreationCompte)