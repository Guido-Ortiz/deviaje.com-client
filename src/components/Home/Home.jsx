import React, { useState } from "react";
import styles from "./Home.module.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IoIosAirplane } from "react-icons/io";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
<<<<<<< HEAD
=======

>>>>>>> 26f300d1c03ced38ca99f72aa83a2c8e83a2887c
import Filter from "../Filter/Filter";
import { ModalDetails } from '../modalDetails/ModalDetails';
import Popup from 'reactjs-popup';
import { CardScaleDetails } from "./CardScaleDetails";
import { Loading } from "../loading/Loading";

export default function Home() {
  
  const flights = useSelector((state) => state.allFlights);
  console.log(flights.data)

  const [ showDetails, setShowDetails ] = useState( false )
  const [ showLoading, setShowLoading ] = useState( false )

  const handleDetails = () => {
    setShowDetails( true )
  }
  
  return (
    <div className={styles.containerGeneral}>
    {
      showDetails && <ModalDetails  setShowDetails = {setShowDetails} />
    }
      <div className={styles.containerSearch}>
        <SearchBar setShowLoading = { setShowLoading } />
        <Filter />
      </div>
      <div className={styles.containerFlights}>
        {
          flights.data ?
          flights.data.map((f) => 
            (
              <div key={f.id} className={styles.home}>
                <div className={styles.container}>
                  <div style={{display: 'flex', flexDirection: 'column', borderRight: '#00000036 solid 1px'}}>
                    <div  className={styles.subTitle}>
                      <div style={{display: 'flex'}}>
                        <IoIosAirplane  style={{color:'#212F3D'}} />
                        <h4 style={{color:'#212F3D', fontFamily: 'Roboto Mono', marginTop:'-3px'}}> GO</h4>
                      </div>
                      <h5 style={{color:'#424949', fontFamily: 'Roboto Mono', fontSize: '14px'}}>{f.local_departure.slice(0, 10)}</h5>
                    </div>
                    <div className={styles.container_departure}>
                      <div className={styles.flex}>
                        <h4 className={styles.padding_left}>{f.cityFrom} </h4>
                        <h4 className={styles.timeLocal}>{f.local_departure.slice(11, 16)}</h4>
                        <ArrowForwardIcon style={{marginLeft: '30px'}} />
                        <h4 style={{marginLeft: '30px'}} className={styles.padding_left}>{f.cityTo}</h4>
                      </div>
                      <div className={styles.flex}>
                        <h4 className={styles.timeLocal}>{f.local_arrival.slice(11, 16)}</h4>
                        <h4 className={styles.padding_left}>
                          { f.has_airport_change ? 
                          <p style={{marginLeft: '40px'}}>direct</p>
                          : 
                            <Popup
                              trigger={  <p style={{marginLeft: '40px', cursor: 'pointer'}}>
                              {f.route.length > 2 ? (f.route.length - 1) + ' scales' : (f.route.length - 1) + ' scale'}</p> }
                              position='top center'
                              on={['hover', 'focus']}
                            >
                            <CardScaleDetails data = {f.route} />
                          </Popup>
                          }
                        </h4>
                      </div>
                      <ExpandMoreIcon onClick={ handleDetails } 
                                    className={styles.iconDetails}
                                   />
                    </div>
                  </div>
                  <div style={{display: 'flex', flexDirection:'column', position: 'relative' }}>
                    <div className={styles.price}>
                      <h3 className={styles.titlePrice}>Price</h3>
                      <div className={styles.flex}>
                        <h6 className={styles.priceSimbol}>{flights.currency}</h6>
                        <h4 className={styles.padding_left} 
                            style={{position: 'absolute', top:'26px',
                                    right:'25px', fontSize:'1.3rem'}}>{f.price}</h4>
                      </div>
                    </div> 
                    <h4 className={styles.taxes}>Taxes-rates: {flights.currency} <span>{(f.price * .8).toFixed()}</span></h4>
                    <h4 className={styles.finalPrice}>Final Price: {flights.currency} <span style={{fontSize:'17px', color:'#000'}}>{(f.price * 1.8).toFixed()}</span></h4>
                    <button className={styles.buttonBuy}>Buy</button>
                  </div>
                </div>
              </div>
          )
      ) 
      : showLoading && <Loading />
    }
    </div>
  </div>
  );
}
