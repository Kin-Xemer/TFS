import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
  TextInput,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Flex,
  Spacer,
  Divider,
  Image,
  Box,
  Button,
  Text,
  Input,
} from "native-base";
import { THEME_COLOR } from "../../Utils/themeColor";
import { convertPrice } from "../../Utils/convertPrice";
import DetailTextStyle from "./DetailTextStyle";
import { FONT } from "../../Utils/themeFont";
import DatePicker from "react-native-date-picker";
import { useSelector } from "react-redux";
import Party from "./Party";
import { Calendar, Calendar2 } from "iconsax-react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { convertDateToString } from "../../Utils/convertDate";
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
    togglePicker,
    currentDate
  } = props;
  const navigation = useNavigation();
  const party = useSelector((state) => state.cart.party);
  const [payment, setPayment] = useState("cash");

  // const [selectedDate,setSelectedDate] = useState(new Date().format("DD-MM-yyyy"));
  const [selectedDate,setSelectedDate] = useState(convertDateToString(currentDate));
  const [open, setOpen] = useState(false);
  let date = new Date();
  let maxDate = new Date()
  maxDate.setDate(date.getDate() + 7)
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
  const onChangeDate = (event, selectedDate) => {
    setOpen(false)
    setSelectedDate(convertDateToString(selectedDate))
  };
  return (
    <ImageBackground
      source={require("../../assets/nen.png")}
      resizeMode="stretch"
      style={{ paddingBottom: 20 }}
    >
      <View style={{ backgroundColor: "white", paddingHorizontal: 16 }}>
        <Divider style={{ marginVertical: 8 }} thickness={3} bg="#e4e2e2" />
        {party ? (
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Quicksand-Bold",
                color: "#8c8c8c",
                marginBottom: 12,
              }}
            >
              THỰC ĐƠN
            </Text>
            <Party party ={party} />
         
            <Flex
              flexDirection={"row"}
              alignItems="center"
              alignSelf={"flex-end"}
              mt={5}
            >
              <Text
               style={{
                fontSize: 16,
                fontFamily: FONT.SEMI,
                padding: 4,
              }}>
                Chọn ngày giao
              </Text>
              <Spacer/>
              <TouchableOpacity
                onPress={() => {
                  setOpen(true);
                }}
              >
                <Calendar2 size="30" color={"black"} variant="Outline" />
              </TouchableOpacity>
              <TextInput
                style={{
                  marginVertical: 2,
                  fontSize: 16,
                  fontFamily: FONT.SEMI,
                  borderColor: "#8c8c8c",
                  borderWidth: 1,
                  borderRadius: 8,
                  marginLeft: 2,
                  width: 100,
                  padding: 4,
                }}
                
                editable = {false}
                defaultValue={selectedDate}
              />
            </Flex>
            <Divider style={{ marginTop: 8 }} thickness={3} bg="#e4e2e2" />
          </View>
        ) : (
          <></>
        )}

        {listSelectedService.length > 0 ? (
          <View style={{ marginVertical: 6 }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Quicksand-Bold",
                color: "#8c8c8c",
              }}
            >
              DỊCH VỤ
            </Text>
          </View>
        ) : null}
        <View>
          <View style={{ marginBottom: 10 }}>
            {listSelectedService.map((item, index) => {
              return (
                <Flex
                  flexDirection={"row"}
                  key={index}
                  style={{ paddingVertical: 4 }}
                >
                  <Text style={{ fontSize: 14, fontFamily: FONT.SEMI }}>
                    {item.serviceName}
                  </Text>
                  <Spacer />
                  <Text style={{ fontSize: 14, fontFamily: FONT.SEMI }}>
                    {" "}
                    + {convertPrice(item.servicePrice)} đ
                  </Text>
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
              if (navigation.canGoBack()) {
                if (navigation.canGoBack()) {
          navigation.goBack();
        }
              }
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
      {open && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          minimumDate={date}
          maximumDate={maxDate}
          display={"calendar"}
          onChange={onChangeDate}
        />
      )}
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
    borderWidth: 0.5,
    borderColor: THEME_COLOR,
    borderRadius: 50,
    padding: 4,
    paddingHorizontal: 10,
  },
  changeButtonNew: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    borderWidth: 0.5,
    borderColor: THEME_COLOR,
    borderRadius: 15,
    padding: 4,
    paddingHorizontal: 10,
    alignSelf: "flex-end",
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
