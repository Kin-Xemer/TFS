import { useRoute, useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSelector,} from "react-redux";
import { useState,  useRef } from "react";
import {
  Flex,
  Text,
} from "native-base";
import { THEME_COLOR } from "../../Utils/themeColor";
import ModalPicker from "../ModalPicker/index";
import { FONT } from "../../Utils/themeFont";
const FilterView = (props) => {
  const { isParty, filterSelected, setFilterSelected } = props;
  const ScrollViewRef = useRef();
  const [isVisiblePrice, setIsVisiblePrice] = useState(false);
  const [itemSelected, setItemSelected] = useState("");
  const category = useSelector((state) => state.food.category);
  const [offset, setOffset] = useState();
  const arrayOptions = ["Tăng dần", "Giảm dần"];
  let arrayFilter = ["Tất cả"];
 
  category.map((category) => {
    arrayFilter.push(category.categoryName);
  });
  if(!isParty){
    arrayFilter.push("Mâm tiệc")
  }
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
      showsHorizontalScrollIndicator={false}
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
                setFilterSelected(filter);
              }}
              style={{ marginEnd: 8 }}
              activeOpacity={0.7}
            >
              <View
                style={
                  filterSelected === filter
                    ? styles.filterButtonSelected
                    : styles.filterButtonUnSelected
                }
              >
                <Text
                  style={
                    filterSelected === filter
                      ? styles.itemSelected
                      : styles.itemUnselected
                  }
                >
                  {filter}
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
    paddingTop: 30,
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
