import { Flex } from "native-base";
import { useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { connect, useSelector, useDispatch } from "react-redux";
import { Button } from "native-base";
import ListCart from "../components/testComponent/ListCart";
import { faker } from "@faker-js/faker";
import { addNewHobby } from "../redux/actions/hobby";
import { actFetchProductsRequest } from "../redux/actions/productAction";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const CartScreen = (props) => {
  // useEffect(() => {
  //   actFetchProductsRequest();
  // });
  //const { product } = actFetchProductsRequest();
  const { food, } = props;
  // lay hobby list tu trong redux store
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.cartsItem);
  useEffect(() => {
    console.log("cartitem: " + cartItem.length)
  });

  return (
    <View style={styles.container}>
      <View style={{ marginLeft: 4 }}>
        <Text>List Cart</Text>
        <View>
          <ListCart list={cartItem} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
