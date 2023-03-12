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
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import { AddCircle, Add } from "iconsax-react-native";
import {
  Flex,
  Spacer,
  Heading,
  Button,
  useToast,
  Box,
  TextArea,
} from "native-base";
import { convertPrice } from "../Utils/convertPrice";
import RatingBar from "../components/RatingBar";
import Toast from "react-native-toast-message";
import axios from "axios";
import { THEME_COLOR } from "../Utils/themeColor";
import { FONT } from "../Utils/themeFont";
import BackButton from "../components/BackButton";
import ModalParty from "../components/ModalParty";
import { BASE_URL } from "../services/baseURL";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const PartyScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isVisible, setIsvisible] = useState(false);
  const [selectedParty, setSelectedParty] = useState();
  const [events, setEvents] = useState();
  const [regions, setRegions] = useState();
  const [listFoodMenu, setListFoodMenu] = useState([]);
  const foods = useSelector((state) => state.food.food);

  // const toggleModal = () => {
  //   setIsvisible(!isVisible);
  // };
  useEffect(() => {
    getRegion();
    getEvent();
  }, []);
  const getRegion = () => {
    axios
      .get(BASE_URL + "/regions")
      .then((response) => {
        setRegions(response.data);
      })
      .catch((error) => {
        console.log("error More Screen", error);
      });
  };
  const getEvent = () => {
    axios.get(BASE_URL + "/events").then((response) => {
      setEvents(response.data);
    });
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
            <Text style={styles.title}>Tạo thực đơn</Text>
          </Box>
          <Spacer />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddFoodMenu", {
                food: foods,
                events: events,
                regions: regions,
                banner:
                  "https://live.staticflickr.com/65535/52702504583_ff7ec0f38a_z.jpg",
              });
            }}
            activeOpacity={0.8}
          >
            <Text>them mon</Text>
          </TouchableOpacity>
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
      {/* <ModalParty
        setSelectedParty={setSelectedParty}
        selectedParty={selectedParty}
        listParty={listParty}
        toggleModal={toggleModal}
        isVisible={isVisible}
      /> */}
      <Box
        style={{
          borderRadius: 15,
          borderWidth: 1,
          borderColor: "#d83a3a",
          padding: 16,

          marginTop: 16,
        }}
      >
        <Flex mb={2} flexDirection="row" style={{ alignItems: "center" }}>
          <Box>
            <Text style={styles.title}>Thực đơn 1</Text>
            <Box />
          </Box>
          <Spacer />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddFoodMenu", {
                food: foods,
                events: events,
                regions: regions,
                banner:
                  "https://live.staticflickr.com/65535/52702504583_ff7ec0f38a_z.jpg",
              });
            }}
            activeOpacity={0.8}
          >
            <Text style={{ fontSize: 14, fontFamily: FONT.MEDIUM }}>
              Số lượng:
            </Text>
          </TouchableOpacity>
          <TextInput
            maxLength={3}
            keyboardType={"numeric"}
            underlineColorAndroid={"#d83a3a"}
            style={{
              fontSize: 14,
              fontFamily: FONT.MEDIUM,
              paddingVertical: 5,
              paddingHorizontal: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
            onChangeText={(value) => {
              console.log(value);
            }}
            // value={text}
          />
          <Text style={{ fontSize: 14, fontFamily: FONT.MEDIUM }}>bàn</Text>
        </Flex>
        <Box mb={2}>
          <Text style={{ fontFamily: FONT.SEMI, fontSize: 14 }}>Ghi chú:</Text>
          <View>
            <TextArea
              style={{ fontFamily: "Quicksand-Regular" }}
              placeholder="Thêm ghi chú..."
              size="md"
              paddingLeft="4"
              borderWidth={0.5}
              mb={3}
              mt={1}
              borderColor={"#8c8c8c"}
              // value={note}
              borderRadius={15}
              _light={{
                placeholderTextColor: "trueGray.400",
                bg: "white",
                _hover: {
                  bg: "white",
                  borderColor: "#8c8c8c",
                },
                _focus: {
                  bg: "white",
                  borderColor: "#8c8c8c",
                },
              }}
              onChangeText={(value) => {
                console.log(value);
              }}
            />
          </View>
        </Box>
        <Box>
          <Text style={{ fontFamily: FONT.SEMI, fontSize: 14 }}>Món ăn</Text>
        </Box>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            borderColor: "#d83a3a",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderRadius: 15,
            padding: 10,
            borderStyle: "dashed",
          }}
          activeOpacity={0.7}
        >
          <Add size="30" color="#d83a3a" />
          <Text
            style={{ fontSize: 18, fontFamily: FONT.BOLD, color: "#d83a3a" }}
          >
            Thêm món ăn
          </Text>
        </TouchableOpacity>
      </Box>
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
    fontSize: 20,
  },
});
export default PartyScreen;
