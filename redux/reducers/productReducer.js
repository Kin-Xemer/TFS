import {
  GET_ALL_PRODUCT,
  GET_NUMBER_CART,
  ADD_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  DELETE_CART,
} from "../actions/productAction";

const initProduct = {
  numberCart: 0,
  cartsItem: [],
  _products: [],
};

function todoProduct(state = initProduct, action) {
  switch (action.type) {
    case GET_ALL_PRODUCT:
      return {
        ...state,
        _products: action.payload,
      };
    case GET_NUMBER_CART:
      return {
        ...state,
      };
    case ADD_CART:
      if (state.numberCart == 0) {
        let cart = {
          id: action.payload.id,
          quantity: 1,
          name: action.payload.foodName,
          image: action.payload.imgURL,
          price: action.payload.price,
        };
        state.cartsItem.push(cart);
      } else {
        let check = false;
        state.cartsItem.map((item, key) => {
          if (item.id == action.payload.id) {
            state.cartsItem[key].quantity++;
            check = true;
          }
        });
        if (!check) {
          let _cart = {
            id: action.payload.id,
            quantity: 1,
            name: action.payload.foodName,
            image: action.payload.imgURL,
            price: action.payload.price,
          };
          state.cartsItem.push(_cart);
        }
      }
      return {
        ...state,
        numberCart: state.numberCart + 1,
      };
    case INCREASE_QUANTITY:
      state.numberCart++;
      state.cartsItem[action.payload].quantity++;

      return {
        ...state,
      };
    case DECREASE_QUANTITY:
      let quantity = state.cartsItem[action.payload].quantity;
      if (quantity > 1) {
        state.numberCart--;
        state.cartsItem[action.payload].quantity--;
      }

      return {
        ...state,
      };
    case DELETE_CART:
      let quantity_ = state.cartsItem[action.payload].quantity;
      return {
        ...state,
        numberCart: state.numberCart - quantity_,
        cartsItem: state.cartsItem.filter((item) => {
          return item.id != state.cartsItem[action.payload].id;
        }),
      };
    default:
      return state;
  }
}
export default todoProduct;
