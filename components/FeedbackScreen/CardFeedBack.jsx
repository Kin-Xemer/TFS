import { useState } from "react";
import { View } from "react-native";
import StarRating from "react-native-star-rating-widget";
const CardFeedBack = (props) => {
  const { item } = props;
  const [rating, setRating] = useState(0);
  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  };
  return (
    <View>
      <StarRating
        rating={rating}
        onChange={setRating}
        enableSwiping={false}
        enableHalfStar={false}
        starStyle={{
          borderRadius: 14,
          marginHorizontal: 12,
        }}
      />
    </View>
  );
};

export default CardFeedBack;
