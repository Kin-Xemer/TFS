import DropDownPicker from "react-native-dropdown-picker";
import {
    useRoute,
    useNavigation,
    useIsFocused,
  } from "@react-navigation/native";
  import { useState, useEffect, useRef } from "react";
  import { Box, Flex } from "native-base";
  import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FONT } from "../../Utils/themeFont";
const Dropdown = (props) => {
    const [items, setItems] = useState([
        { label: "Tất cả", value: "all" },
        {
          label: "Đang chờ ",
          value: "pending",
        },
        { label: "Đã xác nhận", value: "accept" },
        {
          label: "Đang giao hàng",
          value: "delivery",
        },
        {
          label: "Nhận hàng",
          value: "done",
        },
        { label: "Bị huỷ", value: "deny" },
      ]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    return (
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          placeholder={"Trạng thái"}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          dropDownContainerStyle={{
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: "#c8c8c8",
          }}
          listItemLabelStyle={styles.itemTextStyle}
          placeholderStyle={{
            color: "grey",
            fontFamily: FONT.SEMI,
            fontSize: 16,
          }}
          style={{ borderRadius: 15, borderColor: "#c8c8c8", width: "45%" }}
          textStyle={{ fontFamily: FONT.SEMI, fontSize: 16 }}
          onSelectItem={(item) => {
           console.log("pressed dropdown")
          }}
        />
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 44,
      backgroundColor: "white",
      paddingHorizontal: 16,
    },
    textStyle: {
      fontFamily: "Quicksand-Regular",
    },
    textHeader: {
      fontSize: 30,
    },
    title: {
      fontSize: 14,
      fontFamily: "Quicksand-Bold",
    },
    topBar: {
      width: "100%",
      alignItems: "center",
      height: 40,
      backgroundColor: "white",
    },
    itemTextStyle: {
      fontFamily: "Quicksand-Regular",
      fontSize: 16,
    },
  });
export default Dropdown;