import React from 'react';
import styles from "../../styles/admin/Maintenance.module.css";
import Image from "next/image";

import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import app from "../../lib/firebase";
import axios from "axios";
import Upload from "../icons/Upload";

const UploadImage = ({file, setFile, img, setImg, inputs, setInputs}) => {
    const handleClick = async (e) =>{
        e.preventDefault()

        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName)


        const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log(typeof(downloadURL))
                    setImg(downloadURL)
                    try{
                        const res = await axios.post('http://localhost:3000/api/images', {
                            pic: {
                                img: downloadURL,
                                category: inputs.category,
                                link: inputs.link
                            }
                        })
                        console.log(res.data)
                    }catch(err){
                        console.log(err)
                    }
                });
            }
        );
    }
    const handleChange = (e) => {

        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Image width={100} height={100} objectFit='cover'
                       className={styles.img}
                       src={
                    file.length !== 0
                           ? URL.createObjectURL(file)

                         :  "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                       }
                       alt=""
                />
                <div className={styles.imgInput}>

                    <label htmlFor="file" className={styles.iconContainer}>
                        Upload Image: <Upload className={styles.icon} />
                    </label>
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile( e.target.files[0])}
                        style={{ display: "none"}}
                    />
                    <input type="text" name="category" placeholder="category" id="" onChange={handleChange}/>
                    <input type="text" name="link"  placeholder="link" id=""   onChange={handleChange}/>

                </div>
                <button onClick={handleClick}>Submit</button>
            </div>
        </div>
    );
};

export default UploadImage;
