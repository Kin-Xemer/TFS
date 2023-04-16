import { FETCH_COMBO_FAILURE, FETCH_COMBO_REQUEST, FETCH_COMBO_SUCCESS } from "../../Utils/constant";

const initState = {
  combo: [],
  loading: false,
  error:""
};

function comboReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_COMBO_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_COMBO_SUCCESS:
      return {
        ...state,
        loading: false,
        combo: action.payload
      };
    case FETCH_COMBO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
export default comboReducer;
