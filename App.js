import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { LogBox } from "react-native";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import useFonts from "./Utils/useFonts";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import stores from "./redux/stores"
import {Provider} from "react-redux"
import AppNavigator from "./AppNavigator";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { THEME_COLOR } from './Utils/themeColor';
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

  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: {THEME_COLOR}}}
        contentContainerStyle={{ alignItems: "center",justifyContent: "center", paddingLeft: 60 }}
        text2Style={{
          fontSize: 15,
          color:"#666",
          fontFamily: 'Quicksand-Regular',
        }}
      />
    ),
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
        <StatusBar animated={true} backgroundColor="white" barStyle="default" />
        <NativeBaseProvider>
          <AppNavigator />
          <Toast config={toastConfig} />
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
