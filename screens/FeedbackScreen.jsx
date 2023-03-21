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
import { THEME_COLOR } from "../Utils/themeColor";
import { FONT } from "../Utils/themeFont";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import {
  Flex,
  Spacer,
  Text,
  Heading,
  Button,
  useToast,
  Box,
} from "native-base";
import CardFeedBack from "../components/FeedbackScreen/CardFeedBack";
import { useRoute } from '@react-navigation/native';
const FeedbackScreen = () => {
  const route = useRoute();
  const {order} = route.params;
  useEffect(() => {
    console.log("order", order)
  },[])
  
  return (
    <View style={styles.container}>
      {order.itemList.length > 0 ? (
        order.itemList.map((item, index) => (
          <View key={index}>
            <CardFeedBack item={item} />
          </View>
        ))
      ) : (
        <></>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "white",
    paddingHorizontal: 16
  },
});
export default FeedbackScreen;
