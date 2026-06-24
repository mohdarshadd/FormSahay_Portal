import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCJqkp6iwZQM0KkLLxmFsTTsprLLKNsPM0',
  authDomain: 'formsahay-7e248.firebaseapp.com',
  projectId: 'formsahay-7e248',
  storageBucket: 'formsahay-7e248.firebasestorage.app',
  messagingSenderId: '668169636128',
  appId: '1:668169636128:web:b1e57ccc5b7f8b2ef6af45',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
};
export default app;
