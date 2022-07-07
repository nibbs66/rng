import styles from '../../../styles/admin/EditProduct.module.css'
import {useRouter} from "next/router";
import TableHeader from "../../../components/admin/TableHeader";
import  {useState} from "react";
import Image from "next/image";
import Chart2 from "../../../components/admin/Chart2";
import mask from '../../../public/img/WEB-Zensee-Pro-M1010S-QBA.jpg'
import axios from "axios";

import Upload from "../../../components/icons/Upload";
import AdminLayout from "../../../components/layouts/AdminLayout";
import React from "react";
const Product = ({product}) => {
    console.log(product)
    const router = useRouter()
    const {params} = router.query
    const [inputs, setInputs] = useState({})
    const handleChange = (e) => {
        const {name, value} = e.target
        if(name==='stock'){

            setInputs(prev=>{
                return {...prev, [name]: value}
            })
        }

    };
    const handleClick = (e) => {
        e.preventDefault()

        console.log(+inputs.stock + product.stock)
    }

    return (
    <div className={styles.container}>
        <TableHeader  title={product.name}  cat={'product'}/>
        <div className={styles.productTop}>
            <div className={styles.productTopLeft}>
                <div className={styles.productInfoLeft}>
                    <div className={styles.productImgContainer}>
                        {
                            product.img.length >=1 ?
                                <Image src={`/img/${product.img[0]}`} alt='' height={200} width={200} objectFit='contain'/> :
                                <Image src={mask} alt='' height={200} width={200} objectFit='contain'/>
                        }
                    </div>
                </div>
                <div className={styles.productInfoRight}>
                   <div className={styles.info}>
                       <h3>Manufacturer: </h3>
                       <span>{product.manufacturer}</span>
                   </div>
                    <div className={styles.info}>
                        <h3>Id: </h3>
                        <span>{product.modelId}</span>
                    </div>
                    <div className={styles.info}>
                        <h3>Category: </h3>
                        <span>{product.categories[0]}</span>
                    </div>
                    <div className={styles.info}>
                        <h3>YTD Sales: </h3>
                        <span>€2300.00</span>
                    </div>
                    <div className={styles.info}>
                        <h3>Price: </h3>
                        <span>{product.price.toFixed(2)}</span>
                    </div>
                    <div className={styles.info}>
                        <h3>Current Stock: </h3>
                        <span>{product.stock}</span>
                    </div>


                </div>
            </div>
            <div className={styles.productTopRight}>
            <Chart2/>
            </div>

        </div>
        <div className={styles.productBottom}>
            <form className={styles.productForm}>
                <div className={styles.productFormLeft}>
                   <label>Cost</label>  <input type="text" placeholder={product.cost.toFixed(2)}/>
                   <label>Price</label>  <input type="text" placeholder={product.price.toFixed(2)}/>
                   <label>Categories</label>  <input type="text" placeholder={product.categories[0]}/>
                   <label>Color</label>  <input type="text" placeholder={product.color[0] || 'Blue'}/>
                  <label>Size</label>   <input type="text" placeholder={product.size[0] || 'Large'}/>

                </div>
                <div className={styles.productFormCenter}>
                    <label htmlFor="textarea">Description</label>
                    <textarea/>
                    <label>Stock</label>   <input type="text" name='stock'  onChange={handleChange} placeholder={product.stock}/>

                    <label>Stock</label>   <input type="text"  placeholder={product.stock}/>
                    <label>Stock</label>   <input type="text"  placeholder={product.stock}/>

                </div>
                <div className={styles.productFormRight}>
                    <div className={styles.productUpload}>
                        <Image src={`/img/${product.img[0]}`} alt='' height={150} width={150} objectFit='contain' className={styles.productUploadImg}/>
                        <label htmlFor="file">
                            <Upload/>
                        </label>
                        <input type="file" id="file" style={{display: "none"}}/>
                    </div>
                    <button>Update Product</button>


                </div>
            </form>
        </div>
    </div>
    );
    };

    export default Product;
Product.getLayout = function getLayout(page){
    return(
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
export const getServerSideProps = async (ctx) =>{
    const host = ctx.req.headers.host;
    let id= ctx.params.params[1]

    const res = await axios.get(`https://`+host+`/api/products/${id}`);
    return{
        props:{
            product: res.data,

        }
    }
}
