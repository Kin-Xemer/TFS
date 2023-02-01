import axios from "axios";
export const fetchData = () => {
    return (dispatch) => {
      axios
        .get(
          "http://tfsapiv1-env.eba-aagv3rp5.ap-southeast-1.elasticbeanstalk.com/api/foods"
        )
        .then((result) => {
          dispatch({ type: "GET_ALL_FOOD", payload: result.data });
        });
    };
  };
