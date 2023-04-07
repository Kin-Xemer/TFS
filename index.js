import { registerRootComponent } from "expo";
import notifee, { EventType } from "@notifee/react-native";
import { createNavigationContainerRef } from "@react-navigation/native";
import App from "./App";
const navigationRef = createNavigationContainerRef();
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// notifee.onBackgroundEvent(async ({ type, detail }) => {
//   const { notification, pressAction } = detail;

//   if (type === EventType.PRESS) {
//     if (pressAction.id === 'default') {
//         console.log('User pressed the default action');

//         console.log('Điều hướng đến màn hình Home');
//         navigationRef.current?.navigate('NotiScreen');
//       }
//   }
//   await notifee.cancelNotification(notification.id);
//   console.log("background-event");
// });
registerRootComponent(App);
