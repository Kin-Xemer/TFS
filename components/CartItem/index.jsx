import { Flex } from "native-base";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FONT } from "../../Utils/themeFont";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const CartItem = (props) => {
  const { item, quantity } = props;
  return (
    <View direction="row" style={styles.container}>
      <View style={styles.itemView}>
        <View>
            <Text>C</Text>
        </View>
      </View>
      <AntDesign name="star" size={20} color="gold" />
      <View style={{ marginLeft: 4 }}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontFamily: FONT.BOLD,
    fontSize: 14,
  },
  itemView: {
    width: screenWidth,
    height: 100,
  },
});
export default CartItem;
