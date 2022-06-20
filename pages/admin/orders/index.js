import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useRouter} from "next/router";
import styles from "../../../styles/admin/User.module.css";
import Link from "next/link";

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
            console.log(option)
            setData( (prev)=>[...prev, {
                id: option._id,
                customer: option.customer.firstName + ' ' + option.customer.lastName,
                email:  option.email,
                type: option.purchaseType,
                total: `€${option.total.toFixed(2)}`,
                carrier: option.shippingMethod?.shippingMethod,
                status: option.status,

            }])

        })


    },[orders])


    const statusClass = (index) => {
        if(index === 0){

            return styles.received;
        }
        if(index === 1){

            return styles.prepared

        }
        if(index === 2){

            return styles.shipped;
        }
        if(index === 3) {

            return styles.delivered;
        }
        if(index === 4) {

            return styles.cancelled;
        }
    };
    const statusName = (index) => {
        if(index === 0){

            return 'Order Received'
        }
        if(index === 1){

            return 'Ready to Ship'

        }
        if(index === 2){

            return 'Shipped'
        }
        if(index === 3) {

            return 'Delivered';
        }
        if(index === 4) {

            return 'Cancelled'
        }
    };
   const columns = [
        {
            field: "id",
            headerName: "Order Number",
            width: 150,

        },

        {field: "customer", headerName: "Customer", width: 150,
        },
        {
            field: "email",
            headerName: "Email",
            width: 150,

        },

        {
            field: "type",
            headerName: "Type",
            width: 150,
        },

        {
            field: "total",
            headerName: "Total",
            width: 90,
        },
        {
            field: "carrier",
            headerName: "Carrier",
            width: 70,

            },



        {
            field: "status",
            headerName: "Status",
            width: 150,
           renderCell: (params) => {
                return (
                    <div className={statusClass(params.row.status)}>
                        {statusName(params.row.status)}
                    </div>
                )

                }
            },



        {
            field: "view",
            headerName: "View",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className={styles.cellAction}>
                        <Link href={`/admin/orders/${params.row.id}`} style={{textDecoration: "none"}} passHref>
                            <div className={styles.viewButton}>  <Eye className={styles.widgetSmIcon} />Display</div>
                        </Link>

                    </div>
                );
            },
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className={styles.cellAction}>

                        <div className={styles.deleteButton}> <TrashCan  className={styles.widgetSmIcon}/> Delete</div>
                    </div>
                );
            },
        },
    ];


    return (
        <div className={styles.container}>
            <TableHeader  title={'Orders'}  cat={'orders'}/>
            <div className={styles.searches}>
                <div className={styles.searchContainer}>

                </div>
                <div  className={styles.searchContainer}>

                </div>
            </div>

            <DataTable title={'Orders'} rows={data} cat={'order'} columns={columns} pageOption={[10]} pageSize={10}/>
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
