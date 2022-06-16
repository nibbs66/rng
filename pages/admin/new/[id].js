import styles from '../../../styles/admin/New.module.css'

import {useRouter} from "next/router";
import ProductInput from "../../../components/admin/ProductInput";
import axios from "axios";
//import NewSale from "../../../components/admin/NewSale";
//import NewUser from "../../../components/admin/NewUser";
import useToggle from "../../../components/hooks/useToggle";
//import Rental from "../../../components/admin/Rental";



const New = ({category,  agency}) => {

    const router = useRouter()
    const {id} = router.query
    const [success, setSuccess] = useToggle()
    const handleCreate =  async (data) => {
       console.log(data)
        try{
                const res = await axios.post(`/api/${id+'s'}`, data);
                console.log(res)
                    res.statusText && setSuccess(true)
        }catch(err){
            console.log(err)
        }
    }
    console.log(id)
    return (
        <div className={styles.container}>
            <div className={styles.newContainer}>
                {id==='product' && <ProductInput  id={id} handleCreate={handleCreate} category={category}
                />}
                {/* {id==='rental' && <Rental  id={id} handleCreate={handleCreate} category={category}
                />}
                {id === 'sale' &&
                    <NewSale/>}
                {id==='user' &&
                    <NewUser  id={id} agency={agency} handleCreate={handleCreate} success={success} setSuccess={setSuccess}/>}*/}

            </div>
        </div>
    );
};


export default New;
New.layout = "L2";

    export const getServerSideProps = async(ctx) => {
        const host = ctx.req.headers.host;
            const cat = await axios.get(`https://`+host+`/api/catMenu`);

            const cert = await axios.get(`https://`+host+`/api/agency`);
            return{
                props:{
                    category: cat.data,

                    agency: cert.data

                }
            }

    }
