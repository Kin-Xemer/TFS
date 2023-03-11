import { useRoute, useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import { AddCircle, Setting4 } from "iconsax-react-native";
import { Flex, Spacer, Text, Heading, Button, useToast } from "native-base";
import { convertPrice } from "../Utils/convertPrice";
import RatingBar from "../components/RatingBar";
import Toast from "react-native-toast-message";
import { THEME_COLOR } from "../Utils/themeColor";
import InformationView from "../components/InformationView";
import FilterView from "../components/FilterView";
import SearchBar from "../components/SearchBar";
import BottomSheet from "../components/BottomSheet";
import axios from "axios";
import { BASE_URL } from "../services/baseURL";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const IMAGE_HEIGHT = (9 * screenWidth) / 16;
const HEADER_MAX_HEIGHT = IMAGE_HEIGHT;
const HEADER_MIN_HEIGHT = 114;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const FoodInformationScreen = (props) => {
  const toast = useToast();
  const route = useRoute();
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [food, setFood] = useState(route.params.food);
  const [events, setEvents] = useState(route.params.events);
  const [regions, setRegions] = useState(route.params.regions);
  const [currentPos, setCurrentPos] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [sliceFood, setSliceFood] = useState(10);
  const [selectedRegions, setSelectedRegions] = useState();
  const [selectedEvents, setSelectedEvents] = useState();
  const [filterFood, setFilterFood] = useState([]);
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  const [regionProps, setRegionProps] = useState("");
  const [eventProps, setEventProps] = useState("");
  const [priceProps, setPriceProps] = useState("");
  const [filterSelected, setFilterSelected] = useState("Tất cả");
  const [contentOffset, setContentOffset] = useState(0);
  const id = "test-toast";

  useEffect(() => {
    ScrollViewRef.current.scrollTo({
      y: 153,
    });
  }, [filterFood]);

  const filterSelectedRegions = (array) => {
    if (regionProps === "") {
      return array;
    } else {
      return array.filter(
        (item) =>
          item.theRegion !== null && item.theRegion.region_name === regionProps
      );
    }
  };

  const filterSelectedCategory = (array) => {
    if (filterSelected === "Tất cả") {
      return array;
    } else {
      return array.filter(
        (item) =>
          item.theCategory !== null &&
          item.theCategory.categoryName === filterSelected
      );
    }
  };

  const filterSelectedEvents = (array) => {
    if (eventProps === "") {
      return array;
    } else {
      return array.filter(
        (item) =>
          item.eventList.length > 0 &&
          item.eventList.filter(
            (eventItem) => eventItem.eventName === eventProps
          ).length > 0
      );
    }
  };

  const filterSelectedPrice = (array) => {
    if (priceProps === "min"){
      let minArray = array.sort((el1,el2) => el1.price.toString().localeCompare(el2.price, undefined, {numeric: true})) 
      return minArray
    }else if (priceProps === "max"){
      let maxArray = array.sort((el1,el2) => el2.price.toString().localeCompare(el1.price, undefined, {numeric: true}))
      return maxArray
    } 
  }

  const handleFilter = (regions, events, price) => {
    if (regions === "" && events === "" && price === "") {
      let result = food;
      result = filterSelectedCategory(result);
      setFilterFood(result);
    } else {
      setRegionProps(regions);
      setEventProps(events);
      setPriceProps(price);
    }
  };
  useEffect(() => {
    let result = food;
    result = filterSelectedRegions(result);
    result = filterSelectedCategory(result);
    result = filterSelectedEvents(result);
  filterSelectedPrice(result);
    // filterSelectedPrice();
    setFilterFood(result);
  }, [regionProps, eventProps, priceProps, filterSelected]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const ScrollViewRef = useRef();
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: "clamp",
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 1],
    extrapolate: "clamp",
  });
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -8],
    extrapolate: "clamp",
  });
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <Flex style={styles.container}>
      <View style={{ height: 36 }}></View>
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: headerTranslateY }] },
        ]}
      >
        <Animated.Image
          style={[
            styles.headerBackground,
            {
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslateY }],
            },
          ]}
          source={{
            uri: route.params.banner,
          }}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.topBar,
          {
            transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
          },
        ]}
      >
        <View style={{ width: "100%" }}>
          {contentOffset > 128 ? (
            <Animated.View
              style={{ alignItems: "center", flexDirection: "row" }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                
              >
                <Entypo name="chevron-left" size={38} color={THEME_COLOR} />
              </TouchableOpacity>
              <View style={{ width: "80%" }}>
                <SearchBar />
              </View>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.open();
                }}
              >
                <View style={{ marginHorizontal: 6 }}>
                  <Setting4 size="26" color="#000" />
                </View>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{ width: "10%"}}
            >
              <Entypo name="chevron-left" size={36} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      <Animated.ScrollView
        ref={ScrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 20,
          minHeight: screenHeight,
        }}
        scrollEventThrottle={16}
        stickyHeaderIndices={[0]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
            listener: (event) => {
              setContentOffset(event.nativeEvent.contentOffset.y);
              setIsScrollBottom(false);
              // if (ifCloseToTop(event.nativeEvent)) {
              //   console.log(event.nativeEvent.contentOffset.y)
              //   //  setCurrentPos(event.nativeEvent.contentOffset.y);
              //   // ScrollViewRef.current.scrollTo({
              //   //   y:
              //   //   140
              //   // });
              // }
              // console.log(event.nativeEvent.contentOffset.y)
              if (isCloseToBottom(event.nativeEvent)) {
                setSliceFood(sliceFood + 10);
                setIsScrollBottom(true);
              }
            },
          }
        )}
      >
        <FilterView
          setFilterSelected={setFilterSelected}
          filterSelected={filterSelected}
          listFood={food}
        />
        <InformationView
          sliceFood={sliceFood}
          listFood={food}
          filterSelected={filterSelected}
          filterFood={filterFood}
          setFilterFood={setFilterFood}
        />
      </Animated.ScrollView>
      <BottomSheet
        handleFilter={handleFilter}
        events={events}
        regions={regions}
        refRBSheet={refRBSheet}
      />
    </Flex>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: "white",
  },
  textStyle: {
    fontFamily: "Quicksand-Bold",
    fontSize: 14,
  },

  titleBox: {
    width: "100%",
    alignItems: "flex-start",
    height: 42,
  },
  priceText: { fontFamily: "Quicksand-Bold", fontSize: 25, color: THEME_COLOR },
  textDescription: {
    fontFamily: "Quicksand-Bold",
    fontSize: 15,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT,
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    width: "100%",
    height: IMAGE_HEIGHT,
    resizeMode: "cover",
  },
  topBar: {
    marginTop: 60,
    height: 80,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  ratingPointField: {
    width: "45%",
    height: "100%",
    justifyContent: "center",
  },
});
export default FoodInformationScreen;
