import { GET_ALL_FOOD } from "../actions/productAction";
const initState = {
  services: [],
};

function serviceReducer(state = initState, action) {
  switch (action.type) {
    case "SET_SERVICE":
      return {
        ...state,
        services: action.payload
      };

    default:
      return state;
  }
}
export default serviceReducer;
