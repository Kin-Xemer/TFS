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
  Checkbox,
} from "native-base";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import Modal from "react-native-modal";
import { THEME_COLOR } from "../../Utils/themeColor";
import { FONT } from "../../Utils/themeFont";
import { convertPrice } from "../../Utils/convertPrice";
import ActionButton from "../ActionButton/index";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ModalParty = (props) => {
  const {
    setSelectedParty,
    isVisible,
    toggleModal,
    setIsvisible,
    listParty,
    selectedParty,
  } = props;
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(selectedParty);
  const handlePressRadio = (value) => {
    setSelectedItem(value);
  };
  // useEffect(() => {
  //   setSelectedItem(selectedParty)
  // },[isVisible])
  const handleSelectedParty = (value) => {
    setSelectedParty(selectedItem);
    toggleModal();
  };
  return (
    <View>
      <Modal
        hasBackdrop={true}
        isVisible={isVisible}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        swipeDirection={["down"]}
        onModalHide={() => {
          setSelectedItem(selectedParty);
        }}
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 300,
        }}
      >
        <View
          style={{
            padding: 30,
            borderRadius: 20,
            paddingBottom: 20,
            backgroundColor: "white",
          }}
        >
          <RadioForm
            initial={0}
            formHorizontal={false}
            style={{ paddingBottom: 16, marginLeft: -16 }}
          >
            {listParty.map((obj, i) => (
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
                  isSelected={selectedItem === obj.value}
                  borderWidth={1}
                  buttonInnerColor={THEME_COLOR}
                  buttonOuterColor={
                    selectedItem === obj.value ? THEME_COLOR : "#000"
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
          <ActionButton
            onPress={() => {
              handleSelectedParty();
            }}
            buttonText="Xác nhận"
          />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "white",
  },
});
export default ModalParty;
