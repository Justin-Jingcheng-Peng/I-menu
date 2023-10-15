import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  FIREBASE_API_KEY_LOCAL,
  FIREBASE_AUTH_DOMAIN_LOCAL,
  FIREBASE_PROJECT_ID_LOCAL,
  FIREBASE_STORAGE_BUCKET_LOCAL,
  FIREBASE_MESSAGING_SENDER_ID_LOCAL,
  FIREBASE_APP_ID_LOCAL,
} from "@env";
import * as firebaseAuth from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

let firebaseConfig;
firebaseConfig = {
  apiKey: FIREBASE_API_KEY_LOCAL,
  authDomain: FIREBASE_AUTH_DOMAIN_LOCAL,
  projectId: FIREBASE_PROJECT_ID_LOCAL,
  storageBucket: FIREBASE_STORAGE_BUCKET_LOCAL,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID_LOCAL,
  appId: FIREBASE_APP_ID_LOCAL,
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
initializeAuth(FIREBASE_APP, {
  persistence: reactNativePersistence(AsyncStorage),
});
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
