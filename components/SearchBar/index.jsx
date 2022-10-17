import { Flex, Spacer } from "native-base";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { SearchNormal1, ArrowDown2 } from "iconsax-react-native";
import { Entypo } from "@expo/vector-icons";
import { Input, Icon } from "native-base";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const SearchBar = (props) => {
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
          h={35}
          onChangeText={(text) => {
            //setSearchResult(text);
          }}
          InputLeftElement={
            <SearchNormal1 size="14" color="#d83a3a" variant="Outline" />
          }
          placeholder="Bạn muốn tìm gì ? "
        />
      </View>
     
    </Flex>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    paddingHorizontal:16,
    backgroundColor: "white",
  },
  textStyle: {
    fontFamily: "Quicksand-Regular",
    fontSize: 12,
  },
  addressText: {
    fontFamily: "Quicksand-Bold",
    marginLeft: 2,
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
