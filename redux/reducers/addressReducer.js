import {
      SET_ADDRESS,
  } from "../actions/productAction";
  
const initState = {
  address: "aa",
  location: null,
  coord:{}
};

function addressReducer(state = initState, action) {
  switch (action.type) {
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
        location: action.location,
        coord: action.destination
      };
    default:
      return state;
  }
}

export default addressReducer;