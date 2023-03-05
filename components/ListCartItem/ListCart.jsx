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
import { useSelector, useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Flex, TextArea, Spacer, Spinner, Image } from "native-base";
import Dash from "react-native-dash";
import RBSheet from "react-native-raw-bottom-sheet";
import VisibleItem from "../VisibleItem";
import HiddenItemWithActions from "../HiddenItemWithActions";
import { THEME_COLOR } from "../../Utils/themeColor";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderConponent";
import { convertPrice } from "../../Utils/convertPrice";
import { BASE_URL } from "../../services/baseURL";
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
  const [orderId, setOrderId] = useState();
  const username = useSelector(
    (state) => state.account.account.theAccount.accountId
  );
  const customerId = useSelector((state) => state.account.account.customerId);
  const nearlyRestaurant = useSelector(
    (state) => state.restaurant.nearRestaurant
  );
  const stringAddress = useSelector((state) => state.address.stringAddress);
  const address = useSelector(
    (state) => state.address.address.formatted_address
  );
  const [discount, setDiscount] = useState(0);
  const [deliveryFee, seyDeliveryFee] = useState(0);
  const [servicesFee, setServicesFee] = useState(0);
  const [note, setNote] = useState("");
  const [visible, setVisible] = useState(false);
  const [textAreaCount, setTextAreaCount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const refRBSheet = useRef();

  let list = [];
  let totalCart = 0;
  Object.keys(items.cartsItem).forEach(function (item) {
    totalCart += items.cartsItem[item].quantity * items.cartsItem[item].price;
    list.push(items.cartsItem[item]);
  });

  useEffect(() => {
    if (isFocused) {
    }
  }, [isFocused]);

  //  useEffect(() => {
  //     const keyboardDidShowListener = Keyboard.addListener(
  //       'keyboardDidShow',
  //       (e) => {
  //         setKeyboardVisible(true);
  //         setKeyboardHeight(e.endCoordinates.height);
  //         setPaddingEle(e.endCoordinates.height-100);
  //       }
  //     );

  //     const keyboardDidHideListener = Keyboard.addListener(
  //       'keyboardDidHide',
  //       () => {
  //         setKeyboardVisible(false);
  //         setPaddingEle(10); // or some other action
  //       }
  //     );

  //     return () => {
  //       keyboardDidHideListener.remove();
  //       keyboardDidShowListener.remove();
  //     };
  //   }, []);

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

  const convertDateTime = () => {
    let dt = new Date();
    let date = convertUTCDateToLocalDate(dt).toISOString();
    let day = date.slice(0, 10);
    let time = date.slice(11, 22);
    return time + " " + day;
  };

  const createOrder = (orders) => {
    if (orders.paymentMethod === "cash") {
      setIsDone(false);
      let url = BASE_URL + "/orders";
      axios
        .post(url, orders)
        .then((res) => {
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
              navigation.navigate("Home");
            })
            .catch((err) => {
              alert("Update Cart: ", err);
            });
        })
        .catch((err) => {
          alert("Create Order: ", err.message);
        });
    } else if (orders.paymentMethod === "ZaloPay") {
      setIsDone(false);
      axios
        .post(BASE_URL + "/orders", orders)
        .then((res) => {})
        .catch((err) => {
          alert("Update Order: ", err.message);
        });
      axios
        .post(BASE_URL + "/orders/zaloPay", orders)
        .then((response) => {
          let url =
            BASE_URL + "/orders/checkPayment/" + response.data.apptransid;
          axios.get(url).then((res) => {
            const newCart = {
              ...cart,
              cartItems: [],
              numberCart: 0,
              totalPrice: 0,
            };
            axios.put(BASE_URL + "/carts", newCart).then((r) => {
              setIsDone(true);
              navigation.navigate("ZaloPaymentScreen", {
                paymentResponse: response.data,
                order: orders,
                paymentStatus: res.data,
              });
            });
          });
        })
        .catch((err) => {
          alert("Create Order: ", err.message);
        });
    }
  };

  const handlePaymentMethod = (method) => {
    console.log("method", method);
    setPaymentMethod(method);
  };

  const handleCheckout = () => {
    axios.get(BASE_URL + "/orders").then((res) => {
      let maxId = Math.max(...res.data.map((item) => item.id));
      let second = new Date().getSeconds();
      let minute = new Date().getMinutes() * 100;
      let date = new Date().getDate() * 1000;
      let url = BASE_URL + "/customers/cart/" + username;
      axios.get(url).then((response) => {
        const cartData = response.data;
        let order = {
          id: maxId + 1 + second + date + minute,
          totalPrice: cartData.totalPrice,
          totalQuantity: cartData.numberCart,
          paymentMethod: paymentMethod === "cash" ? "cash" : "ZaloPay",
          deliveryAddress: stringAddress === "" ? address : stringAddress,
          customerId: customerId,
          itemList: cartData.cartItems,
          restaurantId: nearlyRestaurant.restaurantId,
          status: "pending",
          note: note,
        };
        createOrder(order);
        //console.log(order)
      });
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
      {listData.length > 0 ? (
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
                service={service}
                discount={discount}
                totalCart={totalCart}
                deliveryFee={deliveryFee}
                servicesFee={servicesFee}
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
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.8}
                onPress={() => {
                  handleCheckout();
                }}
              >
                <Text style={styles.buttonText}> Thanh toán</Text>
              </TouchableOpacity>
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

      <TouchableOpacity
        style={{ position: "absolute" }}
        onPress={() => {
          navigation.goBack();
        }}
        activeOpacity={1}
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
  buttonStyle: {
    borderRadius: 15,
    backgroundColor: THEME_COLOR,
    height: 47,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyleLoading: {
    borderRadius: 15,
    backgroundColor: "#ff9b9b",
    height: 47,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Quicksand-Bold",
    fontSize: 18,
    color: "#fff",
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
});
export default ListCart;
