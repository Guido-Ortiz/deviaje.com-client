import { GET_FLIGHTS_INFO, FLIGHTS_NO_FOUND,  STOP_FILTER, DATE_FILTER, PRICE_FILTER, AVAILABILITY_FILTER, TOP_DESTINATION } from "../actions/constants";

const initialState = {
  flights: [],
  allFlights: [],
  modalErr : false,
  topDestination: []
};

export default function reducer(state = initialState, action) {
  
  switch (action.type) {

    case GET_FLIGHTS_INFO:
      return {
        ...state,
        flights: action.payload,
        allFlights: action.payload.data
      };

      case STOP_FILTER:
        console.log(action.payload)
        let filterStops = action.payload === 'direct'? state.flights.data.filter(p => {
           return p.route.length === 1
        }) : state.flights.data.filter(p => {
          if(action.payload === '1'){
            return p.route.length === 2
          } else {
            return p.route.length >= 3
          }
       })
        return {
          ...state,
          allFlights: filterStops,
          
        };
        case DATE_FILTER:
          const filterDate = action.payload === 'date'? state.flights.data.sort((a,b) => (a.local_departure > b.local_departure ? 1 : -1)): state.flights.sort((a, b) => (a.local_departure > b.local_departure ? -1 : 1))
          return{
            ...state,
            allFlights: filterDate,
          }
          case PRICE_FILTER:
          const filterPrice = action.payload?  state.flights.data.filter(p =>  (p.price * 1.8).toFixed() <= action.payload) : alert('no flights')
          return{
            ...state,
            allFlights: filterPrice,
          };

          case AVAILABILITY_FILTER:
          const filterAvailability = state.flights.data.filter(p =>  Object.values(p.availability)[0] <= action.payload)
           
          return{
            ...state,
            allFlights: filterAvailability
          }

       case FLIGHTS_NO_FOUND:
        return {
          ...state,
          flights: [],
          allFlights: [],
          modalErr: action.payload
        }
        case TOP_DESTINATION:
          
          return{
            ...state,
            topDestination: action.payload
          }

      default:
        return {...state};
  }
}
