import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Flex, Badge, Spacer, Divider, Text } from "native-base";
import { Location, Edit2 } from "iconsax-react-native";
import { THEME_COLOR } from "../../Utils/themeColor";
import { FONT } from "../../Utils/themeFont";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const BORDER_RADIUS = 15;
const ITEM_MARGIN_BOTTOM = 10;
const ITEM_MARGIN_HORIZONTAL = 16;
const HeaderComponent = (props) => {
  let {nearlyRestaurant, note, setVisible, locateCoord, deliveryMethod, setDeliveryMethod } =
    props;
  const navigation = useNavigation();
  const route = useRoute();
  const address = useSelector(
    (state) => state.address.address.formatted_address
  );
  const stringAddress = useSelector((state) => state.address.stringAddress);
  const listDeliveryMethod = [
    { label: "Giao hàng", value: "delivery" },
    { label: "Lấy tại cửa hàng", value: "takeaway" },
  ];
  const handlePressRadio = (value) => {
    setDeliveryMethod(value);
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <Flex
        direction="row"
        style={{ paddingHorizontal: 16, paddingTop: 8, alignItems: "center" }}
      >
        <View style={styles.locationHeader}>
          <Flex
            direction="row"
            style={{ marginBottom: 1, alignItems: "center" }}
          >
            <View style={{ paddingLeft: 0 }}>
              {deliveryMethod === "delivery" ? (
                <Text style={styles.textStyle}>Vị trí của bạn</Text>
              ) : (
                <Text style={styles.textStyle}>
                  Chi nhánh gần bạn nhất
                </Text>
              )}
            </View>
            <Entypo name="chevron-down" size={14} color="black" />
          </Flex>
          {deliveryMethod === "takeaway" ? (
            <View>
             <Text style={styles.textStyle}>Cửa hàng: <Text style={{fontFamily: FONT.BOLD, fontSize: 13}}>{nearlyRestaurant.restaurantName}</Text></Text>
            <Flex
            direction="row"
            style={{ width: screenWidth * 0.58, alignItems: "center" }}
          >
            <Location size="14" color={THEME_COLOR} />
            <View style={{ paddingLeft: 3 }}>
              <Text
                numberOfLines={1}
                style={[styles.textStyle, styles.addressText]}
              >
                {nearlyRestaurant.restaurantLocation}
              </Text>
            </View>
          </Flex>
            </View>
          ) :  <Flex
          direction="row"
          style={{ width: screenWidth * 0.58, alignItems: "center" }}
        >
          <Location size="14" color={THEME_COLOR} />
          <View style={{ paddingLeft: 3 }}>
            <Text
              numberOfLines={1}
              style={[styles.textStyle, styles.addressText]}
            >
              {stringAddress === "" ? address : stringAddress}
            </Text>
          </View>
        </Flex>}
         
        </View>
        <Spacer />
        {deliveryMethod === "delivery" ? <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("MapScreen", {
              addresses: address,
              locateCoord: locateCoord,
            });
          }}
        >
          <View style={styles.changeButton}>
            <Text
              style={{
                fontSize: 13,
                color: THEME_COLOR,
                fontFamily: "Quicksand-Bold",
              }}
            >
              Thay đổi địa điểm
            </Text>
          </View>
        </TouchableWithoutFeedback>:<TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("SelectStore", {
              addresses: address,
              locateCoord: locateCoord,
              nearlyRestaurant: nearlyRestaurant
            });
          }}
        >
          <View style={styles.changeButton}>
            <Text
              style={{
                fontSize: 13,
                color: THEME_COLOR,
                fontFamily: "Quicksand-Bold",
              }}
            >
              Thay đổi địa điểm
            </Text>
          </View>
        </TouchableWithoutFeedback>}
      </Flex>
      <Flex direction="row">
        <TouchableOpacity activeOpacity={1} onPress={setVisible}>
          <Flex direction="row" style={[styles.changeButton, styles.editNote]}>
            <Edit2 size="15" color="black" variant="Bold" />
            <View style={{ paddingLeft: 3 }}>
              {note === "" ? (
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Quicksand-Bold",
                  }}
                >
                  Thêm ghi chú
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Quicksand-Bold",
                  }}
                >
                  Sửa ghi chú
                </Text>
              )}
            </View>
          </Flex>
        </TouchableOpacity>
      </Flex>
      {note === "" ? (
        ""
      ) : (
        <View
          style={{
            marginLeft: 16,
            height: 30,
            justifyContent: "center",

            borderRadius: 5,
          }}
        >
          <Text fontFamily={FONT.BOLD} color={"#4a4a4a"}>
            Ghi chú:{" "}
            <Text color={"#8c8c8c"} fontFamily={FONT.MEDIUM}>
              {note}
            </Text>
          </Text>
        </View>
      )}
      <RadioForm initial={0} formHorizontal={true}>
        {listDeliveryMethod.map((obj, i) => (
          <RadioButton
            key={i}
            labelHorizontal={true}
            style={{
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={deliveryMethod === obj.value}
              borderWidth={1}
              buttonInnerColor={THEME_COLOR}
              buttonOuterColor={
                deliveryMethod === obj.value ? THEME_COLOR : "#000"
              }
              onPress={(value) => {
                handlePressRadio(value);
              }}
              buttonSize={10}
              buttonOuterSize={18}
              buttonStyle={{}}
              buttonWrapStyle={{ marginLeft: 16 }}
            />
            <RadioButtonLabel
              obj={obj}
              index={i}
              onPress={(value) => {
                handlePressRadio(value);
              }}
              labelStyle={{ fontFamily: FONT.MEDIUM, fontSize: 14 }}
              labelWrapStyle={{ marginLeft: 8 }}
            />
          </RadioButton>
        ))}
      </RadioForm>
      <Divider style={{ marginVertical: 16 }} thickness={5} bg="#e4e2e2" />
    </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "Quicksand-Regular",
    fontSize: 12,
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
    height: 35,
    paddingHorizontal: 10,
  },
  locationHeader: {
    marginVertical: 4,
  },
  editNote: {
    borderColor: "silver",
    borderWidth: 0.5,
    marginHorizontal: 16,
    marginTop: 8,
  },
});
export default HeaderComponent;
