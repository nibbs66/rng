import  {useEffect, useState} from 'react';
import dayjs from "dayjs";
import styles from '../../styles/admin/RecentCard.module.css'
const RecentCard = ({data, title,container}) => {
    const [total, setTotal] = useState(0)

    const month = dayjs().month()-1
    const date = new Date();
    const testMonth = new Date(date.setMonth((date.getMonth() - 1)));;
const today = dayjs().$d

        console.log(testMonth)

    useEffect(()=>{
     const sorted =  data?.filter(date=>dayjs(date.createdAt).$M<dayjs().month() && dayjs(date.createdAt).$M>=dayjs().month()-1)
        const sum = sorted?.reduce((totals, amount)=>{
            return totals + amount.total;
        }, 0)
        setTotal(sum)
    },[data])
    return (
        <div className={styles[container]}>

            <h3  className={styles.title}>{title}</h3>
           <span className={styles.span}>€{total?.toFixed(2) || (0).toFixed(2)}</span>
        </div>
    );
};

export default RecentCard;
