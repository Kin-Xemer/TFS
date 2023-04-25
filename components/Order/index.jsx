
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Stickynote } from "iconsax-react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  Flex,
  Spacer,
  Image,
  FlatList,
  Box,
} from "native-base";
import { THEME_COLOR } from "../../Utils/themeColor";
import { FONT } from "../../Utils/themeFont";
import { convertPrice } from "../../Utils/convertPrice";
import { convertDate } from '../../Utils/convertDate';
const Order = (props) => {
  const { orders, isFocused, isDone } = props;
  const navigation = useNavigation();
  const route = useRoute();

  const status = (status) => {
    let statusIcon = null;
    let statusText = "";
    let colorText = "black";
    if (status === "pending") {
      statusIcon = {
        uri: "https://live.staticflickr.com/65535/52696293953_33c71c65ab_w.jpg",
      };
      statusText = "Đang chờ";
      colorText = "#898989";
    } else if (status === "done") {
      statusIcon = {
        uri: "https://live.staticflickr.com/65535/52693852341_530c83bc7d_n.jpg",
      };
      statusText = "Đã nhận hàng ";
      colorText = "#20BF55";  
    } else if (status === "deny") {
      statusIcon = {
        uri: "https://live.staticflickr.com/65535/52694262355_49994d6469_n.jpg",
      };
      statusText = "Bị huỷ";
      colorText = "#d21121";
    } else if (status === "delivery") {
      statusIcon = {
        uri: "https://live.staticflickr.com/65535/52694524983_f6f0f8abb7_w.jpg",
      };
      statusText = "Đang giao";
      colorText = "#2DCCFF";
    }
    else if (status === "accept") {
      statusIcon = {
        uri: "https://live.staticflickr.com/65535/52695804071_2820c4ab64_w.jpg",
      };
      statusText = "Đang làm";
      colorText = "#FFB302";
    }
    return (
      <Flex flexDirection={"row"} alignItems="center">
        <Image w={21} h={21} alt="pending" source={statusIcon} />
        <Text style={{ fontFamily: FONT.BOLD, fontSize: 18, color: colorText, marginBottom: 2 }}>
          {" "}
          {statusText}
        </Text>
      </Flex>
    );
  };
  return (
    <View>
      <FlatList
        data={orders}
        style={{marginTop: 16,marginBottom: 150 }}
      
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
             
                navigation.navigate("MyOrderDetailScreen", { orders: item });
              
              
            }}
            activeOpacity={0.7}
          >
            <View style={styles.orderItemContainer}>
              <View>
                <Flex flexDirection={"row"}>
                  <Text style={{ fontFamily: FONT.SEMI, fontSize: 16 }}>
                    Đơn hàng:{" "}
                    <Text
                      style={{
                        color: THEME_COLOR,
                        fontFamily: FONT.BOLD,
                        fontSize: 16,
                      }}
                    >
                      #{item.id}
                    </Text>
                  </Text>
                  <Spacer />
                  <View style={{ width: "40%", alignItems: "center" }}>
                    {status(item.status)}
                  </View>
                </Flex>
                <Box
                  borderColor="#d4d4d4"
                  borderWidth={0.6}
                  marginVertical={8}
                ></Box>
              </View>
              <Flex flexDirection={"row"}>
                <View style={{ marginRight: 4 }}>
                  {/* <Stickynote size="50" color={THEME_COLOR} /> */}
                  <Image
                    source={{
                      uri:"https://live.staticflickr.com/65535/52845581366_6273a4e8c7_w.jpg"
                    }}
                    alt="order"
                    size="58"
                    
                  />
                  
                </View>
                <View>
                  <Text style={styles.inforText}>
                    Thời gian: {convertDate(item.orderDate)}
                  </Text>
                  <Box w={"93%"}>
                    <Text style={styles.inforText} numberOfLines={1}>
                      Địa chỉ: {item.deliveryAddress}
                    </Text>
                  </Box>
                  <Flex flexDirection={"row"} width={"90%"}>
                    <Text style={styles.inforText}>
                      Số lượng: {item.totalQuantity}
                    </Text>

                    <Spacer />
                    <Text
                      style={{
                        color: THEME_COLOR,
                        fontFamily: FONT.BOLD,
                        fontSize: 20,
                      }}
                    >
                      {convertPrice(item.totalPrice)} đ
                    </Text>
                  </Flex>
                </View>
              </Flex>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  inforText: {
    fontFamily: FONT.BOLD,
    fontSize: 13,
    color: "#6b6b6b",
  },
  orderItemContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#d4d4d4",
    backgroundColor: "white",
    shadowColor: "silver",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.2,
  },
});
export default Order;
