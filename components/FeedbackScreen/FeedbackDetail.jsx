import { Avatar, Divider, Flex, Image, Spacer, Stack } from "native-base";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { FONT } from "../../Utils/themeFont";
import { useNavigation } from "@react-navigation/native";
import { convertDate } from "../../Utils/convertDate";
import { convertStar } from "../../Utils/convertStar";
import { AirbnbRating } from "react-native-ratings";
import { Edit, More } from "iconsax-react-native";
import { THEME_COLOR } from "../../Utils/themeColor";
import StarRating from "react-native-star-rating-widget";
import { Feather } from "@expo/vector-icons";
const FeedbackDetail = (props) => {
  const navigation = useNavigation();
  const { feedback } = props;
  return (
    <View>
      <View style={styles.container}>
        <Avatar
          source={{
            uri: feedback.avatarUrl,
          }}
          size="sm"
        >
          SS
        </Avatar>

        <Stack style={styles.infor} space={1}>
          <Text style={{ fontFamily: FONT.MEDIUM }}>
            {feedback.customerId}
          </Text>

          {/* <AirbnbRating
            count={5}
            defaultRating={convertStar(feedback.rate)}
            size={15}
            isDisabled={true}
            showRating={false}
            starContainerStyle={{
              marginLeft: -20,
              justifyContent: "flex-start",
            }}
          /> */}
          <StarRating
            rating={feedback.rate}
            color={"#ffd000"}
            onChange={(rating) => {
              // setRating(rating);
              // console.log(rating);
            }}
            enableSwiping={false}
            enableHalfStar={false}
            starSize={18}
            starStyle={{
              marginRight: -5,
            }}
            emptyColor="#8c8c8c"
            style={{ marginLeft: -5 }}
          />
          <Text style={{ fontFamily: FONT.SEMI, color: "#8c8c8c" }}>
            {convertDate(feedback.createdAt)}
          </Text>
          <Text
            style={{ fontFamily: FONT.MEDIUM, fontSize: 16, maxWidth: "89%" }}
          >
            {feedback.comment}
          </Text>
        </Stack>
        {/* <Spacer />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditFeedbackScreen", { feedback: feedback });
          }}
        >
        
          <Feather name="more-horizontal" size={18} color={"black"} />
        </TouchableOpacity> */}
      </View>
      <Divider />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
  },
  infor: {
    paddingLeft: 8,
    justifyContent: "flex-start",
  },
});
export default FeedbackDetail;
