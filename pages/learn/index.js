import React from 'react';

import Contact from "../../components/website/overons/Contact";
import axios from "axios";
import MainLayout from "../../components/layouts/MainLayout";
import Index from "../shop";

const Learn = ({image}) => {
    return (
        <div>
            {<Contact image={image}/>
        </div>
    );
};

export default Learn;
Learn.getLayout = function getLayout(page){
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
