import React, {useState} from "react";
import {
    MDBBtn, MDBCol,
    MDBContainer,
    MDBIcon,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
} from "mdbreact";
import "./companyVerification.css";

function CustomModal(props) {
    let UploadDocument = () => (
        <div className="d-flex flex-column justify-content-center text-center">
            Veillez choisir votre document à télécharger.
            <div className="input-group">
                <div className="custom-file text-left">
                    <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile02"
                        aria-describedby="inputGroupFileAddon02"
                    />
                    <label className="custom-file-label" htmlFor="inputGroupFile02">
                        Document à choisir
                    </label>
                </div>
            </div>
            <MDBCol>
                <MDBBtn size="lg" color="pink" onClick={() => {  props.action(); props.toggle() } }>Sauvegarder</MDBBtn>
            </MDBCol>
        </div>
    );

    let DeleteDocument = () => (
        <div className="d-flex flex-column justify-content-center text-center">
            Voulez vous supprimer définitivement ce document ?
            <MDBCol>
                <MDBBtn size="lg" color="pink" onClick={() => {  props.action(); props.toggle() } }>Oui</MDBBtn>
                <MDBBtn size="lg" color="pink" outline={true} onClick={props.toggle}>Non</MDBBtn>
            </MDBCol>
        </div>
    );

    return (
        <MDBContainer>
            <MDBModal className="modal-dialog-centered" isOpen={props.isOpen} toggle={props.toggle} backdrop={true} size="sm">
                <MDBModalHeader className="pink text-white" toggle={props.toggle}>{props.title}</MDBModalHeader>
                <MDBModalBody>
                    {props.type === 'UPLOAD' ? UploadDocument() : DeleteDocument() }
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>
    );
}

function LegalDocumentUploader(props) {
    let [modal, toggle] = useState(false);
    let [modalType, handleModalType] = useState("delete");
    let [document, handleDoc] = useState(props.type === 'ID' ? props.user.idCard : props.user.legalDocs);

    let pending = props.type === "ID" ? props.user.idPending : props.user.legalDocsPending;
    let verified = props.type === "ID" ? props.user.idVerified : props.user.legalDocsVerified;

    const toggleModal = (type) => {
        handleModalType(type);
        toggle(!modal)
    };

    const updateLegalDoc = event => {
        handleDoc(event.target.value);
    };

    let handleAction = () => {
        switch (modalType) {
            case 'UPLOAD':
                props.upload();
                break;
            case 'DELETE':
                props.delete();
                handleDoc("");
                console.log('delete doc');
                break;
            default: break;
        }
    };

    return (
        <div>
            <label htmlFor="idDocument" className="grey-text">
                {props.label}
            </label>
            <div className="d-flex flex-row justify-content-end align-items-center">
                <input value={document} onChange={updateLegalDoc} name="idCard" type="text" id="idDocument"
                       className="legal-doc form-control" disabled={true}
                />
                <div className="d-flex flex-row legal-doc-actions">
                    { document ?
                        <div>
                            <MDBIcon icon={verified ? "check-circle" : pending ? 'clock' : 'times-circle'}
                                     className={`doc-status text-${verified ? 'success' : pending ? 'warning' : 'danger'}`}/>
                            <MDBIcon icon="trash-alt" className="grey-text trash-icon" onClick={() => toggleModal('DELETE')}/>
                        </div> :
                        <div>
                            <MDBIcon icon="upload" className="doc-status pink-text" onClick={() => toggleModal('UPLOAD')}/>
                            <MDBIcon icon="trash-alt" className="grey-text"/>
                        </div>
                    }
                </div>
            </div>
            <CustomModal type={modalType} toggle={toggleModal} isOpen={modal} title={props.label}
                         action={() => handleAction()}
            />
        </div>
    );
}

function LegalDocuments() {
    let userModel = {
        idCard: 'carte_identitée.pdf',
        idVerified: false,
        idPending: true,


        legalDocs: 'sirene.pdf',
        legalDocsVerified: false,
        legalDocsPending: false
    };

    let [user, handleUser] = useState(userModel);

    const dispatchUpload = (token, document) => {
        console.log('testing: ', token, document);
        console.log('upload doc');
    };

    const deleteDocument = (opt) => {
        if (opt ===  'ID') {
            console.log("ID DELETE");
            let newUser = {...user, idCard: ''};
            handleUser(newUser);
        }
        else if (opt === 'LEGAL') {
            console.log('DELETE SIRENE');
            handleUser({...user, legalDocs: ''})
        }
    };

    return (
        <div>
            <LegalDocumentUploader
                type="ID"
                user={user}
                label="Carte d'identitée"
                upload={() => dispatchUpload('#123', 'IDCard')}
                delete={() => deleteDocument('ID')}
            />
            <br/>
            <LegalDocumentUploader
                type="SIRENE"
                user={user}
                label="Attestation SIRENE"
                upload={() => dispatchUpload('#123', 'IDCard')}
                delete={() => deleteDocument('LEGAL')}
            />
        </div>
    );
}

export default LegalDocuments;
