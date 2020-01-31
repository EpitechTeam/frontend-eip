import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import "./home-content.css";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        profile: state.profile,
        home : state.home
    }
};

let villes = [
    {
        name: 'Montpellier',
        img: 'https://q-xx.bstatic.com/xdata/images/hotel/max500/83180509.jpg?k=308f87271cca2fc386db39b52f59fca7ec904397719777d6149a97f5226dda79&o='
    },
    {
        name: 'Perpignan',
        img: 'https://static2.mclcm.net/iod/images/v2/69/citytheque/localite_101_6510/1200x630_100_300_000000x30x0.jpg'
    },
    {
        name: 'Toulouse',
        img: 'https://images.unsplash.com/photo-1533375954403-dcc42d37d33a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'
    },
    {
        name: 'Bordeaux',
        img: 'https://images.unsplash.com/photo-1509636902752-929c7497f3d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'
    }
];

class HomeContent extends React.Component {

    renderPartenaires = () => {
        let data = this.props.home.data.map((item, i) => {
            if (item.type === "freelance") {
                return (
                    <MDBCol key={i} lg="3" md="6" className="mb-lg-0 mb-4">
                        <MDBCard>
                            <a href={"/profile/" + item.objectID}>
                            <MDBCardImage
                                src={item.img}
                                top
                                alt="partenaire"
                            />
                            </a>
                            <MDBCardBody className="text-center">
                                <p>{item.firstname}</p>
                                <p>{item.city}</p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                )
            }
            return ""
        });

        return (
            <MDBContainer className="mt-5">
                <MDBRow>
                    {data}
                </MDBRow>
            </MDBContainer>
        )
    }

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
            <MDBContainer className="mt-5">
                <MDBRow>
                    {data}
                </MDBRow>
            </MDBContainer>
        )
    };

    renderAvantages = () => {
        return (
            <div>
                <h2 className="font-weight-bold">Vos biens en sécurité</h2>
                <MDBRow className="mt-5">
                    <MDBCol>
                        <h5 className="font-weight-bold">Partenaires vérifiés</h5>
                        <span>Tous les partenaires de la plateforme sont vérifiés.</span>
                    </MDBCol>
                    <MDBCol>
                        <h5 className="font-weight-bold">Paiments sécurisés</h5>
                        <span>Vous ne payez votre partenaire uniquement lorsque sa mission est terminée.</span>
                    </MDBCol>
                    <MDBCol>
                        <h5 className="font-weight-bold">Support client</h5>
                        <span>Le support répond à vos moindres questions en moins de 48h. Afin que vous soyez sereins.</span>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    };

    render() {
        return (
            <div className="mt-5">
                <div className="avantages">
                    <MDBContainer>
                        {this.renderAvantages()}
                    </MDBContainer>
                </div>
                <div className="mt-5">
                    <MDBContainer>
                        <h2 className="font-weight-bold">Partenaires à la une</h2>
                        {this.renderPartenaires()}
                    </MDBContainer>
                </div>
                <div className="mt-5">
                    <MDBContainer>
                        <h2 className="font-weight-bold">Nous sommes chez vous</h2>
                        {this.renderVilles()}
                    </MDBContainer>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(HomeContent);
