import useSWR from "swr";
import axios from 'axios'
import {useSession} from "next-auth/react";
import {useEffect, useState} from 'react'

const fetcher = async(url) => {
    try{
        const res = await axios.get(url)
        return res.data
    }catch(err){
        console.log(err)
    }
}

export default function useUser () {
    const [guestId, setGuestId] = useState('')

    const{data: session, status} = useSession()

    const id = session?.id
    useEffect(()=>{
        const cartId = async() => {
            const getCart =  await JSON.parse(localStorage.getItem('tempRnGCart'))
            setGuestId(getCart)

        }
       cartId()
    },[])

    const {data: user, error, isValidating, mutate} = useSWR(id && `/api/users/`+id, fetcher)
    let cartId;
    if(user){
        cartId = user.cart
    }else if(!user){
        cartId =  guestId
    }
    console.log(cartId)

    const {data: cart, mutate: mutateCart} = useSWR(()=>   `/api/cart/`+cartId , fetcher,
        {revalidateAll: true})
    const {data: favorites, mutate: mutateFavorite} = useSWR(()=>user.favorites && `/api/favorite/`+user.favorites, fetcher)

    return {
        user,
        mutate,
        cart,
        mutateCart,
        favorites,
        mutateFavorite,
        error,
        isValidating
    }
}
