import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaViewBase,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  Input,
  Flex,
  Spacer,
  Image,
  Icon,
  Pressable,
  Stack,
} from "native-base";
import axios from "axios";
import { Provider, Toast } from "@ant-design/react-native";
import { SafeAreaView } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { FONT } from "../Utils/themeFont";
import { MaterialIcons } from "@expo/vector-icons";
import { Lock, Mobile, ProfileCircle, User } from "iconsax-react-native";
import { THEME_COLOR } from "../Utils/themeColor";
import { BASE_URL } from "../services/baseURL";
import { validatePhone } from "../Utils/regexPhoneNum";
import TopBar from "../components/TopBar";
const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
const BORDER_RADIUS = 30;
const HEIGHT = 58;
const COLOR = "#FFDB89";
const RegisterScreen = () => {
  const [show, setShow] = useState(false);
  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState(0);
  const [error, setError] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmErr, setConfirmErr] = useState("");
  const [isDone, setIsDone] = useState(true);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const inputUserRef = useRef();
  const inputNameRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const navigation = useNavigation();
  useEffect(() => {
    inputUserRef.current.focus();
  }, []);
  const handleChangePhone = (e) => {
    setPhone(e);
  };
  const handleChangePassword = (e) => {
    setPassword(e);
  };
  const handelOnFocus = (e) => {
    setError("");
    setPasswordErr("");
    setConfirmErr("");
    setNameErr("");
  };
  const checkExistUser = (phoneInput) => {
    axios
      .get(BASE_URL + "/customers/checkByPhoneNumber/" + phone)
      .then((response) => {
        if (response.data.status === "found") {
          setError("Số điện thoại đã được sử dụng");
        } else if (response.data.status === "notfound") {
          axios({
            method: "post",
            url: BASE_URL + "/sms/registerOTP",
            headers: { "Content-Type": "application/json" },
            data: phoneInput,
          })
            .then((response) => {
              navigation.navigate("OTPScreen", {
                otp: response.data,
                phone: phone,
                password: password,
                name: name,
              });
            })
            .catch((error) => {
              alert("Đã có lỗi xảy ra, xin vui lòng thử lại sau");
              console.log(error.response.data);
            });
          console.log("só dien thoai chưa đc sử dụng");
        }
      })
      .catch((error) => {
        alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
        console.log("Error check exist user", error.response.data);
      });
  };
  const validatePassword = (password) => {
    if (password.length === 0) {
      setPasswordErr("Mật khẩu không được để trống");
      return false;
    } else if (password.length < 6) {
      setPasswordErr("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    } else {
      return true;
    }
  };
  const validateConfirm = () => {
    if (confirm !== password) {
      setConfirmErr("Nhập lại mật khẩu không đúng");
      return false;
    } else {
      return true;
    }
  };

  const validateFullName = (name) => {
    const nameRegex = /^[\p{L}\s]{2,30}(?:[\s]+[\p{L}\s]+)*$/u;
    console.log("nameRegex.test(name)",nameRegex.test(name))
    const nameArray = name.split(" ");
    const check =
      nameRegex.test(name) 
    if (!check) {
      setNameErr("Tên phải ít nhất 2 ký tự và không có ký tự đặc biệt ")
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = () => {
    setIsDone(false);
    inputUserRef.current.blur();
    passwordRef.current.blur();
    confirmRef.current.blur();
    inputNameRef.current.blur();
    let phoneInput = {
      phoneNumber: phone,
    };
    validateFullName(name)
    validateConfirm();
    validatePassword(password) ? setPasswordErr("") : setIsDone(true);
    if (phone.length > 0) {
      validatePhone(phone)
        ? setError("")
        : setError("Số điện thoại không đúng");
      setIsDone(true);
    } else {
      setError("Số điện thoại không được để trống");
    }
    validateConfirm() &&
    validatePassword(password) &&
    validatePhone(phone) &&
    validateFullName(name)
      ? checkExistUser(phoneInput)
      : null;
    // navigation.navigate("OTPScreen")
  };
  return (
    <View style={styles.container}>
      <TopBar
        title="ĐĂNG KÝ"
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}
      />
      <Stack space={4} w="100%" alignItems="center" mt={ScreenWidth / 2}>
        {error ? (
          <View>
            <Text style={{ fontFamily: FONT.MEDIUM, color: "red" }}>
              {error}
            </Text>
          </View>
        ) : (
          <></>
        )}
        <Input
          keyboardType="phone-pad"
          maxLength={10}
          fontFamily={FONT.MEDIUM}
          fontSize={15}
          ref={inputUserRef}
          backgroundColor={"#ffff"}
          focusOutlineColor={COLOR}
          borderRadius={BORDER_RADIUS}
          borderWidth="1.5"
          h={HEIGHT}
          InputLeftElement={<Icon as={<Mobile size="24" />} ml="4" />}
          placeholder="Số điện thoại"
          onChangeText={(e) => {
            handleChangePhone(e);
          }}
          onFocus={() => {
            handelOnFocus(  )
          }}
        />
        {nameErr ? (
          <View>
            <Text style={{ fontFamily: FONT.MEDIUM, color: "red" }}>
              {nameErr}
            </Text>
          </View>
        ) : (
          <></>
        )}
        <Input
          fontFamily={FONT.MEDIUM}
          fontSize={15}
          ref={inputNameRef}
          backgroundColor={"#ffff"}
          focusOutlineColor={COLOR}
          borderRadius={BORDER_RADIUS}
          borderWidth="1.5"
          h={HEIGHT}
          InputLeftElement={<Icon as={<ProfileCircle size="24" />} ml="4" />}
          placeholder="Họ và tên"
          onChangeText={(e) => {
            setName(e);
          }}
          onFocus={() => {
            handelOnFocus(  )
          }}
        />
        {/* pasword error */}
        {passwordErr ? (
          <View>
            <Text style={{ fontFamily: FONT.MEDIUM, color: "red" }}>
              {passwordErr}
            </Text>
          </View>
        ) : (
          <></>
        )}
        <Input
          ref={passwordRef}
          fontFamily={FONT.MEDIUM}
          fontSize={15}
          backgroundColor={"#ffff"}
          focusOutlineColor={COLOR}
          borderRadius={BORDER_RADIUS}
          borderWidth="1.5"
          h={HEIGHT}
          type={show ? "text" : "password"}
          onFocus={() => {
            handelOnFocus(  )
          }}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                mr="4"
                color="muted.400"
              />
            </Pressable>
          }
          InputLeftElement={<Icon as={<Lock size="23" />} ml="4" />}
          placeholder="Mật khẩu"
          onChangeText={(e) => {
            setPassword(e);
          }}
        />
        {confirmErr ? (
          <View>
            <Text style={{ fontFamily: FONT.MEDIUM, color: "red" }}>
              {confirmErr}
            </Text>
          </View>
        ) : (
          <></>
        )}
        <Input
          ref={confirmRef}
          fontFamily={FONT.MEDIUM}
          fontSize={15}
          backgroundColor={"#ffff"}
          focusOutlineColor={COLOR}
          borderRadius={BORDER_RADIUS}
          borderWidth="1.5"
          h={HEIGHT}
          type={show ? "text" : "password"}
          onFocus={() => {
            handelOnFocus(  )
          }}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                mr="4"
                color="muted.400"
              />
            </Pressable>
          }
          InputLeftElement={<Icon as={<Lock size="23" />} ml="4" />}
          placeholder="Nhập lại mật khẩu"
          onChangeText={(e) => {
            setConfirm(e);
          }}
        />
        <TouchableOpacity
          style={{
            width: "100%",
            paddingHorizontal: 30,
            borderRadius: BORDER_RADIUS,
            backgroundColor: COLOR,
            alignItems: "center",
            justifyContent: "center",
            height: HEIGHT,
          }}
          onPress={() => {
            handleSubmit();
            // console.log(username + "" + password);
          }}
          activeOpacity={0.7}
        >
          <Text style={{ fontFamily: FONT.BOLD, fontSize: 20, color: "white" }}>
            Tiếp tục
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LoginScreenn");
          }}
        >
          <View>
            <Text style={{ fontFamily: FONT.REGULAR }}>
              Bạn đã có tài khoản?{"   "}
              <Text style={{ fontFamily: FONT.REGULAR, color: THEME_COLOR }}>
                Đăng nhập
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      </Stack>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 16,
  },
  input: {
    height: HEIGHT,
  },
});
export default RegisterScreen;
