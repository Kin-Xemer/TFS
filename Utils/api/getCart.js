import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const getCartById = () => {
  return (dispatch, username) => {
    let url =
      "http://tfsapiv1-env.eba-aagv3rp5.ap-southeast-1.elasticbeanstalk.com/api/customers/cart/" +
      username;
    axios
      .get(url)
      .then((response) => {
        // const saveData = async () => {
        //   try {
        //     console.log("response from getCartByID", response.data.cartItems)
        //     await AsyncStorage.setItem(
        //       "cart",
        //       JSON.stringify(response.data.cartItems)
        //     );
        //   } catch (e) {
        //     console.log(e);
        //   }
        // };
        // saveData();
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
          });

      })
      .catch((error) => {
        console.log("Error from getCartByID", error);
      });
  };
};
