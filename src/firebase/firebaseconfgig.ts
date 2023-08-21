import { initializeApp } from "firebase/app";
import { browserSessionPersistence, getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_APP_FIREBASE_APIKEY,
  // authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_APP_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_APP_MESSEAGING_SENDER_ID,
  // appId: import.meta.env.VITE_APP_APP_ID
  apiKey: "AIzaSyBqii96O8cJU8tQBV5pqFXGZQ2sOavxaQw",
  authDomain: "my-first-project-5ab71.firebaseapp.com",
  projectId: "my-first-project-5ab71",
  storageBucket: "my-first-project-5ab71.appspot.com",
  messagingSenderId: "106516109876",
  appId: "1:106516109876:web:a2a5806b321d4581404861"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
setPersistence(auth,browserSessionPersistence)
const store =getFirestore(app)
const storage = getStorage(app)
export {auth,store,storage}