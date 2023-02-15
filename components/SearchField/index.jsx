import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Flex, TextArea, Spacer, Divider, Image } from "native-base";
const SearchField = (props) => {
  const { orders, isFocused, isDone } = props;
  return (
    <View>
      <Text>Search Field</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
});
export default SearchField;
