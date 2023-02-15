import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { Stickynote } from "iconsax-react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Flex, TextArea, Spacer, Divider, Image, FlatList } from "native-base";
import { THEME_COLOR } from "../../Utils/themeColor";
import { FONT } from "../../Utils/themeFont";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const Order = (props) => {
  const { orders, isFocused, isDone } = props;
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View>
      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              console.log(item.id);
            }}
            activeOpacity={0.7}
          >
            <View style={styles.orderItemContainer}>
              <View>
                <Text style={{ fontFamily: FONT.SEMI, fontSize: 16, }}>
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
              </View>
              <Flex flexDirection={"row"}>
                <Stickynote size="45" color={THEME_COLOR} />
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
  orderItemContainer: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 15,
    marginVertical: 6,
    borderWidth: 0.5,
    borderColor: "#afafaf",
  },
});
export default Order;
