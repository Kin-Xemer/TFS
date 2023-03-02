import { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import StepIndicator from "react-native-step-indicator-v2";
import { FONT } from "../../Utils/themeFont";
import { customStyles } from "../../services/customStepIndicator";
import { Box, Flex, Spacer, Text } from "native-base";
import FoodOrderItem from "../FoodOrderItem/index";
import { convertPrice } from "../../Utils/convertPrice";
import { THEME_COLOR } from "../../Utils/themeColor";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const MyOrderItem = (props) => {
  const { order } = props;
  const [fee, setFee] = useState(13500);
  return (
    <View style={styles.container}>
      <Box mb={25} borderBottomWidth={0.3} borderBottomColor="#8c8c8c" />
      <View>
        <Text mb={2} fontFamily={FONT.BOLD} fontSize={18} color={"#8c8c8c"}>
          MÓN ĂN
        </Text>
        {order.itemList.map((item, index) => {
          return (
            <View key={index}>
              <FoodOrderItem item={item} />
            </View>
          );
        })}
      </View>
      {order.note && order.note !== "" ? (
        <View>
          <Text mt={4}fontFamily={FONT.BOLD}  color={"#696969"}>Ghi chú: <Text color={"#8c8c8c"} fontFamily={FONT.MEDIUM} >{order.note}</Text></Text>
        </View>
      ) : null}
      <Box
        mb={25}
        mt={15}
        borderBottomWidth={0.3}
        borderBottomColor="#8c8c8c"
      />
      <Flex flexDirection="row">
        <Text fontFamily={FONT.MEDIUM} fontSize={17}>
          Tổng đơn hàng:{" "}
        </Text>
        <Spacer />
        <Text fontFamily={FONT.SEMI} fontSize={17}>
          {convertPrice(order.totalPrice)} đ
        </Text>
      </Flex>
      <Flex flexDirection="row">
        <Text fontFamily={FONT.MEDIUM} fontSize={17}>
          Phí giao hàng:{" "}
        </Text>
        <Spacer />
        <Text fontFamily={FONT.SEMI} fontSize={17}>
          {convertPrice(fee)}đ
        </Text>
      </Flex>
      <Flex flexDirection="row">
        <Text fontFamily={FONT.MEDIUM} fontSize={17}>
          Tổng tiền:{" "}
        </Text>
        <Spacer />
        <Text fontFamily={FONT.BOLD} fontSize={22} color={THEME_COLOR}>
          {convertPrice(order.totalPrice + fee)} đ
        </Text>
      </Flex>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
export default MyOrderItem;
