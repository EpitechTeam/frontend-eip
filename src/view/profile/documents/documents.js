import React, {useEffect, useState} from "react";
import {
    MDBBtn, MDBCard, MDBCol,
    MDBContainer,
    MDBIcon,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
} from "mdbreact";
import {connect} from "react-redux";
import {deleteDocument, getDocument, uploadDocument} from '../../../reducer/document';
import './documents.css';

const mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        document: state.document
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDocument: (token, type) => { dispatch(getDocument(token, type))},
        uploadDocument: (token, data, type) => { dispatch(uploadDocument(token, data, type))},
        deleteDocument: (token, type) => { dispatch(deleteDocument(token, type))}
    }
};

function CustomModal(props) {

    let UploadModal = () => {
        let [file, handleFile] = useState(null);
        let [uploading, handleUploadStatus] = useState(false);

        function onChangeFile() {
            let localFile = document.getElementById("legalDocUpload").files[0];
            handleFile(localFile);
            console.log(localFile);
        }

        function uploadFile() {
            handleUploadStatus(true);
            let prop = props.docType === 'ID' ? 'id_card' : 'sirene';
            props.action({file: file, type: prop}).then((value) => {
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
                <br/>
                <MyUploader />
            </div>
        );
    };

    let DeleteModal = () => (
        <div className="d-flex flex-column justify-content-center text-center">
            Voulez vous supprimer définitivement ce document ?
            <MDBCol>
                <MDBBtn size="lg" color="pink" onClick={() => {  props.action(); props.toggle() } }>Oui</MDBBtn>
                <MDBBtn size="lg" color="pink" outline={true} onClick={props.toggle}>Non</MDBBtn>
            </MDBCol>
        </div>
    );

    let InfoModal = () => {
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
                return UploadModal();
            case 'DELETE':
                return DeleteModal();
            case 'INFO':
                return InfoModal();
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

    let pending = props.document.status.toUpperCase() === 'PENDING';
    let verified = props.document.status.toUpperCase() === 'VERIFIED';

    const toggleModal = (type) => {
        handleModalType(type);
        toggle(!modal)
    };

    let handleAction = (params) => {
        // debugger;
        switch (modalType) {
            case 'UPLOAD':
                return props.upload(params.file, params.type);
            case 'DELETE':
                console.log('delete doc');
                props.delete('test');
                break;
            default: break;
        }
    };

    return (
        <div>
            <div className="d-flex flex-row align-items-start">
                <label htmlFor="idDocument" className="grey-text">{props.label}&nbsp;&nbsp;</label>
                <MDBIcon icon={verified ? "check-circle" : pending ? 'clock' : 'times-circle'}
                         className={`doc-status text-${verified ? 'success' : pending ? 'warning' : 'danger'}`}
                         onClick={() => toggleModal('INFO')}
                />
            </div>
            <div className="d-flex flex-row justify-content-end align-items-center">
                <input value={props.document.name} name="file-input" type="text" id={`file-${props.type}`}
                       className="legal-doc form-control" disabled={true}
                />
                <div className="d-flex flex-row legal-doc-actions">
                    { props.document.file ?
                        <div>
                            <MDBIcon icon="upload" className="doc-status grey-text" onClick={() => toggleModal('UPLOAD')}/>

                            <MDBIcon icon="trash-alt" className="grey-text" onClick={() => toggleModal('DELETE')}/>
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

function MyUploader(props) {
    let [file, handleFile] = useState('');

    function openFile() {
        document.getElementById('myUpload').click();
    }

    function onChangeFile() {
        let localFile = document.getElementById("myUpload").files[0];
        handleFile(localFile);
        console.log(localFile);
    }

    function deleteFile(event) {
        handleFile('');
        event.stopPropagation();
    }

    function dropZoneCode() {
        console.log('done');
        let dropZone = document.getElementById('dropZone');

        dropZone.addEventListener('dragover', function(e) {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        });

        dropZone.addEventListener('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();
            let localFile = e.dataTransfer.files[0];
            handleFile(localFile);
            console.log(localFile)
        });
    }

    useEffect(() => {
        dropZoneCode();
    });

    return (
        <div id="dropZone" onClick={() => openFile()} style={{outline: 'grey 3px solid', outlineStyle: 'dotted'}}>
            <MDBCard className="uploader-container">
                <div className="uploader-wrapper">
                    {file ? <PDFReader file={file}/> : <MDBIcon className="grey-text p-2" icon={file ? "file-pdf" : "cloud-upload-alt"} size="5x"/>}
                    <h5 className="grey-text">{file? file.name : 'Glisser et déposer votre fichier ici ou cliquer'}</h5>
                    <input
                        type="file"
                        className="file-input-upload"
                        id="myUpload"
                        onChange={() => onChangeFile()}
                        hidden={true}
                        aria-describedby="inputGroupFileAddon007"
                    />
                </div>
                { file ?
                    <div className="uploader-action-wrapper">
                        <div className="d-flex justify-content-end">
                            <MDBBtn className="opacity-100" size="sm" color="danger" onClick={(event) => deleteFile(event)}>
                                <MDBIcon icon="trash-alt" className="mr-1" /> Effacer
                            </MDBBtn>
                        </div>
                        <br/>
                        <br/>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h6 className="white-text font-weight-bold">{file.name}</h6>
                            <h3 className="grey-text font-weight-bold">-</h3>
                            <p className="grey-text">Glisser et déposer votre fichier ici ou cliquer pour remplacer</p>
                        </div>
                    </div> : null
                }
            </MDBCard>
        </div>
    );
}

function PDFReader(props) {
    if (!props.file)
        return(
            <div></div>
        );

    loadPDF(props.file);

    function loadPDF(file) {
        let url = URL.createObjectURL(file);
        // Loaded via <script> tag, create shortcut to access PDF.js exports.
        let pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
        pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

// Using DocumentInitParameters object to load binary data.
        let loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then(function(pdf) {
            console.log('PDF loaded');

            // Fetch the first page
            let pageNumber = 1;
            pdf.getPage(pageNumber).then(function(page) {
                console.log('Page loaded');

                let scale = 0.2;
                let viewport = page.getViewport({scale: scale});
                // var viewport = page.getViewport(450 / page.getViewport(1.0).width);

                // Prepare canvas using PDF page dimensions
                let canvas = document.getElementById('the-canvas');
                let context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context
                let renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                let renderTask = page.render(renderContext);
                renderTask.promise.then(function () {
                    console.log('Page rendered');
                });
            });
        }, function (reason) {
            // PDF loading error
            console.error(reason);
        });
    }

    return (
        <div className="d-flex justify-content-center p-2">
            <canvas className="card" style={{outline: 'grey 1px solid'}} id="the-canvas"></canvas>
        </div>
    );
}

class LegalDocuments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                token: '#123324#',
                id_card: {
                    file: '',
                    name: '',
                    status: '',
                },
                sirene: {
                    file: '',
                    name: '',
                    status: '',
                },
                idVerified: false,
                idPending: true,
                legalDocsVerified: false,
                legalDocsPending: false,
                document: ''
            }
        };
    }

    // let [user, handleUser] = useState(userModel);

    componentDidMount() {
        console.log('PROPS:', this.props);
        this.props.getDocument(this.props.authenticate.token, 'id_card');
        this.props.getDocument(this.props.authenticate.token, 'sirene');
        this.setState({
            user: {
                id_card: this.props.document.documents.id_card,
                sirene: this.props.document.documents.sirene
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps === this.props)
            return;
        this.setState({
            user: {
                id_card: this.props.document.documents.id_card,
                sirene: this.props.document.documents.sirene
            }
        });
    }

    uploadHandler = (that, file, type) => {
        console.log(that.props.document);
        return new Promise(function(resolve, reject) {
            that.props.uploadDocument(that.props.authenticate.token, file, type);
            resolve();
        });
    };

    deleteDocument = (opt) => {
        if (opt === 'id_card') {
            console.log("ID DELETE");
            this.props.deleteDocument(this.props.authenticate.token, opt);
        }
        else if (opt === 'sirene') {
            console.log('SIRENE DELETE');
            this.props.deleteDocument(this.props.authenticate.token, opt);
        }
    };

    render() {
        return (
            <div>
                <LegalDocumentUploader
                    type="ID"
                    user={this.state.user}
                    document={this.state.user.id_card}
                    label={"Carte d'identitée"}
                    upload={(file, type) => this.uploadHandler(this, file, type)}
                    delete={() => this.deleteDocument('id_card')}
                />
                <br/>
                <LegalDocumentUploader
                    type="SIRENE"
                    user={this.state.user}
                    document={this.state.user.sirene}
                    label={"Attestation SIRENE"}
                    upload={(file, type) => this.uploadHandler(this, file, type)}
                    delete={() => this.deleteDocument('sirene')}
                />
                <br/>
                <MyUploader />
                <br />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LegalDocuments);
