import { CHECK_LOGIN, SET_LOGIN_STATUS } from "../actions/productAction";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const initState = {
  isLogin: false,
  user: null,
};

function loginReducer(state = initState, action) {
  switch (action.type) {
    case CHECK_LOGIN:
      console.log(action.type);
      return {
        ...state,
        isLogin: true,
      };
    case SET_LOGIN_STATUS:
      console.log(action.type);
      return {
        ...state,
        isLogin: payload,
      };
    case "HANDLE_LOGIN":
      let url =
        "http://tfsapiv1-env.eba-aagv3rp5.ap-southeast-1.elasticbeanstalk.com/api/accountsByUsername/" +
        action.username +
        "&" +
        action.password;
      axios({
        method: "post",
        url: url,
        Accept: "application/json",
        "Content-Type": "application/json",
      })
        .then(function (response) {
          console.log(response.data);
          state.user = response.data
          const saveData = async () => {
            try {
              await AsyncStorage.setItem(
                "accountId",
                response.data.theAccount.accountId
              );
              await AsyncStorage.setItem(
                "password",
                response.data.theAccount.password
              );
              await AsyncStorage.setItem(
                "customerName",
                response.data.customerName
              );
              console.log("Data saved", response.data.theAccount.accountId);
            } catch (e) {
              console.log(e);
            }
          };
          if (response.data.status === "400") {
            setMsgErr(response.data.message);
          } else {
            // navigation.navigate("HomeScreen");
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
      console.log(action.type);
      return {
        ...state,
      };
    default:
      return state;
  }
}
export default loginReducer;
