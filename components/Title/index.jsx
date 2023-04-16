import { Flex, Spacer } from "native-base";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { ArrowRight2 } from "iconsax-react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { THEME_COLOR } from '../../Utils/themeColor';
import { useRoute, useNavigation } from "@react-navigation/native";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Title = (props) => {
  const { textTitle } = props;
  return (
    <Flex direction="row" style={styles.container}>
      <Text style={styles.textStyle}>{textTitle}</Text>
      <Spacer />
      <Flex direction="row">
        {/* <Text style={[styles.textStyle, styles.moreText]}>Xem thêm</Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: -2,
          }}
        >
          <Icon name="chevron-right" size={16} color={THEME_COLOR} />
        </View> */}
      </Flex>
    </Flex>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 10,
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 16,
  },
  textStyle: {
    fontFamily: "Quicksand-Bold",
    fontSize: 21,
  },
  moreText: {
    fontSize: 12,
    color: THEME_COLOR,
    textDecorationLine:"underline"
  },
});
export default Title;
