import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Dash from "react-native-dash";
import RBSheet from "react-native-raw-bottom-sheet";
import VisibleItem from "../VisibleItem";
import HiddenItemWithActions from "../HiddenItemWithActions";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderConponent";
import ModalPicker from "../ModalPicker/index";
import ActionButton from "../ActionButton";
import { useSelector, useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Flex, TextArea, Spacer, Spinner, Image } from "native-base";
import { THEME_COLOR } from "../../Utils/themeColor";
import { convertPrice } from "../../Utils/convertPrice";
import { BASE_URL } from "../../services/baseURL";
import { FONT } from "../../Utils/themeFont";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ListCart = (props) => {
  let { deleteItem, isFocused, service } = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const items = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart.cart);
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [isDone, setIsDone] = useState(true);
  const customerId = useSelector((state) => state.account.account.customerId);
  const stringAddress = useSelector((state) => state.address.stringAddress);
  const listService = useSelector((state) => state.services.services);
  const selectedService = useSelector((state) => state.cart.serviceList);
  const listSelectedService = useSelector(
    (state) => state.cart.serviceListObject
  );
  const itemList = useSelector((state) => state.cart.itemList);
  const comboList = useSelector((state) => state.cart.comboList);
  const address = useSelector(
    (state) => state.address.address.formatted_address
  );
  const username = useSelector(
    (state) => state.account.account.theAccount.accountId
  );
  const nearlyRestaurant = useSelector(
    (state) => state.restaurant.nearRestaurant
  );

  const [discount, setDiscount] = useState(0);
  const [deliveryFee, seyDeliveryFee] = useState(0);
  const [servicesFee, setServicesFee] = useState(0);
  const [note, setNote] = useState("");
  const [visible, setVisible] = useState(false);
  const [textAreaCount, setTextAreaCount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isVisible, setIsVisible] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);
  const refRBSheet = useRef();

  let list = [];
  let totalCart = 0;
  Object.keys(items.cartsItem).forEach(function (item) {
    totalCart += items.cartsItem[item].quantity * items.cartsItem[item].price;
    list.push(items.cartsItem[item]);
  });

  Object.keys(items.serviceListObject).forEach(function (item) {
    totalCart += items.serviceListObject[item].servicePrice;
  });
  totalCart += items.partyTotalPrice;
  const listData = list.map((item, index) => ({
    id: `${index}`,
    name: item.name,
    quantity: item.quantity,
    imgUrl: item.image,
    price: item.price,
  }));
  let handleOnChangeText = (value) => {
    setTextAreaCount(value.length);
    setNote(value);
  };

  function convertUTCDateToLocalDate(date) {
    var newDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    newDate.setHours(hours - offset);
    return newDate;
  }

  // const convertDateTime = () => {
  //   let dt = new Date();
  //   let date = convertUTCDateToLocalDate(dt).toISOString();
  //   let day = date.slice(0, 10);
  //   let time = date.slice(11, 22);
  //   return time + " " + day;
  // };
  const createOrder = (orders) => {
    if (orders.paymentMethod === "cash") {
      let url = BASE_URL + "/orders";

      axios
        .post(url, orders)
        .then((res) => {
          setIsDone(true);
          dispatch({ type: "LOGOUT" });
          navigation.navigate("Home");
        })
        .catch((error) => {
          setIsDone(true);
          alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
          if (error.response) {
            console.log(error.response.data.message);
          }
        });
    } else if (orders.paymentMethod === "ZaloPay") {
      setIsDone(false);
      axios
        .post(BASE_URL + "/orders/zaloPay", orders)
        .then((response) => {
          console.log(response.data);
          setIsDone(true);
          navigation.navigate("ZaloPaymentScreen", {
            paymentResponse: response.data,
            order: orders,
          });
        })
        .catch((err) => {
          setIsDone(true);
          alert("Create Order: ", err.message);
        });
    }
  };

  const handlePaymentMethod = (method) => {
    console.log("method", method);
    setPaymentMethod(method);
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  const togglePicker = () => {
    setOpenPicker(!openPicker);
  };

  const handleCheckout = () => {
    setIsDone(false);
    axios
      .get(BASE_URL + "/orders")
      .then((res) => {
        let maxId = Math.max(...res.data.map((item) => item.id));
        let date = new Date().toISOString().slice(2, 10).split("-").join("");
        let url = BASE_URL + "/customers/cart/" + username;
        console.log(username);
        axios
          .get(url)
          .then((response) => {
            const cartData = response.data;
            let order = {
              id: maxId + 1,
              totalPrice: totalCart,
              totalQuantity: cartData.numberCart,
              paymentMethod: paymentMethod === "cash" ? "cash" : "ZaloPay",
              serviceList: listSelectedService,
              deliveryAddress: stringAddress === "" ? address : stringAddress,
              customerId: customerId,
              itemList: cartData.cartItems,
              restaurantId: nearlyRestaurant.restaurantId,
              status: totalCart > 999999 ? "pending" : "accept",
              note: note,
              deliveryDate: "",
              receiveTime: "",
              reason: "",
              staffId: totalCart > 999999 ? null : 8,
              deliveryMethod: deliveryMethod,
              party: cartData.party,
            };
            createOrder(order);
            //  console.log(order);
          })
          .catch((error) => {
            setIsDone(true);
            alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
            console.log("getCart fromdb", error);
          });
      })
      .catch((error) => {
        setIsDone(true);
        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
        console.log("get all order  fromdb", error);
      });
    // navigation.goBack();
  };
  const renderItem = (data, rowMap) => {
    return (
      <VisibleItem
        data={data}
        onDelete={() => deleteItem("DELETE_CART", data.item.id)}
      />
    );
  };

  const showModal = () => {
    setVisible(!visible);
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenItemWithActions
        data={data}
        onDelete={() => deleteItem("DELETE_CART", data.item.id)}
      />
    );
  };

  return (
    <Flex style={styles.container}>
      <Flex style={styles.topBar} direction="row">
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Text style={[styles.title, { fontSize: 20, color: THEME_COLOR }]}>
            GIỎ HÀNG
          </Text>
        </View>
      </Flex>
      {listData.length > 0 || itemList.length > 0 ? (
        <>
          <SwipeListView
            data={listData}
            keyExtractor={(rowData, index) => {
              return rowData.id.toString();
            }}
            renderItem={(data) => renderItem(data)}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-screenWidth * 0.25 + 12}
            disableRightSwipe
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <FooterComponent
                togglePicker={togglePicker}
                currentDate={new Date()}
                service={service}
                discount={discount}
                totalCart={totalCart}
                deliveryFee={deliveryFee}
                servicesFee={servicesFee}
                toggleModal={toggleModal}
                listSelectedService={listSelectedService}
                setPaymentMethod={handlePaymentMethod}
              />
            }
            ListHeaderComponent={
              <HeaderComponent
                nearlyRestaurant={nearlyRestaurant}
                setVisible={() => refRBSheet.current.open()}
                note={note}
                deliveryMethod={deliveryMethod}
                setDeliveryMethod={setDeliveryMethod}
                locateCoord={route.params.locateCoord}
              />
            }
            contentContainerStyle={{
              backgroundColor: "white",
            }}
          />
          <View style={styles.paymentView}>
            <Flex direction="row" style={styles.paymentContentView}>
              <Text style={{ fontSize: 15, fontFamily: "Quicksand-Medium" }}>
                Tổng tiền
              </Text>
              <Spacer />
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: "Quicksand-Bold",
                  color: THEME_COLOR,
                }}
              >
                {convertPrice(totalCart + servicesFee + deliveryFee - discount)}{" "}
                đ
              </Text>
            </Flex>
          </View>
          <View style={{ paddingHorizontal: 16, backgroundColor: "white" }}>
            {isDone ? (
              <ActionButton
                onPress={() => {
                  handleCheckout();
                }}
                buttonText="Thanh toán"
              />
            ) : (
              <TouchableOpacity
                style={styles.buttonStyleLoading}
                activeOpacity={0.8}
              >
                <Flex flexDirection={"row"}>
                  <ActivityIndicator size="small" color="white" />
                  <Text style={styles.buttonText}> Đang thanh toán</Text>
                </Flex>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <View
          style={[
            styles.container,
            { flex: 1, justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text>khong co gi het mua di</Text>
        </View>
      )}

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        openDuration={450}
        height={screenHeight * 0.9}
        customStyles={{
          container: {
            borderRadius: 20,
          },
          draggableIcon: {
            backgroundColor: "silver",
          },
        }}
      >
        <View style={styles.note}>
          <Text style={[styles.title, { fontSize: 20 }]}>
            Ghi chú giao hàng
          </Text>
        </View>
        <Dash
          style={{ marginHorizontal: 16, height: 1 }}
          dashThickness={1}
          dashGap={2}
          dashColor="silver"
        />
        <View>
          <TextArea
            style={{ fontFamily: "Quicksand-Regular" }}
            placeholder="Viết vài ghi chú cho tài xế nhé"
            size="md"
            paddingLeft="4"
            borderWidth={0}
            value={note}
            _light={{
              placeholderTextColor: "trueGray.400",
              bg: "white",
              _hover: {
                bg: "white",
              },
              _focus: {
                bg: "white",
              },
            }}
            onChangeText={(value) => {
              handleOnChangeText(value);
            }}
          />
        </View>
        <Spacer />
        <Dash
          style={{ marginHorizontal: 16, height: 1 }}
          dashGap={2}
          dashColor="silver"
          dashThickness={1}
        />
        <Flex
          direction="row"
          style={{ paddingBottom: 10, margin: 16, alignItems: "center" }}
        >
          <View>
            <Text
              style={{
                fontFamily: "Quicksand-Regular",
                fontSize: 14,
                color: "#666",
              }}
            >
              {textAreaCount}/250
            </Text>
          </View>
          <Spacer />
          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.close();
            }}
            style={{ alignItems: "flex-end" }}
          >
            <View style={styles.noteButton}>
              <Text style={[styles.title, { color: "white" }]}>Hoàn tất</Text>
            </View>
          </TouchableOpacity>
        </Flex>
      </RBSheet>
      <ModalPicker
        selectedService={selectedService}
        isVisible={isVisible}
        toggleModal={toggleModal}
        setIsvisible={setIsVisible}
        listService={listService}
      />
      <TouchableOpacity
        style={{ position: "absolute" }}
        onPress={() => {
          navigation.goBack();
        }}
        activeOpacity={0.7}
      >
        <Entypo name="chevron-left" size={36} color={THEME_COLOR} />
      </TouchableOpacity>
    </Flex>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
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
  buttonStyleLoading: {
    borderRadius: 15,
    backgroundColor: "#ff9b9b",
    height: 47,
    alignItems: "center",
    justifyContent: "center",
  },

  paymentView: {
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderTopWidth: 0.5,
    borderTopColor: "silver",
  },
  paymentContentView: {
    paddingVertical: 10,
    alignItems: "flex-end",
  },
  note: {
    padding: 16,
  },
  noteButton: {
    backgroundColor: THEME_COLOR,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: FONT.BOLD,
    fontSize: 18,
    color: "#fff",
  },
});
export default ListCart;
