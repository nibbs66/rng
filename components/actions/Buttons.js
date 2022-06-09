
import styles from "../../styles/website/ProductPage.module.css";

import React, {useEffect} from "react";

import useToggle from "../hooks/useToggle";
import Heart from "../icons/Heart";
import useUser from "../../pages/api/hooks/useUser";
import {useSession} from "next-auth/react";


export const FavoriteButton = ({dispatch, product, quantity, favs, favoriteCart}) => {
    const {data: session, status} = useSession()
    const {favorites, mutate, isValidating} = useUser()
   const handleSave =  async() => {
       if(status === 'unauthenticated'){
              return null;
          }
          if(status==='authenticated' && !favorites){
              console.log('first')
              try{
                  const res = await axios.post(`/api/favorite`,
                      {
                          userId: session.id,
                          items: product

                      })
                   mutate(`/api/favorite`)
                  console.log('res at api', res.data)
              }catch(err){
                  console.log(err)
              }

          }else if(status==='authenticated' && favorites.items.length > 0) {
              const dupSearch = await favorites.items.filter((favorite) => favorite._id === product._id)
            console.log(dupSearch.length)
             if (dupSearch.length === 0) {
                try {
                     const res = await axios.put(`http://localhost:3000/api/favorite?favorite=${session.id}`,
                         {save: product},
                     )
                    mutate(`/api/favorite`)
                     console.log('res at api', res.data)


                 } catch (err) {
                     console.log(err)
                 }
             }

          }

    };
  const clearFavorite = async () => {
     dispatch(
            removeFavorite( {id: product._id, quantity})
        )

       await editFavorites(dispatch, product, session, favs, favoriteCart, {deleteId: product._id})
    };


    return(
        <div>
            {favorites ? (
                favorites.items?.filter((favorite) => favorite._id === product._id).length === 0 ?
                    <button className={styles.favoriteButton} onClick={handleSave}>
                        <span className={styles.favoriteSpan}>Save for Later</span>
                        <div className={styles.big}>
                            <Heart sx={{color: "red", fontSize: 30}}/>
                        </div>
                        <div className={styles.small}>
                            <Heart sx={{color: "red", fontSize: 20}}/>
                        </div>
                    </button> :
                    <button className={styles.savedButton} onClick={clearFavorite}>
                        <span className={styles.favoriteSpan}>Saved</span>
                        <div className={styles.big}>
                            <Heart sx={{color: "white", fontSize: 30}}/>
                        </div>
                        <div className={styles.small}>
                            <Heart sx={{color: "white", fontSize: 20}}/>
                        </div>
                    </button>
            ) :  <button className={styles.favoriteButton} onClick={handleSave}>
                <span className={styles.favoriteSpan}>Save for Later</span>
                <div className={styles.big}>
                    <Heart sx={{color: "red", fontSize: 30}}/>
                </div>
                <div className={styles.small}>
                    <Heart sx={{color: "red", fontSize: 20}}/>
                </div>
            </button>
            }
        </div>
    )
}


export const AddToCart = ({setQuantity, quantity, setTitle, handleClick, max}) => {
    const [disabled, setDisabled] = useToggle()
useEffect(()=>{
    if(max === 0){
        setDisabled()
    }
},[max, setDisabled])
console.log(max)
    return(

            <div className={styles.orderContainer}>
                <input  onChange={(e)=>setQuantity(e.target.value)} type="number" defaultValue={quantity} min='1' max={max} className={styles.quantity}/>
                <button disabled={disabled} className={styles.button} onClick={()=> {
                    setTitle('Cart'),
                        handleClick('Cart')
                }}>Add to Cart</button>
            </div>

    )
}
