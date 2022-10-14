import { useRoute, useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";
import QuickSandText from "../styles/styledText";
import Home from "../components/Home/index.jsx"
const HomeScreen = (props) => {
  const navigation = useNavigation();
  return (
      <View style={styles.container}>
       <Home/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: "white",
  },
textStyle:{
  fontFamily :"Quicksand-Regular",
},
textHeader:{
  fontSize: 30
}
});
export default HomeScreen;
