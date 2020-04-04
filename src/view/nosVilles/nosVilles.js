import React from 'react';
import "./style.css";
import {MDBContainer} from "mdbreact";


export class NosVilles extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="nos-villes">
                <MDBContainer className="mt-5">
                    <h2>Nous sommes chez vous!</h2>
                </MDBContainer>
            </div>
        )
    }
}
