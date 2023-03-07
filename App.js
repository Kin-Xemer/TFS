import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { LogBox } from "react-native";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import useFonts from "./Utils/useFonts";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import stores from "./redux/stores";
import { Provider } from "react-redux";
import AppNavigator from "./AppNavigator";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { THEME_COLOR } from "./Utils/themeColor";
import linking from "./linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
LogBox.ignoreLogs([
  "expo-app-loading is deprecated in favor of expo-splash-screen:",
]);
LogBox.ignoreLogs([
  "Sending `onAnimatedValueUpdate` with no listeners registered.",
]);

export default function App() {
  const [IsReady, SetIsReady] = useState(false);
  const LoadFonts = async () => {
    await useFonts();
  };



  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  } else
    return (
      <Provider store={stores}>
        <NavigationContainer linking={linking}>
          <StatusBar
            animated={true}
            backgroundColor="white"
            barStyle="default"
          />
          <NativeBaseProvider>
            <AppNavigator />
          </NativeBaseProvider>
        </NavigationContainer>
      </Provider>
      // <View style={styles.container}>
      //   <Text>
      //     askdjhsakdhsk
      //   </Text>
      // </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
