import React from 'react'
import { MDBContainer } from "mdbreact";

class ExplicationEtape extends React.Component {
    render() {
        return (
            <div className="mt-5">
            <MDBContainer>
                <h2>Votre annonce Airbnb est entre de bonnes mains</h2>
                <ul className="stepper stepper-horizontal pl-0">

                    <li className="completed">
                        <a href="/recherche">
                        <span className="circle">1</span>
                        <span className="label">Trouver un partenaire</span>
                        </a>
                    </li>

                    <li className="completed">
                        <a href="/confier-vos-biens">
                        <span className="circle">2</span>
                        <span className="label">Confier lui vos biens</span>
                        </a>
                    </li>

                    <li className="completed">
                        <a href="/laisser-vous-guider">
                        <span className="circle">3</span>
                        <span className="label">Laissez vous guider</span>
                        </a>
                    </li>

                </ul>
            </MDBContainer>
            </div>
        )
    }
}

export default ExplicationEtape