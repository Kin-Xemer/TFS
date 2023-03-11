import axios from "axios";
import { BASE_URL } from "../../services/baseURL";
export const getServices = (dispatch) => {
  axios.get(BASE_URL + "/services").then((result) => {
    let services = result.data.filter((item) => {
      if (item.status === true) {
        return item;
      }
    });
    dispatch({ type: "SET_SERVICE", payload: services });
  });
};
