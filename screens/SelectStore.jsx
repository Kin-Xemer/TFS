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
  } from "react-native";
  import { useSelector, useDispatch } from "react-redux";
  import MapView, { Marker } from "react-native-maps";
  import MapViewDirections from "react-native-maps-directions";
  import { FontAwesome5 } from "@expo/vector-icons";
  import { useState, useMemo, useRef, useCallback } from "react";
  import axios from "axios";
  import { Entypo, MaterialIcons } from "@expo/vector-icons";
  import BottomSheet from "@gorhom/bottom-sheet";
  import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
  import { THEME_COLOR } from "../Utils/themeColor";
  import { GOOGLE_MAPS_APIKEY } from "../Utils/getGoogleAPI";
  import { useEffect } from "react";
  import { Button, Flex, Image, Spacer, Spinner } from "native-base";
  import { GOOGLE_STYLE } from "../services/ggMapStyle";
  import {convertLatLng} from "../Utils/convertLatLng";
  
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  
  const SelectStore = (props) => {
    const dispatch = useDispatch();
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
    const [arraymarker, setArrayMarker] = useState([
      {
        latitude: 10.886084,
        longitude: 106.649844,
      },
      {
        latitude: 10.883429,
        longitude: 106.648599,
      },
      {
        latitude: 10.883058,
        longitude: 106.64344,
      },
      {
        latitude: 10.876694,
        longitude: 106.644985,
      },
    ]);
    const snapPoints = useMemo(() => ["20%", "40%"], []);
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
  
    const handleOnPressMarker = (e) => {
      // const lat = e.nativeEvent.coordinate.latitude;
      // const lng = e.nativeEvent.coordinate.longitude;
      const destination = convertLatLng(
        e.nativeEvent.coordinate.latitude,
        e.nativeEvent.coordinate.longitude
      );
      console.log(destination);
      mapRef.current.animateToRegion(destination);
    };
    const onLoadAddress = () => {
      const lat = addressCoord.geometry.location.lat;
      const lng = addressCoord.geometry.location.lng;
      const destination = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      mapRef.current.animateToRegion(destination);
    };
  
    const onHandleMyLocation = () => {
      const lat = myLocation.coords.latitude;
      const lng = myLocation.coords.longitude;
      const destination = convertLatLng(lat,lng)
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
        })
        .catch((err) => {
          console.log("err SelectStore", err);
        });
    };
  
    const handleSelectedAddress = () => {
      setIsSelectedAddress(true);
      const lat = resultAddress.geometry.location.lat;
      const lng = resultAddress.geometry.location.lng;
      const destination = convertLatLng(lat,lng)
      // dispatch({
      //   type: "SET_ADDRESS",
      //   payload: resultAddress,
      //   destination,
      // });
      setSeletedCoord(destination);
      console.log(address);
    };
  
    const onPressAddress = (data, details) => {
      const lat = details.geometry.location.lat;
      const lng = details.geometry.location.lng;
      const destination = convertLatLng(lat,lng)
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
          dispatch({
            type: "SET_ADDRESS",
            payload: response.data.results[0],
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
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
                  handleOnPressMarker(e);
                }}
                title="oke"
                key={index}
                coordinate={item}
                image={require("../assets/icons/store_1.png")}
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
            marginTop: height - marginMylocation - 70,
            margin: 16,
          }}
        >
          <Spacer />
          <TouchableOpacity
            style={{
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
            }}
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
        >
          <View>
            <Text>Chọn địa chỉ giao hàng</Text>
          </View>
          <View style={styles.container}>
            {isDone === true ? (
              <Text>{stringAddress}</Text>
            ) : (
              <Spinner accessibilityLabel="Loading posts" />
            )}
            <GooglePlacesAutocomplete
              placeholder="Nhập địa chỉ của bạn "
              fetchDetails={true}
              onPress={(data, details) => {
                // 'details' is provided when fetchDetails = true
                onPressAddress(data, details);
              }}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: "vi",
                components: "country:vn",
              }}
            />
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
        <View
          style={{
            position: "absolute",
            bottom: 0,
            marginBottom: 44,
            alignSelf: "center",
            width: width,
            paddingHorizontal: 16,
          }}
        >
          {!isSelectedAddress ? (
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
                Chọn địa điểm giao hàng
              </Text>
            </Button>
          ) : (
            ""
          )}
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
  });
  export default SelectStore;
  