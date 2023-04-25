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
import Modal from "react-native-modal";
import { THEME_COLOR } from "../../Utils/themeColor";
import { FONT } from "../../Utils/themeFont";
import { convertPrice } from "../../Utils/convertPrice";
import ActionButton from "../ActionButton/index";
import { SET_SERVICE_LIST, SET_SERVICE_LIST_OBJECT } from "../../Utils/constant";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ModalPicker = (props) => {
  const {
    listService,
    isVisible,
    toggleModal,
    selectedService,
    setSelectedService,
    setIsvisible,
  } = props;
  const dispatch = useDispatch();
  const [groupValue, setGroupValue] = useState(selectedService);
  const handleSelectedService = () => {
    dispatch({ type: SET_SERVICE_LIST, payload: groupValue });
    let results = filter();
    dispatch({ type: SET_SERVICE_LIST_OBJECT, payload: results });
    setIsvisible(false);
  };
  const filter = () => {
    let arr = [];
    groupValue.map((serv) => {
      listService.map((item) => {
        if (item.id === serv) {
          arr.push(item);
        }
      });
    });
    return arr;
  };
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
        <View
          style={{
            padding: 16,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingBottom: 10,
            backgroundColor: "white",
          }}
        >
          <Flex>
            <Checkbox.Group
              defaultValue={groupValue}
              onChange={(values) => {
                setGroupValue(values || []);
              }}
            >
              <FlatList
                data={listService}
                style={{ width: "100%", marginBottom: 10 }}
                renderItem={({ item, index }) => (
                  <Flex
                    flexDirection="row"
                    key={index}
                    style={{
                      padding: 4,
                      borderBottomWidth: 1,
                      borderBottomColor: "gray",
                      paddingVertical: 8,
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox colorScheme="danger" value={item.id} my="2">
                      <Flex flexDirection={"column"}>
                        <Text style={{ fontFamily: FONT.SEMI, fontSize: 16 }}>
                          {item.serviceName}
                        </Text>
                        <Text
                          numberOfLines={2}
                          style={{
                            fontFamily: FONT.SEMI,
                            fontSize: 14,
                            color: "#8c8c8c",
                            maxWidth: "70%",
                          }}
                        >
                          {item.serviceDescription}
                        </Text>
                      </Flex>
                    </Checkbox>
                    <Spacer />
                    <Text style={{ fontFamily: FONT.SEMI, fontSize: 16 }}>
                      {convertPrice(item.servicePrice)} đ
                    </Text>
                  </Flex>
                )}
              />
            </Checkbox.Group>
          </Flex>
          <ActionButton
            onPress={() => {
              handleSelectedService();
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
export default ModalPicker;
