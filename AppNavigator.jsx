import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import Home from "./screens/HomeScreen";

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
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      labled={true}
      activeColor={"#d83a3a"}
      shifting={true}
      initialRouteName="HomeScreen"
      barStyle={{ backgroundColor: "white", paddingTop: 0 }}
      tabBarOptions={{ color: "white"}}
      screenOptions={{
        headerShown: false,
      }}
      
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Trang Chủ",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="RequestScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Lịch Hẹn",
          tabBarIcon: ({ color }) => (
            <Ionicons name="alarm-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="NotiScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Thông Báo",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="MoreScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Thêm",
          tabBarIcon: ({ color }) => (
            <Feather name="more-horizontal" size={26} color={color} />
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
