import React from 'react';
import {connect} from "react-redux";
import {getMissions} from "../../../reducer/missions";
import {MDBContainer} from "mdbreact";
import "./missions.css";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleRight, faBan, faCheckDouble, faPen} from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state) => {
    return {
        missions: state.missions,
        authenticate: state.authenticate
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMissions: (token) => {
            dispatch(getMissions(token))
        }
    }
};

class FreelanceMission extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: "WAITING"
        }
    }

    componentWillMount = async () => {
        let {getMissions} = this.props;
        await getMissions(this.props.authenticate.token);

        if (typeof document !== undefined) {
            let params = new URLSearchParams(window.location.search);
            let value = params.get('cat');
            this.setState({
                selected: value || this.state.selected
            });
        }
    };

    renderSideNav = () => {
        return (
            <div className="side-nav-custom">
                <div className="font-weight-bolder">Statut</div>

                <div className="status">
                    <Link onClick={() => this.setState({selected: "WAITING"})}
                          className={`mission-link ${this.state.selected === "WAITING" ? "selected" : ""}`}
                          to="?cat=WAITING"><FontAwesomeIcon icon={faPen}/> En attente</Link>
                    <Link onClick={() => this.setState({selected: "CURRENT"})}
                          className={`mission-link ${this.state.selected === "CURRENT" ? "selected" : ""}`}
                          to="?cat=CURRENT"><FontAwesomeIcon icon={faArrowAltCircleRight}/> En cours</Link>
                    <Link onClick={() => this.setState({selected: "DONE"})}
                          className={`mission-link ${this.state.selected === "DONE" ? "selected" : ""}`} to="?cat=DONE"><FontAwesomeIcon
                        icon={faCheckDouble}/> Terminées</Link>
                    <Link onClick={() => this.setState({selected: "CANCELED"})}
                          className={`mission-link ${this.state.selected === "CANCELED" ? "selected" : ""}`}
                          to="?cat=CANCELED"><FontAwesomeIcon icon={faBan}/> Annulées</Link>
                </div>
            </div>
        )
    };

    renderMissions = () => {
        let {missions} = this.props;
        if (!missions.missions.length)
            return null;

        let tmp = missions.missions;
        let res = tmp.filter(x => x.status === this.state.selected);
        console.log(res);

        let data = res.map((item, i) => {
            return (
                <div className="mission-item">
                    <div className="mission-item-left">
                        <div className="mission-item-owner">{item.houseOwner}</div>
                        <div className="mission-item-pic"><img src={item.img} alt="image mission" className="imageMission"/></div>
                    </div>
                    <div className="mission-item-right">
                        <div className="mission-item-name">{item.name}<span className="mission-item-date">&nbsp;({item.date})</span></div>
                        <div className="mission-item-description">{item.object}</div>
                        <br/>
                        <p className="dealMission">{item.deal}€</p>
                    </div>
                </div>
            )
        });

        return (
            <div className="mission-list">
                {data}
            </div>
        )
    };

    renderBody = () => {
        return (
            <div className="mission-body p-xl-5">
                <MDBContainer>
                    {this.renderMissions()}
                </MDBContainer>
            </div>
        )
    };

    render() {
        return (
            <div className="main-missions">
                {this.renderSideNav()}
                {this.renderBody()}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreelanceMission)
