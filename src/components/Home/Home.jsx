import React, { useCallback, useState } from "react";
import styles from "./Home.module.css";
import LuggageIcon from "@mui/icons-material/Luggage";
import ConnectingAirportsOutlinedIcon from "@mui/icons-material/ConnectingAirportsOutlined";
import { IoIosAirplane } from "react-icons/io";
import SearchBar from "../SearchBar/SearchBar";
import CardDetail from "../CardDetail/CardDetail";
import Filter from "../Filter/Filter";

export default function Home() {
  let handleInputChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [flights, setFlights] = useState([]);
  console.log(flights);

  const [input, setInput] = useState({
    from: "",
    to: "",
  });

  const fetchRequest = useCallback(() => {
    fetch(
      `https://tequila-api.kiwi.com/v2/search?fly_from=${input.from}&fly_to=${input.to}&dateFrom=01/04/2022&dateTo=30/04/2022`,
      {
        headers: { apikey: "-bo7TXYPf_ZTWM3PbGt2Su4ZNpgWu6-K" },
      }
    )
      .then((data) => data.json())
      .then((dataFetch) => setFlights(dataFetch))
      .catch((err) => console.log(err));
  });

  //console.log(flights.data[0].has_airport_change)

  return (
    <div>
      <input
        value={input.from}
        placeholder="origen"
        onChange={handleInputChange}
        name="from"
      />
      <input
        value={input.to}
        placeholder="destino"
        onChange={handleInputChange}
        name="to"
      />
      <button type="submit" onClick={fetchRequest}>
        Submit
      </button>

      <div className={styles.grid}>
        <div className={styles.wrapper}>
          <SearchBar />
          <Filter />
        </div>
        <div>

        
        {flights.data ? (
          flights.data.map((f) => {
            return (

              <div key={f.id} className={styles.home}>
                <div className={styles.container}>
                  <div className={styles.flex}>
                    <ConnectingAirportsOutlinedIcon color="success" />
                    <h2>DeViaje.com</h2>
                  </div>
                  <div className={styles.container_departure}>
                    <div className={styles.flex}>
                      <IoIosAirplane />
                      <h4>IDA</h4>
                      <h4 className={styles.padding_left}>{f.cityFrom} -</h4>
                      <h4 className={styles.padding_left}>{f.cityTo}</h4>
                    </div>
                    <div>
                      <h4>{f.local_departure.slice(0, 10)}</h4>
                    </div>
                    <div className={styles.flex}>
                      <h4>{f.local_departure.slice(11, 16)}</h4>
                      <h4 className={styles.padding_left}>
                        {f.has_airport_change ? (
                          <p>Directo</p>
                        ) : (
                          <p>Con escala</p>
                        )}
                      </h4>
                    </div>
                  </div>
                  <LuggageIcon />
                  <div className={styles.price}>
                    <h3>Precio</h3>
                    <div className={styles.flex}>
                      <h6>{flights.currency}</h6>
                      <h4 className={styles.padding_left}>{f.price}</h4>
                    </div>
                  </div>
                </div>
                <CardDetail
                  cityfrom={flights.cityfrom}
                  cityTo={flights.cityTo}
                  local_departure={flights.local_departure}
                  price={flights.price}
                  currency={flights.currency}
                />
              </div>


            );
          })
        ) : (
          <h1>Nothing to render</h1>
        )}</div>
      </div>





    </div>
  );
}
