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
import { FONT } from "../../Utils/themeFont";
import ImageLogin from "../ImageLogin/ImageLogin";
import { MaterialIcons } from "@expo/vector-icons";
import { Lock, Mobile, User } from "iconsax-react-native";
const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
const BORDER_RADIUS = 30;
const HEIGHT = 58;
const COLOR = "#FFDB89";
const LoginForm = () => {
  const [show, setShow] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userFocus, setuserFocus] = useState(true);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const inputUserRef = useRef();
  const passwordRef = useRef();
  const navigation = useNavigation();
  const onPressImage = () => {
    console.log("pressed");
  };
  useEffect(() => {
    inputUserRef.current.focus();
  }, []);

  const handleChangeUsername = (e) => {
    setUserName(e);
  };
  const handleChangePassword = (e) => {
    setPassword(e);
  };

  let url =
    "http://tfsapiv1-env.eba-aagv3rp5.ap-southeast-1.elasticbeanstalk.com/api/accountsByUsername/" +
    username +
    "&" +
    password;

  const handleLogin = () => {
    axios({
      method: "post",
      url: url,
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then(function (response) {
        const saveData = async () => {
          try {
            await AsyncStorage.setItem(
              "customer",
              JSON.stringify(response.data)
            );
            await AsyncStorage.setItem(
              "cart",
              JSON.stringify(response.data.cart.cartItems)
            );
          } catch (e) {
            console.log("error from login save storage", e);
          }
        };
        navigation.navigate("HomeScreen");
        saveData();
      })
      .catch(function (error) {
        console.log(error);
        Toast.fail("Sai thông tin đăng nhập, xin vui lòng thử lại", 1);
      });
    // dispatch({ type: "HANDLE_LOGIN", username, password });
  };

  return (
    <Provider>
      <View style={styles.container}>
        <View>
          <Text style={{ fontFamily: FONT.BOLD, fontSize: 28 }}>Đăng Nhập</Text>
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontFamily: FONT.SEMI, fontSize: 18, color: "gray" }}>
            Đăng nhập để tiếp tục!{" "}
          </Text>
        </View>
        <Flex flexDirection={"row"}>
          <ImageLogin
            imageURL={"https://cdn-icons-png.flaticon.com/512/2702/2702602.png"}
          />
          <ImageLogin
            imageURL={"https://cdn-icons-png.flaticon.com/512/145/145802.png"}
          />
          <ImageLogin
            imageURL={"https://cdn-icons-png.flaticon.com/512/3670/3670151.png"}
          />
        </Flex>
        <Stack space={4} w="100%" alignItems="center">
          <Input
           keyboardType="numeric"
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
            <Text
              style={{ fontFamily: FONT.BOLD, fontSize: 20, color: "white" }}
            >
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
    </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginHorizontal: 8,
  },
});
export default LoginForm;
