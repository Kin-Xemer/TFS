import {
    useNavigation,
    useRoute,
    useIsFocused,
  } from "@react-navigation/native";
  import { Spinner, Text } from "native-base";
  import { StyleSheet, View, FlatList } from "react-native";
  import TopBar from "../components/TopBar";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import { BASE_URL } from "../services/baseURL";
  import { FONT } from "../Utils/themeFont";
  import FeedBackItem from "../components/FeedbackScreen/FeedBackItem";
import FeedbackDetail from "../components/FeedbackScreen/FeedbackDetail";
  
  const FeedbackDetailScreen = () => {
    const route = useRoute();
    const isFocused = useIsFocused();
    const { foodId } = route.params;
    const [listMyfeedback, setListMyfeedback] = useState([]);
    useEffect(() => {
      if (isFocused) {
        let url = BASE_URL + "/feedbacks/allbyfood/" + foodId;
        axios
          .get(url)
          .then((response) => {
            setListMyfeedback(response.data);
     
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
              alert("Đã có lỗi xảy ra, xin vui lòng thử lại sau");
            }
          });
      }
      console.log(isFocused)
    }, [isFocused]);
    return (
      <View style={styles.container}>
        <TopBar title="ĐÁNH GIÁ CỦA BẠN" />
        {listMyfeedback.length > 0 && listMyfeedback ? (
          <FlatList
            contentContainerStyle={{ marginLeft: 16, paddingRight: 16 }}
            data={listMyfeedback}
            renderItem={({ item }) => (
              <View>
                <FeedbackDetail feedback={item} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Spinner size={"sm"} />
          </View>
        )}
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
  });
  export default FeedbackDetailScreen;
  