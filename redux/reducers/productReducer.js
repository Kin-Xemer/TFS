import {
  GET_ALL_PRODUCT,
  GET_NUMBER_CART,
  ADD_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  DELETE_CART,
} from "../actions/productAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getCartById } from "../../Utils/api/getCart";
const initCart = {
  numberCart: 0,
  cartsItem: [],
  updateCart: null,
  cart: {},
  account: {},
};

const saveCart = (state) => {
  const newCart = { ...state.cart, cartItems: state.cartsItem };
  axios
    .put(
      "http://tfsapiv1-env.eba-aagv3rp5.ap-southeast-1.elasticbeanstalk.com/api/carts",
      newCart
    )
    .then((res) => {
      console.log("done save cart in productReducer");
      //  getCartById()(res.data.id)
    });
};

function todoProduct(state = initCart, action) {
  switch (action.type) {
    case GET_NUMBER_CART:
      return {
        ...state,
        updateCart: saveCart(state),
      };
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
      };
    case INCREASE_QUANTITY:
      state.numberCart++;
      state.cartsItem[action.payload].quantity++;
      return {
        ...state,
        updateCart: saveCart(state),
      };
    case DECREASE_QUANTITY:
      let quantity = state.cartsItem[action.payload].quantity;
      if (quantity > 1) {
        state.numberCart--;
        state.cartsItem[action.payload].quantity--;
      }
      return {
        ...state,
        updateCart: saveCart(state),
      };
    case DELETE_CART:
      let quantity_ = state.cartsItem[action.payload].quantity;
      return {
        ...state,
        numberCart: state.numberCart - quantity_,
        cartsItem: state.cartsItem.filter((item) => {
          return item.id != state.cartsItem[action.payload].id;
        }),
        // updateCart: saveCart(state)
      };
    case "SET_CART":
      return {
        ...state,
        cartsItem: action.payload,
        cart: action.cart,
      };
    case "SET_CARTITEM":
      return {
        ...state,
        cartsItem: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        numberCart: 0,
        cartsItem: [],
        updateCart: null,
        cart: {},
        account: {},
      };
    default:
      return state;
  }
}
export default todoProduct;
