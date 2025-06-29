// firebase.js
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiNE2DJnrKcJcWeWR37WGUhN8WDQjcH2c",
  authDomain: "refinetext-ai.firebaseapp.com",
  projectId: "refinetext-ai",
  storageBucket: "refinetext-ai.appspot.com", // ✅ Fixed here
  messagingSenderId: "402521905574",
  appId: "1:402521905574:web:4340ead504f791ea019767",
  measurementId: "G-2XDETS25N1"
};

const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);