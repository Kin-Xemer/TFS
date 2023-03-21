import { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import StepIndicator from "react-native-step-indicator-v2";
import { FONT } from "../../Utils/themeFont";
import { customStyles } from "../../services/customStepIndicator";
import { Box, Flex, Spacer, Text } from "native-base";
import FoodOrderItem from "../FoodOrderItem/index";
import { convertPrice } from "../../Utils/convertPrice";
import { THEME_COLOR } from "../../Utils/themeColor";
import PartyOrderDetail from "../PartyOrderDetail";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const MyOrderItem = (props) => {
  const { order } = props;
  const [fee, setFee] = useState(0);
  return (
    <View style={styles.container}>
      <Box mb={2} borderBottomWidth={0.3} borderBottomColor="#8c8c8c" />
      <View style={{ marginBottom: 5 }}>
        <Text fontFamily={FONT.BOLD} fontSize={18} mb={2} color={"#8c8c8c"}>
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

      {order.party ? (
        <View>
          <Box mb={2} borderBottomWidth={0.3} borderBottomColor="#8c8c8c" />
          <Text fontFamily={FONT.BOLD} fontSize={18} mb={2} color={"#8c8c8c"}>
            THỰC ĐƠN BÀN TIỆC
          </Text>
          <PartyOrderDetail party={order.party} />
        </View>
      ) : null}

      {order.serviceList.length > 0 ? (
        <View>
          <Box mb={2} borderBottomWidth={0.3} borderBottomColor="#8c8c8c" />
          <Text fontFamily={FONT.BOLD} fontSize={18} mb={2} color={"#8c8c8c"}>
            DỊCH VỤ
          </Text>
        </View>
      ) : null}
      {order.serviceList.map((item, index) => {
        return (
          <Flex flexDirection={"row"} key={index}>
            <View>
              <Text fontFamily={FONT.BOLD} fontSize={14}>
                {item.serviceName}
              </Text>
            </View>
            <Spacer />
            <Text fontFamily={FONT.SEMI} fontSize={16}>
              {convertPrice(item.servicePrice)} đ
            </Text>
          </Flex>
        );
      })}
      {order.note && order.note !== "" ? (
        <View>
          <Text mt={4} fontFamily={FONT.BOLD} color={"#696969"}>
            Ghi chú:{" "}
            <Text color={"#8c8c8c"} fontFamily={FONT.MEDIUM}>
              {order.note}
            </Text>
          </Text>
        </View>
      ) : null}
      <Box mb={4} mt={15} borderBottomWidth={0.3} borderBottomColor="#8c8c8c" />
      <Flex flexDirection="row">
        <Text fontFamily={FONT.MEDIUM} fontSize={17}>
          Tổng đơn hàng:{" "}
        </Text>
        <Spacer />
        <Text fontFamily={FONT.BOLD} fontSize={17}>
          {convertPrice(order.totalPrice)} đ
        </Text>
      </Flex>
      <Flex flexDirection="row">
        <Text fontFamily={FONT.MEDIUM} fontSize={17}>
          Phí giao hàng:{" "}
        </Text>
        <Spacer />
        <Text fontFamily={FONT.BOLD} fontSize={17}>
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
      <Box mb={4} mt={15} borderBottomWidth={0.3} borderBottomColor="#8c8c8c" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
export default MyOrderItem;
