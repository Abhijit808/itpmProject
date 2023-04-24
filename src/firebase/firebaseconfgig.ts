import { initializeApp } from "firebase/app";
import { browserSessionPersistence, getAuth, setPersistence } from "firebase/auth";

const firebaseConfig = {
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
export {auth}