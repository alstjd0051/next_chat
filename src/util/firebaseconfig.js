// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaoLMgiC4ndizflPynuaeY19CJh_qsPSk",
  authDomain: "fir-chat-next.firebaseapp.com",
  databaseURL:
    "https://fir-chat-next-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-chat-next",
  storageBucket: "fir-chat-next.appspot.com",
  messagingSenderId: "470355530263",
  appId: "1:470355530263:web:7ced798470cf0d580f8252",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
