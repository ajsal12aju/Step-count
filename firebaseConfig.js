// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXNkkAaM4r5k5zlfRA0kEaMCnd6hsBw80",
  authDomain: "stepcounter-4f04b.firebaseapp.com",
  projectId: "stepcounter-4f04b",
  storageBucket: "stepcounter-4f04b.firebasestorage.app",
  messagingSenderId: "77643077098",
  appId: "1:77643077098:web:5caad8efa0fc8fe5410e93",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const userRef = collection(db, "users");
export const dailyGoalsRef = collection(db, "dailyGoals");
