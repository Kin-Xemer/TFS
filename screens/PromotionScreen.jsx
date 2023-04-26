import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Provider } from "@ant-design/react-native";
import { Entypo } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState, useMemo, useEffect, useCallback } from "react";
import { Box, Flex, Spacer, Spinner } from "native-base";
import { THEME_COLOR } from "../Utils/themeColor";
import { ArrowUp3, ArrowDown3 } from "iconsax-react-native";
import { FONT } from "../Utils/themeFont.js";
import { RadioButton } from "react-native-paper";
import { BASE_URL } from "../services/baseURL.js";
import React from "react";
import TopBar from "../components/TopBar/index";
import { fetchPromotionByid } from "../redux/actions/promotionAction";
const PromotionScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const listPromotion = useSelector((state) => state.promotion.listPromotion);
  const selectedVoucher = useSelector((state) => state.promotion.promotion);
  useEffect(() => {
    console.log("listPromotion lenght", listPromotion.length);
  }, []);
  // const [selectedVoucher, setSelectedVoucher] = useState(null);

  const selectVoucher = useCallback(
    (voucher) => {
      dispatch(fetchPromotionByid(voucher));
    },
    [selectedVoucher,dispatch]
  );

  const handleRedeem = () => {
    if (selectedVoucher) {
    } else {
      alert("Vui lòng chọn voucher để sử dụng");
    }
  };
  const renderVoucher = (voucher, index) => {
    return (
      <TouchableOpacity
        style={styles.voucher}
        key={index}
        onPress={() => selectVoucher(voucher)}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.voucherTitle}>{voucher.promotionName}</Text>
            <Text style={styles.voucherDescription}>
              {voucher.promotionCode}
            </Text>
            {/* <Text style={styles.voucherExpiry}>
              Hạn sử dụng: {voucher.expiryDate}
            </Text> */}
          </View>
        </View>
        <View style={{ marginLeft: 36 }}>
          {/* <Image source={voucher.image} style={styles.voucherImage} /> */}
        </View>
        <Spacer />
        <RadioButton
          value={voucher}
          status={selectedVoucher === voucher ? "checked" : "unchecked"}
          color={THEME_COLOR}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TopBar
        title="CHỌN KHUYẾN MÃI"
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 12 }}
      >
        {listPromotion.map((voucher, index) => renderVoucher(voucher, index))}
      </ScrollView>
      <TouchableOpacity style={styles.redeemButton} onPress={handleRedeem}>
        <Text style={styles.redeemButtonText}>Sử dụng voucher</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  voucher: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  voucherImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  voucherTitle: {
    fontSize: 16,
    fontFamily: FONT.BOLD,
    marginBottom: 8,
  },
  voucherDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontFamily: FONT.MEDIUM,
  },
  voucherExpiry: {
    fontSize: 12,
    color: "#999",
  },
  redeemButton: {
    backgroundColor: THEME_COLOR,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  redeemButtonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: FONT.BOLD,
  },
});
export default PromotionScreen;
