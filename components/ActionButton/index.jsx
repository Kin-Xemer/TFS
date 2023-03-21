import {
    Text,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";
import { THEME_COLOR } from "../../Utils/themeColor";
import { FONT } from "../../Utils/themeFont";


const ActionButton = (props) => {
    const {onPress, buttonText, disabled} = props
  return (
    <TouchableOpacity
      style={disabled ? styles.buttonStyleDisable : styles.buttonStyle}
      activeOpacity={0.8}
      onPress={() => {  
        onPress();
      }}
      disabled={disabled ? disabled : false}
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
  buttonStyleDisable: {
    borderRadius: 15,
    backgroundColor: "#ff9d9d",
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
