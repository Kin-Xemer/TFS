import { useState, useEffect, useRef } from "react";
import { AlertDialog, Button, Center, NativeBaseProvider, Text } from "native-base";
import { FONT } from "../../Utils/themeFont";
import { THEME_COLOR } from '../../Utils/themeColor';

const ConfirmDelete = (props) => {
    const {onDelete, isOpen, setIsOpen, title, content, cancelText, deleteText} = props;


  const onClose = () => setIsOpen(false);

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
            <Text fontFamily={FONT.REGULAR} style={{fontSize: 15}}>{content}</Text>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                <Text fontFamily={FONT.REGULAR} style={{fontSize: 15}}>{cancelText}</Text>
              </Button>
              <Button backgroundColor={THEME_COLOR} onPress={()=>{
                onDelete();
              }}>
              <Text fontFamily={FONT.SEMI} style={{fontSize: 15, color:"white"}}>{deleteText}</Text>
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default ConfirmDelete;
