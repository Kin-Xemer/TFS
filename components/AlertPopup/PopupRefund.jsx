import { useState, useEffect, useRef } from "react";
import {
  AlertDialog,
  Button,
  Center,
  NativeBaseProvider,
  Text,
} from "native-base";
import { FONT } from "../../Utils/themeFont";
import { THEME_COLOR } from "../../Utils/themeColor";

const PopupRefund = (props) => {
  const {
    isOpen,
    setIsOpen,
    title,
    content,
    content2,
    cancelText,
    onConfirm,
  } = props;

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
          <AlertDialog.Header>{title}</AlertDialog.Header>
          <AlertDialog.Body>
            <Text fontFamily={FONT.REGULAR} style={{ fontSize: 15 }}>
              {content}
            </Text>
            <Text fontFamily={FONT.REGULAR} style={{ fontSize: 15 }}>
              {content2 ? content2 : ""}
            </Text>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              {cancelText ? (
                <Button
                  backgroundColor={"transparent"}
                  onPress={() => {
                    onClose();
                  }}
                >
                  <Text
                    fontFamily={FONT.SEMI}
                    style={{ fontSize: 15, color: "black" }}
                  >
                    {cancelText}
                  </Text>
                </Button>
              ) : (
                <></>
              )}
              <Button
                backgroundColor={THEME_COLOR}
                onPress={() => {
                 onConfirm()
                }}
              >
                <Text
                  fontFamily={FONT.SEMI}
                  style={{ fontSize: 15, color: "white" }}
                >
                  Đồng ý
                </Text>
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default PopupRefund;
