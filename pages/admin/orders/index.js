import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useRouter} from "next/router";
import styles from "../../../styles/admin/User.module.css";
import Link from "next/link";
import {orderColumns} from "../../../chartData";
import TrashCan from "../../../components/icons/TrashCan";
import Eye from "../../../components/icons/Eye";
import DataTable from "../../../components/admin/DataTable";
import TableHeader from "../../../components/admin/TableHeader";
import AdminLayout from "../../../components/layouts/AdminLayout";

const Orders = ({orders}) => {
    const router = useRouter()
    const [initialMan, setInitialMan] = useState([])
    const [orderStatus, setOrderStatus] = useState('Order Received')
    const [data, setData] = useState([]);
    const handleClick = () => {

    }


    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };
    useEffect(()=>{
        setData([])

       orders.map((option)=>{

            setData( (prev)=>[...prev, {
                id: option._id,
                customer: option.customer.firstName + ' ' + option.customer.lastName,
                email:  option.email,
                type: option.purchaseType,
                total: `€${option.total.toFixed(2)}`,
                carrier: option.shippingMethod?.method,
                status: option.status,

            }])

        })


    },[orders])



    return (
        <div className={styles.container}>
            <TableHeader  title={'Orders'}  cat={'orders'}/>
            <div className={styles.searches}>
                <div className={styles.searchContainer}>

                </div>
                <div  className={styles.searchContainer}>

                </div>
            </div>

            <DataTable title={'Orders'} rows={data} cat={'order'} columns={orderColumns} pageOption={[10]} pageSize={10}/>
        </div>
    );
};

export default Orders;
Orders.getLayout = function getLayout(page){
    return(
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
export const getServerSideProps = async(ctx) => {
    const host = ctx.req.headers.host;
    const res = await axios.get(`https://`+host+`/api/orders`);


    return{
        props: {
            orders: res.data,

        }
    }


};
