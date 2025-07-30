import { auth } from './firebase-admin';
import { db } from '../db';
import { users } from '../../shared/schema';
import { eq } from 'drizzle-orm';

export interface FirebaseUserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  customClaims?: Record<string, any>;
  metadata: {
    creationTime: string;
    lastSignInTime: string;
  };
}

export class FirebaseProfileService {
  // Create or update user profile from Firebase data
  static async syncUserProfile(firebaseUser: any) {
    try {
      const existingUser = await db.select()
        .from(users)
        .where(eq(users.firebaseUid, firebaseUser.uid))
        .limit(1);

      const userData = {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || firebaseUser.name,
        avatar: firebaseUser.photoURL || firebaseUser.picture,
        isVerified: firebaseUser.emailVerified || false,
        lastActiveAt: new Date(),
        updatedAt: new Date()
      };

      if (existingUser.length > 0) {
        // Update existing user
        await db.update(users)
          .set(userData)
          .where(eq(users.firebaseUid, firebaseUser.uid));
        
        return existingUser[0];
      } else {
        // Create new user
        const [newUser] = await db.insert(users)
          .values({
            ...userData,
            totalInteractions: 0,
            favoriteCategories: [],
            sizesOwned: [],
            preferredBrands: [],
            createdAt: new Date()
          })
          .returning();
        
        return newUser;
      }
    } catch (error) {
      console.error('Error syncing user profile:', error);
      throw error;
    }
  }

  // Get enhanced user profile with Firebase data
  static async getEnhancedProfile(firebaseUid: string) {
    try {
      // Get local user data
      const [localUser] = await db.select()
        .from(users)
        .where(eq(users.firebaseUid, firebaseUid))
        .limit(1);

      if (!localUser) {
        throw new Error('User not found');
      }

      // Get Firebase user data
      const firebaseUser = await auth.getUser(firebaseUid);

      return {
        ...localUser,
        firebaseData: {
          emailVerified: firebaseUser.emailVerified,
          lastSignInTime: firebaseUser.metadata.lastSignInTime,
          creationTime: firebaseUser.metadata.creationTime,
          providerData: firebaseUser.providerData,
          customClaims: firebaseUser.customClaims
        }
      };
    } catch (error) {
      console.error('Error getting enhanced profile:', error);
      throw error;
    }
  }

  // Update Firebase custom claims for premium users
  static async updateCustomClaims(firebaseUid: string, claims: Record<string, any>) {
    try {
      await auth.setCustomUserClaims(firebaseUid, claims);
      return true;
    } catch (error) {
      console.error('Error updating custom claims:', error);
      return false;
    }
  }

  // Set user as premium in both Firebase and local DB
  static async setPremiumStatus(firebaseUid: string, isPremium: boolean) {
    try {
      // Update Firebase custom claims
      await this.updateCustomClaims(firebaseUid, { premium: isPremium });

      // Update local database
      await db.update(users)
        .set({ 
          isPremium,
          updatedAt: new Date()
        })
        .where(eq(users.firebaseUid, firebaseUid));

      return true;
    } catch (error) {
      console.error('Error setting premium status:', error);
      return false;
    }
  }

  // Batch update user metadata
  static async updateUserMetadata(firebaseUid: string, metadata: Record<string, any>) {
    try {
      await db.update(users)
        .set({
          preferences: metadata,
          updatedAt: new Date()
        })
        .where(eq(users.firebaseUid, firebaseUid));

      return true;
    } catch (error) {
      console.error('Error updating user metadata:', error);
      return false;
    }
  }
}