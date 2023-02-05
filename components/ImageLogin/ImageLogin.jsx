import { Image } from "native-base";
import { View } from "native-base";
import { TouchableOpacity } from "react-native";

const ImageLogin = (props) => {
  const { imageURL, onPressImage } = props;
  return (
    <View style={{ marginRight: 15, marginVertical: 20 }}>
      <TouchableOpacity
      onPress={onPressImage}
      >
        <Image
          alt="gg"
          w={39}
          h={39}
          source={{
            uri: imageURL,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ImageLogin;
