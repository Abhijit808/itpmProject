import { getToken, onMessage } from "firebase/messaging";
import { message } from "../firebase/firebaseconfgig";
// import { adduserFCM } from "../queries/setUserNotifications";
import { getFCM } from "../queries/getuserFcm";

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    }
  });
}

// const messaging = getMessaging();
requestPermission();
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}
export const storeFCMToken = async (user: any) => {
  console.log(user);

  const FCMExists = await getFCM(user.uid);
  console.log({ ...FCMExists.data() });

  const GetToken = getToken(message, {
    vapidKey:
      "BGkW3-tZOwPDheTlkFSad7SCk40HzOu-wlZ8dXjbt2iWQP2WUwvA9qpJb5YXwIi30-uSNcOoOopyEW5sy5mH910",
  })
    .then(async (currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        console.log(currentToken);
        // if (UsersFcm === false) {
        //   return;
        // }
        // await adduserFCM({
        //   userFCM: { currenttoken: currentToken, userId: user.uid },
        // });
        // ...
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });

  await GetToken;
};

export const getmessage = () => {
  onMessage(message, (payload) => {
    console.log("Message received. ", payload);
    // ...
  });
};
