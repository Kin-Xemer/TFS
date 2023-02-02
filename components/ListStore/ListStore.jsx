import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const ListStore = (props) => {
  const { store, index } = props;
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <View style={styles.storeItem} key={index}>
        <Text>{store.latitude + " " + store.longitude}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  storeItem: {
    width: "100%",
    borderWidth: 0.8,
    borderColor: "gray",
    marginBottom: 4,
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 15,
  },
});
export default ListStore;
