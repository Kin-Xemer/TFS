
import {
    useRoute,
    useNavigation,
    useIsFocused,
  } from "@react-navigation/native";
  import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
  import { Provider } from "@ant-design/react-native";
  import { Entypo } from "@expo/vector-icons";
  import { useSelector, useDispatch } from "react-redux";
  import axios from "axios";
  import { useState, useMemo, useEffect } from "react";
  import { Box, Button, Flex } from "native-base";
  import { FONT } from "../../Utils/themeFont";
  import { convertDate } from "../../Utils/convertDate";
const OrderButton = (props) => {
    const {buttonHandler, bgColor, buttonText} = props;
    return (
        <View style={styles.container}>
            <Button backgroundColor={bgColor} borderRadius={15} p={4} onPress={buttonHandler}>
                <Text>{buttonText}</Text>
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        marginBottom: 50
    }
})
export default OrderButton;