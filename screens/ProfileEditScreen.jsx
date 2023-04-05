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
  TextInput,
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
  Box,
  Avatar,
  Image,
  Divider,
} from "native-base";
import CardFeedBack from "../components/FeedbackScreen/CardFeedBack";
import { useNavigation, useRoute } from "@react-navigation/native";
import ActionButton from "../components/ActionButton";
import axios from "axios";
import { BASE_URL } from "../services/baseURL";
import { Toast } from "@ant-design/react-native";
import {
  Camera,
  Edit2,
  InfoCircle,
  Logout,
  ProfileCircle,
  Setting2,
} from "iconsax-react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { validateEmail } from "../Utils/validateEmail";
import { getCustomerById } from "../Utils/api/getCustomerById";
const ProfileEditScreen = () => {
  const route = useRoute();
  const { customer } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const nameRef = useRef();
  const mailRef = useRef();
  const [isDone, setIsDone] = useState(true);
  const [email, setEmail] = useState(customer.email);
  const [name, setName] = useState(customer.customerName);
  const [emailError, setEmailError] = useState("");
  const handleSubmit = () => {
    console.log(validateEmail(email));
    nameRef.current.blur();
    mailRef.current.blur();
    validateEmail(email)
      ? submitSuccess()
      : setEmailError("Email không đúng định dạng");
  };
  const submitSuccess = () => {
    const newCustomer = {
      customerId: customer.customerId,
      email: email,
      customerName: name,
    };
    console.log(newCustomer)
    axios
      .put(BASE_URL + "/customers", newCustomer)
      .then((res) => {
        getCustomerById(dispatch, customer.customerId);
        Toast.success("Cập nhật thành công", 1);
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
      });
  };
  return (
    <View style={styles.container}>
      <Flex
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 40 }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
        >
          <Entypo name="chevron-left" size={36} color={THEME_COLOR} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: FONT.BOLD,
            paddingTop: 5,
            fontSize: 22,
            marginLeft: 8,
            marginLeft: 60,
            color: THEME_COLOR,
          }}
        >
          SỬA THÔNG TIN
        </Text>
      </Flex>
      <Image alt="a" />
      <Flex
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <ProfileCircle color="black" />
        <TextInput
          ref={nameRef}
          numberOfLines={1}
          style={{
            fontFamily: FONT.MEDIUM,
            fontSize: 16,
            marginLeft: 8,
            width: "85%",
            maxWidth: "85%",
          }}
          placeholderTextColor="#999999"
          placeholder="a"
          onFocus={() => {
            setEmailError("");
          }}
          onChangeText={(text) => {
            setName(text);
          }}
          defaultValue={name}
        />

        <Spacer />
        <Edit2 color="black" variant="Bold" size={16} />
      </Flex>
      <Divider mb={8} mt={2} />
      <Flex
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <MaterialIcons name="mail-outline" color={"black"} size={24} />
        <TextInput
          ref={mailRef}
          numberOfLines={1}
          style={{
            fontFamily: FONT.MEDIUM,
            fontSize: 16,
            marginLeft: 8,
            width: "85%",
            maxWidth: "85%",
          }}
          placeholderTextColor="#999999"
          placeholder="a"
          onChangeText={(text) => {
            setEmail(text);
          }}
          defaultValue={email}
          onFocus={() => {
            setEmailError("");
          }}
        />

        <Spacer />
        <Edit2 color="black" variant="Bold" size={16} />
      </Flex>
      <Divider mb={1} mt={2} />
      {emailError ? (
        <View>
          <Text style={{ fontFamily: FONT.MEDIUM, color: "red" }}>
            {emailError}
          </Text>
        </View>
      ) : (
        <></>
      )}
      <View style={{ marginTop: 40 }}>
        <ActionButton
          buttonText="Cập nhật"
          onPress={() => {
            handleSubmit();
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
export default ProfileEditScreen;
