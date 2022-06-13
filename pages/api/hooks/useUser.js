import useSWR from "swr";
import axios from 'axios'
import {useSession} from "next-auth/react";
import {useEffect, useState} from 'react'

import { v4 as uuidv4 } from 'uuid';
import {setCookies,getCookie} from "cookies-next";

const fetcher = async(url) => {
    try{
        const res = await axios.get(url)
        return res.data
    }catch(err){
        console.log(err)
    }
}
setCookies('RnGCart', `guest${uuidv4()}`, {maxAge: 60 * 6 * 24})
export default function useUser () {

    const [guestId, setGuestId] = useState('')
    const{data: session, status} = useSession()


    const id = session?.id
    useEffect(()=>{
        const guestCookie =  getCookie('RnGCart')
                setGuestId(guestCookie)

    },[])

    const {data: user, error, isValidating, mutate} = useSWR(id && `/api/users/`+id, fetcher)
    let cartId;
    if(user){
        cartId = id
    }else if(!user){
        cartId =  guestId
    }

    const {data: cart, mutate: mutateCart} = useSWR( `/api/cart?cart=${cartId}` , fetcher)

    const {data: favorites, mutate: mutateFavorite} = useSWR(user && `/api/favorite?favorite=${cartId}`, fetcher)


    return {
        user,
        mutate,
        cart,
        cartId,
        mutateCart,
        favorites,
        mutateFavorite,
        error,
        isValidating

    }
}
