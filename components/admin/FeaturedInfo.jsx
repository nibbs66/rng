import styles from "../../styles/admin/FeaturedInfo.module.css"

import {useEffect, useState} from "react";
import Link from "next/link"
import ArrowUp from "../icons/ArrowUp";
import ArrowDown from "../icons/ArrowDown";

export default function FeaturedInfo({income}) {

    const [percentage, setPercentage] = useState(((income[0].current*100)/(income[1].last) -100));
    console.log(income)




    return (
        <div className={styles.featured}>
            <Link href="/admin/orders" passHref>
            <div className={styles.featuredItem}>
                <span className={styles.featuredTitle}>Winkel</span>
                <div className={styles.featuredMoneyContainer}>
                    <span className={styles.featuredMoney}>€{income[0].current}</span>
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
            </Link>

            <Link href="/admin/sales" passHref>
            <div className={styles.featuredItem}>
                <span className={styles.featuredTitle}>Service</span>
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
                <span className={styles.featuredTitle}>Huur</span>
                <div className={styles.featuredMoneyContainer}>
                    <span className={styles.featuredMoney}>27</span>
                    <span className={styles.featuredMoneyRate}>
            +2.4 <ArrowUp color={'green'} height={30} width={30} className={styles.featuredIcon}/>
          </span>
                </div>
                <span className={styles.featuredSub}>Compared to last month</span>
            </div>
            </Link>
            <Link href="/admin/lessons" passHref>
                <div className={styles.featuredItem}>
                    <span className={styles.featuredTitle}>Cursus</span>
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
