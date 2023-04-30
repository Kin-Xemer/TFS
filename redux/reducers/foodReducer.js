import { FETCH_FOODS_TRENDING_SUCCESS, SET_FOOD_TREND, SET_LIST_CATEGORY } from "../../Utils/constant";
import { GET_ALL_FOOD } from "../actions/productAction";
const initState = {
  food: [],
  foodTrend:[],
  foodTraditional: [],
  category: [],
};

function foodReducer(state = initState, action) {
  switch (action.type) {
    case GET_ALL_FOOD:
      return {
        ...state,
       food: action.payload
      };
    case SET_FOOD_TREND:
      return {
        ...state,
        foodTrend: action.payload
      };
    case FETCH_FOODS_TRENDING_SUCCESS:
      return {
        ...state,
        foodTrend: action.payload
      };
    case SET_LIST_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    default:
      return state;
  }
}
export default foodReducer;
