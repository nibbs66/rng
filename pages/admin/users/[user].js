import React, {useEffect, useState} from 'react';
import styles from '../../../styles/admin/User.module.css'
import DataTable from "../../../components/admin/DataTable";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/router";

import Eye from "../../../components/icons/Eye";
import TrashCan from "../../../components/icons/TrashCan";
import TableHeader from "../../../components/admin/TableHeader";
import AdminLayout from "../../../components/layouts/AdminLayout";

const Customers = ({customers}) => {
    const router = useRouter()
    const {user} = router.query
    const [data, setData] = useState([]);

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };
  useEffect(()=>{
            setData([])
          customers.map((option)=>{

              setData( (prev)=>[...prev, {
                  id: option._id,
                  avatar:  option.firstName,
                  firstName: option.firstName,
                  lastName: option.lastName,
                  email: option.personal.email,
                  phone:  option.personal.phone
              }])

          })


  },[user,customers])
    const columns = [

        {field: "avatar", headerName: "Avatar", width: 70,
            renderCell: (params) => {
                return (
                    <div className={styles.avatar}>

                        <div className={styles.avatarText}>
                     {params.row.firstName[0].toUpperCase()}
                            {params.row.lastName[0].toUpperCase()}
                 </div>
                    </div>
                );
            },
        },
        {
            field: "user",
            headerName: "Name",
            width: 230,
            renderCell: (params) => {
                return (
                    <div className={styles.cellWithImg}>

                        <span className={styles.span}>
                     {params.row.firstName} {params.row.lastName}
                 </span>
                    </div>
                );
            },
        },
        {
            field: "email",
            headerName: "Email",
            width: 230,
        },

        {
            field: "phone",
            headerName: "Phone",
            width: 200,
        },

        {
            field: "view",
            headerName: "View",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className={styles.cellAction}>
                        <Link href={`/admin/users/${user}/${params.row.id}`} style={{textDecoration: "none"}} passHref>
                            <div className={styles.viewButton}>  <Eye className={styles.widgetSmIcon} />Display</div>
                        </Link>

                    </div>
                );
            },
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className={styles.cellAction}>

                        <div className={styles.deleteButton}> <TrashCan  className={styles.widgetSmIcon}/>Delete</div>
                    </div>
                );
            },
        },
    ];

    return(
        <div className={styles.container}>

            <TableHeader  title={user}  cat={'user'}/>
                <DataTable title={user} rows={data} cat={'user'} columns={columns} pageOption={[10]} pageSize={10}/>




        </div>
    )
};

export default Customers;
Customers.getLayout = function getLayout(page){
    return(
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
export const getServerSideProps = async(ctx) => {
    const host = ctx.req.headers.host;
    const res = await axios.get(`https://`+host+`/api/users?group=${ctx.params.user}`);

    return{
        props: {
            customers: res.data
        }
    }


};
