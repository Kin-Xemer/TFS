import callApi from "../../Utils/api/getProduct";
import axios from "axios";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const GET_ALL_FOOD = "GET_ALL_FOOD";
export const GET_NUMBER_CART = "GET_NUMBER_CART";
export const ADD_CART = "ADD_CART";
export const UPDATE_CART = "UPDATE_CART";
export const DELETE_CART = "DELETE_CART";
export const CHECK_LOGIN = "CHECK_LOGIN";
export const SET_LOGIN_STATUS = "SET_LOGIN_STATUS";
export const HANDLE_LOGIN = "HANDLE_LOGIN";
export const SET_ADDRESS = "SET_ADDRESS";
export const GET_ADDRESS = "GET_ADDRESS";

/*GET_ALL_FOOD*/
export const GetAllFood = (payload) => {
  console.log("data food in redux: ", payload);
  return {
    type: "GET_ALL_FOOD",
    payload,
  };
};

