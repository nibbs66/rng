import '../styles/globals.css'
import React from 'react'
import AdminLayout from "../components/layouts/AdminLayout";
import OtherLayout from "../components/layouts/OtherLayout"
import { SessionProvider } from "next-auth/react"
const layouts = {

    L2: AdminLayout,
    L3: OtherLayout
}

function MyApp({ Component, pageProps:{session, ...pageProps} }) {
    const Layout = layouts[Component.layout] || ((children)=><>{children}</>)
    return (
        <SessionProvider session={session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    )
}

export default MyApp
