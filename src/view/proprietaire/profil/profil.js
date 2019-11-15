import React from 'react'
import {MDBBtn, MDBCard, MDBInput } from "mdbreact";
import {faUserCircle, faUserNinja} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

let cardStyle = {marginTop: '24px', padding: '12px', justifyContent: 'space-between'};

function ProfileForm(props) {
    return (
        <div>
            {props.labels.map(label => (
                <MDBInput label={label} size="sm" />
            ))}
        </div>
    );
}

class ProprietaireProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {canEdit: true};
    }

    handleEdit(edit) {
        this.setState({canEdit: !edit});
    }

    render() {
        let data = ['Monty', 'Criel', 'Propriétaire', 'monty.criel@epitech.eu', 'Berlin', 'Petit déj'];
        let labels = ['Name', 'Surname', 'Status', 'Email', 'Localisation', 'Services'];

        return (
            <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '76px',
                height: '100vh'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <MDBCard style={cardStyle}>
                            <div style={{display: 'flex', flexDirection: 'row', paddingLeft: '24px', paddingRight: '24px'}}>
                                <div style={{display: 'flex', alignItems: 'center', paddingLeft: '12px', paddingRight: '12px'}}>
                                    <FontAwesomeIcon icon={faUserNinja} size="8x"/>
                                </div>
                                <div style={{padding: '32px'}}>
                                    <p>Monty Criel</p>
                                    <p>monty.criel@epitech.eu</p>
                                    <p>Propriétaire</p>
                                    <p>Berlin</p>
                                </div>
                            </div>
                    </MDBCard>

                    <MDBCard style={cardStyle}>
                        <div className="d-flex justify-content-between" style={{marginLeft: '16px', marginRight: '16px',
                            padding: '12px'}}>
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faUserCircle} color="#33b5e5" size="3x" style={{paddingRight: '6px'}}/>
                                Profil Personnel
                            </div>
                            {this.state.canEdit ? <MDBBtn size="sm" color="info" onClick={() => this.handleEdit(this.state.canEdit)}>Edit</MDBBtn>
                                : <MDBBtn size="sm" color="success" onClick={() => this.handleEdit(this.state.canEdit)}>Save</MDBBtn>}
                        </div>
                        { this.state.canEdit ? labels.map((label, index) => (
                            <div className="block-example border-top border-dark"
                                 style={{marginLeft: '24px', marginRight: '24px', paddingTop: '16px'}}>
                                <div className="d-flex justify-content-between" style={{marginLeft: '2px', marginRight: '2px'}}>
                                    <span>{label}</span>
                                    <span>{data[index]}</span>
                                </div>
                            </div>
                        )) : <ProfileForm labels={labels} values={data}/>}
                    </MDBCard>
                </div>
            </div>
        )
    }
}

export default ProprietaireProfile
