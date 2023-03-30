import { Flex } from "native-base";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const RatingBar = (props) => {
  const { number, progress } = props;
  return (
    <Flex
      direction="row"
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <View style={{ paddingTop: 1 }}>
        <Text style={[styles.textStyle, { fontSize: 20 }]}>{number} </Text>
      </View>
      <AntDesign name="star" size={20} color="gold" />
      <View style={{ marginLeft: 4 }}>
        <Progress.Bar
          progress={progress}
 
          height={10}
          borderRadius={100}
          borderWidth={0}
          unfilledColor="#D9D9D9"
          color="gold"
        />
      </View>
    </Flex>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "Quicksand-Bold",
    fontSize: 14,
  },
});
export default RatingBar;
