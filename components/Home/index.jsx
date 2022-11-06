import { useEffect, useState } from "react";
import { Flex, Spacer, Divider, VStack, Box, Badge, Button } from "native-base";
import { useRoute, useNavigation } from "@react-navigation/native";
import { connect, useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Location, ArrowDown2 } from "iconsax-react-native";
import ImageTitle from "../ImageTitle/index";
import SearchBar from "../SearchBar/index";
import { Feather, Entypo } from "@expo/vector-icons";
import Categories from "../Categories/index";
import Title from "../Title";
import CardFood from "../CardFood";
import getAllFood from "../../services/getAllFood";
import { THEME_COLOR } from "../../Utils/themeColor";
const Home = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [foods, setFood] = useState([]);

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

  useEffect(() => {
    getAllFood();
    console.log(foods.length);
  }, []);
  
  const numberCart = useSelector((state) => state.cart.numberCart);
  const getNumberCart = (state) => {
    dispatch({ type: "GET_NUMBER_CART" });
  };
  return foods.length > 0 ? (
    <Flex style={styles.container}>
      <Flex direction="row" style={{ paddingHorizontal: 16 }}>
        <View style={styles.locationHeader}>
          <Flex direction="row" style={{ marginBottom: 4 }}>
            <View style={{ paddingLeft: 3 }}>
              <Text style={styles.textStyle}>Vị trí của bạn</Text>
            </View>
            <Entypo name="chevron-down" size={14} color="black" />
          </Flex>
          <Flex direction="row">
            <Location size="14" color={THEME_COLOR} />
            <Text style={[styles.textStyle, styles.addressText]}>
              Đại học FPT, Quận 9, Thành Phố Hồ Chí Minh
            </Text>
          </Flex>
        </View>
        <Spacer />
        <View style={styles.cartView}>
          <Badge // bg="red.400"
            colorScheme="danger"
            rounded="xl"
            mb={-3}
            mr={-2}
            zIndex={1}
            variant="solid"
            alignSelf="flex-end"
            style={{
              paddingRight: 5,
              paddingLeft: 5,
              paddingTop: 1,
              paddingBottom: 1,
            }}
            _text={{
              fontFamily: "Quicksand-Bold",
              fontSize: 8,
            }}
          >
            {numberCart}
          </Badge>
          <TouchableWithoutFeedback
            style={{
              marginVertical: "auto",
              padding: 4,
            }}
            onPress={() => {
              navigation.navigate("CartScreen");
            }}
          >
            <View>
              <Feather name="shopping-cart" size={27} color={THEME_COLOR} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Flex>
      <View style={{ marginBottom: 6 }}>
        <SearchBar />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{
            marginLeft: -16,
            justifyContent: "center",
            paddingHorizontal: 16,
          }}
        >
          <ImageTitle />
        </View>
        <Divider />
        <Categories />
        <Title textTitle="Món chính" />
        <FlatList
          contentContainerStyle={{ marginLeft: 17 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={foods.slice(0, 10)}
          renderItem={({ item }) => (
            <Flex direction="row" style={styles.cardFoodView}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("FoodInformationScreen", { food: item })
                }
              >
                <CardFood setCart={getNumberCart} food={item} />
              </TouchableOpacity>
            </Flex>
          )}
          keyExtractor={(item) => `${item.id}`}
        />
        <Title textTitle="Bán chạy" />
        <FlatList
          contentContainerStyle={{ marginLeft: 17 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={foods}
          renderItem={({ item }) => (
            <Flex direction="row" style={styles.cardFoodView}>
              <CardFood food={item} />
            </Flex>
          )}
          keyExtractor={(item) => `${item.id}`}
        />
        <View style={{ paddingHorizontal: 16, backgroundColor: "transparent" }}>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("LoginScreenn");
            }}
          >
            <Text style={styles.buttonText}>dang nhap</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Flex>
  ) : (
    <View style={[styles.container, { backgroundColor: "red" }]}>
      <Text>doi xiu</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paddingStyle: {
    paddingRight: 16,
    paddingLeft: 16,
  },
  textStyle: {
    fontFamily: "Quicksand-Regular",
    fontSize: 10,
  },
  addressText: {
    fontFamily: "Quicksand-Bold",
    marginLeft: 2,
  },
  cartView: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
  cardFoodView: {
    marginBottom: 4,
  },
  locationHeader: {
    marginVertical: 4,
  },
  buttonStyle: {
    borderRadius: 15,
    backgroundColor: THEME_COLOR,
    height: 47,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Home;
