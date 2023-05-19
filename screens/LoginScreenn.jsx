import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import BottomSheet from "@gorhom/bottom-sheet";
import LoginForm from "../components/LoginForm/LoginForm";
import { THEME_COLOR } from "../Utils/themeColor";
import { ArrowLeft, Home2 } from "iconsax-react-native";
import { FONT } from "../Utils/themeFont";
const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
const LoginScreenn = (props) => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(1);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["85%", "92%"], []);
  const handleSheetChanges = useCallback((index) => {
    setIndex(index);
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home")
        }}
        style={{flexDirection:"row", marginLeft: 4, alignItems:"flex-start"}}
      >
        <ArrowLeft color="white" size={23} />
        <Text style={{fontFamily:FONT.BOLD, color: "white", fontSize: 18, marginLeft:4 }}>Trang chủ</Text>
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
        backgroundStyle={{
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}
      >
        <LoginForm />
        
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: THEME_COLOR,
  },
});
export default LoginScreenn;
