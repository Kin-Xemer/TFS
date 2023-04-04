import axios from "axios";
import { BASE_URL } from "../../services/baseURL";
export const getCustomerById = (dispatch, id) => {
  axios.get(BASE_URL + "/customers/byid/" + id).then((response) => {
    
    dispatch({
        type: "SET_ACCOUNT",
        payload: response.data,
      });
  }).catch((err) => {
    alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
    console.log("Error get customerbyId: ", err.response.data);
  });
};
