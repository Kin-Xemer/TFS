import { useRoute, useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import { AddCircle, MinusCirlce } from "iconsax-react-native";
import { Flex, Spacer, Heading, Button, useToast, Box } from "native-base";
import { convertPrice } from "../Utils/convertPrice";
import RatingBar from "../components/RatingBar";
import Toast from "react-native-toast-message";
import { THEME_COLOR } from "../Utils/themeColor";
import { FONT } from "../Utils/themeFont";
import BackButton from "../components/BackButton";
import ModalParty from "../components/ModalParty";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const PartyScreen = () => {
  const [isVisible, setIsvisible] = useState(false);
  const [selectedParty, setSelectedParty] = useState();
  const listParty = [
    { label: "Tiệc sinh nhật", value: "sinhnhat" },
    { label: "Tiệc thôi nôi", value: "thoinoi" },
    { label: "Tiệc đám cưới", value: "damcuoi" },
    { label: "Tiệc tân gia", value: "tangia" },
  ];
  const toggleModal = () => {
    setIsvisible(!isVisible);
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
          <Text style={[styles.title, { fontSize: 20, color: THEME_COLOR }]}>
            BÀN TIỆC
          </Text>
        </View>
      </Flex>
      <Box style={styles.editView}>
        <Flex flexDirection={"row"} style={{ alignItems: "center" }}>
          <Box>
            <Text style={styles.title}>Menu</Text>
          </Box>
          <Spacer />
          {/* {selectedParty ? (
            <Flex flexDirection="row">
                <Text>{selectedParty}</Text>
                <TouchableOpacity
                onPress={() => {
                    toggleModal();
                  }}
                >
                    <Text>  sua</Text>
                </TouchableOpacity>
            </Flex>
          ) : (
            <TouchableOpacity
              style={{
                paddingHorizontal: 18,
                paddingTop: 8,
                //   borderColor: "#8c8c8c",
                //   borderWidth: 1,
                borderRadius: 50,
                paddingBottom: 10,
                alignItems: "center",
                backgroundColor: THEME_COLOR,
              }}
              onPress={() => {
                toggleModal();
              }}
              activeOpacity={0.8}
            >
              <Text style={{ fontFamily: FONT.BOLD, color: "white" }}>
                Loại tiệc
              </Text>
            </TouchableOpacity>
          )} */}
          
        </Flex>
      </Box>
      <BackButton />
      <ModalParty
        setSelectedParty={setSelectedParty}
        selectedParty={selectedParty}
        listParty={listParty}
        toggleModal={toggleModal}
        isVisible={isVisible}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 14,
    fontFamily: "Quicksand-Bold",
    paddingVertical: 12,
  },
  topBar: {
    alignItems: "center",
    height: 50,
    backgroundColor: "white",
  },
  editView: {
    padding: 8,
    paddingHorizontal: 16,
    borderWidth: 0.5,
    borderColor: "#8c8c8c",
    borderRadius: 15,
  },
  title: {
    fontFamily: FONT.BOLD,
    fontSize: 18,
  },
});
export default PartyScreen;
