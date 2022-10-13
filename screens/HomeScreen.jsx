import { useRoute, useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";
import QuickSandText from "../styles/styledText";

const HomeScreen = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.homeScreen}>
      <Text style={styles.textStyle}>this is Home screen  </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
textStyle:{
  fontFamily :"Quicksand-Bold",
}
});
export default HomeScreen;
