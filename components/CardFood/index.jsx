import { Box, Image, Text, Flex, Spacer, useToast } from "native-base";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Toast } from "@ant-design/react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { AddCircle } from "iconsax-react-native";
import { connect, useSelector, useDispatch } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import { convertPrice } from "../../Utils/convertPrice";
import axios from "axios";
import { useEffect, useState } from "react";
import { THEME_COLOR } from "../../Utils/themeColor";
import { getCartById } from "../../Utils/api/getCart";
import { BASE_URL } from "../../services/baseURL";
import { getAverageRating, getListPercentRating } from "../../Utils/getListPercentRating";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const CardFood = (props) => {
  let { food, isLogin, itemWith, mh, mr } = props;
  const dispatch = useDispatch();
  const username = useSelector(
    (state) => state.account.account.theAccount.accountId
  );
  const navigation = useNavigation();
  const [listFeedBack, setListFeedBack] = useState([]);
  const [countRating, setCountRating] = useState({});
  const [ratingAvg, setRatingAvg] = useState(0);
  useEffect(() => {
    axios
      .get(BASE_URL + "/feedbacks/allbyfood/" + food.id)
      .then((response) => {
        let arr = response.data.map((item) => {
          return item.rate;
        });
        setListFeedBack(response.data);
        const array = getListPercentRating(arr);
        setRatingAvg(arr.length !== 0 ? getAverageRating(arr) : 0);
        setCountRating(array);
      })
      .catch((error) => {
        if (error.response) {
          alert("Đã có lỗi xảy ra, xin vui lòng thử lại sau");
          console.log(error.response.data);
        }
      });
  }, []);
  const addToCart = async (food, quantity) => {
    await dispatch({ type: "ADD_CART", payload: food, quantity });
    await getCartById()(dispatch, username);
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
            <AntDesign name="star" size={15} color="gold" />
            <Text pl={1} style={styles.textFoodContent}>
              {ratingAvg}({food.ratingNum} đánh giá)
            </Text>
          </Flex>
          <Flex direction="row" style={{ alignItems: "center" }}>
            <Feather name="shopping-cart" size={15} color="#6E798C" />
            <Text pl={1} style={styles.textFoodContent}>
              {food.purchaseNum} lượt đặt
            </Text>
          </Flex>
          <Flex direction="row" style={{ alignItems: "center" }}>
            <Text style={[styles.textFoodContent, styles.priceText]}>
              {convertPrice(food.price)} đ
            </Text>
            <Spacer />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (isLogin === true) {
                  addToCart(food, 1);
                  Toast.success("Đã thêm vào giỏ hàng", 0.5);
                } else {
                  navigation.navigate("LoginScreenn");
                }
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
    fontFamily: "Quicksand-Bold",
    fontSize: 14,
  },
  textFoodContent: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 12,
    color: "#6E798C",
  },
  titleBox: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  priceText: { fontFamily: "Quicksand-Bold", fontSize: 20, color: THEME_COLOR },
});
export default CardFood;
