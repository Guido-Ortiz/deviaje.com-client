import { SouthAmerica } from "@mui/icons-material";
import { GET_FLIGHTS_INFO, FLIGHTS_FILTER } from "../actions/constants";

const initialState = {
  flights: [],
  allFlights: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FLIGHTS_INFO:
      return {
        ...state,
        flights: action.payload,
        allFlights: action.payload,
      };

    default:
      return state;
    case FLIGHTS_FILTER:
      const allFlightFilter = state.flights;
      const prueba = allFlightFilter.data[0].route[0].fare_category;
      const mapPrueba = allFlightFilter.data.map((el) => {
        return el.route.map((ol) => {
          return ol.fare_category;
        });
      });
      // console.log("estos son todos los datos", allFlightFilter.data);
      // console.log("esta es la prueba", prueba);
      // console.log("este es el map", mapPrueba);
      const filteredFlights = allFlightFilter.filter((f) =>
        f.route.fare_category?.some(
          (d) => d.toLowerCase() === action.payloadtoLowerCase()
        )
      );
      return {
        ...state,
        allFlights: filteredFlights,
      };
  }
}
