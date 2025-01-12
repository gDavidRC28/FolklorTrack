// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz2G40aKQb97_BqVsUW8tPH2yAiKwBURE",
  authDomain: "folklortrack.firebaseapp.com",
  projectId: "folklortrack",
  storageBucket: "folklortrack.firebasestorage.app",
  messagingSenderId: "842002469598",
  appId: "1:842002469598:web:b3bbb0dc99515cf7b2284f"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;