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
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import { AddCircle, Setting4 } from "iconsax-react-native";
import { Flex, Spacer, Text, Heading, Button, useToast, Badge } from "native-base";
import { THEME_COLOR } from "../Utils/themeColor";
import FilterView from "../components/FilterView";
import BottomSheet from "../components/BottomSheet";
import InformationViewMenu from "../components/InfomationViewMenu";
import SearchBar from "../components/SearchBar";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const IMAGE_HEIGHT = (9 * screenWidth) / 16;
const HEADER_MAX_HEIGHT = IMAGE_HEIGHT;
const AddFoodMenu = (props) => {
  const toast = useToast();
  const route = useRoute();
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const {food, events, regions, isParty,isFromHome} = route.params;
  const [sliceFood, setSliceFood] = useState(10);
  const [filterFood, setFilterFood] = useState([]);
  const [regionProps, setRegionProps] = useState("");
  const [eventProps, setEventProps] = useState("");
  const [priceProps, setPriceProps] = useState("");
  const [filterSelected, setFilterSelected] = useState("Tất cả");
  const id = "test-toast";


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
  const countFilterAttributes = useCallback(() => {
    let count = 0;
    if (regionProps !== "") count++;
    if (eventProps !== "") count++;
    if (priceProps !== "") count++;
    return count;
  }, [regionProps, eventProps, priceProps]);

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
    console.log("price", priceProps);
    if (priceProps === "") {
      return array;
    } else {
      if (priceProps === "min") {
        let minArray = array.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
        return minArray;
      } else if (priceProps === "max") {
        let maxArray = array.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
        return maxArray;
      }
    }
  };
  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height -0.001;
    if (isEndReached) {
      // Nếu người dùng cuộn tới cuối danh sách thì tải thêm dữ liệu
      // loadData();
      setSliceFood(sliceFood + 10);
    }
  };
  const handleFilter = (regions, events, price) => {
    if (regions === "" && events === "" && price === "") {
      let result = food;
      result = filterSelectedCategory(result);
      setFilterFood(result);
      setRegionProps(regions);
      setEventProps(events);
      setPriceProps(price);
    } else {
      setRegionProps(regions);
      setEventProps(events);
      setPriceProps(price);
    }
  };
  const handleSearchValue = (array) => {
    return array.filter((food) =>
      food.foodName.toLowerCase().includes(query.toLowerCase())
    );
  };
  useEffect(() => {
    let result = food;
    result = filterSelectedRegions(result);
    result = filterSelectedCategory(result);
    result = filterSelectedEvents(result);
    result = handleSearchValue(result);
    filterSelectedPrice(result);
    // filterSelectedPrice();
    setFilterFood(result);
  }, [regionProps, eventProps, priceProps, filterSelected,query]);

  const ScrollViewRef = useRef();
  return (
    <Flex style={styles.container}>
      <View>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
          >
            <Entypo name="chevron-left" size={38} color={THEME_COLOR} />
          </TouchableOpacity>
          <View style={{ width: "80%" }}>
          <SearchBar setQuery={setQuery} isFromHome={isFromHome} isHome={false}/>
          </View>
          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.open();
            }}
          >
            {countFilterAttributes() !== 0 ? (
                <Badge // bg="red.400"
                  colorScheme="danger"
                  rounded="xl"
                  mb={-3}
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
                  {countFilterAttributes()}
                </Badge>
              ) : (
                <></>
              )}
            <View style={{ marginHorizontal: 6 }}>
              <Setting4 size="26" color="#000" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <FilterView
        setFilterSelected={setFilterSelected}
        filterSelected={filterSelected}
        listFood={food}
        isParty={isParty}
      />
      <ScrollView
        ref={ScrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{minHeight: screenHeight - 60}}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        <InformationViewMenu
          sliceFood={sliceFood}
          listFood={food}
          filterSelected={filterSelected}
          filterFood={filterFood}
          setFilterFood={setFilterFood}
        />
      </ScrollView>
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
    paddingTop: 35,
    backgroundColor: "white",
  },
});
export default AddFoodMenu;
