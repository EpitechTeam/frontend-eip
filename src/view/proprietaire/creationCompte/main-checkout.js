import React, {Component} from 'react';
import CheckoutProprietaire from './checkout.js';
import {loadStripe} from '@stripe/stripe-js';
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC);

const InjectedCheckoutForm = () => (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <CheckoutProprietaire stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
);
 
class MainCheckout extends Component {
  render() {
    return (
        <div className="marginHeader">
          <Elements stripe={stripePromise}>
            <InjectedCheckoutForm/>
          </Elements>
        </div>
    )
  }
}

export default MainCheckout;