import { useEffect, useState } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

import styles from "../../styles/CheckoutForm.module.css";
//import {addProcess} from '../../redux/cartSlice';

import useToggle from "../hooks/useToggle";



export default function Form({total, paymentIntent}) {
    const [email, setEmail] = useState('chrismcnabb6691@ggmail.com')
    ;const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useToggle()
    const [stripeRes, setStripeRes] = useState({})
    const stripe = useStripe();
    const elements = useElements();


    useEffect(() => {

        if (!stripe) {
            return;
        }

        //Grab the client secret from url params
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {

            switch (paymentIntent.status) {

                case 'succeeded':
                    setMessage('Payment succeeded!');


                    break;
                case 'processing':
                    setMessage('Your payment is processing.');
                    break;
                case 'requires_payment_method':
                    setMessage('Your payment was not successful, please try again.');
                    break;
                default:
                    setMessage('Something went wrong.');
                    break;
            }
        });




    }, [stripe]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {

            return;
        }

        setIsLoading();
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `http://localhost:3000/success`,
                receipt_email: email,
                shipping: {
                    address: { city: 'NY' },
                    name: 'Shipping user',
                },
                payment_method_data: {
                    billing_details: {
                        name: 'Billing user',
                    },
                },
            },

        });

              if (error.type === "card_error" || error.type === "validation_error") {
                  setMessage(error.message);
              } else {
                  setMessage("An unexpected error occurred.");
              }


          setIsLoading();
    };

    return (
        <>

            <div className={styles.wrapper}>
            <form id="payment-form" onSubmit={handleSubmit} className="m-auto">
                <div className="mb-3">

                </div>
                <div className="mb-6">

                </div>
                <PaymentElement id="payment-element" />
                <div className={styles.buttonContainer}>
                    <button
                    className={styles.button}
                    disabled={isLoading || !stripe || !elements}
                    id="submit"
                >
          <span id="button-text">
            {isLoading ? (
                <div className="spinner" id="spinner">

                </div>
            ) : (
                'Pay now'
            )}
          </span>
                </button>
                </div>
                {message}

            </form>
            </div>

        </>
    );
}
