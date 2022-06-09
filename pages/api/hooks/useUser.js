import useSWR from "swr";
import axios from 'axios'
import {useSession} from "next-auth/react";

const fetcher = async(url) => {
    try{

        const res = await axios.get(url)
        return res.data
    }catch(err){
        console.log(err)
    }
}
export default function useUser () {
    const {data: session, status} = useSession()
    const id = session?.id
    console.log(id)
    const {data: user, error, isValidating, mutate} = useSWR(id && `/api/users/${id}`, fetcher)
    const {data: cart, mutate: mutateCart} = useSWR(() => user.cart && `/api/cart/${user.cart}`, fetcher)
    const {
        data: favorites,
        mutate: mutateFavorite
    } = useSWR(() => user.favorites && `/api/favorite/` + user.favorites, fetcher)

    return {
        user,
        mutate,
        cart,
        mutateCart,
        favorites,
        error,
        isValidating
    }

}


