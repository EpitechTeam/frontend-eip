import React from 'react'
import {MDBContainer} from "mdbreact";

class ExplicationEtape extends React.Component {
    render() {
        return (
            <div className="mt-5">
                <MDBContainer>
                    <h2 className="font-weight-bold">Votre annonce Airbnb entre de bonnes mains</h2>
                    <ul className="stepper stepper-horizontal pl-0">

                        <li className="completed">
                            <a href="/recherche">
                                <span className="circle">1</span>
                                <span className="label"><strong>Trouvez votre partenaire</strong><span className="font-weight-normal"> parmis des profils de confiance</span></span>
                            </a>
                        </li>

                        <li className="completed">
                            <a href="/confier-vos-biens">
                                <span className="circle">2</span>
                                <span className="label"><strong>Confiez lui la gestion de vos biens</strong><span className="font-weight-normal"> et concentrez-vous sur l'important</span></span>
                            </a>
                        </li>

                        <li className="completed">
                            <a href="/laisser-vous-guider">
                                <span className="circle">3</span>
                                <span className="label"><strong>Profitez</strong><span className="font-weight-normal"> d'un rendement locatif tout aussi élevé</span></span>
                            </a>
                        </li>

                    </ul>
                </MDBContainer>
            </div>
        )
    }
}

export default ExplicationEtape
