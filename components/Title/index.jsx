import { Flex, Spacer } from "native-base";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { ArrowRight2 } from "iconsax-react-native";
import Icon from 'react-native-vector-icons/Entypo';
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Title = (props) => {
  const { textTitle } = props;
  return (
    <Flex direction="row" style={styles.container}>
      <Text style={styles.textStyle}>{textTitle}</Text>
      <Spacer />
      <Flex direction="row">
        <Text style={[styles.textStyle, styles.moreText]}>Xem thêm</Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: -2,
          }}
        >
          <Icon name="chevron-right" size={16} color="#d83a3a" />
        </View>
      </Flex>
    </Flex>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    marginBottom: 4,
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 16,
  },
  textStyle: {
    fontFamily: "Quicksand-Bold",
    fontSize: 20,
  },
  addressText: {
    fontFamily: "Quicksand-Bold",
    marginLeft: 2,
  },
  textInputContainer: {
    paddingLeft: 16,
    borderWidth: 0.5,
    borderColor: "#AFACAC",
    alignItems: "center",
    borderRadius: 30,
    width: "100%",
  },
  moreText: {
    fontSize: 12,
    color: "#d83a3a",
    //textDecorationLine: true,
  },
});
export default Title;
