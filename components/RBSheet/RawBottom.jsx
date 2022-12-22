import RBSheet from "react-native-raw-bottom-sheet";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native"
import {useState, useEffect, useRef} from 'react'
import {TextArea, Spacer, Flex,Dimensions} from "native-base"
import { THEME_COLOR } from "../../Utils/themeColor";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const refRBSheet = useRef();
const RawBottom = () => {
    return (
        <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        openDuration={400}
        height={screenHeight * 0.9}
        customStyles={{
          container: {
            borderRadius: 20,
          },
          draggableIcon: {
            backgroundColor: "silver",
          },
        }}
      >
        <View style={styles.note}>
          <Text style={[styles.title, { fontSize: 20 }]}>
            Ghi chú giao hàng
          </Text>
        </View>
        <View>
          <Text>asasud</Text>
        </View>
        <Spacer />
        <Flex
          direction="row"
          style={{ paddingBottom: 10, margin: 16, alignItems: "center" }}
        >
          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.close();
            }}
            style={{ alignItems: "flex-end" }}
          >
            <View style={styles.noteButton}>
              <Text style={[styles.title, { color: "white" }]}>Hoàn tất</Text>
            </View>
          </TouchableOpacity>
        </Flex>
      </RBSheet>
    );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: "Quicksand-Bold",
  },
  note: {
    padding: 16,
  },
  noteButton: {
    backgroundColor: THEME_COLOR,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
});
export default RawBottom;