import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Provider } from "@ant-design/react-native";
import { Entypo } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import Home from "../components/Home/index.jsx";
import { Box, Flex } from "native-base";
import { THEME_COLOR } from '../Utils/themeColor';
import SearchField from "../components/SearchField/index.jsx";
import Order from '../components/Order/index';
const OrderScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const [loginStatus, setLoginStatus] = useState();
  const [orders, setOrders] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const customerId = useSelector((state) => state.account.account.customerId);
  const getAllOrder = () => {
    setIsDone(false);
    let url =
      "http://tfsapiv1-env.eba-aagv3rp5.ap-southeast-1.elasticbeanstalk.com/api/orders/customer/" + customerId;
    axios
      .get(url)
      .then((res) => {
        setIsDone(true)
        setOrders(res.data)
      })
      .catch((error) => {
        console.log("OrderScreen", error);
      });
  };
  useEffect(() => {
   if(isFocused) {
    getAllOrder();
   }
  },[isFocused]);
  return (
    <View style={styles.container}>
      <Flex style={styles.topBar} direction="row">
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Text style={[styles.title, { fontSize: 20, color: THEME_COLOR }]}>
            LỊCH SỬ ĐƠN HÀNG
          </Text>
        </View>
      </Flex>
      <SearchField isFocused={isFocused} orders={orders} isDone={isDone} />
      <Order isFocused={isFocused} orders={orders} isDone={isDone} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    backgroundColor: "white",
    paddingHorizontal: 16
  },
  textStyle: {
    fontFamily: "Quicksand-Regular",
  },
  textHeader: {
    fontSize: 30,
  },
  title: {
    fontSize: 14,
    fontFamily: "Quicksand-Bold",
  },
  topBar: {
    width: "100%",
    alignItems: "center",
    height: 40,
    backgroundColor: "white",
  },
});
export default OrderScreen;
