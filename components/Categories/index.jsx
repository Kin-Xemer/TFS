import { View, StyleSheet, Text, Dimensions } from "react-native";
import { SearchNormal1, ArrowDown2 } from "iconsax-react-native";
import { Entypo } from "@expo/vector-icons";
import { Flex, Image, Spacer } from "native-base";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const Categories = (props) => {
  return (
    <Flex direction="row" style={styles.container}>
      <Flex style={styles.iconCateContainer}>
        <Image
          source={require("../../assets/monchinh.png")}
          alt="Mon ăn"
          width="100px"
          height="100px"
          borderRadius={10}
        />
        <Text style={[styles.textStyle, styles.titleText]}>Món ăn</Text>
      </Flex>
      <Spacer/>
      <Flex style={styles.iconCateContainer}>
        <Image
          source={require("../../assets/banan.png")}
          alt="Bàn tiệc"
          width="100px"
          height="100px"
          borderRadius={10}
        />
        <Text style={[styles.textStyle, styles.titleText]}>Bàn tiệc</Text>
      </Flex>
      <Spacer/>
      <Flex style={styles.iconCateContainer}>
        <Image
          source={require("../../assets/combo.png")}
          alt="Combo món"
          width="100px"
          height="100px"
          borderRadius={10}
        />
        <Text style={[styles.textStyle, styles.titleText]}>Combo món</Text>
      </Flex>
    </Flex>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    backgroundColor: "white",
    width: "100%",
  },
  textStyle: {
    fontFamily: "Quicksand-Regular",
    fontSize: 12,
  },
  titleText: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 14,
  },
  iconCateContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Categories;
