import { useRoute, useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  SafeAreaView,TouchableOpacity
} from "react-native";
import {useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { AntDesign, Feather,Entypo } from "@expo/vector-icons";
import { AddCircle, MinusCirlce } from "iconsax-react-native";
import { Flex, Spacer, Text, Heading, Button, useToast, Box } from "native-base";
import { convertPrice } from "../Utils/convertPrice";
import RatingBar from "../components/RatingBar";
import Toast from 'react-native-toast-message';
import { THEME_COLOR } from "../Utils/themeColor";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const HEADER_MAX_HEIGHT = screenHeight * 0.42;
const HEADER_MIN_HEIGHT = 114;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const FoodInformationScreen = (props) => {
  const toast = useToast();
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [food, setFood] = useState(route.params.food);
  const [quantity, setQuantity] = useState(1);
  const [contentOffset, setContentOffset] = useState(0);
  const [totalPrice, setTotalPrice] = useState();
  
  const id = "test-toast";

  const addToCart = (food, quantity) => {
    dispatch({ type: "ADD_CART", payload: food , quantity});
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
            uri: food.imgUrl !== "" ? food.imgUrl : "https://live.staticflickr.com/65535/52706105979_db43d57386.jpg",
          }}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.topBar,
          {
            transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
          },
        ]}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
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
        </TouchableWithoutFeedback>
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
            <Heading style={[styles.textStyle, { fontSize: 25 }]}>
              {food.foodName}
            </Heading>
          </Flex>
          <Flex style={styles.contentBox}>
            <Flex
              direction="row"
              style={{ alignItems: "center", marginTop: 4 }}
            >
              <AntDesign name="star" size={24} color="gold" />
              <Text pl={1} style={styles.textFoodContent}>
                {food.rating} (120 đánh giá)
              </Text>
            </Flex>
            <Flex
              direction="row"
              style={{ alignItems: "center", marginTop: 4 }}
            >
              <Feather name="shopping-cart" size={24} color="#6E798C" />
              <Text pl={1} style={styles.textFoodContent}>
                {food.orderedAmount} lượt đặt
              </Text>
            </Flex>
            <Flex
              direction="row"
              style={{ alignItems: "center", marginTop: 4 }}
            >
              <Heading style={[styles.textFoodContent, styles.priceText]}>
                {convertPrice(food.price)} đ
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
                    <AddCircle size="25" color={THEME_COLOR} variant="Outline" />
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

          <Flex p={2} direction="row" style={styles.ratingContainer}>
            <View style={styles.ratingPointField}>
              <Flex>
                <Flex direction="row">
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                </Flex>
              </Flex>
            </View>
            <Spacer />
            <View style={styles.ratingPointField}>
              <Flex direction="row">
                <View>
                  <RatingBar progress={0.76} number="5"/>               
                  <RatingBar progress={0.23} number="4"/>               
                  <RatingBar progress={0.12} number="3"/>               
                  <RatingBar progress={0.1} number="2"/>               
                  <RatingBar progress={0.06} number="1"/>                            
                </View>
              </Flex>
            </View>
          </Flex>
          <Flex p={2} direction="row" style={styles.ratingContainer}>
            <View style={styles.ratingPointField}>
              <Flex>
                <Flex direction="row">
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                </Flex>
              </Flex>
            </View>
            <Spacer />
            <View style={styles.ratingPointField}>
              <Flex direction="row">
                <View>
                  <RatingBar progress={0.76} number="5"/>               
                  <RatingBar progress={0.23} number="4"/>               
                  <RatingBar progress={0.12} number="3"/>               
                  <RatingBar progress={0.1} number="2"/>               
                  <RatingBar progress={0.06} number="1"/>                            
                </View>
              </Flex>
            </View>
          </Flex>
          <Flex p={2} direction="row" style={styles.ratingContainer}>
            <View style={styles.ratingPointField}>
              <Flex>
                <Flex direction="row">
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                </Flex>
              </Flex>
            </View>
            <Spacer />
            <View style={styles.ratingPointField}>
              <Flex direction="row">
                <View>
                  <RatingBar progress={0.76} number="5"/>               
                  <RatingBar progress={0.23} number="4"/>               
                  <RatingBar progress={0.12} number="3"/>               
                  <RatingBar progress={0.1} number="2"/>               
                  <RatingBar progress={0.06} number="1"/>                            
                </View>
              </Flex>
            </View>
          </Flex>
          <Flex p={2} direction="row" style={styles.ratingContainer}>
            <View style={styles.ratingPointField}>
              <Flex>
                <Flex direction="row">
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                </Flex>
              </Flex>
            </View>
            <Spacer />
            <View style={styles.ratingPointField}>
              <Flex direction="row">
                <View>
                  <RatingBar progress={0.76} number="5"/>               
                  <RatingBar progress={0.23} number="4"/>               
                  <RatingBar progress={0.12} number="3"/>               
                  <RatingBar progress={0.1} number="2"/>               
                  <RatingBar progress={0.06} number="1"/>                            
                </View>
              </Flex>
            </View>
          </Flex>
          <Flex p={2} direction="row" style={styles.ratingContainer}>
            <View style={styles.ratingPointField}>
              <Flex>
                <Flex direction="row">
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                  <AntDesign name="star" size={24} color="gold" />
                </Flex>
              </Flex>
            </View>
            <Spacer />
            <View style={styles.ratingPointField}>
              <Flex direction="row">
                <View>
                  <RatingBar progress={0.76} number="5"/>               
                  <RatingBar progress={0.23} number="4"/>               
                  <RatingBar progress={0.12} number="3"/>               
                  <RatingBar progress={0.1} number="2"/>               
                  <RatingBar progress={0.06} number="1"/>                            
                </View>
              </Flex>
            </View>
          </Flex>

        </View>
      </Animated.ScrollView>
      <View style={{ paddingHorizontal: 16, backgroundColor: "transparent" }}>   
        <TouchableOpacity style={styles.buttonStyle}
        activeOpacity={0.8}
        onPress={() =>{
          addToCart(food, quantity);
          if (!toast.isActive(id)) {
            toast.show({
              id,
              duration: 2000,
              placement:"top",
              render: () => {
                return (
                  <Box bg="#e5e5e5" px="2" py="1" rounded="sm" mt={5}>
                    Đã thêm vào giỏ hàng
                  </Box>
                );
              },
            });
          }
          navigation.goBack();
        }}
        >
          <Text style={styles.buttonText}>
            Thêm - {convertPrice(totalPrice)} đ
          </Text>
        </TouchableOpacity>
      </View>
    </Flex>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    backgroundColor: "white",
  },
  textStyle: {
    fontFamily: "Quicksand-Bold",
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
    fontFamily: "Quicksand-SemiBold",
    fontSize: 12,
    color: "#6E798C",
  },
  titleBox: {
    width: "100%",
    alignItems: "flex-start",
    height: 42,
  },
  priceText: { fontFamily: "Quicksand-Bold", fontSize: 25, color: THEME_COLOR },
  textDescription: {
    fontFamily: "Quicksand-Bold",
    fontSize: 15,
  },
  textDesDetail: {
    fontFamily: "Quicksand-Regular",
    fontSize: 14,
    color: "#A4A4A4",
  },
  description: {
    marginTop: 16,
  },
  buttonStyle: {
    borderRadius: 15,
    backgroundColor: THEME_COLOR,
    height: 47,
    alignItems: "center",justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Quicksand-Bold",
    fontSize: 18,
    color: "#fff",
  },
  ratingContainer: {
    width: "100%",
    height: 135,
    borderRadius: 15,
    backgroundColor: "#F4F3F3",
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
    width: "45%",
    height: "100%",
    justifyContent: "center",
  },
});
export default FoodInformationScreen;
