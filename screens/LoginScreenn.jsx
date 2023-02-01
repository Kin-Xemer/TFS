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
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Input } from "native-base";
import axios from "axios";
import { Provider, Toast } from "@ant-design/react-native";
const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
const LoginScreenn = (props) => {
  const navigation = useNavigation();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [msgError, setMsgErr] = useState("");
  const [cart, setCart] = useState({});
  const dispatch = useDispatch();
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
          } catch (e) {
            console.log(e);
          }
        };
        if (response.data.status === "400") {
          setMsgErr(response.data.message);
        } else {
          navigation.navigate("HomeScreen");
          saveData();
          //dispatch({ type: "SET_LOGIN_STATUS", payload: true });
        }
      })
      .catch(function (error) {
        Toast.fail(
          "Tài khoản hoặc mật khẩu không đúng, xin vui lòng thử lại",
          1
        );
      });
    // dispatch({ type: "HANDLE_LOGIN", username, password });
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text>{msgError}</Text>
        <Input
          variant="rounded"
          placeholder="Round"
          onChangeText={(e) => {
            handleChangeUsername(e);
          }}
        />
        <Input
          variant="rounded"
          placeholder="Round"
          onChangeText={(e) => {
            handleChangePassword(e);
          }}
          type="password"
        />
        <Button
          onPress={() => {
            handleLogin(username, password);
          }}
        >
          Login
        </Button>
        <Button
          onPress={() => {
            navigation.navigate("HomeScreen")
          }}
        >
          Go home
        </Button>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default LoginScreenn;
