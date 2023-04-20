import { Box, Image, Text, Flex, Spacer, useToast } from "native-base";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Toast } from "@ant-design/react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { AddCircle } from "iconsax-react-native";
import { connect, useSelector, useDispatch } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import { convertPrice } from "../../Utils/convertPrice";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { THEME_COLOR } from "../../Utils/themeColor";
import { getCartById } from "../../Utils/api/getCart";
import { BASE_URL } from "../../services/baseURL";
import {
  getAverageRating,
  getListPercentRating,
} from "../../Utils/getListPercentRating";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const CardCombo = (props) => {
  let { food, itemWith, mh, mr } = props;
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.account.isLogin);
  const navigation = useNavigation();
  const [listFeedBack, setListFeedBack] = useState([]);
  const [countRating, setCountRating] = useState({});
  const [ratingAvg, setRatingAvg] = useState(0);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const fetchFeedbacks = useCallback(async () => {
    try {
      const response = await axios.get(
        BASE_URL + "/feedbacks/allbyfood/" + food.id,
        {
          cancelToken: new axios.CancelToken((cancel) => {
            // Set up a cancel function that will be called if the component unmounts before the request completes
            cancel;
          }),
        }
      );

      const arr = response.data.map((item) => {
        return item.rate;
      });
      const array = getListPercentRating(arr);

      setListFeedBack(response.data);
      setCountRating(array);
      setRatingAvg(arr.length !== 0 ? getAverageRating(arr) : 0);
    } catch (error) {
      if (!axios.isCancel(error)) {
        if (error.response) {
          alert("Đã có lỗi xảy ra, xin vui lòng thử lại sau");
          console.log(error.response.data);
        }else{
          console.log(error.message);
        }
      }
    }
  }, [food.id]);

  useEffect(() => {
    fetchFeedbacks();
    return () => {
      // Hủy request khi component unmounted
      source.cancel("Component unmounted");
    };
  }, [fetchFeedbacks]);

  const addToCart = useCallback(
    (food, quantity) => {
      dispatch({ type: "ADD_CART", payload: food, quantity });
    },
    [dispatch]
  );

  return (
    <Box
      rounded="lg"
      borderColor="coolGray.300"
      borderWidth="0.8"
      borderRadius="15"
      alignItems="center"
      flexDirection={"row"}
      style={[
        styles.container,
        { width: itemWith, marginHorizontal: mh, marginRight: mr },
      ]}
    >
      <Image
        size={90}
        borderRadius={15}
        borderBottomLeftRadius={15}
        source={{
          uri:
            food.imgUrl !== ""
              ? food.imgUrl
              : "https://live.staticflickr.com/65535/52706105979_db43d57386.jpg",
        }}
        alt="image"
      />

      <Flex pl={2.5} pr={2} width={itemWith - 92}>
        <Flex style={styles.titleBox}>
          <Text numberOfLines={1} style={[styles.textStyle, { fontSize: 18 }]}>
            {food.foodName}
          </Text>
        </Flex>
        <Text pl={1} style={styles.textFoodContent} numberOfLines={1}>
          {food.description}
        </Text>
        <Flex>
          <Flex direction="row" style={{ alignItems: "center" }}>
            <AntDesign name="star" size={15} color="gold" />
            <Text pl={1} style={styles.textFoodContent}>
              {ratingAvg}({food.ratingNum} đánh giá)
            </Text>
          </Flex>
          {/* <Flex direction="row" style={{ alignItems: "center" }}>
            <Feather name="shopping-cart" size={15} color="#6E798C" />
            <Text pl={1} style={styles.textFoodContent}>
              {food.purchaseNum} lượt đặt
            </Text>
          </Flex> */}
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
  },
  priceText: { fontFamily: "Quicksand-Bold", fontSize: 20, color: THEME_COLOR },
});
export default CardCombo;
