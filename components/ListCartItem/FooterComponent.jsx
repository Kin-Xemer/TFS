import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Flex, Spacer, Divider, Image, Box, Button, Text } from "native-base";
import { THEME_COLOR } from "../../Utils/themeColor";
import { convertPrice } from "../../Utils/convertPrice";
import DetailTextStyle from "./DetailTextStyle";
import { FONT } from "../../Utils/themeFont";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const FooterComponent = (props) => {
  const {
    totalCart,
    discount,
    deliveryFee,
    servicesFee,
    setPaymentMethod,
    setInvisible,
    toggleModal,
    listSelectedService,
  } = props;
  const navigation = useNavigation();
  const [payment, setPayment] = useState("cash");
  let arrayPayment = [
    {
      payment: "cash",
      textPayment: "Thanh toán khi nhận hàng",
      url: require("../../assets/icons/cash.png"),
      size: 35,
    },
    {
      payment: "ZaloPay",
      textPayment: "Thanh toán qua ví ZaloPay",
      url: require("../../assets/icons/zalo.png"),
      size: 35,
    },
  ];

  return (
    <ImageBackground
      source={require("../../assets/nen.png")}
      resizeMode="stretch"
      style={{ paddingBottom: 20 }}
    >
      <View style={{ backgroundColor: "white", paddingHorizontal: 16 }}>
        <Divider style={{ marginVertical: 8 }} thickness={3} bg="#e4e2e2" />
      {listSelectedService.length > 0 ?   <View style={{ marginVertical: 6 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Quicksand-Bold",
              color: "#8c8c8c",
            }}
          >
            DỊCH VỤ
          </Text>
        </View> : null}
        <View>
         <View style={{ marginBottom: 10 }}>
         {listSelectedService.map((item, index) => {
            return (
              <Flex flexDirection={"row"} key={index} style={{ paddingVertical: 4}}>
                <Text style={{ fontSize: 14, fontFamily: FONT.SEMI }}>
                  {item.serviceName}
                </Text>
                <Spacer />
                <Text style={{ fontSize: 14, fontFamily: FONT.SEMI }}> + {convertPrice(item.servicePrice)} đ</Text>
              </Flex>
            );
          })}
         </View>

          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => {
              toggleModal();
            }}
          >
            {listSelectedService.length > 0 ? (
              <Text
                style={{
                  fontSize: 13,
                  color: THEME_COLOR,
                  fontFamily: FONT.BOLD,
                }}
              >
                Sửa dịch vụ
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 13,
                  color: THEME_COLOR,
                  fontFamily: FONT.BOLD,
                }}
              >
                Thêm dịch vụ
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <Divider style={{ marginVertical: 8 }} thickness={3} bg="#e4e2e2" />
        <Flex direction="row" style={{ alignItems: "center" }}>
          <View style={styles.locationHeader}>
            <Flex direction="row" style={{ marginBottom: 4 }}>
              <View>
                <Text style={[styles.textStyle, styles.addressText]}>
                  Bạn cần thêm gì nữa không ?
                </Text>
              </View>
            </Flex>

            <Text style={[styles.textStyle]}>
              Chọn thêm món khác nếu bạn muốn
            </Text>
          </View>
          <Spacer />
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={styles.changeButton}>
              <Text
                style={{
                  fontSize: 13,
                  color: THEME_COLOR,
                  fontFamily: "Quicksand-Bold",
                }}
              >
                Thêm món
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </Flex>
        <Divider style={{ marginTop: 8 }} thickness={3} bg="#e4e2e2" />
      </View>
      <Flex style={styles.voucherView}>
        <View style={{ marginLeft: 8, justifyContent: "center" }}>
          <Flex flexDirection={"row"} style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontFamily: "Quicksand-Bold" }}>
              Phương thức thanh toán
            </Text>
          </Flex>
          <Flex marginTop={3}>
            {arrayPayment.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setPayment(item.payment);
                    setPaymentMethod(item.payment);
                  }}
                  key={index}
                  activeOpacity={0.5}
                >
                  <Flex
                    style={
                      payment === item.payment
                        ? styles.paymentSelected
                        : styles.paymentUnSelected
                    }
                    flexDirection="row"
                  >
                    <Box>
                      <Image
                        source={item.url}
                        alt={item.textPayment}
                        h={item.size}
                        w={item.size}
                      />
                    </Box>
                    {"   "}
                    <Text
                      style={
                        payment === item.payment
                          ? styles.textActive
                          : styles.textInActive
                      }
                    >
                      {item.textPayment}
                    </Text>
                  </Flex>
                </TouchableOpacity>
              );
            })}
          </Flex>
        </View>
      </Flex>

      <Flex style={styles.orderDetailView}>
        <Flex direction="row" style={styles.textView}>
          <Text style={{ fontFamily: "Quicksand-Bold", fontSize: 15 }}>
            Chi tiết đơn hàng
          </Text>
        </Flex>
        <DetailTextStyle textName="Giá tiền" price={totalCart} />
        <DetailTextStyle textName="Phí giao hàng" price={deliveryFee} />
        <DetailTextStyle textName="Phí dịch vụ" price={servicesFee} />
        <Flex direction="row" style={styles.textView}>
          <Text
            style={{
              fontFamily: "Quicksand-Regular",
              fontSize: 14,
              color: "#898989",
            }}
          >
            Giảm giá
          </Text>
          <Spacer />
          <Text
            style={{
              fontFamily: "Quicksand-Regular",
              fontSize: 14,
              color: "#898989",
              textDecorationLine: "line-through",
            }}
          >
            {convertPrice(discount)} đ
          </Text>
        </Flex>
        <Divider style={{ marginVertical: 8 }} thickness={2} bg="#e4e2e2" />
        <Flex direction="row" style={styles.textView}>
          <Text
            style={{
              fontFamily: "Quicksand-Bold",
              fontSize: 14,
            }}
          >
            Tổng thanh toán
          </Text>
          <Spacer />
          <Text
            style={{
              fontFamily: "Quicksand-Bold",
              fontSize: 16,
            }}
          >
            {convertPrice(totalCart + servicesFee + deliveryFee - discount)} đ
          </Text>
        </Flex>
        <Divider style={{ marginVertical: 8 }} thickness={2} bg="#e4e2e2" />
        <Flex direction="row">
          <Text
            style={{
              fontFamily: "Quicksand-SemiBold",
              fontSize: 13,
              color: THEME_COLOR,
            }}
          >
            Xem chi tiết
          </Text>
          <Spacer />
          <Entypo name="chevron-right" size={15} color={THEME_COLOR} />
        </Flex>
      </Flex>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "Quicksand-Regular",
    fontSize: 12,
  },
  addressText: {
    fontFamily: "Quicksand-Bold",
  },
  changeButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: THEME_COLOR,
    borderRadius: 50,
    padding: 4,
    paddingHorizontal: 10,
  },
  locationHeader: {
    marginVertical: 4,
  },
  voucherView: {
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "silver",
    borderRadius: 15,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: "white",
  },
  orderDetailView: {
    borderWidth: 0.5,
    borderColor: "silver",
    borderRadius: 15,
    marginTop: 10,
    marginHorizontal: 16,
    padding: 22,
    backgroundColor: "white",
  },
  textView: {
    marginVertical: 6,
  },
  paymentUnSelected: {
    alignItems: "center",
    width: "100%",
    borderWidth: 0.8,
    borderColor: "gray",
    marginBottom: 4,
    padding: 12,
    borderRadius: 15,
  },
  paymentSelected: {
    alignItems: "center",
    width: "100%",
    borderWidth: 1.5,
    borderColor: THEME_COLOR,
    backgroundColor: "#ffefef",
    marginBottom: 4,
    padding: 12,
    borderRadius: 15,
  },
  textInActive: {
    fontFamily: FONT.MEDIUM,
    fontSize: 15,
  },
  textActive: {
    fontFamily: FONT.BOLD,
    fontSize: 16,
  },
});
export default FooterComponent;
