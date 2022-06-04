import React from 'react';

import Footer from "../website/Footer";
import Navbar from "../website/Navbar";


const MainLayout = ({children}) => {

    return (
        <>
            <Navbar />
            {children}
            <Footer/>


        </>
    );
};

export default MainLayout;
