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
import { Lock, Mobile, User } from "iconsax-react-native";
const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
const BORDER_RADIUS = 30;
const HEIGHT = 58;
const COLOR = "#FFDB89";
const RegisterScreen = () => {
  const [show, setShow] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userFocus, setuserFocus] = useState(true);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const inputUserRef = useRef();
  const passwordRef = useRef();
  const navigation = useNavigation();
  const handleChangeUsername = (e) => {
    setUserName(e);
  };
  const handleChangePassword = (e) => {
    setPassword(e);
  };
  return (
    <View style={styles.container}>
      <Stack space={4} w="100%" alignItems="center">
        <Input
          type=""
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
            handleChangeUsername(e);
          }}
        />
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
            handleChangePassword(e);
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
            handleLogin();
            console.log(username + "" + password);
          }}
          bg={COLOR}
          borderRadius={BORDER_RADIUS}
        >
          <Text style={{ fontFamily: FONT.BOLD, fontSize: 20, color: "white" }}>
            ĐĂNG NHẬP
          </Text>
        </Button>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RegisterScreen");
          }}
        >
          <View>
            <Text>I'm a new user</Text>
          </View>
        </TouchableOpacity>
      </Stack>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingTop: 50,
    backgroundColor:"white",
    flex: 1,
    paddingHorizontal: 16,
  },
});
export default RegisterScreen;
