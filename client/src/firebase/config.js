// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaPK7Gk87hw4U8chY3qIJZ5Ei5Wbu9qF4",
  authDomain: "login-72e9f.firebaseapp.com",
  projectId: "login-72e9f",
  storageBucket: "login-72e9f.firebasestorage.app",
  messagingSenderId: "334712789308",
  appId: "1:334712789308:web:e7cc8e45fb4fc95eb56639",
  measurementId: "G-VE56Q8Y9SR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { analytics };
export default app;
