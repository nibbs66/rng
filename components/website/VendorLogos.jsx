
import styles from "../../styles/website/VendorLogo.module.css";
import Image from "next/image";

import {useEffect, useState} from "react";



const VendorLogos = ({images, as}) => {
    const [logos, setLogos] = useState(images)




const imageStyle = (width) => {
        if(width > 850){
            return styles.scrollingImage
        }
        if(width <= 850){

            return styles.mobileScrollingImage
        }
}
const imageHeight = (width) => {
    if(width >850){
     return 80
    }

    if(width <= 850){
        return 50

    }
}
const imageWidth = (width) => {
    if(width >850){
        return 100
    }

    if(width <= 850){
        return 50

    }
}

    return (

                <div>
                   <div className={styles.imageContainer}>
                        {logos?.map((image, idx) => (
                            image.pic.category === 'vendorLogo' &&

                            <div className={styles.scrollingImage} key={idx} as={as}>

                            <Image  src={image.pic.img} alt='' height={80}
                            width={100} priority={true} objectFit='contain' as={as}
                            crossOrigin="anonymous"/>


                            </div>

                        ))}
                    </div>


                </div>


    );
};

export default VendorLogos;
