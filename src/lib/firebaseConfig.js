// lib/firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
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
const auth = getAuth(app);

export { db, auth, app };
