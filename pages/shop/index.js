import React from 'react';
import styles from "../../styles/website/Shop.module.css"
import Link from "next/link"

import CategoryCard from "../../components/website/CategoryCard";
import axios from "axios";
import Head from "next/head";

import ArrowBack from "../../components/icons/ArrowBack";
import MainLayout from "../../components/layouts/MainLayout";

const Index = ({categories}) => {


    return (
        <div className={styles.container}>
        <div className={styles.header}>
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

            <h1>Choose a Category:</h1>

        </div>
            <Head>
                <title>RnG Diving</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
          <div className={styles.cardContainer}>
              {categories.map((category, idx)=> (

                  <div key={idx}>

                      <CategoryCard key={idx} fill='fill' index='all' name={categories[idx].name} desc={categories[idx].desc} img={categories[idx].img}/>

                  </div>
              ))}
          </div>
        </div>
    );
};

export default Index;
;
export const getServerSideProps = async(ctx) => {
 const host = ctx.req.headers.host;


    const res = await axios.get(`https://`+host+`/api/catMenu`);
  return{
    props:{
      categories: res.data,


    },

  }
};
Index.getLayout = function getLayout(page){
    return(
        <MainLayout>
            {page}
        </MainLayout>
    )
}
