import { Avatar, Divider, Flex, Image, Spacer, Stack } from "native-base";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { FONT } from "../../Utils/themeFont";
import { useNavigation } from "@react-navigation/native";
import { convertDate } from "../../Utils/convertDate";
import { convertStar } from "../../Utils/convertStar";
import { AirbnbRating } from "react-native-ratings";
import { Edit } from "iconsax-react-native";
import { THEME_COLOR } from "../../Utils/themeColor";
const FeedBackItem = (props) => {
  const customer = useSelector((state) => state.account.account);
  const navigation = useNavigation();
  const { feedback, user } = props;
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
            {customer.theAccount.accountId}
          </Text>
      
            <AirbnbRating
              count={5}
              defaultRating={convertStar(feedback.rate)}
              size={15}
              isDisabled={true}
              showRating={false}
              starContainerStyle={{ marginLeft: -20 ,  justifyContent:"flex-start",}}
            />
         
          <Text style={{ fontFamily: FONT.SEMI, color: "#8c8c8c" }}>
            {convertDate(feedback.createdAt)}
          </Text>
          <Flex flexDirection="row" alignItems={"center"}>
            <Image
              source={{
                uri: feedback.food.imgUrl,
              }}
              alt="Alternate Text"
              h={8}
              w={8}
              borderRadius={10}
            />

            <Stack style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: FONT.BOLD, fontSize: 14 }}>
                {feedback.food.foodName}
              </Text>
            </Stack>
          </Flex>
          <Text style={{ fontFamily: FONT.MEDIUM , fontSize: 16 }}>{feedback.comment}</Text>
        </Stack>
        <Spacer />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditFeedbackScreen", { feedback: feedback });
          }}
        >
          <Edit size={18} color={THEME_COLOR} />
        </TouchableOpacity>
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
    justifyContent:"flex-start",
    backgroundColor:"red"
  },
});
export default FeedBackItem;
