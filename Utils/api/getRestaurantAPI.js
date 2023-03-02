import axios from "axios";
import { BASE_URL } from "../../services/baseURL";
export const getRestaurant = () => {
    return (dispatch) => {
      axios
        .get(
          BASE_URL +"/restaurants"
        )
        .then((result) => {
          dispatch({ type: "SET_RESTAURANT", payload: result.data });
        });
    };
  };
