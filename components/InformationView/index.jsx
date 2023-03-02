import { useRoute, useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";

import { Text, useToast, Spinner } from "native-base";

import CardFood from "../CardFood";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const InformationView = (props) => {
  const { filterFood, sliceFood } = props;
  const toast = useToast();
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [contentOffset, setContentOffset] = useState(0);
  const [totalPrice, setTotalPrice] = useState();
  const [isDone, setIsDone] = useState(false);
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
      {isDone && filterFood && filterFood.length > 0 ? (
        <View style={styles.inforView}>
          {filterFood.slice(0, sliceFood).map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ marginBottom: 50, width: "50%", marginTop: -25 }}
                onPress={() =>
                  navigation.navigate("FoodInformationScreen", { food: item })
                }
                key={index}
              >
                <CardFood style={styles.item} mh={7} food={item} />
              </TouchableOpacity>
            );
          })}
        </View>
      ) : filterFood.length === 0 ? (
        <Text>assad</Text>
      ) : (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Spinner size={"sm"} />
        </View>
      )}
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
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
});
export default InformationView;
