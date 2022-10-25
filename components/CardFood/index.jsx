import { Box, Image, Text, Flex, Spacer } from "native-base";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { AddCircle } from "iconsax-react-native";
import { connect, useSelector, useDispatch } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import { convertPrice } from "../../Utils/convertPrice";
import { useEffect } from "react";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const CardFood = (props) => {
  let { setCart } = props;
  
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { food, amountRating } = props;
  const setCartNumber = (food, quantity) => {
    dispatch({ type: "ADD_CART", payload: food });
  };
  return (
    <Box
      w={170}
      rounded="lg"
      borderColor="coolGray.200"
      borderWidth="1"
      borderRadius="10"
      alignItems="flex-start"
      style={styles.container}
    >
      <Image
        w="100%"
        h={132}
        borderRadius={10}
        source={{
          uri: food.imgURL,
        }}
        alt="image"
      />
      <Flex p={2} w="100%">
        <Flex style={styles.titleBox}>
          <Text pl={1} style={styles.textStyle}>
            {food.foodName}
          </Text>
        </Flex>
        <Flex style={styles.contentBox}>
          <Flex direction="row" style={{ alignItems: "center" }}>
            <AntDesign name="star" size={15} color="gold" />
            <Text pl={1} style={styles.textFoodContent}>
              {food.rating}(120 đánh giá)
            </Text>
          </Flex>
          <Flex direction="row" style={{ alignItems: "center" }}>
            <Feather name="shopping-cart" size={15} color="#6E798C" />
            <Text pl={1} style={styles.textFoodContent}>
              {food.orderedAmount} lượt đặt
            </Text>
          </Flex>
          <Flex direction="row" style={{ alignItems: "center" }}>
            <Text style={[styles.textFoodContent, styles.priceText]}>
              {convertPrice(food.price)} đ
            </Text>
            <Spacer />
            <TouchableWithoutFeedback
              onPress={() => {
                //navigation.navigate("CartScreen");
                setCartNumber(food, 1);
              }}
            >
              <AddCircle size="30" color="#d83a3a" variant="Bold" />
            </TouchableWithoutFeedback>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 4,
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
    //backgroundColor: "red",
    alignItems: "flex-start",
    height: 42,
  },
  priceText: { fontFamily: "Quicksand-Bold", fontSize: 20, color: "#d83a3a" },
});
export default CardFood;
