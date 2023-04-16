import axios from "axios";
import { BASE_URL } from "../../services/baseURL";
import { FETCH_COMBO_REQUEST, FETCH_COMBO_SUCCESS, FETCH_FOODS_TRENDING_FAILURE } from "../../Utils/constant";

export const fetchCombos = () => {
    return (dispatch) => {
      dispatch(fetchComboRequest());
      axios
        .get(`${BASE_URL}/foods`)
        .then((response) => dispatch(fetchComboSuccess(response.data.filter((item)=> item.type === true))))
        .catch((error) => dispatch(fetchComboFailure(error.response.data)));
    };
  };

export const fetchComboRequest = () => {
    return {
      type: FETCH_COMBO_REQUEST,
    };
  };
  
  export const fetchComboSuccess = (combo) => {
    return {
      type: FETCH_COMBO_SUCCESS,
      payload: combo,
    };
  };
  
  export const fetchComboFailure = (error) => {
    return {
      type: FETCH_FOODS_TRENDING_FAILURE,
      payload: error,
    };
  };