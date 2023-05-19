import axios from "axios";
import { BASE_URL } from "../../services/baseURL";
import moment from "moment";
import {
  FETCH_EVENT_FAILURE,
  FETCH_EVENT_REQUEST,
  FETCH_EVENT_SUCCESS,
  FETCH_FOODS_TRENDING_FAILURE,
  SET_EVENT_FILTER,
} from "../../Utils/constant";

export const fetchEvents = () => {
  return (dispatch) => {
    dispatch(fetchEventRequest());
    axios
      .get(`${BASE_URL}/events`)
      .then((response) => {
        const today = moment();
        const twoWeeksAgo = today.clone().subtract(3, "weeks");
        const twoWeeksLater = today.clone().add(3, "weeks");
        const filterStatusEvents = response.data.filter(
          (item) => item.status === true
        );
        const filterEventByDate = filterStatusEvents.filter((event) => {
          const toDate = moment(event.toDate);
          return toDate.isBetween(twoWeeksAgo, twoWeeksLater, null, "[]");
        });
        // console.log(filterEventByDate)
        return dispatch(fetchEventFilter(filterEventByDate));
      })
      .catch((error) => dispatch(fetchEventFailure(error.response.data)));
  };
};
export const fetchFullEvent = () => {
  return (dispatch) => {
    dispatch(fetchEventRequest());
    axios
      .get(`${BASE_URL}/events`)
      .then((response) => dispatch(fetchEventSuccess(response.data)))
      .catch((error) =>
        dispatch(
          fetchEventFailure(error.response.data ? error.response.data : error)
        )
      );
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
export const fetchEventFilter = (event) => {
  return {
    type: SET_EVENT_FILTER,
    payload: event,
  };
};
