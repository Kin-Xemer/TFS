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
  FlatList,
} from "react-native";
import { Shop } from "iconsax-react-native";
import { useSelector, useDispatch } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useState, useMemo, useRef, useCallback } from "react";
import axios from "axios";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { THEME_COLOR } from "../Utils/themeColor";
import { GOOGLE_MAPS_APIKEY } from "../Utils/getGoogleAPI";
import { useEffect } from "react";
import { Button, Flex, Image, Spacer } from "native-base";
import { convertLatLng } from "../Utils/convertLatLng";
const { width, height } = Dimensions.get("window");
const DURATION = 1800;
const SelectStore = (props) => {
  const dispatch = useDispatch();
  const placeRef = useRef();
  const bottomSheetRef = useRef(null);
  const mapRef = useRef();
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const nearlyRes = route.params.nearlyRestaurant;
  const restaurant = useSelector((state) => state.restaurant.restaurant);
  const [isSelectedAddress, setIsSelectedAddress] = useState(false);
  const [index, setIndex] = useState(1);
  const [myLocation, setMyLocation] = useState();
  const [isDone, setIsDone] = useState(true);
  const [placeFlexIndex, setPlaceFlexIndex] = useState(1);
  const [selectedStore, setSelectedStore] = useState({});
  const snapPoints = useMemo(() => ["25%", "40%"], []);
  const handleSheetChanges = useCallback((index) => {
    setIndex(index);
  }, []);
  var timesRunModal = 0;
  useEffect(() => {
    if (isFocused) {
      onLoadAddress();
      const interval = setInterval(() => {
        timesRunModal += 1;
        if (timesRunModal === 1) {
          onLoadAddress();
          clearInterval(interval);
        }
      }, 1);
    }
  }, [isFocused]);

  const handleSelectedStore = (item) => {
    setSelectedStore(item);
    setIndex(1);
    const destination = convertLatLng(item.latitude, item.longitude);
    mapRef.current.animateToRegion(destination, DURATION);
  };

  const handleOnPressMarker = (e, item) => {
    // const lat = e.nativeEvent.coordinate.latitude;
    // const lng = e.nativeEvent.coordinate.longitude;
    const destination = convertLatLng(
      e.nativeEvent.coordinate.latitude,
      e.nativeEvent.coordinate.longitude
    );
    setSelectedStore(item);
    setIndex(1);
    mapRef.current.animateToRegion(destination, DURATION - 500);
  };
  const onLoadAddress = () => {
    const lat = nearlyRes.latitude;
    const lng = nearlyRes.longitude;
    setSelectedStore(nearlyRes);
    const destination = convertLatLng(lat, lng);
    mapRef.current.animateToRegion(destination, DURATION);
  };

  const onHandleMyLocation = () => {
    const lat = myLocation.coords.latitude;
    const lng = myLocation.coords.longitude;
    const destination = convertLatLng(lat, lng);
    mapRef.current.animateToRegion(destination, DURATION);
  };
  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        userLocationCalloutEnabled={true}
        style={StyleSheet.absoluteFill}
        ref={mapRef}
        mapType="standard"
        onPress={() => {}}
      >
        {/* {selectedCoord ? (
          <Marker
            coordinate={selectedCoord}
      
            image={require("../assets/icons/restaurant.png")}
          />
        ) : (
          ""
        )} */}

        {restaurant.map((item, index) => {
          const coord = {
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
          };
          return (
            <Marker
              title={item.restaurantName}
              onPress={(e) => {
                handleOnPressMarker(e, item);
              }}
              key={index}
              coordinate={coord}
              image={
                item.restaurantLocation === selectedStore.restaurantLocation
                  ? require("../assets/icons/store_2.png")
                  : require("../assets/icons/store_1.png")
              }
            />
          );
        })}
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{
          paddingHorizontal: 16,
          flex: 1,
        }}
      >
        <BottomSheetFlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
          onScroll={() => {
            setIndex(1);
          }}
          scrollEventThrottle={16}
          data={restaurant}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                handleSelectedStore(item);
              }}
            >
              <View
                style={
                  item.restaurantLocation === selectedStore.restaurantLocation
                    ? styles.storeItemSelected
                    : styles.storeItem
                }
              >
                <Flex
                  flexDirection="row"
                  w={"100%"}
                  style={{ alignItems: "center" }}
                >
                  <Shop size="28" color={THEME_COLOR} />
                  <View style={{ marginLeft: 8, paddingRight: 16 }}>
                    <Text
                      style={
                        item.restaurantLocation ===
                        selectedStore.restaurantLocation
                          ? styles.textActive
                          : styles.textInActive
                      }
                    >
                      {item.restaurantName}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={
                        item.restaurantLocation ===
                        selectedStore.restaurantLocation
                          ? styles.addressActive
                          : styles.addressInActive
                      }
                    >
                      {item.restaurantLocation}
                    </Text>
                  </View>
                </Flex>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.restaurantId}
        />
      </BottomSheet>

      <View style={styles.selectedButton}>
        {selectedStore ? (
          <Button
            style={{
              borderRadius: 10,
              backgroundColor: THEME_COLOR,
            }}
            onPress={() => {
              dispatch({ type: "SET_SPEC_RESTAURANT", payload: selectedStore });
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
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
        ) : (
          <Button
            style={{
              borderRadius: 10,
              backgroundColor: "gray",
            }}
            isDisabled
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
        )}
        <Spacer />
      </View>

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
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
          activeOpacity={1}
        >
          <Entypo name="chevron-left" size={36} color={THEME_COLOR} />
        </TouchableOpacity>
        <Spacer />
      </Flex>

      {/* {!isSelectedAddress ? (
        <View
          style={{
            position: "absolute",
            marginTop: height / 2,
            marginLeft: width / 2 - 8,
          }}
        >
          <Image
            alt="check"
            h={8}
            w={8}
            source={require("../assets/icons/restaurant.png")}
          />
        </View>
      ) : (
        ""
      )} */}
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
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  storeItem: {
    width: "100%",
    borderWidth: 0.8,
    borderColor: "gray",
    marginBottom: 4,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 15,
  },
  storeItemSelected: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: THEME_COLOR,
    backgroundColor: "#ffefef",
    marginBottom: 4,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 13,
    borderRadius: 15,
  },
  textInActive: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 15,
  },
  textActive: {
    fontFamily: "Quicksand-Bold",
    fontSize: 16,
  },
  addressInActive: {
    fontFamily: "Quicksand-Regular",
    fontSize: 12,
  },
  addressActive: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 13,
  },
});
export default SelectStore;
