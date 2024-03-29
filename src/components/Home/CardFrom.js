import React from 'react';
import { CardScaleDetails } from "./CardScaleDetails";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Popup from 'reactjs-popup';
import { IoIosAirplane } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";
import { useAuth0 } from '@auth0/auth0-react'
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import { useTranslation } from 'react-i18next';
import { resetData } from '../../Redux/actions/actions';

const CardFrom = ({ handleDetails, f }) => {

    const flights = useSelector((state) => state.allFlights);
    const { isAuthenticated, user } = useAuth0()
    const history = useHistory()
    const dispatch = useDispatch()
    const handleBuy = aux => {
      user && isAuthenticated ? history.push(aux) : swal(t("cardFrom.alerta"), t("cardFrom.alerta2"), "error")
      dispatch(resetData())
    }
    
    const [t, i18n] = useTranslation('global')

    return (
        <div key={f.id} className={styles.containerPrincipal} >
                <div className={styles.home}>
                  <div className={styles.container}>  
                      <div  className={styles.subTitle}>
                        <div style={{display: 'flex'}}>
                          <IoIosAirplane  style={{color:'#3e3f3f', fontSize:'1.5rem'}} />
                          <h4 style={{color:'#3e3f3f', fontSize:'1.35rem', fontFamily: 'Bebas Neue'}}>{t("cardFrom.departure")}</h4>
                        </div>
                        <h5 style={{color:'#535555', fontFamily: 'Bebas Neue', fontSize: '1.1rem'}}>{f.local_departure.slice(0, 10)}</h5>
                      </div>
                      <div className={styles.container_departure}>
                        <div style={{display: 'flex', flex:'40%'}}>
                          <h4 className={styles.padding_left}>{f.cityFrom} </h4>
                          <h4 className={styles.timeLocal}>{f.local_departure.slice(11, 16)}</h4>
                          <ArrowForwardIcon style={{marginLeft: '30px'}} />
                        </div>
                        <div style={{display: 'flex', flex:'45%'}}>
                          <h4 style={{marginLeft: '10px'}} className={styles.padding_left}>{f.cityTo}</h4>
                          <h4 className={styles.timeLocal}>{f.local_arrival.slice(11, 16)}</h4>
                        </div>
                        <div style={{display: 'flex', flex:'20%', justifyContent:'right'}}>  
                          <h4 className={styles.padding_left}>
                            { f.route.length === 1 ? 
                            <p style={{marginBottom:0}}>{t("cardFrom.directo")}</p>
                            : 
                              <Popup
                                trigger={  <p style={{cursor: 'pointer', marginBottom:0}}>
                                {f.route.length > 2 ? (f.route.length - 1) + ' Stops' : (f.route.length - 1) + ' Stop'}</p> }
                                position='top center'
                                on={['hover', 'focus']}
                              >
                                <CardScaleDetails data = {f.route} />
                              </Popup>
                            }
                          </h4>
                          <ExpandMoreIcon onClick={ () => handleDetails(f.id) } 
                                    className={styles.iconDetails}
                                   />
                        </div>
                    </div> 
                  </div> 
                </div>
                <div className={styles.containerPriceFinal}>
                  <div className={styles.price}>
                    <h3 className={styles.titlePrice}>{t("cardFrom.precio")}</h3>
                    <div className={styles.containerPriceNum}>
                      <h6 className={styles.priceSimbol}>USD{flights.currency}</h6>
                      <h4 className={styles.padding_left} style={{fontSize:'1.5rem'}} >{f.price}</h4>
                    </div>
                  </div> 
                     <div style={{marginTop:'-7rem'}}>       

                      <h4 className={styles.taxes}>{t("cardFrom.imp")}: USD {flights.currency} <span> {(f.price * .8).toFixed()}</span></h4>
                      <h4 className={styles.finalPrice}>{t("cardFrom.final")}: USD{flights.currency} <span style={{fontSize:'22px', color:'#2b2727'}}>{(f.price * 1.8).toFixed()}</span></h4>
                      
                      <button className={styles.buttonBuy} onClick={() => handleBuy(`/${f.id}`)}>{t("cardFrom.btn")}</button>

                    </div>
                </div>
            </div>
    )
}
export default CardFrom;