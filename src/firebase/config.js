// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP9gZnxflGr0Q-vIBT169yRhv9bDnDZwU",
  authDomain: "todolistmanh.firebaseapp.com",
  projectId: "todolistmanh",
  storageBucket: "todolistmanh.appspot.com",
  messagingSenderId: "148840187284",
  appId: "1:148840187284:web:a3f3417a8299b490427b81",
  measurementId: "G-W1X3Q1ZHYE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
