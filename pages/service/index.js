import styles from '../../styles/website/Service.module.css'

import Link from "next/link";

import ArrowBack from "../../components/icons/ArrowBack";
import axios from "axios";
import Contact from "../../components/website/overons/Contact";
import MainLayout from "../../components/layouts/MainLayout";
import React from "react";





const Service = ({image}) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.img}>

                    <div className={styles.backArrow}>
                        <Link href="/" passHref>
                            <div className={styles.backArrow}>
                                <div>
                                    <ArrowBack height={40} width={40}/>
                                </div>
                                <h1 className={styles.terug}> Terug</h1>

                            </div>

                        </Link>
                    </div>

                </div>
                <h1>Service & Repair</h1>
            </div>
            <Contact image={image}/>
        </div>
    );
};

export default Service;
Service.getLayout = function getLayout(page){
    return(
        <MainLayout>
            {page}
        </MainLayout>
    )
}


export const getServerSideProps = async (ctx) => {
    const host = ctx.req.headers.host;
    const img = await axios.get(`https://`+host+`/api/images`);

    return{
        props: {
            image: img.data
        }
    }
}

