import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdbreact'
import './registerAppartement.css'
import AlgoliaPlaces from 'algolia-places-react';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {useDropzone} from 'react-dropzone';

function Basic(props) {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    
    const files = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
  
    return (
      <div className="borderDropZone">
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </div>
    );
}

class RegisterAppartement extends React.Component {
    state = {
        etape : 1,
        mode : "",
        value: 0
    }
    
    decrease = () => {
        this.setState({ value: this.state.value - 1 });
    }
    
    increase = () => {
        this.setState({ value: this.state.value + 1 });
    }


    changeEtape = (etape, mode = null) => {
        console.log(etape)
        if (etape === "next") {
            this.setState({etape : this.state.etape + 1})
        }
        else if (etape === "prev") {
            this.setState({etape : this.state.etape - 1})
        }
        else {
            this.setState({etape : etape})
        }

        if (mode !== null) {
            this.setState({mode : mode})
        }
    }

    renderEtapeUne = () => {
        return (
            <React.Fragment>
            <MDBCol md="6">
                <div onClick={() => this.changeEtape(2, "airbnb")} className="cardChoice">
                    <MDBIcon fab icon="airbnb" size="3x"/>
                    <p className="mt-3">
                    Votre logement est présent sur Airbnb.
                    </p>
                </div>
            </MDBCol>

            <MDBCol md="6">
                <div onClick={() => this.changeEtape(2, "other")} className="cardChoice">
                    <MDBIcon icon="home" size="3x"/>
                    <p className="mt-3">
                    Votre logement n'est sur aucune plateforme de réservation en ligne.
                    </p>
                </div>
            </MDBCol>
            </React.Fragment>
        )
    }

    renderEtapeDeuxAirbnb = () => {
        return (
            <React.Fragment>
            <MDBCol md="12">
            <MDBInput label="Url de l'annonce airbnb" />
            </MDBCol>

            </React.Fragment>
        )
    }

    renderEtapeDeuxOther = () => {
        return (
            <React.Fragment>
            <MDBCol md="12">
            <MDBInput label="Titre du bien" />
            </MDBCol>
            <MDBCol md="12">
            <MDBInput type="textarea" label="Description" outline />
            </MDBCol>
            
            <MDBCol md="12">
            <MDBInput label="Surface (en m2)" />
            </MDBCol>
            <MDBCol className="mb-4 mt-3" md="12">
                    <AlgoliaPlaces
                        placeholder='Ville'
                
                        options={{
                        appId: 'plIOZH1K5KVK',
                        apiKey: 'd3dabd9d74c1378eec2667aac653e04a',
                        language: 'fr',
                        countries: ['fr', 'de'],
                        type: 'city',
                        }}
                        
                        onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => 
                        this.setState({ville : suggestion.name})}
                
                        onLimit={({ message }) => 
                        console.log('Fired when you reached your current rate limit.')}
                
                        onError={({ message }) => 
                        console.log('Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.')}
                    />
            </MDBCol>

            <MDBCol md="4">
                <label>
                Nombre de chambre
                </label>
                <div className="def-number-input number-input">
                    <button onClick={this.decrease} className="minus"></button>
                    <input className="quantity" name="quantity" value={this.state.value} onChange={()=> console.log('change')}
                    type="number" />
                    <button onClick={this.increase} className="plus"></button>
                </div>
            </MDBCol>

            <MDBCol md="4">
                <label>
                Nombre de pièce
                </label>
                <div className="def-number-input number-input">
                    <button onClick={this.decrease} className="minus"></button>
                    <input className="quantity" name="quantity" value={this.state.value} onChange={()=> console.log('change')}
                    type="number" />
                    <button onClick={this.increase} className="plus"></button>
                </div>
            </MDBCol>

            <MDBCol md="4">
                <label>
                Nombre de couchage
                </label>
                <div className="def-number-input number-input">
                    <button onClick={this.decrease} className="minus"></button>
                    <input className="quantity" name="quantity" value={this.state.value} onChange={()=> console.log('change')}
                    type="number" />
                    <button onClick={this.increase} className="plus"></button>
                </div>
            </MDBCol>

            </React.Fragment>
        )
    }

    renderEtapeTroisOther = () => {
        return (
            <React.Fragment>
            <MDBCol md="12">
            <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                block
                startDatePlaceholderText="Début"
                endDatePlaceholderText="Fin"
            />
            </MDBCol>

            <MDBCol md="12">
                <Basic/>
            </MDBCol>

            <MDBCol md="12">
            </MDBCol>

            </React.Fragment>
        )
    }

    renderEtape = () => {
        console.log(this.state)
        if (this.state.etape === 1) {
            return this.renderEtapeUne()
        }
        else if (this.state.etape === 2 && this.state.mode === "airbnb") {
            return this.renderEtapeDeuxAirbnb()
        }
        else if (this.state.etape === 2 && this.state.mode === "other") {
            return this.renderEtapeDeuxOther()
        }
        else if (this.state.etape === 3 && this.state.mode === "other") {
            return this.renderEtapeTroisOther()
        }
    }

    render() {
        console.log(this.state)
        return (
            <div className="mt-5">
            <MDBContainer className="containerAppartement">
            
            <h2>Inscription de votre bien</h2>
            <p>Etape {this.state.etape}/5</p>

            <MDBRow className="borderContainer">

            {this.renderEtape()}

            <MDBCol md="6" className="mt-5">
            <MDBIcon onClick={() => this.changeEtape("prev")} size="3x" className="cursorPointer" icon="angle-left" />
            </MDBCol>

            <MDBCol md="6" className="textAlignRight mt-5">
            <MDBIcon onClick={() => this.changeEtape("next")} size="3x" className="cursorPointer" icon="angle-right" />
            </MDBCol>

            
            </MDBRow>
            </MDBContainer>
            </div>
        )
    }
}

export default RegisterAppartement