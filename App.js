import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
LogBox.ignoreLogs([
  "expo-app-loading is deprecated in favor of expo-splash-screen:",
]);
LogBox.ignoreLogs([
  "Sending `onAnimatedValueUpdate` with no listeners registered.",
]);
LogBox.ignoreLogs([
  "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
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
        <NavigationContainer>
          <StatusBar
            animated={true}
            backgroundColor="transparent"
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
