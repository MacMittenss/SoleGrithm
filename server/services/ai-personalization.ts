import OpenAI from 'openai';
import { db } from '../db';
import { userPersonalization, users, userInteractions, sneakers, brands } from '../../shared/schema';
import { eq, desc, and, sql, inArray } from 'drizzle-orm';
import { UserTrackingService } from './user-tracking';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface PersonalizationProfile {
  stylePreferences: {
    categories: string[];
    brands: string[];
    priceRange: { min: number; max: number };
    colors: string[];
    occasions: string[];
  };
  behaviorPatterns: {
    mostActiveTime: string;
    averageSessionDuration: number;
    preferredContentTypes: string[];
    interactionFrequency: string;
  };
  recommendations: {
    sneakers: number[];
    brands: string[];
    content: string[];
  };
}

export class AIPersonalizationService {
  // Generate AI-powered user profile based on interactions
  static async generateUserProfile(userId: number): Promise<PersonalizationProfile | null> {
    try {
      // Get user interaction data
      const interactions = await UserTrackingService.getUserAnalytics(userId, 90);
      
      // Get user's collection and wishlist data
      const userData = await db.select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (userData.length === 0) {
        throw new Error('User not found');
      }

      const user = userData[0];

      // Prepare data for AI analysis
      const userContext = {
        totalInteractions: user.totalInteractions,
        favoriteCategories: user.favoriteCategories || [],
        preferredBrands: user.preferredBrands || [],
        interactionHistory: interactions,
        accountAge: this.calculateAccountAge(user.createdAt),
        lastActive: user.lastActiveAt
      };

      // Generate AI profile using GPT-4o
      const prompt = `
Analyze this sneaker enthusiast's behavior and create a personalized profile:

User Data:
- Total interactions: ${userContext.totalInteractions}
- Favorite categories: ${userContext.favoriteCategories.join(', ')}
- Preferred brands: ${userContext.preferredBrands.join(', ')}
- Account age: ${userContext.accountAge} days
- Recent interactions: ${JSON.stringify(interactions.slice(0, 10))}

Generate a comprehensive personalization profile including:
1. Style preferences (categories, brands, price range, colors, occasions)
2. Behavior patterns (activity times, session duration, content preferences)
3. Personalized recommendations

Respond in JSON format with the structure:
{
  "stylePreferences": {
    "categories": ["array", "of", "categories"],
    "brands": ["array", "of", "brands"],
    "priceRange": {"min": 100, "max": 300},
    "colors": ["array", "of", "colors"],
    "occasions": ["array", "of", "occasions"]
  },
  "behaviorPatterns": {
    "mostActiveTime": "morning/afternoon/evening",
    "averageSessionDuration": "short/medium/long",
    "preferredContentTypes": ["sneakers", "blog", "collections"],
    "interactionFrequency": "low/medium/high"
  },
  "recommendations": {
    "sneakers": [1, 2, 3],
    "brands": ["Nike", "Adidas"],
    "content": ["trending", "new-releases", "limited-editions"]
  }
}
`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are an AI specialist in sneaker culture and user behavior analysis. Generate accurate, actionable personalization profiles based on user interaction data."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7
      });

      const aiProfile = JSON.parse(response.choices[0].message.content || '{}');

      // Save or update personalization profile
      await this.savePersonalizationProfile(userId, aiProfile);

      return aiProfile;
    } catch (error) {
      console.error('Error generating AI profile:', error);
      return this.getFallbackProfile(userId);
    }
  }

  // Get personalized sneaker recommendations
  static async getPersonalizedRecommendations(userId: number, limit: number = 10) {
    try {
      // Get user's AI profile
      const profile = await this.getUserProfile(userId);
      
      if (!profile) {
        // Generate new profile if none exists
        const newProfile = await this.generateUserProfile(userId);
        if (!newProfile) {
          return this.getFallbackRecommendations(limit);
        }
      }

      // Get sneakers based on preferences
      const preferences = profile?.stylePreferences || {};
      
      let query = db.select({
        id: sneakers.id,
        name: sneakers.name,
        slug: sneakers.slug,
        brandId: sneakers.brandId,
        description: sneakers.description,
        images: sneakers.images,
        retailPrice: sneakers.retailPrice,
        categories: sneakers.categories,
        colorway: sneakers.colorway,
        releaseDate: sneakers.releaseDate,
        brandName: brands.name
      })
      .from(sneakers)
      .leftJoin(brands, eq(sneakers.brandId, brands.id));

      // Apply filters based on preferences
      if (preferences.categories && preferences.categories.length > 0) {
        query = query.where(
          sql`${sneakers.categories} && ${preferences.categories}`
        );
      }

      const recommendations = await query.limit(limit);

      // Track recommendation generation
      await UserTrackingService.trackInteraction(
        { ip: 'system' } as any,
        {
          userId,
          actionType: 'view',
          targetType: 'search',
          metadata: { 
            type: 'ai_recommendations',
            count: recommendations.length,
            preferences: preferences
          }
        }
      );

      return recommendations;
    } catch (error) {
      console.error('Error getting personalized recommendations:', error);
      return this.getFallbackRecommendations(limit);
    }
  }

  // Update personalization based on new interactions
  static async updatePersonalizationFromInteraction(userId: number, interactionData: any) {
    try {
      const currentProfile = await this.getUserProfile(userId);
      
      if (!currentProfile) return;

      // Analyze interaction and update preferences
      const updatedProfile = await this.adaptProfileFromInteraction(currentProfile, interactionData);
      
      await this.savePersonalizationProfile(userId, updatedProfile);
      
      return updatedProfile;
    } catch (error) {
      console.error('Error updating personalization:', error);
      return null;
    }
  }

  // Private helper methods
  private static async getUserProfile(userId: number) {
    try {
      const [profile] = await db.select()
        .from(userPersonalization)
        .where(eq(userPersonalization.userId, userId))
        .orderBy(desc(userPersonalization.updatedAt))
        .limit(1);

      return profile?.aiProfile as PersonalizationProfile;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  private static async savePersonalizationProfile(userId: number, profile: PersonalizationProfile) {
    try {
      const existing = await db.select()
        .from(userPersonalization)
        .where(eq(userPersonalization.userId, userId))
        .limit(1);

      if (existing.length > 0) {
        await db.update(userPersonalization)
          .set({
            aiProfile: profile,
            lastPersonalizationUpdate: new Date(),
            updatedAt: new Date()
          })
          .where(eq(userPersonalization.userId, userId));
      } else {
        await db.insert(userPersonalization).values({
          userId,
          aiProfile: profile,
          recommendationHistory: {},
          interactionPatterns: {},
          stylePreferences: profile.stylePreferences,
          lastPersonalizationUpdate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    } catch (error) {
      console.error('Error saving personalization profile:', error);
    }
  }

  private static calculateAccountAge(createdAt: Date | null): number {
    if (!createdAt) return 0;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private static async getFallbackRecommendations(limit: number) {
    // Return popular sneakers as fallback
    const popular = await UserTrackingService.getPopularContent('sneaker', limit);
    
    if (popular.length === 0) {
      // Final fallback - get latest sneakers
      return await db.select()
        .from(sneakers)
        .leftJoin(brands, eq(sneakers.brandId, brands.id))
        .orderBy(desc(sneakers.releaseDate))
        .limit(limit);
    }

    const popularIds = popular.map(p => p.targetId).filter(Boolean);
    return await db.select()
      .from(sneakers)
      .leftJoin(brands, eq(sneakers.brandId, brands.id))
      .where(inArray(sneakers.id, popularIds))
      .limit(limit);
  }

  private static getFallbackProfile(userId: number): PersonalizationProfile {
    return {
      stylePreferences: {
        categories: ['Lifestyle', 'Basketball'],
        brands: ['Nike', 'Adidas', 'Jordan'],
        priceRange: { min: 100, max: 300 },
        colors: ['Black', 'White', 'Red'],
        occasions: ['Casual', 'Sport']
      },
      behaviorPatterns: {
        mostActiveTime: 'evening',
        averageSessionDuration: 'medium',
        preferredContentTypes: ['sneakers', 'blog'],
        interactionFrequency: 'medium'
      },
      recommendations: {
        sneakers: [],
        brands: ['Nike', 'Adidas'],
        content: ['trending', 'new-releases']
      }
    };
  }

  private static async adaptProfileFromInteraction(profile: PersonalizationProfile, interaction: any): Promise<PersonalizationProfile> {
    // Simple adaptation logic - in production, this could be more sophisticated
    const updatedProfile = { ...profile };

    if (interaction.targetType === 'brand' && interaction.actionType === 'click') {
      const brands = updatedProfile.stylePreferences.brands;
      if (!brands.includes(interaction.targetId)) {
        brands.push(interaction.targetId);
        updatedProfile.stylePreferences.brands = brands.slice(-5); // Keep last 5
      }
    }

    return updatedProfile;
  }
}