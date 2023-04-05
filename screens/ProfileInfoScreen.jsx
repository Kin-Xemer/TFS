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
  Mobile,
  ProfileCircle,
  Setting2,
} from "iconsax-react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
const ProfileInfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [listFeedBack, setListFeedback] = useState([]);
  const [isDone, setIsDone] = useState(true);
  const customer = useSelector((state) => state.account.account);

  return (
    <View style={styles.container}>
      <Flex
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 40 }}
      >
       <TouchableOpacity
       activeOpacity={0.7}
       onPress={() => navigation.goBack()}
       >
       <Entypo name="chevron-left" size={36} color={THEME_COLOR} />
       </TouchableOpacity>
        <Text
          style={{
            fontFamily: FONT.BOLD,
            paddingTop: 5,
            fontSize: 22,
            marginLeft: 8,
            marginLeft: 50,
            color: THEME_COLOR,
          }}
        >
          THÔNG TIN CÁ NHÂN
        </Text>
      </Flex>
      <Image alt="a" />
      <Flex
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <ProfileCircle color="black"/>
        <Text
          style={{
            fontFamily: FONT.MEDIUM,
            paddingBottom: 1,
            fontSize: 16,
            marginLeft: 8,
          }}
        >
          Họ và tên
        </Text>
        <Spacer />
        <Text
          style={{
            fontFamily: FONT.MEDIUM,
            paddingBottom: 1,
            fontSize: 16,
            marginLeft: 8,
          }}
        >
          {customer.customerName}
        </Text>
      </Flex>
      <Divider mb={8} mt={2} />
      <Flex
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <MaterialIcons name="mail-outline" color={"black"} size={24}/>
        <Text
          style={{
            fontFamily: FONT.MEDIUM,
            paddingBottom: 1,
            fontSize: 16,
            marginLeft: 8,
          }}
        >
          Email
        </Text>
        <Spacer />
        <Text
          style={{
            fontFamily: FONT.MEDIUM,
            paddingBottom: 1,
            fontSize: 16,
            marginLeft: 8,
          }}
        >
          {customer.email}
        </Text>
      </Flex>
      <Divider mb={8} mt={2} />
      <Flex
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Mobile color="black"/>
        <Text
          style={{
            fontFamily: FONT.MEDIUM,
            paddingBottom: 1,
            fontSize: 16,
            marginLeft: 8,
          }}
        >
          Số điện thoại
        </Text>
        <Spacer />
        <Text
          style={{
            fontFamily: FONT.MEDIUM,
            paddingBottom: 1,
            fontSize: 16,
            marginLeft: 8,
          }}
        >
          {customer.theAccount.phoneNumber}
        </Text>
      </Flex>
      <Divider mb={8} mt={2} />
      <ActionButton
        buttonText="Sửa thông tin"
        onPress={() => navigation.navigate("ProfileEditScreen", {customer: customer})}
      />
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
export default ProfileInfoScreen;
