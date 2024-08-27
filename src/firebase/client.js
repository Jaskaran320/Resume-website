// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "resume-website-457ee.firebaseapp.com",
  databaseURL: "https://resume-website-457ee-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "resume-website-457ee",
  storageBucket: "resume-website-457ee.appspot.com",
  messagingSenderId: "91412892308",
  appId: "1:91412892308:web:1b60ae6fd77c8cd1510281",
  measurementId: "G-081FR0B9B4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);