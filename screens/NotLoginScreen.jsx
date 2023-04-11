import {
    useRoute,
    useNavigation,
    useIsFocused,
  } from "@react-navigation/native";
  import { View, StyleSheet, TouchableOpacity,Linking } from "react-native";
  import { useState, useMemo, useEffect } from "react";
  import Home from "../components/Home/index.jsx";
  import { Box, Button, Text } from "native-base";
const NotLoginScreen = () => {
    return (
      <View>
        <Text>Đăng nhập để tiếp tục nha mn</Text>
      </View>  
    );
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "red",
      alignItems:"center",
      justifyContent: "center",
      height:"100%",
    },
  });
export default NotLoginScreen;