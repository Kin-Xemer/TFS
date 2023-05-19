
import { View, StyleSheet, Dimensions } from "react-native";
import { FONT } from "../../Utils/themeFont";
import { Flex, Image, Spacer, Text } from "native-base";
import { convertPrice } from "../../Utils/convertPrice";
const FoodOrderItem = (props) => {
  const { item } = props;
  return (
    <View style={styles.container}>
      <Flex flexDirection="row" style={{alignItems:"center"}}>
        <Image
          style={{ height: 40, width: 40 , borderRadius: 5, marginRight: 10}}
          source={{ uri: item.image }}
          alt={item.name}
        />
        
        <View>
        <Text fontFamily={FONT.BOLD} fontSize={14}>
          {item.name} 
        </Text>
        <Text fontFamily={FONT.BOLD} color={"#8c8c8c"} fontSize={14}>
        x {item.quantity}
        </Text>
        </View>
        <Spacer />
        <Text fontFamily={FONT.BOLD} fontSize={18}>
          {convertPrice(item.subTotal)} đ
        </Text>
      </Flex>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderColor: "#8c8c8c",
    marginVertical: 2,
    borderRadius: 15,
  },
});
export default FoodOrderItem;
