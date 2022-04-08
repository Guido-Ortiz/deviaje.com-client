import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getFlightsInfo } from "../../Redux/actions/actions";
import s from "./Landing.module.css";
import validate from './utils/validate';
import { Modal } from '../../components/modal/index'
import { Loading } from "../loading/Loading";
import { TopDestination } from "../TopDestinations/TopDestination";

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
  const [ showLoading, setShowLoading ] = useState( false )
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

  const handleClick = async (e) => {
    e.preventDefault()
    setShowLoading( true )
    const res =  await dispatch(getFlightsInfo(input))
    if( res.payload === true ){ return setShowLoading( false )}
    setShowLoading( false )
    history.push('/home')
  }

  return (
    <>
      <div className={s.fondo}>
        <h1 className={s.titulo}>
          Welcome to <span className={s.url}>deviaje.com</span>
        </h1>
        {
          showLoading &&  <div style={{marginTop:'-8rem'}} > <Loading /> </div> 
        }
        {
          modalErr && <Modal title='No flights found' /> 
        }
        <div className={s.flex}>
          <div className={s.boxErrors}>
            <input
              type="text"
              placeholder="Enter departure city"
              value={input.fly_from}
              onChange={e => handleInputChange(e)}
              name="fly_from"
              className={s.input}
            />
            {
              errors.fly_from && <div className={s.errors}>{errors.fly_from}</div>
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
            />
            {
              errors.fly_to && <div className={s.errors}>{errors.fly_to}</div>
            }
          </div>

          <div className={s.boxErrors}>
            <input type="date"
              placeholder="Date"
              value={input.dateFrom}
              onChange={e => handleInputChange(e)}
              name="dateFrom"
              className={s.date}
            />
            {
              errors.dateFrom && <div className={s.errors}>{errors.dateFrom}</div>
            }
          </div>

          <div className={s.boxErrors}>
            <input type="date"
              value={input.dateTo}
              onChange={e => handleInputChange(e)}
              name="dateTo"
              className={s.date}
            />
            {
              errors.dateTo && <div className={s.errors}>{errors.dateTo}</div>
            }
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
      <TopDestination/>
    </>
  );
}

export default Landing;
