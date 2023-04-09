
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FONT } from "../../Utils/themeFont";
import { convertDate } from "../../Utils/convertDate";
const OrderInfor = (props) => {
  const { order, restaurant } = props;
  return (
    <View style={styles.container}>
      <View style={styles.inforView}>
        <Text style={styles.preinfor}>
          Mã đơn hàng: <Text style={styles.infor}>#{order.id}</Text>
        </Text>
      </View>
      <View style={styles.inforView}>
        <Text style={styles.preinfor}>
          Thời gian đặt hàng:{" "}
          <Text style={styles.infor}>{convertDate(order.orderDate)}</Text>
        </Text>
      </View>
      <View style={styles.inforView}>
        <Text style={styles.preinfor}>
          Phương thức thanh toán: <Text style={styles.infor}>{order.paymentMethod ==="cash"? "Tiền mặt":"ZaloPay"}</Text>
        </Text>
      </View>
      <View style={styles.inforView}>
        <Text style={styles.preinfor}>Giao từ</Text>
      </View>
      <View style={styles.inforView}>
        <Text style={styles.infor}>{restaurant.restaurantName}</Text>
      </View>
      <View style={styles.inforView}>
        <Text style={styles.preinfor}>Địa chỉ nhận hàng</Text>
      </View>
      <View style={styles.inforView}>
        <Text style={styles.infor}>{order.deliveryAddress}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  preinfor: {
    fontSize: 15,
    fontFamily: FONT.REGULAR,
  },
  infor: {
    fontFamily: FONT.BOLD,
    fontSize: 16,
  },
  inforView: {
    marginVertical: 4,
  },
});
export default OrderInfor;
