import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBqii96O8cJU8tQBV5pqFXGZQ2sOavxaQw",
  authDomain: "my-first-project-5ab71.firebaseapp.com",
  projectId: "my-first-project-5ab71",
  storageBucket: "my-first-project-5ab71.appspot.com",
  messagingSenderId: "106516109876",
  appId: "1:106516109876:web:a2a5806b321d4581404861",
  measurementId: "G-361V3650ZL",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);
onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
