import { useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ListCart from "../components/ListCartItem/ListCart";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const CartScreen = (props) => {
  const { food } = props;
  // lay hobby list tu trong redux store
  const dispatch = useDispatch();
  const deleteItem = (typeAction, id) => {
    dispatch({ type:typeAction, payload:id})
  };

  return (
    <View style={styles.container}>
        <ListCart deleteItem={deleteItem}/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default CartScreen;
