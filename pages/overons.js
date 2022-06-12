import styles from '../styles/website/Overons.module.css'
import Link from "next/link";
import FAQ from "../components/website/overons/FAQ";

import ArrowBack from "../components/icons/ArrowBack";
import React, {useState} from "react";
import Staff from "../components/website/overons/Staff";
import Contact from "../components/website/overons/Contact";
import axios from "axios";
import MainLayout from "../components/layouts/MainLayout";



const Overons = ({image}) => {
    const [section, setSection] = useState('')
    const [subGroup, setSubGroup] = useState('faq')
    const handleClick = (data) => {
        if(section !==data){
            setSection(data)
        }else{
            setSection('')
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.back}>
                <div className={styles.backArrow}>
                    <Link href="/" passHref>
                        <div className={styles.backArrow}>
                            <div>
                                <ArrowBack height={35} width={35}/>
                            </div>
                            <h1 className={styles.terug}> Terug</h1>

                        </div>

                    </Link>
                </div>
                <h1>Overons</h1>
            </div>
            <div className={styles.buttonContainer}>
               <button  className={styles.sub} onClick={()=>setSubGroup('faq')}>
                   FAQ
               </button>
                <button  className={styles.sub} onClick={()=>setSubGroup('staff')}>
                    Onze Staff
                </button>
                <button  className={styles.sub} onClick={()=>setSubGroup('overons')}>
                    Over Ons
                </button>
            </div>
            {subGroup === 'faq' && <FAQ section={section} handleClick={handleClick}/>}
            {subGroup === 'staff' && <Contact section={section} image={image} handleClick={handleClick}/> }
            {subGroup === 'overons' && <Contact section={section} image={image} handleClick={handleClick}/> }

        </div>
    );
};

export default Overons;
Overons.getLayout = function getLayout(page){
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
