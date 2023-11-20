import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDCCHhFzvzegxHdcnf2ehgZIXfDPJZNVxw",
  authDomain: "chat-app-8473a.firebaseapp.com",
  projectId: "chat-app-8473a",
  storageBucket: "chat-app-8473a.appspot.com",
  messagingSenderId: "554134952168",
  appId: "1:554134952168:web:5cc92c26694ce58578115d",
  measurementId: "G-B59VWLZYTH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);