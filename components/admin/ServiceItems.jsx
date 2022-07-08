import styles from '../../styles/admin/NewService.module.css'
import  {useState} from "react";
import axios from "axios";


const ServiceItems = () => {


    const [service, setService] = useState('')

    const [inputs, setInputs] = useState({});

    const [services, setServices] = useState([])


    const handleServices = (e) => {
        e.preventDefault()
        setServices(prev=>[...prev, service])
        setService('')
    };




    const handleChange = (e) => {

        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    };

    const handleClick = async (e) => {
        e.preventDefault()
        if(services.length > 0){
            try{
                const res = await axios.post(`/api/service`,
                    {...inputs, services}
                )
                console.log(res.data)
            }catch(err){
                console.log(err)
            }
        }else{
            try{
                const res = await axios.post(`/api/service`,
                    {...inputs}
                )

            }catch(err){
                console.log(err)
            }
        }



    }

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.title}>
                    <h1 className={styles.h1}>
                        Add Service Item
                    </h1>
                </div>
                <div className={styles.buttonContainer}>
                  <button className={styles.button} onClick={handleClick}>CREATE
                        NEW SERVICE ITEM</button>
                </div>

            </div>

            <div className={styles.bottom}>
                <div className={styles.left}>
                    <div className={styles.container}>

                    </div>


                    <div className={styles.list}>
                        <ul className={styles.ul}>
                            {inputs.serviceType?.length > 0 && <li  className={styles.li}><b>Service Category:</b> {inputs.serviceType}</li>}

                            {services?.length > 0 && (<li  className={styles.li}><b>Services:</b> {services.map((cat, ind)=>(
                                    <span key={ind}> {cat},</span>
                                ))}</li>
                            )}



                        </ul>
                    </div>
                </div>
                <div className={styles.right}>
                    <form className={styles.form}>
                        <div className={styles.formInput}>
                            <label className={styles.label}>
                                Description of Services
                            </label>
                            <textarea className={styles.textInput}
                                   type='text'
                                   name='desc'
                                      placeholder='**Only required for initial description of services on website**'
                                   onChange={handleChange}
                            />
                        </div>
                        <div className={styles.rightBottom}>
                            <div className={styles.formInput}>
                                <label className={styles.label}>
                                    Service Category
                                </label>
                                <input className={styles.input}
                                       type='text'
                                       name='serviceType'
                                       placeholder='Tanks'
                                       onChange={handleChange}
                                />
                            </div>
                            <div className={styles.formInput}>
                                <label className={styles.label}>
                                    Services
                                </label>
                                <input className={styles.input}
                                       type='text'
                                       name='services'
                                       value={service}
                                       placeholder='Tank Fill'
                                       onChange={(e) =>setService(e.target.value)}
                                />
                                <button className={styles.labelButton} onClick={handleServices}>Add Service</button>
                            </div>


                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ServiceItems;
