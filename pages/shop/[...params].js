import React, {useEffect, useState} from 'react';
import styles from "../../styles/website/ProductPage.module.css"
import Image from "next/image";
import {useRouter} from "next/router";
import Head from "next/head";
import Modal from "../../components/Modal";
import axios from "axios";
import useLocalStorageState from 'use-local-storage-state'
import {AddToCart, FavoriteButton} from "../../components/actions/Buttons";
import { v4 as uuidv4 } from 'uuid';
import {useSession} from "next-auth/react";
import useToggle from "../../components/hooks/useToggle";
import VendorLogos from "../../components/website/VendorLogos";
import windowDimensions from "../../components/hooks/windowDimensions";
import MainLayout from "../../components/layouts/MainLayout";
import useUser from "../api/hooks/useUser";
import  { useSWRConfig } from 'swr'


const Product = ({product, images}) => {
    const {data: session, status} = useSession()
    const {cart, mutateCart} = useUser()
    const {mutate} = useSWRConfig()
    const router = useRouter()
    const { height, width } = windowDimensions();
    const [quantity, setQuantity] = useState(1)
    const [productId, setProductId] = useState(product._id)
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const [showModal, setShowModal] = useToggle()
    const [disabled, setDisabled] = useState(false)
    const [index, setIndex] = useState(0)
    const [title, setTitle] = useState('')
    const [favoriteCart, setFavoriteCart] = useState('')

    const [guestCart, setGuestCart] = useLocalStorageState('tempRnGCart', {
        ssr: true,
        defaultValue: ''
    })




    const handleClick = async(request) => {
            try{

                if (status === 'unauthenticated' && !cart){
                   const  res = await axios.post(`/api/cart`,
                        {
                            userId: 'guest' + uuidv4(),
                            items: {
                                productId,
                                color,
                                size,
                                quantity,
                                name: product.name,
                                img: product.img[0],
                                price: product.price,
                                modelId: product.modelId
                            },
                            isRegistered: false,
                            total: product.price * quantity
                        })
                  await mutate(`/api/cart/${res.data._id}`, true)
                   setGuestCart(res.data._id)


                }else if (status === 'unauthenticated' && cart.items.length > 0){
                    const  res = await axios.put(`/api/cart?cart=${cart?.userId}`,
                        {

                            items: {
                                productId,
                                color,
                                size,
                                quantity,
                                name: product.name,
                                img: product.img[0],
                                price: product.price,
                                modelId: product.modelId
                            },
                            addToTotal: product.price * quantity,
                            isRegistered: false

                        });

                }else if (status === 'authenticated' && !cart){
                    const res = await axios.post(`/api/cart`,
                        {
                            userId: session.id,
                            items: {
                                productId,
                                color,
                                size,
                                quantity,
                                name: product.name,
                                img: product.img[0],
                                price: product.price,
                                modelId: product.modelId
                            },
                            total: product.price * quantity,
                            isRegistered: true
                        });

                }else if (status === 'authenticated' && cart.items.length > 0){
                    const res = await axios.put(`/api/cart?cart=${session.id}`,

                        {
                            items: {
                                productId,
                                color,
                                size,
                                quantity,
                                name: product.name,
                                img: product.img[0],
                                price: product.price,
                                modelId: product.modelId
                            },
                            addToTotal: product.price * quantity,
                        }
                    )
                };


                    }catch(err){
                console.log(err)
            }


            setShowModal();
    };

    const handlePhoto = (idx) => {
        setIndex(idx)
    };


    const handleChange = (e) => {
        const {name, value} = e.target

   if(name ==='size'){
       setSize(value)
   }
   if(name==='color'){
       setColor(value)
   }
}


    if(status === 'loading'){
        return null
    }
    return (


        <div className={styles.container}>
            <Modal showModal={showModal} setShowModal={setShowModal} title={title} img={`/img/${product.img[index]}`} pic={product.img} size={size} color={color} product={product} quantity={quantity}/>
            <Head>
                <title>RnG Diving</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.top}>
                <div className={styles.left}>
                    <div className={styles.topImage}>
                        <Image className={styles.img} src={`/img/${product.img[index]}`} alt="" height={350} width={350}  objectFit="contain" onClick={()=>{
                            setTitle('Photo')
                               setShowModal()
                        }}/>
                    </div>

                    <div className={styles.thumbnail}>
                        {product.img.length > 1 && product.img.map((picture, idx)=>(
                            <Image className={styles.img} key={idx} value={idx} src={`/img/${picture}`} alt="" height={100} width={100} objectFit="contain" onClick={()=>handlePhoto(idx)}/>
                        ))}


                    </div>
                </div>
                <div className={styles.right}>
                    <h1 className={styles.title}>{product.manufacturer}</h1>
                    <h1 className={styles.title}>{product.name}</h1>
                    <h2 className={styles.price}>€{product.price.toFixed(2)}</h2>
                    <span className={styles.model}>Model Number: {product.modelId}</span>
                    <p className={styles.desc}>{product.desc}
                    </p>

                        <div className={styles.sizeContainer}>
                            {product.color.length > 0 &&
                                <>
                                <span className={styles.optionText}>Color:</span>

                                <span className={styles.optionText}>
                                    <select name="color" required onChange={handleChange} className={styles.option}>
                                <option value=""></option>
                                        {product.color.map((color, idx)=>(
                                            <option key={idx} value={color}>{color}</option>
                                        ))}
                                    </select>
                                </span>
                                </>
                                }
                            {product.size.length > 0 &&
                                <>
                            <span className={styles.optionText}>Size:</span>
                            <span className={styles.optionText}> <select name="size" required onChange={handleChange} className={styles.option}>
                               <option value=""></option>
                                {product.size.map((size, idx)=>(
                                    <option key={idx} value={size}>{size}</option>
                                ))}

                           </select>
                            </span>
                                </>
                            }
                        </div>
                    <div className={styles.buttonContainer}>
                        <AddToCart quantity={quantity} setQuantity={setQuantity} max={product.stock} handleClick={handleClick} setTitle={setTitle}/>
                        <FavoriteButton product={product} quantity={quantity}
                                          session={session}/>
                    </div>
                    <div className={styles.bottom}>

                        <div className={styles.bottomRight}>
                            <h2>Ordering Information</h2>
                            <ul>
                                <li>
                                    *Same Day Shipping
                                </li>
                                <li>
                                    Free Shipping for orders over €70.00
                                </li>
                                <li>
                                    Free Returns
                                </li>
                                <li>
                                    Pay with iDeal, credit card, or in store
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>

            </div>


            <VendorLogos logos={images} as={'logo'} width={width}/>
        </div>

    );
};

export default Product;


export const getServerSideProps = async (ctx) =>{0
    const host = ctx.req.headers.host;
    const res = await axios.get(`http://`+host+`/api/products/${ctx.params.params[1]}`);
    const img = await axios.get(`http://`+host+`/api/images`);
    return{
        props:{
            product: res.data,
            images: img.data,


        }
    }
}
Product.getLayout = function getLayout(page){
    return(
        <MainLayout>
            {page}
        </MainLayout>
    )
}
