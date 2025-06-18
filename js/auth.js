import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyApbLaK8o5SjwjRvu-HrUEM2bvjp24fr8k",
  authDomain: "stockmarket-f57e6.firebaseapp.com",
  projectId: "stockmarket-f57e6",
  storageBucket: "stockmarket-f57e6.appspot.com",
  messagingSenderId: "219849350914",
  appId: "1:219849350914:web:f7d7521e0b486741fb2c1b",
  measurementId: "G-SK06HEDP65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Authentication functions
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const monitorAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const logoutUser = () => {
  return signOut(auth);
};