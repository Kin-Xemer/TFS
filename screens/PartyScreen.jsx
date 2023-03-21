import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Add, Edit } from "iconsax-react-native";
import { Flex, Spacer, Box, TextArea, Image } from "native-base";
import { convertPrice } from "../Utils/convertPrice";
import axios from "axios";
import { THEME_COLOR } from "../Utils/themeColor";
import { FONT } from "../Utils/themeFont";
import BackButton from "../components/BackButton";
import { BASE_URL } from "../services/baseURL";
import PartyItem from "../components/PartyItem";
import ActionButton from "../components/ActionButton";
import { Toast } from "@ant-design/react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const PartyScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const menuRef = useRef();
  const items = useSelector((state) => state.party);
  const [quantity, setQuantity] = useState(0);
  const [isDone, setIsDone] = useState(true);
  const [events, setEvents] = useState();
  const [regions, setRegions] = useState();
  const foods = useSelector((state) => state.food.food);
  const itemParty = useSelector((state) => state.party.itemList);
  const note = useSelector((state) => state.party.note);
  const menuQuantity = useSelector((state) => state.party.quantity);
  const partyTemplate = useSelector((state) => state.party.partyTemplate);
  const party = useSelector((state) => state.party);
  const subTotal = useSelector((state) => state.party.subTotal);
  const totalPrice = useSelector((state) => state.party.totalPrice);
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {

    console.log("subtotal in screen", party.subTotal);
    console.log("total", totalPrice);
  }, [itemParty.length, menuQuantity, subTotal]);

  useEffect(() => {
    getRegion();
    getEvent();
  }, []);

  const listForm = [
    "https://live.staticflickr.com/65535/52747068688_98b7ab0db3_n.jpg",
    "https://live.staticflickr.com/65535/52732979173_ea3e3fd0f4_n.jpg",
    "https://live.staticflickr.com/65535/52747068678_7b8739f8ae_n.jpg",
    "https://live.staticflickr.com/65535/52746045822_ba6ba05343_n.jpg",
  ];

  const onNoteChange = (value) => {
    dispatch({ type: "SET_NOTE", payload: value });
  };
  const handleOnchangeText = (value) => {
    dispatch({ type: "SET_MENU_QUANTITY", payload: value });
  };

  const onDelete = (item) => {
    dispatch({ type: "DELETE_MENU_ITEM", payload: item.foodId });
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

  const handleAddMenuToCart = () => {
    setIsDone(false);
    // console.log("party", party);
    // console.log("cart", {cartItems: cart.cartItems,
    //   party: party,
    //   id: cart.id,
    //   totalPrice: cart.totalPrice + party.totalPrice,
    // });

    axios
      .post(BASE_URL + "/carts/party/new/" + cart.id, party)
      .then((response) => {
        axios
          .put(BASE_URL + "/carts", {
            cartItems: cart.cartItems,
            party: party,
            id: cart.id,
            totalPrice: cart.totalPrice + party.totalPrice,
          })
          .then(() => {
            setIsDone(true);
            dispatch({ type: "DELETE_PARTY" });
            Toast.success("Đã thêm vào giỏ hàng", 1);
            navigation.navigate("Home");
          });
      })
      .catch((error) => {
        alert("Đã xảy ra lỗi , vui lòng thử lại sau");
        setIsDone(true);
        console.log("Error create parrty ", error);
      });

    // axios
    //   .post(BASE_URL + "/parties", party)
    //   .then((response) => {
    //     let newCart = {
    //       id: cart.id,
    //       cartItems: cart.cartItems,
    //       party: response.data,
    //       totalPrice: response.data.totalPrice + cart.totalPrice,
    //     };
    //     // console.log("cart.totalPrice", cart.totalPrice + "esponse.data.totalPrice", response.data.totalPrice);
    //     axios
    //       .put(BASE_URL + "/carts?cart", newCart)
    //       .then(() => {
    //         setIsDone(true);
    //         dispatch({ type: "DELETE_PARTY" });
    //         Toast.success("Đã thêm vào giỏ hàng", 1);
    //         navigation.navigate("Home");
    //       })
    //       .catch((error) => {
    //         alert("Đã xảy ra lỗi, xin vui lòng thử lại sau");
    //         console.log("Error put party to cart", error);
    //       });
    //   })
    //   .catch((error) => {
    //     alert("Đã xảy ra lỗi , vui lòng thử lại sau");
    //     console.log("Error create parrty ", error);
    //   });
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
      <BackButton />
      {/* <ModalParty
        setSelectedParty={setSelectedParty}
        selectedParty={selectedParty}
        listParty={listParty}
        toggleModal={toggleModal}
        isVisible={isVisible}
      /> */}
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
            <Box>
              <Flex style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  numberOfLines={1}
                  ref={menuRef}
                  style={[styles.title, { maxWidth: 180 }]}
                  onChangeText={(value) => {
                    dispatch({ type: "SET_PARTY_NAME", payload: value });
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
              value={menuQuantity}
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
                  onNoteChange(value);
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
                dispatch({ type: "SET_SELECTED_FORM", payload: item });
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
            {convertPrice(subTotal)}đ
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
            {convertPrice(subTotal * menuQuantity)}đ
          </Text>
        </Flex>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        {menuQuantity !== "0" &&
        itemParty.length > 0 &&
        menuQuantity.length > 0 ? (
          !isDone ? (
            <ActionButton
              // onPress={() => {
              //   handleAddMenuToCart();
              // }}
              disabled={true}
              buttonText="Đang thêm vào giỏ hàng..."
            />
          ) : (
            <ActionButton
              onPress={() => {
                handleAddMenuToCart();
              }}
              buttonText="Thêm vào giỏ hàng"
            />
          )
        ) : (
          <TouchableOpacity
            style={styles.buttonStyleLoading}
            activeOpacity={0.8}
            disabled={true}
          >
            <Flex flexDirection={"row"}>
              <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
            </Flex>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
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
export default PartyScreen;
