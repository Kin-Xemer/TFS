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
const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
const LoginScreenn = (props) => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(1);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["85%", "93%"], []);
  const handleSheetChanges = useCallback((index) => {
    setIndex(index);
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home")
        }}
      >
        <View>
          <Text style={{color: "white", fontSize: 15}}>Trang chủ</Text>
        </View>
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
    paddingTop: 50,
    flex: 1,
    backgroundColor: THEME_COLOR,
  },
});
export default LoginScreenn;
