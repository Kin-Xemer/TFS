import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LogBox } from "react-native";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import useFonts from "./Utils/useFonts";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import stores from "./redux/stores";
import { Provider } from "react-redux";
import AppNavigator from "./AppNavigator";
import * as Linking from "expo-linking";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { THEME_COLOR } from "./Utils/themeColor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
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
  const deepLinksConf = {
    screens: {
      TabNaviHome: {
        screens: {
          NotiScreen: { path: "notiscreen" },
        },
      },
      MyFeedbackScreen:{
        path:"feed"
      }
    },
  };
  const linking = {
    prefixes: ["demozpdk://","https://app.tfs.com"],
    config: deepLinksConf,
    async getInitialURL() {
      // Check if app was opened from a deep link
      const url = await Linking.getInitialURL();

      if (url != null) {
        return url;
      }

      // Check if there is an initial firebase notification
      const message = await messaging().getInitialNotification();

      // Get the `url` property from the notification which corresponds to a screen
      // This property needs to be set on the notification payload when sending it
      return message?.data?.url;
    },
  };
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
        <NavigationContainer
          linking={linking}
          fallback={<ActivityIndicator size="large" />}
        >
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
