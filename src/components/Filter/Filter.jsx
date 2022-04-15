import React, { useEffect, useState } from 'react';
import s from './Filter.module.css';
import { dateFilter, stopsFilter, priceFilter, availabilityFilter } from '../../Redux/actions/actions';
import {useDispatch, useSelector } from 'react-redux'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


function Filter( ) {
  
    // const flights = useSelector(state => state.allFlights)
    const [price, setPrice] = useState('')
    const [availability, setAvailability] = useState('')
  
    const dispatch = useDispatch()
    const toFrom = useSelector(state => state.dataInputs.toFrom)
    
    const handlecheck = (e) => {
        if(e.target.checked){
            const check = {toFrom, value:e.target.value}
            //dispatch(stopsFilter(e.target.value))
            dispatch(stopsFilter( check ))
        } 
    }

    const handleDate = (e) => {
        e.preventDefault();  
        dispatch(dateFilter(e.target.value))
    }

   useEffect(() => {
       if(price){
           dispatch(priceFilter(price))
       }
   }, [dispatch, price])
     

 
    let handleInputPrice = (e) => {
        setPrice(e.target.value);
      };

      useEffect(()=> {
          if(availability){
              dispatch(availabilityFilter(availability))
          }
      }, [dispatch, availability])

      let handleInputavailability = (e) => {
        setAvailability(e.target.value);
      };

      
    return (
        <div className={s.filters}>
              <div className={s.container}>
                <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Stops</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="direct"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="direct" control={<Radio />} label="Non-Stop" onClick={handlecheck} />
                    <FormControlLabel value="1" control={<Radio />} label="1 Stop" onClick={handlecheck} />
                    <FormControlLabel value="2" control={<Radio />} label="2 Stop or more"  onClick={handlecheck}/>
                </RadioGroup>
                </FormControl>
              </div>
               
                
               <div className={s.container2}>
                <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Sort by</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue=""
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="date" control={<Radio />} label="Upcoming flights" onChange={handleDate} />
                   
                </RadioGroup>
                </FormControl>
               </div>
                

            <div className={s.container2}>
                <FormLabel className={s.title}  id="demo-radio-buttons-group-label">Price</FormLabel>
                <div className={s.flex}>
                    <div>
                        <span className={s.padding} >USD 50</span>
                    </div>
                    <div>
                        <span className={s.price}>{price}</span>
                        <input className={s.range} type="range" min='50' max='5000' name='price'  value={price}  onChange={handleInputPrice}/>
                        <span className={s.padding}>USD 5.000</span>
                    </div>
                </div>
            </div> 
            <div   className={s.container2}>
            <FormLabel className={s.title} id="demo-radio-buttons-group-label">Availability</FormLabel>
                <div className={s.flex}>
                <div>
                    <span className={s.padding} >1</span>
                </div>
                <div>
                    <span className={s.price}>{availability}</span>
                    <input className={s.range} type="range" min='1' max='10' name='availability'  value={availability}  onChange={handleInputavailability}/>
                    <span className={s.padding}>10</span>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Filter;