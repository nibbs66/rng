import React, {useState, useEffect} from 'react';
import styles from '../../../styles/admin/Person.module.css'
import {useRouter} from "next/router";
import {userColumns, historyColumns} from "../../../chartData";
import Check from "../../../components/icons/Check";
import Edit from "../../../components/icons/Edit";
import dayjs from "dayjs";
import axios from "axios";
import DataTable from "../../../components/admin/DataTable";
import AdminLayout from "../../../components/layouts/AdminLayout";
import RecentCard from "../../../components/admin/RecentCard";


const  Person = ({user, orders}) => {
    const router = useRouter()
    const {params} = router.query
    const [active, setActive] = useState(true)
    const [data, setData] = useState([])
    const [dive, setDive] = useState('')
    const [activeSince, setActiveSince] = useState('')

    const [section, setSection] = useState('Personal')
    const [editInput, setEditInput] = useState('')
    const [diving, setDiving] = useState([]);




    useEffect(()=>{

        const getData = () => {
           user.experience.map((cert)=>{

             setDiving((prev)=>[...prev, {
                   id: cert._id,
                   number:  cert.diverNumber,
                   date: dayjs(user.experience.date).format('DD MMM YYYY'),
                   agency: cert.certificationAgency,
                   instructor: cert.instructorNumber,
                   level:  cert.certificationLevel[0]
               }])
           })

        }
        getData()
    },[user, dive])
    useEffect(()=>{
        setData([])
        orders.map((option)=>{

                setData( (prev)=>[...prev, {
                    date: dayjs(option.createdAt).format('DD MMM YYYY'),
                    id: `${option._id.slice(0, 5)}...`,
                    quantity: option.items.length,
                    amount: `€${option.total.toFixed(2)}`,
                }])



        })
    },[orders])

    const handleClick = (data) => {
       if(section !==data){
           setSection(data)
       }else{
           setSection('')
       }
    }
    const handleEdit = () =>{
        setActive(false)
    }


    return (
        <div className={styles.container}>
            <div className={styles.top}>

              <h1>{user.firstName} {user.lastName}</h1>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                  <div className={styles.avatarContainer}>
                      <div className={styles.avatar}>
                          <div className={styles.avatarText}>
                              {user?.firstName[0].toUpperCase()}
                              {user?.lastName[0].toUpperCase()}
                          </div>
                      </div>
                  </div>
                    <div className={styles.lowerContainer}>
                        <h3>Active Since: {dayjs(user.createdAt).format('DD MMM YYYY')}</h3>
                        <h3>Dive Number: {user.experience[0]?.diverNumber}</h3>
                      <div className={styles.activityContainer}>
                          <h3>Recent Activity</h3>
                          <div className={styles.activities}>
                              <span className={styles.activity}>
                             <RecentCard data={orders} title={'Winkel'} container={'container1'}/>

                              </span>
                              <span className={styles.activity}>
                              <RecentCard data={orders} title={'Huur'} container={'container4'}/>

                              </span>
                              <span className={styles.activity}>
                              <RecentCard data={orders} title={'Cursus'} container={'container3'}/>

                              </span>
                              <span className={styles.activity}>
                              <RecentCard  title={'Service'} container={'container2'}/>

                              </span>


                          </div>
                      </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.infoContainer}>
                        <div className={styles.infoTitle}  onClick={(e)=>handleClick('Personal')}>
                            <span>Personal</span>
                            <div className={styles.iconContainer}>
                                {section !== 'Personal' ? '+' : '-'}
                            </div>
                        </div>
                       <div className={section === 'Personal' ? styles.infoActive : styles.info}>

                              <div className={styles.containerItem}>
                                  <div>
                                    <span className={styles.span}>
                                        <b>Username:</b>
                                    </span>
                                  <span className={styles.span}>{user.personal.username}
                            </span>
                                  </div>
                                  <span onClick={()=>setEditInput('username')}><Edit/></span>
                              </div>
                           <div  className={editInput === 'username' ? styles.live : styles.notLive}>
                               <span className={styles.span}><input  type="text" placeholder='new username...'/></span><span className={styles.check}><Check/></span>
                           </div>
                            <hr className={styles.hr}/>
                           <div className={styles.containerItem}>
                               <div>
                            <span className={styles.span}><b>Street:</b></span>
                                   <span className={styles.span}>  {user.address.address}</span>
                               </div>
                               <span onClick={()=>setEditInput('address')}><Edit/></span>
                           </div>
                           <div  className={editInput === 'address' ? styles.live : styles.notLive}>
                               <span className={styles.span}><input  type="text" placeholder='new address...'/></span><span className={styles.check}><Check/></span>
                           </div>
                           <hr className={styles.hr}/>
                           <div className={styles.containerItem}>
                               <div>
                            <span className={styles.span}>
                                <b>Address:</b> </span>
                                 <span className={styles.span}>{user.address.city} {user.address.postalCode}
                                </span>
                               </div>
                               <span onClick={()=>setEditInput('city')}><Edit/></span>
                           </div>
                           <div  className={editInput === 'city' ? styles.live : styles.notLive}>
                               <span className={styles.span}><input  type="text" placeholder='new city...'/></span><span className={styles.check}><Check/></span>
                               <span className={styles.span}><input  type="text" placeholder='new postal code...'/></span><span className={styles.check}><Check/></span>
                           </div>
                           <hr className={styles.hr}/>
                            <span className={styles.span}>
                                <b>Country:</b> {user.address.country}
                                </span>

                            <span className={styles.span}>
                                <b>Email:</b> {user.personal.email}
                                </span>
                            <span className={styles.span}>
                                <b>Phone:</b> {user.personal.phone}
                                </span>
                            <span className={styles.span}>
                                <b>Birthday:</b> {dayjs(user.personal.dob).format('DD MMM YYYY')}
                                </span>
                            <span className={styles.span}>
                                <button className={styles.editButton} onClick={handleEdit}>Edit</button>
                            </span>
                       </div>
                    </div>


                    <div className={styles.infoContainer}>
                        <div className={styles.infoTitle}  onClick={(e)=>handleClick('Cert')}>
                            Certifications
                            <div className={styles.iconContainer}>
                                {section !== 'Cert' ? '+' : '-'}
                            </div>
                        </div>
                        <div className={section === 'Cert' ?  styles.certActive: styles.info}>
                           <span className={styles.span}>{user.experience.instructor}</span>
                                <DataTable rows={diving}  columns={userColumns} pageOption={[5]} pageSize={5}  height={'30vh'}/>

                        </div>
                    </div>

                    <div className={styles.infoContainer}>
                        <div className={styles.infoTitle}  onClick={(e)=>handleClick('Emergency')}>
                            Emergency
                            <div className={styles.iconContainer}>
                                {section !== 'Emergency' ? '+' : '-'}
                            </div>
                        </div>
                        <div className={section === 'Emergency' ?  styles.infoActive: styles.info}>
                            <div className={styles.containerItem}>
                                <div>
                                    <span className={styles.span}>
                                        <b>Voornaam:</b>
                                    </span>
                                    <span className={styles.span}>{user.emergencyContact.firstName}
                            </span>
                                </div>
                                <span onClick={()=>setEditInput('firstName')}><Edit/></span>
                            </div>
                            <div  className={editInput === 'firstName' ? styles.live : styles.notLive}>
                                <span className={styles.span}><input  type="text" placeholder='new username...'/></span><span className={styles.check}><Check/></span>
                            </div>
                            <hr className={styles.hr}/>
                            <div className={styles.containerItem}>
                                <div>
                                    <span className={styles.span}>
                                        <b>Achternaam:</b>
                                    </span>
                                    <span className={styles.span}>{user.emergencyContact.lastName}
                            </span>
                                </div>
                                <span onClick={()=>setEditInput('lastName')}><Edit/></span>
                            </div>
                            <div  className={editInput === 'lastName' ? styles.live : styles.notLive}>
                                <span className={styles.span}><input  type="text" placeholder='new username...'/></span><span className={styles.check}><Check/></span>
                            </div>
                            <hr className={styles.hr}/>
                            <div className={styles.containerItem}>
                                <div>
                                    <span className={styles.span}>
                                        <b>Email:</b>
                                    </span>
                                    <span className={styles.span}>{user.emergencyContact.email}
                            </span>
                                </div>
                                <span onClick={()=>setEditInput('email')}><Edit/></span>
                            </div>
                            <div  className={editInput === 'email' ? styles.live : styles.notLive}>
                                <span className={styles.span}><input  type="text" placeholder='new username...'/></span><span className={styles.check}><Check/></span>
                            </div>
                            <hr className={styles.hr}/>
                            <div className={styles.containerItem}>
                                <div>
                                    <span className={styles.span}>
                                        <b>Phone:</b>
                                    </span>
                                    <span className={styles.span}>{user.emergencyContact.phone}
                            </span>
                                </div>
                                <span onClick={()=>setEditInput('Phone')}><Edit/></span>
                            </div>
                            <div  className={editInput === 'Phone' ? styles.live : styles.notLive}>
                                <span className={styles.span}><input  type="text" placeholder='new username...'/></span><span className={styles.check}><Check/></span>
                            </div>
                            <hr className={styles.hr}/>
                        </div>
                    </div>
                    <div className={styles.infoContainer}>
                        <div className={styles.infoTitle} onClick={(e) => handleClick('History')}>
                            History
                            <div className={styles.iconContainer}>
                                {section !== 'History' ? '+' : '-'}
                            </div>
                        </div>
                        <div className={section === 'History' ? styles.certActive : styles.info}>
                            <DataTable rows={data} cat={'order'} columns={historyColumns} pageOption={[5]} pageSize={5}/>

                        </div>
                    </div>
                    {user.isEmployee && <div className={styles.infoContainer}>
                        <div className={styles.infoTitle} onClick={(e) => handleClick('Work')}>
                            Work
                            <div className={styles.iconContainer}>
                                {section !== 'Work' ? '+' : '-'}
                            </div>
                        </div>
                        <div className={section === 'Work' ? styles.infoActive : styles.info}>
                            <div className={styles.containerItem}>
                                <div>
                                    <span className={styles.span}>
                                        <b>Hire Date:</b>
                                    </span>
                                    <span className={styles.span}>{dayjs(user.employeeInfo.hireDate).format('DD MMM YYYY')}
                            </span>
                                </div>
                                <span onClick={()=>setEditInput('work')}><Edit/></span>
                            </div>
                            <div  className={editInput === 'work' ? styles.live : styles.notLive}>
                                <span className={styles.span}><input  type="text" placeholder='End Date...'/></span><span className={styles.check}><Check/></span>
                            </div>
                            <hr className={styles.hr}/>
                            <div className={styles.containerItem}>
                                <div>
                                    <span className={styles.span}>
                                        <b>Position:</b>
                                    </span>
                                    <span className={styles.span}>{user.employeeInfo.position}
                            </span>
                                </div>
                                <span onClick={()=>setEditInput('work')}><Edit/></span>
                            </div>
                            <div  className={editInput === 'work' ? styles.live : styles.notLive}>
                                <span className={styles.span}><input  type="text" placeholder='new position...'/></span><span className={styles.check}><Check/></span>
                            </div>
                            <hr className={styles.hr}/>
                        </div>
                    </div>}



                </div>

            </div>

        </div>
    );
};

export default Person;

Person.getLayout = function getLayout(page){
    return(
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
export const getServerSideProps = async (ctx) =>{
    const host = ctx.req.headers.host;
    let id= ctx.params.params[1]
    const res = await axios.get(`https://`+host+`/api/users/${id}`);
   const order = await axios.get(`https://`+host+`/api/orders?id=${id}`)
    return{
        props:{
            user: res.data,
            orders: order.data

        }
    }
};
