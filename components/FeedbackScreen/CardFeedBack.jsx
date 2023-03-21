import { Flex, Image, Text, Stack, Box, Spacer, TextArea } from "native-base";
import { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { convertStarToText } from "../../Utils/convertStarToText";
import { THEME_COLOR } from "../../Utils/themeColor";
import { FONT } from "../../Utils/themeFont";
const CardFeedBack = (props) => {
  const { item } = props;
  const [rating, setRating] = useState(0);
  const [textArea, setTextArea] = useState("");
  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  };
  useEffect(() => {
    console.log(rating);
  }, [rating]);
  return (
    <View style={styles.container}>
      <Flex flexDirection="row" alignItems={"center"}>
        <Image
          source={{
            uri: item.image,
          }}
          alt="Alternate Text"
          h={10}
          w={10}
          borderRadius={10}
        />
        <Stack style={{ marginLeft: 10 }}>
          <Text style={{ fontFamily: FONT.BOLD, fontSize: 16 }}>
            {item.name}
          </Text>
          <Text
            style={{ fontFamily: FONT.BOLD, fontSize: 15, color: "#aeaeae" }}
          >
            x {item.quantity}
          </Text>
        </Stack>
      </Flex>
      <Box width={"100%"} borderBottomColor={"#8c8c8c"} borderBottomWidth={0.3} mb={4} marginVertical={10} />
      <Flex style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <Text style={{ fontFamily: FONT.SEMI, fontSize: 15 }}>Đánh giá</Text>
        <Spacer />
        <View style={{ alignItems: "center" }}>
          <StarRating
            rating={rating}
            color={"#ffd000"}
            onChange={(rating) => {
              setRating(rating);
              console.log(rating);
            }}
            enableSwiping={false}
            enableHalfStar={false}
            starStyle={{
              borderRadius: 14,
              marginHorizontal: 2,
            }}
          />
          <Text style={{ fontFamily: FONT.BOLD, fontSize:16, color:"#e5bb00"}}>
            {rating !== 0 ? <Text>{convertStarToText(rating)}</Text> : ""}
          </Text>
        </View>
      </Flex>
      <Box mb={2} mt={4}>
            <Text style={{ fontFamily: FONT.SEMI, fontSize: 16 }}>
              Ghi chú:
            </Text>
            <View>
              <TextArea
                style={{ fontFamily: "Quicksand-Regular" }}
                placeholder="Hãy nhận xét món ăn này bạn nhé "
                size="md"
                paddingLeft="4"
                borderWidth={0.5}
                mb={3}
                mt={1}
                borderColor={"#8c8c8c"}
                // value={note}
                borderRadius={15}
                _light={{
                  placeholderTextColor: "trueGray.400",
                  bg: "white",
                  _hover: {
                    bg: "white",
                    borderColor: "#8c8c8c",
                  },
                  _focus: {
                    bg: "white",
                    borderColor: "#8c8c8c",
                  },
                }}
                onChangeText={(value) => {
                    setTextArea(value);
                }}
              
              />
            </View>
          </Box>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 15,
    padding: 16,
    borderWidth: 0.5,
    borderColor: "#8c8c8c",
  },
});
export default CardFeedBack;
