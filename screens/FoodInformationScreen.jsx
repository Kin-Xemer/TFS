import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Toast } from "@ant-design/react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import { AddCircle, Message, MinusCirlce } from "iconsax-react-native";
import { Flex, Spacer, Text, Heading, Divider, Spinner } from "native-base";
import { convertPrice } from "../Utils/convertPrice";
import RatingBar from "../components/RatingBar";
import { THEME_COLOR } from "../Utils/themeColor";
import { FONT } from "../Utils/themeFont";
import axios from "axios";
import { BASE_URL } from "../services/baseURL";
import {
  getAverageRating,
  getListPercentRating,
} from "../Utils/getListPercentRating";
import StarRating from "react-native-star-rating-widget";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const HEADER_MAX_HEIGHT = screenHeight * 0.42;
const HEADER_MIN_HEIGHT = 114;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const FoodInformationScreen = (props) => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [food, setFood] = useState(route.params.food);
  const isLogin = useSelector((state) => state.account.isLogin);
  const [quantity, setQuantity] = useState(1);
  const [contentOffset, setContentOffset] = useState(0);
  const [totalPrice, setTotalPrice] = useState();
  const [listFeedBack, setListFeedBack] = useState([]);
  const [countRating, setCountRating] = useState({});
  const [ratingAvg, setRatingAvg] = useState(0);
  const [isDone, setIsDone] = useState(true);

  const addToCart = (food, quantity) => {
    dispatch({ type: "ADD_CART", payload: food, quantity });
  };

  const addQuantity = () => {
    setQuantity(quantity + 1);
  };
  const minusQuantity = () => {
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    setTotalPrice(food.price * quantity);
  }, [quantity]);

  useEffect(() => {
    if (isFocused) {
      setIsDone(false);
      axios
        .get(BASE_URL + "/feedbacks/allbyfood/" + food.id)
        .then((response) => {
          let arr = response.data.map((item) => {
            return item.rate;
          });
          setIsDone(true);
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
    }
  }, [isFocused]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: "clamp",
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 1],
    extrapolate: "clamp",
  });
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -8],
    extrapolate: "clamp",
  });
  return (
    <>
      {isDone ? (
        <Flex style={styles.container}>
          <View style={{ height: 36 }}></View>
          <Animated.View
            style={[
              styles.header,
              { transform: [{ translateY: headerTranslateY }] },
            ]}
          >
            <Animated.Image
              style={[
                styles.headerBackground,
                {
                  opacity: imageOpacity,
                  transform: [{ translateY: imageTranslateY }],
                },
              ]}
              source={{
                uri:
                  food.imgUrl !== ""
                    ? food.imgUrl
                    : "https://live.staticflickr.com/65535/52706105979_db43d57386.jpg",
              }}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.topBar,
              {
                transform: [
                  { scale: titleScale },
                  { translateY: titleTranslateY },
                ],
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
              }}
            >
              <View>
                {contentOffset > 200 ? (
                  <Flex direction="row">
                    <Entypo name="chevron-left" size={36} color="black" />
                    {contentOffset > 330 ? (
                      <View style={{ justifyContent: "center" }}>
                        <Text style={[styles.textStyle, { fontSize: 18 }]}>
                          {food.foodName}
                        </Text>
                      </View>
                    ) : (
                      ""
                    )}
                  </Flex>
                ) : (
                  <Entypo name="chevron-left" size={36} color="white" />
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
            }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              {
                useNativeDriver: true,
                listener: (event) =>
                  setContentOffset(event.nativeEvent.contentOffset.y),
              }
            )}
          >
            <View style={styles.inforView}>
              <Flex style={styles.titleBox}>
                <Heading>
                  <Text style={[styles.textStyle, { fontSize: 25 }]}>
                    {food.foodName}
                  </Text>
                </Heading>
              </Flex>
              <Flex style={styles.contentBox}>
                <Flex
                  direction="row"
                  style={{ alignItems: "center", marginTop: 4 }}
                >
                  <AntDesign name="star" size={24} color="gold" />
                  <Text pl={1} style={styles.textFoodContent}>
                    {ratingAvg} ({food.ratingNum} đánh giá)
                  </Text>
                </Flex>
                <Flex
                  direction="row"
                  style={{ alignItems: "center", marginTop: 4 }}
                >
                  <Feather name="shopping-cart" size={24} color="#6E798C" />
                  <Text pl={1} style={styles.textFoodContent}>
                    {food.purchaseNum} lượt đặt
                  </Text>
                </Flex>
                <Flex
                  direction="row"
                  style={{ alignItems: "center", marginTop: 4 }}
                >
                  <Heading>
                    <Text style={[styles.textFoodContent, styles.priceText]}>
                      {convertPrice(food.price)} đ
                    </Text>
                  </Heading>
                  <Spacer />
                  <Flex direction="row" style={{ alignItems: "center" }}>
                    {quantity !== 1 ? (
                      <TouchableWithoutFeedback
                        onPress={() => {
                          minusQuantity();
                        }}
                      >
                        <View>
                          <MinusCirlce
                            size="25"
                            color={THEME_COLOR}
                            variant="Outline"
                          />
                        </View>
                      </TouchableWithoutFeedback>
                    ) : (
                      <TouchableWithoutFeedback>
                        <View>
                          <MinusCirlce
                            size="25"
                            color={THEME_COLOR}
                            variant="Outline"
                          />
                        </View>
                      </TouchableWithoutFeedback>
                    )}
                    <View style={{ width: 30, alignItems: "center" }}>
                      <Text>{quantity}</Text>
                    </View>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        addQuantity();
                      }}
                    >
                      <View>
                        <AddCircle
                          size="25"
                          color={THEME_COLOR}
                          variant="Outline"
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  </Flex>
                </Flex>
                <View style={styles.description}>
                  <Text style={[styles.textDescription]}>Mô tả</Text>
                  <Text style={[styles.textDesDetail]}>{food.description}</Text>
                </View>
              </Flex>
              <Text style={[styles.textDescription, { marginTop: 15 }]}>
                Đánh giá
              </Text>

              {listFeedBack.length > 0 ? (
                <>
                <Flex p={2} direction="row" style={styles.ratingContainer}>
                  <View style={styles.ratingPointField}>
                    <Flex justifyContent={"center"} alignItems="center">
                      <StarRating
                        rating={ratingAvg}
                        color={"#ffd000"}
                        onChange={(rating) => {}}
                        enableSwiping={false}
                        enableHalfStar={false}
                        starSize={30}
                        starStyle={{
                          marginRight: -5,
                        }}
                        emptyColor="#8c8c8c"
                        style={{ marginLeft: -5 }}
                      />
                      <Text
                        style={{
                          fontFamily: FONT.BOLD,
                          color: THEME_COLOR,
                          fontSize: 25,
                          paddingTop: 12,
                        }}
                      >
                        {ratingAvg}
                        <Text style={{ fontSize: 16, color: "black" }}>/5</Text>
                      </Text>
                    </Flex>
                  </View>
                  <Spacer />
                  <View style={styles.ratingPointField}>
                    <Flex direction="row">
                      <View>
                        {Object.keys(countRating)
                          .reverse()
                          .map((key, index) => {
                            return (
                              <RatingBar
                                key={index}
                                progress={
                                  listFeedBack.length !== 0
                                    ? countRating[key] / listFeedBack.length
                                    : 0
                                }
                                number={key}
                              />
                            );
                          })}
                      </View>
                    </Flex>
                  </View>
                </Flex>
                <Divider my={3} />
                <TouchableOpacity
                activeOpacity={0.7}
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => {
                  navigation.navigate("FeedbackDetailScreen", {
                    foodId: food.id,
                  });
                }}
              >
                <Message size="32" color="black" />
                <Text
                  style={{
                    fontFamily: FONT.BOLD,
                    fontSize: 18,
                    marginStart: 8,
                  }}
                >
                  Xem đánh giá
                </Text>
                <Spacer />
                <Entypo name="chevron-right" size={36} />
              </TouchableOpacity>
              <Divider my={3} />
              </>
              ) : (
                <Flex p={2} style={styles.ratingContainer}>
                  <Text style={{ fontFamily: FONT.MEDIUM, fontSize: 18 }}>
                    Hiện chưa có đánh giá
                  </Text>
                </Flex>
              )}
     
              
            </View>
          </Animated.ScrollView>
          <View
            style={{ paddingHorizontal: 16, backgroundColor: "transparent" }}
          >
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.8}
              onPress={() => {
                if (isLogin) {
                  addToCart(food, quantity);
                  Toast.success("Đã thêm vào giỏ hàng", 0.5);
                  if (navigation.canGoBack()) {
                    navigation.goBack();
                  }
                }else{
                  navigation.navigate("LoginScreenn")
                }
              }}
            >
              <Text style={styles.buttonText}>
                Thêm - {convertPrice(totalPrice)} đ
              </Text>
            </TouchableOpacity>
          </View>
        </Flex>
      ) : (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Spinner size={"sm"} />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "white",
  },
  textStyle: {
    fontFamily: FONT.BOLD,
    fontSize: 14,
  },

  inforView: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 26,
  },
  textFoodContent: {
    fontFamily: FONT.SEMI,
    fontSize: 12,
    color: "#6E798C",
  },
  titleBox: {
    width: "100%",
    alignItems: "flex-start",
    height: 42,
  },
  priceText: { fontFamily: FONT.BOLD, fontSize: 25, color: THEME_COLOR },
  textDescription: {
    fontFamily: FONT.BOLD,
    fontSize: 15,
  },
  textDesDetail: {
    fontFamily: FONT.REGULAR,
    fontSize: 14,
    color: "#A4A4A4",
  },
  description: {
    marginTop: 16,
  },
  ratingContainer: {
    marginTop: 8,
    borderRadius: 15,
    backgroundColor: "#f6f6f6",
    paddingHorizontal: 20,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT,
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    width: "100%",
    height: HEADER_MAX_HEIGHT,
    resizeMode: "cover",
  },
  topBar: {
    marginTop: 50,
    height: 50,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  ratingPointField: {
    justifyContent: "center",
  },
  buttonStyle: {
    borderRadius: 15,
    backgroundColor: THEME_COLOR,
    height: 47,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: FONT.BOLD,
    fontSize: 18,
    color: "#fff",
  },
});
export default FoodInformationScreen;
