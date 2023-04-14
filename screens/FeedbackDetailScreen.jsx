import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { Spinner, Text } from "native-base";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import TopBar from "../components/TopBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../services/baseURL";
import FeedbackDetail from "../components/FeedbackScreen/FeedbackDetail";
import { THEME_COLOR } from "../Utils/themeColor";
import { AntDesign } from "@expo/vector-icons";
import { FONT } from "../Utils/themeFont";

const FeedbackDetailScreen = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const { foodId } = route.params;
  const [listMyfeedback, setListMyfeedback] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [isDone, setIsDone] = useState(true);
  const filterFeedback = selectedRating
    ? listMyfeedback.filter((review) => review.rate === selectedRating)
    : listMyfeedback;
  useEffect(() => {
    if (isFocused) {
      setIsDone(false);
      let url = BASE_URL + "/feedbacks/allbyfood/" + foodId;
      axios
        .get(url)
        .then((response) => {
          setIsDone(true);
          setListMyfeedback(response.data);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            alert("Đã có lỗi xảy ra, xin vui lòng thử lại sau");
          }
        });
    }
    console.log(isFocused);
  }, [isFocused]);
  const FilterButton = ({ label, selected, onPress }) => (
    <TouchableOpacity
      style={{
        padding: 10,
        borderRadius: 10,
        margin: 7,
        borderColor: selected ? THEME_COLOR : "lightgrey",
        borderWidth: 0.5,
      }}
      onPress={onPress}
    >
      <Text style={{ color: selected ? THEME_COLOR : "black", fontSize: 16, fontFamily:FONT.SEMI }}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TopBar title="ĐÁNH GIÁ" />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <FilterButton
          label="Tất cả"
          selected={!selectedRating}
          onPress={() => setSelectedRating(null)}
        />
        {[5, 4, 3, 2, 1].map((rating) => (
          <FilterButton
            key={rating}
            label={
              <>
                {rating} <AntDesign name="star" size={20} color="gold" />
              </>
            }
            selected={rating === selectedRating}
            onPress={() => setSelectedRating(rating)}
          />
        ))}
      </View>

      {isDone ? (
        listMyfeedback.length > 0 && listMyfeedback ? (
          <FlatList
          showsVerticalScrollIndicator={false}
            data={filterFeedback}
            renderItem={({ item }) => (
              <View>
                <FeedbackDetail feedback={item} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text>akjhsdk</Text>
        )
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
    paddingHorizontal: 16
  },
});
export default FeedbackDetailScreen;
