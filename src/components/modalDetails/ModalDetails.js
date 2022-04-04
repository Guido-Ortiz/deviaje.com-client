import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import styles from './modalDetails.module.css'

export const ModalDetails = ( { setShowDetails } ) => {

   const handleHideDetails = () => {
      setShowDetails( false )
   }
  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
            <h1> Details</h1>
            <ClearIcon  className={styles.iconHide}
                        onClick={ handleHideDetails } />
        </div>
      </div>
    </>
  )
}
