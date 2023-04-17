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
  itemList: [],
  partyTotalPrice: 0,
  comboList: [],
  cartId: 0,
  party: null,
  totalPrice: 0,
};

let sum = 0;
let totalPrice = 0;
const saveCart = (state) => {
  sum = state.cartsItem.reduce((total, item) => total + item.quantity, 0);
  totalPrice = state.cartsItem.reduce((total, item) => total + item.subTotal, 0);


  const newCart = {
    id: state.cartId,
    cartItems: state.cartsItem,
    numberCart: sum,
    totalPrice: totalPrice,
    comboList: [],
    party: state.party,
  };
  // initCart.numberCart = sum;
  // console.log("new cart", newCart)
  axios
    .put(BASE_URL + "/carts", newCart)
    .then((res) => {
      initCart.cartId = res.data.id;
      initCart.cartsItem = res.data.cartItems;
      initCart.numberCart = res.data.numberCart;
      initCart.totalPrice = res.data.totalPrice;
      initCart.comboList = res.data.comboList;
      initCart.party = res.data.party;
    })
    .catch((err) => {
      alert("Đã có lỗi xảy ra");
      if (err.response.data) {
        console.log("Error add to cart", err.response.data);
      } else {
        console.log(err);
      }
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
          type: action.payload.type,
          description: action.payload.description,
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
            type: action.payload.type,
            description: action.payload.description,
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
      return {
        ...state,
        cartsItem: action.payload,
        cart: action.cart,
        numberCart: action.numberCart ? action.numberCart : 0,
        cartId: action.cart.id,
        party: action.cart.party,
        totalPrice: action.cart.totalPrice,
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
        itemList: [],
        comboList: [],
        serviceListObject: [],
        cartId: 0,
        party: null,
        partyTotalPrice: 0,
        totalPrice: 0,
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
        itemList: action.payload,
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
        partyTotalPrice: action.payload,
      };
    case "SAVE_DATA_CART":
      return {
        ...state,
        updateCart: saveCart(state),
      };
    default:
      return state;
  }
}
export default todoProduct;
