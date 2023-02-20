import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

import StepIndicator from "react-native-step-indicator-v2";
import { FONT } from "../../Utils/themeFont";
import { customStyles } from "../../services/customStepIndicator";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const StepProgess = (props) => {
  const { status} = props;
  const [currentPosition, setCurrentPosition] = useState(0);
  useEffect(() => {
    if (status === "accept") {
        setCurrentPosition(1);
    } else if (status === "delivery"){
        setCurrentPosition(2);
    }else if (status === "done"){
        setCurrentPosition(4);
    }
  },[])
  const labels = [
    "Xác nhận",
    "Đang chuẩn bị món",
    "Đang giao hàng ",
    "Nhận hàng",
  ];
  const label = labels.map((item) => {
    return <Text style={{ fontFamily: FONT.MEDIUM }}>{item}</Text>;
  });

  return (
   <View style={{marginTop: 60, marginBottom: 30}}>
     <StepIndicator
      customStyles={customStyles}
      currentPosition={currentPosition}
      labels={label}
      stepCount={4}
    />
   </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  singleStep: { alignItems: "center" },
  singleTxt: { marginTop: 10 },
});
export default StepProgess;
