import { useRoute, useNavigation,useIsFocused } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { Provider } from "@ant-design/react-native";
import { useState, useMemo } from "react";
import Home from "../components/Home/index.jsx";
const HomeScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused()
  const [loginStatus, setLoginStatus] = useState();
  return (
    <View style={styles.container}>
  
        <Home isFocused={isFocused} />
      
    </View>
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
