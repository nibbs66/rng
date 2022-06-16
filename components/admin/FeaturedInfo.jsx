import styles from "../../styles/admin/FeaturedInfo.module.css"

import {useEffect, useState} from "react";
import Link from "next/link"
import ArrowUp from "../icons/ArrowUp";
import ArrowDown from "../icons/ArrowDown";

export default function FeaturedInfo() {
    const [income, setIncome] = useState([]);
    const [percentage, setPercentage] = useState(0);




    return (
        <div className={styles.featured}>

            <div className={styles.featuredItem}>
                <span className={styles.featuredTitle}>Revenue</span>
                <div className={styles.featuredMoneyContainer}>
                    <span className={styles.featuredMoney}>€5000</span>
                    <span className={styles.featuredMoneyRate}>
            {Math.floor(percentage)}%{" "}
                        {percentage < 0 ? (<div  className={styles.negativeIcon}>
                                <ArrowDown color={'red'} height={30} width={30} className={styles.negativeIcon}/>
                        </div> )
                            : (<ArrowUp color={'green'} height={30} width={30} className={styles.featuredIcon}/>)
                        }

          </span>
                </div>
                <span className={styles.featuredSub}>Compared to last month</span>
            </div>

            <Link href="/admin/sales" passHref>
            <div className={styles.featuredItem}>
                <span className={styles.featuredTitle}>Sales</span>
                <div className={styles.featuredMoneyContainer}>
                    <span className={styles.featuredMoney}>€4,415</span>
                    <span className={styles.featuredMoneyRate}>
            -1.4 <ArrowDown color={'red'} height={30} width={30} className={styles.negativeIcon}/>
          </span>
                </div>
                <span className={styles.featuredSub}>Compared to last month</span>
            </div>
            </Link>
            <Link href="/admin/lessons" passHref>
            <div className={styles.featuredItem}>
                <span className={styles.featuredTitle}>Lessons</span>
                <div className={styles.featuredMoneyContainer}>
                    <span className={styles.featuredMoney}>27</span>
                    <span className={styles.featuredMoneyRate}>
            +2.4 <ArrowUp color={'green'} height={30} width={30} className={styles.featuredIcon}/>
          </span>
                </div>
                <span className={styles.featuredSub}>Compared to last month</span>
            </div>
            </Link>
        </div>
    );
}
