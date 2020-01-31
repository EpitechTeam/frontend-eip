import React, {Component} from 'react';
import CheckoutProprietaire from './checkout.js';
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';

const InjectedCheckoutForm = () => (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <CheckoutProprietaire stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
);
 
class MainCheckout extends Component {
  constructor() {
    super();
    this.state = {stripe: null};
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({stripe: window.Stripe(process.env.REACT_APP_STRIPE_PUBLIC)});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({stripe: window.Stripe(process.env.REACT_APP_STRIPE_PUBLIC)});
      });
    }
  }

  render() {
    return (
        <div className="marginHeader">
          <Elements stripe={this.state.stripe}>
            <InjectedCheckoutForm/>
          </Elements>
        </div>
    )
  }
}

export default MainCheckout;