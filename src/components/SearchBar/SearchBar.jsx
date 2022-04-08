import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import s from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getFlightsInfo } from "../../Redux/actions/actions";
import validate from '../Landing/utils/validate'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function SearchBar( { setShowLoading } ) {
  const dispatch = useDispatch();
  // const flights = useSelector((state) => state.allFlights);
  

  let handleInputChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [input, setInput] = useState({
    fly_from: "",
    fly_to: "",
    dateFrom: "",
    dateTo: "",
  });
  const [error, setError] = useState({
    fly_from: "",
    fly_to: "",
    dateFrom: "",
    dateTo: "",
  });

  async function handleClick(e) {
    e.preventDefault();
    setError( validate( input ))
    if( Object.keys( validate( input )).length === 0 ){
      setShowLoading( true )  
      await  dispatch(getFlightsInfo(input));
      setShowLoading( false )
    }
    
  }
  
  return (
    <div className={s.display}>
      <div className={s.flights}>Flights</div>
        <FormControl>
          <RadioGroup
            className={s.radio}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="female" control={<Radio />} label="Ida" sx={{marginLeft:'1px'}} />
            <FormControlLabel value="male" control={<Radio />} label="Vuelta" />
          </RadioGroup>
        </FormControl>
        <input
          value={input.fly_from}
          placeholder="Enter departure city"
          onChange={handleInputChange}
          name="fly_from"
          className={s.input}
        />
        { 
          error.fly_from && <p style={{color:'red', margin:'-17px 0 2px 2px', fontSize:'14.5px'}} > {error.fly_from} </p>
        }
        <input
          value={input.fly_to}
          placeholder="Enter destination city"
          onChange={handleInputChange}
          name="fly_to"
          className={s.input}
        />
        { 
          error.fly_to && <p style={{ color:'red', margin:'-17px 0 2px 2px', fontSize:'14.5px' }} > { error.fly_to } </p>
        }
        <div className={s.dates}>
          <div>
            <input
              className={s.date}
              value={input.dateFrom}
              type="date"
              onChange={handleInputChange}
              name="dateFrom"
              placeholder="dd-mm-yyyy"
            />
            { 
            error.dateFrom && <p style={{ color:'red', margin:'2px 0 0 2px', fontSize:'14.5px' }} > { error.dateFrom } </p>
            }
          </div>
          <div>
            <input
              className={s.date}
              type="date"
              value={input.dateTo}
              onChange={handleInputChange}
              name="dateTo"
              placeholder="dd-mm-yyyy"
            />
            { 
            error.dateTo && <p style={{ color:'red', margin:'2px 0 0 2px', fontSize:'14.5px' }} > { error.dateTo } </p>
            }
          </div>
        </div>
      <button className={s.btn} type="submit" onClick={handleClick}>
        <SearchIcon />
        Search
      </button>
    </div>
    // <div className={s.display}>
    //     <div className={s.flights}>Flights</div>
    //     <input
    //         type="text"
    //         placeholder="Enter departure city"
    //         className={s.input}
    //     />
    //     <input
    //         type="text"
    //         placeholder="Enter destination city"
    //         className={s.input}
    //     />
    //     <div className={s.dates}>
    //         <input type="date" placeholder="Date" className={s.date} />
    //         <input type="date" className={s.date} />
    //     </div>
    //     <button className={s.btn}>
    //         <SearchIcon />
    //         Search
    //     </button>
    // </div>
  );
}

export default SearchBar;
