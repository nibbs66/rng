import {useEffect, useState} from 'react';

import {useRouter} from "next/router";
import styles from "../styles/website/Login.module.css";


import useUser from "./api/hooks/useUser";
import MainLayout from "../components/layouts/MainLayout";

import useToggle from "../components/hooks/useToggle";
import axios from "axios";
const Success = () => {
    const router = useRouter()
    const [success, setSuccess] = useToggle()
   const {user, cart, mutateCart, isValidating} = useUser()


    useEffect(() =>{
           const finalizeOrder = async() => {

                  try{
        const res = await axios.post('/api/orders',
            {
                userId: cart?.userId,
                customer: {
                    firstName:  user? user.firstName : cart?.guestInformation.firstName,
                    lastName:  user? user.lastName : cart?.guestInformation.lastName
                },
                address: user? user.address : cart?.guestInformation.address,
                email:  user? user.personal.email : cart?.guestInformation.email,
                phone: user? user.personal.phone : cart?.guestInformation.phone,
                total: cart?.total,
                items: cart?.items,
                purchaseType: 'Web-shop',
                shippingMethod: cart?.shipping
            });
        cart.items.map(async(item)=>{
            const inventory = await axios.put(`/api/products/inventory/${item.productId}`,
                {quantity: item.quantity})

        })
        const remove = await axios.delete(`/api/cart/delete/${cart._id}`)
                      if(res.status===201 && remove.status===200){
                          setSuccess()
                      }
                  }catch(err){
        console.log(err)
    }
               mutateCart()

           }
           finalizeOrder()
       },[cart])


if(isValidating){
    return <h1>Loading</h1>
}

    return (
      <div style={{minHeight: '80vh'}}>

          {success && <div className={styles.resetContainer} style={{minHeight: '80vh'}}>
              <div className={styles.orderConfirm}>
                  <h1 className={styles.title}>Thank You For Your Order!!</h1>

                  <h1 className={styles.title}>You Will Receive a Confirmation Email Shortly.</h1>
              </div>
          </div>}
      </div>
    );
};

export default Success;
Success.getLayout = function getLayout(page){
    return(
        <MainLayout>
            {page}
        </MainLayout>
    )
}
