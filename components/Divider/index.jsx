import { Flex, Spacer } from "native-base";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { SearchNormal1, ArrowDown2 } from "iconsax-react-native";
import { Entypo } from "@expo/vector-icons";
import { Divider } from "native-base";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const DividerBar = (props) => {
  return (
    <View style={styles.container}>
      <Divider  thickness={5}  bg="muted.200"/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: screenWidth
  },
  textStyle: {
    fontFamily: "Quicksand-Regular",
    fontSize: 12,
  },
  addressText: {
    fontFamily: "Quicksand-Bold",
    marginLeft: 2,
  },
  textInputContainer: {
    paddingLeft: 16,
    borderWidth: 0.5,
    borderColor: "#AFACAC",
    alignItems: "center",
    borderRadius: 30,
    width: "100%",
  },
});
export default DividerBar;
