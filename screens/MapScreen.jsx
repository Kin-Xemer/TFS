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
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { THEME_COLOR } from "../Utils/themeColor";
import { GOOGLE_MAPS_APIKEY } from "../Utils/getGoogleAPI";
import { useEffect } from "react";
import { Button, Flex, Image, Spacer, Radio } from "native-base";
import { convertLatLng } from "../Utils/convertLatLng";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = (props) => {
  const dispatch = useDispatch();
  const placeRef = useRef();
  const bottomSheetRef = useRef(null);
  const mapRef = useRef();
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const address = useSelector(
    (state) => state.address.address
  ).formatted_address;
  const addressCoord = useSelector((state) => state.address.address);
  const coordSelected = useSelector((state) => state.address.coord);
  const [isSelectedAddress, setIsSelectedAddress] = useState(false);
  const [index, setIndex] = useState(0);
  const [stringAddress, setStringAddress] = useState("");
  const [resultAddress, setResultAddress] = useState();
  const [myLocation, setMyLocation] = useState(route.params.locateCoord);
  const [pickupCords, setPickupCords] = useState();
  const [droplocationCors, setDroplocationCors] = useState();
  const [marginMylocation, setMarginMylocation] = useState(height * 0.2);
  const [isDone, setIsDone] = useState(true);
  const [selectedCoord, setSeletedCoord] = useState(null);
  const [placeFlexIndex, setPlaceFlexIndex] = useState(1);
  const [selectedStore, setSelectedStore] = useState();
  const [arraymarker, setArrayMarker] = useState([
    {
      restaurantName: "TFS 1",
      coord: {
        latitude: 10.886084,
        longitude: 106.649844,
      },
    },
    {
      restaurantName: "TFS 2",
      coord: {
        latitude: 10.883429,
        longitude: 106.648599,
      },
    },
    {
      restaurantName: "TFS 3",
      coord: {
        latitude: 10.883058,
        longitude: 106.64344,
      },
    },
    {
      restaurantName: "TFS 4",
      coord: {
        latitude: 10.876694,
        longitude: 106.643585,
      },
    },
    {
      restaurantName: "TFS 5",
      coord: {
        latitude: 10.877895,
        longitude: 106.642385,
      },
    },
    {
      restaurantName: "TFS 6",
      coord: {
        latitude: 10.873476,
        longitude: 106.642985,
      },
    },
    {
      restaurantName: "TFS 7",
      coord: {
        latitude: 10.878976,
        longitude: 106.642985,
      },
    },
  ]);
  const snapPoints = useMemo(() => ["23%", "43%"], []);
  const placeIsFocus = placeRef.current?.isFocused();
  const handleSheetChanges = useCallback((index) => {
    setIndex(index);
  }, []);
  useEffect(() => {
    if (index === 0) {
      setMarginMylocation(height * 0.2);
    } else {
      setMarginMylocation(height * 0.4);
    }
  }, [index]);
  useEffect(() => {
    if (isFocused) {
      onLoadAddress();
    }
  }, []);

  const handleSelectedStore = (item) => {
    setSelectedStore(item.restaurantName);
    setIndex(1);
    mapRef.current.animateToRegion(
      convertLatLng(item.coord.latitude, item.coord.longitude)
    );
  };

  const handleFocusText = () => {
    setPlaceFlexIndex(1);
    setIndex(1);
    setIsSelectedAddress(false);
    setSeletedCoord(null);
  };

  const handleOnPressMarker = (e, item) => {
    // const lat = e.nativeEvent.coordinate.latitude;
    // const lng = e.nativeEvent.coordinate.longitude;
    const destination = convertLatLng(
      e.nativeEvent.coordinate.latitude,
      e.nativeEvent.coordinate.longitude
    );
    setSelectedStore(item.restaurantName);
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
    mapRef.current.animateToRegion(destination);
  };

  const onRegionChange = (result) => {
    const lat = result.latitude;
    const lng = result.longitude;
    setIsDone(false);
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
    // dispatch({
    //   type: "SET_ADDRESS",
    //   payload: resultAddress,
    //   destination,
    // });
    setSeletedCoord(destination);
    setPlaceFlexIndex(0);
    placeRef.current?.blur();
    console.log(stringAddress);
  };

  const onPressAddress = (data, details) => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    const destination = convertLatLng(lat, lng);
    // axios
    //   .get(
    //     "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    //       lat +
    //       "," +
    //       lng +
    //       "&key=" +
    //       GOOGLE_MAPS_APIKEY
    //   )
    //   .then((response) => {
    //     dispatch({
    //       type: "SET_ADDRESS",
    //       payload: response.data.results[0],
    //     });
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //   });
    setDroplocationCors(destination);
    setIndex(0);
    mapRef.current.animateToRegion(destination);
  };

  // const onPressAddressStore = (data, details) => {
  //   const lat = details.geometry.location.lat;
  //   const lng = details.geometry.location.lng;
  //   const destination = {
  //     latitude: lat,
  //     longitude: lng,
  //     latitudeDelta: LATITUDE_DELTA,
  //     longitudeDelta: LONGITUDE_DELTA,
  //   };
  //   setDroplocationCors(destination);
  //   setIndex(0);
  //   mapRef.current.animateToRegion(destination);
  // };

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={pickupCords}
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

        {arraymarker.map((item, index) => {
          return (
            <Marker
              onPress={(e) => {
                handleOnPressMarker(e, item);
              }}
              key={index}
              coordinate={item.coord}
              image={
                item.restaurantName === selectedStore
                  ? require("../assets/icons/store_2.png")
                  : require("../assets/icons/store_1.png")
              }
            />
          );
        })}
        {/* <MapViewDirections
          origin={pickupCords}
          destination={droplocationCors}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="#d83a3a"
          optimizeWaypoints={true}
          
          onReady={(result) => {
            console.log(
              result.duration.toFixed(0) +
                " phút" +
                "(" +
                result.distance.toFixed(1) +
                " km)"
            );
            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: 30,
                bottom: 200,
                left: 30,
                top: 100,
              },
            });
          }}
        /> */}
      </MapView>
      <Flex
        direction="row"
        style={{
          position: "absolute",
          marginTop: height - marginMylocation - 90,
          margin: 16,
        }}
      >
        <Spacer />
        <TouchableOpacity
          style={styles.myLocationButton}
          onPress={() => {
            onHandleMyLocation();
          }}
          activeOpacity={1}
        >
          <MaterialIcons name="my-location" size={32} color="#494949" />
        </TouchableOpacity>
      </Flex>

      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{
          paddingHorizontal: 16,
        }}
      >
        <View>
          <Text>Chọn địa chỉ giao hàng</Text>
          <Text>Selected: {selectedStore}</Text>
        </View>
        <View style={{ backgroundColor: "white", flex: placeFlexIndex }}>
          {/* {isDone === true ? (
            <Text>{stringAddress}</Text>
          ) : (
            <Spinner accessibilityLabel="Loading posts" />
          )} */}
          <GooglePlacesAutocomplete
            textInputProps={{
              onFocus: () => {
                handleFocusText();
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

          {isSelectedAddress ? (
            <View
              style={{
                marginTop: 65,
                marginBottom: 65,
              }}
            >
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{ height: "100%" }}
                contentContainerStyle={{ paddingBottom: 10 }}
                onScroll={() => {
                  setIndex(1);
                }}
                scrollEventThrottle={16}
              >
                {arraymarker.map((item, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        handleSelectedStore(item);
                      }}
                      key={index}
                    >
                      <View
                        style={
                          item.restaurantName === selectedStore
                            ? styles.storeItemSelected
                            : styles.storeItem
                        }
                      >
                        <Flex
                          flexDirection="row"
                          w={"100%"}
                          style={{ alignItems: "center" }}
                        >
                          <Shop size="25" color={THEME_COLOR} />
                          <View style={{ marginLeft: 8 }}>
                            <Text style={ item.restaurantName === selectedStore
                            ? styles.textActive
                            : styles.textInActive}>{item.restaurantName}</Text>
                          </View>
                        </Flex>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          ) : (
            ""
          )}
        </View>
      </BottomSheet>

      <TouchableOpacity
        style={{ position: "absolute", marginTop: 44 }}
        onPress={() => {
          navigation.goBack();
        }}
        activeOpacity={1}
      >
        <Entypo name="chevron-left" size={36} color={THEME_COLOR} />
      </TouchableOpacity>

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
      <View style={styles.selectedButton}>
        {!isSelectedAddress ? (
          <Button
            style={{
              borderRadius: 10,
              height: 44,
              backgroundColor: THEME_COLOR,
            }}
            onPress={() => {
              handleSelectedAddress();
              setIndex(1);
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: "white",
                fontFamily: "Quicksand-Bold",
              }}
            >
              Chọn địa điểm giao hàng
            </Text>
          </Button>
        ) : (
          ""
        )}
        <Spacer />
      </View>
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
    width: 60,
    height: 60,
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
  storeItem: {
    width: "100%",
    borderWidth: 0.8,
    borderColor: "gray",
    marginBottom: 4,
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 15,
  },
  storeItemSelected: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#d83a3a",
    marginBottom: 4,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderRadius: 15,
  },
  textInActive:{
    fontFamily:"Quicksand-Regular",
    fontSize:15,
  },
  textActive:{
    fontFamily:"Quicksand-Bold",
    fontSize:17,
  }
});
export default MapScreen;
