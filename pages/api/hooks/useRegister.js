import useSWR from "swr";
import axios from 'axios'
import {useSession} from "next-auth/react";
import {useEffect, useState} from 'react'

import { v4 as uuidv4 } from 'uuid';
const fetcher = async(url) => {
    try{
        const res = await axios.get(url)
        return res.data
    }catch(err){
        console.log(err)
    }
}
export default function useRegister (){

    const {data: user, error, isValidating, mutate} = useSWR( `/api/users/`, fetcher)


    return{
        user,
        error,
        isValidating,
        mutate
    }
}
