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
const FeedbackScreen = (props) => {
  const { order } = props;
  let feedBackType = [
    {
      id: 1,
      rate: 1,
      name: "Quá tệ",
    },
    {
      id: 2,
      rate: 2,
      name: "Không ngon lắm",
    },
    {
      id: 3,
      rate: 3,
      name: "Bình thường",
    },
    {
      id: 4,
      rate: 4,
      name: "Ngon",
    },
    {
      id: 5,
      rate: 5,
      name: "Hoàn hảo",
    },
  ];
  return (
    <View style={styles.container}>
      <CardFeedBack/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "white",
  },
});
export default FeedbackScreen;
