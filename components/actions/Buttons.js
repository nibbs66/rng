
import styles from "../../styles/website/ProductPage.module.css";

import React, {useEffect} from "react";

import useToggle from "../hooks/useToggle";
import Heart from "../icons/Heart";
import useUser from "../../pages/api/hooks/useUser";
import {useSession} from "next-auth/react";
import axios from "axios";


export const FavoriteButton = ({ product}) => {
    const {data: session, status} = useSession()
    const {favorites, mutateFavorite, isValidating} = useUser()
    console.log(favorites)
    const handleSave =  async() => {
       if(status === 'unauthenticated'){
              return null;
          }
          if(status==='authenticated' && !favorites){

              try{
                  const res = await axios.post(`/api/favorite`,
                      {
                          userId: session.id,
                          items: product

                      })
                  mutateFavorite()

              }catch(err){
                  console.log(err)
              }

          }else if(status==='authenticated' && favorites.items.length > 0) {
              const dupSearch = await favorites.items.filter((favorite) => favorite._id === product._id)

             if (dupSearch.length === 0) {
                try {
                     const res = await axios.put(`/api/favorite/${favorite._id}`,
                         {save: product},
                     )
                    mutateFavorite()



                 } catch (err) {

                 }
             }

          }

    };
  const clearFavorite = async () => {
      if (favorites?.items?.length === 1){
          try{
              const res = await axios.delete(`/api/favorite/${favorites._id}`)
              mutateFavorite()
          }catch (err) {
              console.log(err)
          }
      }else{
          try{
              const res = await axios.put(`/api/favorite/${favorites._id}`,
                  {remove: product._id},
              )
              mutateFavorite()
          }catch (err) {
              console.log(err)
          }

      }

  }

   if(isValidating){
       return null
   }


    return(
        <div>
            {favorites ? (
                favorites.items?.filter((favorite) => favorite._id === product._id).length === 0 ?
                    <button className={styles.favoriteButton} onClick={handleSave}>
                        <span className={styles.favoriteSpan}>Save for Later</span>
                        <div className={styles.big}>
                            <Heart color={'red'}/>
                        </div>
                        <div className={styles.small}>
                            <Heart color={'red'}/>
                        </div>
                    </button> :
                    <button className={styles.savedButton} onClick={clearFavorite}>
                        <span className={styles.favoriteSpan}>Saved</span>
                        <div className={styles.big}>
                            <Heart color={'white'}/>
                        </div>
                        <div className={styles.small}>
                            <Heart color={'white'}/>
                        </div>
                    </button>
            ) :  <button className={styles.favoriteButton} onClick={handleSave}>
                <span className={styles.favoriteSpan}>Save for Later</span>
                <div className={styles.big}>
                    <Heart color={'red'}/>
                </div>
                <div className={styles.small}>
                    <Heart color={'red'}/>
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
