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
import { useState, useMemo, useEffect, useCallback } from "react";
import Home from "../components/Home/index.jsx";
import { Box, Flex, Spinner } from "native-base";
import { THEME_COLOR } from "../Utils/themeColor";
import DropDownPicker from "react-native-dropdown-picker";
import { ArrowUp3, ArrowDown3 } from "iconsax-react-native";
import Order from "../components/Order/index";
import { FONT } from "../Utils/themeFont.js";
import { BASE_URL } from "../services/baseURL.js";
import NotLoginScreen from "./NotLoginScreen.jsx";
const OrderScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const status = useSelector((state) => state.status.status);
  const currentFilter = useSelector((state) => state.status.currentFilter);
  const isLogin = useSelector((state) => state.account.isLogin);
  const customerId = useSelector((state) => state.account.account.customerId);
  const [orders, setOrders] = useState([]);
  const [filterOrder, setFilterOrder] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const username = useSelector((state) => state.account.account);
  const [items, setItems] = useState([
    { label: "Tất cả", value: "all" },
    {
      label: "Đang chờ ",
      value: "pending",
    },
    { label: "Đã xác nhận", value: "accept" },
    {
      label: "Đang giao hàng",
      value: "delivery",
    },
    {
      label: "Nhận hàng",
      value: "done",
    },
    { label: "Bị huỷ", value: "deny" },
  ]);

  const handleSelectedItem = useCallback((filter) => {
    dispatch({ type: "SET_CURRENT_FILTER", payload: filter });
    if (status !== "") {
      if (filter !== "all") {
        setFilterOrder(orders.filter((orders) => orders.status === filter));
        dispatch({
          type: "SET_ORDER_STATUS",
          payload: orders.filter((orders) => orders.status === filter),
        });
      } else {
        setFilterOrder(orders);
        dispatch({ type: "SET_ORDER_STATUS", payload: orders });
      }
    }
  },[dispatch, orders, status]);

  const getAllOrder = useCallback(() => {
    setIsDone(false);
    let url = BASE_URL + "/orders/customer/" + customerId;
    axios
      .get(url)
      .then((res) => {
        setIsDone(true);
        res.data.sort(
          (item) =>
            new Date(item.orderDate).getTime() - new Date().getTime() < 0
        );
          
        setOrders(res.data);
        if (status === null && status !== "") {
          setFilterOrder(res.data);
          setValue("all");
        } else if (status === "") {
          setFilterOrder([]);
        } else if (status !== null && status !== "") {
          if (currentFilter === "all") {
            dispatch({
              type: "SET_ORDER_STATUS",
              payload: res.data,
            });
            setFilterOrder(res.data);
          } else {
            dispatch({
              type: "SET_ORDER_STATUS",
              payload: res.data.filter(
                (orders) => orders.status === currentFilter
              ),
            });
            setFilterOrder(
              res.data.filter((orders) => orders.status === currentFilter)
            );
          }
        }
      })
      .catch((error) => {
        console.log("OrderScreen", error);
      });
  }, [customerId, status, currentFilter, dispatch]);
  useEffect(() => {
    !isLogin ? navigation.navigate("LoginScreenn") : "";
    if (isFocused) {
      getAllOrder();
      if (status !== null && status !== "") {
        // setFilterOrder(status);
      }
    }
  }, [isFocused]);
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
      {/* {isDone ? <View>
        <SearchField isFocused={isFocused} orders={orders} isDone={isDone} />
        <Order isFocused={isFocused} orders={orders} isDone={isDone} />
      </View>:<Text>doi xiu</Text>} */}
      <View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          placeholder={"Trạng thái"}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          dropDownContainerStyle={{
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: "#c8c8c8",
          }}
          listItemLabelStyle={styles.itemTextStyle}
          placeholderStyle={{
            color: "grey",
            fontFamily: FONT.SEMI,
            fontSize: 16,
          }}
          style={{ borderRadius: 15, borderColor: "#c8c8c8", width: "45%" }}
          textStyle={{ fontFamily: FONT.SEMI, fontSize: 16 }}
          onSelectItem={(item) => {
            handleSelectedItem(item.value);
          }}
        />
        {isLogin ? (
          isDone ? (
            <Order isFocused={isFocused} orders={filterOrder} isDone={isDone} />
          ) : (
            <Spinner />
          )
        ) : (
          <NotLoginScreen />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "white",
    paddingHorizontal: 16,
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
  itemTextStyle: {
    fontFamily: "Quicksand-Regular",
    fontSize: 16,
  },
  
});
export default OrderScreen;
