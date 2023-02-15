import { useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ListCart from "../components/ListCartItem/ListCart";
import { useIsFocused } from '@react-navigation/native';
import { getCartById } from '../Utils/api/getCart';
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const CartScreen = (props) => {
  const isFocused = useIsFocused()
  const { food } = props;
  const username = useSelector(
    (state) => state.account.account.theAccount.accountId
  );
  const dispatch = useDispatch();
  const deleteItem = (typeAction, id) => {
    dispatch({ type:typeAction, payload:id})
  };
  useEffect(() => {
    if (isFocused) {
      getCartById()(dispatch,username);
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
        <ListCart deleteItem={deleteItem} isFocused={isFocused}/>
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
