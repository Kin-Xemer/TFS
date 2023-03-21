import { CloseCircle } from "iconsax-react-native";
import { Box, Flex, Image, Spacer, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { convertPrice } from "../../Utils/convertPrice";
import { THEME_COLOR } from "../../Utils/themeColor";
import { FONT } from "../../Utils/themeFont";

const PartyItem = (props) => {
  const { index, item, onDelete } = props;
  const dispatch = useDispatch();
  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      style={{
        borderColor: "#8c8c8c",
        borderWidth: 0.5,
        marginBottom: 8,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <Image
        source={{ uri: item.foodImage }}
        w={50}
        h={50}
        alt="a"
        style={{ borderRadius: 10, marginRight: 8 }}
      />
      <Text style={{fontFamily:FONT.MEDIUM, fontSize: 16, width:"50%"}}>{item.foodName}</Text>
      <Spacer />
      <Text style={{fontFamily:FONT.BOLD, fontSize: 16, color:THEME_COLOR}}>{convertPrice(item.price)}</Text>
      <TouchableOpacity
        onPress={() => {
          onDelete(item) 
        }}
      >
        <Flex>
          <CloseCircle size="20" color={THEME_COLOR} />
        </Flex>
      </TouchableOpacity>
    </Flex>
  );
};

export default PartyItem;
