import axios from "axios";

export const getAllFood = () => {
  axios
    .get(
      "http://tfsapiv1-env.eba-aagv3rp5.ap-southeast-1.elasticbeanstalk.com/api/foods"
    )
    .then((response) => {
      return(response.data);
    })
    .catch((err) => {
      console.log("err", err);
    });
};

