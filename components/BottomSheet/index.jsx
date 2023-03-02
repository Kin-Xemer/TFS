import { Divider, Flex, Spacer } from "native-base";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { THEME_COLOR } from "../../Utils/themeColor";
import { FONT } from "../../Utils/themeFont";
import { Octicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const BottomSheet = (props) => {
  const { refRBSheet, events, handleFilter } = props;
  const [selectedRegions, setSelectedRegions] = useState("");
  const [selectedEvents, setSelectedEvents] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const handleApplyFilter = async () => {
     refRBSheet.current.close();
    await delay(201);
    await handleFilter(selectedRegions, selectedEvents, selectedPrice);
  };
  const handleSelectedRegions = (item, check) => {
    setSelectedRegions(item);
  };
  useEffect(() => {}, []);
  let arrayRegions = ["Miền Bắc", "Miền Trung", "Miền Nam"];
  let arrayPrice = [
    { name: "Tăng dần", icon: "sort-asc", value: "min" },
    { name: "Giảm dần", icon: "sort-desc", value: "max" },
  ];
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={true}
      openDuration={300}
      height={screenHeight * 0.85}
      customStyles={{
        container: {
          borderRadius: 20,
          backgroundColor: "white",
        },
        draggableIcon: {
          backgroundColor: "silver",
        },
      }}
    >
      <ScrollView>
        <Divider height={3} bg="#f0f0f0" />
        <View style={[styles.filterItemView]}>
          <Text style={styles.filterTilte}> THEO MIỀN</Text>
          <Flex
            flexDirection={"row"}
            style={{ marginVertical: 16, marginLeft: 2 }}
          >
            {arrayRegions.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    handleSelectedRegions(item);
                  }}
                  style={
                    selectedRegions && selectedRegions === item
                      ? styles.filterButtonSelected
                      : styles.filterButtonUnSelected
                  }
                  activeOpacity={0.7}
                >
                  <View>
                    <Text
                      style={
                        selectedRegions && selectedRegions === item
                          ? styles.itemSelected
                          : styles.itemUnselected
                      }
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Flex>
        </View>
        <Divider height={3} bg="#f0f0f0" />
        <View style={styles.filterItemView}>
          <Text style={styles.filterTilte}> THEO NGÀY LỄ</Text>
          <Flex
            flexDirection={"row"}
            style={{
              flexWrap: "wrap",
              alignItems: "flex-start",
              marginVertical: 16,
            }}
          >
            {events
              ? events.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedEvents(item.eventName);
                      }}
                      style={
                        selectedEvents && selectedEvents === item.eventName
                          ? styles.filterEventSelected
                          : styles.filterEventUnSelected
                      }
                      activeOpacity={0.7}
                      key={index}
                    >
                      <View>
                        <Text
                          style={
                            selectedEvents && selectedEvents === item.eventName
                              ? styles.itemSelected
                              : styles.itemUnselected
                          }
                        >
                          {item.eventName}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
              : null}
          </Flex>
        </View>
        <Divider height={3} bg="#f0f0f0" />
        <View style={styles.filterItemView}>
          <Text style={styles.filterTilte}> THEO GIÁ</Text>
          <Flex
            flexDirection={"row"}
            style={{
              flexWrap: "wrap",
              alignItems: "flex-start",
              marginVertical: 16,
            }}
          >
            {arrayPrice.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedPrice(item.value);
                  }}
                  style={
                    selectedPrice && selectedPrice === item.value
                      ? styles.filterEventSelected
                      : styles.filterEventUnSelected
                  }
                  activeOpacity={0.7}
                >
                  <Flex flexDirection="row" style={{ alignItems: "center" }}>
                    <Text
                      style={
                        selectedPrice && selectedPrice === item.value
                          ? styles.itemSelected
                          : styles.itemUnselected
                      }
                    >
                      {item.name}{" "}
                    </Text>
                    <Octicons
                      name={item.icon}
                      size={20}
                      color={
                        selectedPrice && selectedPrice === item.value
                          ? THEME_COLOR
                          : "black"
                      }
                    />
                  </Flex>
                </TouchableOpacity>
              );
            })}
          </Flex>
        </View>
      </ScrollView>
      <Spacer />
      <Flex flexDirection="row" style={{ bottom: 0, marginBottom: 35 }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedEvents("");
            setSelectedRegions("");
            setSelectedPrice("");
          }}
          style={[styles.button, { backgroundColor: "#f0f0f0" }]}
          activeOpacity={0.7}
        >
          <Text style={[styles.buttonText, { color: "#c8c8c8" }]}>
            Xoá bộ lọc
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleApplyFilter();
          }}
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Áp dụng </Text>
        </TouchableOpacity>
      </Flex>
    </RBSheet>
  );
};
const styles = StyleSheet.create({
  container: {},
  filterTilte: {
    fontFamily: FONT.BOLD,
    fontSize: 22,
  },
  filterButtonSelected: {
    width: "31%",
    paddingHorizontal: 12,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: THEME_COLOR,
    marginRight: 10,
  },
  filterButtonUnSelected: {
    width: "31%",
    paddingHorizontal: 12,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#c8c8c8",
    marginRight: 10,
  },

  filterEventSelected: {
    marginHorizontal: 3,
    marginTop: 8,
    width: "48%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: THEME_COLOR,
  },
  filterEventUnSelected: {
    marginHorizontal: 3,
    marginTop: 8,
    width: "48%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#c8c8c8",
  },

  itemSelected: {
    fontFamily: FONT.BOLD,
    fontSize: 16,
    color: THEME_COLOR,
  },
  itemUnselected: {
    fontFamily: FONT.REGULAR,
    fontSize: 16,
  },
  filterItemView: {
    paddingHorizontal: 8,
    marginLeft: 2,
    marginVertical: 8,
  },
  button: {
    marginHorizontal: 3,
    marginTop: 8,
    width: "48%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: THEME_COLOR,
  },
  buttonText: {
    fontFamily: FONT.BOLD,
    fontSize: 20,
    color: "white",
  },
});
export default BottomSheet;
