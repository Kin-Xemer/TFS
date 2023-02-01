import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
  Button,
} from "react-native";
import { Modal } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Flex, TextArea, Spacer, Divider, Image } from "native-base";
import { Location, ArrowDown2 } from "iconsax-react-native";
import Dash from "react-native-dash";
import RBSheet from "react-native-raw-bottom-sheet";
import VisibleItem from "../VisibleItem";
import HiddenItemWithActions from "../HiddenItemWithActions";
import { THEME_COLOR } from "../../Utils/themeColor";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderConponent";
import { convertPrice } from "../../Utils/convertPrice";
import { Keyboard } from "react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ListCart = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const items = useSelector((state) => state.cart);
  const [discount, setDiscount] = useState(30000);
  const [deliveryFee, seyDeliveryFee] = useState(0);
  const [servicesFee, setServicesFee] = useState(2000);
  const [note, setNote] = useState("");
  const [visible, setVisible] = useState(false);
  const [textAreaCount, setTextAreaCount] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [paddingEle, setPaddingEle] = useState(10);
  const refRBSheet = useRef();
  let { deleteItem } = props;
  let list = [];
  let totalCart = 0;

  Object.keys(items.cartsItem).forEach(function (item) {
    totalCart += items.cartsItem[item].quantity * items.cartsItem[item].price;
    list.push(items.cartsItem[item]);
  });


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
    console.log(value);
    setTextAreaCount(value.length);
    setNote(value)
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
                discount={discount}
                totalCart={totalCart}
                deliveryFee={deliveryFee}
                servicesFee={servicesFee}
              />
            }
            ListHeaderComponent={
              <HeaderComponent
                setVisible={() => refRBSheet.current.open()}
                note={note}
              />
            }
            contentContainerStyle={{
              backgroundColor: "white",
            }}
          />
          <View style={styles.paymentView}>
            <Flex direction="row" style={styles.paymentContentView}>
              <Image
                source={require("../../assets/Icon-app_blue-bg.png")}
                alt="imahe"
                style={{ width: 30, height: 30 }}
              />
              <Flex style={{ marginLeft: 8 }}>
                <Text style={{ fontSize: 12, fontFamily: "Quicksand-Regular" }}>
                  ZaloPay
                </Text>
                <Text style={{ fontSize: 15, fontFamily: "Quicksand-Bold" }}>
                  {convertPrice(
                    totalCart + servicesFee + deliveryFee - discount
                  )}{" "}
                  đ
                </Text>
              </Flex>
            </Flex>
          </View>
          <View style={{ paddingHorizontal: 16, backgroundColor: "white" }}>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.8}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.buttonText}> Thanh toán</Text>
            </TouchableOpacity>
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
