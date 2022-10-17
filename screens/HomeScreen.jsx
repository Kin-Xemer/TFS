import { useRoute, useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import QuickSandText from "../styles/styledText";
import Home from "../components/Home/index.jsx";
import SearchBar from "../components/SearchBar";
const HomeScreen = (props) => {
  const navigation = useNavigation();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      stickyHeaderIndices={[1]}
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
