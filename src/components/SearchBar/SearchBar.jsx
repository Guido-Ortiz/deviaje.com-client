import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@material-ui/core";
import s from "./SearchBar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getFlightsInfo, getFlightsInfoToFrom, setValuesInputs, getPassengers } from "../../Redux/actions/actions";
import validate from '../Landing/utils/validate'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTranslation } from "react-i18next";
  
function SearchBar() {

  const dispatch = useDispatch();
  const [passenger, setPassenger] = useState(1)
  const dataInputs = useSelector((state) => state.dataInputs);
  const passengers = useSelector((state) => state.passengers);
  const [ toFrom, setToFrom ] = useState({name:''})
  
  let handleInputChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleInputChangeRadio = (e) => {
    if(e.target.value === 'true'){
      setToFrom(prevData => ({
        ...prevData,
        [e.target.name]: true
      }))
    }else{
      setToFrom(prevData => ({
        ...prevData,
        [e.target.name]: false
      }))
    }
  }

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
  useEffect(() =>{
    setInput( dataInputs )
    setToFrom( state => ({...state, name:dataInputs.toFrom }))
    setPassenger( passengers )
  },[])

  const handleClick = (e) => {
    e.preventDefault();
    setError( validate( input ))
    if( Object.keys( validate( input )).length === 0 ){
      const newInput = {
        fly_from: input.fly_from,
        fly_to: input.fly_to,
        dateFrom: input.dateFrom,
        dateTo: input.dateTo,
        toFrom: toFrom.name
      } 
      dispatch(setValuesInputs( newInput ))
      
      if( newInput.toFrom === true ){
        dispatch( getFlightsInfoToFrom( input ))
        dispatch(getPassengers(passenger))
      }else{
        dispatch(getFlightsInfo( input ))
        dispatch(getPassengers(passenger))
      }
    }
  }

  const [t, i18n] = useTranslation('global')

  return (
    <div className={s.display}>
      <div className={s.flights}>{t("searchBar.vuelos")}</div>
        <FormControl>
          <RadioGroup
            className={s.radio}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="name"
            value={toFrom.name}
            onChange={handleInputChangeRadio}
          >
            <FormControlLabel value={true} control={<Radio />} label={t("searchBar.vuelta")} sx={{marginLeft:'10px'}}  />
            <FormControlLabel value={false} control={<Radio />} label={t("searchBar.ida")} sx={{marginLeft:'1px'}} />
          </RadioGroup>
        </FormControl>
        <input
          value={input.fly_from}
          placeholder={t("searchBar.phSalida")}
          onChange={handleInputChange}
          name="fly_from"
          className={s.input}
        />
        { 
          error.fly_from && <p style={{color:'red', margin:'-17px 0 2px 2px', fontSize:'14.5px'}} > {error.fly_from} </p>
        }
        <input
          value={input.fly_to}
          placeholder={t("searchBar.phDestino")}
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
              placeholder="DD/MM/YYYY"
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
              placeholder="DD/MM/YYYY"
            />
            { 
            error.dateTo && <p style={{ color:'red', margin:'2px 0 0 2px', fontSize:'14.5px' }} > { error.dateTo } </p>
            }
          </div>
      </div>

      <div className={s.pass}>
        <span className={s.placeh}>{t("searchBar.pasajeros")}</span>
        <IconButton
            onClick={() => setPassenger(passenger - 1)}
            disabled={ passenger <= 1 ? true : false }
        >
        <RemoveIcon  sx={{ mx: 1 }} />
        </IconButton>
        {passenger}
        <IconButton
            onClick={() => setPassenger(passenger + 1)}
            disabled={ passenger >= 6 ? true : false }
            >
        <AddIcon sx={{ mx: 1 }} />
        </IconButton>
      </div>

      <button className={s.btn} type="submit" onClick={handleClick}>
        <SearchIcon />
        {t("searchBar.btn")}
      </button>

    </div>
  );
}

export default SearchBar;
