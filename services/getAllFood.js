import axios from "axios";
import { BASE_URL } from "./baseURL";

export const getAllFood = () => {
  axios
    .get(
      BASE_URL +"/foods"
    )
    .then((response) => {
      return(response.data);
    })
};

