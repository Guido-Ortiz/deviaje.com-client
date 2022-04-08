import React from 'react'
import loading from '../../components/assets/spinner/Spinner.gif'
import styles from './loading.module.css'

export const Loading = () => {

    return (
      
        <div className= { styles.container }>
        <img src={loading} alt='loading' /> 
        <h3 className= { styles.subTitle}>Loading...</h3>
       </div>
    )
}