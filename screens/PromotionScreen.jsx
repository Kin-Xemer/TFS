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
  FlatList,
} from "react-native";
import { Provider } from "@ant-design/react-native";
import { Entypo } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import { Box, Flex, Spinner } from "native-base";
import { THEME_COLOR } from "../Utils/themeColor";
import { ArrowUp3, ArrowDown3 } from "iconsax-react-native";
import { FONT } from "../Utils/themeFont.js";
import { BASE_URL } from "../services/baseURL.js";
import React from "react";
const PromotionScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const listPromotion = useSelector((state) => state.promotion.listPromotion);

  return (
    <View style={styles.container}>
      {listPromotion.length > 0 ? (
        <FlatList
          data={listPromotion}
          renderItem={({ item }) => (
            <View>
            </View>
          )}
        />
      ) : (
        <Text>Khong co gi het</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
});
export default PromotionScreen;
