import React from 'react';
import {useRouter} from "next/router";

import styles from "../../styles/website/Order.module.css";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import MainLayout from "../../components/layouts/MainLayout";
import ProgressBar from "../../components/website/ProgressBar";


const Order = ({order}) => {
    const router = useRouter()
    const {id} = router.query


    return (
        <div className={styles.container} style={{minHeight: '80vh'}}>
            <Head>

                <title>Your Order</title>
                <link  rel="icon" href="/headerlogo.svg"/>
            </Head>

            <div className={styles.header}>

                <h2>Order Status:</h2>
                <ProgressBar order={order}/>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    {order.items.map((item, idx)=>(
                        <div className={styles.product} key={item._id}>
                            <div className={styles.productDetail}>
                                <Image src={`/img/${item.img}`} alt='' height={200} width={200} objectFit='contain'/>
                                <div className={styles.details}>
                                    <span><b>Name:</b> {item.name}</span>
                                    <span><b>ID:</b> {item.modelId}</span>
                                    {item.color && <span><b>Color:</b> {item.color}</span>}
                                    {item.size && <span><b>Size:</b> {item.size}</span>}
                                </div>
                            </div>
                            <div className={styles.priceDetail}>
                                <div className={styles.productAmountContainer}>
                                    <span>Quantity: {item.quantity}</span>

                                </div>
                                <div className={styles.productPrice}>
                                    <span>  €{Number(item.price*(item.quantity)).toFixed(2)}</span>
                                </div>

                            </div>

                        </div>

                    ))}
                    <hr className={styles.hr}/>
                </div>
                <div className={styles.rightOrder}>
                    <div className={styles.topRight}>
                        <div className={styles.summary}>
                            <span className={styles.summaryText}>Order Number: </span>
                            <span className={styles.summaryText}>{id}</span>
                        </div>
                        <div className={styles.summary}>
                            <span className={styles.summaryText}>Address: </span>
                            <span className={styles.summaryText}>{order.address.address}</span>
                        </div>
                        <div className={styles.summary}>
                            <span className={styles.summaryText}>City: </span>
                            <span className={styles.summaryText}>{order.address.city}</span>
                        </div>
                        <div className={styles.summary}>
                            <span className={styles.summaryText}>Post Code: </span>
                            <span className={styles.summaryText}>{order.address.postalCode}</span>
                        </div>
                        <div className={styles.summary}>
                            <span className={styles.summaryText}>Country: </span>
                            <span className={styles.summaryText}>{order.address.country}</span>
                        </div>
                        <div className={styles.summary}>
                            <span className={styles.summaryText}>Carrier: </span>
                            <span className={styles.summaryText}>{order.shippingMethod.method}</span>
                        </div>
                        <div className={styles.summary}>
                            <span className={styles.summaryText}>Tracking Number: </span>
                            <span className={styles.summaryText}>{id}</span>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    );
};

    export default Order;
Order.getLayout = function getLayout(page){
    return(
        <MainLayout>
            {page}
        </MainLayout>
    )
}
export const getServerSideProps = async ({params}) =>{

    const res = await axios.get(process.env.PUBLIC_URL+`/api/orders/${params.id}`);

    return{
        props:{
            order: res.data,



        }
    }
}
