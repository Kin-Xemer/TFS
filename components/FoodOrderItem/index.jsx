import { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import StepIndicator from "react-native-step-indicator-v2";
import { FONT } from "../../Utils/themeFont";
import { customStyles } from "../../services/customStepIndicator";
import { Box, Flex, Image, Spacer, Text } from "native-base";
import { convertPrice } from '../../Utils/convertPrice';
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const FoodOrderItem = (props) => {
  const { item} = props;
  return (
    <View style={styles.container} >
      <Flex flexDirection="row">
        <Text fontFamily={FONT.MEDIUM} fontSize={17}>{item.name} x {item.quantity}</Text>
        <Spacer/>
        <Text fontFamily={FONT.SEMI} fontSize={18}>{convertPrice(item.subTotal)} đ</Text>
      </Flex>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderColor: "#8c8c8c",
    marginVertical: 4,
    borderRadius:15,

  },
});
export default FoodOrderItem;
