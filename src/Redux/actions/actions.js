import axios from "axios";
import { GET_FLIGHTS_INFO } from "./constants";

const url = "http://localhost:4001";

export const getFlightsInfo = (payload) => {
  return async (dispatch) => {
    let fechaModificada = payload.dateFrom.split("-").reverse().join("/");
    let fechaModificada2 = payload.dateTo.split("-").reverse().join("/");

    try {
      const response = await axios.get(
        `${url}/getflightspost?fly_from=${payload.fly_from}&fly_to=${payload.fly_to}&date_from=${fechaModificada}&date_to=${fechaModificada2}`
      );
      return dispatch({
        type: GET_FLIGHTS_INFO,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
