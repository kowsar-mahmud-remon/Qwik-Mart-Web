import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuLLHtXLVcrL_5cX--Rozpl_Wqul-UQiI",
  authDomain: "qwikmart-ca.firebaseapp.com",
  projectId: "qwikmart-ca",
  storageBucket: "qwikmart-ca.appspot.com",
  messagingSenderId: "946104787854",
  appId: "1:946104787854:web:cd9454ed159a5017167adf",
  measurementId: "G-2G5TK3TF3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



