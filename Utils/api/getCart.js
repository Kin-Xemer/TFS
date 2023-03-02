import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../services/baseURL";
export const getCartById = () => {
  return (dispatch, username) => {
    let url =
    BASE_URL +"/customers/cart/" +
      username;
    axios
      .get(url)
      .then((response) => {
        let cartItemArray = []
          response.data.cartItems.map((item, index) =>{
            let cartItem = {
                id: item.id,
                quantity: item.quantity,
                name: item.name,
                image: item.image,
                price: item.price,
                subTotal: item.price * item.quantity
              };
              cartItemArray.push(cartItem);
          })
        dispatch({
            type: "SET_CART",
            payload: cartItemArray,
            cart: response.data,
            numberCart: response.data.numberCart
          });

      })
      .catch((error) => {
        console.log("Error from getCartByID", error);
      });
  };
};
