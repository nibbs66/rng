import React, {useEffect, useState} from 'react';
import axios from "axios";
import styles from "../../../styles/admin/Order.module.css";
import TableHeader from "../../../components/admin/TableHeader";
import Link from "next/link";
import TrashCan from "../../../components/icons/TrashCan";
import Eye from "../../../components/icons/Eye";
import DataTable from "../../../components/admin/DataTable";
import AdminLayout from "../../../components/layouts/AdminLayout";


const Order = ({order}) => {
    const [customer, setCustomer] = useState('')
    const [phone, setPhone] = useState([])
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(order.status)
    const [orderStatus, setOrderStatus] = useState('Order Received')
    const [isChecked, setisChecked] = useState('Order Received')
    console.log(order)

    const allStatus = [
        {key: 0, name: 'Order Received'},
        {key: 1, name: 'Ready to Ship'},
        {key: 2, name: 'Shipped'},
        {key: 3, name: 'Delivered'},
        {key: 4, name: 'Cancelled'}
    ]

    useEffect((allStatus)=>{

      setData([])
           order.items.map((option)=>{
               console.log(option)
               setData( (prev)=>[...prev, {
                   id: option.productId,
                   name: option.name,
                   quantity:  option.quantity,
                   price: `€${option.price.toFixed(2)}`,
               }])

           })
           if(order.status === 0){
               setisChecked('Order Received')
           }
           if(order.status === 1){
               setisChecked('Ready to Ship')
           }
           if(order.status === 2){
               setisChecked('Shipped')
           }
           if(order.status === 3){
               setisChecked('Delivered')
           }
           if(order.status === 4){
               setisChecked('Cancelled')
           }




    },[order])
    const handleChange = (e) => {

        setStatus(e.target.value)
    };

    const statusClass = (index) => {
        if(index === 0) return styles.received;
        if(index === 1){
            setOrderStatus('Ready to Ship')
            return styles.prepared

        }
        if(index === 2){
            setOrderStatus('Shipped')
            return styles.shipped;
        }
        if(index === 3) {
            setOrderStatus('Delivered')
            return styles.delivered;
        }
        if(index === 4) {
            setOrderStatus('Cancelled')
            return styles.cancelled;
        }


    };

    const columns = [
        {
            field: "id",
            headerName: "Product Id",
            width: 150,

        },

        {field: "name", headerName: "Name", width: 150,
        },
        {
            field: "quantity",
            headerName: "Quantity",
            width: 150,

        },

        {
            field: "price",
            headerName: "Price",
            width: 150,
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
    const handleStatus = async(e, update) => {
        console.log(update)
        try{
            const res = await axios.put("/api/orders/"+order._id, {status: update.key});

            setisChecked(update.name)
            setOrderStatus(update.name)
        }catch(err){

        }
    }
    console.log(order)
    return (
        <div className={styles.container}>
            <TableHeader  title={order._id}  cat={'order'}/>
            <div className={styles.productTop}>
                <div className={styles.productTopLeft}>
                        <h1>Customer & Shipping Information</h1>
                   <div className={styles.shippingContainer}>
                       <div className={styles.productInfoLeft}>
                           <div className={styles.info}>
                               <h3>Customer: </h3>
                               <span>{order.customer.firstName + ' ' + order.customer.lastName}</span>
                           </div>
                           <div className={styles.info}>
                               <h3>Address: </h3>
                               <span>{order.address.address}</span>
                           </div>
                           <div className={styles.info}>
                               <h3>Post Code: </h3>
                               <span>{order.address.postalCode}</span>
                           </div>
                           <div className={styles.info}>
                               <h3>City: </h3>
                               <span>{order.address.city}</span>
                           </div>
                           <div className={styles.info}>
                               <h3>Country: </h3>
                               <span>{order.address.country}</span>
                           </div>
                           <div className={styles.info}>
                               <h3>Phone: </h3>
                               <span>{order.phone}</span>
                           </div>
                           <div className={styles.info}>
                               <h3>Email: </h3>
                               <span>{order.email}</span>
                           </div>

                       </div>
                       <div className={styles.productInfoCenter}>
                           <div className={styles.info}>
                               <h3>Sales Total: </h3>
                               <span>€{order.total.toFixed(2)}</span>
                           </div>
                           <div className={styles.info}>
                               <h3>Source: </h3>
                               <span>{order.purchaseType}</span>
                           </div>
                           <div className={styles.info}>
                               <h3>Shipping: </h3>
                               <span>{order.shippingMethod.method}</span>
                           </div>
                           <div className={styles.info}>
                               <h3>Shipping Charge: </h3>
                               <span>€{order.shippingMethod.price.toFixed(2)}</span>
                           </div>


                       </div>
                       <div className={styles.productInfoRight}>
                           <div className={styles.info}>
                               <h3>Status: </h3>
                               <span >{isChecked}</span>
                           </div>
                           <div className={styles.info}>
                               <h3 >
                                   Update Status
                               </h3>

                               {allStatus.map((newStatus,idx)=>(
                                   <div key={idx}>
                                       <input
                                           onChange={(e) => handleStatus(e, newStatus)}
                                           type="checkbox"
                                           id={newStatus.name}
                                           name={newStatus.name}
                                          checked={isChecked === newStatus.name}
                                           className={styles.topInput}


                                       />
                                       <label htmlFor="double" className={styles.level}>{newStatus.name}</label>
                                   </div>

                               ))}
                           </div>

                       </div>

                   </div>
                </div>
            </div>
            <div className={styles.productBottom}>
                <DataTable title={''} rows={data} cat={'order'} columns={columns} pageOption={[10]} pageSize={10}/>
            </div>

        </div>
    );
};

    export default Order;
Order.getLayout = function getLayout(page){
    return(
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
export const getServerSideProps = async (ctx) =>{
    const host = ctx.req.headers.host;

const res = await axios.get(`https://`+host+`/api/orders/${ctx.params.id}`);

    return{
        props:{
            order: res.data,

        }
    }
}
