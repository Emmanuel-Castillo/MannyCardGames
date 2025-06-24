// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";

// Ignore error, Typescript issue
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN1ZUAf1qAo6YPrJsNVvH0YxjVXSe2vo4",
  authDomain: "mannycardgames.firebaseapp.com",
  projectId: "mannycardgames",
  storageBucket: "mannycardgames.firebasestorage.app",
  messagingSenderId: "115336863766",
  appId: "1:115336863766:web:2e0a1c8c32cfbfb5c55537"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// Also set react native auth persistance using async storage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

// Initialize Firebase Cloud Firestore and get a reference to the service
export const db = getFirestore(app)