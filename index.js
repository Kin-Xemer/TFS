import { registerRootComponent } from 'expo';
import notifee, { EventType } from '@notifee/react-native';
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
notifee.onBackgroundEvent(async ({type, detail}) => {
    const {notification, pressAction} = detail;

    if (type === EventType.PRESS) {
        console.log('User pressed an action with the id: ', pressAction.id);
        // navigate here
    }
    await notifee.cancelNotification(notification.id);
    console.log('background-event');
});
registerRootComponent(App);
