import {
    Text,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";
import { THEME_COLOR } from "../../Utils/themeColor";
import { FONT } from "../../Utils/themeFont";


const ActionButton = (props) => {
    const {onPress, buttonText} = props
  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      activeOpacity={0.8}
      onPress={() => {
        onPress();
      }}
    >
      <Text style={styles.buttonText}> {buttonText}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 15,
    backgroundColor: THEME_COLOR,
    height: 47,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily:FONT.BOLD,
    fontSize: 18,
    color: "#fff",
  },
});
export default ActionButton;
