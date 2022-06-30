import styles from '../../styles/website/Service.module.css'

import Link from "next/link";

import ArrowBack from "../../components/icons/ArrowBack";
import axios from "axios";
import Contact from "../../components/website/overons/Contact";
import MainLayout from "../../components/layouts/MainLayout";
import React from "react";





const Service = ({service}) => {

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
            <div className={styles.wrapper}>

                    {service.map((services)=>(
                        services.desc &&
                        <div className={styles.hero} key={services._id}>
                        <p>
                            {services.desc}
                        </p>
                        </div>
                    ))}


                <h2>SERVICES</h2>
                {service.map((services, idx)=>(
                    !services.desc &&
                    <div className={styles.serviceList}>
                        <div className={styles.headerLine} key={services._id}>
                            <span>{services.serviceType.toUpperCase()}</span>
                        </div>
                        {services.services.map((item, idx)=>(
                            <ul>
                            <li key={idx}>
                        {item}
                            </li>


                            </ul>
                            ))}

                    </div>

                ))}

            </div>

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
    const img = await axios.get(`https://`+host+`/api/service`);

    return{
        props: {
            service: img.data
        }
    }
}

