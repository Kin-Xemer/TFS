import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import{Home2, NotificationBing, Note, User} from "iconsax-react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import Home from "./screens/HomeScreen";
import FoodInformationScreen from "./screens/FoodInformationScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreenn from "./screens/LoginScreenn";
import MoreScreen from "./screens/MoreScreen";
import { THEME_COLOR } from "./Utils/themeColor";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        gestureDirection: "horizontal",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="TabNaviHome" component={TabNavigator} />  
    </Stack.Navigator>
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
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FoodInformationScreen" component={FoodInformationScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="LoginScreenn" component={LoginScreenn} />
      <Stack.Screen name="MoreScreen" component={MoreScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      labled={true}
      activeColor={THEME_COLOR}
      shifting={true}
      initialRouteName="HomeScreen"
      barStyle={{ backgroundColor: "white", paddingTop: 0 }}
      tabBarOptions={{ color: "white"}}
      tabBarLabelStyle={{ fontFamily: "Quicksand-Bold" }}
      screenOptions={({     
        headerShown: false,
      })}
      
      
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: <Text style={{fontFamily: "Quicksand-SemiBold", fontSize: 12}}>Trang chủ</Text>,
          tabBarIcon: ({ color }) => (
            <Home2 size={26}  color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="OrderScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: <Text style={{fontFamily: "Quicksand-SemiBold", fontSize: 12}}>Đơn hàng</Text>,
          tabBarIcon: ({ color }) => (
          <Note size={26}  color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="NotiScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: <Text style={{fontFamily: "Quicksand-SemiBold", fontSize: 14}}>Thông báo</Text>,
          tabBarIcon: ({ color }) => (
            <NotificationBing size={26}  color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="MoreScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: <Text style={{fontFamily: "Quicksand-SemiBold", fontSize: 12}}>Thông tin</Text>,
          tabBarIcon: ({ color }) => (
            <User size={26}  color={color}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const SettingScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MoreScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
