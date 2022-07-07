import styles from "./styles/admin/User.module.css";
import Link from "next/link";
import Eye from "./components/icons/Eye";
import TrashCan from "./components/icons/TrashCan";
import React from "react";


export const userColumns = [

    {field: "number", headerName: "Dive Number", width: 100},
    {
        field: "agency",
        headerName: "Agency",
        width: 150,

    },
    {
        field: "date",
        headerName: " Certification Date",
        width: 200,
    },

    {
        field: "instructor",
        headerName: "Instructor",
        width: 150,
    },
    {
        field: "level",
        headerName: "Level",
        width: 220,

    },


];
export const historyColumns = [
    {
        field: "id",
        headerName: "Order Number",
        width: 120,
    },

    {
        field: "date",
        headerName: "Order Date",
        width: 150,

    },


    {
        field: "quantity",
        headerName: "Quantity",
        width: 90,
    },
    {
        field: "amount",
        headerName: "Total",
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

]
export const statusClass = (index) => {
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
export const statusName = (index) => {
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
export const orderColumns = [
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

