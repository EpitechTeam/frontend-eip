import React from 'react'
import {MDBCard} from "mdbreact";
import {faUserNinja} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

let cardStyle = {marginTop: '24px', padding: '12px', justifyContent: 'space-between'};

class ProprietaireProfile extends React.Component {
    render() {
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
                                <div style={{padding: '24px'}}>
                                    <p>Monty Criel</p>
                                    <p>monty.criel@epitech.eu</p>
                                    <p>Propriétaire</p>
                                    <p>Berlin</p>
                                </div>
                            </div>
                    </MDBCard>

                    <MDBCard style={cardStyle}>
                        Details
                    </MDBCard>
                </div>
            </div>
        )
    }
}

export default ProprietaireProfile
