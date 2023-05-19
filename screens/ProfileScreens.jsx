import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { THEME_COLOR } from "../Utils/themeColor";
import { FONT } from "../Utils/themeFont";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, } from "react";
import { Flex, Spacer, Text, Avatar } from "native-base";
import {
  useIsFocused,
  useNavigation,
  useRoute,
  createNavigationContainerRef,
} from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../services/baseURL";
import {
  Camera,
  Logout,
  Message,
  ProfileCircle,
} from "iconsax-react-native";
import { Entypo } from "@expo/vector-icons";
import notifee, { EventType } from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotLoginScreen from "./NotLoginScreen";
const ProfileScreens = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.account.account);

  // const handleUpload = async ({ file }) => {
  //   setLoading(true);
  //   const formData = new FormData();
  //   formData.append("key", "042d8db8e458e838b53454557ef9d9ab");
  //   formData.append("image", file);
  //   try {
  //     const response = await axios.post(
  //       "https://api.imgbb.com/1/upload",
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );
  //     if (response.status === 200) {
  //       getImageURL(response.data.data.display_url);
  //     }
  //   } catch (error) {
  //     alert("Upload failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const isFocused = useIsFocused();
  const [count, setCount] = useState(1);
  const [list, setList] = useState([]);
  const [prev, setPrev] = useState(0);
  const [cur, setCur] = useState(0);
  const isLogin = useSelector((state) => state.account.isLogin);

  useEffect(() => {
    const unsubscribe = notifee.onBackgroundEvent(async ({ type, detail }) => {
      const { notification, pressAction } = detail;

      if (type === EventType.PRESS) {
        if (pressAction.id === "default") {
          navigation.navigate("NotiScreen");
        } else {
          axios.get(BASE_URL + "/orders/" + pressAction.id).then((res) => {
            navigation.navigate("MyOrderDetailScreen", { orders: res.data });
          });
        }
      }
      await notifee.cancelNotification(notification.id);
      console.log("background-event");
    });

    return () => {
      unsubscribe;
    };
  }, []);

  useEffect(() => {
    setCur(list.length);
    if (prev !== cur) {
      if (prev !== 0 || cur === 1) {
        pushNotifications(list[0]);
      }
    }
    const interval = setInterval(() => {
      fetchData();
      setCount((prevCount) => prevCount + 1);
      setPrev(list.length);
    }, 1000);
    // console.log(count);
    if (!isLogin) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [count]);
  useEffect(() => {
    // !isLogin ? navigation.navigate("LoginScreenn") : "";
    if (isFocused) {
      setCount(90);
      console.log("start");
    }
  }, [isFocused]);
  const pushNotifications = async (noti) => {
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });
    // Display a notification
    if (noti) {
      await notifee.displayNotification({
        title: "Thông báo",
        subtitle: "&#129395;",
        body: noti.message,
        android: {
          channelId,

          timestamp: Date.now(),
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: noti.message.slice(9, 13),
          },
          showTimestamp: true,
        },
      });
    }
  };

  const fetchData = () => {
    axios
      .get(
        BASE_URL + "/notifications/byaccount/" + customer.theAccount.accountId
      )
      .then((res) => {
        setList(res.data);
        const numberNotiChecked = res.data.filter(
          (noti) => noti.checked === false
        ).length;
        dispatch({ type: "SET_NUMBER_NOTI", payload: numberNotiChecked });
      })
      .catch((err) => {
        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
        console.log(err.response.data);
      });
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("customer");
      dispatch({ type: "LOGOUT" });
      dispatch({ type: "SET_LOGIN_STATUS_LOGOUT" });
      dispatch({ type: "CLEAR_FILTER" });
      navigation.navigate("LoginScreenn");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };

  return (
    <View style={styles.container}>
      {isLogin ? (
        <>
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
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: FONT.BOLD,
                fontSize: 25,
                paddingTop: 8,
                marginRight: 8,
              }}
            >
              {customer.customerName}
            </Text>
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
            {/* <TouchableOpacity
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
                pushNotifications(list[0]);
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
            </TouchableOpacity> */}
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
                navigation.navigate("MyFeedbackScreen", {
                  id: customer.customerId,
                });
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
                handleLogout();
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
        </>
      ) : (
        <NotLoginScreen />
      )}
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
