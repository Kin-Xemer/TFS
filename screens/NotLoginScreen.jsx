import {
    useRoute,
    useNavigation,
    useIsFocused,
  } from "@react-navigation/native";
  import { View, StyleSheet, TouchableOpacity,Linking } from "react-native";
  import { useState, useMemo, useEffect } from "react";
  import Home from "../components/Home/index.jsx";
  import { Box, Button, Text } from "native-base";
import { FONT } from "../Utils/themeFont.js";
import ActionButton from "../components/ActionButton/index.jsx";
const NotLoginScreen = () => {
  const navigation = useNavigation()
    return (
      <View style={styles.container}>
        <Text style={{fontFamily:FONT.BOLD, marginBottom: 20, fontSize: 20}}>Đăng nhập để tiếp tục</Text>
        <ActionButton
        buttonText="Đăng nhập"
        onPress={()=>{
          navigation.navigate("LoginScreenn")
        }}
        />
      </View>  
    );
}
const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingTop: 200,
      backgroundColor:"white"
    },
  });
export default NotLoginScreen;