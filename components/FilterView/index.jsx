import { useRoute, useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import {
  Flex,
  Spacer,
  Text,
  Heading,
  Button,
  useToast,
  Box,
} from "native-base";
import { Setting4 } from "iconsax-react-native";
import { THEME_COLOR } from "../../Utils/themeColor";
import ModalPicker from "../ModalPicker/index";
import { FONT } from "../../Utils/themeFont";
import axios from "axios";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const FilterView = (props) => {
  const { listFood, filterSelected, setFilterSelected } = props;
  const ScrollViewRef = useRef();
  const [isVisiblePrice, setIsVisiblePrice] = useState(false);
  const [itemSelected, setItemSelected] = useState("");
  const [offset, setOffset] = useState();
  const [arrayFilter, setArrayFilter] = useState([
    {
      name: "Tất cả",
      id: "1000",
      foodList: listFood,
    },
  ]);
  const arrayOptions = ["Tăng dần", "Giảm dần"];
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    axios
      .get(
        "http://tfsapiv1-env.eba-aagv3rp5.ap-southeast-1.elasticbeanstalk.com/api/categories"
      )
      .then((res) => {
        res.data.map((data) => {
          setArrayFilter((oldArray) => [
            ...oldArray,
            {
              name: data.categoryName,
              id: data.id,
              foodList: data.foodList.filter((item) => {
                if (item.status === true) {
                  return item;
                }
              }),
            },
          ]);
        });
      })
      .catch((error) => {
        console.log("Error FilterView", error);
      });
  };
  const handleSelectFilter = (filterName) => {
    if (filterName.name === "Giá") {
      toggleModalPrice();
    }
  };
  const toggleModalPrice = () => {
    setIsVisiblePrice(!isVisiblePrice);
  };
  const handleSelectItem = (item) => {
    setItemSelected(item);
    toggleModalPrice();
  };
  return (
    <ScrollView
      ref={ScrollViewRef}
      horizontal={true}
      style={{ backgroundColor: "white" }}
      onScroll={({ nativeEvent }) => {
        // console.log(nativeEvent.contentOffset.x)
      }}
      scrollEventThrottle={16}
    >
      <Flex
        direction="row"
        style={{ paddingVertical: 10, paddingHorizontal: 10 }}
      >
        {arrayFilter.map((filter, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleSelectFilter(filter);
                setFilterSelected(filter);
              }}
              style={{ marginEnd: 8 }}
              activeOpacity={0.7}
            >
              <View
                style={
                  filterSelected.name === filter.name
                    ? styles.filterButtonSelected
                    : styles.filterButtonUnSelected
                }
              >
                <Text
                  style={
                    filterSelected.name === filter.name
                      ? styles.itemSelected
                      : styles.itemUnselected
                  }
                >
                  {filter.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </Flex>
      <ModalPicker
        toggleModal={toggleModalPrice}
        isVisible={isVisiblePrice}
        itemSelected={itemSelected}
        arrayOptions={arrayOptions}
        handleSelectItem={handleSelectItem}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    backgroundColor: "white",
  },
  filterButtonSelected: {
    width: "100%",
    marginHorizontal: 3,
    paddingHorizontal: 12,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: THEME_COLOR,
    marginHorizontal: 5,
  },
  filterButtonUnSelected: {
    width: "100%",
    marginHorizontal: 3,
    paddingHorizontal: 12,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#c8c8c8",
  },
  itemSelected: {
    fontFamily: FONT.BOLD,
    fontSize: 15,
    color: THEME_COLOR,
  },
  itemUnselected: {
    fontFamily: FONT.REGULAR,
    fontSize: 16,
  },
});
export default FilterView;
