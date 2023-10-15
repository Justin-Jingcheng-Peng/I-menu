import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import dotenv from "dotenv";
dotenv.config();

let firebaseConfig;
firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY_LOCAL,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN_LOCAL,
  projectId: process.env.FIREBASE_PROJECT_ID_LOCAL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET_LOCAL,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID_LOCAL,
  appId: process.env.FIREBASE_APP_ID_LOCAL,
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
initializeAuth(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
