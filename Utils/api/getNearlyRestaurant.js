import { GOOGLE_MAPS_APIKEY } from '../getGoogleAPI';
import  axios  from 'axios';
export const getNearlyRestaurant = (stringAddress, restaurant, dispatch) =>{
    let url =
      "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" +
      stringAddress +
      "&destinations=" +
      restaurant
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
        let index = (arr.indexOf(min))
        let nearlyObject = restaurant[index]
        dispatch({type:"SET_NEARLY_RESTAURANT", payload: nearlyObject})
      })
      .catch((err) => {
        console.log("err Mapscreen", err);
      });
}