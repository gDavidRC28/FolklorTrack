import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

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