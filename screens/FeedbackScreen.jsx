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
import { useRoute } from "@react-navigation/native";
import ActionButton from "../components/ActionButton";
const FeedbackScreen = () => {
  const route = useRoute();
  const { order } = route.params;
  const [listFeedBack, setListFeedback] = useState([]);
  useEffect(() => {
    order.itemList.map((item, i) => {
  
      setListFeedback((arr) =>[
        ...arr,
        {
          food: { id: item.id, name: item.name },
          customerId: 0,
          avatarUrl: "",
          comment: "",
          rate: 0,
          status: true,
        },
      ]);
    });
  }, []);
  const onFinish = () => {
    console.log("Rating is: ", listFeedBack);
    console.log("Rating legnth: ", listFeedBack.length);
  };
  return (
    <View style={styles.container}>
      {order.itemList.length > 0 ? (
        order.itemList.map((item, index) => (
          <View key={index}>
            <CardFeedBack item={item} setListFeedback={setListFeedback} listFeedBack={listFeedBack} />
          </View>
        ))
      ) : (
        <></>
      )}
      <Spacer />
      <View style={{ bottom: 0 }}>
        <ActionButton
          buttonText="Gửi"
          onPress={() => {
            onFinish();
          }}
        />
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
