import {
  FETCH_PROMOTION_BY_ID,
  FETCH_PROMOTION_FAILURE,
  FETCH_PROMOTION_REQUEST,
  FETCH_PROMOTION_SUCCESS,
} from "../../Utils/constant";

const initState = {
  listPromotion: [],
  promotion: {},
  loading: false,
  error: "",
};

function promotionReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_PROMOTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROMOTION_SUCCESS:
      return {
        ...state,
        loading: false,
        listPromotion: action.payload,
      };
    case FETCH_PROMOTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_PROMOTION_BY_ID:
      return {
        ...state,
        loading: false,
        promotion: action.payload,
      };
    default:
      return state;
  }
}
export default promotionReducer;
