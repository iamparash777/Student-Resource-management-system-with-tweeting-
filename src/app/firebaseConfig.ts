// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  setDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxD9qDLQmIK6c3pqzTxQrcBG5-c-VuSYY",
  authDomain: "study-ef4c6.firebaseapp.com",
  projectId: "study-ef4c6",
  storageBucket: "study-ef4c6.appspot.com",
  messagingSenderId: "677415713916",
  appId: "1:677415713916:web:55c953b8fdd6ac75ba5df9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

// Export Firebase services and Firestore functions
export { 
  auth, 
  googleProvider, 
  storage, 
  db, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  setDoc, 
  serverTimestamp 
};
