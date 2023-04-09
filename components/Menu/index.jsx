import { useRoute, useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";

import { Text, useToast, Spinner } from "native-base";

import CardFood from "../CardFood";
import CardFoodMenu from '../CardFoodMenu/index';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Menu = (props) => {
  const { filterFood, sliceFood } = props;
  var timesRunModal = 0;
  useEffect(() => {
    setIsDone(false);
    const interval = setInterval(() => {
      timesRunModal += 1;
      if (timesRunModal === 1) {
        setIsDone(true);
        clearInterval(interval);
      }
    }, 1);
  }, [filterFood]);

  return (
    <View>

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
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
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
});
export default Menu;
