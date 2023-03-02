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
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const BORDER_RADIUS = 15;
const ITEM_MARGIN_BOTTOM = 10;
const ITEM_MARGIN_HORIZONTAL = 16;
const HeaderComponent = (props) => {
  let { note, setVisible, locateCoord } = props;
  const navigation = useNavigation();
  const route = useRoute();
  const address = useSelector(
    (state) => state.address.address.formatted_address
  );
  const stringAddress = useSelector((state) => state.address.stringAddress);
  return (
    <View style={{ backgroundColor: "white" }}>
      <Flex direction="row" style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        <View style={styles.locationHeader}>
          <Flex direction="row" style={{ marginBottom: 4 }}>
            <View style={{ paddingLeft: 3 }}>
              <Text style={styles.textStyle}>Vị trí của bạn</Text>
            </View>
            <Entypo name="chevron-down" size={14} color="black" />
          </Flex>
          <Flex direction="row" style={{ width: screenWidth * 0.55 }}>
            <Location size="14" color={THEME_COLOR} />
            <View style={{ paddingLeft: 3 }}>
              <Text
                numberOfLines={1}
                style={[styles.textStyle, styles.addressText]}
              >
                {stringAddress === "" ? address : stringAddress}
              </Text>
            </View>
          </Flex>
        </View>
        <Spacer />
        <TouchableWithoutFeedback
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
        </TouchableWithoutFeedback>
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
