import React, {useState} from 'react'
import {connect} from "react-redux";
import {MDBBtn, MDBBtnGroup, MDBCard, MDBIcon, MDBInput, MDBRow} from "mdbreact";
import {faCameraRetro, faClock, faMapPin, faRunning, faThumbsUp, faWrench} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {updateBio, updateSkills} from "../../../reducer/freelanceProfile";

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
        updateBio: (bio) => { dispatch(updateBio(bio)) },
        updateSkills: (skills) => { dispatch(updateSkills(skills)) }
    }
};

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
               margin: '24px'}}>
                <div className="d-flex flex-column">
                    <ProfileCardDetails profile={this.props.freelanceProfile.profile}/>
                    <div className="d-flex flex-row" style={{marginTop: '24px'}}>
                        <FreelancerSkills skills={this.props.freelanceProfile.profile.skills}/>
                        <div className="d-flex flex-column" style={{paddingLeft: '62px'}}>
                            <PrefMissions missions={this.props.freelanceProfile.profile.missions}/>
                            <BioFreelance bio={this.props.freelanceProfile.profile.bio} updateBio={this.props.updateBio}/>
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
                    border = {borderRight: '0px', borderRadius: '6px 0px 0px 6px'};
                    break;
                }
                case 1: {
                    border = {borderRight: '0px'};
                    break;
                }
                case 3: {
                    border = {borderLeft: '0px', borderRadius: '0px 6px 6px 0px'};
                    break;
                }
                default: return border;
            }
            return border;
        }

        return (
            <div className="d-flex flex-row">
                <MDBBtnGroup>
                {
                    data.map((stat, idx) => (
                            <MDBBtn color={idx === 0 ? "blue" : null} size="sm" style={{border: '1px'}}>
                                <h6 style={{color: "#bababa"}}>{stat.label}</h6>
                                <h6>{stat.value}</h6>
                            </MDBBtn>
                    ))
                }
                </MDBBtnGroup>
            </div>
        );

        {/*<div className="d-flex flex-column align-items-center justify-content-between" key={idx}*/}
        {/*     style={{minWidth: '145px', padding: '8px', textAlign: 'center',...calcBorderRadius(idx),*/}
        {/*         backgroundColor: (idx===0) ? primaryColor: '', borderColor: (idx === 0)? primaryColor:'grey'}}>*/}
        {/*    <small style={{maxWidth: '14ch', margin: 'auto', color: (idx === 0)? 'white':'grey'}}>{stat.label}</small>*/}
        {/*    <p style={{margin: 'auto', fontWeight: 'bold', color: (idx === 0)? 'white':'grey'}}>{stat.value}</p>*/}
        {/*</div>*/}
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
    let [_skill, updateSkill] = useState("");
    let [_skills, handleSkills] = useState(skills);
    const [canEdit, toggleEdit] = useState(false);

    function removeSkill(idx) {
        _skills.splice(idx, 1);
        handleSkills([..._skills]);
        console.log(_skills);
    }

    function addSkill(skill) {
        if (!skill || _skills.includes(skill))
            return;
        _skills.push(skill);
        handleSkills([..._skills]);
    }

    function handleSkill(e) {
        updateSkill(e.target.value);
    }

    function saveSkills(skills) {
        // dispatch to redux and update using api
        console.log("saving to redux, calling api..");
        toggleEdit(!canEdit)
    }

    return (
        <MDBCard style={{...cardStyle, minWidth: '300px'}}>
            <ul className="list-group">
                <li className="list-group-item">
                    <MDBRow className="justify-content-around align-items-center">
                        <h5 style={{color: 'grey'}}>Compétences ({_skills.length})</h5>
                        {
                            canEdit ?
                                <MDBBtn size="sm" gradient="aqua" onClick={() => saveSkills(_skills)}>
                                    <MDBIcon icon="save" className="mr-1" />
                                </MDBBtn> :
                                <MDBBtn size="sm" gradient="blue" onClick={() => toggleEdit(!canEdit)}>
                                    <MDBIcon icon="magic" className="mr-1" />
                                </MDBBtn>
                        }
                    </MDBRow>
                </li>
                { canEdit ?
                    <li  className="list-group-item" style={{listStyle: "none"}}>
                        <MDBRow className="justify-content-around align-items-center" style={{margin: '-24px'}}>
                            <MDBInput hint="Nouvelle compétence" onInput={(e) => handleSkill(e)}/>
                            <MDBBtn size="sm" gradient="aqua" onClick={() => addSkill(_skill)}>
                                <MDBIcon icon="plus" className="mr-1" />
                            </MDBBtn>
                        </MDBRow>
                    </li> : null
                }
                {
                    _skills.sort((a, b) => a.localeCompare(b)).map((skill, idx) => (
                        <li className="list-group-item" key={idx}>
                            <MDBRow className="justify-content-between align-items-center" style={{margin: '0px'}}>
                                <h6 style={{fontWeight:'bold', color: '#656565'}}>{skill}</h6>
                                { canEdit ?
                                    <MDBBtn size="sm" gradient="peach" onClick={() => removeSkill(idx)}>
                                        <MDBIcon icon="trash-alt" className="mr-1" />
                                    </MDBBtn> : null
                                }
                            </MDBRow>
                        </li>))
                }
            </ul>
        </MDBCard>
    );
}

function PrefMissions({missions}) {
    let missionIcons = [faRunning, faWrench, faClock];

    const [canEdit, toggleEdit] = useState(false);
    const [_missions, updateMissions] = useState(missions);


    function saveMissions() {
        console.log("save missions");
        toggleEdit(!canEdit);
        // dispatch _missions
    }

    function handleMission(e, index) {
        console.log(e.target.value, _missions);
        _missions[index].description = e.target.value;
        updateMissions([..._missions]);
    }

    return (
        <MDBCard style={{...cardStyle}}>
            <div className="d-flex flex-column" style={{padding: '16px', paddingLeft: '32px', minWidth: '1000px'}}>
                <div className="d-flex flex-row justify-content-between align-items-end" style={{paddingBottom: '16px'}}>
                    <h5 style={{color: primaryColor}}>Préférences de missions</h5>
                    {
                        canEdit ? <MDBBtn size="sm" gradient="aqua" type="submit" onClick={() => saveMissions()}>Sauvegarder</MDBBtn> :
                            <MDBBtn size="sm" gradient="blue" onClick={() => toggleEdit(!canEdit)}>Modifier</MDBBtn>
                    }
                </div>
                <div className="d-flex flex-row justify-content-between" >
                    {
                        _missions.map((mission, index) => (
                            canEdit ?
                                <div className="d-flex flex-row" style={{width: '400px'}} key={index}>
                                    <MDBInput valueDefault={mission.description} type="textarea" label={mission.label}
                                              onInput={(e) => handleMission(e, index)} style={{minWidth: '350px'}}/>
                                </div> :
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

function BioFreelance({bio, updateBio}) {
    const [canEdit, toggleEdit] = useState(false);
    const [bioValue, setBio] = useState(bio);

    function saveBio() {
        updateBio(bioValue);
        toggleEdit(!canEdit)
    }

    function handleText(e) {
        setBio(e.target.value);
    }

    return (
        <MDBCard style={{...cardStyle}}>
            <div className="d-flex flex-column" style={{padding: '16px', paddingLeft: '32px'}}>
                <div className="d-flex flex-row justify-content-between">
                    <h5 style={{color: primaryColor, paddingBottom: '12px'}}>Vous en quelques mots</h5>
                    {
                        canEdit ? <MDBBtn size="sm" gradient="aqua" type="submit" onClick={() => saveBio()}>Sauvegarder</MDBBtn> :
                        <MDBBtn size="sm" gradient="blue" onClick={() => toggleEdit(!canEdit)}>Modifier</MDBBtn>
                    }
                </div>
                {
                    canEdit ? <MDBInput valueDefault={bio} type="textarea" label="Modifier votre description" onInput={(e) => handleText(e)}/> :
                    <h6>{bio}</h6>
                }
            </div>
        </MDBCard>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FreelanceProfile);
