import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, signInWithRedirect, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getRedirectResult } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebasestorage.app`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Connect to auth emulator in development
if (import.meta.env.DEV && !auth.config.emulator) {
  connectAuthEmulator(auth, "http://localhost:9099");
}

// Google provider
export const googleProvider = new GoogleAuthProvider();

// Auth functions
export const signInWithGoogle = () => signInWithRedirect(auth, googleProvider);

export const signInWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signUpWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const logOut = () => signOut(auth);

// Handle redirect result
export const handleRedirectResult = () => getRedirectResult(auth);

export default app;
