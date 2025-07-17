import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebasestorage.app`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

export const signInWithGoogle = () => {
  return signInWithRedirect(auth, googleProvider);
};

export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      return { user, token };
    }
  } catch (error: any) {
    console.error('Redirect result error:', error);
    throw new Error(error.message || 'Authentication failed');
  }
  return null;
};

export const signOutUser = () => {
  return signOut(auth);
};

export { GoogleAuthProvider };
