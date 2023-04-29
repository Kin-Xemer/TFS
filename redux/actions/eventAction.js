import axios from "axios";
import { BASE_URL } from "../../services/baseURL";
import { FETCH_EVENT_FAILURE, FETCH_EVENT_REQUEST, FETCH_EVENT_SUCCESS, FETCH_FOODS_TRENDING_FAILURE } from "../../Utils/constant";

export const fetchEvents = () => {
    return (dispatch) => {
      dispatch(fetchEventRequest());
      axios
        .get(`${BASE_URL}/events`)
        .then((response) => dispatch(fetchEventSuccess(response.data.filter((item)=> item.status === true))))
        .catch((error) => dispatch(fetchEventFailure(error.response.data)));
    };
  };
  export const fetchEventById = (id) => {
    return (dispatch) => {
      dispatch(fetchEventRequest());
      axios
        .get(`${BASE_URL}/events`)
        .then((response) => dispatch(getEventById(response.data)))
        .catch((error) => dispatch(fetchEventFailure(error.response.data)));
    };
  };
export const fetchEventRequest = () => {
    return {
      type: FETCH_EVENT_REQUEST,
    };
  };
  
  export const fetchEventSuccess = (event) => {
    return {
      type: FETCH_EVENT_SUCCESS,
      payload: event,
    };
  };
  
  export const fetchEventFailure = (error) => {
    return {
      type: FETCH_EVENT_FAILURE,
      payload: error,
    };
  };
  export const getEventById = (event) => {
    return {
      type: SET_EVENT_BY_ID,
      payload: event,
    };
  };