import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import styles from './modalDetails.module.css'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LuggageIcon from '@mui/icons-material/Luggage';
import WorkIcon from '@mui/icons-material/Work';

export const ModalDetails = ( { setShowDetails, idDetails } ) => {

  
  const handleHideDetails = () => {
      setShowDetails( false )
  }
  const getHoursStop = (departure, arrival) => {
    let num1 = Date.parse(departure)
    let num2 = Date.parse(arrival)
    let res = num2 - num1
    return res/1000
  }

  const getHours = (num) => {
    const time = num/60;
    const [hours, minutes] = [Math.floor(time/60), time%60];
    return [hours, minutes]
  }
  console.log(getHours(getHoursStop("2022-04-08T12:40:00.000Z","2022-04-08T13:45:00.000Z")))

  console.log(idDetails)
  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
            <ClearIcon  className={styles.iconHide}
                        onClick={ handleHideDetails } />
          {
            idDetails.route.map( el => (
              <div key={el.id} className={styles.containerPrincipal} >
                <h3 style={{color:'#17202A', marginTop:'-10px', marginLeft:'10px'}} >{ el.airline }</h3>
                <div className={styles.containerFromTo}>
                  <div className={styles.containerDeparture}>
                    <h6 style={{fontSize:'.8rem'}} >{ el.local_departure.slice(0, 10)}</h6>
                    <h4 style={{fontSize:'1.5rem'}} >{ el.local_departure.slice(11, 16)}</h4>
                    <h6 style={{fontSize:'1rem', marginTop:'.5rem', color:'#293441'}} >{ el.cityCodeFrom }</h6>
                    <h6 style={{fontSize:'1rem', color:'#293441'}}>{ el.cityFrom }</h6>
                  </div>
                  <div style={{display:'flex', flexDirection:'column', justifyContent: 'center', 
                              alignItems:'center', fontSize:'1.3rem', color:'#293441'}} >
                    <h6>-- Duration --</h6>
                    <h6 style={{color: '#131516'}}>{ getHours(getHoursStop(el.local_departure, el.local_arrival))[0] !== 0 && 
                        getHours(getHoursStop(el.local_departure, el.local_arrival))[0] + 'h '} 
                      { getHours(getHoursStop(el.local_departure, el.local_arrival))[1]}m </h6>
                  </div>
                  <div className={styles.containerArrival}>
                    <h6 style={{fontSize:'.8rem'}} >{ el.local_departure.slice(0, 10) } </h6>
                    <h4 style={{fontSize:'1.5rem'}}>{ el.local_arrival.slice(11, 16) }</h4>
                    <h6 style={{fontSize:'1rem', marginTop:'.5rem', color:'#293441'}}>{ el.cityCodeTo }</h6>
                    <h6 style={{fontSize:'1rem', color:'#293441'}}>{ el.cityTo }</h6>
                  </div>
                </div>
                <div className={styles.containerCategory}> 
                  <h4 style={{marginBottom:'-1rem', color:'#0f161d',fontSize:'1.1rem'}} ><span style={{fontSize:'1rem', color:'#293441'}}>Class: </span>
                      {el.fare_category === 'M' ? 'Economy' : el.fare_category === 'W' ? 'Economy Premiun' :
                      el.fare_category === 'C' ? 'Business' : el.fare_category === 'F' ? 'First Class' : 'Economy'}  </h4>
                </div>
              </div>
            ))
          }
          <div className={styles.containerDurationFinal}> 
            <h4><span style={{color:'#293441'}}>Duration final: </span>
                { getHours(idDetails.duration.total)[0] !== 0 && getHours(idDetails.duration.total)[0]+'h ' } 
                { getHours(idDetails.duration.total)[1]}m </h4>  
          </div>
          <div className={styles.containerEquipaje}>
            <div className={styles.containerEquipajeFirst}>
              <h4>Baggage</h4>
            </div>
            <div className={styles.containerEquipajeSecond}>
              <div style={{display: 'flex', marginBottom:'1.2rem'}} >
                <ShoppingBagIcon style={{color:'#243c57', marginTop:'8px', marginRight:'10px' }} />
                <div>
                  <h4 className={styles.containerEquipajeSubTitle}>Includes a backpack or purse.</h4>
                  <h5 className={styles.containerEquipajeSubTitleSecond}>Must fit under the front seat.</h5>
                </div>
              </div>
              <div style={{display: 'flex', marginBottom:'1.2rem'}}>
                <WorkIcon style={{color:'#243c57', marginTop:'10px', marginRight:'10px' }} />
                <div>
                  <h4 className={styles.containerEquipajeSubTitle}>Includes hand luggage.</h4>
                  <h5 className={styles.containerEquipajeSubTitleSecond}>Must fit in the overhead compartment of the plane.</h5>
                </div>
              </div>
              <div style={{display: 'flex', marginBottom:'1.2rem'}}>
                <LuggageIcon style={{color:'#243c57', marginTop:'20px', marginRight:'10px' }} />
                <div>
                  <h4 className={styles.containerEquipajeSubTitle}>Includes checked baggage.</h4>
                  <h5 className={styles.containerEquipajeSubTitleSecond}>2 bags per adult.</h5>
                  <h5 className={styles.containerEquipajeSubTitleSecond}>It is dispatched at the airport during Check-in.</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
