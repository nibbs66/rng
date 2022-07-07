import React, {useEffect, useState} from 'react';
import diver from '../../public/img/scuba.png'
import styles from '../../styles/website/ProgressBar.module.css'
import Image from "next/image";
const ProgressBar = ({order}) => {
    const [status, setStatus] = useState('receivec')
    const statusName = (index) => {
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

    const statusStyle = (index) => {
        if(index === 0){
            return 'received'
        }
        if(index === 1){
           return 'prepared'
        }
        if(index === 2){
            return 'shipped'
        }
        if(index === 3) {
            return 'delivered'
        }
        if(index === 4) {
            return 'cancelled'
        }
    };

    return (
        <div className={styles.container}>
          <div className={styles[statusStyle(order.status)]}>
               <span className={styles.title}>
                {statusName(order.status)}
           </span>
              <div  className={styles.img}>
                  <Image  src={diver} alt='' height={80} width={80} objectFit='contain'/>
              </div>

          </div>

        </div>
    );
};

export default ProgressBar;
