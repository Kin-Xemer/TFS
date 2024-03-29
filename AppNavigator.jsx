import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Home2, NotificationBing, Note, User } from "iconsax-react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import axios from "axios";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import Home from "./screens/HomeScreen";
import FoodInformationScreen from "./screens/FoodInformationScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreenn from "./screens/LoginScreenn";
import MoreScreen from "./screens/MoreScreen";
import MapScreen from "./screens/MapScreen";
import SelectStore from "./screens/SelectStore";
import OrderScreen from "./screens/OrderScreen";
import MyOrderDetailScreen from "./screens/MyOrderDetailScreen";
import ZaloPaymentScreen from "./screens/ZaloPaymentScreen";
import ZaloPaymentSuccessScreen from "./screens/ZaloPaymentSuccessScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PaymentScreen from "./screens/PaymentScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import PartyScreen from "./screens/PartyScreen";
import EditPartyScreen from "./screens/EditPartyScreen";
import AddFoodMenu from "./screens/AddFoodMenu";
import MyFeedbackScreen from "./screens/MyFeedbackScreen";
import EditFeedbackScreen from "./screens/EditFeedbackScreen";
import ProfileScreens from "./screens/ProfileScreens";
import ProfileInfoScreen from "./screens/ProfileInfoScreen";
import FeedbackDetailScreen from "./screens/FeedbackDetailScreen";
import ProfileEditScreen from "./screens/ProfileEditScreen";
import PromotionScreen from "./screens/PromotionScreen";
import NotiScreen from "./screens/NotiScreen";
import OTPScreen from "./screens/OTPScreen";
import { THEME_COLOR } from "./Utils/themeColor";
import { Provider } from "@ant-design/react-native";
import { GOOGLE_MAPS_APIKEY } from "./Utils/getGoogleAPI";
import { useNavigation } from "@react-navigation/native";
import { FONT } from "./Utils/themeFont";
import { Badge } from "native-base";
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const AppNavigator = () => {
  const navigation = useNavigation();
  const numberNoti = useSelector((state) => state.noti.numberNoti);
  return (
    <Provider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
          gestureDirection: "horizontal",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="TabNaviHome" component={TabNavigator} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="SelectStore" component={SelectStore} />
        <Stack.Screen
          name="LoginScreenn"
          component={LoginScreenn}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="MyOrderDetailScreen"
          component={MyOrderDetailScreen}
        />
        <Stack.Screen name="PartyScreen" component={PartyScreen} />
        <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="ZaloPaymentScreen" component={ZaloPaymentScreen} />
        <Stack.Screen
          name="ZaloPaymentSuccessScreen"
          component={ZaloPaymentSuccessScreen}
        />
        <Stack.Screen name="AddFoodMenu" component={AddFoodMenu} />
        <Stack.Screen name="EditPartyScreen" component={EditPartyScreen} />
        <Stack.Screen name="MyFeedbackScreen" component={MyFeedbackScreen} />
        <Stack.Screen
          name="EditFeedbackScreen"
          component={EditFeedbackScreen}
        />
        <Stack.Screen
          name="FeedbackDetailScreen"
          component={FeedbackDetailScreen}
        />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen name="ProfileInfoScreen" component={ProfileInfoScreen} />
        <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
        <Stack.Screen name="PromotionScreen" component={PromotionScreen} />
      </Stack.Navigator>
    </Provider>
  );
};
const HomeScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        gestureDirection: "horizontal",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="FoodInformationScreen"
        component={FoodInformationScreen}
      />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="MoreScreen" component={MoreScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const numberNoti = useSelector((state) => state.noti.numberNoti);
  return (
    <Tab.Navigator
      labled={true}
      activeColor={THEME_COLOR}
      shifting={true}
      initialRouteName="HomeScreen"
      barStyle={{ backgroundColor: "white", paddingTop: 0 }}
      tabBarOptions={{ color: "white" }}
      tabBarLabelStyle={{ fontFamily: FONT.BOLD }}
      screenOptions={{
        headerShown: false,
      }}
      backBehavior="history"
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: (
            <Text style={{ fontFamily: FONT.BOLD, fontSize: 12 }}>
              Trang chủ
            </Text>
          ),
          tabBarIcon: ({ color }) => <Home2 size={26} color={color} />,
        }}
      />
      <Tab.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          tabBarLabel: (
            <Text style={{ fontFamily: FONT.BOLD, fontSize: 12 }}>
              Đơn hàng
            </Text>
          ),
          tabBarIcon: ({ color }) => <Note size={26} color={color} />,
        }}
      />
      <Tab.Screen
        name="NotiScreen"
        component={NotiScreen}
        options={{
          tabBarLabel: (
            <Text style={{ fontFamily: FONT.BOLD, fontSize: 14 }}>
              Thông báo
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <View>
              {numberNoti !== 0 ? (
                <Badge // bg="red.400"
                  colorScheme="danger"
                  rounded="xl"
                  mb={-3}
                  mr={-1}
                  zIndex={1}
                  variant="solid"
                  alignSelf="flex-end"
                  style={{
                    paddingRight: 5,
                    paddingLeft: 5,
                    paddingTop: 1,
                    paddingBottom: 1,
                  }}
                  _text={{
                    fontFamily: "Quicksand-Bold",
                    fontSize: 8,
                  }}
                >
                  {numberNoti}
                </Badge>
              ) : (
                <></>
              )}
              <NotificationBing size={26} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MoreScreen"
        component={ProfileScreens}
        options={{
          tabBarLabel: (
            <Text style={{ fontFamily: FONT.BOLD, fontSize: 12 }}>
              Thông tin
            </Text>
          ),
          tabBarIcon: ({ color }) => <User size={26} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
