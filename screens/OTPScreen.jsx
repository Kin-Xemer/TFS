import { useRoute } from "@react-navigation/native";
import { Button } from "native-base";
import { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import { THEME_COLOR } from "../Utils/themeColor";
import { FONT } from "../Utils/themeFont";
const BORDER_RADIUS = 30;
const HEIGHT = 58;
const COLOR = "#FFDB89";
const OTPScreen = () => {
  const route = useRoute();
  const { otp } = route.params;

  const setText = (value) => {
    console.log(value);
  };
  const handleCheckOtp = () => {
    
  }

  return (
    <View style={styles.container}>
      <OTPTextInput
        tintColor={THEME_COLOR}
        inputCount={6}
        textInputStyle={{ fontFamily: FONT.BOLD }}
        handleTextChange={(value) => {
          setText(value);
        }}
      />

      <Button
        _pressed={{
          backgroundColor: "red",
        }}
        h={HEIGHT}
        w="100%"
        py="3"
        onPress={() => {
          handleCheckOtp();
          // console.log(username + "" + password);
        }}
        mt={10}
        bg={COLOR}
        borderRadius={BORDER_RADIUS}
      >
        <Text style={{ fontFamily: FONT.BOLD, fontSize: 20, color: "white" }}>
          ĐĂNG NHẬP
        </Text>
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
});
export default OTPScreen;
