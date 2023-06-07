import { Box, Image, Text, Flex, Spacer } from "native-base";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Toast } from "@ant-design/react-native";
import {  Feather } from "@expo/vector-icons";
import { AddCircle } from "iconsax-react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { convertPrice } from "../../Utils/convertPrice";
import { THEME_COLOR } from "../../Utils/themeColor";
import { FONT } from "../../Utils/themeFont";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const CardFoodMenu = (props) => {
  let { food, isLogin = true, itemWith, mh, mr } = props;
  const dispatch = useDispatch();
  const username = useSelector(
    (state) => state.account.account.theAccount.accountId
  );
  const party = useSelector((state) => state.cart.party);
  const itemParty = useSelector((state) => state.party.itemList);
  const itemPartyEdit = useSelector((state) => state.cart.itemList);
  const navigation = useNavigation();

  const addMenu = () => {
    if (party !== null) {
      if (itemPartyEdit.some((item) => item.foodId === food.id)) {
        Toast.fail("Món này đã có trong thực đơn", 1);
      } else {
        dispatch({ type: "PUSH_LIST_ITEM_EDIT", payload: food });
        Toast.success("Đã thêm món ăn vào thực đơn", 1);
      }
    } else {
      if (itemParty.some((item) => item.foodId === food.id)) {
        Toast.fail("Món này đã có trong thực đơn", 1);
      } else {
        dispatch({ type: "SET_PARTY_LIST", payload: food });
        Toast.success("Đã thêm món ăn vào thực đơn", 1);
      }
    }
  };
  return (
    <Box
      rounded="lg"
      borderColor="coolGray.300"
      borderWidth="0.5"
      borderRadius="15"
      alignItems="flex-start"
      style={[
        styles.container,
        { width: itemWith, marginHorizontal: mh, marginRight: mr },
      ]}
    >
      <View
        style={{
          width: "100%",
          height: 115,
          shadowColor: "silver",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 1,
          shadowRadius: 1.2,
        }}
      >
        <Image
          h={110}
          borderTopRightRadius={15}
          borderTopLeftRadius={15}
          source={{
            uri:
              food.imgUrl !== ""
                ? food.imgUrl
                : "https://live.staticflickr.com/65535/52706105979_db43d57386.jpg",
          }}
          alt="image"
        />
      </View>
      <Flex p={1} pl={2.5} pr={2} pb={2} w="100%">
        <Flex style={styles.titleBox}>
          <Text numberOfLines={1} style={[styles.textStyle, { fontSize: 18 }]}>
            {food.foodName}
          </Text>
        </Flex>
        <Flex>
          <Flex direction="row" style={{ alignItems: "center" }}>
            <Feather name="shopping-cart" size={15} color="#6E798C" />
            <Text pl={1} style={styles.textFoodContent}>
              {food.purchaseNum} lượt đặt
            </Text>
          </Flex>
          <Flex direction="row" style={{ alignItems: "center" }}>
            <Text style={[styles.textFoodContent, styles.priceText]}>
              {convertPrice(food.price * 5)} đ
            </Text>
            <Spacer />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                addMenu();
              }}
            >
              <AddCircle size="28" color={THEME_COLOR} variant="Bold" />
            </TouchableOpacity>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    shadowColor: "silver",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.2,
  },
  textStyle: {
    fontFamily: FONT.BOLD,
    fontSize: 14,
  },
  textFoodContent: {
    fontFamily: FONT.SEMI,
    fontSize: 12,
    color: "#6E798C",
  },
  titleBox: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  priceText: { fontFamily: FONT.BOLD, fontSize: 20, color: THEME_COLOR },
});
export default CardFoodMenu;
