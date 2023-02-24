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
import axios from "axios";
import QRCode from "react-native-qrcode-svg";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ZaloPaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [paymentStatus, setPaymentStatus] = useState();
  const paymentObject = route.params.paymentResponse;
  useEffect(() => {
    console.log(paymentObject);
    checkPayment();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
        checkPayment();
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const checkPayment = () => {
    let url =
      "http://tfsapiv1-env.eba-aagv3rp5.ap-southeast-1.elasticbeanstalk.com/api/orders/checkPayment/" +
      paymentObject.apptransid;
    axios.get(url).then((res) => {
      setPaymentStatus(res.data);
    });
  };
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(paymentObject)}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <QRCode value={paymentObject.zaloUrl} size={150} />
        <View>
          <Text>{JSON.stringify(paymentStatus)}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
});
export default ZaloPaymentScreen;
