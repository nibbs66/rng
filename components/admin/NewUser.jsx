import {useState, useEffect, useMemo} from 'react';
import styles from '../../styles/admin/NewUser.module.css'
import Image from "next/image";
import Upload from "../../components/icons/Upload";

import {useRouter} from "next/router";
import useToggle from "../../components/hooks/useToggle";
const initialUser = ['customer']
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import countryList from 'react-select-country-list'
import phone from 'phone'
import postalCodes from 'zipcodes-regex'
import useRegister from '../../pages/api/hooks/useRegister';
import axios from "axios";


const NewUser = ({ id, agency }) => {

    const options = useMemo(() => countryList().getData(), [])
    const router = useRouter()
    const {params} = router.query
    const [employee, setEmployee] = useToggle()
    const [message, setMessage] = useState('')
    const [checkUser, setCheckUser] = useState([])
    const [userType, setUserType] = useState(initialUser)
    const [birthday, setBirthday] = useState(true)
    const [section, setSection] = useState('')
    const [showPicture, setShowPicture] = useToggle()
    const [inputs, setInputs] = useState({});

    const [certification, setCertification] = useState({})

    const [levels, setLevels] = useState([])
    const [file, setFile] = useState(null)
    const [showLevels, setShowLevels] = useToggle()
    const [country, setCountry] = useState({country: ''})
    const [experience, setExperience] = useState([])
    const [levelSelector, setLevelSelector] = useState('')
    const [code, setCode] =useState(postalCodes.NL)
    const {user, isValidating} = useRegister()

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        username: yup.string()
            .required()
            .notOneOf([checkUser], 'Username has been taken.  Username must be unique.'),
        email: yup.string().email().required(),
        country: yup.string().required(),
        address: yup.string().required(),
        city: yup.string().required(),
        postalCode: yup.string().required()
            .matches({code}, 'Post Code does not match country format'),
        phone: yup.string().required('Please enter your phone number for home'),
        dob: yup.string().required('Please enter your date of birth'),
        password: yup.string()
            .required("Required")
            .min(8, "Must be 8 characters or more")
            .matches(/[a-z]+/, "One lowercase character")
            .matches(/[A-Z]+/, "One uppercase character")
            .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "One number"),
        certificationAgency: yup.string(),

        emergencyFirstName: yup.string().required(),
        emergencyLastName: yup.string().required(),
        emergencyEmail: yup.string().email().required(),
        emergencyPhone: yup.string().required('Please enter your phone number for emergency'),
        diverNumber: yup.string(),
        instructorNumber: yup.string(),
        position: yup.string(),
        hireDate: yup.string(),
        date: yup.string(),

    })
    const { register, handleSubmit,  formState: {errors}, reset, resetField } = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(()=>{
        const filteredName = () => {
            user?.map((name,idx)=>{
                setCheckUser(prev=> {return [...prev, name.personal.username.toLowerCase()]
                })

            })
        }
        filteredName()
    },[])



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
            setEmployee()
            setUserType(initialUser)
        }

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
        resetField('diverNumber')
        resetField('instructorNumber')
        resetField('certificationAgency')
        resetField('date')

    }
    const handleReset = () => {

        router.push('/admin/new/user')

    }
    if(isValidating){
        return null
    }
    const onSubmit = async(data) => {
        try {
            const res = await axios.post(`/api/users`,
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: data.password,
                    personal: {
                        phone: data.phone,
                        email: data.email,
                        username: data.username,
                        dob: data.dob,
                    },
                    address: {
                        address: data.address,
                        city: data.city,
                        postalCode: data.postalCode,
                        country: data.country
                    },
                    experience: experience,
                    emergencyContact: {
                        firstName: data.emergencyFirstName,
                        lastName: data.emergencyLastName,
                        email: data.emergencyEmail,
                        phone: data.emergencyPhone
                    },
                    employeeInfo: {
                        hireDate: data.hireDate,
                        position: data.position

                    },
                    userType,
                    isEmployee: employee
                });

            setMessage(res.data)
            if (res.statusText === 'Created') {
                reset()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (

        <form className={styles.container}  onSubmit={handleSubmit(onSubmit)}>
            {message.length > 0 && <h1 className={styles.success}>{inputs.firstName} {inputs.lastName} successfully Added!  Check email to validate account.</h1>}
            {message.length === 0 &&  <div className={styles.top}>
                <h1 className={styles.h1}>
                    Add User
                </h1>
            </div>}

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
                        {errors &&
                            <div className={styles.error}>
                                <p>{errors.firstName?.message}</p>
                                <p>{errors.lastName?.message}</p>
                                <p>{errors.username?.message}</p>
                                <p>{errors.email?.message}</p>
                                <p>{errors.password?.message}</p>
                                <p>{errors.confirmPassword?.message}</p>
                                <p>{errors.country?.message}</p>
                                <p>{errors.phone?.message}</p>
                                <p>{errors.address?.message}</p>
                                <p>{errors.city?.message}</p>
                                <p>{errors.state?.message}</p>
                                <p>{errors.postalCode?.message}</p>
                                <p>{errors.position?.message}</p>
                                <p>{errors.hireDate?.message}</p>
                                <p>{errors.emergencyFirstName?.message}</p>
                                <p>{errors.emergencyLastName?.message}</p>
                                <p>{errors.emergencyPhone?.message}</p>
                                <p>{errors.emergencyEmail?.message}</p>
                                <p>{errors.certificationAgency?.message}</p>
                                <p>{errors.date?.message}</p>
                                <p>{errors.diverNumber?.message}</p>
                                <p>{errors.instructorNumber?.message}</p>

                            </div>

                        }
                        <div>

                        </div>

                        <div className={styles.buttonContainer}>
                            {id && <button className={styles.button} type='submit'>CREATE
                                NEW {id.toUpperCase()}</button>}
                        </div>

                    </div>
                </div>
                 <div className={styles.right}>
                    <div  className={styles.form}  onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.rightTop}>

                            <div className={styles.name}>
                                <label className={styles.label}>Voornaam:</label>
                                <input className={styles.topInput} {...register("firstName")} placeholder="voornaam" onChange={handleChange}/>
                                <label className={styles.label}>Achternaam:</label>
                                <input className={styles.topInput} {...register("lastName")} placeholder="achternaam" onChange={handleChange}/>
                            </div>
                            <div className={styles.inputContainer}>
                                <label className={styles.label}>Temporary Password:</label>
                                <input className={styles.topInput} placeholder="password" type='password'{...register("password")}/>
                            </div>
                            <div className={styles.topInputContainer}>
                                <label className={styles.label}>Employee?</label>
                                <div className={styles.checkBox}>
                                    <label className={styles.label}>Ja</label>
                                    <input className={styles.topInput} type="checkbox" name='Ja'
                                           onChange={handleEmployee}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.infoContainer}>
                        <div className={styles.infoTitle} onClick={(e) => handleClick('Personal')}>
                            <span>Personal</span>
                            <div className={styles.iconContainer}>
                                {section !== 'Personal' ? '+' : '-'}
                            </div>
                        </div>
                        <div className={section === 'Personal' ? styles.infoActive : styles.info}>

                            <span className={styles.span}>
                                <b>Username:</b>    <input className={styles.topInput}  {...register("username")} placeholder="username" />
                            </span>
                            <span className={styles.span}>
                                <b>Country:</b>
                            <select className={styles.topInput} {...register("country")} onChange={(e) => {
                                setCountry(e.target.value)
                                setCode(postalCodes[e.target.value])
                            }}>
                            <option value="NL">NL</option>
                            <option value="DE">DE</option>
                            <option value="BE">BE</option>
                                {options.map((country, idx)=>(
                                    <option key={idx} value={country.value}>{country.value}</option>
                                ))}
                        </select>

                                </span>
                            <span className={styles.span}>
                                <b>Address:</b>   <input className={styles.topInput} {...register("address")} placeholder="address" type="text" />
                                </span>

                            <span className={styles.span}>
                                <b>City:</b>   <input className={styles.topInput} {...register("city")} placeholder="city" type="text" />
                                </span>
                            <span className={styles.span}>
                                <b>Postal Code:</b>   <input className={styles.topInput} {...register("postalCode")}  placeholder="postal code" type="text" />
                                </span>
                            <span className={styles.span}>
                                <b>Email:</b>   <input className={styles.topInput} placeholder="email" {...register("email")} />
                                </span>

                            <span className={styles.span}>
                                <b>Phone:</b>   <input className={styles.topInput} placeholder="phone" {...register("phone")} />
                                </span>

                            {birthday && <span className={styles.span}>
                                <b>Birthday:</b>   <input className={styles.topInput} {...register("dob")} type="date" />
                                </span>}


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
                            <select {...register("certificationAgency")}  onChange={handleCertification}
                                    className={styles.topInput}>
                               <option value=""></option>
                                {agency.map((group) => (
                                    <option key={group._id} value={group.name}>{group.name}</option>
                                ))}
                           </select>
                             </span>
                            <span className={styles.span}>
                            <b>Diver Number:</b>   <input className={styles.topInput} {...register("diverNumber")} placeholder="Diver Number" onChange={handleCertification}/>
                             </span>

                            <span className={styles.span}>
                                <b>Date:</b>   <input className={styles.topInput} {...register("date")} type="date" onChange={handleCertification}/>
                            </span>
                            <span className={styles.span}>
                                <b>Instructor:</b>   <input className={styles.topInput} {...register("instructorNumber")} placeholder="Instructor" onChange={handleCertification}/>
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
                                <b>Voornaam:</b>   <input className={styles.topInput} {...register("emergencyFirstName")} placeholder="voornaam" />
                            </span>
                            <span className={styles.span}>
                                <b>Achternaam:</b>   <input className={styles.topInput} {...register("emergencyLastName")} placeholder="achternaam" />
                            </span>
                            <span className={styles.span}>
                                <b>Email:</b>    <input className={styles.topInput} placeholder="email" {...register("emergencyEmail")} />
                                </span>

                            <span className={styles.span}>
                                <b>Phone:</b>  <input className={styles.topInput} placeholder="phone" {...register("emergencyPhone")} />
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
                                <b>Date of Hire:</b>   <input className={styles.topInput} {...register("hireDate")} type="date" />
                                </span>
                            <span className={styles.span}>
                                <b>Position:</b>   <input className={styles.topInput} placeholder="position" {...register("position")} />
                            </span>

                        </div>
                    </div>}

                </div>
            </div>
        </form>
    );
};

export default NewUser;
