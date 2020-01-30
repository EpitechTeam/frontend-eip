import React from 'react';
import {connect} from "react-redux";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "./missions.css";

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
    }

    componentWillMount = async () => {

    };

    renderMission = () => {
        return (
            <MDBRow>
                <MDBCol classname="col-4">
                    <div>Jean Bullant</div>
                </MDBCol>
                <MDBCol classname="col-4 align-items-center justify-content-center">
                    <h2>Test Mission</h2>
                    <div className=""><img
                        src="https://static.ferienhausmiete.de/pictures/22582/bilder_original/22582_59625499104451.jpg"
                        alt="mission"
                        className="imageMission"/></div>
                    <div>Arrivée: 18/11/2019 à 17h00</div>
                    <div>Départ: 22/11/2019 à 11h00</div>
                    <div>3 voyageurs</div>
                    <div>Services supplémentaires: aucun</div>
                </MDBCol>
                <MDBCol classname="col-4">
                    <div>25€</div>
                </MDBCol>
            </MDBRow>
        )
    };

    renderBody = () => {
        return (
            <div className="mission-page-body p-3">
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
