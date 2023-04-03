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
  serviceList: [],
  serviceListObject: [],
  itemList:[],
  partyTotalPrice:0,
  comboList:[],
  cartId: 0,
  party:null
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
    id:state.cartId,
    cartItems: state.cartsItem,
    numberCart: sum,
    totalPrice: totalPrice,
    comboList: [],
  };
  initCart.numberCart = sum;

  axios
    .put(BASE_URL + "/carts", newCart)
    .then((res) => {})
    .catch((err) => {
      alert("Đã có lỗi xảy ra");
      console.log("Error", err.response.data)
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
        cartId:action.cart.id,
        party: action.cart.party
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
        serviceList: [],
        itemList:[],
        comboList:[],
        serviceListObject: [],
        cartId:0,
        party: null,
        partyTotalPrice:0
      };
    case "SET_PARTY":
      state.party.note = action.payload.note;
      state.party.quantity = action.payload.quantity;
      return {
        ...state,
        // updateCart: saveCart(state, action.payload),
      };
    case "SET_LIST_ITEM_EDIT":
      return {
        ...state,
        itemList: action.payload
      };
    case "PUSH_LIST_ITEM_EDIT":
      let item = {
        foodId: action.payload.id,
        foodImage: action.payload.imgUrl,
        foodName: action.payload.foodName,
        price: action.payload.price * 5,
      };
      state.itemList.push(item);
      return {
        ...state,
      };
      case "DELETE_MENU_ITEM_EDIT":
      return {
        ...state,
        itemList: state.itemList.filter(
          (item) => item.foodId !== action.payload
        ),
      };
      case "SET_PARTY_TOTAL_PRICE":
      return {
        ...state,
        partyTotalPrice: action.payload
      };
    default:
      return state;
  }
}
export default todoProduct;
