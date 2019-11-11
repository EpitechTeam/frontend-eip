import React from 'react';
import {MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "./home-content.css";

let partenaires = [
    {
        name: 'Abderrahim Cherkaoui',
        city: 'Montpellier',
        img: "https://scontent-mrs2-2.xx.fbcdn.net/v/t1.0-9/13339507_622022821285857_1151376654593387753_n.jpg?_nc_cat=105&_nc_oc=AQmtMvLp6ETWoPWj1GpZb2jpdoO3ll0Wbquaga2Kyidq-A42EycuRCKuG75joomydQasZ_coawdiSgnysa_vSINJ&_nc_ht=scontent-mrs2-2.xx&oh=36bc35971f254665dd8720655142b399&oe=5E6080C7"
    },
    {
        name: 'Léo Lecherbonnier',
        city: 'Montpellier',
        img: "https://scontent-mrs2-2.xx.fbcdn.net/v/t1.0-9/67738419_2829297270478805_7693979391574933504_n.jpg?_nc_cat=102&_nc_oc=AQlnreQrUHRlLLfxiUWjLKqHVqI-q4N14aB1Ym0R2oY_jAI-b7LccSXfr2_yvqUqYC9pemRqDd62WMOfTHyeD39q&_nc_ht=scontent-mrs2-2.xx&oh=83d92c57692695c39b74f2b7228da0f3&oe=5E3E1353"
    },
    {
        name: 'Léo Lecherbonnier Copie',
        city: 'Montpellier',
        img: "https://scontent-mrs2-2.xx.fbcdn.net/v/t1.0-9/67738419_2829297270478805_7693979391574933504_n.jpg?_nc_cat=102&_nc_oc=AQlnreQrUHRlLLfxiUWjLKqHVqI-q4N14aB1Ym0R2oY_jAI-b7LccSXfr2_yvqUqYC9pemRqDd62WMOfTHyeD39q&_nc_ht=scontent-mrs2-2.xx&oh=83d92c57692695c39b74f2b7228da0f3&oe=5E3E1353"
    }
];

let villes = [
    {
        name: 'Montpellier',
        img: 'https://q-xx.bstatic.com/xdata/images/hotel/max500/83180509.jpg?k=308f87271cca2fc386db39b52f59fca7ec904397719777d6149a97f5226dda79&o='
    },
    {
        name: 'Perpignan',
        img: 'https://static2.mclcm.net/iod/images/v2/69/citytheque/localite_101_6510/1200x630_100_300_000000x30x0.jpg'
    }
];

class HomeContent extends React.Component {

    renderPartenaires = () => {
        let data = partenaires.map((item, i) => {
            return (
                <MDBCol key={i} lg="3" md="6" className="mb-lg-0 mb-4">
                    <MDBCard>
                        <MDBCardImage
                            src={item.img}
                            top
                            alt="partenaire"
                        />
                        <MDBCardBody className="text-center">
                            {item.name}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            )
        });

        return (
            <MDBContainer className="mt-4">
                <MDBRow>
                    {data}
                </MDBRow>
            </MDBContainer>
        )
    };

    renderVilles = () => {
        let data = villes.map((item, i) => {
            return (
                <MDBCol key={i} lg="3" md="6" className="mb-lg-0 mb-4">
                    <MDBCard>
                        <MDBCardImage
                            src={item.img}
                            alt={item.name}
                            top
                        />
                        <MDBCardBody className="text-center">
                            {item.name}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            )
        });

        return (
            <MDBContainer className="mt-4">
                <MDBRow>
                    {data}
                </MDBRow>
            </MDBContainer>
        )
    };

    render() {
        return (
            <div className="mt-5">
                <div>
                    <MDBContainer>
                        <h2>Partenaires à la une dans votre ville</h2>
                        {this.renderPartenaires()}
                    </MDBContainer>
                </div>
                <div className="mt-5">
                    <MDBContainer>
                        <h2>Nous sommes chez vous</h2>
                        {this.renderVilles()}
                    </MDBContainer>
                </div>
            </div>
        )
    }
}

export default HomeContent;
