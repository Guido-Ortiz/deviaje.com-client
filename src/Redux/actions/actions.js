import { GET_FLIGHTS_INFO, FLIGHTS_NO_FOUND, STOP_FILTER, DATE_FILTER, PRICE_FILTER, AVAILABILITY_FILTER, TOP_DESTINATION  } from "./constants";
import { axiosWithOutToken } from '../../services/axios'
 

export const getFlightsInfo = (payload) => {

  return async (dispatch) => {
    let fechaModificada = payload.dateFrom.split("-").reverse().join("/");
    let fechaModificada2 = payload.dateTo.split("-").reverse().join("/");

    try {
        const response = await axiosWithOutToken(
            `/getflights?fly_from=${payload.fly_from}&fly_to=${payload.fly_to}&date_from=${fechaModificada}&date_to=${fechaModificada2}`
        )
        return dispatch({
            type: GET_FLIGHTS_INFO,
            payload: response.data,
        });  
    } catch ( err ) {
        console.log( err.response );
        return dispatch({
            type: FLIGHTS_NO_FOUND,
            payload: true,
        });
      }
    };
};


export const topdestination = (payload) => {
  console.log('payload acion', payload)
  return async (dispatch) => {
   
    const d = new Date().toISOString()
    const date = d.slice(0,10)
    const modDate = date.split('-').reverse().join('/')


    try {
        const response = await axiosWithOutToken(
            `/getflights?fly_from=buenos%20aires&fly_to=${payload}&date_from=${modDate}&date_to=29/04/2022`
        )
        return dispatch({
            type: GET_FLIGHTS_INFO,
            payload: response.data,
        });  
    } catch ( err ) {
        console.log( err.response );
        return dispatch({
            type: FLIGHTS_NO_FOUND,
            payload: true,
        });
      }
    };
};

export const  rutaTop = () => {

  return async (dispatch) => {

    try {
        const response = await axiosWithOutToken(
            `/topdestination?city=buenos%20aires`
        )
        return dispatch({
            type: TOP_DESTINATION,
            payload: response.data,
        });  
    } catch ( err ) {
        console.log( err.response );
        return dispatch({
            type: FLIGHTS_NO_FOUND,
            payload: true,
        });
      }
    };
};

export function stopsFilter (value){
  return{
      type: STOP_FILTER,
      payload: value
  }
}
export const hideModalErr = () => {
  return {
    type: FLIGHTS_NO_FOUND,
    payload: false,
  }
} 

export const dateFilter = (value) => {
  return {
    type: DATE_FILTER,
    payload: value
  }
} 

export const priceFilter = (value) => {
  return {
    type: PRICE_FILTER,
    payload: value
  }
} 

export const availabilityFilter = (value) => {
  return {
    type: AVAILABILITY_FILTER,
    payload: value
  }
} 



