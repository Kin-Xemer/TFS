import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { THEME_COLOR } from "../../Utils/themeColor";
import { useNavigation } from "@react-navigation/native";

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ position: "absolute", marginTop: 35 }}
      onPress={() => {
        if (navigation.canGoBack()) {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }
      }}
      activeOpacity={0.7}
    >
      <Entypo name="chevron-left" size={36} color={THEME_COLOR} />
    </TouchableOpacity>
  );
};

export default BackButton;
