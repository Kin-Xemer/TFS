import {
  ADD_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  DELETE_CART,
} from "../actions/productAction";
import axios from "axios";
import { BASE_URL } from "../../services/baseURL";
const initCart = {
  numberCart: 0,
  cartsItem: [],
  updateCart: null,
  cart: {},
  account: {},
  serviceList: [],
  serviceListObject: [],
};

const saveCart = (state) => {
  let sum = 0;
  state.cartsItem.map((item) => {
    sum = sum + item.quantity;
  });

  let totalPrice = 0;
  state.cartsItem.map((item) => {
    totalPrice = totalPrice + item.subTotal;
  });
  const newCart = {
    ...state.cart,
    cartItems: state.cartsItem,
    numberCart: sum,
    totalPrice: totalPrice,
    comboList:[],
    partyItem:[]
  };
  initCart.numberCart = sum;
  console.log( BASE_URL + "/carts",
  newCart)
  axios
    .put(
      BASE_URL + "/carts",
      newCart
    )
    .then((res) => {
     
    }).catch((err) => {
      console.log(err.message)
    });
};

function todoProduct(state = initCart, action) {
  switch (action.type) {
    case ADD_CART:
      if (state.numberCart == 0) {
        let cart = {
          id: action.payload.id,
          quantity: action.quantity,
          name: action.payload.foodName,
          image: action.payload.imgUrl,
          price: action.payload.price,
          subTotal: action.payload.price * action.quantity,
        };
        state.cartsItem.push(cart);
      } else {
        let check = false;
        state.cartsItem.map((item, key) => {
          if (item.id == action.payload.id) {
            state.cartsItem[key].quantity =
              state.cartsItem[key].quantity + action.quantity;
            state.cartsItem[key].subTotal =
              state.cartsItem[key].subTotal +
              state.cartsItem[key].price * action.quantity;
            check = true;
          }
        });
        if (!check) {
          let _cart = {
            id: action.payload.id,
            quantity: action.quantity,
            name: action.payload.foodName,
            image: action.payload.imgUrl,
            price: action.payload.price,
            subTotal: action.payload.price * action.quantity,
          };
          state.cartsItem.push(_cart);
        }
      }
      return {
        ...state,
        numberCart: state.numberCart + action.quantity,
        updateCart: saveCart(state),
        cart: newCart,
      };
    case INCREASE_QUANTITY:
      state.cartsItem[action.payload].quantity++;
      state.cartsItem[action.payload].subTotal =
        state.cartsItem[action.payload].subTotal +
        state.cartsItem[action.payload].price;
      return {
        ...state,
        updateCart: saveCart(state),
      };
    case DECREASE_QUANTITY:
      let quantity = state.cartsItem[action.payload].quantity;
      if (quantity > 1) {
        state.cartsItem[action.payload].quantity--;
        state.cartsItem[action.payload].subTotal =
          state.cartsItem[action.payload].subTotal -
          state.cartsItem[action.payload].price;
      }
      return {
        ...state,
        updateCart: saveCart(state),
      };
    case DELETE_CART:
      let quantity_ = state.cartsItem[action.payload].quantity;
      let newCart = [];
      state.cartsItem.filter((item) => {
        if (item.id != state.cartsItem[action.payload].id) {
          newCart.push(item);
        }
      });
      state.cartsItem = newCart;
      return {
        ...state,
        updateCart: saveCart(state),
      };
    case "SET_CART":
      action.numberCart;
      return {
        ...state,
        cartsItem: action.payload,
        cart: action.cart,
        numberCart: action.numberCart,
      };
    case "SET_CARTITEM":
      return {
        ...state,
        cartsItem: action.payload,
        
      };
    case "SET_SERVICE_LIST":
      return {
        ...state,
        serviceList: action.payload,
      };
    case "SET_SERVICE_LIST_OBJECT":
      return {
        ...state,
        serviceListObject: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        numberCart: 0,
        cartsItem: [],
        updateCart: null,
        cart: {},
        account: {},
        serviceList: []
      };
    //   case "SET_ACCOUNT":
    // return {
    //   ...state,
    //   account: action.payload,
    // };
    default:
      return state;
  }
}
export default todoProduct;
