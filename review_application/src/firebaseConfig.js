// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD-qi1q0OxCDJ9GCEra8GKT4Wec2XeN9oc",
  authDomain: "reviewapplication-c5e03.firebaseapp.com",
  projectId: "reviewapplication-c5e03",
  storageBucket: "reviewapplication-c5e03.firebasestorage.app",
  messagingSenderId: "145027040560",
  appId: "1:145027040560:web:d501224441c6a13af934f5",
  measurementId: "G-0EBN25X4GC"
};

// initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // initialize Firestore
const authentication = getAuth(app); // initialize Authentication
// const analytics = getAnalytics(app); // initialize analytics

export { firestore, authentication};
