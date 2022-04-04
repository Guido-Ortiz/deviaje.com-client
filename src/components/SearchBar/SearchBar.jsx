import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import s from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getFlightsInfo } from "../../Redux/actions/actions";

function SearchBar() {
  const dispatch = useDispatch();
  const flights = useSelector((state) => state.allFlights);

  let handleInputChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [input, setInput] = useState({
    fly_from: "",
    fly_to: "",
    dateFrom: "",
    dateTo: "",
  });

  function handleClick(e) {
    e.preventDefault();
    dispatch(getFlightsInfo(input));
  }
  return (
    <div className={s.display}>
      <div className={s.flights}>Flights</div>
      <input
        value={input.fly_from}
        placeholder="origen"
        onChange={handleInputChange}
        name="fly_from"
        className={s.input}
      />

      <input
        value={input.fly_to}
        placeholder="destino"
        onChange={handleInputChange}
        name="fly_to"
        className={s.input}
      />
      <select
        name="travelclass"
        className={s.input}
        onChange={(e) => handleInputChange(e)}
      >
        <option defaultValue="W">Economy</option>
        <option value="W">Bussines</option>
      </select>
      <div className={s.dates}>
        <input
          className={s.date}
          value={input.dateFrom}
          type="date"
          onChange={handleInputChange}
          name="dateFrom"
          placeholder="Fecha salida"
        />
        <input
          className={s.date}
          type="date"
          value={input.dateTo}
          onChange={handleInputChange}
          name="dateTo"
          placeholder="Fecha llegada"
        />
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
