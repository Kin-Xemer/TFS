import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Flex, Badge, Spacer, Divider, Image } from "native-base";
import { Location, ArrowDown2 } from "iconsax-react-native";
import VisibleItem from "../VisibleItem";
import HiddenItemWithActions from "../HiddenItemWithActions";
import { THEME_COLOR } from "../../Utils/themeColor";
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
    imgUrl: item.image,
    price: item.price,
  }));
  const renderItem = (data, rowMap) => {
    return <VisibleItem data={data} />;
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
      <View style={{ marginBottom: 20 }}>
        <Divider style={{ marginVertical: 8 }} thickness={3} bg="#e4e2e2" />
        <Flex direction="row" style={{ paddingHorizontal: 16 }}>
          <View style={styles.locationHeader}>
            <Flex direction="row" style={{ marginBottom: 4 }}>
              <View>
                <Text style={[styles.textStyle, styles.addressText]}>
                  Bạn cần thêm gì nữa không ?
                </Text>
              </View>
            </Flex>

            <Text style={[styles.textStyle]}>
              Chọn thêm món khác nếu bạn muốn
            </Text>
          </View>
          <Spacer />
          <TouchableWithoutFeedback
            onPress={() => {
              console.log("click");
            }}
          >
            <View style={styles.changeButton}>
              <Text
                style={{
                  fontSize: 10,
                  color: THEME_COLOR,
                  fontFamily: "Quicksand-Bold",
                }}
              >
                Thêm món
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </Flex>
        <Divider style={{ marginVertical: 8 }} thickness={3} bg="#e4e2e2" />
        <Flex direction="row" style={styles.voucherView}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3258/3258499.png",
            }}
            alt="imahe"
            style={{ width: 45, height: 35 }}
          />
          <Text>voucher</Text>
        </Flex>
      </View>
    );
  };
  const headerComponent = () => {
    return (
      <View>
        <Flex direction="row" style={{ paddingHorizontal: 16 }}>
          <View style={styles.locationHeader}>
            <Flex direction="row" style={{ marginBottom: 4 }}>
              <View style={{ paddingLeft: 3 }}>
                <Text style={styles.textStyle}>Vị trí của bạn</Text>
              </View>
              <Entypo name="chevron-down" size={14} color="black" />
            </Flex>
            <Flex direction="row">
              <Location size="14" color={THEME_COLOR} />
              <Text style={[styles.textStyle, styles.addressText]}>
                Đại học FPT, Quận 9, Thành Phố Hồ Chí Minh
              </Text>
            </Flex>
          </View>
          <Spacer />
          <TouchableWithoutFeedback
            onPress={() => {
              console.log("click");
            }}
          >
            <View style={styles.changeButton}>
              <Text
                style={{
                  fontSize: 10,
                  color: THEME_COLOR,
                  fontFamily: "Quicksand-Bold",
                }}
              >
                Thay đổi địa điểm
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </Flex>
        <Divider style={{ marginVertical: 16 }} thickness={5} bg="#e4e2e2" />
      </View>
    );
  };
  return (
    <Flex style={styles.container}>
      <Flex style={styles.topBar} direction="row">
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Text style={[styles.title, { fontSize: 20, color: THEME_COLOR }]}>
            GIỎ HÀNG
          </Text>
        </View>
      </Flex>
      {listData.length > 0 ? (
        <>
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
            ListHeaderComponent={headerComponent}
            contentContainerStyle={{
              marginTop: 10,
            }}
          />
          <View style={styles.paymentView}>
            <Image
              source={require("../../assets/Icon-app_blue-bg.png")}
              alt="imahe"
              style={{ width: 30, height: 30 }}
            />
          </View>
          <View
            style={{ paddingHorizontal: 16, backgroundColor: "transparent" }}
          >
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.8}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.buttonText}> Thanh toán {TotalCart} đ</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View
          style={[
            styles.container,
            { flex: 1, justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text>khong co gi het mua di</Text>
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
        <Entypo name="chevron-left" size={36} color={THEME_COLOR} />
      </TouchableOpacity>
    </Flex>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: "Quicksand-Bold",
  },
  topBar: {
    width: "100%",
    alignItems: "center",
    height: 36,
  },
  buttonStyle: {
    borderRadius: 15,
    backgroundColor: THEME_COLOR,
    height: 47,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Quicksand-Bold",
    fontSize: 18,
    color: "#fff",
  },
  textStyle: {
    fontFamily: "Quicksand-Regular",
    fontSize: 10,
  },
  addressText: {
    fontFamily: "Quicksand-Bold",
  },
  changeButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: THEME_COLOR,
    borderRadius: 50,
    width: 100,
    height: 28,
  },
  cardFoodView: {
    marginBottom: 4,
  },
  locationHeader: {
    marginVertical: 4,
  },
  voucherView: {
    alignItems: "center",
    justifyContent: "center",
    height: 53,
    borderWidth: 0.5,
    borderColor: "silver",
    borderRadius: 15,
    marginHorizontal: 16,
  },
  paymentView: {
    height: 45,
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal:16
  },
});
export default ListCart;
