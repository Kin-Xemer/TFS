import { GET_ALL_FOOD } from "../actions/productAction";
const initState = {
  food: [],
};

function foodReducer(state = initState, action) {
  switch (action.type) {
    case GET_ALL_FOOD:
      return {
        ...state,
       food: action.payload
      };

    default:
      return state;
  }
}
export default foodReducer;
