import React from 'react';
import styles from './cardScaleDetails.module.css';

export const CardScaleDetails = ({ data }) => {
  
  return (
    <div className={styles.container} >
      {
        data?.map(( d, i ) =>(
            <div key={i}
                className={styles.containerCard} 
            >
              <h5 className={styles.details} >Arrival in the city of <span style={{fontSize:'1rem', color:'#000'}} > { d.cityTo } </span> </h5>
              <h6 className={styles.details} >Time of arrival <span style={{fontSize:'.9rem', color:'#000'}}>{d.local_arrival.slice(11, 16)} </span> </h6>
           </div>
        )) 
      }

    </div>
  )
}