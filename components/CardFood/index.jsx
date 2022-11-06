import { Box, Image, Text, Flex, Spacer, useToast } from "native-base";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import { AntDesign, Feather } from "@expo/vector-icons";
import { AddCircle } from "iconsax-react-native";
import { connect, useSelector, useDispatch } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import { convertPrice } from "../../Utils/convertPrice";
import axios from "axios";
import { useEffect } from "react";
import { THEME_COLOR } from "../../Utils/themeColor";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const CardFood = (props) => {
  const getAllFood = () => {
    axios
      .get(
        "http://tfsapiv1-env.eba-aagv3rp5.ap-southeast-1.elasticbeanstalk.com/api/foods"
      )
      .then((response) => {
        setFood(response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  let { setCart, food } = props;
  const toast = useToast();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const addToCart = (food, quantity) => {
    dispatch({ type: "ADD_CART", payload: food, quantity });
  };
  const id = "test-toast";
  return (
    <Box
      rounded="lg"
      borderColor="coolGray.300"
      borderWidth="0.5"
      borderRadius="15"
      alignItems="flex-start"
      style={styles.container}
    >
      <View
        style={{
          width:"100%",
          height:110,
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
          borderRadius={15}
          source={{
            uri: food.imgUrl,
          }}
          alt="image"
        />
      </View>
      <Flex p={1} pl={2} pb={2} w="100%">
        <Flex style={styles.titleBox}>
          <Text
            numberOfLines={2}
            pl={1}
            style={[styles.textStyle, { fontSize: 16 }]}
          >
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
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                addToCart(food, 1);
                if (!toast.isActive(id)) {
                  toast.show({
                    id,
                    duration: 2000,
                    placement: "top",
                    render: () => {
                      return (
                        <Box bg="#e5e5e5" px="2" py="1" rounded="sm" mt={5}>
                          Đã thêm vào giỏ hàng
                        </Box>
                      );
                    },
                  });
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
    width: 145,
    backgroundColor: "white",
    marginRight: 16,
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
    height: 38,
  },
  priceText: { fontFamily: "Quicksand-Bold", fontSize: 20, color: THEME_COLOR },
});
export default CardFood;
