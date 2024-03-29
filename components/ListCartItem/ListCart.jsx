import { useEffect, useState, useRef, useCallback } from "react";
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
import { Flex, TextArea, Spacer, Image } from "native-base";
import { THEME_COLOR } from "../../Utils/themeColor";
import { convertPrice } from "../../Utils/convertPrice";
import { BASE_URL } from "../../services/baseURL";
import { FONT } from "../../Utils/themeFont";
import { Toast } from "@ant-design/react-native";
import { getNearlyRestaurant } from "../../Utils/api/getNearlyRestaurant";
import { calculateShippingFee } from "../../Utils/shipCost";
import { ACTIVE_CITY } from "../../Utils/constant";
import AlertPopup from "../AlertPopup";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ListCart = (props) => {
  let { deleteItem, isFocused, service } = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const refRBSheet = useRef();
  const [isDone, setIsDone] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [servicesFee, setServicesFee] = useState(0);
  const [note, setNote] = useState("");
  const [visible, setVisible] = useState(false);
  const [textAreaCount, setTextAreaCount] = useState(0);
  const [weight, setWeight] = useState(3);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isVisible, setIsVisible] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [totalCart, setTotalCart] = useState(0);
  const [finalTotalCart, setFinalTotalCart] = useState(0);
  const [list, setList] = useState([]);
  const [warning, setWarning] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const customerId = useSelector((state) => state.account.account.customerId);
  const items = useSelector((state) => state.cart);
  const deliveryDate = useSelector((state) => state.cart.deliveryDate);
  const promotion = useSelector((state) => state.cart.promotion);
  const stringAddress = useSelector((state) => state.address.stringAddress);
  const myCity = useSelector((state) => state.address.myCity);
  const listService = useSelector((state) => state.services.services);
  const selectedService = useSelector((state) => state.cart.serviceList);
  const specRes = useSelector((state) => state.restaurant.specRes);
  const minDistance = useSelector((state) => state.restaurant.minDistance);

  const listSelectedService = useSelector(
    (state) => state.cart.serviceListObject
  );
  const itemList = useSelector((state) => state.cart.itemList);
  const address = useSelector(
    (state) => state.address.address.formatted_address
  );
  const username = useSelector(
    (state) => state.account.account.theAccount.accountId
  );
  const nearlyRestaurant = useSelector(
    (state) => state.restaurant.nearRestaurant
  );

  useEffect(() => {
    deliveryMethod === "delivery"
      ? setDeliveryFee(calculateShippingFee(weight, minDistance / 1000))
      : setDeliveryFee(0);
  }, [minDistance, weight, deliveryMethod, specRes]);

  useEffect(() => {
    if (address) {
      if (!specRes) {
        getNearlyRestaurant(
          stringAddress === "" ? address : stringAddress,
          dispatch
        );
      }
    }
  }, [stringAddress, address, specRes]);
  useEffect(() => {
    if (totalCart > 9999999) {
      setWarning(
        "Do đơn hàng quá lớn nên cửa hàng sẽ bắt buộc phải cọc trước 10% tổng giá trị đơn hàng"
      );
    } else {
      setWarning("");
    }
  }, [totalCart]);
  const onDeliveryMethodChange = (value) => {
    setDeliveryMethod(value);
    dispatch({ type: "SET_SPEC_RESTAURANT", specRes: null });
  };
  useEffect(() => {
    let cartTotal = 0;
    const cartItems = Object.keys(items.cartsItem).map((item) => {
      const { quantity, price } = items.cartsItem[item];
      cartTotal += quantity * price;
      return items.cartsItem[item];
    });
    setList(cartItems);
    Object.keys(items.serviceListObject).forEach(function (item) {
      cartTotal += items.serviceListObject[item].servicePrice;
    });
    cartTotal += items.partyTotalPrice;
    setTotalCart(cartTotal);
  }, [items]);

  useEffect(() => {
    if (promotion) {
      let discountValue = totalCart * (promotion.discountPercent * 0.01);
      setDiscount(discountValue);
    } else {
      setDiscount(0);
    }
  }, [promotion]);
  
  useEffect(() => {
    const newTotalCart = totalCart + deliveryFee - discount;
    setFinalTotalCart(newTotalCart);
  }, [promotion, deliveryFee, discount, totalCart])

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
  const createOrder = (orders) => {
    if (orders.paymentMethod === "cash") {
      let url = BASE_URL + "/orders";

      axios
        .post(url, orders)
        .then((res) => {
          setIsDone(true);
          dispatch({ type: "LOGOUT" });
          Toast.success("Đặt hàng thành công", 1);
          navigation.navigate("Home");
        })
        .catch((error) => {
          setIsDone(true);
          alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
          if (error.response) {
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        });
    } else if (orders.paymentMethod === "ZaloPay") {
      setIsDone(false);
      axios
        .post(
          BASE_URL + "/orders/zaloPay",
          orders.totalPrice > 9999999
            ? { ...orders, totalPrice: orders.totalPrice * 0.1 }
            : orders
        )
        .then((response) => {
          setIsDone(true);
          navigation.navigate("ZaloPaymentScreen", {
            paymentResponse: response.data,
            order: orders,
          });
        })
        .catch((err) => {
          setIsDone(true);
          alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
          console.log("Create order zalo", err.response.data);
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
        axios
          .get(url)
          .then((response) => {
            const cartData = response.data;
            let order = {
              id: maxId + 1,
              totalPrice: finalTotalCart,
              totalQuantity: cartData.numberCart,
              paymentMethod: paymentMethod === "cash" ? "cash" : "ZaloPay",
              serviceList: listSelectedService,
              deliveryAddress: stringAddress === "" ? address : stringAddress,
              customerId: customerId,
              itemList: cartData.cartItems,
              restaurantId: specRes
                ? specRes.restaurantId
                : nearlyRestaurant.restaurantId,
              status: finalTotalCart > 999999 ? "pending" : "accept",
              note: note,
              deliveryDate: cartData.party ? deliveryDate : "",
              receiveTime: "",
              reason: "",
              shippingFee:deliveryFee,
              discountPrice:discount,
              // staffId:  88,
              deliveryMethod: deliveryMethod,
              party: cartData.party,
            };
            createOrder(order);
            // console.log(order);
          })
          .catch((error) => {
            setIsDone(true);
            alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
            if (error.response) {
              console.log(error.response.data);
            } else {
              console.log(error.message);
            }
          });
      })
      .catch((error) => {
        setIsDone(true);
        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
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
                currentDate={deliveryDate}
                service={service}
                discount={discount}
                totalCart={totalCart}
                finalTotalCart={finalTotalCart}
                deliveryFee={deliveryFee}
                servicesFee={servicesFee}
                toggleModal={toggleModal}
                listSelectedService={listSelectedService}
                setPaymentMethod={handlePaymentMethod}
              />
            }
            ListHeaderComponent={
              <HeaderComponent
                nearlyRestaurant={specRes ? specRes : nearlyRestaurant}
                setVisible={() => refRBSheet.current.open()}
                note={note}
                deliveryMethod={deliveryMethod}
                setDeliveryMethod={onDeliveryMethodChange}
                locateCoord={route.params.locateCoord}
              />
            }
            contentContainerStyle={{
              backgroundColor: "white",
            }}
          />
          <View style={styles.paymentView}>
            {warning ? (
              <Text
                style={{
                  marginTop: 2,
                  fontFamily: FONT.MEDIUM,
                  color: THEME_COLOR,
                }}
              >
                {warning}
              </Text>
            ) : (
              <></>
            )}
            {totalCart > 9999999 ? (
              <Flex
                direction="row"
                style={{ paddingTop: 2, alignItems: "flex-end" }}
              >
                <Text style={{ fontSize: 15, fontFamily: "Quicksand-Medium" }}>
                  {"Tiền cọc"}
                </Text>
                <Spacer />
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Quicksand-Bold",
                    // color: THEME_COLOR,
                  }}
                >
                  {convertPrice(
                    ((totalCart + deliveryFee - discount) * 0.1).toFixed(0)
                  )}{" "}
                  đ
                </Text>
              </Flex>
            ) : (
              <></>
            )}
            <Flex direction="row" style={styles.paymentContentView}>
              <Text style={{ fontSize: 15, fontFamily: "Quicksand-Medium" }}>
                {"Tổng tiền đơn hàng"}
              </Text>
              <Spacer />
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: "Quicksand-Bold",
                  color: THEME_COLOR,
                }}
              >
                {convertPrice(totalCart + deliveryFee - discount)} đ
              </Text>
            </Flex>
          </View>
          <View style={{ paddingHorizontal: 16, backgroundColor: "white" }}>
            {isDone ? (
              myCity === ACTIVE_CITY || myCity ===ACTIVE_CITY_ENG? <ActionButton
              onPress={() => {
                handleCheckout();
              }}
              disabled={nearlyRestaurant.restaurantId ? false : true}
              buttonText={
                nearlyRestaurant.restaurantId
                  ? "Thanh toán"
                  : "Đang tìm vị trí"
              }
            /> : <ActionButton
            onPress={() => {
              setIsOpen(true)
            }}
            disabled={nearlyRestaurant.restaurantId ? false : true}
            buttonText={
              nearlyRestaurant.restaurantId
                ? "Thanh toán"
                : "Đang tìm vị trí"
            }
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
            { flex: 1, justifyContent: "center", alignItems: "center", marginTop:200 },
          ]}
        >
         
         
          <Image
          alt={"empty"}
          size={100}
          source={{uri:"https://live.staticflickr.com/65535/52864176969_f97fdde8fc_n.jpg"}}
          />
           <Text style={{fontFamily:FONT.SEMI, color:"#8c8c8c"}}>Giỏ hàng của bạn hiện đang rỗng</Text>
          <TouchableOpacity
          style={{
            padding: 8,
            borderWidth: 0.5,
            borderRadius: 10,
            borderColor:"#8c8c8c",
            marginTop: 16
          }}
          activeOpacity={0.7}
          onPress={() => {
            if(navigation.canGoBack){
              navigation.goBack();
            }
          }}
          >
            <Text style={{fontFamily:FONT.SEMI, color:"#8c8c8c"}}>
            Trang chủ
            </Text>
          </TouchableOpacity>
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
       <AlertPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={<Text style={{ fontFamily: FONT.BOLD, fontSize: 20 }}>Thông báo</Text>}
        content={<Text>
          Vị trí của bạn nằm ngoài khu vực{" "}
          <Text style={{ fontFamily: FONT.BOLD }}>Thành phố Hồ Chí Minh </Text>
        </Text>}
        content2="Vui lòng chọn vị trí khác"
      />
      <TouchableOpacity
        style={{ position: "absolute" }}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
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
    marginTop: 35,
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
