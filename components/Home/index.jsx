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
} from "react-native";
import { Location, ArrowDown2 } from "iconsax-react-native";
import ImageTitle from "../ImageTitle/index";
import SearchBar from "../SearchBar/index";
import { Feather, Entypo } from "@expo/vector-icons";
import Categories from "../Categories/index";
import Title from "../Title";
import CardFood from "../CardFood";
import getAllFood from "../../services/getAllFood";
const Home = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [foods, setFood] = useState([]);

  const getAllFood = () => {
    axios
      .get(
        "http://tfsapiv1-env.eba-aagv3rp5.ap-southeast-1.elasticbeanstalk.com/api/foods",
        { param: { id: 1 } }
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
  const [listFood, setListFood] = useState([
    {
      id: 1,
      foodName: "Cơm chả cua hoàng kim",
      rating: 4.8,
      orderedAmount: 350,
      description:
        "Cơm chả cua hoàng kim với sự đặc biệt khi chả của được làm 100% thủ công. Từ khâu chọn lựa nguyên vật liệu chất lượng, đánh thịt làm giò sóng, sau đó kết hợp với các nguyên liệu như nấm mèo, miến, thịt cua miếng và thịt cua xé nhuyễn",
      price: 68000,
      imgURL:
        "https://img.tastykitchen.vn/crop/820x642/2022/04/04/com-cha-cua-66f6.jpg",
    },
    {
      id: 2,
      foodName: "Cơm đùi gà chiên giòn",
      rating: 4.7,
      orderedAmount: 350,
      description:
        "Cơm đùi gà chiên giòn vốn là món ăn quen thuộc với nhiều người nhưng với sự tinh tế của các đầu bếp TFS giúp mang đến hương vị mới mẻ, đầy hấp dẫn",
      price: 58000,
      imgURL:
        "https://img.tastykitchen.vn/crop/820x642/2022/03/28/com-dui-ga-bb3e.jpg",
    },
    {
      id: 3,
      foodName: "Miến thịt xào cua",
      rating: 4.7,
      orderedAmount: 350,
      description:
        "Miến xào thịt cua trở nên đặc biệt khi từng sợi miến được làm thủ công từ các vị đầu bếp tài ba của TFS Kitchen",
      price: 79000,
      imgURL: "https://img.tastykitchen.vn/2021/12/27/mien-xao-cua-0789.jpg",
    },
    {
      id: 4,
      foodName: "Hủ tiếu áp chảo thịt bò",
      rating: 4.7,
      orderedAmount: 350,
      description:
        "Hủ tiếu bò áp chảo là món ăn tuyệt hảo sử dụng phương pháp áp chảo vốn đã rất nổi tiếng ở nhiều nước Phương Tây. Qua lớp dầu nóng giúp các nguyên liệu chín nhanh ở nhiệt độ cao, lưu giữ được độ giòn, vị ngọt tự nhiên, đặc biệt hơn hết là màu sắc bắt mắt và hương vị thơm ngon khó cưỡng của phần thịt bò phi lê đậm đà hài hòa cùng từng sợi hủ tiếu mềm mỏng hấp dẫn",
      price: 99000,
      imgURL:
        "https://img.tastykitchen.vn/crop/820x642/2021/01/25/hu-tieu-bo-ap-chao-1280x1000-17b4.jpg",
    },
  ]);
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
            <Location size="14" color="#d83a3a" />
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
              <Feather name="shopping-cart" size={27} color="#d83a3a" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Flex>
      <View>
        <SearchBar />
      </View>
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
        data={foods}
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
        data={listFood}
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
          <Text style={styles.buttonText}>
            dang nhap
          </Text>
        </TouchableOpacity>
      </View>
    </Flex>
  ) : (
    <View style={[styles.container,{backgroundColor: "red"}]}>
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
    backgroundColor: "#d83a3a",
    height: 47,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Home;
