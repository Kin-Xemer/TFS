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
import { Flex, Spacer, Text, Heading, Button, Box, Avatar } from "native-base";
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
  Message,
  ProfileCircle,
  Setting2,
} from "iconsax-react-native";
import { Entypo } from "@expo/vector-icons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProfileScreens = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [listFeedBack, setListFeedback] = useState([]);
  const [isDone, setIsDone] = useState(true);
  const [loading, setLoading] = useState(false);
  const customer = useSelector((state) => state.account.account);

  const handleUpload = async ({ file }) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("key", "042d8db8e458e838b53454557ef9d9ab");
    formData.append("image", file);
    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 200) {
        getImageURL(response.data.data.display_url);
      }
    } catch (error) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch({
        type: "SET_ORDER_STATUS",
        payload: "",
      });
      await AsyncStorage.removeItem("customer");
      dispatch({ type: "LOGOUT" });
      dispatch({ type: "SET_LOGIN_STATUS_LOGOUT" });
      navigation.navigate("LoginScreenn");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Avatar
          size={"xl"}
          bg="green.400"
          mt={10}
          source={{
            uri: customer.avatarURL,
          }}
        >
          {customer.theAccount.accountId}
          <Avatar.Badge bg="coolGray.300" size={8}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 3,
                borderRadius: 100,
              }}
              activeOpacity={0.7}
            >
              <Camera size="20" color="gray" variant="Bold" />
            </TouchableOpacity>
          </Avatar.Badge>
        </Avatar>
      </View>
      <Flex
        style={{ marginTop: 20, flexDirection: "row", alignItems: "center" }}
      >
        <Text
          style={{
            fontFamily: FONT.BOLD,
            fontSize: 25,
            paddingTop: 8,
            marginRight: 8,
          }}
        >
          {customer.theAccount.accountId}
        </Text>
        <TouchableOpacity
          onPress={() => {
            console.log("check");
          }}
          activeOpacity={0.7}
        >
          <Edit2 color="black" variant="Bold" size={16} />
        </TouchableOpacity>
      </Flex>
      <View style={{ marginTop: 100, width: "100%" }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("ProfileInfoScreen");
          }}
          style={{
            backgroundColor: "#eeeeee",
            padding: 16,
            borderRadius: 15,
            alignItems: "center",
            marginBottom: 30,
            flexDirection: "row",
          }}
        >
          <ProfileCircle variant="Bold" size={24} color={THEME_COLOR} />
          <Text
            style={{
              fontFamily: FONT.MEDIUM,
              paddingBottom: 1,
              fontSize: 16,
              marginLeft: 8,
            }}
          >
            Thông tin cá nhân
          </Text>
          <Spacer />
          <Entypo name="chevron-right" size={28} color="black" />
        </TouchableOpacity>
        <Flex
          style={{
            backgroundColor: "#eeeeee",
            padding: 16,
            borderRadius: 15,
            alignItems: "center",
            marginBottom: 30,
            flexDirection: "row",
          }}
        >
          <Setting2 color={THEME_COLOR} size={24} variant="Bold" />
          <Text
            style={{
              fontFamily: FONT.MEDIUM,
              paddingBottom: 1,
              fontSize: 16,
              marginLeft: 8,
            }}
          >
            Cài đặt
          </Text>
          <Spacer />
          <Entypo name="chevron-right" size={28} color="black" />
        </Flex>
        <TouchableOpacity
          style={{
            backgroundColor: "#eeeeee",
            padding: 16,
            borderRadius: 15,
            alignItems: "center",
            marginBottom: 30,
            flexDirection: "row",
          }}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("MyFeedbackScreen", {id: customer.customerId});
          }}
        >
          <Message color={THEME_COLOR} size={24} variant="Bold" />
          <Text
            style={{
              fontFamily: FONT.MEDIUM,
              paddingBottom: 1,
              fontSize: 16,
              marginLeft: 8,
            }}
          >
            Đánh giá của tôi
          </Text>
          <Spacer />
          <Entypo name="chevron-right" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
         style={{
          backgroundColor: "#eeeeee",
          padding: 16,
          borderRadius: 15,
          alignItems: "center",
          marginBottom: 30,
          flexDirection: "row",
        }}
        activeOpacity={0.7}
        onPress={() => {
          handleLogout()
        }}
        >
          <Logout color={THEME_COLOR} size={24} variant="Bold" />
          <Text
            style={{
              fontFamily: FONT.MEDIUM,
              paddingBottom: 1,
              fontSize: 16,
              marginLeft: 8,
            }}
          >
            Đăng xuất
          </Text>
          <Spacer />
          <Entypo name="chevron-right" size={28} color="black" />
        </TouchableOpacity>
      </View>
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
    alignItems: "center",
  },
});
export default ProfileScreens;
