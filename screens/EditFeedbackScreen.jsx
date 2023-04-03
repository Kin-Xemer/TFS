import { Flex, Image, Text, Stack, Box, Spacer, TextArea } from "native-base";
import { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { useSelector, useDispatch } from "react-redux";

import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { FONT } from "../Utils/themeFont";
import { convertStarToText } from "../Utils/convertStarToText";
import TopBar from "../components/TopBar";
import ActionButton from "../components/ActionButton";
import axios from "axios";
import { BASE_URL } from "../services/baseURL";
import { Toast } from "@ant-design/react-native";
import { CloseSquare } from "iconsax-react-native";
import { THEME_COLOR } from "../Utils/themeColor";
import ConfirmDelete from "../components/ConfirmDelete";

const EditFeedbackScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { feedback } = route.params;
  const [rating, setRating] = useState(feedback.rate);
  const [isDone, setIsDone] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [textArea, setTextArea] = useState(feedback.comment);

  const onDelete = () => {
    setIsDone(false);
    setIsOpen(false);
    let url = `${BASE_URL}/feedbacks/${feedback.id}`;
    axios
      .delete(url)
      .then(() => {
        setIsDone(true);
        Toast.success("Xoá đánh giá thành công", 1);
        if (navigation.canGoBack()) {
          if (navigation.canGoBack()) {
          navigation.goBack();
        }
        }
      })
      .catch((err) => {
        if (err.response) {
          alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
          console.log(err.response.data);
        }
      });
  };

  const onUpdate = () => {
    setIsDone(false);
    const updatedFeedback = {
      ...feedback,
      rate: rating,
      comment: textArea,
    };
    let url = BASE_URL + "/feedbacks";
    console.log(updatedFeedback);
    axios
      .put(url, updatedFeedback)
      .then((response) => {
        setIsDone(true);
        Toast.success("Cập nhật thành công", 1);
        if (navigation.canGoBack()) {
          if (navigation.canGoBack()) {
          navigation.goBack();
        }
        }
      })
      .catch((error) => {
        if (error.response) {
          alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
          console.log(error.response.data);
        }
      });
  };
  return (
    <View style={styles.container}>
      <TopBar title="SỬA ĐÁNH GIÁ" />
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 0,
          marginRight: 16,
          marginTop: 55,
        }}
        onPress={() => {
          setIsOpen(true);
        }}
      >
        <CloseSquare size="28" color={THEME_COLOR} />
      </TouchableOpacity>
      <View style={{ padding: 16 }}>
        <Flex flexDirection="row" alignItems={"center"}>
          <Image
            source={{
              uri: feedback.food.imgUrl,
            }}
            alt="Alternate Text"
            h={10}
            w={10}
            borderRadius={10}
          />

          <Stack style={{ marginLeft: 10 }}>
            <Text style={{ fontFamily: FONT.BOLD, fontSize: 16 }}>
              {feedback.food.foodName}
            </Text>
          </Stack>
        </Flex>
        <Box
          width={"100%"}
          borderBottomColor={"#8c8c8c"}
          borderBottomWidth={0.3}
          mb={4}
          marginVertical={10}
        />
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
            <Text
              style={{ fontFamily: FONT.BOLD, fontSize: 16, color: "#e5bb00" }}
            >
              {rating !== 0 ? <Text>{convertStarToText(rating)}</Text> : ""}
            </Text>
          </View>
        </Flex>
        <Box mb={2}>
          <Text style={{ fontFamily: FONT.SEMI, fontSize: 16 }}>Ghi chú:</Text>
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
              defaultValue={textArea}
            />
          </View>
        </Box>
        <ConfirmDelete
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onDelete={onDelete}
          title={
            <Text style={{ fontFamily: FONT.BOLD, fontSize: 18 }}>
              Xoá đánh giá
            </Text>
          }
          content="Bạn có muốn xoá đánh giá này ?   Thao tác của bạn sẽ không được hoàn tác"
          cancelText="Huỷ"
          deleteText="Xoá"
        />
        {isDone ? (
          <ActionButton
            buttonText="Cập nhật"
            onPress={() => {
              onUpdate();
            }}
          />
        ) : (
          <ActionButton
            // onPress={() => {
            //   handleAddMenuToCart();
            // }}
            disabled={true}
            buttonText="Đang cập nhật..."
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    borderRadius: 15,

    borderWidth: 0.5,
    borderColor: "#8c8c8c",
    backgroundColor: "white",
  },
});
export default EditFeedbackScreen;
