import { SET_ADDRESS } from "../actions/productAction";

const initState = {
  restaurant: [],
};

function restaurantReducer(state = initState, action) {
  switch (action.type) {
    case "SET_RESTAURANT":
      return {
        ...state,
        restaurant: action.payload,
      };
    default:
      return state;
  }
}

export default restaurantReducer;
