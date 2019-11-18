import React from 'react'
import {connect} from "react-redux";
import {MDBBtn, MDBCard, MDBInput} from "mdbreact";
import {faCameraRetro, faClock, faMapPin, faRunning, faThumbsUp, faWrench} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import freelanceProfile from '../../../reducer/freelanceProfile'

let primaryColor = '#3972C0';
let cardStyle = {marginTop: '24px', justifyContent: 'space-between'};

const mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        freelanceProfile: state.freelanceProfile
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // example
        // logout: () => {
        //     dispatch(logout())
        // }
    }
};

function ProfileForm(props) {
    return (
        <div>
            {props.labels.map(label => (
                <MDBInput label={label} size="sm" />
            ))}
        </div>
    );
}

class FreelanceProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {canEdit: true};
    }

    handleEdit(edit) {
        this.setState({canEdit: !edit});
    }

    render() {
        return (
            <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '76px',
                height: '100vh'}}>
                <div className="d-flex flex-column">
                    <ProfileCardDetails profile={this.props.freelanceProfile.profile}/>
                    <div className="d-flex flex-row" style={{marginTop: '24px'}}>
                        <FreelancerSkills skills={this.props.freelanceProfile.profile.skills}/>
                        <div className="d-flex flex-column" style={{paddingLeft: '62px'}}>
                            <PrefMissions missions={this.props.freelanceProfile.profile.missions}/>
                            <BioFreelance bio={this.props.freelanceProfile.profile.bio}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function ProfileCardDetails({profile}) {

    function StatsPreview({stats}) {
        let data = [
            { label: 'Tarif indicatif', value: stats.price},
            { label: 'Expérience', value: stats.experience},
            { label: 'Taux de réponse', value: stats.responseRate},
            { label: 'Temps de réponse', value: stats.responseTime}
        ];

        function calcBorderRadius(index) {
            let border = {border: '1px solid grey'};

            switch (index) {
                case 0: {
                    border = {...border,  borderRight: '0px', borderRadius: '6px 0px 0px 6px'};
                    break;
                }
                case 1: {
                    border = {...border,  borderRight: '0px'};
                    break;
                }
                case 3: {
                    border = {...border,  borderLeft: '0px', borderRadius: '0px 6px 6px 0px'};
                    break;
                }
                default: return border;
            }
            return border;
        }

        return (
            <div className="d-flex flex-row">
                {
                    data.map((stat, idx) => (
                        <div className="d-flex flex-column align-items-center justify-content-between" key={idx}
                             style={{minWidth: '145px', padding: '8px', textAlign: 'center',...calcBorderRadius(idx),
                                backgroundColor: (idx===0) ? primaryColor: '', borderColor: (idx === 0)? primaryColor:'grey'}}>
                            <small style={{maxWidth: '14ch', margin: 'auto', color: (idx === 0)? 'white':'grey'}}>{stat.label}</small>
                            <p style={{margin: 'auto', fontWeight: 'bold', color: (idx === 0)? 'white':'grey'}}>{stat.value}</p>
                        </div>
                    ))
                }
            </div>
        );
    }

    return (
        <MDBCard style={cardStyle}>

            <div className="d-flex flex-row" style={{ paddingRight: '24px'}}>
                <div className="d-flex col-example align-items-end" style={{background: primaryColor, width: '350px',
                    height: '350px', backgroundImage: `url(${profile.avatar}}`, margin: '12px'}}>

                    <div className="d-flex flex-row justify-content-center align-items-baseline" style={{width: '100%', color: 'white'}}>
                        <MDBBtn className="w-100" color="grey" size="sm" style={{opacity: '70%', width: '100%'}}>
                            <FontAwesomeIcon icon={faCameraRetro} size="1x" style={{marginRight: '5px'}}/>
                            Modifier photo
                        </MDBBtn>
                    </div>
                </div>

                <div className="d-flex flex-column" style={{padding: '16px', paddingLeft: '32px'}}>
                    <div>
                        <h2 style={{fontWeight: 'initial'}}>{profile.name} {profile.surname}</h2>
                        <h3>{profile.caption}</h3>
                        <span className="d-flex flex-row align-items-baseline">
                            <FontAwesomeIcon icon={faMapPin} size="1x" color={primaryColor} style={{marginRight: '5px'}}/>
                            <p>{profile.location}</p>
                        </span>
                    </div>

                    <div className="d-flex flex-column" style={{paddingTop: '20px'}}>
                        <span className="d-flex flex-row align-items-baseline">
                            <FontAwesomeIcon icon={faThumbsUp} size="1x" color={primaryColor} style={{marginRight: '5px'}}/>
                            <p>{profile.stats.recommandations} recommandations</p>
                        </span>
                        <StatsPreview stats={profile.stats}/>
                    </div>
                </div>

            </div>

        </MDBCard>
    );
}

function FreelancerSkills({skills}) {
    return (
        <MDBCard style={{...cardStyle, minWidth: '300px'}}>
            <ul className="list-group">
                <li className="list-group-item disabled">
                    <h5 style={{color: 'grey'}}>Compétences ({skills.length})</h5>
                </li>
                {
                    skills.map((skill, idx) => (
                        <li className="list-group-item" key={idx}>
                            <h6 style={{fontWeight:'bold', color: '#656565'}}>{skill}</h6>
                        </li>))
                }
            </ul>
        </MDBCard>
    );
}

function PrefMissions({missions}) {
    let missionIcons = [faRunning, faWrench, faClock];

    return (
        <MDBCard style={{...cardStyle}}>
            <div className="d-flex flex-column" style={{padding: '16px', paddingLeft: '32px', minWidth: '1000px'}}>
                <div className="d-flex flex-row justify-content-between align-items-end" style={{paddingBottom: '16px'}}>
                    <h5 style={{color: primaryColor}}>Préférences de missions</h5>
                    <MDBBtn size="sm" gradient="blue">Modifier</MDBBtn>
                </div>
                <div className="d-flex flex-row justify-content-between" >
                    {
                        missions.map((mission, index) => (
                            <div className="d-flex flex-row" style={{width: '400px'}} key={index}>
                                <FontAwesomeIcon icon={missionIcons[index]} size="1x" style={{marginRight: '5px'}}/>
                                <div>
                                    <p>{mission.label}</p>
                                    <h6>{mission.description}</h6>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </MDBCard>
    )
}

function BioFreelance({bio}) {
    return (
        <MDBCard style={{...cardStyle}}>
            <div className="d-flex flex-column" style={{padding: '16px', paddingLeft: '32px'}}>
                <h5 style={{color: primaryColor, paddingBottom: '12px'}}>Vous en quelques mots</h5>
                <h6>{bio}</h6>
            </div>
        </MDBCard>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FreelanceProfile);
