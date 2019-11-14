import React from 'react';
import {connect} from "react-redux";
import {getMissions} from "../../../reducer/missions";
import {MDBContainer} from "mdbreact";
import "./missions.css";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleRight, faBan, faPen} from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state) => {
    return {
        missions: state.missions
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMissions: () => {
            dispatch(getMissions())
        }
    }
};

class FreelanceMission extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: "CURRENT"
        }
    }

    componentWillMount = async () => {
        let {getMissions} = this.props;
        await getMissions();

        let params = new URLSearchParams(window.location.search);
        let value = params.get('cat');
        console.log(value);
        this.setState({
            selected: value
        });

    };

    renderMissions = () => {
        let {missions} = this.props;
        if (!missions.missions.length)
            return null;
    };

    renderSideNav = () => {
        return (
            <div className="side-nav-custom">
                <div className="font-weight-bolder">Statut</div>

                <div className="status">
                    <Link onClick={() => this.setState({selected: "WAITING"})} className={`mission-link ${this.state.selected === "WAITING" ? "selected" : ""}`} to="?cat=WAITING"><FontAwesomeIcon icon={faPen}/> En attente</Link>
                    <Link onClick={() => this.setState({selected: "CURRENT"})} className={`mission-link ${this.state.selected === "CURRENT" ? "selected" : ""}`} to="?cat=CURRENT"><FontAwesomeIcon icon={faArrowAltCircleRight}/> En cours</Link>
                    <Link onClick={() => this.setState({selected: "CANCELED"})} className={`mission-link ${this.state.selected === "CANCELED" ? "selected" : ""}`} to="?cat=CANCELED"><FontAwesomeIcon icon={faBan}/> Annulées</Link>
                </div>
            </div>
        )
    };

    renderBody = () => {
        return (
            <div className="mission-body">
                <MDBContainer>
                    {this.renderMissions()}
                </MDBContainer>
            </div>
        )
    };

    render() {
        return (
            <div className="h-100">
                {this.renderSideNav()}
                {this.renderBody()}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreelanceMission)
