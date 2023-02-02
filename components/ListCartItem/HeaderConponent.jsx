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
import { Location, Edit2 } from "iconsax-react-native";
import VisibleItem from "../VisibleItem";
import HiddenItemWithActions from "../HiddenItemWithActions";
import { THEME_COLOR } from "../../Utils/themeColor";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const BORDER_RADIUS = 15;
const ITEM_MARGIN_BOTTOM = 10;
const ITEM_MARGIN_HORIZONTAL = 16;
const HeaderComponent = (props) => {
  let { note, setVisible } = props;
  const navigation = useNavigation();
  const route = useRoute();
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
                Đại học FPT, Quận 9, Thành Phố Hồ Chí Minh,
              </Text>
            </View>
          </Flex>
        </View>
        <Spacer />
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("SelectStore");
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
            backgroundColor: "#f0f0f0",
            height: 30,
            justifyContent: "center",
          
            borderRadius: 5,
          }}
        >
          <Text>{note}</Text>
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
