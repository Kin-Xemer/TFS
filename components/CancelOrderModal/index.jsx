import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
const CancelOrderModal = (props) => {
  const { isVisible, onCancel, onConfirm } = props;
  const [selectedReason, setSelectedReason] = useState("");

  const reasons = ["Sản phẩm hết hàng", "Đổi ý không mua nữa", "Khác"];

  const handleCancel = () => {
    setSelectedReason("");
    onCancel();
  };

  const handleConfirm = () => {
    onConfirm(selectedReason);
    setSelectedReason("");
  };

  return (
    <Modal
      hasBackdrop={true}
      isVisible={isVisible}
      onBackdropPress={()=>{console.log("press")}}
      onSwipeComplete={onCancel}
      swipeDirection={["down"]}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>Lý do huỷ đơn hàng</Text>
          {reasons.map((reason, index) => (
            <TouchableOpacity
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
              onPress={handleCancel}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              style={[
                styles.confirmButton,
                selectedReason === "" && styles.disabledConfirmButton,
              ]}
              disabled={selectedReason === ""}
            >
              <Text style={styles.confirmButtonText}>Xác nhận</Text>
            </TouchableOpacity>
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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    minWidth: 280,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  reasonButton: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    minWidth: 200,
  },
  selectedReasonButton: {
    borderColor: "blue",
  },
  reasonText: {
    fontSize: 16,
    textAlign: "center",
  },
  selectedReasonText: {
    color: "blue",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#eeeeee",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "black",
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#2196f3",
  },
});

export default CancelOrderModal;
