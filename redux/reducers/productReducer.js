import {
  GET_ALL_PRODUCT,
  GET_NUMBER_CART,
  ADD_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  DELETE_CART,
} from "../actions/productAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
const initCart = {
  numberCart: 0,
  cartsItem: [],
};


// const saveCart = async (state) => {
//   console.log("saved")
//   try {
//     const cus = await AsyncStorage.getItem("customer");
//     if (cus !== null) {
//       const customerParsed = JSON.parse(cus);
//       let cusName = customerParsed.theAccount.accountId;
//       await AsyncStorage.setItem(cusName, JSON.stringify(state));
//     }
//   } catch (e) {
//     console.log(e);
//     console.log("Failed to fetch the data from storage");
//   }
// };

function todoProduct(state = initCart, action) {
  switch (action.type) {
    case GET_ALL_PRODUCT:
      return {
        ...state,
      };
    case GET_NUMBER_CART:
      return {
        ...state,
      };
    case "APPLY_ITEM":
      return {
        ...state,
        numberCart: action.payload.numberCart,
      };
    case ADD_CART:
      if (state.numberCart == 0) {
        let cart = {
          id: action.payload.id,
          quantity: action.quantity,
          name: action.payload.foodName,
          image: action.payload.imgUrl,
          price: action.payload.price,
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
          };
          state.cartsItem.push(_cart);
        }
      }
    
      return {
        ...state,
        numberCart: state.numberCart + action.quantity,
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
