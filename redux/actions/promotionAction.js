import axios from "axios";
import { BASE_URL } from "../../services/baseURL";
import {
    ADD_PROMOTION,
    FETCH_PROMOTION_BY_ID,
  FETCH_PROMOTION_FAILURE,
  FETCH_PROMOTION_REQUEST,
  FETCH_PROMOTION_SUCCESS,
} from "../../Utils/constant";

export const getAllPromotion = () => {
  return (dispatch) => {
    dispatch(fetchPromotionRequest());
    axios
      .get(`${BASE_URL}/promotions`)
      .then((response) => dispatch(fetchPromotionSucess(response.data)))
      .catch((error) => dispatch(fetchPromotionFailure(error.message)));
  };
};
export const getPromotionById = (id) => {
  return (dispatch) => {
    dispatch(fetchPromotionRequest());
    axios
      .get(`${BASE_URL}/promotions/${id}`)
      .then((response) => dispatch(fetchPromotionByid(response.data)))
      .catch((error) => dispatch(fetchPromotionFailure(error.message)));
  };
};

export const fetchPromotionRequest = () => {
  return {
    type: FETCH_PROMOTION_REQUEST,
  };
};
export const fetchPromotionSucess = (promotion) => {
  return {
    type: FETCH_PROMOTION_SUCCESS,
    payload: promotion,
  };
};
export const fetchPromotionFailure = (error) => {
  return {
    type: FETCH_PROMOTION_FAILURE,
    payload: error,
  };
};
export const fetchPromotionByid = (promotion) => {
    return {
        type: FETCH_PROMOTION_BY_ID,
        payload: promotion,
      };
}
export const addPromotion = (promotion) => {
    return {
        type: ADD_PROMOTION,
        payload: promotion,
      };
}
