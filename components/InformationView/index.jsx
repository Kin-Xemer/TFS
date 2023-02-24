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
import { AddCircle, MinusCirlce } from "iconsax-react-native";
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
import Toast from "react-native-toast-message";
import { THEME_COLOR } from "../../Utils/themeColor";
import RatingBar from "../RatingBar";
import axios from "axios";
import CardFood from "../CardFood";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const InformationView = (props) => {
  const { listFood, listFoodFilter, filterSelected, sliceFood } = props;
  const toast = useToast();
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [contentOffset, setContentOffset] = useState(0);
  const [totalPrice, setTotalPrice] = useState();
  const [filterFood, setFilterFood] = useState([]);
  useEffect(() => {
    if (filterSelected.name === "Tất cả") {
      setFilterFood(listFood);
    } else {
      setFilterFood(filterSelected.foodList);
    }
  }, [filterSelected.name]);

  return (
    <View style={styles.inforView}>
      {filterFood.slice(0, sliceFood).map((item, index) => {
        return (
          <View key={index} style={{ marginBottom: 50 }}>
            {/* <Text>{item.id} . {item.foodName} : <Text>{item.price}</Text></Text> */}
            <CardFood style={styles.item} food={item} />
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    backgroundColor: "white",
  },
  filterButtonView: {
    width: "100%",
    marginHorizontal: 3,
    paddingHorizontal: 12,
    height: 35,
    backgroundColor: "#ededed",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },

  inforView: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 26,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
});
export default InformationView;
