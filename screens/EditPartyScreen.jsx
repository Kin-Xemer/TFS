import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
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
  Text,
  TextInput,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import { Edit, Add, CloseSquare } from "iconsax-react-native";
import {
  Flex,
  Spacer,
  Heading,
  Button,
  useToast,
  Box,
  TextArea,
  Image,
} from "native-base";
import { convertPrice } from "../Utils/convertPrice";
import axios from "axios";
import { Toast } from "@ant-design/react-native";
import { THEME_COLOR } from "../Utils/themeColor";
import { FONT } from "../Utils/themeFont";
import BackButton from "../components/BackButton";
import { BASE_URL } from "../services/baseURL";
import PartyItem from "../components/PartyItem";
import ActionButton from "../components/ActionButton";
import ConfirmDelete from "../components/ConfirmDelete";
import { getCartById } from "../Utils/api/getCart";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const EditPartyScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const menuRef = useRef();
  const isFocused = useIsFocused();
  const [quantity, setQuantity] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isDone, setIsDone] = useState(true);
  const [events, setEvents] = useState();
  const [note, setNote] = useState(route.params.party.note);
  const [partyName, setPartyName] = useState(route.params.party.partyName);
  const [regions, setRegions] = useState();
  const [listFoodMenu, setListFoodMenu] = useState([]);
  const username = useSelector(
    (state) => state.account.account.theAccount.accountId
  );
  const cart = useSelector((state) => state.cart);
  const foods = useSelector((state) => state.food.food);
  const itemParty = useSelector((state) => state.cart.itemList);
  // const [itemParty, setItemParty] = useState(route.params.party.itemList);
  const [party, setParty] = useState(route.params.party);
  const [menuQuantity, setMenuQuantity] = useState(
    route.params.party.quantity.toString()
  );
  const [partyTemplate, setPartyTemplate] = useState(
    route.params.party.partyTemplate
  );
  // const itemParty = useSelector((state) => state.party.itemList);
  // const menuQuantity = useSelector((state) => state.party.quantity);
  // const partyTemplate = useSelector((state) => state.party.partyTemplate);

  let totalCart = 0;
  Object.keys(itemParty).forEach(function (item) {
    totalCart += itemParty[item].price;
  });

  useEffect(() => {
    getRegion();
    getEvent();
  }, []);
  const listForm = [
    "https://live.staticflickr.com/65535/52732979173_ea3e3fd0f4_n.jpg",
    "https://live.staticflickr.com/65535/52747068688_98b7ab0db3_n.jpg",
    "https://live.staticflickr.com/65535/52747068678_7b8739f8ae_n.jpg",
    "https://live.staticflickr.com/65535/52746045822_ba6ba05343_n.jpg",
  ];

  const handleOnchangeText = (value) => {
    setMenuQuantity(value);
  };
  const onDelete = (item) => {
    dispatch({ type: "DELETE_MENU_ITEM_EDIT", payload: item.foodId });
    dispatch({ type: "SET_PARTY_TOTAL_PRICE", payload: 0 });
  };
  const getRegion = () => {
    axios
      .get(BASE_URL + "/regions")
      .then((response) => {
        setRegions(response.data);
      })
      .catch((error) => {
        console.log("error More Screen", error);
      });
  };

  const getEvent = () => {
    axios.get(BASE_URL + "/events").then((response) => {
      setEvents(response.data);
    });
  };
  const onDeleteMenu = () => {
    setIsOpen(false);
    let deleteItem = {
      cartId: cart.cartId,
      partyId: party.id,
    };
    console.log(deleteItem)
    axios
      .post(BASE_URL + "/carts/removeparty", deleteItem)
      .then((response) => {
        navigation.navigate("Home");
        dispatch({type:"SET_LIST_ITEM_EDIT", payload: []})
        Toast.success("Xoá thực đơn thành công", 1);
      })
      .catch((error) => {
        alert("Đã có lỗi xảy ra, xin vui lòng thử lại sau");
        console.log("delete menu", error.response.data);
      });
  };
  const handleAddMenuToCart = () => {
    let newParty = {
      id: party.id,
      note: note,
      quantity: menuQuantity,
      partyTemplate: partyTemplate,
      itemList: itemParty,
      partyName:partyName,
      subTotal: totalCart,
      totalPrice: totalCart * menuQuantity,
    };
    setIsDone(false);
    console.log({
      cartItems: cart.cartsItem,
      party: newParty,
      id: cart.cartId,
      totalPrice: cart.totalPrice + newParty.totalPrice,
    })
    axios
      .put(BASE_URL + "/carts", {
        cartItems: cart.cartsItem,
        party: newParty,
        id: cart.cartId,
        totalPrice: cart.totalPrice + newParty.totalPrice,
      })
      .then((response) => {
        dispatch({
          type: "SET_PARTY_TOTAL_PRICE",
          payload: totalCart * menuQuantity,
        });
        getCartById()(dispatch, username);
        setIsDone(true);
        Toast.success("Cập nhật thành công", 1);
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert("Đã xảy ra lỗi , vui lòng thử lại sau");
        console.log(error.response.data);
      });
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
            BÀN TIỆC
          </Text>
        </View>
      </Flex>
      {/* <Box style={styles.editView}>
          <Flex flexDirection={"row"} style={{ alignItems: "center" }}>
            <Box>
              <Text style={styles.title}>Tạo thực đơn</Text>
            </Box>
            <Spacer />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddFoodMenu", {
                  food: foods,
                  events: events,
                  regions: regions,
                  banner:
                    "https://live.staticflickr.com/65535/52702504583_ff7ec0f38a_z.jpg",
                });
              }}
              activeOpacity={0.8}
            >
              <Text>them mon</Text>
            </TouchableOpacity>
          </Flex>
        </Box> */}
      <TouchableOpacity
        style={{
          position: "absolute",
          marginTop: 40,
          right: 0,
          marginRight: 16,
        }}
        onPress={() => {
          setIsOpen(true);
        }}
      >
        <CloseSquare size="28" color={THEME_COLOR} />
      </TouchableOpacity>
      <BackButton />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Box
          style={{
            borderRadius: 15,
            borderWidth: 1,
            borderColor: "#d83a3a",
            padding: 16,
            marginTop: 16,
          }}
        >
          <Flex mb={2} flexDirection="row" style={{ alignItems: "center" }}>
            <Flex style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                numberOfLines={1}
                ref={menuRef}
                style={[styles.title, { maxWidth: 180 }]}
                onChangeText={(value) => {
                 setPartyName(value)
                }}
                defaultValue={party.partyName}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  menuRef.current.focus();
                }}
              >
                <Edit size={18} color={"black"} style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </Flex>
            <Spacer />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddFoodMenu", {
                  food: foods,
                  events: events,
                  regions: regions,
                  banner:
                    "https://live.staticflickr.com/65535/52702504583_ff7ec0f38a_z.jpg",
                });
              }}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: 14, fontFamily: FONT.MEDIUM }}>
                Số lượng:
              </Text>
            </TouchableOpacity>
            <TextInput
              maxLength={3}
              keyboardType={"numeric"}
              underlineColorAndroid={"#d83a3a"}
              style={{
                fontSize: 14,
                fontFamily: FONT.MEDIUM,
                paddingVertical: 5,
                paddingHorizontal: 3,
                justifyContent: "center",
                alignItems: "center",
              }}
              onChangeText={(value) => {
                handleOnchangeText(value);
              }}
              //  value={menuQuantity}
              defaultValue={menuQuantity.toString()}
            />
            <Text style={{ fontSize: 14, fontFamily: FONT.MEDIUM }}>bàn</Text>
          </Flex>
          <Box mb={2}>
            <Text style={{ fontFamily: FONT.SEMI, fontSize: 16 }}>
              Ghi chú:
            </Text>
            <View>
              <TextArea
                style={{ fontFamily: "Quicksand-Regular" }}
                placeholder="Thêm ghi chú..."
                size="md"
                paddingLeft="4"
                borderWidth={0.5}
                mb={3}
                mt={1}
                borderColor={"#8c8c8c"}
                // value={note}
                borderRadius={15}
                _light={{
                  placeholderTextColor: "trueGray.400",
                  bg: "white",
                  _hover: {
                    bg: "white",
                    borderColor: "#8c8c8c",
                  },
                  _focus: {
                    bg: "white",
                    borderColor: "#8c8c8c",
                  },
                }}
                onChangeText={(value) => {
                  setNote(value);
                }}
                defaultValue={note}
              />
            </View>
          </Box>
          <Box mb={4}>
            <Text style={{ fontFamily: FONT.SEMI, fontSize: 16 }}>Món ăn</Text>
          </Box>
          {itemParty.length > 0 ? (
            <View>
              {itemParty.map((item, index) => {
                return (
                  <PartyItem key={index} item={item} onDelete={onDelete} />
                );
              })}
            </View>
          ) : null}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              borderColor: "#d83a3a",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderRadius: 15,
              padding: 10,
              borderStyle: "dashed",
            }}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("AddFoodMenu", {
                food: foods,
                events: events,
                regions: regions,
              });
            }}
          >
            <Add size="30" color="#d83a3a" />
            <Text
              style={{ fontSize: 18, fontFamily: FONT.BOLD, color: "#d83a3a" }}
            >
              Thêm món ăn
            </Text>
          </TouchableOpacity>
        </Box>
        <Box mt={4}>
          <Text style={styles.title}>Mẫu thực đơn</Text>
        </Box>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={listForm}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                marginTop: 8,

                marginRight: 8,
              }}
              onPress={() => {
                setPartyTemplate(item);
              }}
              activeOpacity={0.9}
            >
              <Image
                style={{
                  borderColor: item === partyTemplate ? THEME_COLOR : "#8c8c8c",
                  borderWidth: item === partyTemplate ? 2 : 1,
                  borderRadius: 16,
                }}
                borderRadius={15}
                h={200}
                w={150}
                source={{ uri: item }}
                alt={item}
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
      <Spacer />
      <View style={styles.paymentView}>
        <Flex direction="row" style={styles.paymentContentView}>
          <Text style={{ fontSize: 15, fontFamily: FONT.MEDIUM }}>Đơn giá</Text>
          <Spacer />
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Quicksand-Bold",
              color: THEME_COLOR,
            }}
          >
            {convertPrice(totalCart)}đ
          </Text>
          <Text style={{ fontFamily: FONT.MEDIUM, fontSize: 13 }}>/bàn</Text>
        </Flex>
        <Flex direction="row" style={styles.paymentContentView}>
          <Text style={{ fontSize: 16, fontFamily: FONT.SEMI }}>Tổng tiền</Text>
          <Spacer />
          <Text
            style={{
              fontSize: 22,
              fontFamily: "Quicksand-Bold",
              color: THEME_COLOR,
            }}
          >
            {convertPrice(totalCart * menuQuantity)}đ
          </Text>
        </Flex>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        {menuQuantity !== "0" &&
        itemParty.length > 0 &&
        menuQuantity.length > 0 &&
        partyTemplate.length > 0 ? (
          isDone ? (
            <ActionButton
              onPress={() => {
                handleAddMenuToCart();
              }}
              buttonText="Cập nhật giỏ hàng"
            />
          ) : (
            <ActionButton
              onPress={() => {
                console.log("check");
              }}
              disabled={true}
              buttonText="Đang cập nhật giỏ hàng...."
            />
          )
        ) : (
          <TouchableOpacity
            style={styles.buttonStyleLoading}
            activeOpacity={0.8}
            disabled={true}
          >
            <Flex flexDirection={"row"}>
              <Text style={styles.buttonText}>Cập nhật giỏ hàng</Text>
            </Flex>
          </TouchableOpacity>
        )}
      </View>
      <ConfirmDelete
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDelete={onDeleteMenu}
        title={
          <Text style={{ fontFamily: FONT.BOLD, fontSize: 18 }}>
            Xoá thực đơn
          </Text>
        }
        content="Bạn có muốn xoá thực đơn này, thao tác của bạn sẽ không được hoàn tác"
        cancelText="Huỷ"
        deleteText="Xoá"
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
  title: {
    fontSize: 14,
    fontFamily: "Quicksand-Bold",
    paddingVertical: 12,
  },
  topBar: {
    alignItems: "center",
    height: 50,
    backgroundColor: "white",
  },
  editView: {
    padding: 8,
    paddingHorizontal: 16,
    borderWidth: 0.5,
    borderColor: "#8c8c8c",
    borderRadius: 15,
  },
  title: {
    fontFamily: FONT.BOLD,
    fontSize: 20,
  },
  paymentContentView: {
    paddingVertical: 10,
    alignItems: "flex-end",
  },
  buttonStyleLoading: {
    borderRadius: 15,
    backgroundColor: "#ff9b9b",
    height: 47,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: FONT.BOLD,
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
});
export default EditPartyScreen;
