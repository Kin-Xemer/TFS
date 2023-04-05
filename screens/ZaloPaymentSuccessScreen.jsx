import { useRoute, useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  NativeModules,
  NativeEventEmitter,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import { AddCircle, MinusCirlce } from "iconsax-react-native";
import { useIsFocused } from "@react-navigation/native";
import Lottie from "lottie-react-native";
import {
  Flex,
  Spacer,
  Text,
  Heading,
  Button,
  useToast,
  Box,
} from "native-base";
import { Setting4 } from "iconsax-react-native";
import axios from "axios";
import QRCode from "react-native-qrcode-svg";
import { BASE_URL } from "../services/baseURL";
import { THEME_COLOR } from "../Utils/themeColor";
import { FONT } from "../Utils/themeFont";
import { getCartById } from "../Utils/api/getCart";
import { convertPrice } from "../Utils/convertPrice";
import ActionButton from "../components/ActionButton";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const { PayZaloBridge } = NativeModules;

const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

const subscription = payZaloBridgeEmitter.addListener(
  "EventPayZalo",
  (data) => {
    if (data.returnCode == 1) {
      console.log("payment successful", data);
    } else {
      alert("Pay error! loDKSAJDi ne" + data.returnCode);
      console.log(data);
    }
  }
);
const ZaloPaymentSuccessScreen = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.account.account.customerName);
  const paymentObject = route.params.paymentObject;
  const order = route.params.order;

  useEffect(() => {
    if (isFocused) {
      let url = BASE_URL + "/orders";
      axios
        .post(url, order)
        .then((response) => {
          dispatch({ type: "LOGOUT" });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {/* <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 40,
        }}
      >
        <Text style={[styles.title, { fontSize: 20, color: THEME_COLOR }]}>
          QUÉT QR
        </Text>
      </View> */}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "25%",
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 50 }}>
          <Lottie
            loop={false}
            style={{ height: 180, width: 180 }}
            source={require("../assets/animation/success.json")}
            autoPlay
          />
          <Text
            style={{
              fontSize: 20,
              fontFamily: FONT.BOLD,
              color: "#20BF55",
            }}
          >
            Giao dịch thành công
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          marginTop: 16,
          alignItems: "center",
        }}
      >
        <Flex flexDirection="row" style={styles.infor}>
          <Text style={[styles.title, { color: "gray" }]}>Khách hàng</Text>
          <Spacer />
          <Text style={[styles.title, { fontFamily: FONT.BOLD, fontSize: 16 }]}>
            {username}
          </Text>
        </Flex>
        <Flex flexDirection="row" style={styles.infor}>
          <Text style={[styles.title, { color: "gray" }]}>Mã đơn hàng</Text>
          <Spacer />
          <Text style={[styles.title, { fontFamily: FONT.BOLD, fontSize: 16 }]}>
            # {order.id}
          </Text>
        </Flex>
        <Flex flexDirection="row" style={styles.infor}>
          <Text style={[styles.title, { color: "gray" }]}>Mã giao dịch</Text>
          <Spacer />
          <Text style={[styles.title, { fontFamily: FONT.BOLD, fontSize: 16 }]}>
            {paymentObject.apptransid}
          </Text>
        </Flex>
        <Flex flexDirection="row" style={styles.infor}>
          <Text style={[styles.title, { color: "gray" }]}>Phương thức</Text>
          <Spacer />
          <Text style={[styles.title, { fontFamily: FONT.BOLD, fontSize: 16 }]}>
            Ví ZaloPay
          </Text>
        </Flex>
        <Flex flexDirection="row" style={styles.infor}>
          <Text style={[styles.title, { color: "gray" }]}>Tổng tiền</Text>
          <Spacer />
          <Text
            style={[
              styles.title,
              { fontFamily: FONT.BOLD, color: THEME_COLOR, fontSize: 16 },
            ]}
          >
            {convertPrice(order.totalPrice)} VNĐ
          </Text>
        </Flex>
      </View>
      <ActionButton onPress={() => {
        navigation.navigate("Home")
      }} buttonText="Tiếp tục mua hàng" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: "Quicksand-Medium",
  },
  infor: {
    padding: 16,
  },
  buttonText: {
    fontFamily: "Quicksand-Bold",
    fontSize: 18,
    color: "#fff",
  },
});
export default ZaloPaymentSuccessScreen;
