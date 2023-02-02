import {
      SET_ADDRESS,
  } from "../actions/productAction";
  
const initState = {
  address: "",
  location: null,
  stringAddress:""
};

function addressReducer(state = initState, action) {
  switch (action.type) {
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
        location: action.location,
      };
      case "SET_STRING_ADDRESS":
        console.log("asasd", action.payload)
        return {
          ...state,
          stringAddress: action.payload
        }
    default:
      return state;
  }
}

export default addressReducer;