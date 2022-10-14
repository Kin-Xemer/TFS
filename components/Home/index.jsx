import { Flex, Spacer } from "native-base";
import { View, StyleSheet, Text } from "react-native";
import { Location, ArrowDown2 } from "iconsax-react-native";
import { Entypo } from "@expo/vector-icons";
import ImageTitle from "../ImageTitle/index";
import SearchBar from "../SearchBar/index";
import { Feather } from "@expo/vector-icons";
const Home = (props) => {
  return (
    <Flex direction="column" style={styles.container}>
      <Flex direction="row">
        <View>
          <Flex direction="row">
            <View style={{ paddingLeft: 3 }}>
              <Text style={styles.textStyle}>Vị trí của bạn</Text>
            </View>
            <Entypo name="chevron-down" size={14} color="black" />
          </Flex>

          <Flex direction="row">
            <Location size="14" color="#d83a3a" />
            <Text style={[styles.textStyle, styles.addressText]}>
              Đại học FPT, Quận 9, Thành Phố Hồ Chí Minh
            </Text>
          </Flex>
        </View>
        <Spacer />
        <View style={styles.cartView}>
          <Feather name="shopping-cart" size={24} color="#d83a3a" />
        </View>
      </Flex>

      <View>
        <SearchBar />
      </View>
      <View style={{marginLeft:-16, justifyContent: 'center'}}>
        <ImageTitle />
      </View>
    </Flex>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontFamily: "Quicksand-Regular",
    fontSize: 10,
  },
  addressText: {
    fontFamily: "Quicksand-Bold",
    marginLeft: 2,
  },
  cartView: {
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
  },
});
export default Home;
