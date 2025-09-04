import { db } from '../db';
import { userInteractions, users, userPersonalization } from '../../shared/schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import { Request } from 'express';

export interface InteractionData {
  sessionId?: string;
  userId?: number;
  actionType: 'click' | 'save' | 'like' | 'view' | 'search' | 'add_to_collection' | 'add_to_wishlist' | 'share' | 'filter' | 'sort';
  targetType: 'sneaker' | 'brand' | 'blog' | 'collection' | 'user' | 'search' | 'category';
  targetId?: number;
  metadata?: Record<string, any>;
}

export class UserTrackingService {
  // Track user interactions anonymously
  static async trackInteraction(req: Request, data: InteractionData) {
    try {
      const sessionId = data.sessionId || req.sessionID || 'anonymous';
      const userAgent = req.get('User-Agent') || '';
      const ipAddress = req.ip || req.connection.remoteAddress || '';

      await db.insert(userInteractions).values({
        sessionId,
        userId: data.userId,
        actionType: data.actionType,
        targetType: data.targetType,
        targetId: data.targetId,
        metadata: data.metadata,
        userAgent,
        ipAddress: ipAddress.replace(/:\d+$/, '') // Remove port from IP
      });

      // Update user total interactions if logged in
      if (data.userId) {
        await db.update(users)
          .set({ 
            totalInteractions: sql`${users.totalInteractions} + 1`,
            lastActiveAt: new Date()
          })
          .where(eq(users.id, data.userId));
      }

      return true;
    } catch (error) {
      console.error('Error tracking interaction:', error);
      return false;
    }
  }

  // Get user interaction analytics
  static async getUserAnalytics(userId: number, days: number = 30) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);

      const interactions = await db.select({
        actionType: userInteractions.actionType,
        targetType: userInteractions.targetType,
        count: sql<number>`count(*)`.as('count')
      })
      .from(userInteractions)
      .where(
        and(
          eq(userInteractions.userId, userId),
          sql`${userInteractions.timestamp} >= ${cutoffDate}`
        )
      )
      .groupBy(userInteractions.actionType, userInteractions.targetType)
      .orderBy(desc(sql`count(*)`));

      return interactions;
    } catch (error) {
      console.error('Error getting user analytics:', error);
      return [];
    }
  }

  // Get popular content based on interactions
  static async getPopularContent(targetType: string, limit: number = 10) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 7); // Last 7 days

      const popular = await db.select({
        targetId: userInteractions.targetId,
        interactions: sql<number>`count(*)`.as('interactions'),
        uniqueUsers: sql<number>`count(distinct ${userInteractions.userId})`.as('unique_users')
      })
      .from(userInteractions)
      .where(
        and(
          eq(userInteractions.targetType, targetType),
          sql`${userInteractions.timestamp} >= ${cutoffDate}`,
          sql`${userInteractions.targetId} IS NOT NULL`
        )
      )
      .groupBy(userInteractions.targetId)
      .orderBy(desc(sql`count(*)`))
      .limit(limit);

      return popular;
    } catch (error) {
      console.error('Error getting popular content:', error);
      return [];
    }
  }

  // Update user preferences based on interactions
  static async updateUserPreferences(userId: number) {
    try {
      const analytics = await this.getUserAnalytics(userId, 90); // 3 months
      
      // Analyze interaction patterns
      const brandInteractions = analytics.filter(a => a.targetType === 'brand');
      const categoryInteractions = analytics.filter(a => a.targetType === 'sneaker');
      
      // Get most interacted brands and categories
      const topBrands = brandInteractions.slice(0, 5).map(b => b.targetType);
      const topCategories = categoryInteractions.slice(0, 5).map(c => c.targetType);

      // Update user preferences
      await db.update(users)
        .set({
          preferredBrands: topBrands,
          favoriteCategories: topCategories,
          updatedAt: new Date()
        })
        .where(eq(users.id, userId));

      return { topBrands, topCategories };
    } catch (error) {
      console.error('Error updating user preferences:', error);
      return null;
    }
  }
}