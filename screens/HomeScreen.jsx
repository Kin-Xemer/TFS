import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity,Linking } from "react-native";
import { useState, useMemo, useEffect } from "react";
import Home from "../components/Home/index.jsx";
import { Box, Button, Text } from "native-base";

const HomeScreen = (props) => {
  const isFocused = useIsFocused()
  return (
    <View style={styles.container}>
      {/* <Text>{count}</Text> */}
      <Home isFocused={isFocused} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "white",
  },
  textStyle: {
    fontFamily: "Quicksand-Regular",
  },
  textHeader: {
    fontSize: 30,
  },
});
export default HomeScreen;
