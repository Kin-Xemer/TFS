import { useEffect, useState, useMemo } from "react";
import {
  Flex,
  Spacer,
  Divider,
  Badge,
  Spinner,
  Image,
  Button,
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
  PermissionsAndroid,
} from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageTitle from "../ImageTitle/index";
import SearchBar from "../SearchBar/index";
import { Feather, Entypo } from "@expo/vector-icons";
import Categories from "../Categories/index";
import Title from "../Title";
import CardFood from "../CardFood";
import { THEME_COLOR } from "../../Utils/themeColor";
import { GOOGLE_MAPS_APIKEY } from "../../Utils/getGoogleAPI";
import { fetchData } from "../../Utils/getFoodAPI";
import { getRestaurant } from "../../Utils/api/getRestaurantAPI";
import { getCartById } from "../../Utils/api/getCart";
import { getNearlyRestaurant } from "../../Utils/api/getNearlyRestaurant";
import { BASE_URL } from "../../services/baseURL";
import Geolocation from "react-native-geolocation-service";
import { getServices } from "../../Utils/api/getServices";
import ActionButton from "../ActionButton";
// import { getLocation } from "../../Utils/api/getLocationAPI";
const Home = (props) => {
  const { isFocused } = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const [foods, setFood] = useState([]);
  const [cusName, setCusName] = useState("");
  const [locateCoord, setLocateCoord] = useState(null);
  const [events, setEvents] = useState();
  const [regions, setRegions] = useState();
  const [myLocation, setMyLocation] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [isFindDone, setIsFindDone] = useState(false);
  const numberCart = useSelector((state) => state.cart.numberCart);
  const cart = useSelector((state) => state.cart.cart);
  const isLogin = useSelector((state) => state.account.isLogin);
  const address = useSelector(
    (state) => state.address.address.formatted_address
  );
  const restaurant = useSelector((state) => state.restaurant.restaurant);
  const stringAddress = useSelector((state) => state.address.stringAddress);
  const foods = useSelector((state) => state.food.food);
  const handleLogout = () => {
    clearStorage();
  };

  const getRegion = () => {
    axios
      .get(BASE_URL + "/regions")
      .then((response) => {
        setRegions(response.data);
      })
      .catch((error) => {
        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
        if (error.response) {
          console.log(error.response.data.message);
        }
      });
  };
  const getEvent = () => {
    axios.get(BASE_URL + "/events").then((response) => {
      setEvents(response.data);
    });
  };
  const checkLogin = async () => {
    try {
      const cus = await AsyncStorage.getItem("customer");
      if (cus !== null) {
        const customerParsed = JSON.parse(cus);
        let cusName = customerParsed.theAccount.accountId;
        getCartById()(dispatch, cusName);
        dispatch({
          type: "SET_ACCOUNT",
          payload: customerParsed,
        });
        dispatch({
          type: "SET_ORDER_STATUS",
          payload: null,
        });
        setCusName(cusName);
      } else {
        dispatch({
          type: "SET_ORDER_STATUS",
          payload: "",
        });
        setCusName("");
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
      dispatch({
        type: "SET_ORDER_STATUS",
        payload: "",
      });
      await AsyncStorage.removeItem("customer");
      dispatch({ type: "LOGOUT" });
      dispatch({ type: "SET_LOGIN_STATUS_LOGOUT" });
      navigation.navigate("LoginScreenn");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };

  useEffect(() => {
    getLocation();
    getRestaurant()(dispatch);
    getRegion();
    getEvent();
    getServices(dispatch);
  }, []);
  useEffect(() => {
    if (isFocused) {
      fetchData()(dispatch);
      checkLogin();
    }
  }, [isFocused]);
  //setinterval
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchData()(dispatch);
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, []);

  const getLocation = async () => {
    setIsFindDone(false);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log("get success");
    dispatch({
      type: "SET_LOCAL",
      payload: location,
    });
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
        console.log("find done");
        setIsFindDone(true);
        dispatch({
          type: "SET_ADDRESS",
          payload: response.data.results[0],
        });
        getNearlyRestaurant(
          response.data.results[0].formatted_address,
          dispatch
        );
      })
      .catch((err) => {
        console.log("Get Location", err);
      });
  };

  const handlePressParty = () => {
    if (cart.party !== null) {
      navigation.navigate("EditPartyScreen", {
        party: cart.party,
      });
    } else {
      navigation.navigate("PartyScreen");
    }
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
                addresses: stringAddress === "" ? address : stringAddress,
                locateCoord: myLocation,
              });
            }}
          >
            <Flex direction="row">
              {/* <Location size="14" color={THEME_COLOR} /> */}
              <Text
                numberOfLines={1}
                style={[styles.textStyle, styles.addressText, { width: "90%" }]}
              >
                {isFindDone === true
                  ? stringAddress === ""
                    ? address
                    : stringAddress
                  : "Đang tìm vị trí của bạn .."}
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
          <TouchableOpacity
            style={{
              marginVertical: "auto",
              padding: 4,
            }}
            onPress={() => {
              isLogin
                ? navigation.navigate("CartScreen")
                : navigation.navigate("LoginScreenn");
            }}
          >
            <View>
              <Feather name="shopping-cart" size={27} color={THEME_COLOR} />
            </View>
          </TouchableOpacity>
        </View>
      </Flex>
      <View style={{ marginBottom: 6, paddingHorizontal: 16, marginTop: 4 }}>
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
        <Categories
          events={events}
          regions={regions}
          handlePressParty={handlePressParty}
        />
        <Title textTitle="Món ngon nổi bật" />
        <FlatList
          initialNumToRender={15}
          windowSize={5}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={30}
          removeClippedSubviews={false}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{ marginLeft: 16, paddingRight: 16 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={foods.slice(0, 15)}
          renderItem={({ item }) => (
            <Flex direction="row" style={styles.cardFoodView}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("FoodInformationScreen", { food: item })
                }
              >
                <CardFood
                  isLogin={isLogin}
                  itemWith={170}
                  mr={15}
                  food={item}
                />
              </TouchableOpacity>
            </Flex>
          )}
          keyExtractor={(item) => item.id}
        />
        <Title textTitle="Ẩm thực cổ truyền" />
        <FlatList
          initialNumToRender={15}
          windowSize={5}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={30}
          removeClippedSubviews={false}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{ marginLeft: 16, paddingRight: 16 }}
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
                <CardFood
                  isLogin={isLogin}
                  itemWith={170}
                  mr={15}
                  food={item}
                />
              </TouchableOpacity>
            </Flex>
          )}
          keyExtractor={(item) => item.id}
        />
        <View style={{ paddingHorizontal: 16, backgroundColor: "transparent" }}>
          <ActionButton
            onPress={() => {
              handleLogout();
            }}
            buttonText="Đăng xuất"
          />
          <ActionButton
            onPress={() => {
              navigation.navigate("FeedbackScreen");
            }}
            buttonText=" Check button"
          />
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
      <Spinner accessibilityLabel="Loading posts" />
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
});
export default Home;
