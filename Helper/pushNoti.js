import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
export async function requestNotiPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
}
export const GetFCMToken = async () => {
  let fcmtoken = await AsyncStorage.getItem("fcmtoken");
  console.log("old token", fcmtoken);
  if (!fcmtoken) {
    await messaging().registerDeviceForRemoteMessages();
    let fcmtoken = await messaging().getToken();
    
    if (fcmtoken) {
      try {
        await AsyncStorage.setItem("fcmtoken", fcmtoken);
        console.log("new token", fcmtoken);
      } catch (error) {
        console.log(error, "error in gettoken");
      }
    }
  }
};
export const NotiListener = () => {
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
 messaging().onMessage(async remoteMessage =>{
    console.log("noti on foreground state...",remoteMessage)
 })
    });
};
