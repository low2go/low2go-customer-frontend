// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_aCTRgQYu3fgm33rSJFiEu3cDX9szMzM",
  authDomain: "low2go-4de98.firebaseapp.com",
  projectId: "low2go-4de98",
  storageBucket: "low2go-4de98.firebasestorage.app",
  messagingSenderId: "120566609549",
  appId: "1:120566609549:web:0cc4e4463aea68c68dd4c4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
