import React from 'react';
import styles from "../../../styles/website/Construction.module.css";
import Image from "next/image";

const Contact = ({image}) => {
    return (
        <div className={styles.container}>
            {/*<h1>Over Ons</h1>*/}
             {image?.map((pic, idx) => (
                            pic.pic.category === 'construction' &&

                            <div className={styles.scrollingImage} key={idx} >

                            <Image  src={pic.pic.img} alt='' height={1500}
                            width={2000} priority={true} objectFit='contain'
                            crossOrigin="anonymous"/>


                            </div>

                        ))}
            <div className={styles.link}>
                <a href="https://www.freepik.com/vectors/coming-soon">Coming soon vector created by starline </a>
            </div>

        </div>
    );
};

export default Contact;
