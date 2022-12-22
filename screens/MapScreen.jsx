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
import { Provider } from "@ant-design/react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useState, useMemo, useRef, useCallback } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { Entypo } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { Location } from "iconsax-react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { THEME_COLOR } from "../Utils/themeColor";
import { GOOGLE_MAPS_APIKEY } from "../Utils/getGoogleAPI";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = (props) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["20%", "50%"], []);
  const handleSheetChanges = useCallback((index) => {
    setIndex(index)
  }, []);
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const [index, setIndex] = useState(0);
  const [region, setRegion] = useState({
    latitude: 10.884513464178374,
    longitude: 106.6474637288397,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [pickupCords, setPickupCords] = useState({
    latitude: 10.8845,
    longitude: 106.6474,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [droplocationCors, setDroplocationCors] = useState();
  useMemo(() => {
    setDroplocationCors({
      latitude: 10.8448,
      longitude: 106.67087,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  }, []);
  // const [droplocationCors, setDroplocationCors] = useState({
  //   latitude: 10.8448,
  //   longitude: 106.67087,
  //   latitudeDelta: LATITUDE_DELTA,
  //   longitudeDelta: LONGITUDE_DELTA,
  // });
  const mapRef = useRef();
  const onPressAddress = (data, details) => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    const destitation = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    setDroplocationCors(destitation);
    setIndex(0)
    mapRef.current.animateToRegion(destitation)
  };
  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={pickupCords}
        showsUserLocation={true}
        ref={mapRef}
      >
        {/* <Marker coordinate={pickupCords} /> */}
        <Marker
          coordinate={droplocationCors}
          image={require("../assets/icons/Location-Bold-80px.png")}
        />
        <MapViewDirections
          origin={pickupCords}
          destination={droplocationCors}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={8}
          strokeColor="#02b2b9"
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
        />
      </MapView>

      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.container}>
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
export default MapScreen;
