import { useRoute, useNavigation } from "@react-navigation/native";
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
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import { AddCircle, MinusCirlce } from "iconsax-react-native";
import {
  Flex,
  Spacer,
  Text,
  Heading,
  Button,
  useToast,
  Box,
} from "native-base";
import { Setting4 } from "iconsax-react-native";
import Toast from "react-native-toast-message";
import { THEME_COLOR } from "../../Utils/themeColor";
import RatingBar from "../RatingBar";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const HEADER_MAX_HEIGHT = screenHeight * 0.23;
const HEADER_MIN_HEIGHT = 114;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const     InformationView = () => {
  const toast = useToast();
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [food, setFood] = useState(route.params.food);
  const [quantity, setQuantity] = useState(1);
  const [contentOffset, setContentOffset] = useState(0);
  const [totalPrice, setTotalPrice] = useState();

  return (
    <View style={styles.inforView}>
      <Flex direction="row" width={"100%"} style={{backgroundColor: "white", paddingVertical: 4}}>
        <TouchableOpacity>
          <View style={styles.filterButtonView}>        
              <Setting4 size="18" color="#000" />
          </View>
        </TouchableOpacity>
        <Spacer />
        <TouchableOpacity>
          <View style={styles.filterButtonView}>
            <Text style={{ fontFamily: "Quicksand-Regular", fontSize:15 }}>Ngày lễ</Text>
          </View>
        </TouchableOpacity>
        <Spacer />
        <TouchableOpacity>
          <View style={styles.filterButtonView}>
            <Text style={{ fontFamily: "Quicksand-Regular", fontSize:15 }}>Khuyến mãi</Text>
          </View>
        </TouchableOpacity>
        <Spacer />
        <TouchableOpacity>
          <View style={styles.filterButtonView}>
            <Text style={{ fontFamily: "Quicksand-Regular", fontSize:15 }}>Giá</Text>
          </View>
        </TouchableOpacity>
        <Spacer />
        <TouchableOpacity>
          <View style={styles.filterButtonView}>
            <Text style={{ fontFamily: "Quicksand-Regular", fontSize:15 }}>Loc theo</Text>
          </View> 
        </TouchableOpacity>
      </Flex>
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
  },
});
export default InformationView;
