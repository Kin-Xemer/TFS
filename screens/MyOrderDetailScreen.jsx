import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Provider } from "@ant-design/react-native";
import { Entypo } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import Home from "../components/Home/index.jsx";
import { Box, Button, Flex, Spacer } from "native-base";
import { THEME_COLOR } from "../Utils/themeColor";
import SearchField from "../components/SearchField/index.jsx";
import Order from "../components/Order/index";
import StepProgess from "../components/StepProgess/index.jsx";
import OrderInfor from "../components/OrderInfor/index.jsx";
import MyOrderItem from "../components/MyOrderItem/index.jsx";
import OrderButton from "../components/OrderButton/index";
import ActionButton from "../components/ActionButton/index.jsx";
import BackButton from "../components/BackButton/index.jsx";
import { FONT } from "../Utils/themeFont.js";
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
  const handleButton = () => {};
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepProgess status={order.status} />
        <OrderInfor order={order} restaurant={restaurant} />
        <MyOrderItem order={order} />

        {order.status === "done" ? (
          <Flex flexDirection={"row"}>
            <View style={{ width: "49%", marginRight: 8 }}>
              <OrderButton
                bgColor={THEME_COLOR}
                buttonText={"Đặt lại"}
                buttonHandler={() => {
                  console.log("press");
                }}
              />
            </View>
            {!order.feedbackStatus ? (
              <View style={{ width: "49%" }}>
                <TouchableOpacity
                  style={[styles.buttonStyle, { backgroundColor: "#ffc746" }]}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate("FeedbackScreen", { order: order });
                  }}
                >
                  <Text style={styles.buttonText}>Đánh giá</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ width: "49%" }}>
                <TouchableOpacity
                  style={[styles.buttonStyle, { backgroundColor: "#ffc746" }]}
                  activeOpacity={0.8}
            
                  onPress={() => {
                    navigation.navigate("MyFeedbackScreen", {id: customer.customerId});
                  }}
                >
                  <Text style={styles.buttonText}>Xem đánh giá</Text>
                </TouchableOpacity>
              </View>
            )}
          </Flex>
        ) : order.status === "deny" ? (
          <OrderButton
            bgColor={THEME_COLOR}
            buttonText={"Đặt lại"}
            buttonHandler={() => {
              console.log("press");
            }}
          />
        ) : (
          <OrderButton
            bgColor={"#d9d9d9"}
            buttonText={"Xác nhận huỷ"}
            buttonHandler={() => {
              console.log("press");
            }}
          />
        )}
      </ScrollView>
      <BackButton />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingBottom: 10,
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
  buttonText: {
    fontFamily: FONT.BOLD,
    fontSize: 18,
    color: "#fff",
  },
  buttonStyle: {
    borderRadius: 15,
    backgroundColor: THEME_COLOR,
    height: 47,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default MyOrderDetailScreen;
