import messaging from '@react-native-firebase/messaging';


export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken();
  }
}

const GetFCMToken=async()=>{
    const fcmtoken=await messaging().getToken();
    if(fcmtoken)
    {
        console.log("fcmtoken",fcmtoken);
        return;
    }
}

export const NotificationListener=()=>
{
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
    messaging().onMessage(async remoteMessage=>{
        console.log('notification on froground state.....',remoteMessage)
    })
}
