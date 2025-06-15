// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCiNE2DJnrKcJcWeWR37WGUhN8WDQjcH2c",
  authDomain: "refinetext-ai.firebaseapp.com",
  projectId: "refinetext-ai",
  storageBucket: "refinetext-ai.firebasestorage.app",
  messagingSenderId: "402521905574",
  appId: "1:402521905574:web:4340ead504f791ea019767",
  measurementId: "G-2XDETS25N1"
};

const app = initializeApp(firebaseConfig);

// ✅ Export what you need
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);