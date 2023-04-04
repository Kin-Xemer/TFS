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
  import { useNavigation, useRoute } from "@react-navigation/native";
  import ActionButton from "../components/ActionButton";
  import axios from "axios";
  import { BASE_URL } from "../services/baseURL";
  import { Toast } from "@ant-design/react-native";
  const NotiScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const [listFeedBack, setListFeedback] = useState([]);
    const [isDone, setIsDone] = useState(true);
    const customerId = useSelector((state) => state.account.account.customerId);
    const avatarUrl = useSelector((state) => state.account.account.avatarURL);
  
    return (
      <View style={styles.container}>
       <Text>a</Text>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
      backgroundColor: "white",
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
  });
  export default NotiScreen;
  