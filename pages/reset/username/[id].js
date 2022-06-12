import {useState} from 'react';
import {useRouter} from "next/router";
import styles from "../../../styles/website/Login.module.css";
import useToggle from "../../../components/hooks/useToggle";
import axios from "axios";
import MainLayout from "../../../components/layouts/MainLayout";


const ResetUsername = () => {
    const [inputs, setInputs] = useState('')
    const [error, setError] = useToggle()
    const [reset, setReset] = useState('')
    const router = useRouter()
    const {id} = router.query
    const handleClick = async(e) => {
        e.preventDefault()


            try{
                const res = await axios.put(process.env.NEXT_PUBLIC_VERCEL_URL+`/api/users/${id}`,
                    {username: inputs}
                )
                setReset(res.data)
            }catch(err){
               setError()
            }

    }

    return (
        <div className={styles.resetContainer}>
            {reset.length >=1 && <h1 className={styles.title}>Username Successfully Reset!! You Can Now Login!!</h1>}
            {reset.length === 0 && <div className={styles.wrapper}>

                <h1 className={styles.resetTitle}>Please Enter Your New Username:</h1>
                <form className={styles.form}>


                    <input className={styles.input} placeholder="new username" type="text" name='username'
                           onChange={(e) => setInputs(e.target.value
                           )}/>

                    {error && <span className={styles.error}>Username already in Use. Please choose another.</span>}
                    <button className={styles.button} onClick={handleClick}>SUBMIT</button>
                    <div className={styles.options}>


                    </div>
                </form>
            </div>}
        </div>
    );
};

export default ResetUsername;
ResetUsername.getLayout = function getLayout(page){
    return(
        <MainLayout>
            {page}
        </MainLayout>
    )
}
