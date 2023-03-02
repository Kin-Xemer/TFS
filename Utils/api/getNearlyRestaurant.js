import { GOOGLE_MAPS_APIKEY } from "../getGoogleAPI";
import axios from "axios";
import { BASE_URL } from "../../services/baseURL";
export const getNearlyRestaurant = (stringAddress, dispatch) => {
  axios.get(BASE_URL + "/restaurants").then((response) => {
    let activeResaurants = response.data.filter((item) => item.status === true)
    let url =
      "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" +
      stringAddress +
      "&destinations=" +
      activeResaurants
        .map((item, index) => {
          return `${item.restaurantLocation}`;
        })
        .join("|") +
      "&key=" +
      GOOGLE_MAPS_APIKEY;
    axios
      .get(url)
      .then((res) => {
        let arr = res.data.rows[0].elements.map((item) => {
          return item.distance.value;
        });
        let min = Math.min(...arr);
        let index = arr.indexOf(min);
        let nearlyObject = response.data[index];
        dispatch({ type: "SET_NEARLY_RESTAURANT", payload: nearlyObject });
      })
      .catch((err) => {
        console.log("err getNearly", err);
      });
  }).catch((err) => {
    console.log("get resstaurant", err)
  });
};
