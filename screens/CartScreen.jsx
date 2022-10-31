import { useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, Flex } from "native-base";
import ListCart from "../components/ListCartItem/ListCart";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const CartScreen = (props) => {
  // useEffect(() => {
  //   actFetchProductsRequest();
  // });
  //const { product } = actFetchProductsRequest();
  const { food } = props;
  // lay hobby list tu trong redux store
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.cartsItem);
  const deleteItem = (typeAction, id) => {
    dispatch({ type:typeAction, payload:id})
  };
  useEffect(() => {
    console.log("cartitem: " + cartItem.length);
  });

  return (
    <View style={styles.container}>

        <ListCart  deleteItem={deleteItem}/>
   
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "white",
  },
  textStyle: {
    fontFamily: "Quicksand-Bold",
    fontSize: 14,
  },
  itemView: {
    height: 100,
  },
});

export default CartScreen;
