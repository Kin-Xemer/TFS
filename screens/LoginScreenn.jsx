import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import LoginScreen from "react-native-login-screen";
import axios from "axios"
const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
const LoginScreenn = (props) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: "white",
      }}
    >
      <LoginScreen
        haveAccountText="Quên mật khẩu?"
        loginButtonStyle={{ backgroundColor: "#02b2b9" }}
        style={{ marginTop: 100, backgroundColor: "white" }}
        logoImageStyle={{
          height: 65,
          width: 65,
          marginBottom: 50,
          marginLeft: 4,
        }}
        //logoImageSource={require("../assets/logoshadow.png")}
        onLoginPress={() => {
          navigation.navigate("MoreScreen", { isLogin: true });
        }}
        onHaveAccountPress={() => {}}
        onEmailChange={(email) => {}}
        onPasswordChange={(password) => {}}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("MoreScreen", { isLogin: false });
        }}
      >
        <View style={styles.loginButtonStyle}>
          <Text style={styles.loginTextStyle}>Bỏ qua đăng nhập</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  loginButtonStyle: {
    marginBottom: 20,
    height: 40,
    width: ScreenWidth * 0.6,
    backgroundColor: "#e9eef4",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 32,
    elevation: 5,
    shadowRadius: 8,
    shadowOpacity: 0.3,
    shadowColor: "#166080",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  loginTextStyle: {
    color: "#02b2b9",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default LoginScreenn;
