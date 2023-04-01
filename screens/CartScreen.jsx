import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ListCart from "../components/ListCartItem/ListCart";
import { useIsFocused } from '@react-navigation/native';
import { getCartById } from '../Utils/api/getCart';
import { BASE_URL } from "../services/baseURL";
import axios from "axios";
const CartScreen = () => {
  const isFocused = useIsFocused()
  const [service, setService] = useState();
  const username = useSelector(
    (state) => state.account.account.theAccount.accountId
  );
  const dispatch = useDispatch();
  const deleteItem = (typeAction, id) => {
    dispatch({ type:typeAction, payload:id})
  };
  const getService = () =>{
    axios.get(BASE_URL + "/services").then((res) =>{
      setService(res.data)
    })
  }
  useEffect(() => {
    if (isFocused) {
      getService();
      getCartById()(dispatch,username);
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
        <ListCart service={service} deleteItem={deleteItem} isFocused={isFocused}/>
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
