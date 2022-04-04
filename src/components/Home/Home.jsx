import React, { useState } from "react";
import styles from "./Home.module.css";
import LuggageIcon from "@mui/icons-material/Luggage";
import ConnectingAirportsOutlinedIcon from "@mui/icons-material/ConnectingAirportsOutlined";
import { IoIosAirplane } from "react-icons/io";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import Filter from "../Filter/Filter";

export default function Home() {
  const flights = useSelector((state) => state.flights);

  const [input, setInput] = useState({
    fly_from: "",
    fly_to: "",
    dateFrom: "",
    dateTo: "",
  });

  return (
    <div className={styles.containerGeneral}>
      <div className={styles.containerSearch}>
        <SearchBar />
        <Filter />
      </div>
      <div className={styles.containerFlights}>
        {flights.data ? (
          flights.data.map((f) => {
            return (
              <div key={f.id} className={styles.home}>
                <div className={styles.container}>
                  <div className={styles.flex}>
                    <ConnectingAirportsOutlinedIcon color="success" />
                    <h2>{f.fare_category}</h2>
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
                    <h3>Price</h3>
                    <div className={styles.flex}>
                      <h6>{flights.currency}</h6>
                      <h4 className={styles.padding_left}>{f.price}</h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1>Nothing to render</h1>
        )}
      </div>
    </div>
  );
}
