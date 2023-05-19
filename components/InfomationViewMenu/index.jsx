import { useRoute, useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import React, { useState, useEffect, useRef, useCallback } from "react";

import { Text,  Spinner, Image } from "native-base";

import CardFoodMenu from '../CardFoodMenu/index';
import { EMPTY_IMAGE } from "../../Utils/constant";
import { FONT } from "../../Utils/themeFont";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const InformationViewMenu = (props) => {
  const { filterFood, sliceFood } = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
  
  const navigateToFoodInformationScreen = useCallback(
    (food) => {
      navigation.navigate("FoodInformationScreen", { food });
    },
    [navigation]
  );
  
  const MemoizedCardFoodMenu = React.memo(CardFoodMenu);
  return (
    <View>
      {isDone && filterFood && filterFood.length > 0 ? (
        <View style={styles.inforView}>
          {filterFood.slice(0, sliceFood).map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ marginBottom: 50, width: "50%", marginTop: -25 }}
                // onPress={() =>
                //   navigation.navigate("FoodInformationScreen", { food: item })
                // }
                key={index}
              >
                <MemoizedCardFoodMenu style={styles.item} mh={7} food={item} />
              </TouchableOpacity>
            );
          })}
        </View>
      ) : filterFood.length === 0 ? (
        <View
          style={[
            styles.container,
            { height: screenHeight, alignItems: "center", paddingTop: 100 },
          ]}
        >
          <Image
            source={{
              uri: EMPTY_IMAGE,
            }}
            size={200}
            alt="empty"
          />
          <Text style={{fontFamily: FONT.SEMI, color:"#8c8c8c"}}>
          Hiện không có món ăn nào
          </Text>
        </View>
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
    paddingTop: 30,
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
export default InformationViewMenu;
