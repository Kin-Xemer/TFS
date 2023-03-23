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
const FeedbackScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { order } = route.params;
  const [listFeedBack, setListFeedback] = useState([]);
  const [isDone, setIsDone] = useState(true);
  const customerId = useSelector((state) => state.account.account.customerId);
  const avatarUrl = useSelector((state) => state.account.account.avatarURL);
  useEffect(() => {
    const setList = () => {
      order.itemList.map((item, i) => {
        setListFeedback((arr) => [
          ...arr,
          {
            foodId: item.id,
            customerId: customerId,
            avatarUrl: avatarUrl,
            comment: "",
            rate: 5,
            status: true,
          },
        ]);
      });
    };
    setList();
  }, []);
  const onFinish = () => {
    setIsDone(false);

    // const data = { feedbackList: listFeedBack };
    // // const config = {
    // //   headers: { "Content-Type": "application/json" },
    // // };
    // console.log(data);
    // console.log(
    //   axios.getUri({ url: BASE_URL + "/feedbacks", method: "post", data: data })
    // );
    axios
      .post(BASE_URL + "/feedbacks/pack", listFeedBack)
      .then((response) => {
        axios
          .put(BASE_URL + "/orders/feedback/status", {
            orderId: order.id,
            feedbackStatus: true,
          })
          .then((response) => {
            Toast.success("Đã gửi đánh giá thành công", 1);
            navigation.navigate("Home");
            setIsDone(true);
          })
          .catch((error) => {
            if (error.response) {
              setIsDone(true);
              alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
              console.log(error.response.data.message);
            }
          });
      })
      .catch((error) => {
        if (error.response) {
          setIsDone(true);
          alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
          console.log(error.response.data.message);
        }
      });
  };
  return (
    <View style={styles.container}>
      {order.itemList.length > 0 ? (
        order.itemList.map((item, index) => (
          <View key={index}>
            <CardFeedBack
              item={item}
              setListFeedback={setListFeedback}
              listFeedBack={listFeedBack}
            />
          </View>
        ))
      ) : (
        <></>
      )}
      <Spacer />
      <View style={{ bottom: 0 }}>
        {isDone ? (
          <ActionButton
            buttonText="Gửi"
            onPress={() => {
              onFinish();
            }}
          />
        ) : (
          <ActionButton
            buttonText="Đang gửi"
            onPress={() => {}}
            disabled={true}
          />
        )}
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
  },
});
export default FeedbackScreen;
