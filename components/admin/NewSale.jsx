import styles from '../../styles/admin/NewSale.module.css'

import React, {useState} from "react";

import Search from "../icons/Search";
import Money from "../icons/Money";
import Modal from "../Modal";
import useToggle from "../hooks/useToggle";
const NewSale = () => {
    const [showModal, setShowModal] = useToggle()
    const [criteria, setCriteria] = useState({})
    const [client, setClient] = useState('')
    const [newSale, setNewSale] = useToggle()
  console.log('from', criteria)
    return (
        <>
            <Modal newSale={newSale} setNewSale={setNewSale} showModal={showModal} setShowModal={setShowModal} title={'FindUser'} search={'search'} client={client} setClient={setClient} criteria={criteria} setCriteria={setCriteria}/>

        <div className={styles.container}>
            <div className={styles.top}>

                   <button className={styles.searchButton} onClick={()=> {
                       setShowModal()

                   }}>
                       Find Customer
                   </button>
               <button className={styles.button}>
                    <Money/>
                    Pay Now
                </button>
            </div>
            <div className={styles.wrapper}>
            <div className={styles.left}>
                <div className={styles.searchContainer}>
                    <span className={styles.span}>Search Products</span>
                    <div className={styles.search}>

                        <input className={styles.input} type="text" placeholder='Search...'/>
                        <Search/>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.rightTop}>
                    {newSale && <div className={styles.userContainer}>
                        <div className={styles.name}>
                          <span className={styles.title}>Naam: </span>
                            <span style={{marginRight: 5}}>{(client?.firstName+' '+client?.lastName)}</span>

                        </div>

                        <div className={styles.userName}>
                            <span className={styles.title}>Phone: </span>
                            <span>{client?.personal.phone}</span>
                        </div>
                        <div className={styles.userName}>
                            <span className={styles.title}>Email: </span>
                            <span>{client?.personal.email}</span>
                        </div>
                        <div className={styles.userName}>
                            <span className={styles.title}>Address: </span>
                            <span>{client?.address.address}</span>
                        </div>
                        <div className={styles.userName}>
                            <span className={styles.title}>City: </span>
                            <span>{client?.address.city}</span>
                        </div>
                        <div className={styles.userName}>
                            <span className={styles.title}>Postal Code: </span>
                            <span>{client?.address.postalCode}</span>
                        </div>

                    </div>}

                </div>
                <div className={styles.rightBottom}>
                    bottom
                    <h1>Total: €200.00</h1>
                    <button className={styles.button}>
                        <Money/>
                        Pay Now
                    </button>
                </div>
            </div>
            </div>
        </div>
        </>
    );
};

export default NewSale;
