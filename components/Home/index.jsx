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
  Linking,
  ImageBackground,
} from "react-native";
import once from "lodash/once";
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
import notifee, { AndroidColor } from "@notifee/react-native";
import { GetFCMToken, requestNotiPermission } from "../../Helper/pushNoti";
import { FONT } from "../../Utils/themeFont";
import { fetchFoods } from "../../redux/actions/foodAction";
import { fetchCombos } from "../../redux/actions/comboAction";
import CardCombo from "../CardFood/CardCombo";
// import { getLocation } from "../../Utils/api/getLocationAPI";
const Home = (props) => {
  const { isFocused } = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [cusName, setCusName] = useState("");
  const [fullName, setFullName] = useState("");
  const [size, setSize] = useState(15);
  const [page, setPage] = useState(0);
  const [events, setEvents] = useState();
  const [regions, setRegions] = useState();
  const [myLocation, setMyLocation] = useState("");
  const [query, setQuery] = useState("");
  const [isFindDone, setIsFindDone] = useState(false);
  const numberCart = useSelector((state) => state.cart.numberCart);
  const party = useSelector((state) => state.cart.party);
  const isLogin = useSelector((state) => state.account.isLogin);
  const address = useSelector(
    (state) => state.address.address.formatted_address
  );
  const foodNewTrending = useSelector((state) => state.food.foodTrend);
  const stringAddress = useSelector((state) => state.address.stringAddress);
  const foods = useSelector((state) => state.food.food);
  const { loading, combo, error } = useSelector((state) => state.combo);
  const initializeAppOnce = once((dispatch) => {
    requestNotiPermission();
    getLocation();
    getRestaurant()(dispatch);
    getRegion();
    getEvent();
    getServices(dispatch);
  });
  const memoizedFoodList = useMemo(() => foodNewTrending, [foodNewTrending]);
  const memoizedFoodList2 = useMemo(() => foods.slice(16, 30), [foods]);
  useEffect(() => {
    initializeAppOnce(dispatch);
    fetchData()(dispatch);
  }, []);
  useEffect(() => {
    if (isFocused) {
      checkLogin();
    }
  }, [isFocused]);
  useEffect(() => {
    if (cusName) {
      getCartById()(dispatch, cusName);
    }
  }, [cusName]);
  useEffect(() => {
    dispatch(fetchFoods(page, size));
    dispatch(fetchCombos());
  }, [dispatch, page, size]);

  const getRegion = useMemo(() => {
    return () => {
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
  }, []);

  const getEvent = useMemo(() => {
    return () => {
      axios.get(BASE_URL + "/events").then((response) => {
        setEvents(response.data);
      });
    };
  }, []);

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
        setCusName(cusName);
        setFullName(customerParsed.customerName);
      } else {
        setCusName("");
        setFullName("");
      }
    } catch (e) {
      console.log(e);
      console.log("Failed to fetch the data from storage");
    }
  };

  const getLocation = async () => {
    setIsFindDone(false);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      dispatch({
        type: "SET_LOCAL",
        payload: location,
      });

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_MAPS_APIKEY}`
      );

      setIsFindDone(true);
      dispatch({
        type: "SET_ADDRESS",
        payload: response.data.results[0],
      });
      getNearlyRestaurant(response.data.results[0].formatted_address, dispatch);
    } catch (err) {
      console.log("Error getting location or address: ", err);
    }
  };

  const handlePressParty = () => {
    if (party !== null) {
      navigation.navigate("EditPartyScreen", {
        party: party,
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
              {cusName ? (
                <Text style={styles.textStyle}>Xin chào, {fullName}</Text>
              ) : (
                <Text style={styles.textStyle}>Vị trí của bạn</Text>
              )}
            </View>
            <Entypo name="chevron-down" size={14} color="black" />
          </Flex>
          <TouchableOpacity
            onPress={() => {
              isFindDone
                ? navigation.navigate("MapScreen", {
                    addresses: stringAddress === "" ? address : stringAddress,
                    locateCoord: myLocation,
                  })
                : console.log("none");
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
                ? navigation.navigate("CartScreen", { locateCoord: myLocation })
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
        <SearchBar setQuery={setQuery} />
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
     
        <Categories
          events={events}
          regions={regions}
          handlePressParty={handlePressParty}
        />
           <Divider mt={4} py={1} backgroundColor="coolGray.100" />
        <Title textTitle="Mâm tiệc" />
        <FlatList
          initialNumToRender={15}
          windowSize={5}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={30}
          removeClippedSubviews={false}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{ marginLeft: 16, paddingRight: 20 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={combo}
          renderItem={({ item }) => (
            <Flex direction="row">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("FoodInformationScreen", { food: item })
                }
              >
                <CardCombo
                  isLogin={isLogin}
                  itemWith={290}
                  mr={10}
                  food={item}
                />
              </TouchableOpacity>
            </Flex>
          )}
          keyExtractor={(item) => item.id}
        />
        <Divider mt={4} py={1} backgroundColor="coolGray.100" />
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
          data={memoizedFoodList}
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
                  itemWith={150}
                  mr={15}
                  food={item}
                />
              </TouchableOpacity>
            </Flex>
          )}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity
          onPress={() => {
            console.log("check");
          }}
          activeOpacity={0.7}
        >
          <ImageBackground
            source={{
              uri: "https://live.staticflickr.com/65535/52783059166_a951518a8d_h.jpg",
            }}
            resizeMethod="auto"
            style={{
              height: 180,
              paddingHorizontal: 8,
            }}
          >
            <Spacer />
            <Flex flexDirection={"row"} alignItems="flex-end">
              <Spacer />
              <Text
                style={{
                  fontFamily: FONT.MEDIUM,
                  color: "white",
                  marginBottom: 4,
                }}
              >
                xem theem
              </Text>
              <Entypo name="chevron-right" color={"white"} size={20} />
            </Flex>
          </ImageBackground>
        </TouchableOpacity>
        <Divider mt={4} py={1} backgroundColor="coolGray.100" />
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
          data={memoizedFoodList2}
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
                  itemWith={150}
                  mr={15}
                  food={item}
                />
              </TouchableOpacity>
            </Flex>
          )}
          keyExtractor={(item) => item.id}
        />
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
    marginBottom: 25,
  },
  locationHeader: {
    marginVertical: 4,
  },
});
export default Home;
