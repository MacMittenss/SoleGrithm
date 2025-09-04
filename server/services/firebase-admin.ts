import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  // In production, use service account key from environment variables
  // For development, you can use the Firebase project ID and enable auth emulator
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    initializeApp({
      credential: cert(serviceAccount),
    });
  } else {
    // Fallback for development - you'll need to set up proper credentials
    initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || 'solegrid-app',
    });
  }
}

const auth = getAuth();

export async function verifyFirebaseToken(token: string) {
  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid Firebase token');
  }
}

export { auth };
