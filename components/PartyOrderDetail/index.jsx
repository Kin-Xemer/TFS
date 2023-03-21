import { CloseCircle, Edit } from "iconsax-react-native";
import { Box, Flex, Image, Spacer, Stack, Text } from "native-base";
import { TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { THEME_COLOR } from "../../Utils/themeColor";
import { FONT } from "../../Utils/themeFont";
import { useNavigation } from "@react-navigation/native";
import { convertPrice } from "../../Utils/convertPrice";

const PartyOrderDetail = (props) => {
    const {party} = props
  return (
    <View style={{ backgroundColor: "white" }}>
      <Flex flexDirection="row">
        <Flex flexDirection="row">
          <Image
            source={{ uri: party.partyTemplate }}
            alt="tempalte"
            w={50}
            h={78}
            borderRadius={8}
            borderWidth={0.5}
            borderColor={"#8c8c8c"}
          />
          <Stack style={{ marginLeft: 12 }} space={7.9}>
            <Text style={{ fontFamily: FONT.BOLD, fontSize: 18 }}>
              {party.partyName}
            </Text>
            <Text
              style={{ fontFamily: FONT.SEMI, fontSize: 13, color: "#8c8c8c" }}
            >
              Số lượng: {party.quantity} bàn, {party.itemList.length} món
            </Text>
            <Text
              style={{
                fontFamily: FONT.SEMI, fontSize: 13, color: "#8c8c8c"
              }}
          
            >
             {convertPrice(party.totalPrice / party.quantity)} /bàn
            </Text> 
          </Stack>
        </Flex>
        <Spacer />
        <Flex style={{alignItems:"flex-end"}}>

        <Spacer/>
        <Text
              style={{
                fontFamily: FONT.BOLD,
                fontSize: 17,
             
              }}
            >
              {convertPrice(party.totalPrice)} đ{" "}
            </Text>
        </Flex>
      </Flex>
    </View>
  );
};

export default PartyOrderDetail;
