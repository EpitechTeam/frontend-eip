import React from 'react'
import { MDBContainer, MDBAlert } from 'mdbreact'
import './creationCompte.css'
import { connect } from 'react-redux'
import { setPayed } from '../../../reducer/profile'
import {CardElement} from '@stripe/react-stripe-js';
import history from '../../../App/routes/history'
import data from './price.json'
import API from '../../../API/api'

const mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        language: state.language,
        profile: state.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPayed: (token) => { dispatch(setPayed(token))},
    }
};

const style = {
  base: {
    color: "#32325d",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4"
    }
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a"
  }
};

class CheckoutProprietaire extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        stripeErreur : "",
        plan : "NONE",
        planObject : {
          "price" : 0,
          "name" : ""
        },
        buttonPayed : false
      }
    }

    componentDidMount() {
      if (typeof document !== undefined) {
        let params = new URLSearchParams(window.location.search);
        let value = params.get('plan');
        this.setState({ plan: value || this.state.selected });
        if (value === null) {
          history.push('/create-profile-proprietaire/plan')
          window.location.reload()
        }

        let found = false
        for (let plan of data.plan) {
          if (plan.query === value) {
            this.setState({planObject : plan})
            found = true
          }
        }

        if (!found) {
          history.push('/create-profile-proprietaire/plan')
          window.location.reload()
        }
      }
    }

    setPayed = async () => {
        this.setState({buttonPayed : true})
        const {stripe, elements} = this.props;
        const {paymentMethod, error} = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement)
        });
        console.log(paymentMethod)
        if (typeof error !== "undefined") {
          this.setState({ stripeErreur : error.message})
          this.setState({buttonPayed : false})
        }
        else {
          let newApi = new API(this.props.authenticate.token)
          try {
            let response = await newApi.subscriptionPlan(this.state.email, paymentMethod.id, this.state.planObject.plan_id)
            this.props.setPayed(this.props.authenticate.token)
            console.log(response)
          }
          catch (e) {
            this.setState({buttonPayed : false})
          }
        }
        console.log(error)
    }

    render () {
      console.log(this.state)

        return (
            <MDBContainer className="marginHeader">
            <div className="mt-5">
            {
              this.state.stripeErreur !== "" ?
              <MDBAlert color="danger">{this.state.stripeErreur}</MDBAlert>: ""
            }
            <div className="row mt-5">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Panier</span>
                <span className="badge badge-secondary badge-pill">1</span>
              </h4>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">{this.state.planObject.name}</h6>
                    <small className="text-muted">Abonnement</small>
                  </div>
                  <span className="text-muted">{this.state.planObject.price}€</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (EUR)</span>
                  <strong>{this.state.planObject.price}€</strong>
                </li>
              </ul>
            </div>
            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Facturation</h4>
                <div className="mb-3">
                  <label htmlFor="email">Email <span className="text-muted">(Optionel)</span></label>
                  <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                </div>
                <div className="mb-3">
                  <label htmlFor="address">Adresse</label>
                  <input type="text" className="form-control" id="address" placeholder="1234 Main St" />
                </div>
                <hr className="mb-4" />
                <h4 className="mb-3">Paiement</h4>
                <CardElement id="card-element" className="MyCardElement" style={style} />
                <hr className="mb-4" />
                <button onClick={this.setPayed} className="btn btn-primary btn-lg btn-block" type="submit">
                {
                  this.state.buttonPayed ?
                  <div className="spinner-border  spinner-border-sm text-info" role="status">
                             <span className="sr-only">Loading...</span>
                  </div>
                  : "Commencer l'essai"
                }
                
                </button>
            </div>
          </div>
          </div>
          </MDBContainer>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutProprietaire)