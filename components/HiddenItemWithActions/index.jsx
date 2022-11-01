
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { Trash } from "iconsax-react-native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const BORDER_RADIUS = 15;
const ITEM_MARGIN_BOTTOM = 10;
const ITEM_MARGIN_HORIZONTAL = 16;
const HiddenItemWithActions = (props) => {
  const { swipeAnimatedValue, onDelete } = props;
  return (
    <View style={[styles.rowBack]}>
      <View style={styles.buttonDelete}>
        <TouchableOpacity
          style={[styles.buttonDelete]}
          onPress={onDelete}
          activeOpacity={0.7}
        >
          <Animated.View
            style={[
              styles.trash,
              {
                transform: [
                  {
                    scale: swipeAnimatedValue.interpolate({
                      inputRange: [-screenWidth * 0.25 + 12, 1.2],
                      outputRange: [1.2, 0],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              },
            ]}
          >
            <Trash name="trash-can-outline" size={24} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  rowBack: {
    marginHorizontal: ITEM_MARGIN_HORIZONTAL,
    backgroundColor: "red",
    width: screenWidth - 36,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginBottom: ITEM_MARGIN_BOTTOM,
    borderRadius: BORDER_RADIUS,
    borderLeftColor: "#FFF",
  },

  buttonDelete: {
    backgroundColor: "red",
    borderRadius: BORDER_RADIUS,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "25%",
  },
  trash: {
    height: 30,
    width: 30,
  },
});
export default HiddenItemWithActions;
