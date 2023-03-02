import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { Shop } from "iconsax-react-native";
import { useSelector, useDispatch } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useState, useMemo, useRef, useCallback } from "react";
import axios from "axios";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { THEME_COLOR } from "../Utils/themeColor";
import { GOOGLE_MAPS_APIKEY } from "../Utils/getGoogleAPI";
import { useEffect } from "react";
import { Button, Flex, Image, Spacer } from "native-base";
import { convertLatLng } from "../Utils/convertLatLng";
import {getNearlyRestaurant} from '../Utils/api/getNearlyRestaurant';

const { width, height } = Dimensions.get("window");
const MapScreen = (props) => {
  const dispatch = useDispatch();
  const placeRef = useRef();
  const bottomSheetRef = useRef(null);
  const mapRef = useRef();
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const addressCoord = useSelector((state) => state.address.address);
  const restaurant = useSelector((state) => state.restaurant.restaurant);
  const [isSelectedAddress, setIsSelectedAddress] = useState(false);
  const [index, setIndex] = useState(0);
  const [stringAddress, setStringAddress] = useState("");
  const [resultAddress, setResultAddress] = useState();
  const [myLocation, setMyLocation] = useState(route.params.locateCoord);
  const [isDone, setIsDone] = useState(true);
  const [selectedCoord, setSeletedCoord] = useState(null);
  const [selectedStore, setSelectedStore] = useState("");
  const snapPoints = useMemo(() => ["20%", "43%"], []);
  const handleSheetChanges = useCallback((index) => {
    setIndex(index);
  }, []);

  useEffect(() => {
    if (isFocused) {
      onLoadAddress();
    }
  }, []);

  const handleFocusText = (text) => {
    if (text.length === 0) {
      setIndex(0);
      setIsSelectedAddress(false);
      setSeletedCoord(null);
    } else {
      setIndex(1);
      setIsSelectedAddress(false);
      setSeletedCoord(null);
    }
  };

  const handleOnPressMarker = (e, item) => {
    // const lat = e.nativeEvent.coordinate.latitude;
    // const lng = e.nativeEvent.coordinate.longitude;
    const destination = convertLatLng(
      e.nativeEvent.coordinate.latitude,
      e.nativeEvent.coordinate.longitude
    );
    setSelectedStore(item.restaurantLocation);
    setIndex(1);
    mapRef.current.animateToRegion(destination);
  };
  const onLoadAddress = () => {
    const lat = addressCoord.geometry.location.lat;
    const lng = addressCoord.geometry.location.lng;
    const destination = convertLatLng(lat, lng);
    mapRef.current.animateToRegion(destination);
  };

  const onHandleMyLocation = () => {
    const lat = myLocation.coords.latitude;
    const lng = myLocation.coords.longitude;
    const destination = convertLatLng(lat, lng);
    placeRef.current.blur();
    mapRef.current.animateToRegion(destination);
  };

  const onRegionChange = (result) => {
    const lat = result.latitude;
    const lng = result.longitude;
    setIsDone(false);
    placeRef.current?.setAddressText("Đang tải...");
    axios
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          lat +
          "," +
          lng +
          "&key=" +
          GOOGLE_MAPS_APIKEY
      )
      .then((response) => {
        setIsDone(true);
        setResultAddress(response.data.results[0]);
        setStringAddress(response.data.results[0].formatted_address);
        placeRef.current?.setAddressText(
          response.data.results[0].formatted_address
        );
      })
      .catch((err) => {
        console.log("err Mapscreen", err);
      });
  };

  const handleSelectedAddress = () => {
    setIsSelectedAddress(true);
    const lat = resultAddress.geometry.location.lat;
    const lng = resultAddress.geometry.location.lng;
    const destination = convertLatLng(lat, lng);
    setSeletedCoord(destination);

    getNearlyRestaurant(stringAddress, dispatch);
    placeRef.current?.setAddressText(stringAddress);
    placeRef.current?.blur();
  };

  const onPressAddress = (data, details) => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    const destination = convertLatLng(lat, lng);
    setIndex(0);
    mapRef.current.animateToRegion(destination);
  };
  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        showsUserLocation={true}
        onRegionChangeComplete={(result) => {
          if (!isSelectedAddress) {
            onRegionChange(result);
          }
        }}
        ref={mapRef}
        mapType="mutedStandard"
        userLocationCalloutEnabled={true}
        onPress={() => {}}
      >
        {selectedCoord ? (
          <Marker
            coordinate={selectedCoord}
            image={require("../assets/icons/restaurant.png")}
          />
        ) : (
          ""
        )}
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{
          paddingHorizontal: 16,
        }}
      >
        <Flex flexDirection="row">
          <View>
            <Text>Chọn địa chỉ giao hàng</Text>
          </View>
          <Spacer />
        </Flex>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          {/* {isDone === true ? (
            <Text>{stringAddress}</Text>
          ) : (
            <Spinner accessibilityLabel="Loading posts" />
          )} */}
          <GooglePlacesAutocomplete
            textInputProps={{
              onChangeText: (text) => {
                handleFocusText(text);
              },
              style: styles.textInputStyle,
            }}
            placeholder="Nhập địa chỉ của bạn "
            fetchDetails={true}
            onPress={(data, details) => {
              // 'details' is provided when fetchDetails = true
              onPressAddress(data, details);
            }}
            ref={placeRef}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "vi",
              components: "country:vn",
            }}
          />
        </View>
      </BottomSheet>

      <Flex
        direction="row"
        style={{
          position: "absolute",
          marginTop: 44,
          marginEnd: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          activeOpacity={1}
        >
          <Entypo name="chevron-left" size={36} color={THEME_COLOR} />
        </TouchableOpacity>
        <Spacer />
        <TouchableOpacity
          style={styles.myLocationButton}
          onPress={() => {
            onHandleMyLocation();
          }}
          activeOpacity={1}
        >
          <MaterialIcons name="my-location" size={25} color="#494949" />
        </TouchableOpacity>
      </Flex>

      {!isSelectedAddress ? (
        <View
          style={{
            position: "absolute",
            marginTop: height / 2,
            marginLeft: width / 2 - 8,
          }}
        >
          {/* <FontAwesome5 name="map-pin" size={30} color={THEME_COLOR} /> */}
          <Image
            alt="check"
            h={8}
            w={8}
            source={require("../assets/icons/restaurant.png")}
          />
        </View>
      ) : (
        ""
      )}
      {!isSelectedAddress ? (
        <View style={styles.selectedButton}>
          <Button
            style={{
              borderRadius: 10,
              height: 44,
              backgroundColor: THEME_COLOR,
            }}
            onPress={() => {
              handleSelectedAddress();
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: "white",
                fontFamily: "Quicksand-Bold",
              }}
            >
              Chọn địa chỉ giao hàng
            </Text>
          </Button>
        </View>
      ) : (
        <View style={styles.selectedButton}>
          <Button
            style={{
              borderRadius: 10,
              height: 44,
              backgroundColor: THEME_COLOR,
            }}
            onPress={() => {
              navigation.goBack();
              dispatch({
                type: "SET_STRING_ADDRESS",
                payload: stringAddress,
              });
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: "white",
                fontFamily: "Quicksand-Bold",
              }}
            >
              Tiếp tục
            </Text>
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textStyle: {
    fontFamily: "Quicksand-Regular",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  textInputStyle: {
    borderColor: "silver",
    borderWidth: "0.5",
    height: 44,
    fontFamily: "Quicksand-SemiBold",
    padding: 12,
    width: "100%",
    borderRadius: 15,
    marginVertical: 8,
  },
  myLocationButton: {
    backgroundColor: "#f0f0f0",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    shadowColor: "silver",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1.2,
  },
  selectedButton: {
    position: "absolute",
    backgroundColor: "white",
    bottom: 0,
    alignSelf: "center",
    width: width,
    paddingBottom: 44,
    paddingHorizontal: 16,
  },
});
export default MapScreen;