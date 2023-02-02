import axios from "axios";
export const getRestaurant = () => {
    return (dispatch) => {
      axios
        .get(
          "http://tfsapiv1-env.eba-aagv3rp5.ap-southeast-1.elasticbeanstalk.com/api/restaurants"
        )
        .then((result) => {
          dispatch({ type: "SET_RESTAURANT", payload: result.data });
        });
    };
  };
