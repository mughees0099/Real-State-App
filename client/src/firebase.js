// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-92aab.firebaseapp.com",
  projectId: "mern-real-estate-92aab",
  storageBucket: "mern-real-estate-92aab.appspot.com",
  messagingSenderId: "214699873892",
  appId: "1:214699873892:web:4020bf631ffb2e3424f171",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
