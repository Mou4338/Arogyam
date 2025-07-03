// lib/firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPkUwZ_etOrNM3iGm0U96NuAq9rg80mDM",
  authDomain: "arogyam-386.firebaseapp.com",
  projectId: "arogyam-386",
  storageBucket: "arogyam-386.firebasestorage.app",
  messagingSenderId: "674850010921",
  appId: "1:674850010921:web:3fab4559e06af254e02938",
  measurementId: "G-J2YSPL1J86"
};

// Initialize Firebase only once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db,app };
