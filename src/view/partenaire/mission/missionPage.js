import React from 'react';
import {connect} from "react-redux";
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "./missions.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        missions: state.missions,
        authenticate: state.authenticate
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

class FreelanceMissionPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mission: {}
        }
    }

    componentDidMount() {
    }

    renderMission = () => {
        if (this.state.showConfirm) {
            return (
                <MDBRow>
                    <MDBCol className="">
                        <div className="text-center">Confirmer le refus de la mission?</div>
                        <div className="mt-5 d-flex justify-content-center">
                            <MDBBtn color="blue-grey" onClick={() => this.setState({showConfirm: false})}>Annuler</MDBBtn>
                            <MDBBtn color="danger" onClick={() => alert('Mission supprimée')}>Confirmer</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow>
            )
        }
        return (
            <div>
                <div>
                    <div><Link to="/app/missions"><MDBBtn color="blue-grey"><FontAwesomeIcon icon={faChevronLeft}/></MDBBtn></Link></div>
                </div>
                <MDBRow className="mt-5">
                    <MDBCol className="col-4">
                        <div className="m-auto rounded-mission-image"><img
                            src="https://static.ferienhausmiete.de/pictures/22582/bilder_original/22582_59625499104451.jpg"
                            alt="mission"
                            className="imageMission"/></div>
                        <h2 className="text-center mt-2">Test Mission</h2>
                    </MDBCol>
                    <MDBCol className="col-4 align-items-center justify-content-center">
                        <div>Propriétaire: Jean Bullant</div>
                        <div>Arrivée: 18/11/2019 à 17h00</div>
                        <div>Départ: 22/11/2019 à 11h00</div>
                        <div>3 voyageurs</div>
                        <div>Services supplémentaires: aucun</div>
                    </MDBCol>
                    <MDBCol className="col-4 d-flex align-items-center align-items-center justify-content-center">
                        <div className="mission-price">25€</div>
                    </MDBCol>
                </MDBRow>
                <this.RenderButtons/>
            </div>
        )
    };

    RenderButtons = () => {
        return (
            <div className="d-flex justify-content-end mt-5">
                <MDBBtn color="info" onClick={() => alert('Ouvrir ticker')}>Ouvrir un ticket</MDBBtn>
                <MDBBtn color="success" onClick={() => alert('Mission acceptée')}>Accepter</MDBBtn>
                <MDBBtn color="danger" onClick={() => this.setState({showConfirm: true})}>Refuser</MDBBtn>
            </div>
        )
    };

    renderBody = () => {
        return (
            <div className="mission-page-body p-3 d-flex align-items-center">
                <MDBContainer>
                    {this.renderMission()}
                </MDBContainer>
            </div>
        )
    };

    render() {
        return (
            <div className="main-mission-page p-5">
                {this.renderBody()}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreelanceMissionPage)
