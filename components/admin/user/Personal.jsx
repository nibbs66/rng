import React, {useState, useMemo} from 'react';
import styles from "../../../styles/admin/NewUser.module.css";

import countryList from 'react-select-country-list'

const Personal = ({setPersonal, setCountry, country, setAddress}) => {
    const options = useMemo(() => countryList().getData(), [])
    const [birthday, setBirthday] = useState(true)
    const handlePersonal = (e) => {
        setPersonal(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    };

    const selectCountry = (val) => {
        setCountry({country: val})
    };

    const handleAddress = (e) => {
        setAddress(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    };

    return (
        <>
              <span className={styles.span}>
                                <b>Username:</b>   <input  className={styles.topInput} name='username' type='text' placeholder='username...' onChange={handlePersonal}/>
                            </span>
            <span className={styles.span}>
                                <b>Country:</b>
                            <select className={styles.input}  onChange={(e) => {
                                setCountry(e.target.value)}}>
                            <option value="NL">NL</option>
                            <option value="DE">DE</option>
                            <option value="BE">BE</option>
                                {options.map((country, idx)=>(
                                    <option key={idx} value={country.value}>{country.value}</option>
                                ))}
                        </select>
                                </span>
            <span className={styles.span}>
                                <b>Address:</b>  <input  className={styles.topInput} name='address' type='text' placeholder='address...' onChange={handleAddress}/>
                                </span>

            <span className={styles.span}>
                                <b>City:</b>   <input  className={styles.topInput} name='city' type='text' placeholder='city...' onChange={handleAddress}/>
                                </span>
            <span className={styles.span}>
                                <b>Postal Code:</b>   <input  className={styles.topInput} name='postalCode' type='text' placeholder='post code...' onChange={handleAddress}/>
                                </span>
            <span className={styles.span}>
                                <b>Email:</b>   <input  className={styles.topInput} name='email' type='text' placeholder='email...' onChange={handlePersonal}/>
                                </span>

            <span className={styles.span}>
                                <b>Phone:</b>   <input  className={styles.topInput} name='phone' type='text' placeholder='phone...' onChange={handlePersonal}/>
                                </span>

            {birthday && <span className={styles.span}>
                                <b>Birthday:</b>   <input className={styles.topInput} name='dob' type='date'
                                                          placeholder='Date of Birth...' onChange={handlePersonal}/>
                                </span>}

        </>
    );
};

export default Personal;
