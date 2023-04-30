import { useState, useEffect, useRef } from "react";
import {
  AlertDialog,
  Button,
  Center,
  Flex,
  NativeBaseProvider,
  Spacer,
  Text,
  View,
} from "native-base";
import { FONT } from "../../Utils/themeFont";
import { THEME_COLOR } from "../../Utils/themeColor";
import FoodPartyItem from "../FoodOrderItem/FoodPartyItem";

const AlertShowFood = (props) => {
  const { listFood, isOpen, setIsOpen,quantity } = props;

  const onClose = () => {
    setIsOpen(false);
  };

  const cancelRef = useRef(null);
  return (
    <Center flex={1} px="3">
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header><Text style={{color: 'black', fontFamily:FONT.BOLD, fontSize: 18}}>Chi tiết thực đơn</Text></AlertDialog.Header>
          <AlertDialog.Body>
            {listFood.map((item, index) => {
              return (
                <View key={index}>
                  <FoodPartyItem item={item} />
                </View>
              );
            })}
           <Flex flexDirection="row">
           <Spacer/>
            <Text
              style={{ fontFamily: FONT.SEMI, fontSize: 13, color: "black", marginTop: 12 }}
            >
              Số lượng: {quantity} bàn 
            </Text>
           </Flex>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                backgroundColor={THEME_COLOR}
                onPress={() => {
                  onClose();
                }}
              >
                <Text
                  fontFamily={FONT.SEMI}
                  style={{ fontSize: 15, color: "white" }}
                >
                  Xác nhận
                </Text>
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default AlertShowFood;
