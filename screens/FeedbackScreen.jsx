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
const FeedbackScreen = (props) => {
    const {order} = props;
  return (
    <View style={styles.container}>
      <Text>akjsk</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
});
export default FeedbackScreen;
