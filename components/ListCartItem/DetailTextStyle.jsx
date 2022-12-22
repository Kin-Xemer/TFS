
import {Text, StyleSheet} from "react-native";
import {Flex, Spacer} from "native-base"
import { convertPrice } from "../../Utils/convertPrice";
const DetailTextStyle = (props) => {
    const {textName, price} = props;
    return (
        <Flex direction="row" style={styles.textView}>
          <Text
            style={{
              fontFamily: "Quicksand-Regular",
              fontSize: 14,
              color: "#898989",
            }}
          >
            {textName}
          </Text>
          <Spacer/>
          <Text
            style={{
              fontFamily: "Quicksand-Regular",
              fontSize: 14,
              color: "#898989",
            }}
          >
            {convertPrice(price)} đ
          </Text>
        </Flex>
    );
}
const styles = StyleSheet.create({
    textView: {
      marginVertical: 6,
    },
  });
export default DetailTextStyle;