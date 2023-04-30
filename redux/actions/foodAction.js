import axios from "axios";
import { BASE_URL } from "../../services/baseURL";
import {
  FETCH_FOODS_TRENDING_REQUEST,
  FETCH_FOODS_TRENDING_SUCCESS,
  FETCH_FOODS_TRENDING_FAILURE,
  SET_LIST_CATEGORY,
} from "../../Utils/constant";

export const fetchFoods = (page, size) => {
  return (dispatch) => {
    dispatch(fetchFoodsRequest());
    axios
      .get(`${BASE_URL}/foods/pagination?page=${page}&size=${size}`)
      .then((response) => dispatch(fetchFoodsSuccess(response.data)))
      .catch((error) => dispatch(fetchFoodsFailure(error.message)));
  };
};
export const getCategories = () => {
  return (dispatch) => {
    axios
      .get(`${BASE_URL}/categories`)
      .then((response) => dispatch(fetchCategory(response.data)))
      .catch((error) => {
        if(error.response.data){
          console.log(error.response.data)
        }
      });
  };
};
export const fetchFoodsRequest = () => {
  return {
    type: FETCH_FOODS_TRENDING_REQUEST,
  };
};

export const fetchFoodsSuccess = (foods) => {
  return {
    type: FETCH_FOODS_TRENDING_SUCCESS,
    payload: foods,
  };
};

export const fetchFoodsFailure = (error) => {
  return {
    type: FETCH_FOODS_TRENDING_FAILURE,
    payload: error,
  };
};
export const fetchCategory = (category) => {
  return {
    type: SET_LIST_CATEGORY,
    payload: category,
  };
};
