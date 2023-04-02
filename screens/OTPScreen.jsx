import { useRoute } from "@react-navigation/native";
import { Button } from "native-base";
import { useRef, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import AlertPopup from "../components/AlertPopup";
import { THEME_COLOR } from "../Utils/themeColor";
import { FONT } from "../Utils/themeFont";
const BORDER_RADIUS = 30;
const HEIGHT = 58;
const COLOR = "#FFDB89";
const OTPScreen = () => {
  const route = useRoute();
  const [textOTP, setTextOTP] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState("");
  const { otp, phone,password } = route.params;
  const inputRef = useRef(null);
  const setText = (value) => {
    setTextOTP(value);
  };
  useEffect(() => {
    inputRef.current.setValue("");
    console.log(otp);
  }, []);
  const handleCheckOtp = () => {
    inputRef.current.clear();
    console.log(textOTP.toString())
    if (otp.otp === textOTP.toString()) {
      const cus = {
        address: "",
        avatarURL: "",
        customerName: "",
        email: "",
        theAccount: {
          accountId: phone,
          password: password,
          phoneNumber: "string",
          roleId: 5,
          status: true,
        },
      };
      console.log(cus)
    } else {
      setIsOpen(true);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontFamily: FONT.MEDIUM, fontSize: 16 }}>
          Mã xác thực đã gửi qua số điện thoại của bạn
        </Text>
      </View>
      <OTPTextInput
        ref={inputRef}
        tintColor={THEME_COLOR}
        inputCount={6}
        textInputStyle={{ fontFamily: FONT.BOLD }}
        handleTextChange={(value) => {
          setTextOTP(value);
        }}
      />

      <TouchableOpacity
        style={{
          width: "100%",
          paddingHorizontal: 30,
          borderRadius: BORDER_RADIUS,
          backgroundColor: textOTP.length === 6 ? COLOR : "#d9d9d9",
          alignItems: "center",
          justifyContent: "center",
          height: HEIGHT,
          marginTop: 30,
        }}
        disabled={textOTP.length === 6 ? false : true}
        onPress={() => {
          handleCheckOtp();
          // console.log(username + "" + password);
        }}
        activeOpacity={0.7}
      >
        <Text style={{ fontFamily: FONT.BOLD, fontSize: 20, color: "white" }}>
          Tiếp tục
        </Text>
      </TouchableOpacity>

      <AlertPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Lỗi"
        content="Sai mã xác thực, vui lòng thử lái sau"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: "80%",
    backgroundColor: "white",
  },
});
export default OTPScreen;
