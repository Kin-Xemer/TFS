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
import { useCallback } from "react";
import { Toast } from "@ant-design/react-native";
import CancelOrderModal from "../components/CancelOrderModal/index.jsx";
import { BASE_URL } from "../services/baseURL.js";
const MyOrderDetailScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const [loginStatus, setLoginStatus] = useState();
  const [isDone, setIsDone] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  const [selectedReason, setSelectedReason] = useState("");
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
  useEffect(() => {
 console.log(selectedReason)
  }, [selectedReason]);
  // const onConfirm = useCallback((selectedReason) => {
  //   setIsDone(false);
  //   let newOrder = { ...order, status: "deny", reason: selectedReason };
  //   if (order.paymentMethod === "cash") {
  //     axios
  //       .put(BASE_URL + "/orders", newOrder)
  //       .then(() => {
  //         if (navigation.canGoBack()) {
  //           if (navigation.canGoBack()) {
  //             setIsDone(true);
  //             setIsVisible(false);
  //             navigation.goBack();
  //           }
  //         }
  //       })
  //       .catch((error) => {
  //         alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
  //         console.log(error.response.data);
  //       });
  //   } else {
  //     axios
  //       .get(BASE_URL + "/orders/checkZalopayPayment/" + order.id)
  //       .then((response) => {
  //         if (response.data.returnCode === 1) {
  //           let refundObject = {
  //             amount: order.totalPricce,
  //             orderId: order.id,
  //           };
  //           axios.post(BASE_URL + "/orders/refundZalopay", refundObject).then((res)=>{
  //             if(res.data.returncode === 2){
  //              let mrefundid =  res.data.mrefundid
  //              axios.get(BASE_URL + "/orders/refundStatus/" +mrefundid ).then((refundResponse) => {

  //              }).catch((error) => {
  //               alert("Đã có lỗi xảy ra, vui lòng thử lại sau")
  //               console.log(err.response.data)
  //              })
  //             }
  //           }).catch((err)=>{
  //             alert("Đã có lỗi xảy ra, vui lòng thử lại sau")
  //             console.log(err.response.data)
  //           })
  //         }

  //       })
  //       .catch((error) => {
  //         alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
  //         console.log(error.response.data);
  //       });
  //   }
  // }, []);

  const onConfirm = useCallback(async () => {
    setIsDone(false);

    if (order.paymentMethod === "cash") {
      await updateOrder(selectedReason);
    } else {
      try {
        const response = await axios.get(
          BASE_URL + "/orders/checkZalopayPayment/" + order.id
        );
        if (response.data.returnCode === 1) {
          await refundOrder(order);
        }
      } catch (error) {
        setIsDone(true);
        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
        console.log("/orders/checkZalopayPayment/", error.response.data);
      }
    }
  }, []);

  const refundOrder = async (order) => {
    try {
      const refundObject = {
        amount: order.totalPrice,
        orderId: order.id,
      };
      console.log(refundObject);
      const refundRes = await axios.post(
        BASE_URL + "/orders/refundZalopay",
        refundObject
      );
      if (refundRes.data.returncode === 2) {
        const mrefundid = refundRes.data.mrefundid;
        await checkRefundStatus(mrefundid);
      }
    } catch (error) {
      setIsDone(true);
      alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
      console.log("/orders/refundZalopay", error.response.data);
    }
  };

  const checkRefundStatus = async (mrefundid) => {
    try {
      const refundResponse = await axios.get(
        BASE_URL + `/orders/refundStatus/${mrefundid}`
      );
      console.log(refundResponse.data.returnCode);
      if (refundResponse.data.returnCode === 2) {
        await updateOrder();
      }
    } catch (error) {
      setIsDone(true);
      alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
      console.log("/orders/refundStatus/", error.response.data);
    }
  };
  const updateOrder = async () => {
    try {
      let newOrder = { ...order, status: "deny", reason: selectedReason };
      await axios.put(BASE_URL + "/orders", newOrder);
      if (navigation.canGoBack()) {
        setIsDone(true);
        setIsVisible(false);
        Toast.success("Huỷ đơn hàng thành công", 0.5);
        navigation.goBack();
      }
    } catch (error) {
      setIsDone(true);
      alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
      console.log(error.response.data);
    }
  };
  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
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
        {order.status === "deny" ? (
          <View
            style={{
              marginBottom: 10,
              backgroundColor: "#fadfdf",
              borderWidth: 1,
              borderColor: THEME_COLOR,
              borderRadius: 15,
              padding: 16,
            }}
          >
            <Text style={{ fontFamily: FONT.BOLD, fontSize: 18 }}>
              Đơn hàng bị huỷ
            </Text>
            <Text
              style={{ fontFamily: FONT.MEDIUM, fontSize: 16, marginTop: 10 }}
            >
              Lý do:
            </Text>
            <Text style={{ fontFamily: FONT.MEDIUM, fontSize: 16 }}>
              {order.reason ? order.reason : "Khác"}
            </Text>
          </View>
        ) : (
          <StepProgess status={order.status} />
        )}
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
                    navigation.navigate("MyFeedbackScreen", {
                      id: customer.customerId,
                    });
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
              toggleModal();
            }}
          />
        )}
      </ScrollView>
      <BackButton />
      <CancelOrderModal
        isDone={isDone}
        isVisible={isVisible}
        onCancel={toggleModal}
        onConfirm={onConfirm}
        selectedReason={selectedReason}
        setSelectedReason={setSelectedReason}
      />
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
