import React, {useState} from 'react'
import {connect} from "react-redux";
import {MDBBtn, MDBCard, MDBCol, MDBIcon, MDBInput, MDBRow, MDBContainer, MDBModal, MDBModalHeader, MDBModalBody, MDBAlert} from "mdbreact";
import {faCameraRetro, faMapPin} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {updateBio, updateSkills, updateStats, getProfile, getProfileUrl, setProfile, uploadPP, sendEmail, changeDisponible} from "../../reducer/profile";
import LazyLoad from 'react-lazy-load';
import './profile.css'

let primaryColor = '#3972C0';
let cardStyle = {marginTop: '24px', justifyContent: 'space-between', minHeight : '200px'};

const mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        profile: state.profile
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadFile: (token, data) => { dispatch(uploadPP(token, data))},
        getProfile: (token) => { dispatch(getProfile(token))},
        setProfile: (token, state) => { dispatch(setProfile(token, state))},
        getProfileUrl : (url) => { dispatch(getProfileUrl(url))},
        updateBio: (bio) => { dispatch(updateBio(bio)) },
        updateSkills: (skills) => { dispatch(updateSkills(skills)) },
        updateStats: (skills) => { dispatch(updateStats(skills)) },
        sendEmail: (token, email) => { dispatch(sendEmail(token, email))},
        changeDisponible : (token, disponible) => { dispatch(changeDisponible(token, disponible))}
    }
};

class Profile extends React.Component {
    constructor(props) {
        super(props);

        //chage le profil avec le token du user connecté
        if (typeof this.props.match.params.name === "undefined") {
            this.props.getProfile(this.props.authenticate.token)
            this.state = {selectedFile : null, modal : false, canEdit: true};
        }
        else {
            //Charge si il y a un /profile/name.firstname
            this.props.getProfileUrl(props.match.params.name)
            this.state = {selectedFile : null, modal : false, canEdit: false};

        }
    }

    handleEdit(edit) {
        this.setState({canEdit: !edit});
    }

    uploadModal = () => {
        this.setState({modal : !this.state.modal})
    }

    onFilesAdded = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    upload = async () => {
        const data = new FormData()
        data.append('image', this.state.selectedFile, this.state.selectedFile.name)
        console.log(this.state)
        await this.props.uploadFile(this.props.authenticate.token, data)
        this.setState({modal : !this.state.modal})
        localStorage.removeItem('profile');
        window.location.reload()
    }

    sendEmail = () => {
        this.props.sendEmail(this.props.authenticate.token, this.props.profile.profile.email)
    }
    
    disponible = async () => {
        await this.props.changeDisponible(this.props.authenticate.token, this.props.profile.profile.disponible)
    }

    render() {
        return (
            <MDBContainer className="marginHeader">
                    {
                        this.props.profile.profile.emailVerified === false && this.state.canEdit ?
                        <MDBAlert>Veuillez verifiez votre email pour valider votre compte <span style={{textDecoration : "underline", cursor : "pointer"}} alt="réenvoyer l'email" onClick={this.sendEmail}>(réenvoyer l'email)</span></MDBAlert>: ""
                    }
                    <MDBModal isOpen={this.state.modal}
                    toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle}>Changer de photo de profil</MDBModalHeader>
                        <MDBModalBody>
                        <div className="input-group">
                            <div className="custom-file">
                            <input
                                onChange={this.onFilesAdded}
                                type="file"
                                className="custom-file-input"
                                id="inputGroupFile01"
                                name="file"
                                aria-describedby="inputGroupFileAddon01"
                            />
                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                                Séléctionner une image
                            </label>
                            </div>
                        </div>
                        <br/>
                        {
                            this.state.selectedFile !== null ?
                            <div>
                            <p>{this.state.selectedFile.name}</p> 
                            <MDBBtn className="w-100" onClick={this.upload} gradient="blue">Sauvegarder</MDBBtn>
                            </div>
                            : ""
                        }
                        </MDBModalBody>
                    </MDBModal>

                    <MDBRow>
                    <MDBCol className="mt-3">
                    <ProfileCardDetails upload={this.uploadModal} disponible={this.disponible} canEdit={this.state.canEdit} profile={this.props.profile.profile} updateStats={this.props.updateStats}/>
                    </MDBCol>
                    </MDBRow>
                    {
                        this.props.profile.profile.type === "freelance" ? 
                        <MDBRow>
                        <MDBCol md="4">
                        <FreelancerSkills token={this.props.authenticate.token} editSkills={this.props.setProfile} canEdit={this.state.canEdit} skills={this.props.profile.profile.skills}/>
                        </MDBCol>
                        <MDBCol md="8">
                        <BioFreelance token={this.props.authenticate.token} editBio={this.props.setProfile} canEdit={this.state.canEdit} bio={this.props.profile.profile.bio} updateBio={this.props.updateBio}/>
                        </MDBCol>
                        </MDBRow>
                        : ""
                    }
            </MDBContainer>
        )
    }
}

function ProfileCardDetails(props) {
    let profile = props.profile
    let canEdit = props.canEdit

    return (
        <MDBCard style={cardStyle}>
                <MDBRow>
                <MDBCol md="4">
                <LazyLoad offsetRight={100} className="alignImage" offsetLeft={100} debounce={false} height={200} throttle={0}>
                <img alt="profile" style={{maxWidth : "350px", maxHeight : "100%"}} src={profile.avatar} ></img>
                </LazyLoad>
                    {
                    canEdit ?
                    <div className="d-flex flex-row justify-content-center align-items-baseline" style={{width: '100%', color: 'white'}}>
                        <MDBBtn onClick={props.upload} className="w-100" color="grey" size="sm" style={{opacity: '70%', width: '100%'}}>
                            <FontAwesomeIcon icon={faCameraRetro} size="1x" style={{marginRight: '5px'}}/>
                            Modifier photo
                        </MDBBtn>
                    </div>
                    : ""
                    }
                </MDBCol>
                
                <MDBCol md="8">
                <div className="d-flex flex-column" style={{padding: '16px', paddingLeft: '32px'}}>
                    <div>
                        <h2 style={{fontWeight: 'initial'}}>{profile.name} {profile.surname}</h2>
                        <h3>{profile.caption.charAt(0).toUpperCase() + profile.caption.slice(1)}</h3>
                        {
                            typeof profile.location !== "undefined" ?
                            <div>
                            <span className="d-flex flex-row align-items-baseline">
                            <FontAwesomeIcon icon={faMapPin} size="lg" color={primaryColor} style={{marginRight: '5px'}}/>
                            <p>{profile.location}</p>
                            </span>
                            {
                                canEdit ?
                                <div className='custom-control custom-switch'>
                                <input
                                type='checkbox'
                                className='custom-control-input'
                                id='customSwitches'
                                checked={profile.disponible}
                                onChange={props.disponible}
                                />
                                <label className='custom-control-label' htmlFor='customSwitches'>
                                A l'écoute de nouvelles missions
                                </label>
                                </div> : 
                                <div>
                                <MDBIcon className={ profile.disponible ? "green-text" : "red-text" } size="lg" icon="bell" /> { profile.disponible ? "A l'écoute de nouvelles missions" : "N'est présentement pas à l'écoute de nouvelles missions"}
                                </div>
                            }
                            </div>
                            : ""
                        }
                    </div>
                </div>
                </MDBCol>
                </MDBRow>
        </MDBCard>
    );
}

function FreelancerSkills(props) {
    let skills = props.skills
    let canEdit = props.canEdit
    let [_skill, updateSkill] = useState("");
    let [_skills, handleSkills] = useState(skills);

    function removeSkill(idx) {
        _skills.splice(idx, 1);
        handleSkills([..._skills]);
        console.log(_skills);
    }

    function addSkill(skill) {
        if (!skill || _skills.includes(skill))
            return;
        _skills.push(skill);
        updateSkill("");
        handleSkills([..._skills]);
    }

    function handleSkill(e) {
        updateSkill(e.target.value);
    }

    async function saveSkills(skills) {
        await props.editSkills(props.token, {skills : skills})
        localStorage.removeItem('profile');
        window.location.reload()
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
                                </MDBBtn>
                                : ""
                                
                        }
                    </MDBRow>
                </li>
                { canEdit ?
                    <li  className="list-group-item" style={{listStyle: "none"}}>
                        <MDBRow className="justify-content-around align-items-center" style={{margin: '-24px'}}>
                            <MDBInput hint="Nouvelle compétence" value={_skill} onInput={(e) => handleSkill(e)}/>
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

function BioFreelance(props) {
    let bio = props.bio
    let updateBio = props.updateBio
    let canEdit = props.canEdit
    const [bioValue, setBio] = useState(bio);

    async function saveBio() {
        await updateBio(bioValue);
        await props.editBio(props.token, {bio : bioValue})
        await localStorage.removeItem('profile');
        window.location.reload()
    }

    function handleText(e) {
        setBio(e.target.value);
    }

    return (
        <MDBCard style={{...cardStyle}}>
            <div className="d-flex flex-column" style={{padding: '16px', paddingLeft: '32px'}}>
                <div className="d-flex flex-row justify-content-between">
                    <h5 style={{color: primaryColor, paddingBottom: '12px'}}>Description</h5>
                    {
                        canEdit ? <MDBBtn size="sm" gradient="aqua" type="submit" onClick={() => saveBio()}>Sauvegarder</MDBBtn> :
                        ""
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
