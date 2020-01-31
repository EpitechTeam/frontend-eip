import React, {useState} from 'react'
import {connect} from "react-redux";
import {
    MDBBtn,
    MDBBtnGroup,
    MDBCard,
    MDBCol,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBContainer,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBAlert,
    MDBDropdownMenu, MDBDropdownItem, MDBDropdown, MDBDropdownToggle, MDBListGroup, MDBListGroupItem
} from "mdbreact";
import {faCameraRetro, faMapPin} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { HorizontalBar } from "react-chartjs-2";
import {updateBio, updateSkills, updateStats, getProfile, getProfileUrl, setProfile, uploadPP, sendEmail, changeDisponible} from "../../reducer/profile";
import LazyLoad from 'react-lazy-load';
import './profile.css'
import {Bar} from "react-chartjs-2";

let primaryColor = '#3972C0';
let cardStyle = {marginTop: '14px', marginBottom: '24px', justifyContent: 'space-between'};

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
                        <Gamification />
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBCol>
                                <BioFreelance token={this.props.authenticate.token} editBio={this.props.setProfile} canEdit={this.state.canEdit} bio={this.props.profile.profile.bio} updateBio={this.props.updateBio}/>
                                <Reviews canEdit={this.state.canEdit} profile={this.props.profile.profile}/>
                            </MDBCol>
                        </MDBCol>
                        </MDBRow>
                        : ""
                    }
            </MDBContainer>
        )
    }
}

function Reviews(props) {
    let canEdit = props.canEdit;
    let [filter, handleFilter] = useState("");
    let [showComments, toggleComments] = useState(false);

    // ratings should come from user profile data redux api
    let ratings = { one: 3, two: 6, three: 20, four: 67, five: 88 };
    let total = ratings.one + ratings.two + ratings.three + ratings.four + ratings.five;
    let labels = ["⭐⭐⭐⭐⭐ " + ratings.five, "⭐⭐⭐⭐ " + ratings.four, "⭐⭐⭐ " + ratings.three, "⭐⭐ " + ratings.two, "⭐ " + ratings.one];
    let average = Math.round((ratings.one + ratings.two *2 + ratings.three*3 + ratings.four*4 + ratings.five*5) / total*100) / 100;
    let dataBar = {
        labels: labels,
        datasets: [
            {
                label: "",
                data: [ratings.five, ratings.four, ratings.three, ratings.two, ratings.one],
                backgroundColor: [
                    "rgba(255, 218, 128, 1)",
                    "rgba(113, 205, 205, 1)",
                    "rgba(98,  182, 239, 1)",
                    "rgba(255, 177, 101, 1)",
                    "rgba(255, 134, 159, 1)"
                ],
                borderWidth: 2
            }
        ]
    };

    let options = {
        responsive: true,
            maintainAspectRatio: true,
            scales: {
            xAxes: [
                {
                    gridLines: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.1)"
                    }
                }
            ],
                yAxes: [
                {
                    barPercentage: 1,
                    gridLines: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.1)"
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        },
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem) {
                    return tooltipItem.xLabel;
                }
            }
        }
    };

    function Comments(props) {
        let commentLimit = 5;
        let [page, changePage] = useState(0);

        let comments = new Array(100).fill({
            date: "22/04/2019",
            name: "Thomas Dumas",
            rating: "⭐⭐⭐⭐⭐",
            comment: "Service et execution à la perfection. Je recommande fortement !",
            id: ''
        }).map((comment, index) => ({...comment, id: index+1}));

        let total = comments.length;

        function handlePage(page, action) {
            if (action === 'prev' && page > 1) {
                changePage(page - commentLimit);
            }
            else if (action === "next" && (page + commentLimit < total))
                changePage(page + commentLimit);
        }

        return (
            <div style={{paddingTop: '12px'}}>
                <MDBListGroup>
                    {
                        comments.splice(page, commentLimit).map(comment => (
                            <MDBListGroupItem>
                                <MDBRow className="justify-content-between">
                                    <small>#{comment.id} {comment.name}</small>
                                    <small>{comment.date}</small>
                                </MDBRow>
                                <p>{comment.comment}</p>
                                <small>{comment.rating}</small>
                            </MDBListGroupItem>
                        ))
                    }
                </MDBListGroup>
                <MDBRow className="justify-content-center align-items-baseline" style={{paddingTop: '12px'}}>
                    <MDBBtn color="primary" size="sm" onClick={() => handlePage(page, 'prev')}><MDBIcon icon="caret-left" size="lg"/></MDBBtn>
                    <p>{Math.ceil(page / commentLimit)+1} / {Math.ceil(total / commentLimit)} </p>
                    <MDBBtn color="primary" size="sm" onClick={() => handlePage(page, 'next')}><MDBIcon icon="caret-right" size="lg"/></MDBBtn>
                </MDBRow>
            </div>
        );
    }

    return (
        <MDBCard style={{...cardStyle}}>
            <div className="d-flex flex-column" style={{padding: '16px', paddingLeft: '32px'}}>
                <MDBCol>
                    <MDBRow className="justify-content-between">
                        <h6>Avis</h6>
                        <h6>Notation moyenne: {average}</h6>
                    </MDBRow>
                    <HorizontalBar data={dataBar} options={options} height={100}/>
                    { !canEdit ?
                        <MDBCol style={{paddingTop: '6px'}}>
                            <MDBRow className="justify-content-between align-items-center">
                                <h6>{total} commentaires et notations</h6>
                                <MDBBtn outline color="primary" size="sm" onClick={() => toggleComments(!showComments)}>
                                    {showComments ? "cacher" : "afficher" } commentaires
                                </MDBBtn>
                                    <MDBDropdown size="sm">
                                        <MDBDropdownToggle caret color="primary">
                                            Filtrer par: {filter === "max" ? "Meilleurs" : filter === "min" ? "Moins bien" : filter === "date" ? "Date" : ""}
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu basic color="info">
                                            <MDBDropdownItem onClick={() => handleFilter("date")}>Date</MDBDropdownItem>
                                            <MDBDropdownItem onClick={() => handleFilter("max")}>Meilleurs</MDBDropdownItem>
                                            <MDBDropdownItem onClick={() => handleFilter("min")}>Moins bien</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                            </MDBRow>
                            { showComments ? <Comments filter={filter}/> : null }
                        </MDBCol>
                        : null}
                </MDBCol>
            </div>
        </MDBCard>
    )
}

function Gamification() {
    return (
        <MDBCard style={{...cardStyle}}>
            <div className="d-flex flex-column" style={{padding: '16px', paddingLeft: '32px'}}>
                <MDBCol className="align-items-center">
                    <MDBRow className="justify-content-between">
                        <h5>Willally Level</h5>
                        <MDBIcon icon="trophy" size="lg" className="yellow-text"/>
                    </MDBRow>
                    <MDBRow className="justify-content-center">
                        <h1>642 / 10,000 pts</h1>
                    </MDBRow>
                    <MDBRow className="justify-content-between align-content-center">
                        <MDBIcon icon="award" size="4x" className="light-blue-text"/>
                        <MDBIcon icon="award" size="4x" className="light-blue-text"/>
                        <MDBIcon icon="award" size="4x" className="light-blue-text"/>
                        <MDBIcon icon="award" size="4x" className="grey-text"/>
                        <MDBIcon icon="award" size="4x" className="grey-text"/>
                    </MDBRow>
                </MDBCol>
            </div>
        </MDBCard>
    );
}

function ProfileCardDetails(props) {
    let profile = props.profile;
    let canEdit = props.canEdit;

    function AvailableButton() {
        return(
            <div className="d-flex flex-row flex-center">
                <MDBBtn color={profile.disponible ? "success" : "danger"} size="sm">
                    <MDBIcon icon={profile.disponible ? "bullhorn" : "bell-slash"} style={{marginRight: '6px'}}/>
                    {profile.disponible ? "disponible" : "pas disponible"}
                </MDBBtn>
                <MDBBtn color="primary" size="sm">
                    <MDBIcon icon="comment-alt" style={{marginRight: '6px'}}/>
                    contacter
                </MDBBtn>
            </div>
        )
    }

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
                <div className="d-flex flex-column" style={{padding: '16px'}}>
                    <div>
                        <h2 style={{fontWeight: 'initial'}}>{profile.name} {profile.surname}</h2>
                        <h3>{profile.caption.charAt(0).toUpperCase() + profile.caption.slice(1)}</h3>
                        {
                            typeof profile.location !== "undefined" ?
                            <div className="d-flex flex-column">
                            <span className="d-flex flex-row align-items-baseline">
                                <MDBIcon icon="map-marker-alt" size="lg" className="red-text" style={{marginRight: '5px'}}/>
                                <h4>{profile.location}</h4>
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
                                    { profile.disponible ? "A l'écoute de nouvelles missions" : "N'est présentement pas à l'écoute de nouvelles missions"}
                                </label>
                                </div> :
                                <div className="d-flex">
                                    <AvailableButton />
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
                        <h6 style={{color: 'grey'}}>Compétences ({_skills.length})</h6>
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
                    _skills.length === 0 ? <li className="list-group-item d-flex justify-content-center align-items-center text-warning">Aucun</li> :
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
    let bio = props.bio;
    let updateBio = props.updateBio;
    let canEdit = props.canEdit;
    const [bioValue, setBio] = useState(bio);

    async function saveBio() {
        await updateBio(bioValue);
        await props.editBio(props.token, {bio : bioValue});
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
                    <h6 style={{color: primaryColor, paddingBottom: '12px'}}>Description</h6>
                    {
                        canEdit ? <MDBBtn size="sm" gradient="aqua" type="submit" onClick={() => saveBio()}>Sauvegarder</MDBBtn> :
                        ""
                    }
                </div>
                {
                    canEdit ? <MDBInput valueDefault={bio} type="textarea" label="Modifier votre description" onInput={(e) => handleText(e)}/> :
                    <h6>{bio ? bio : "Aucune description donnée... 🤷"}</h6>
                }
            </div>
        </MDBCard>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
