// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyB85aRl1zLr6H6BIt12UbkoBZwDKjIa1gY",
  authDomain: "next-page-d92e6.firebaseapp.com",
  projectId: "next-page-d92e6",
  storageBucket: "next-page-d92e6.firebasestorage.app",
  messagingSenderId: "231220961438",
  appId: "1:231220961438:web:551af6e967cd7c70371b8f",
  measurementId: "G-BRXYDLEMTK"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
