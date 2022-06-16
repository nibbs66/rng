import React from 'react';
import styles from "../../styles/Modal.module.css"

import Link from 'next/link'
import {useRouter} from "next/router";
import Timer from "../icons/Timer";
import Person from "../icons/Person";
import School from "../icons/School";
import Danger from "../icons/Danger";
import TrendingUp from "../icons/TrendingUp";

import Product from "../icons/Product";

const NieuwModal = ({setShowModal}) => {
    const router = useRouter()
    const handleClick = (value) => {
        router.push(`/admin/new/${value}`)
        setShowModal()
    }
    return (
        <div className={styles.wrapper}>
              <span onClick={(()=>setShowModal())} className={styles.close}>
                  X
              </span>
            <h1 className={styles.h1}>Select</h1>
            <div className={styles.selection}>

                <ul className={styles.ul}>
                    <li className={styles.li} name='sale' onClick={()=>handleClick('sale')}>
                        <TrendingUp className={styles.icon} />
                        <span className={styles.span}>New Sale</span>
                    </li>
                    <li className={styles.li} name='user' onClick={()=>handleClick('user')}>
                        <Person  className={styles.icon}/>
                        <span className={styles.span}>New User</span>
                    </li>
                    <li className={styles.li} value='product' onClick={()=>handleClick('product')}>
                        <Product className={styles.icon}/>
                        <span  className={styles.span}>New Product</span>
                    </li>
                    <li className={styles.li}  onClick={()=>handleClick('service')}>
                        <Danger className={styles.icon}/>
                        <span className={styles.span}>Book Service</span>
                    </li>
                    <li className={styles.li}  onClick={()=>handleClick('rental')}>
                        <Timer className={styles.icon} />
                        <span className={styles.span}>Book Rental</span>
                    </li>
                    <li className={styles.li}  onClick={()=>handleClick('lesson')}>
                        <School className={styles.icon} />
                        <span className={styles.span}>Book Lesson</span>
                    </li>
                </ul>
            </div>

        </div>
    );
};

export default NieuwModal;
