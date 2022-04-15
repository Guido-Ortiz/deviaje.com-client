import React from 'react';
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getFlightsInfo, setValuesInputs, getFlightsInfoToFrom, getPassengers } from "../../Redux/actions/actions";
import s from "./Landing.module.css";
import validate from './utils/validate';
import { Modal } from '../../components/modal/index'
import { Loading } from "../loading/Loading";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from "@material-ui/core";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { TopDestination } from "../TopDestinations/carousel";


function Landing() {

  const dispatch = useDispatch()

  const history = useHistory()
  const modalErr = useSelector((state) => state.modalErr)

  const [input, setInput] = useState({
    fly_from: "",
    fly_to: "",
    dateFrom: "",
    dateTo: "",
  })
  const [toFrom, setToFrom] = useState({ name: false })
  const [showLoading, setShowLoading] = useState(false)
  const [errors, setErrors] = useState({})

  let handleInputChange = e => {
    setInput(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }
  const handleInputChangeRadio = (e) => {
    if (e.target.value === 'true') {
      setToFrom(prevData => ({
        ...prevData,
        [e.target.name]: true
      }))
    } else {
      setToFrom(prevData => ({
        ...prevData,
        [e.target.name]: false
      }))
    }
  }

  const [pass, setPass] = useState(1)

  const handleClick = async (e) => {
    e.preventDefault()
    setShowLoading(true)
    const newInput = {
      fly_from: input.fly_from,
      fly_to: input.fly_to,
      dateFrom: input.dateFrom,
      dateTo: input.dateTo,
      toFrom: toFrom.name,
      pass
    }
    dispatch(setValuesInputs(newInput))
    dispatch(getPassengers(pass))
    if (newInput.toFrom === true) {
      const res = await dispatch(getFlightsInfoToFrom(input))
      if (res.payload === true) { return setShowLoading(false) }
      setShowLoading(false)
      history.push('/home')
    } else {
      const res = await dispatch(getFlightsInfo(input))
      if (res.payload === true) { return setShowLoading(false) }
      setShowLoading(false)
      history.push('/home')
    }
  }

  return (
    <>
      <div className={s.fondo}>
        <h1 className={s.titulo}>
          Welcome to <span className={s.url}>deviaje.com</span>
        </h1>
        {
          showLoading && <div style={{ marginTop: '-8.2rem' }} > <Loading /> </div>
        }
        {
          modalErr && <Modal title='No flights found' />
        }
        <div className={s.flex}>
          <FormControl>
            <RadioGroup
              className={s.radio}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="name"
              defaultValue={false}
              onChange={handleInputChangeRadio}
            >
              <FormControlLabel value={true} control={<Radio />} label=" Round trip" sx={{ marginLeft: '.5rem', marginTop: '7px'}} />
              <FormControlLabel value={false} control={<Radio />} label=" One way" sx={{ marginLeft: '8rem', marginTop: '-54px' }} />
            </RadioGroup>
          </FormControl>
          <div className={s.boxErrors}>
            <input
              type="text"
              placeholder="Enter departure city"
              value={input.fly_from}
              onChange={e => handleInputChange(e)}
              name="fly_from"
              className={s.input}
              style={{ position: 'relative', left: '-2rem' }}
            />
            {
              errors.fly_from && <div style={{ position: 'absolute', bottom: '.3rem', left: '2.5rem' }} className={s.errors}>{errors.fly_from}</div>
            }
          </div>
          <div className={s.boxErrors}>
            <input
              type="text"
              placeholder="Enter destination city"
              value={input.fly_to}
              onChange={e => handleInputChange(e)}
              name="fly_to"
              className={s.input}
              style={{ position: 'relative', left: '-2rem' }}
            />
            {
              errors.fly_to && <div style={{ position: 'absolute', bottom: '.3rem', left: '15rem' }} className={s.errors}>{errors.fly_to}</div>
            }
          </div>

          <div className={s.boxErrors}>
            <input type="date"
              placeholder="Date"
              value={input.dateFrom}
              onChange={e => handleInputChange(e)}
              name="dateFrom"
              className={s.date}
              style={{ position: 'relative', left: '-2rem' }}
            />
            {
              errors.dateFrom && <div style={{ position: 'absolute', bottom: '.3rem', left: '27.7rem' }} className={s.errors}>{errors.dateFrom}</div>
            }
          </div>

          <div className={s.boxErrors}>
            <input type="date"
              value={input.dateTo}
              onChange={e => handleInputChange(e)}
              name="dateTo"
              className={s.date}
              style={{ position: 'relative', left: '-2rem' }}
            />
            {
              errors.dateTo && <div style={{ position: 'absolute', bottom: '.3rem', left: '37.5rem' }} className={s.errors}>{errors.dateTo}</div>
            }
          </div>

          <div className={s.pass}>
            <span className={s.placeh}>Passengers</span>
            <IconButton
              onClick={() => setPass(pass - 1)}
              disabled={ pass <= 1 ? true : false }
            >
              <RemoveIcon  sx={{ cursor: 'pointer' }} />
            </IconButton>
              {pass}
            <IconButton
              onClick={() => setPass(pass + 1)}
              disabled={ pass >= 6 ? true : false }
            >
              <AddIcon  sx={{ cursor:'pointer' }} />
            </IconButton>
          </div>

          {
            Object.keys(errors).length === 0 && input.fly_to && input.fly_from && input.dateFrom && input.dateTo ?
              (<button className={s.btn} type="submit" onClick={e => handleClick(e)}>
                <SearchIcon />
                Search
              </button>)
              : <button className={s.btn} type="submit" onClick={e => handleClick(e)} disabled>
                <SearchIcon />
                Search
              </button>
          }

        </div>
      </div>
      <TopDestination />
    </>
  );
}

export default Landing;
