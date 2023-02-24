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
import { Box, Flex, Spacer } from "native-base";
import { THEME_COLOR } from "../Utils/themeColor";
import SearchField from "../components/SearchField/index.jsx";
import Order from "../components/Order/index";
import StepProgess from "../components/StepProgess/index.jsx";
import OrderInfor from "../components/OrderInfor/index.jsx";
import MyOrderItem from "../components/MyOrderItem/index.jsx";
import OrderButton from "../components/OrderButton/index";
const MyOrderDetailScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const [loginStatus, setLoginStatus] = useState();
  const [isDone, setIsDone] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  const customer = useSelector((state) => state.account.account);
  const restaurantList = useSelector((state) => state.restaurant.restaurant);
  const order = route.params.orders;
  useEffect(() => {
    restaurantList.map((item) => {
      if (item.restaurantId === order.restaurantId) {
        setRestaurant(item);
      }
    });
  }, []);

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
            ĐƠN HÀNG CỦA BẠN
          </Text>
        </View>
      </Flex>
      <StepProgess status={order.status} />
      <OrderInfor order={order} restaurant={restaurant} />
      <MyOrderItem order={order} />
      <Spacer />
      {/* {order.status === "done" || order.status === "deny" ? (
        <OrderButton bgColor={THEME_COLOR}
        buttonText={"Đặt lại"}
        buttonHandler={() => {
          console.log("press");
        }} />
      ) : (
        <OrderButton
        bgColor={"#8c8c8c"}
        buttonText={"Xác nhận huỷ"}
        buttonHandler={() => {
          console.log("press");
        }}
      />
      )} */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  topBar: {
    width: "100%",
    alignItems: "center",
    height: 40,
    backgroundColor: "white",
  },
  title: {
    fontSize: 14,
    fontFamily: "Quicksand-Bold",
  },
});
export default MyOrderDetailScreen;
