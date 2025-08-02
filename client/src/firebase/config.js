// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAaPK7Gk87hw4U8chY3qIJZ5Ei5Wbu9qF4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "login-72e9f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "login-72e9f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "login-72e9f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "334712789308",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:334712789308:web:e7cc8e45fb4fc95eb56639",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-VE56Q8Y9SR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
