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
        user: payload,
      };
    default:
      return state;
  }
}
export default loginReducer;
