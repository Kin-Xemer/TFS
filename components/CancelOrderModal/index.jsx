import { Spacer } from "native-base";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { THEME_COLOR } from "../../Utils/themeColor";
import { FONT } from "../../Utils/themeFont";
const CancelOrderModal = (props) => {
  const {
    isVisible,
    onCancel,
    onConfirm,
    setSelectedReason,
    selectedReason,
    isDone,
  } = props;

  const reasons = [
    "Món ăn không phù hợp",
    "Thấy món nơi khác rẻ hơn",
    "Chuẩn bị món lâu",
    "Đổi ý không mua nữa",
    "Lý do cá nhân",
    "Khác",
  ];

  const handleCancel = () => {
    setSelectedReason("");
    onCancel();
  };

  const handleConfirm = (selectedReason) => {
    onConfirm(selectedReason);
  };

  return (
    <Modal
      hasBackdrop={true}
      isVisible={isVisible}
      onBackdropPress={handleCancel}
      onSwipeComplete={handleCancel}
      swipeDirection={["down"]}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>Lý do huỷ đơn hàng</Text>
          {reasons.map((reason, index) => (
            <TouchableOpacity
              activeOpacity={0.7}
              key={index}
              onPress={() => setSelectedReason(reason)}
              style={[
                styles.reasonButton,
                selectedReason === reason && styles.selectedReasonButton,
              ]}
            >
              <Text
                style={[
                  styles.reasonText,
                  selectedReason === reason && styles.selectedReasonText,
                ]}
              >
                {reason}
              </Text>
            </TouchableOpacity>
          ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleCancel}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
            {isDone ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleConfirm}
                style={[
                  styles.confirmButton,
                  selectedReason === "" && styles.disabledConfirmButton,
                ]}
                disabled={selectedReason === ""}
              >
                <Text style={styles.confirmButtonText}>Xác nhận</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleConfirm}
                style={[
                  styles.confirmButton,
                   styles.disabledConfirmButton,
                ]}
                disabled={true}
              >
                <Text style={styles.confirmButtonText}>Đang huỷ</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    minWidth: 280,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: FONT.BOLD,
    marginBottom: 20,
  },
  reasonButton: {
    borderWidth: 1,
    borderColor: "#8c8c8c",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    minWidth: 200,
  },
  selectedReasonButton: {
    borderColor: THEME_COLOR,
  },
  reasonText: {
    fontSize: 16,
    fontFamily: FONT.MEDIUM,
    textAlign: "center",
  },
  selectedReasonText: {
    color: THEME_COLOR,
    fontFamily: FONT.BOLD,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 40,
    borderRadius: 5,
    backgroundColor: "#eeeeee",
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: FONT.BOLD,
    color: "black",
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: FONT.BOLD,
    color: "white",
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: THEME_COLOR,
  },
  disabledConfirmButton:{
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#f99b9b",
  }
});

export default CancelOrderModal;
