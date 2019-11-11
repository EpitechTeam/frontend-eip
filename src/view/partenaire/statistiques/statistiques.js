import React from 'react'
import GlobalStats from './globalStats'
import { MDBContainer } from 'mdbreact'
import './statistiques.css'

class StatistiquesFreelance extends React.Component {
    render() {
        return (
            <MDBContainer className="mt-5">
                <GlobalStats/>
                Statistiques freelance
            </MDBContainer>
        )
    }
}

export default StatistiquesFreelance