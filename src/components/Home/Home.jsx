import React, { useState } from "react";
import styles from "./Home.module.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IoIosAirplane } from "react-icons/io";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import Filter from "../Filter/Filter";
import { ModalDetails } from '../modalDetails/ModalDetails';
import Popup from 'reactjs-popup';
import { CardScaleDetails } from "./CardScaleDetails";
import { Modal } from "../modal";
import { Link } from "react-router-dom";

import { Paginado } from "../Paginado/paginado";
import { Loading } from "../loading/Loading";


export default function Home() {

  const flights = useSelector((state) => state.allFlights);
  const modalErr = useSelector((state) => state.modalErr);

 

  const [ showDetails, setShowDetails ] = useState( false )
  const [ showLoading, setShowLoading ] = useState( false )
  const [ idDetails, setIdDetails ] = useState()

  let [currentPage, setcurrentPage] = useState(1);
  const [flightsPerPage,  ] = useState(10)
  const indexOfLastFlight = currentPage * flightsPerPage; // 10
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage // 10 - 10 = 0 
  const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight)
  
  const pagination = (pageNumber) => {
    setcurrentPage(pageNumber)
    window.scroll(0,0)
  }
 


  const handleDetails = ( id ) => {
    setIdDetails( flights.find( el =>  el.id === id ) ) 
    setShowDetails( true )

  }
  
  return (
   
    <div className={styles.containerGeneral}>
     
    {
      showDetails && <ModalDetails  idDetails = { idDetails } setShowDetails = {setShowDetails} />
    }
    {
      modalErr && <Modal title='No flights found' /> 
    }
      <div className={styles.containerSearch}>

        <SearchBar setShowLoading = { setShowLoading } />
        <Filter setShowLoading = { setShowLoading } />
      </div>
      <div className={styles.containerFlights}>
        {
          showLoading && <div style={{marginBottom:'100%'}} ><Loading /></div> 
        }
        {
         
         currentFlights?.map((f) => 

            (
              <div key={f.id} className={styles.containerPrincipal} >
                <div className={styles.home}>
                  <div className={styles.container}>  
                      <div  className={styles.subTitle}>
                        <div style={{display: 'flex'}}>
                          <IoIosAirplane  style={{color:'#17202A', fontSize:'1.5rem'}} />
                          <h4 style={{color:'#17202A', fontSize:'1.1rem', fontFamily: 'Roboto Condensed', marginTop:'1px'}}>Departure</h4>
                        </div>
                        <h5 style={{color:'#17202A', fontFamily: 'Roboto Condensed', fontSize: '1rem'}}>{f.local_departure.slice(0, 10)}</h5>
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
                            <p style={{}}>Non-Stop</p>
                            : 
                              <Popup
                                trigger={  <p style={{cursor: 'pointer'}}>
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
                    <h3 className={styles.titlePrice}>Price</h3>
                    <div className={styles.flex}>
                      <h6 className={styles.priceSimbol}>USD{flights.currency}</h6>
                      <h4 className={styles.padding_left} 
                            style={{position: 'absolute', top:'33px',
                                    right:'22px', fontSize:'1.5rem'}}>{f.price}</h4>
                    </div>
                  </div> 
                     <div style={{marginTop:'-7rem'}}>       

                      <h4 className={styles.taxes}>Taxes-rates: {flights.currency} <span>{(f.price * .8).toFixed()}</span></h4>
                      <h4 className={styles.finalPrice}>Final Price: {flights.currency} <span style={{fontSize:'17px', color:'#000'}}>{(f.price * 1.8).toFixed()}</span></h4>
                      
                      <Link to={`/${f.id}`}>
                        <button className={styles.buttonBuy}>Buy</button>
                      </Link>

                    </div>
                </div>
            </div>
          )
        ) 
        }
         <Paginado
    flightsPerPage={flightsPerPage}
    flights={flights.length}
    pagination={pagination}
    currentPage={currentPage}
    />
    
   
      </div>
  </div>
  );
}

