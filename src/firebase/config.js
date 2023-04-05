// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDP3_zxlY-v0ptDDp_BFJQ8P1K59cSA-dc",
  authDomain: "klashmor-23870.firebaseapp.com",
  projectId: "klashmor-23870",
  storageBucket: "klashmor-23870.appspot.com",
  messagingSenderId: "1032412431568",
  appId: "1:1032412431568:web:5a8aadfefb761628160ad5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
