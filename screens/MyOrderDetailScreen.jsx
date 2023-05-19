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
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { Flex } from "native-base";
import { THEME_COLOR } from "../Utils/themeColor";
import StepProgess from "../components/StepProgess/index.jsx";
import OrderInfor from "../components/OrderInfor/index.jsx";
import MyOrderItem from "../components/MyOrderItem/index.jsx";
import OrderButton from "../components/OrderButton/index";
import BackButton from "../components/BackButton/index.jsx";
import { FONT } from "../Utils/themeFont.js";
import { useCallback } from "react";
import { Toast } from "@ant-design/react-native";
import CancelOrderModal from "../components/CancelOrderModal/index.jsx";
import { BASE_URL } from "../services/baseURL.js";
import AlertPopup from "../components/AlertPopup";
import { convertPrice } from "../Utils/convertPrice";
import PopupRefund from "../components/AlertPopup/PopupRefund";
const MyOrderDetailScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isDone, setIsDone] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [restaurant, setRestaurant] = useState({});

  const [selectedReason, setSelectedReason] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
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

  const onConfirm = useCallback(async () => {
    setIsDone(false);
    if (order.paymentMethod === "cash") {
      await updateOrder();
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
  }, [selectedReason]);

  const onConfirmRefund = async()=>{
    await updateOrder();
    setIsOpen(false)
  }
  const refundOrder = useCallback(async (order) => {
    try {
      if (order.totalPrice > 9999999) {
        setIsDone(true);
        toggleModal();
        setIsOpen(true)
      } else {
        const refundObject = {
          amount: order.totalPrice,
          orderId: order.id,
        };
        const refundRes = await axios.post(
          BASE_URL + "/orders/refundZalopay",
          refundObject
        );
        if (refundRes.data.returncode === 2) {
          const mrefundid = refundRes.data.mrefundid;
          await checkRefundStatus(mrefundid);
        }
      }
    } catch (error) {
      setIsDone(true);
      alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }, [ toggleModal, setIsOpen, checkRefundStatus,order]);

  const checkRefundStatus = useCallback(async (mrefundid) => {
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
  }, []);
  
  const updateOrder = useCallback(async () => {
    try {
      let newOrder = {
        orderId: order.id,
        reason: selectedReason,
        staffId: 8,
        status: "deny",
      };
      console.log(newOrder);
  
      await axios.put(BASE_URL + "/orders/status", newOrder);
      if (navigation.canGoBack()) {
        setIsDone(true);
        setIsVisible(false);
        Toast.success("Huỷ đơn hàng thành công", 0.5);
        navigation.goBack();
      }
    } catch (error) {
      setIsDone(true);
      alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }, [order.id, selectedReason, navigation]);
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
            <View style={{ width: 0, marginRight: 0 }}>
              {/* <OrderButton
                bgColor={THEME_COLOR}
                buttonText={"Đặt lại"}
                buttonHandler={() => {
                  console.log("press");
                }}
              /> */}
            </View>
            {!order.feedbackStatus ? (
              <View style={{ width: "100%" }}>
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
              <View style={{ width: "98%" }}>
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
          // <OrderButton
          //   bgColor={THEME_COLOR}
          //   buttonText={"Đặt lại"}
          //   buttonHandler={() => {
          //     console.log("press");
          //   }}
          // />
          <></>
        ) : (
          <OrderButton
            bgColor={"#d9d9d9"}
            buttonText={"Xác nhận huỷ"}
            buttonHandler={() => {
              // toggleModal();
              console.log("date", order.deliveryDate)
            }}
          />
        )}
      </ScrollView>
      <BackButton />
      <CancelOrderModal
        isDone={isDone}
        setIsDone={setIsDone}
        isVisible={isVisible}
        onCancel={toggleModal}
        onConfirm={onConfirm}
        selectedReason={selectedReason}
        setSelectedReason={setSelectedReason}
        order={order}
      />
      <PopupRefund
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={onConfirmRefund}
        cancelText={"Huỷ"}
        title={<Text style={{ fontFamily: FONT.BOLD , fontSize: 21}}>Cảnh báo</Text>}
        content={
          <Text>
            Đơn hàng của bạn đã cọc{" "}
            <Text style={{ fontFamily: FONT.BOLD }}>
              {convertPrice(order.totalPrice * 0.1)} đ
            </Text>{" "}
            và sử dụng phương thức thanh toán Zalopay.
          </Text>
        }
        content2={
          <Text>
            Nếu bạn chọn tiếp tục, đơn hàng sẽ{" "}
            <Text style={{ fontFamily: FONT.BOLD }}>không được hoàn tiền</Text>.
            Bạn có muốn tiếp tục?
          </Text>
        }
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
