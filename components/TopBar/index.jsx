import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text } from "native-base";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { THEME_COLOR } from "../../Utils/themeColor";
import { FONT } from "../../Utils/themeFont";

const TopBar = (props) => {
  const { title, onPress } = props;
  const navigation = useNavigation();
  return (
    
    <View>
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: FONT.BOLD,
            fontSize: 20,
            paddingTop: 5,
            color: THEME_COLOR,
          }}
        >
          {title}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.backButton}
        onPress={()=>{
          if (navigation.canGoBack()) {
            if (navigation.canGoBack()) {
          navigation.goBack();
        }
          }
        }}
      >
        <Entypo name="chevron-left" size={38} color={THEME_COLOR} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  backButton: {
    marginTop: 35,
    position: "absolute",
   marginLeft: -10,
  },
});
export default TopBar;
