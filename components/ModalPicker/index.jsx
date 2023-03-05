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
import {
  Flex,
  TextArea,
  Spacer,
  Divider,
  Image,
  FlatList,
  Box,
  Button,
} from "native-base";
import Modal from "react-native-modal";
import { THEME_COLOR } from '../../Utils/themeColor';
import { FONT } from "../../Utils/themeFont";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ModalPicker = (props) => {
  const { isVisible, toggleModal , handleSelectItem, arrayOptions, itemSelected} = props;
  return (
    <View>
      <Modal
        hasBackdrop={true}
        isVisible={isVisible}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        swipeDirection={["down"]}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <Flex
          backgroundColor="white"
          w="100%"
          style={{
            padding: 16,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingBottom: 50 
          }}
        >
        <Text>ákjasdk</Text>
        </Flex>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 44,
      backgroundColor: "white",
    },
    filterButtonView: {
      width: "100%",
      marginHorizontal: 3,
      paddingHorizontal: 12,
      height: 35,
      backgroundColor: "#ededed",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
    },
    itemSelected: {
      fontFamily: FONT.BOLD,
      fontSize: 18,
      color: THEME_COLOR,
    },
    itemUnselected: {
      fontFamily: FONT.REGULAR,
      fontSize: 18,
    },
  });
export default ModalPicker;
