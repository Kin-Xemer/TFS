import {
  FETCH_EVENT_FAILURE,
  FETCH_EVENT_REQUEST,
  FETCH_EVENT_SUCCESS,
  SET_EVENT_BY_ID,
  SET_EVENT_FILTER,
} from "../../Utils/constant";

const initState = {
  eventList: [],
  eventListFitered: [],
  loading: false,
  error: "",
  event: {},
};

function eventReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        eventList: action.payload,
      };
    case FETCH_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_EVENT_BY_ID:
      return {
        ...state,
        loading: false,
        event: action.payload,
      };
    case SET_EVENT_FILTER:
      return {
        ...state,
        loading: false,
        eventListFitered: action.payload,
      };
    default:
      return state;
  }
}
export default eventReducer;
