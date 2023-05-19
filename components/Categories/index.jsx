import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Flex, Image, Spacer } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const Categories = (props) => {
  const navigation = useNavigation();
  const foods = useSelector((state) => state.food.food);
  const isLogin  = useSelector((state) => state.account.isLogin);
  const { openAllFood, events, regions ,handlePressParty } = props;
  return (
    <Flex direction="row" style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("MoreScreen", {
            food: foods,
            events: events,
            regions: regions,
            init:"Tất cả",
            isFromHome:false
          });
        }}
        activeOpacity={0.8}
      >
        <Flex style={styles.iconCateContainer}>
          <Image
            source={require("../../assets/monchinh.png")}
            alt="Mon ăn"
            width="100px"
            height="100px"
            borderRadius={10}
          />
          <Text style={[styles.textStyle, styles.titleText]}>Món ăn</Text>
        </Flex>
      </TouchableOpacity>
      <Spacer />
      <TouchableOpacity
        style={styles.iconCateContainer}
        activeOpacity={0.8}
        onPress={() => {
          isLogin ?  handlePressParty(): navigation.navigate("LoginScreenn");
          
        }}
      >
        <Image
          source={require("../../assets/banan.png")}
          alt="Bàn tiệc"
          width="100px"
          height="100px"
          borderRadius={10}
        />
        <Text style={[styles.textStyle, styles.titleText]}>Bàn tiệc</Text>
      </TouchableOpacity>
      <Spacer />
      <TouchableOpacity style={styles.iconCateContainer}
        onPress={() => {
          navigation.navigate("MoreScreen", {
            food: foods,
            events: events,
            regions: regions,
            init:"Mâm tiệc",
            isFromHome:false
          });
        }}
      >
        <Image
          source={require("../../assets/combo.png")}
          alt="Combo món"
          width="100px"
          height="100px"
          borderRadius={10}
        />
        <Text style={[styles.textStyle, styles.titleText]}>Mâm tiệc</Text>
      </TouchableOpacity>
    </Flex>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    backgroundColor: "white",
    width: "100%",
  },
  textStyle: {
    fontFamily: "Quicksand-Regular",
    fontSize: 12,
  },
  titleText: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 14,
  },
  iconCateContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Categories;
