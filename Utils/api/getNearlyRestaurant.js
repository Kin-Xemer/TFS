import { GOOGLE_MAPS_APIKEY } from "../getGoogleAPI";
import axios from "axios";
import { BASE_URL } from "../../services/baseURL";
export const getNearlyRestaurant = (stringAddress, dispatch) => {
  axios
    .get(BASE_URL + "/restaurants")
    .then((response) => {
      let activeResaurants = response.data.filter(
        (item) => item.status === true
      );
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
          console.log("Status google distance: " + res.data.status);
          let arr = res.data.rows[0].elements
            .filter((item) => item.status === "OK")
            .map((item) => {
              return item.distance.value;
            });
          let min = Math.min(...arr);
          console.log(min);
          let index = arr.indexOf(min);
          let nearlyObject = activeResaurants[index];

          console.log(
            "min:",
            min + " index:",
            index + " near:",
            nearlyObject.restaurantName
          );
          dispatch({ type: "SET_NEARLY_RESTAURANT", payload: nearlyObject });
        })
        .catch((err) => {
          alert("Đã có lỗi xảy ra, vui lòng thử lại sau");
          console.log("Error get nearly: ", err);
        });
    })
    .catch((err) => {
      console.log("get resstaurant", err);
    });
};
