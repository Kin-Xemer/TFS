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
  const cart = useSelector((state) => state.cart.cart);
  const account = useSelector(
    (state) => state.account.account.theAccount.accountId
  );
  const username = useSelector((state) => state.account.account.customerName);

  const [paymentStatus, setPaymentStatus] = useState();
  const [isDone, setIsDone] = useState(false);
  const paymentObject = route.params.paymentResponse;
  const order = route.params.order;

  useEffect(() => {}, []);
  const payOrder = () => {
    var payZP = NativeModules.PayZaloBridge;
    payZP.payOrder(paymentObject.zptranstoken);
  };
  // const [orderStatus, setOrderStatus] = useState(route.params.order.status);
  useEffect(() => {
    checkPayment();
    //   checkOrderPayment();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      checkPayment();
      //  checkOrderPayment();
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (paymentStatus && paymentStatus.returnCode === 1) {
      setIsDone(false);
      let url = BASE_URL + "/orders";
      axios.post(url, order).then((response) => {
        setPaymentStatus({...paymentStatus, returnCode: response});
        const newCart = {
          ...cart,
          cartItems: [],
          numberCart: 0,
          totalPrice: 0,
        };
        axios
          .put(BASE_URL + "/carts", newCart)
          .then((res) => {
            setIsDone(true);
            
            dispatch({ type: "LOGOUT" });
            //  navigation.navigate("Home");
          })
          .catch((err) => {
            alert("Update Cart: ", err);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
    }
  }, [paymentStatus]);

  useEffect(() => {
    if (isFocused) {
      // getCartById()(dispatch,account);
    }
  }, [isFocused]);

  const checkPayment = () => {
    let url = BASE_URL + "/orders/checkPayment/" + paymentObject.apptransid;
    axios.get(url).then((res) => {
      setPaymentStatus(res.data);
    });
  };
  // const checkOrderPayment = () => {
  //   let url = BASE_URL + "/orders/" + order.id;
  //   axios.get(url).then((res) => {
  //     setOrderStatus(res.data.status);
  //   });
  // };
  return (
    <View style={styles.container}>
      <View
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
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "25%",
        }}
      >
        {/* {orderStatus === "waiting" ? (
          paymentStatus && paymentStatus.returnCode === -49 ? (
            <QRCode value={paymentObject.zaloUrl} size={150} />
          ) : (
            <View>
              {paymentStatus.returnCode === -244 ? (
                <Text
                  style={{ fontSize: 20, fontFamily: FONT.BOLD, color: "red" }}
                >
                  Đơn hàng bị từ chối giao dịch
                </Text>
              ) : paymentStatus.returnCode === 10 ? (
                <View style={{ alignItems: "center", marginBottom: 50 }}>
                  <Lottie
                    style={{ height: 180, width: 180 }}
                    source={require("../assets/animation/2.json")}
                    autoPlay
                    loop
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: FONT.BOLD,
                      color: "#FFB302",
                    }}
                  >
                    Đang tiến hành giao dịch
                  </Text>
                </View>
              ) : paymentStatus.returnCode === 1 && orderStatus !=="waiting"? (
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
              ) : (
                ""
              )}
            </View>
          )
        ) : (
          <View style={{ alignItems: "center", marginBottom: 50 }}>
          <Lottie
            style={{ height: 180, width: 180 }}
            source={require("../assets/animation/130714-cala-waiting-04.json")}
            autoPlay
            loop
          />
          <Text
            style={{
              fontSize: 20,
              fontFamily: FONT.BOLD,
              color: "#FFB302",
            }}
          >
            Đơn hàng đang chờ xác nhận
          </Text>
        </View>
        ) } */}
        {paymentStatus && paymentStatus.returnCode === 1 ? (
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
        ) : paymentStatus &&paymentStatus.returnCode === 10 ? (
          <View style={{ alignItems: "center", marginBottom: 50 }}>
            <Lottie
              style={{ height: 180, width: 180 }}
              source={require("../assets/animation/2.json")}
              autoPlay
              loop
            />
            <Text
              style={{
                fontSize: 20,
                fontFamily: FONT.BOLD,
                color: "#FFB302",
              }}
            >
              Đang tiến hành giao dịch
            </Text>
          </View>
        ) : paymentStatus &&paymentStatus.returnCode === -244 ? (
          <Text style={{ fontSize: 20, fontFamily: FONT.BOLD, color: "red" }}>
            Đơn hàng bị từ chối giao dịch
          </Text>
        ) : null}
      </View>
      <Text>{JSON.stringify(paymentObject)}</Text>
      <Text>{JSON.stringify(paymentStatus &&paymentStatus)}</Text>
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
      <TouchableOpacity
        style={{ position: "absolute", marginTop: 50 }}
        onPress={() => {
          navigation.goBack();
        }}
        activeOpacity={1}
      >
        <Entypo name="chevron-left" size={36} color={THEME_COLOR} />
      </TouchableOpacity>

      {/* {paymentStatus.returnCode === 1 ? (
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.buttonText}>Tiếp tục mua hàng</Text>
        </TouchableOpacity>
      ) : null} */}

      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.8}
        onPress={() => {
          payOrder();
        }}
      >
        <Text style={styles.buttonText}>Tiếp tục mua hàng</Text>
      </TouchableOpacity>
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
  buttonStyle: {
    marginTop: 50,
    borderRadius: 15,
    backgroundColor: THEME_COLOR,
    height: 47,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Quicksand-Bold",
    fontSize: 18,
    color: "#fff",
  },
});
export default ZaloPaymentSuccessScreen;

