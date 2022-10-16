// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVKracoZmL_XSqiNAtOVzLBKD5zVGVA3w",
  authDomain: "digimon-dex.firebaseapp.com",
  projectId: "digimon-dex",
  storageBucket: "digimon-dex.appspot.com",
  messagingSenderId: "805559174159",
  appId: "1:805559174159:web:ae513590a1be6173060f7a"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const db = getFirestore(FirebaseApp);

