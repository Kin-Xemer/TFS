import { useRoute, useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  SafeAreaView,TouchableOpacity
} from "react-native";
import {useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { AntDesign, Feather,Entypo } from "@expo/vector-icons";
import { AddCircle, MinusCirlce } from "iconsax-react-native";
import { Flex, Spacer, Text, Heading, Button, useToast, Box } from "native-base";
import { convertPrice } from "../Utils/convertPrice";
import RatingBar from "../components/RatingBar";
import Toast from 'react-native-toast-message';
import { THEME_COLOR } from "../Utils/themeColor";
import { FONT } from "../Utils/themeFont";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const PartyScreen = () => {
    return (
        <View style={styles.container}><Text>party</Text></View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:"#f0f0f0"
    }
});
export default PartyScreen;