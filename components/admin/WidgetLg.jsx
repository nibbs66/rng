import styles from "../../styles/admin/WidgetLg.module.css";
import {useEffect, useState} from "react";
import axios from "axios";



export default function WidgetLg() {
    const [orders, setOrders] = useState([]);
    useEffect(() =>{
        const getOrders = async  () => {
            try{
                const res = await axios.get("cart")
                setOrders((res.data))
            }catch(err){}
        }
        getOrders()
    },[]);

    const Button = ({ pending }) => {
        return <button className={styles.widgetLgButton + pending}>{pending}</button>;
    };
    return (
        <div className={styles.container}>
            <h3 className={styles.widgetLgTitle}>Latest transactions</h3>
            <table className={styles.widgetLgTable}>
                <tbody>
                <tr className={styles.widgetLgTr}>
                    <th className={styles.widgetLgTh}>Customer</th>
                    <th className={styles.widgetLgTh}>Date</th>
                    <th className={styles.widgetLgTh}>Type</th>
                    <th className={styles.widgetLgTh}>Amount</th>
                    <th className={styles.widgetLgTh}>Status</th>
                </tr>

                    <tr className={styles.widgetLgTr}>
                        <td className={styles.widgetLgUser} key={3}>
                            <span className={styles.widgetLgName}>555555</span>
                        </td>
                        <td className={styles.widgetLgDate}>3 march 2022</td>
                        <td className={styles.widgetLgAmount}>Rental</td>
                        <td className={styles.widgetLgAmount}>€200</td>
                        <td className={styles.widgetLgStatus}>
                            <button className={styles.widgetLgButtonDeclined}>Not Paid</button>
                        </td>
                    </tr>
                <tr className={styles.widgetLgTr}>
                    <td className={styles.widgetLgUser} key={6}>
                        <span className={styles.widgetLgName}>555555</span>
                    </td>
                    <td className={styles.widgetLgDate}>3 march 2022</td>
                    <td className={styles.widgetLgAmount}>Course</td>
                    <td className={styles.widgetLgAmount}>€200</td>
                    <td className={styles.widgetLgStatus}>
                        <button className={styles.widgetLgButtonDeclined}>Not Paid</button>
                    </td>
                </tr>
                <tr className={styles.widgetLgTr}>
                    <td className={styles.widgetLgUser} key={4}>
                        <span className={styles.widgetLgName}>555555</span>
                    </td>
                    <td className={styles.widgetLgDate}>3 march 2022</td>
                    <td className={styles.widgetLgAmount}>Sale</td>
                    <td className={styles.widgetLgAmount}>€200</td>
                    <td className={styles.widgetLgStatus}>
                        <button className={styles.widgetLgButton} style={{backgroundColor: "mediumturquoise"}}>Paid</button>
                    </td>
                </tr>
                <tr className={styles.widgetLgTr}>
                    <td className={styles.widgetLgUser} key={4}>
                        <span className={styles.widgetLgName}>555555</span>
                    </td>
                    <td className={styles.widgetLgDate}>3 march 2022</td>
                    <td className={styles.widgetLgAmount}>Service</td>
                    <td className={styles.widgetLgAmount}>€200</td>
                    <td className={styles.widgetLgStatus}>
                        <button className={styles.widgetLgButton} style={{backgroundColor: "mediumturquoise"}}>Paid</button>
                    </td>
                </tr>

                </tbody>

            </table>
        </div>
    );
}
