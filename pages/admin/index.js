import React, {useEffect, useState} from 'react';
import styles from "../../styles/admin/Admin.module.css"

import FeaturedInfo from "../../components/admin/FeaturedInfo";
import { getSession} from "next-auth/react"
import {getToken} from "next-auth/jwt";
import WidgetSm from "../../components/admin/WidgetSm";
import WidgetLg from "../../components/admin/WidgetLg";
import Chart2 from "../../components/admin/Chart2";

import AdminLayout from "../../components/layouts/AdminLayout";
import axios from "axios";


const AdminHome = ({session, income, orders}) => {




       return(


           <div className={styles.container}>
               <div className={styles.wrapper}>
                   <FeaturedInfo income={income}/>
                   <Chart2 winkel={orders}/>
                   <div className={styles.widgetContainer}>
                       <WidgetSm/>
                       <WidgetLg/>
                   </div>
               </div>
           </div>


    )




};

export default AdminHome;
AdminHome.getLayout = function getLayout(page){
    return(
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
export async function getServerSideProps(ctx) {
    const host = ctx.req.headers.host;
    const res = await axios.get(`http://`+host+`/api/orders/income`);
    const range = await axios.get(`http://`+host+`/api/orders`);
    return {
        props: {
            income: res.data,
            orders: range.data,
            session: await getSession(ctx),
            token: await getToken(ctx)
        },
    }
}
