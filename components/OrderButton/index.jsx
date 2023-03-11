
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FONT } from "../../Utils/themeFont";
import { THEME_COLOR } from "../../Utils/themeColor";
const OrderButton = (props) => {
  const { buttonHandler, bgColor, buttonText } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={[styles.buttonStyle, {backgroundColor: bgColor}]}
      activeOpacity={0.8}
      onPress={buttonHandler}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
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
export default OrderButton;
