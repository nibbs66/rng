import React, {useState} from 'react';
import styles from '../../styles/website/Activate.module.css'
import {useRouter} from "next/router";
import Modal from "../../components/Modal";
import useToggle from "../../components/hooks/useToggle";
import MainLayout from "../../components/layouts/MainLayout";




const Activate = () => {
    const [message, setMessage] = useState('')
    const [showModal, setShowModal] = useToggle()
    const router = useRouter()
    const {id} = router.query
    const handleClick = () => {
        setShowModal();
    }


    return (
        <div className={styles.container}>
            <Modal showModal={showModal} setShowModal={setShowModal} location={'home'} title={'Login'}/>
            <div>
               <h2 className={styles.title}> Your Account Is Active.  You Can Now Login.</h2>
            </div>
            <div>
                <button className={styles.button} onClick={handleClick}>LOGIN</button>
            </div>

        </div>
    );
};

    export default Activate;
Activate.getLayout = function getLayout(page){
    return(
        <MainLayout>
            {page}
        </MainLayout>
    )
}


