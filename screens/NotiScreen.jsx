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
  FlatList,
  AppRegistry,
} from "react-native";
import { THEME_COLOR } from "../Utils/themeColor";
import { FONT } from "../Utils/themeFont";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  Spacer,
  Text,
  Heading,
  Button,
  useToast,
  Box,
  Image,
} from "native-base";
import CardFeedBack from "../components/FeedbackScreen/CardFeedBack";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import ActionButton from "../components/ActionButton";
import axios from "axios";
import { BASE_URL } from "../services/baseURL";
import { Toast } from "@ant-design/react-native";
import { convertDate } from "../Utils/convertDate";
import TopBar from "../components/TopBar";
const NotiScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [listNoti, setListNoti] = useState([]);
  const [listFeedBack, setListFeedback] = useState([]);
  const [isDone, setIsDone] = useState(true);
  const customer = useSelector((state) => state.account.account);

  useEffect(() => {
    if (isFocused) {
      axios
        .get(
          BASE_URL + "/notifications/byaccount/" + customer.theAccount.accountId
        )
        .then((res) => {
          setListNoti(res.data.slice(0, 15));
        })
        .catch((err) => {
          alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
          console.log(err.response.data);
        });
    }
  }, [isFocused]);

  const NotificationItem = ({ message, createdAt }) => {
    return (
      <Flex
        backgroundColor="white"
        direction="row"
        style={styles.workerLabel}
      >
        <View style={styles.iconStyle}>
          <Image
            size={10}
            resizeMode={"contain"}
            borderRadius={300}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1154/1154468.png",
            }}
            alt="Alternate Text"
          />
        </View>
        <View style={{ marginLeft: 8, flex: 1, justifyContent: "center" }}>
          <Text style={{ fontFamily: FONT.BOLD }}>Thông báo</Text>
          <Text style={{ fontFamily: FONT.REGULAR }}>{message}</Text>
          <Text
            style={{
              fontFamily: "OpenSans-Regular",
              fontSize: 13,
              color: "gray",
            }}
          >
            {convertDate(createdAt)}
          </Text>
        </View>
      </Flex>
    );
  };

  const MemoizedNotificationItem = React.memo(NotificationItem);
  return (
    <View style={styles.container}>
      <TopBar title="THÔNG BÁO" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={listNoti}
        renderItem={({ item }) => (
          <MemoizedNotificationItem
            message={item.message}
            createdAt={item.createdAt}
          />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  workerLabel: {
    padding: 16,
  },
});

// AppRegistry.registerComponent('custom-component', () => NotiScreen);
export default NotiScreen;
