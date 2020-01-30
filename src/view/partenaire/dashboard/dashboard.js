import React from 'react'
import {Line} from "react-chartjs-2";
import {MDBRow, MDBCol} from "mdbreact";
import {Bar} from "react-chartjs-2";
import {Link} from "react-router-dom";
import {
  faStar,
  faCheckDouble,
  faMoneyCheckAlt,
  faChartBar,
  faWallet,
  faReceipt, faCheck, faEye, faStreetView, faUsers, faCubes, faHourglassHalf
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './dashboard.css'


class DashboardFreelance extends React.Component {
    constructor(props) {
        super(props);
        if (typeof document !== undefined) {
            let params = new URLSearchParams(window.location.search);
            let value = params.get('cat');
            this.setState({
                selected: value || this.state.selected
            });
        }
    }

    componentWillMount = async () => {
        if (typeof document !== undefined) {
            let params = new URLSearchParams(window.location.search);
            let value = params.get('cat');
            this.setState({
                selected: value || this.state.selected
            });
        }
    };

    state = {
        selected: "CA",
        dataLine: {
            labels: ["Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Dec."],
            datasets: [
                {
                    label: "Chiffre d'affaire",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(225, 204,230, .3)",
                    borderColor: "rgb(205, 130, 158)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(205, 130,1 58)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ]
        },
        dataBar: {
            labels: ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"],
            datasets: [
                {
                    label: "Recommendations",
                    data: [12, 2, 3, 19, 5],
                    backgroundColor: [
                        "rgba(255, 134,159,0.4)",
                        "rgba(98,  182, 239,0.4)",
                        "rgba(255, 218, 128,0.4)",
                        "rgba(113, 205, 205,0.4)",
                        "rgba(170, 128, 252,0.4)",
                        "rgba(255, 177, 101,0.4)"
                    ],
                    borderWidth: 2,
                    borderColor: [
                        "rgba(255, 134, 159, 1)",
                        "rgba(98,  182, 239, 1)",
                        "rgba(255, 218, 128, 1)",
                        "rgba(113, 205, 205, 1)",
                        "rgba(170, 128, 252, 1)",
                        "rgba(255, 177, 101, 1)"
                    ]
                }
            ]
        },
        barChartOptions: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                xAxes: [
                    {
                        barPercentage: 1,
                        gridLines: {
                            display: true,
                            color: "rgba(0, 0, 0, 0.1)"
                        }
                    }
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: true,
                            color: "rgba(0, 0, 0, 0.1)"
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    };

    renderSideNav = () => {
        return (
            <div className="side-nav-custom-dashboard">
                <div className="status">
                    <Link onClick={() => this.setState({selected: "CA"})}
                          className={`mission-link ${this.state.selected === "CA" ? "selected" : ""}`}
                          to="?cat=CA"><FontAwesomeIcon icon={faMoneyCheckAlt}/> Chiffre d'affaire</Link>
                    <Link onClick={() => this.setState({selected: "ANALYTICS"})}
                          className={`mission-link ${this.state.selected === "ANALYTICS" ? "selected" : ""}`}
                          to="?cat=ANALYTICS"><FontAwesomeIcon icon={faChartBar}/> Analytics</Link>
                    <Link onClick={() => this.setState({selected: "MISSIONS"})}
                          className={`mission-link ${this.state.selected === "MISSIONS" ? "selected" : ""}`}
                          to="?cat=MISSIONS"><FontAwesomeIcon
                        icon={faCheckDouble}/> Missions</Link>
                    <Link onClick={() => this.setState({selected: "REVIEWS"})}
                          className={`mission-link ${this.state.selected === "REVIEWS" ? "selected" : ""}`}
                          to="?cat=REVIEWS"><FontAwesomeIcon icon={faStar}/> Reviews</Link>
                </div>
            </div>
        )
    };

    renderStats = () => {
        if (this.state.selected === "CA") {
            return (
                <div className="stats-body p-xl-5">
                    <div className="stat-box p-4">
                        <h2>Chiffre d'affaires</h2>
                        <div className="container">
                            <MDBRow className="mt-5">
                                <MDBCol className="col-6">
                                    <MDBRow className="">
                                        <MDBCol className="col-2 stat-icon"><FontAwesomeIcon icon={faWallet} size="2x"/></MDBCol>
                                        <MDBCol>
                                            <MDBRow>Chiffre d'affaires (12 derniers mois)</MDBRow>
                                            <MDBRow><span className="stat-revenu">0€</span></MDBRow>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="mt-3">
                                        <MDBCol className="col-2 stat-icon"><FontAwesomeIcon icon={faReceipt}
                                                                                             size="2x"/></MDBCol>
                                        <MDBCol>
                                            <MDBRow>Montant des missions en cours</MDBRow>
                                            <MDBRow><span className="stat-revenu">0€</span></MDBRow>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="mt-3">
                                        <MDBCol className="col-2 stat-icon"><FontAwesomeIcon icon={faCheck}
                                                                                             size="2x"/></MDBCol>
                                        <MDBCol>
                                            <MDBRow className="d-flex align-items-center"><span
                                                className="stat-revenu mr-2">0</span> Missions terminées</MDBRow>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="mt-5">
                                <MDBCol className="col-6">
                                    <h4>Evolution du chiffre d'affaires</h4>
                                    <Line data={this.state.dataLine} options={{responsive: true}}/>
                                </MDBCol>
                            </MDBRow>
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.selected === "ANALYTICS") {
            return (
                <div className="stats-body p-xl-5">
                    <div className="stat-box p-4">
                        <h2>Statistiques</h2>
                        <div className="container">
                            <MDBCol className="mt-5">
                                <h3>Ma visibilité</h3>
                                <MDBRow className="mt-3">
                                    <MDBCol className="col-6">
                                        <MDBRow className="">
                                            <MDBCol className="col-2 stat-icon"><FontAwesomeIcon icon={faEye}
                                                                                                 size="2x"/></MDBCol>
                                            <MDBCol>
                                                <MDBRow className="d-flex align-items-center"><span
                                                    className="stat-analytics-item-important mr-2">0 Apparitions</span></MDBRow>
                                                <MDBRow>dans les résultats de recherche</MDBRow>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow className="mt-3">
                                            <MDBCol className="col-2 stat-icon"><FontAwesomeIcon icon={faStreetView}
                                                                                                 size="2x"/></MDBCol>
                                            <MDBCol>
                                                <MDBRow className="d-flex align-items-center"><span
                                                    className="stat-analytics-item-important mr-2">1 Vue</span></MDBRow>
                                                <MDBRow>sur votre profil</MDBRow>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow className="mt-3">
                                            <MDBCol className="col-2 stat-icon"><FontAwesomeIcon icon={faUsers}
                                                                                                 size="2x"/></MDBCol>
                                            <MDBCol>
                                                <MDBRow className="d-flex align-items-center"><span
                                                    className="stat-analytics-item-important mr-2">10</span></MDBRow>
                                                <MDBRow>position moyenne à Montpellier</MDBRow>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.selected === "MISSIONS") {
            return (
                <div className="stats-body p-xl-5">
                  <div className="stat-box p-4">
                    <h2>Missions</h2>
                    <div className="container">
                      <MDBCol className="mt-5">
                        <h3>Statistiques</h3>
                        <MDBRow className="mt-3">
                          <MDBCol className="col-6">

                            <MDBRow className="">
                              <MDBCol className="col-2 stat-icon"><FontAwesomeIcon icon={faCubes}
                                                                                   size="2x"/></MDBCol>
                              <MDBCol>
                                <MDBRow className="d-flex align-items-center"><span
                                    className="stat-analytics-item-important mr-2">0</span> Proposition(s) de mission</MDBRow>
                              </MDBCol>
                            </MDBRow>

                            <MDBRow className="mt-3">
                              <MDBCol className="col-2 stat-icon"><FontAwesomeIcon icon={faCheckDouble}
                                                                                   size="2x"/></MDBCol>
                              <MDBCol>
                                <MDBRow className="d-flex align-items-center"><span
                                    className="stat-analytics-item-important mr-2">0</span>Mission(s) terminée(s)</MDBRow>
                              </MDBCol>
                            </MDBRow>

                            <MDBRow className="mt-3">
                              <MDBCol className="col-2 stat-icon"><FontAwesomeIcon icon={faHourglassHalf}
                                                                                   size="2x"/></MDBCol>
                              <MDBCol>
                                <MDBRow className="d-flex align-items-center"><span
                                    className="stat-analytics-item-important mr-2">1</span> Mission(s) en cours</MDBRow>
                              </MDBCol>
                            </MDBRow>

                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                    </div>
                  </div>
                </div>
            )
        } else if (this.state.selected === "REVIEWS") {
            return (
                <div className="stats-body p-xl-5">
                    <div className="stat-box p-4">
                        <h2>Recommendations</h2>
                        <div className="stat-item">
                            <MDBRow className="mt-5">
                                <MDBCol>
                                    <h3>Recommendations</h3>
                                    <Bar data={this.state.dataBar} options={this.state.barChartOptions}/>
                                </MDBCol>
                            </MDBRow>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="main-missions">
                {this.renderSideNav()}
                {this.renderStats()}
            </div>
        )
    }
}

export default DashboardFreelance
