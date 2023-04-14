import { Flex, Spacer } from "native-base";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { SearchNormal1, ArrowDown2 } from "iconsax-react-native";
import { Entypo } from "@expo/vector-icons";
import { Input, Icon } from "native-base";
import { THEME_COLOR } from "../../Utils/themeColor";
import { useState, useEffect } from "react";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const SearchBar = (props) => {
  const { foodList, setFilterFood, setQuery } = props;
  const handleSearch = (text) => {
    setQuery(text);
  };
  return (
    <Flex direction="row" style={styles.container}>
      <View style={styles.textInputContainer}>
        <Input
          focusOutlineColor="red"
          style={{ fontFamily: "Quicksand-Regular" }}
          variant="rounded"
          bgColor="transparent"
          size="30px"
          borderWidth={0}
          h={36}
          onChangeText={handleSearch}
          InputLeftElement={
            <SearchNormal1 size="14" color={THEME_COLOR} variant="Outline" />
          }
          placeholder="Bạn muốn tìm gì ? "
        />
      </View>
    </Flex>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },

  textInputContainer: {
    paddingLeft: 16,
    borderWidth: 0.5,
    borderColor: "#AFACAC",
    alignItems: "center",
    borderRadius: 50,
    width: "100%",
  },
});
export default SearchBar;
