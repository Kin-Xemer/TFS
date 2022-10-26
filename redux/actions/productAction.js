import callApi from "../../Utils/api/getProduct";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const GET_ALL_PRODUCT = "GET_ALL_PRODUCT";
export const GET_NUMBER_CART = "GET_NUMBER_CART";
export const ADD_CART = "ADD_CART";
export const UPDATE_CART = "UPDATE_CART";
export const DELETE_CART = "DELETE_CART";

export const actFetchProductsRequest = () => {
  return (dispatch) => {
    return callApi("/products", "GET", null).then((res) => {
      dispatch(GetAllProduct(res.data));
    });
  };
};

/*GET_ALL_PRODUCT*/
export const GetAllProduct = (payload) => {
  return {
    type: "GET_ALL_PRODUCT",
    payload,
  };
};

/*GET NUMBER CART*/
export const GetNumberCart = () => {
  return {
    type: "GET_NUMBER_CART",
  };
};

export const AddCart = (food, quantity) => {
  return {
    type: "ADD_CART",
    payload: food,
    quantity
  };
};

export const UpdateCart = (payload) => {
  return {
    type: "UPDATE_CART",
    payload,
  };
};

export const DeleteCart = (payload) => {
  return {
    type: "DELETE_CART",
    payload,
  };
};

export const IncreaseQuantity = (payload) => {
  return {
    type: "INCREASE_QUANTITY",
    payload,
  };
};
export const DecreaseQuantity = (payload) => {
  return {
    type: "DECREASE_QUANTITY",
    payload,
  };
};
