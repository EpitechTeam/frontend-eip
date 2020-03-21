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
    let UploadDocument = () => {
        let [file, handleFile] = useState(null);
        let [uploading, handleUploadStatus] = useState(false);

        function onChangeFile() {
            let localFile = document.getElementById("legalDocUpload").files[0];
            handleFile(localFile);
            console.log(localFile);
        }
        
        function uploadFile() {
            handleUploadStatus(true);
            console.log('wut', props);
            let prop = props.docType === 'ID' ? 'idCard' : 'legalDocs';
            props.action('UPLOAD')(props.user.token, file, prop).then((value) => {
                handleUploadStatus(false);
                props.toggle();
            });
        }

        return (
            <div className="d-flex flex-column justify-content-center text-center">
                { !uploading ?
                    <div>
                        Veillez choisir votre document à télécharger.
                        <br/>
                        <br/>
                        <div className="input-group">
                            <div className="custom-file text-left">
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    id="legalDocUpload"
                                    onChange={() => onChangeFile()}
                                    aria-describedby="inputGroupFileAddon02"
                                />
                                <h6 className="custom-file-label" htmlFor="legalDocUpload">
                                    {file ? file.name : "Document à choisir"}
                                </h6>
                            </div>
                        </div>
                    </div> :
                    <div className="d-flex justify-content-center">
                        <div className="lds-roller">
                            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                }
                <br/>
                <MDBCol>
                    <MDBBtn size="lg" color="pink" disabled={file ? uploading : true} onClick={() => uploadFile()}>
                        Sauvegarder
                    </MDBBtn>
                </MDBCol>
            </div>
        );
    };

    let DeleteDocument = () => (
        <div className="d-flex flex-column justify-content-center text-center">
            Voulez vous supprimer définitivement ce document ?
            <MDBCol>
                <MDBBtn size="lg" color="pink" onClick={() => {  props.action(); props.toggle() } }>Oui</MDBBtn>
                <MDBBtn size="lg" color="pink" outline={true} onClick={props.toggle}>Non</MDBBtn>
            </MDBCol>
        </div>
    );

    let DocumentInfo = () => {
        let information = [
                {icon:'check-circle', text: 'Document Validé', style: 'success'},
                {icon:'clock', text: 'Document en cours de validation', style: 'warning'},
                {icon:'times-circle', text: 'Document a été refusé', style: 'danger'},
        ];
        return (
            <div className="d-flex flex-column justify-content-center text-center">
                Informations sur le statut de votre document
                <br/>
                <br/>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="d-flex flex-column justify-content-center">
                        {
                            information.map(info => (
                                <div>
                                    <div className="d-flex flex-row align-items-center">
                                        <MDBIcon className={`doc-status text-${info.style}`} icon={info.icon}/>
                                        {info.text}
                                    </div>
                                    <br/>
                                </div>
                            ))
                        }
                    </div>
                    <MDBBtn size="lg" color="pink" outline={false} onClick={props.toggle}>Retour</MDBBtn>
                </div>
            </div>
        );
    };

    function DisplayModal() {
        switch (props.type) {
            case 'UPLOAD':
                return UploadDocument();
            case 'DELETE':
                return DeleteDocument();
            case 'INFO':
                return DocumentInfo();
            default:
                break;
        }
    }

    return (
        <MDBContainer>
            <MDBModal className="modal-dialog-centered" isOpen={props.isOpen} toggle={props.toggle} backdrop={true} size="md">
                <MDBModalHeader className="pink text-white" toggle={props.toggle}>
                    {props.type === 'INFO' ? 'Avancement de validation' : props.title}
                </MDBModalHeader>
                <MDBModalBody>
                    { DisplayModal() }
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>
    );
}

function LegalDocumentUploader(props) {
    let [modal, toggle] = useState(false);
    let [modalType, handleModalType] = useState("DELETE");

    let pending = props.type === "ID" ? props.user.idPending : props.user.legalDocsPending;
    let verified = props.type === "ID" ? props.user.idVerified : props.user.legalDocsVerified;

    const toggleModal = (type) => {
        handleModalType(type);
        toggle(!modal)
    };

    let handleAction = () => {
        switch (modalType) {
            case 'UPLOAD':
                return props.upload;
            case 'DELETE':
                console.log('delete doc');
                props.delete();
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
                <input value={props.document} name="idCard" type="text" id="idDocument"
                       className="legal-doc form-control" disabled={true}
                />
                <div className="d-flex flex-row legal-doc-actions">
                    { props.document ?
                        <div>
                            <MDBIcon icon={verified ? "check-circle" : pending ? 'clock' : 'times-circle'}
                                     className={`doc-status text-${verified ? 'success' : pending ? 'warning' : 'danger'}`}
                                     onClick={() => toggleModal('INFO')}
                            />
                            <MDBIcon icon="trash-alt" className="grey-text trash-icon" onClick={() => toggleModal('DELETE')}/>
                        </div> :
                        <div>
                            <MDBIcon icon="upload" className="doc-status grey-text" onClick={() => toggleModal('UPLOAD')}/>
                            <MDBIcon icon="trash-alt" className="grey-text"/>
                        </div>
                    }
                </div>
            </div>
            <CustomModal type={modalType} toggle={toggleModal} isOpen={modal} title={props.label}
                         user={props.user} action={handleAction} docType={props.type}
            />
        </div>
    );
}

function LegalDocuments() {
    let userModel = {
        token: '#123324#',
        idCard: 'carte_identitée.pdf',
        idVerified: false,
        idPending: true,

        legalDocs: 'sirene.pdf',
        legalDocsVerified: false,
        legalDocsPending: false
    };

    let [user, handleUser] = useState(userModel);

    const uploadHandler = (token, document, type) => {
        return new Promise(function(resolve, reject) {
            let newUser = {...user};
            setTimeout(function () {
                console.log('nigguh:', type);
                newUser[type] = document.name;
                console.log('NEW:', newUser);
                handleUser(newUser);
                // let response = await axios.post(process.env.REACT_APP_API_URL + "/validEmail", body)
                resolve('foo');
            }, 3000);
        });
    };

    const deleteDocument = (opt) => {
        if (opt ===  'ID') {
            console.log("ID DELETE");
            let newUser = {...user, idCard: ''};
            console.log("ID DELETE");
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
                document={user.idCard}
                label="Carte d'identitée"
                upload={uploadHandler}
                delete={() => deleteDocument('ID')}
            />
            <br/>
            <LegalDocumentUploader
                type="SIRENE"
                user={user}
                document={user.legalDocs}
                label="Attestation SIRENE"
                upload={uploadHandler}
                delete={() => deleteDocument('LEGAL')}
            />
        </div>
    );
}

export default LegalDocuments;
