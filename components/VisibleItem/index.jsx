import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Flex, Image, Spacer } from "native-base";
import { AddCircle, MinusCirlce } from "iconsax-react-native";
import { convertPrice } from "../../Utils/convertPrice";
import { THEME_COLOR } from "../../Utils/themeColor";
import { getCartById } from "../../Utils/api/getCart";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const BORDER_RADIUS = 15;
const ITEM_MARGIN_BOTTOM = 10;
const ITEM_MARGIN_HORIZONTAL = 16;
const VisibleItem = (props) => {
  const username = useSelector(
    (state) => state.account.account.theAccount.accountId
  );
  const cart = useSelector(
    (state) => state.cart.cartsItems
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [check, setCheck] = useState(false);
  const { data, onDelete } = props;
  const increaseQuantity = () => {
    
    dispatch({ type: "INCREASE_QUANTITY", payload: data.item.id });
  };
  const decreaseQuantity = () =>
    dispatch({ type: "DECREASE_QUANTITY", payload: data.item.id });
  return (
    <View style={[styles.rowFront]}>
      <TouchableHighlight
        style={styles.rowFrontVisible}
        onPress={() => console.log("pressed element")}
        underlayColor="transparent"
      >
        <Flex direction="row" style={{ height: "100%" }}>
          <Flex style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              w={90}
              h={90}
              m={2}
              borderRadius={10}
              source={{
                uri: data.item.imgUrl,
              }}
              alt="image"
            />
          </Flex>
          <Flex style={styles.cartInfor}>
            <Text
              style={[
                styles.title,
                { fontFamily: "Quicksand-Bold", fontSize: 18 },
              ]}
            >
              {data.item.name}
            </Text>
            <View>
              <Text
                style={[
                  styles.title,
                  {
                    color: "#999",
                    fontSize: 12,
                    fontFamily: "Quicksand-SemiBold",
                  },
                ]}
              >
                Ghi chu
              </Text>
            </View>
            <View style={{ marginBottom: 8 }}>
              <Text
                style={[
                  styles.title,
                  {
                    color: "#999",
                    fontSize: 12,
                    fontFamily: "Quicksand-SemiBold",
                  },
                ]}
              >
                {convertPrice(data.item.price)} đ
              </Text>
            </View>
            <Flex direction="row" w="100%" style={{ alignItems: "center" }}>
              <View>
                <Text
                  style={[styles.title, { fontSize: 18, color: THEME_COLOR }]}
                >
                  {convertPrice(data.item.price * data.item.quantity)} đ
                </Text>
              </View>
              <Spacer />
              <Flex direction="row" style={{ alignItems: "center" }}>
                {data.item.quantity !== 1 ? (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      decreaseQuantity();
                    }}
                  >
                    <View>
                      <MinusCirlce
                        size="25"
                        color={THEME_COLOR}
                        variant="Outline"
                      />
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                  <TouchableWithoutFeedback onPress={onDelete}>
                    <View>
                      <MinusCirlce
                        size="25"
                        color={THEME_COLOR}
                        variant="Outline"
                      />
                    </View>
                  </TouchableWithoutFeedback>
                )}
                <View style={{ width: 30, alignItems: "center" }}>
                  <Text>{data.item.quantity}</Text>
                </View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    increaseQuantity();
                  }}
                >
                  <View>
                    <AddCircle
                      size="25"
                      color={THEME_COLOR}
                      variant="Outline"
                    />
                  </View>
                </TouchableWithoutFeedback>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  rowFront: {
    marginHorizontal: ITEM_MARGIN_HORIZONTAL,
    backgroundColor: "#FFF",
    borderRadius: BORDER_RADIUS,
    width: screenWidth - 32,
    height: 115,
    marginBottom: ITEM_MARGIN_BOTTOM,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 4,
  },
  rowFrontVisible: {
    backgroundColor: "white",
    borderRadius: BORDER_RADIUS,
    height: "100%",
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: "Quicksand-Bold",
  },
  cartInfor: {
    marginLeft: 16,
    width: "60%",
    justifyContent: "center",
    paddingVertical: 8,
  },
});
export default VisibleItem;
