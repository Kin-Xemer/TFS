import { useRoute, useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,

  ScrollView,

} from "react-native";
import Home from "../components/Home/index.jsx";
const HomeScreen = (props) => {
  const navigation = useNavigation();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Home />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    backgroundColor: "white",
  },
  textStyle: {
    fontFamily: "Quicksand-Regular",
  },
  textHeader: {
    fontSize: 30,
  },
});
export default HomeScreen;
