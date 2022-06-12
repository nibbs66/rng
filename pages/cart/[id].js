import  {useState, useEffect} from 'react';

import styles from "../../styles/website/Cart.module.css";
import Image from "next/image";
import TrashCan from "../../components/icons/TrashCan";
import ArrowBack from "../../components/icons/ArrowBack";


import {useSession} from "next-auth/react";

import Modal from "../../components/Modal";
import Head from "next/head";



import useToggle from "../../components/hooks/useToggle";
import Link from "next/link";
import MainLayout from "../../components/layouts/MainLayout";

import useUser from "../api/hooks/useUser";
import axios from "axios";
import {useRouter} from "next/router";

const Cart = () => {


    const {cart,mutateCart,isValidating} = useUser()
const {query} = useRouter()
    const [complete, setComplete] = useToggle()


    const [selected, setSelected] = useState('')
    const [clientSecret, setClientSecret] = useState('');
    const [paymentIntent, setPaymentIntent] = useState('');
    const [showModal, setShowModal] = useToggle()

    const [shippingCost, setShippingCost] = useState(0)
    const [title, setTitle] = useState('')
    const [showCheckout, setShowCheckout] = useState(false)
    const [couponCode, setCouponCode] = useState('')
    const [id, setId] = useState()
    const {data: session,status}=useSession()


useEffect(()=>{


    if(status === 'authenticated'){
        setShowCheckout(true)
    }

},[session, setShowCheckout])

    const handleQuantity =  async(e, idx, item) => {
        const{value} = e.target
        const quant = value
        const {productId, price, quantity} = item
        const difference =quant-quantity
        const {id}=query

        try{
           const res = await axios.put(`/api/cart/${id}`,
               {
                   quant,
                   id,
                   productId,
                   addToTotal: (price * difference),
               });
           mutateCart()




       }catch(err){
            console.log(err)
       }

    }
    const handleRemoveItem =  async(item, idx) => {

        const {id}=query

        try{
            if(cart.items.length === 1){
                const res = await axios.delete(`/api/cart/delete/${id}`)
            }else{
                const res = await axios.put(`/api/cart/delete/${id}`,
                    item
                );
            }
            mutateCart()
        }catch(err){
            console.log(err)
        }

    }


    const handleClick = (data) => {
        setTitle(data)

        setShowModal()
    }
    const handleUpdate = async() => {
        const {id}=query
      try{
           const res = await axios.put(`/api/cart/${id}`,
               {
                 selected,
                 shippingCost,
               });
           mutateCart()
       }catch(err){
           console.log(err)
       }

    }
    const handleChange = (e) => {
        const{value}=e.target
        setSelected(value)
        if(cart?.total<70){
            setShippingCost(6.95)
        }
       !complete && setComplete()
    };


    return (
        <div className={styles.container}>

            <Head>

                <title></title></Head>
            <Modal showModal={showModal} cart={cart} setShowCheckout={setShowCheckout} setShowModal={setShowModal} title={title} shipping={10} amount={cart?.total} location={'checkout'}  clientSecret={clientSecret}  paymentIntent={paymentIntent}/>
            <div className={styles.header}>
               <div className={styles.backArrow}>
                   <ArrowBack height={45} width={45} className={styles.terug}/><h1 > Terug</h1>
               </div>

                <h1>WinkelWagen</h1>
            </div>
            <div className={styles.wrapper}>
            <div className={styles.left}>
                {cart && cart?.items?.map((item, idx)=>(
                    <div className={styles.product} key={item._id}>
                        <div className={styles.productDetail}>
                            <div  className={styles.mainImage}>
                                <Image  src={`/img/${item.img}`} alt='' height={200} width={200} objectFit='contain'/>
                            </div>
                            <div  className={styles.mobileImage}>
                                <Image  src={`/img/${item.img}`} alt='' height={50} width={70} objectFit='contain'/>
                            </div>

                            <div className={styles.details}>
                                <span><b>Name:</b> {item.name}</span>
                                <span><b>ID:</b> {item.modelId}</span>
                                {item.color && <span><b>Color:</b> {item.color}</span>}
                                {item.size && <span><b>Size:</b> {item.size}</span>}
                            </div>
                        </div>
                        <div className={styles.priceDetail}>
                            <div className={styles.productAmountContainer}>
                                <input  type="number" defaultValue={item.quantity} min={1} className={styles.quantity}
                                       onChange={(e)=>handleQuantity(e, idx, item)} />

                            </div>
                            <div className={styles.productPrice}>
                              <span>  €{Number(item.price*(item.quantity)).toFixed(2)}</span>
                            </div>
                            <div className={styles.trashcan} onClick={()=>handleRemoveItem(item, idx)}>
                                <TrashCan />
                            </div>
                            <div className={styles.delete}  onClick={()=>handleRemoveItem(item, idx)}>
                                <span>X</span>
                            </div>

                        </div>

                    </div>

                ))}
                <hr className={styles.hr}/>
            </div>
            <div className={styles.right}>
                <div className={styles.topRight}>
                    {(!showCheckout)  &&
                        <>
                        <h1 className={styles.h1Summary}>Checkout As:</h1>
                        <div className={styles.buttonContainer}>
                        <span className={styles.checkoutButton} onClick={()=>handleClick('Guest')}>
                        Guest
                        </span>
                        <h2 className={styles.h2}>Or</h2>
                        <span className={styles.checkoutButton} onClick={()=>handleClick('Login')}>
                        Login
                        </span>
                        </div>
                        </>
                        }

                    <div className={styles.summary}>
                        <span className={styles.summaryText}>Choose Shipping Method</span>
                        <div className={styles.checkBox}>

                               <input id='Winkel' type="radio" checked={selected === 'Winkel'} value='Winkel' onChange={handleChange}/>
                               <label className={styles.checkboxLabel}>Winkel</label>

                                <input id='PostNL' type="radio"   checked={selected === 'PostNL'} value='PostNL' onChange={handleChange}/>
                                <label className={styles.checkboxLabel}>PostNL </label>


                        </div>

                    </div>

                    <div className={styles.summary}>
                        <span className={styles.summaryText}>Coupon Code</span>
                        <input onChange={(e)=>setCouponCode(e.target.value)}className={styles.coupon} type='text' placeholder={'Enter Code...'}/>
                    </div>
                    <div className={styles.summary}>
                        <h2>SUB-TOTAL:</h2>

                        {cart?.total > 0 ?<h2>€{cart?.total?.toFixed(2)}</h2> : <h2>€0.00</h2>}
                    </div>
                    <hr/>
                </div>
                <div className={styles.bottomRight}>
                    <h1 className={styles.h1Summary}>Order Summary</h1>
                    <div className={styles.summary}>
                        <span className={styles.summaryText}>Subtotal</span>
                        {cart?.total > 0 ?<span className={styles.summaryPrice}>€{(cart?.total/1.21).toFixed(2)}</span> : <h2>€0.00</h2>}
                    </div>
                    <div className={styles.summary}>
                        <span className={styles.summaryText}>Estimated Shipping</span>
                       <span className={styles.summaryPrice}>€{shippingCost.toFixed(2)}</span>


                    </div>
                    <div className={styles.summary}>
                        <span className={styles.summaryText}>Discount</span>
                        <span className={styles.summaryPrice}>€0.00</span>
                    </div>
                    <div className={styles.summary}>
                        <span className={styles.summaryText}>Tax</span>
                        {cart?.total > 0 ? <span className={styles.summaryPrice}>€{(cart?.total-(cart?.total/1.21))?.toFixed(2)}</span> : <h2>€0.00</h2>}
                    </div>
                    <div className={styles.summary}>
                       <span className={styles.summaryText}>Coupon Code</span>
                        {couponCode &&   <span>{couponCode}</span>}
                    </div>

                    <div className={styles.summary}>
                        <h2>TOTAL:</h2>
                        <h2>€{cart && (cart?.total + shippingCost).toFixed(2) || 0.00.toFixed(2)}</h2>
                    </div>
                    {(complete) && <div className={styles.buttonContainer}>
                       <Link href='/checkout' passHref>
                            <button onClick={handleUpdate}
                                className={styles.button}>
                                COMPLETE ORDER
                            </button>
                       </Link>
                    </div>}
                </div>


            </div>
            </div>
        </div>
    );
};

export default Cart;
Cart.getLayout = function getLayout(page){
    return(
        <MainLayout>
            {page}
        </MainLayout>
    )
}

