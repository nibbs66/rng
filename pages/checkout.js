import {loadStripe} from "@stripe/stripe-js";
import {useEffect, useState} from 'react';
import Head from "next/head";
import {Elements} from "@stripe/react-stripe-js";
import Script from "next/script";
import CheckoutForm from '../components/checkout/CheckoutForm'
import axios from "axios";
import styles from "../styles/website/Checkout.module.css";


import useToggle from "../components/hooks/useToggle";

import {useRouter} from "next/router";
import MainLayout from "../components/layouts/MainLayout";
import useUser from "./api/hooks/useUser";
const stripe =  loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
const Checkout = () => {

    const [clientSecret, setClientSecret] = useState('');
    const [paymentIntent, setPaymentIntent] = useState('')
    const [success, setSuccess] = useToggle()
    const {user,cart, mutateCart, favorites, error, isValidating} = useUser()
    const router = useRouter()

    useEffect(() => {
        const newIntent = async() => {
            try {
                const res = await axios.post(`/api/stripe/stripe_intent`, {
                    headers: {'Content-Type': 'application/json'},
                    amount: Math.round((cart.total + cart.shipping.price) * 100),
                    items: cart,
                    payment_intent_id: '',
                })

                setClientSecret( res.data.client_secret),
                    setPaymentIntent(res.data.id)

            } catch (err) {
                console.log(err)
            }
        }
        newIntent()
    },[cart]);

    const appearance = {
        theme: 'flat',
        labels: 'floating',
    };
    const options = {
        clientSecret,
        appearance,

    };

    return (
        <div className={styles.container}>

            {success && <h1>Order Number: {cart.cartId}</h1>}
            <Head>
                <Script src="https://js.stripe.com/v3" async></Script>
            </Head>
            {!success &&
                <>
                {cart ? <h1>Total: €{(cart.total + cart.shipping.price).toFixed(2)}</h1> : <h1>€0.00</h1>}

            <div className={styles.formContainer}>


              {clientSecret && (
                    <Elements key={clientSecret} options={options} stripe={stripe}>
                        <CheckoutForm total={cart.total} paymentIntent={paymentIntent}/>
                    </Elements>
                )}

            </div>
                </>  }
        </div>
    );
};

export default Checkout;
Checkout.getLayout = function getLayout(page){
    return(
        <MainLayout>
            {page}
        </MainLayout>
    )
}

