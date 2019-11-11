import React from 'react'
import { MDBContainer, MDBStepper, MDBStep, MDBIcon } from "mdbreact";

class ExplicationEtape extends React.Component {
    render() {
        return (
            <div className="mt-5">
            <MDBContainer>
                <h2>Votre annonce Airbnb est entre de bonnes mains</h2>
                <ul class="stepper stepper-horizontal pl-0">

                    <li class="completed">
                        <a href="/recherche">
                        <span class="circle">1</span>
                        <span class="label">Trouver un partenaire</span>
                        </a>
                    </li>

                    <li class="completed">
                        <a href="/confier-vos-biens">
                        <span class="circle">2</span>
                        <span class="label">Confier lui vos biens</span>
                        </a>
                    </li>

                    <li class="completed">
                        <a href="/laisser-vous-guider">
                        <span class="circle">3</span>
                        <span class="label">Laissez vous guider</span>
                        </a>
                    </li>

                </ul>
            </MDBContainer>
            </div>
        )
    }
}

export default ExplicationEtape