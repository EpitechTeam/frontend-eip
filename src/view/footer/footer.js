import React from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import './footer.css'

class Footer extends React.Component {
    render() {
        return (
            <MDBFooter className="specialColor font-small pt-4 mt-4">
                <MDBContainer fluid className="text-center text-md-left">
                    <MDBRow>
                    <MDBCol className="text-center" md="12">
                        <h5 className="title">Kineplustech</h5>
                        <p>
                        Kineplustech facilite la mise en relation entre propriétaire et freelance.<br/>
                        Trouvez un partenaire de confiance pour gérer vos biens.
                        </p>
                    </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a href="https://kineplus.tech"> kineplustech </a>
                    </MDBContainer>
                </div>
            </MDBFooter>
        )
    }
}

export default Footer