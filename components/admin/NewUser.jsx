import  {useState, useMemo} from 'react';
import styles from "../../styles/admin/NewUser.module.css";
import Image from "next/image";
import Upload from "../icons/Upload";
import {useRouter} from "next/router";
import Personal from "./user/Personal";
import useToggle from "../hooks/useToggle";
const initialUser = ['customer']
const NewUser = ({ id, handleCreate, agency, success,  setSuccess }) => {

    const router = useRouter()
    const {params} = router.query
    const [employee, setEmployee] = useToggle()
    const [userType, setUserType] = useState(initialUser)
    const [section, setSection] = useState('')
    const [showPicture, setShowPicture] = useToggle()
    const [inputs, setInputs] = useState({});
    const [emergency, setEmergency] = useState({});
    const [address, setAddress] = useState({});
    const [personal, setPersonal] = useState({})
    const [certification, setCertification] = useState({})
    const [hire, setHire] = useState({})
    const [levels, setLevels] = useState([])
    const [file, setFile] = useState(null)
    const [showLevels, setShowLevels] = useToggle()
    const [country, setCountry] = useState({country: ''})
    const [experience, setExperience] = useState([])
    const [levelSelector, setLevelSelector] = useState('')





    const handleClick = (data) => {
        if(section !==data){
            setSection(data)
        }else{
            setSection('')
        }
    }

    const handleLevel = (e, cert) => {

        const{checked}= e.target
        if(checked){
            setLevels(prev=>[...prev, cert])
        }if(!checked){
            setLevels(levels.filter((item, index)=>levels[index] !== cert))
        }


    };
    const handleEmployee = () => {

        if(!employee){
            setEmployee()
            setUserType(prev=>[...prev, 'employee'])
        }else if(employee){

            setUserType(initialUser)
        }

    };
    const handleEmergency = (e) => {

        setEmergency(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })

    };
    const handlePersonal = (e) => {

        setPersonal(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })

    };
    const handleHire = (e) => {

        setHire(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })

    };
    const handleCertification = (e) => {
        e.preventDefault()
        setCertification(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })

      if(certification?.certificationAgency){
          setLevelSelector(agency.filter((group)=>group.name ===certification.certificationAgency)[0].levels)

        }




    };
    const handleChange = (e) => {

        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })

    };
    const addExperience = () => {
        setExperience(prev=> [...prev, {...certification, certificationLevel: levels}])
        setShowLevels()

    }
    const handleReset = () => {
        setSuccess()
        setInputs({})
        setLevels([])
        setExperience([])
        setCertification({})
        setPersonal({})
        setEmergency({})
        setAddress({})
        setHire({})
        router.push('/admin/new/user')

    }

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h1 className={styles.h1}>
                    Add User
                </h1>
            </div>

            <div className={styles.bottom}>
            <div className={styles.left}>
                {showPicture ? <Image width={100} height={100} objectFit='cover'
                        className={styles.img}
                        src={ file
                            ? URL.createObjectURL(file)
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }


                        alt=""
                /> :  <div className={styles.avatarContainer}>
                    <div className={styles.avatar}>
                        <div className={styles.avatarText}>
                            {inputs.firstName?.length > 0 && <> {inputs.firstName[0].toUpperCase()}</> }
                            {inputs.lastName?.length > 0 && <>{inputs.lastName[0].toUpperCase()}</>}
                        </div>
                    </div>
                </div>}
                <div className={styles.imgInput}>

                    <label htmlFor="file" className={styles.iconContainer} onClick={()=>setShowPicture(true)}>
                        Upload Image: <Upload className={styles.icon} />
                    </label>
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none"}}
                    />

                    <div className={styles.buttonContainer}>
                        {id && <button className={styles.button} onClick={()=>handleCreate({
                            ...inputs,  personal, address: {...address, country: country.country}, experience: experience, emergencyContact: emergency, employeeInfo: hire, userType, isEmployee: employee

                        })}>CREATE
                            NEW {id.toUpperCase()}</button>}
                    </div>

                </div>
                <div className={styles.list}>
                    <ul className={styles.ul}>
                        {inputs.firstName?.length > 0 && <li  className={styles.li}><h3>Personal</h3></li>}
                        {inputs.firstName?.length > 0 && <li  className={styles.li}><b>Voornaam:</b> {inputs.firstName}</li>}
                        {inputs.lastName?.length > 0 && <li  className={styles.li}><b>Achternaam:</b> {inputs.lastName}</li>}
                        {personal.username?.length > 0 && <li  className={styles.li}><b>Username:</b> {personal.username}</li>}
                        {address.address?.length > 0 && <li  className={styles.li}><b>Address:</b> {address.address}</li>}
                        {address.city?.length > 0 && <li  className={styles.li}><b>City:</b> {address.city}</li>}
                        {address.postalCode?.length > 0 && <li  className={styles.li}><b>Postal Code:</b> {address.postalCode}</li>}
                        {country.country?.length > 0 && <li  className={styles.li}><b>Country:</b> {country.country}</li>}
                        {personal.email?.length > 0 && <li  className={styles.li}><b>Email:</b> {personal.email}</li>}
                        {personal.phone?.length > 0 && <li  className={styles.li}><b>Phone:</b> {personal.phone}</li>}
                        {personal.dob?.length > 0 && <li  className={styles.li}><b>DOB:</b> {personal.dob}</li>}
                        {experience?.length > 0 && <li  className={styles.li}><h3>Certifications</h3> </li>}
                        {experience?.length > 0 && experience?.map((agency, idx) => (
                            <li className={styles.li} key={agency.idx}><b>Cert Added:</b> {agency.certificationAgency}</li>
                        ))
                        }
                        {emergency.firstName?.length > 0 && <li  className={styles.li}><h3>Emergency Contact</h3></li>}
                        {emergency.firstName?.length > 0 && <li  className={styles.li}><b>Voornaam:</b> {emergency.firstName}</li>}
                        {emergency.lastName?.length > 0 && <li  className={styles.li}><b>Achternaam:</b> {emergency.lastName}</li>}
                        {emergency.email?.length > 0 && <li  className={styles.li}><b>Email:</b> {emergency.email}</li>}
                        {emergency.phone?.length > 0 && <li  className={styles.li}><b>Phone:</b> {emergency.phone}</li>}
                        {employee && <li  className={styles.li}><h3>Employee</h3></li>}
                        {hire.hireDate?.length > 0 && <li  className={styles.li}><b>Hire Date:</b> {hire.hireDate}</li>}
                        {hire.position?.length > 0 && <li  className={styles.li}><b>Position:</b> {hire.position}</li>}



                    </ul>
                </div>
            </div>
                {!success && <div className={styles.right}>
                    <form action="" className={styles.form}>
                        <div className={styles.rightTop}>

                            <div className={styles.name}>
                                <label className={styles.label}>Voornaam:</label>
                                <input className={styles.topInput} type="text" name='firstName' placeholder='voornaam'
                                       onChange={handleChange}/>
                                <label className={styles.label}>Achternaam:</label>
                                <input className={styles.topInput} type="text" name='lastName' placeholder='achternaam'
                                       onChange={handleChange}/>
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.label}>Temporary Password:</label>
                                <input className={styles.topInput} type="password" name="password"
                                       placeholder='password...' onChange={handleChange}/>
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.label}>Employee?</label>
                                <div className={styles.checkBox}>
                                    <label className={styles.label}>Ja</label>
                                    <input className={styles.topInput} type="checkbox" name='Ja'
                                           onChange={handleEmployee}/>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className={styles.infoContainer}>
                        <div className={styles.infoTitle} onClick={(e) => handleClick('Personal')}>
                            <span>Personal</span>
                            <div className={styles.iconContainer}>
                                {section !== 'Personal' ? '+' : '-'}
                            </div>
                        </div>
                        <div className={section === 'Personal' ? styles.infoActive : styles.info}>

                            <Personal setPersonal={setPersonal} setCountry={setCountry} country={country}
                                      setAddress={setAddress}/>

                        </div>
                    </div>


                    <div className={styles.infoContainer}>
                        <div className={styles.infoTitle} onClick={(e) => handleClick('Cert')}>
                            Certifications
                            <div className={styles.iconContainer}>
                                {section !== 'Cert' ? '+' : '-'}
                            </div>
                        </div>
                        <div className={section === 'Cert' ? styles.infoActive : styles.info}>
                         <span className={styles.span}>
                            <b>Agency:</b>
                            <select name="certificationAgency" required onChange={handleCertification}
                                    className={styles.topInput}>
                               <option value=""></option>
                                {agency.map((group) => (
                                    <option key={group._id} value={group.name}>{group.name}</option>
                                ))}
                           </select>
                             </span>
                            <span className={styles.span}>
                            <b>Diver Number:</b>   <input className={styles.topInput} name='diverNumber' type='text'
                                                          placeholder='diver number...' onChange={handleCertification}/>
                             </span>

                            <span className={styles.span}>
                                <b>Date:</b>   <input className={styles.topInput} name='date' type='date'
                                                      onChange={handleCertification}/>
                            </span>
                            <span className={styles.span}>
                                <b>Instructor:</b>   <input className={styles.topInput} name='instructorNumber'
                                                            type='text' placeholder='instructor...'
                                                            onChange={handleCertification}/>
                            </span>
                            <div className={styles.certTitle} onClick={() => (setShowLevels())}>
                                Certification Levels
                                <div className={styles.certContainer}>
                                    {showLevels ? '+' : '-'}
                                </div>
                            </div>
                            {!showLevels && <span className={styles.span}>
                               <div className={styles.addContainer}>
                                    <b>Level:</b>
                            <button className={styles.addButton} onClick={addExperience}>
                                ADD +
                            </button>
                               </div>


                            <div className={styles.levels}>
                          {levelSelector && levelSelector.map((cert, idx) => (

                              <div key={idx}>
                                  <input
                                      onChange={(e) => handleLevel(e, cert)}
                                      type="checkbox"
                                      id={cert[idx]}
                                      name={cert[idx]}
                                      value={cert[idx]}
                                      className={styles.topInput}

                                  />
                                  <label htmlFor="double" className={styles.level}>{cert}</label>
                              </div>


                          ))}
                            </div>
                        </span>}

                        </div>
                    </div>

                    <div className={styles.infoContainer}>
                        <div className={styles.infoTitle} onClick={(e) => handleClick('Emergency')}>
                            Emergency
                            <div className={styles.iconContainer}>
                                {section !== 'Emergency' ? '+' : '-'}
                            </div>
                        </div>
                        <div className={section === 'Emergency' ? styles.infoActive : styles.info}>
                        <span className={styles.span}>
                                <b>Voornaam:</b>   <input className={styles.topInput} name='firstName' type='text'
                                                          placeholder='voornaam...' onChange={handleEmergency}/>
                            </span>
                            <span className={styles.span}>
                                <b>Achternaam:</b>   <input className={styles.topInput} name='lastName' type='text'
                                                            placeholder='achternaam...' onChange={handleEmergency}/>
                            </span>
                            <span className={styles.span}>
                                <b>Email:</b>   <input className={styles.topInput} name='email' type='text'
                                                       placeholder='email...' onChange={handleEmergency}/>
                                </span>

                            <span className={styles.span}>
                                <b>Phone:</b>   <input className={styles.topInput} name='phone' type='text'
                                                       placeholder='phone...' onChange={handleEmergency}/>
                                </span>
                        </div>
                    </div>
                    {employee && <div className={styles.infoContainer}>
                        <div className={styles.infoTitle} onClick={(e) => handleClick('Work')}>
                            Work
                            <div className={styles.iconContainer}>
                                {section !== 'Work' ? '+' : '-'}
                            </div>
                        </div>
                        <div className={section === 'Work' ? styles.infoActive : styles.info}>
                           <span className={styles.span}>
                                <b>Date of Hire:</b>   <input className={styles.topInput} name='hireDate' type='date'
                                                              placeholder='Date of Hire...' onChange={handleHire}/>
                                </span>
                            <span className={styles.span}>
                                <b>Position:</b>   <input className={styles.topInput} name='position' type='text'
                                                          placeholder='position...' onChange={handleHire}/>
                            </span>

                        </div>
                    </div>}

                </div>}
                {success && <div className={styles.success}>
                    <h1>
                        {inputs.firstName} {inputs.lastName} successfully Added!
                    </h1>
                    <button onClick={handleReset}>
                        Add New User
                    </button>
                </div>}
        </div>
        </div>
    );
};

export default NewUser;
