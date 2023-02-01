import { useEffect, useState } from "react";
import {
  Flex,
  Spacer,
  Divider,
  VStack,
  Box,
  Badge,
  Button,
  Spinner,
} from "native-base";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
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
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArrowDown2 } from "iconsax-react-native";
import ImageTitle from "../ImageTitle/index";
import SearchBar from "../SearchBar/index";
import { Feather, Entypo } from "@expo/vector-icons";
import Categories from "../Categories/index";
import Title from "../Title";
import CardFood from "../CardFood";
import getAllFoodAPI from "../../services/getAllFood";
import { THEME_COLOR } from "../../Utils/themeColor";
import { GOOGLE_MAPS_APIKEY } from "../../Utils/getGoogleAPI";
import { fetchData } from "../../Utils/getFoodAPI";
// import { getLocation } from "../../Utils/api/getLocationAPI";
const Home = (props) => {
  const { isFocused } = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const [foods, setFood] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [cusName, setCusName] = useState("");
  const [locateCoord, setLocateCoord] = useState(null);
  const [myLocation, setMyLocation] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [cart,setCart] = useState("")
  const numberCart = useSelector((state) => state.cart.numberCart);
  const address = useSelector(
    (state) => state.address.address.formatted_address
  );
  const foods = useSelector((state) => state.food.food);

  const checkLogin = async () => {
    try {
      
      const cus = await AsyncStorage.getItem("customer");
      if (cus !== null) {
        const customerParsed = JSON.parse(cus);
        let cusName = customerParsed.theAccount.accountId;
        console.log(cusName)
        setIsLogin(true);
        setCusName(cusName);
        
      }else{
        setCusName("")
      }
      // if (cusName !== null) {
      //   setIsLogin(true);
      //   setCusName(cusName);
      //   dispatch({ type: "GET_ACCOUNT", cusName });
      // }
    } catch (e) {
      console.log(e);
      console.log("Failed to fetch the data from storage");
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem("customer");
      setIsLogin(false);
      navigation.navigate("LoginScreenn");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };

  // const geocodeAsync = () => {
  //   console.log("dia chi", address);
  //   axios
  //     .get("https://maps.googleapis.com/maps/api/geocode/json", {
  //       params: {
  //         address: address,
  //         key: GOOGLE_MAPS_APIKEY,
  //       },
  //     })
  //     .then(function (res) {
  //       setLocateCoord(res.data.results[0].geometry.location);
  //     })
  //     .catch((e) => {
  //       console.log("error from homeIndex", e);
  //     });
  // };
  useEffect(() => {
    getLocation();
  }, []);
  useEffect(() => {
    if (isFocused) {
      fetchData()(dispatch);
      checkLogin();
    }
  }, [isFocused]);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setMyLocation(location);
    axios
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          location.coords.latitude +
          "," +
          location.coords.longitude +
          "&key=" +
          GOOGLE_MAPS_APIKEY
      )
      .then((response) => {
        dispatch({
          type: "SET_ADDRESS",
          payload: response.data.results[0],
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return foods.length > 0 ? (
    <Flex style={styles.container}>
      <Flex direction="row" style={{ paddingHorizontal: 16 }}>
        <View style={styles.locationHeader}>
          <Flex direction="row" style={{ marginBottom: 4 }}>
            <View style={{ paddingLeft: 3 }}>
              <Text style={styles.textStyle}>Vị trí của {cusName}</Text>
            </View>
            <Entypo name="chevron-down" size={14} color="black" />
          </Flex>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MapScreen", {
                addresses: address,
                locateCoord: myLocation,
              });
            }}
          >
            <Flex direction="row">
              {/* <Location size="14" color={THEME_COLOR} /> */}
              <Text
                numberOfLines={1}
                style={[styles.textStyle, styles.addressText]}
              >
                {address}
              </Text>
            </Flex>
          </TouchableOpacity>
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
          contentContainerStyle={{ marginLeft: 16, paddingRight: 16 }}
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
                <CardFood isLogin={isLogin} food={item} />
              </TouchableOpacity>
            </Flex>
          )}
          keyExtractor={(item) => `${item.id}`}
        />
        <Title textTitle="Bán chạy" />
        {/* <FlatList
          contentContainerStyle={{ marginLeft: 17 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={foods.slice(0, 10)}
          renderItem={({ item }) => (
            <Flex direction="row" style={styles.cardFoodView}>
              <CardFood food={item} />
            </Flex>
          )}
          keyExtractor={(item) => `${item.id}`}
        /> */}
        <View style={{ paddingHorizontal: 16, backgroundColor: "transparent" }}>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.8}
            onPress={() => {
              clearStorage();
            }}
          >
            <Text style={styles.buttonText}>dang xuat</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Flex>
  ) : (
    <View
      style={[
        styles.container,
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      <Spinner displayName="Loading posts" />
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
