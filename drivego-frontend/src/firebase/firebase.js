// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHD_tdXKLJv53H-g5kU2Aw15UnqSMe35s",
  authDomain: "drivego-d5350.firebaseapp.com",
  projectId: "drivego-d5350",
  storageBucket: "drivego-d5350.firebasestorage.app",
  messagingSenderId: "440623974634",
  appId: "1:440623974634:web:b7fd54ff1a430e2ba7af93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


export { app, auth };