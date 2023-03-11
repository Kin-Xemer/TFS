import axios from "axios";
import { BASE_URL } from "../../services/baseURL";
export const getRestaurant = () => {
    return (dispatch) => {
      axios
        .get(
          BASE_URL +"/restaurants"
        )
        .then((result) => {
          let restaurantActive = result.data.filter((item) => {
            if (item.status === true) {
              return item
            }
          })
          dispatch({ type: "SET_RESTAURANT", payload: restaurantActive });
        });
    };
  };
