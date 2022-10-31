import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Trash } from "iconsax-react-native";
import { Flex, Image, Spacer } from "native-base";
import { AddCircle, MinusCirlce } from "iconsax-react-native";
import { convertPrice } from "../../Utils/convertPrice";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const BORDER_RADIUS = 15;
const ITEM_MARGIN_BOTTOM = 10;
const ITEM_MARGIN_HORIZONTAL = 16;
const ListCart = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const items = useSelector((state) => state.cart);
  let { deleteItem } = props;
  let list = [];
  let TotalCart = 0;

  Object.keys(items.cartsItem).forEach(function (item) {
    TotalCart += items.cartsItem[item].quantity * items.cartsItem[item].price;
    list.push(items.cartsItem[item]);
  });

  const listData = list.map((item, index) => ({
    id: `${index}`,
    name: item.name,
    quantity: item.quantity,
    imgURL: item.image,
    price: item.price,
  }));

  const VisibleItem = (props) => {
    const { data } = props;
    const increaseQuantity = () =>
      dispatch({ type: "INCREASE_QUANTITY", payload: data.item.id });
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
                w={105}
                h={105}
                m={2}
                borderRadius={10}
                source={{
                  uri: data.item.imgURL,
                }}
                alt="image"
              />
            </Flex>
            <Flex style={styles.cartInfor}>
              <Text
                style={[
                  styles.title,
                  { fontFamily: "Quicksand-Bold", fontSize: 20 },
                ]}
              >
                {data.item.name}
              </Text>
              <Spacer />
              <View style={{ marginBottom: 8 }}>
                <Text
                  style={[
                    styles.title,
                    {
                      color: "#999",
                      fontSize: 16,
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
                    style={[styles.title, { fontSize: 20, color: "#d83a3a" }]}
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
                          color="#d83a3a"
                          variant="Outline"
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  ) : (
                    <TouchableWithoutFeedback>
                      <View>
                        <MinusCirlce
                          size="25"
                          color="#d83a3a"
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
                      <AddCircle size="25" color="#d83a3a" variant="Outline" />
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

  const renderItem = (data, rowMap) => {
    return <VisibleItem data={data} />;
  };

  const HiddenItemWithActions = (props) => {
    const { swipeAnimatedValue, onDelete } = props;
    return (
      <View style={[styles.rowBack]}>
        <View style={styles.buttonDelete}>
          <TouchableOpacity
            style={[styles.buttonDelete]}
            onPress={onDelete}
            activeOpacity={0.7}
          >
            <Animated.View
              style={[
                styles.trash,
                {
                  transform: [
                    {
                      scale: swipeAnimatedValue.interpolate({
                        inputRange: [-screenWidth * 0.25 + 12, 1.2],
                        outputRange: [1.2, 0],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                },
              ]}
            >
              <Trash name="trash-can-outline" size={24} color="#fff" />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenItemWithActions
        data={data}
        onDelete={() => deleteItem("DELETE_CART", data.item.id)}
      />
    );
  };
  const footerComponent = () => {
    return (
      <View style={styles.container}>
        <Text>TotalCart = {TotalCart}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Flex style={styles.topBar} direction="row">
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Text style={[styles.title, { fontSize: 20, color: "#d83a3a" }]}>
            GIỎ HÀNG
          </Text>
        </View>
      </Flex>
      {listData.length > 0 ? (
        <SwipeListView
          data={listData}
          keyExtractor={(rowData, index) => {
            return rowData.id.toString();
          }}
          renderItem={(data) => renderItem(data)}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-screenWidth * 0.25 + 12}
          disableRightSwipe
          showsVerticalScrollIndicator={false}
          ListFooterComponent={footerComponent}
          contentContainerStyle={{
            marginTop: 10,
          }}
        />
      ) : (
        <View
          style={[
            styles.container,
            { flex: 1, justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text>khong co cc gi het mua di</Text>
        </View>
      )}

      <TouchableOpacity
        style={{ position: "absolute" }}
        onPress={() => {
          navigation.goBack();
          console.log("preded");
        }}
        activeOpacity={1}
      >
        <Entypo name="chevron-left" size={36} color="#d83a3a" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: screenHeight,
  },
  rowFront: {
    marginHorizontal: ITEM_MARGIN_HORIZONTAL,
    backgroundColor: "#FFF",
    borderRadius: BORDER_RADIUS,
    width: screenWidth - 32,
    height: 135,
    marginBottom: ITEM_MARGIN_BOTTOM,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: "white",
    borderRadius: BORDER_RADIUS,
    height: "100%",
    padding: 10,
  },
  rowBack: {
    marginHorizontal: ITEM_MARGIN_HORIZONTAL,
    backgroundColor: "red",
    width: screenWidth - 36,
    justifyContent: "flex-end",

    flexDirection: "row",
    marginBottom: ITEM_MARGIN_BOTTOM,
    borderRadius: BORDER_RADIUS,
    borderLeftColor: "#FFF",
  },

  buttonDelete: {
    backgroundColor: "red",
    borderRadius: BORDER_RADIUS,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "25%",
  },
  trash: {
    height: 30,
    width: 30,
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
  topBar: {
    width: "100%",
    alignItems: "center",
    height: 36,
  },
});
export default ListCart;
