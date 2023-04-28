import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Flex, Spacer, Divider, Image, Box, Text, Input } from "native-base";
import { THEME_COLOR } from "../../Utils/themeColor";
import { convertPrice } from "../../Utils/convertPrice";
import DetailTextStyle from "./DetailTextStyle";
import { FONT } from "../../Utils/themeFont";
import { useDispatch, useSelector } from "react-redux";
import Party from "./Party";
import {
  Add,
  ArrowCircleRight2,
  Calendar2,
  Clock,
  Edit,
} from "iconsax-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatVNTime } from "../../Utils/convertDate";
import moment from "moment-timezone";
import AlertPopup from "../AlertPopup";
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
    currentDate,
  } = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const party = useSelector((state) => state.cart.party);
  const promotionApplied = useSelector((state) => state.cart.promotion);
  const [payment, setPayment] = useState("cash");
  const [mode, setMode] = useState("date");
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [datee, setDatee] = useState("");
  const [time, setTime] = useState("");
  let date = new Date();
  const minDate = new Date(date.setDate(date.getDate() + 1));
  const maxDate = new Date(date.setDate(date.getDate() + 7));
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
  useEffect(() => {
    if (totalCart > 9999999) {
      // alert(
      //   `Đơn hàng quá lớn nên sẽ buộc phải cọc trước 10% đơn hàng là ${
      //     totalCart * 0.1
      //   }đ`
      // );
      setPaymentMethod("ZaloPay");
      setPayment("ZaloPay");
    }
  }, [totalCart]);
  useEffect(() => {
    if (time !== "" && datee !== "") {
      let hours = moment.utc(time).tz("Asia/Ho_Chi_Minh").format("HH");
      let minutes = moment.utc(time).tz("Asia/Ho_Chi_Minh").format("mm");
      let dateVN = new Date(datee);
      const year = dateVN.getFullYear();
      const month = dateVN.getMonth();
      const day = dateVN.getDate();
      if (hours < 10 || hours > 17) {
        setIsOpen(true);
        const newDate = new Date(year, month, day, 10, 0);
        // const formatDate = moment.utc(newDate).local().format();
        dispatch({ type: "SET_DATE", payload: newDate.toISOString() });
      } else {
        const newDate = new Date(year, month, day, hours, minutes);
        // const formatDate = moment.utc(newDate).local().format();
        dispatch({ type: "SET_DATE", payload: newDate.toISOString() });
      }
    }
    // console.log(
    //
    // );
  }, [time]);
  const onChangeDate = (event, selectedDate) => {
    setOpenDate(false);

    if (mode === "date") {
      setDatee(selectedDate);
      showTimePicker();
    } else {
      setOpenTime(false);
      setTime(selectedDate);
    }
  };
  const onChangeTime = (event, selectedTime) => {
    setTime(selectedTime);
    setOpenTime(false);
  };
  const showMode = (mode) => {
    if (mode === "time") {
      setOpenTime(true);
    } else {
      setOpenDate(true);
    }
  };
  const showTimePicker = () => {
    setMode("time");
    showMode("time");
  };
  const showDatePicker = () => {
    showMode("date");
    setMode("date");
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
                fontFamily: FONT.BOLD,
                color: "#8c8c8c",
                marginBottom: 12,
              }}
            >
              THỰC ĐƠN
            </Text>
            <Party party={party} />

            <Flex
              flexDirection={"row"}
              alignItems="center"
              alignSelf={"flex-end"}
              mt={2}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FONT.SEMI,
                  padding: 4,
                }}
              >
                Chọn thời gian giao hàng
              </Text>
              <Input
                style={{ fontFamily: FONT.SEMI, fontSize: 16 }}
                borderRadius={10}
                bgColor="transparent"
                size="30px"
                editable={false}
                borderWidth={1}
                h={39}
                width={175}
                InputRightElement={
                  <TouchableOpacity
                    style={{ marginRight: 7 }}
                    onPress={() => {
                      showDatePicker();
                      // setDatePickerVisibility(true)
                    }}
                  >
                    <Calendar2 size="25" color={"#8c8c8c"} variant="Outline" />
                  </TouchableOpacity>
                }
                defaultValue={
                  // new Date().getHours() < 10 && !time
                  //   ? formatVNTime(new Date().setHours(10, 0))
                  //   :
                  formatVNTime(currentDate)
                }
              />
            </Flex>
            <Divider style={{ marginTop: 8 }} thickness={3} bg="#e4e2e2" />
          </View>
        ) : (
          <></>
        )}

        {/* {listSelectedService.length > 0 ? (
          <View style={{ marginVertical: 6 }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: FONT.BOLD,
                color: "#8c8c8c",
              }}
            >
              DỊCH VỤ
            </Text>
          </View>
        ) : null} */}

        <TouchableOpacity
          onPress={() => {
            toggleModal();
          }}
          style={{ marginTop: 8 }}
          activeOpacity={0.7}
        >
          {listSelectedService.length > 0 ? (
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: FONT.BOLD,
                  color: "#8c8c8c",
                }}
              >
                DỊCH VỤ
              </Text>
              <Spacer />
              <Edit size={20} color={THEME_COLOR} />
            </View>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: FONT.BOLD,
                  color: "#8c8c8c",
                }}
              >
                DỊCH VỤ
              </Text>
              <Spacer />
              <Add size={24} color={THEME_COLOR} />
            </View>
          )}
        </TouchableOpacity>
        <View style={{ marginBottom: listSelectedService.length > 0 ? 8 : -4 }}>
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
                navigation.goBack();
              }
            }}
          >
            <View style={styles.changeButton}>
              <Text
                style={{
                  fontSize: 13,
                  color: THEME_COLOR,
                  fontFamily: FONT.BOLD,
                }}
              >
                Thêm món
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </Flex>
        <Divider style={{ marginTop: 8 }} thickness={3} bg="#e4e2e2" />
      </View>

      <TouchableOpacity
        style={[
          styles.paymentUnSelected,
          {
            backgroundColor: "white",
            marginTop: 16,
            marginHorizontal: 16,
            paddingHorizontal: 16,
            borderWidth: 0.5,
            borderColor: "silver",
            padding: 16,
            alignItems: "center",
            flexDirection: "row",
          },
        ]}
        activeOpacity={1}
        onPress={() => {
          navigation.navigate("PromotionScreen");
        }}
      >
        <Box>
          <Image
            source={{
              uri: "https://live.staticflickr.com/65535/52845776895_f7c49eaf8d_n.jpg",
            }}
            alt={"voucher"}
            h={7}
            w={7}
          />
        </Box>
        {promotionApplied ? (
          <Text
            style={[
              styles.textActive,
              { marginLeft: 10, fontSize: 18, marginTop: 5 },
            ]}
          >
            Đã áp dụng 1 khuyến mãi
          </Text>
        ) : (
          <Text
            style={[
              styles.textActive,
              { marginLeft: 10, fontSize: 18, marginTop: 5 },
            ]}
          >
            Chọn khuyến mãi
          </Text>
        )}
        <Spacer />
        <ArrowCircleRight2 size={24} color={THEME_COLOR} />
      </TouchableOpacity>
      <Flex style={styles.voucherView}>
        <View style={{ marginLeft: 8, justifyContent: "center" }}>
          <Flex flexDirection={"row"} style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontFamily: FONT.BOLD }}>
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
                  disabled={
                    totalCart > 9999999 && item.payment !== "ZaloPay"
                      ? true
                      : false
                  }
                  style={
                    totalCart > 9999999 && item.payment !== "ZaloPay"
                      ? { opacity: 0.3 }
                      : { opacity: 1 }
                  }
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
          <Text style={{ fontFamily: FONT.BOLD, fontSize: 15 }}>
            Chi tiết đơn hàng
          </Text>
        </Flex>
        <DetailTextStyle
          textName="Giá tiền"
          price={totalCart > 9999999 ? totalCart * 0.1 : totalCart}
        />
        <DetailTextStyle textName="Phí giao hàng" price={deliveryFee} />
        <Flex direction="row" style={styles.textView}>
          <Text
            style={{
              fontFamily: FONT.REGULAR,
              fontSize: 14,
              color: "#898989",
            }}
          >
            Giảm giá
          </Text>
          <Spacer />
          <Text
            style={{
              fontFamily: FONT.REGULAR,
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
              fontFamily: FONT.BOLD,
              fontSize: 14,
            }}
          >
            Tổng thanh toán
          </Text>
          <Spacer />
          <Text
            style={{
              fontFamily: FONT.BOLD,
              fontSize: 16,
            }}
          >
            {convertPrice(totalCart + deliveryFee - discount)} đ
          </Text>
        </Flex>
        <Divider style={{ marginVertical: 8 }} thickness={2} bg="#e4e2e2" />
        <Flex direction="row">
          <Text
            style={{
              fontFamily: FONT.SEMI,
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
      {openDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={minDate}
          mode={mode}
          is24Hour={true}
          minimumDate={minDate}
          maximumDate={maxDate}
          display={"calendar"}
          onChange={onChangeDate}
        />
      )}
      {openTime && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          minimumDate={new Date()}
          maximumDate={new Date()}
          display={"spinner"}
          minuteInterval={15}
          onChange={onChangeDate}
        />
      )}
      <AlertPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Thời gian không hợp lệ"}
        content={
          <Text>
            Cửa hàng chúng tôi chỉ tiến hành giao bàn tiệc từ{" "}
            <Text style={{ fontFamily: FONT.BOLD }}>10 giờ </Text>đến
            <Text style={{ fontFamily: FONT.BOLD }}> 17 giờ </Text> hàng ngày.
            Vui lòng chọn lại thời gian
          </Text>
        }
      />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: FONT.REGULAR,
    fontSize: 12,
  },
  addressText: {
    fontFamily: FONT.BOLD,
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
    borderWidth: 0.8,
    borderColor: "gray",
    marginBottom: 4,
    padding: 12,
    borderRadius: 15,
  },
  paymentSelected: {
    alignItems: "center",
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
