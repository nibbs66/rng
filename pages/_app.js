import '../styles/globals.css'
import React from 'react'

import { SessionProvider } from "next-auth/react"


function MyApp({ Component, session,  pageProps }) {
    const getLayout = Component.getLayout || ((page) => page)
    return (
        <SessionProvider session={session}>
            {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
        )


}

export default MyApp
