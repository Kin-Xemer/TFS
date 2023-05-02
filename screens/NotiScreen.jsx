import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { THEME_COLOR } from "../Utils/themeColor";
import { FONT } from "../Utils/themeFont";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Text, Image } from "native-base";
import CardFeedBack from "../components/FeedbackScreen/CardFeedBack";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../services/baseURL";
import { convertDate } from "../Utils/convertDate";
import TopBar from "../components/TopBar";
import NotLoginScreen from "./NotLoginScreen";
import { EMPTY_IMAGE } from "../Utils/constant";
const START = 9; // Vị trí bắt đầu
const END = 13;
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const NotiScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [listNoti, setListNoti] = useState([]);
  const [listFeedBack, setListFeedback] = useState([]);
  const [isDone, setIsDone] = useState(true);
  const customer = useSelector((state) => state.account.account);
  const isLogin = useSelector((state) => state.account.isLogin);

  useEffect(() => {
    !isLogin ? navigation.navigate("LoginScreenn") : "";
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

  const NotificationItem = ({ message, createdAt, checked, id }) => {
    const orderId = message.slice(START, END);
    let replacement = (
      <Text style={{ fontFamily: FONT.BOLD, fontSize: 15 }}>{orderId}</Text>
    );
    const handlePressNoti = async () => {
      let order = await getOrderById(orderId);
      if (!checked) {
        checkNoti(id);
      }
      navigation.navigate("MyOrderDetailScreen", {
        orders: order,
      });
    };
    const checkNoti = useCallback(
      async (id) => {
        try {
          const response = await axios.put(
            `${BASE_URL}/notifications/checked/${id}`
          );
          return response.data;
        } catch (error) {
          console.error(error.response.data);
          alert("Đã có lỗi xảy ra");
        }
      },
      [id]
    );
    const getOrderById = useCallback(
      async (orderId, id) => {
        try {
          const response = await axios.get(`${BASE_URL}/orders/${orderId}`);
          return response.data;
        } catch (error) {
          console.error(error.response.data);
          alert("Đã có lỗi xảy ra");
        }
      },
      [message]
    );
    return (
      <TouchableOpacity
        style={[
          styles.workerLabel,
          { backgroundColor: checked ? "white" : "#e8fafa" },
        ]}
        activeOpacity={0.7}
        onPress={() => {
          handlePressNoti(message);
        }}
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
          <Text style={{ fontFamily: FONT.REGULAR }}>
            {message.slice(0, START)} {replacement} {message.slice(END)}
          </Text>
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
      </TouchableOpacity>
    );
  };

  const MemoizedNotificationItem = React.memo(NotificationItem);
  return (
    <View style={styles.container}>
      {isLogin ? (
        <View>
          <View style={{ paddingLeft: 10 }}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                paddingBottom: 20,
              }}
            >
              <Text
                style={[
                  styles.title,
                  { fontSize: 20, color: THEME_COLOR, paddingTop: 4 },
                ]}
              >
                THÔNG BÁO
              </Text>
            </View>
          </View>
          {listNoti.length > 0 ? (
            <FlatList
              style={{ marginBottom: 50 }}
              showsVerticalScrollIndicator={false}
              data={listNoti}
              renderItem={({ item }) => (
                <MemoizedNotificationItem
                  message={item.message}
                  createdAt={item.createdAt}
                  checked={item.checked}
                  id={item.id}
                />
              )}
            />
          ) : (
            <View style={[{ alignItems: "center", paddingTop: 200 }]}>
              <Image
                source={{
                  uri: EMPTY_IMAGE,
                }}
                size={200}
                alt="empty"
              />
              <Text style={{ fontFamily: FONT.SEMI, color: "#8c8c8c" }}>
                Chưa có thông báo nào
              </Text>
            </View>
          )}
        </View>
      ) : (
        <NotLoginScreen />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 40,
  },
  workerLabel: {
    padding: 16,
    flexDirection: "row",
  },
  title: {
    fontSize: 14,
    fontFamily: "Quicksand-Bold",
  },
});

export default NotiScreen;
