import axios from "axios";
import { BASE_URL } from "../services/baseURL";
export const fetchData = () => {
    return (dispatch) => {
      axios
        .get(
          BASE_URL +"/foods"
        )
        .then((result) => {
          let foodActive = result.data.filter((food) => food.status === true)
          let foodActiveTypeFood = foodActive.filter((food) => food.type === false)
          dispatch({ type: "GET_ALL_FOOD", payload: foodActiveTypeFood})
        });
    };
  };
