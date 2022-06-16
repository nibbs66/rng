import React, {useEffect, useState} from 'react';
import styles from "../../styles/admin/Admin.module.css"

import FeaturedInfo from "../../components/admin/FeaturedInfo";
import {  getSession} from "next-auth/react"
import {getToken} from "next-auth/jwt";
import WidgetSm from "../../components/admin/WidgetSm";
import WidgetLg from "../../components/admin/WidgetLg";
import Chart2 from "../../components/admin/Chart2";

import AdminLayout from "../../components/layouts/AdminLayout";


const AdminHome = ({session, token}) => {




       return(


           <div className={styles.container}>
               <div className={styles.wrapper}>
                   <FeaturedInfo/>
                   <Chart2/>
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
export async function getServerSideProps(context) {
    return {
        props: {
            session: await getSession(context),
            token: await getToken(context)
        },
    }
}
