import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration provided by the user
const firebaseConfig = {
  apiKey: "AIzaSyDOld6AOU4OH2OeD5lZVj3_syUcpziStqU",
  authDomain: "memoroids-eb658.firebaseapp.com",
  databaseURL: "https://memoroids-eb658-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "memoroids-eb658",
  storageBucket: "memoroids-eb658.firebasestorage.app",
  messagingSenderId: "888764188237",
  appId: "1:888764188237:web:c4b67e26d90e7400f5fe04"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { 
  auth, 
  db,
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
};
