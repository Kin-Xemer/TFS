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
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {  Flex, Input, Spacer } from "native-base";
import { THEME_COLOR } from "../Utils/themeColor";
import { SearchNormal1 } from "iconsax-react-native";
import { FONT } from "../Utils/themeFont.js";
import { RadioButton } from "react-native-paper";
import React from "react";
import { Toast } from "@ant-design/react-native";
import TopBar from "../components/TopBar/index";
import { addPromotion, getAllPromotion,} from "../redux/actions/promotionAction";
import { formatVNDate } from '../Utils/convertDate';
const PromotionScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const listPromotion = useSelector((state) => state.promotion.listPromotion);
  const promotionApplied = useSelector((state) => state.cart.promotion);
  const selectedVoucher = useSelector((state) => state.promotion.promotion);
  const [codeInput, setCodeInput] = useState("");
  const [voucherCodeSelected, setVoucherCodeSelected] = useState(null);
  useEffect(() => {
    dispatch(getAllPromotion());
   if(promotionApplied){
    setVoucherCodeSelected(promotionApplied)
   }
  }, []);

  const handleSelectedVoucher = 
    (voucher) => {
    console.log(voucherCodeSelected)
    console.log(voucher)
     if(voucherCodeSelected === voucher){
      setVoucherCodeSelected(null);
     }else{ 
      setVoucherCodeSelected(voucher);
     }
    };

  const handleRedeem = () => {

      Toast.success("Áp dụng thành công",1)
      dispatch(addPromotion(voucherCodeSelected));
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    
  };
  const handleApplyCode = (codeInput) => {
    const foundPromotion = listPromotion.find(
      (promotion) => promotion.promotionCode.toLowerCase().trim() === codeInput.toLowerCase().trim()
    );
    if (foundPromotion) {
     Toast.success("Đã áp dụng",1)
      setVoucherCodeSelected(foundPromotion)
      
    } else {
      Toast.fail("Không tìm thấy mã khuyến mãi", 1)
    }
  };
  const renderVoucher = (voucher, index) => {
    return (
      <TouchableOpacity
        style={styles.voucher}
        key={index}
        activeOpacity={0.7}
        onPress={() => handleSelectedVoucher(voucher)}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.voucherTitle}>{voucher.promotionName}</Text>
            <Text style={styles.voucherDescription} numberOfLines={2} >
              Nhập mã "{voucher.promotionCode}" đển giảm {voucher.discountPercent}% tổng giá trị đơn hàng
            </Text>
            <Text style={styles.voucherExpiry}>
              Hạn sử dụng: {formatVNDate(voucher.endDate)}
            </Text>
          </View>
        </View>
        <Spacer />
        <RadioButton
          value={voucher}
          status={
            voucherCodeSelected && voucherCodeSelected.promotionCode === voucher.promotionCode
              ? "checked"
              : "unchecked"
          }
          onPress={() => handleSelectedVoucher(voucher)}
          color={THEME_COLOR}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {listPromotion.length > 0 ? (
        <>
          <TopBar
            title="CHỌN KHUYẾN MÃI"
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
          />
          <Flex flexDirection="row">
            <View style={styles.textInputContainer}>
              <Input
                focusOutlineColor="red"
                style={{ fontFamily: FONT.REGULAR }}
                variant="rounded"
                bgColor="transparent"
                size="30px"
                borderWidth={0}
                h={36}
                onChangeText={(text) => {
                  setCodeInput(text);
                }}
                InputLeftElement={
                  <SearchNormal1
                    size="14"
                    color={THEME_COLOR}
                    variant="Outline"
                  />
                }
                placeholder="Nhập mã khuyến mãi "
              />
            </View>
            <TouchableOpacity
              style={styles.applyButton}
              activeOpacity={0.7}
              onPress={() => handleApplyCode(codeInput)}
            >
              <Text
                style={{ fontSize: 16, fontFamily: FONT.SEMI, color: "white" }}
              >
                Áp dụng
              </Text>
            </TouchableOpacity>
          </Flex>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 12 }}
          >
            {listPromotion.map((voucher, index) =>
              renderVoucher(voucher, index)
            )}
          </ScrollView>
          <TouchableOpacity style={styles.redeemButton} onPress={handleRedeem}>
            <Text style={styles.redeemButtonText}>Dùng ngay</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Đang không có khuyến mãi</Text>
      )}
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
    maxWidth:"90%",
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
  textInputContainer: {
    paddingLeft: 16,
    borderWidth: 0.5,
    borderColor: "#AFACAC",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    width: "80%",
    marginTop: 16,
  },
  applyButton: {
    backgroundColor: THEME_COLOR,
    paddingHorizontal: 11,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    marginTop: 16,
  },
});
export default PromotionScreen;
