import { useState } from "react";
import { useAuth } from "./useAuth";

interface SneakerRecommendation {
  name: string;
  brand: string;
  reason: string;
  priceRange: string;
  category: string;
}

interface RecommendationPreferences {
  brands?: string[];
  styles?: string[];
  priceRange?: string;
  size?: string;
}

interface EnhancedContent {
  improvedContent: string;
  suggestions: string[];
}

interface ChatContext {
  userPreferences?: string[];
  recentQueries?: string[];
  collectionSize?: number;
}

export function useAI() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const chatWithAI = async (message: string, context?: ChatContext): Promise<string> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user && { 'Authorization': `Bearer ${await user.getIdToken()}` })
        },
        body: JSON.stringify({
          message,
          context
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('AI chat error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getRecommendations = async (preferences: RecommendationPreferences): Promise<SneakerRecommendation[]> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user && { 'Authorization': `Bearer ${await user.getIdToken()}` })
        },
        body: JSON.stringify({
          preferences,
          userId: user?.uid
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      return data.recommendations || [];
    } catch (error) {
      console.error('AI recommendations error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const enhanceContent = async (content: string): Promise<EnhancedContent> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/enhance-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user && { 'Authorization': `Bearer ${await user.getIdToken()}` })
        },
        body: JSON.stringify({
          content
        })
      });

      if (!response.ok) {
        throw new Error('Failed to enhance content');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('AI content enhancement error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeImage = async (imageFile: File): Promise<{
    brand: string;
    model: string;
    confidence: number;
    description: string;
  }> => {
    setIsLoading(true);
    try {
      // Convert image to base64
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = (reader.result as string).split(',')[1];
          resolve(base64String);
        };
        reader.readAsDataURL(imageFile);
      });

      const response = await fetch('/api/ai/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user && { 'Authorization': `Bearer ${await user.getIdToken()}` })
        },
        body: JSON.stringify({
          image: base64
        })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('AI image analysis error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const predictPrice = async (sneakerData: {
    brand: string;
    model: string;
    releaseDate?: string;
    retailPrice?: number;
  }): Promise<{
    predictedPrice: number;
    trend: 'up' | 'down' | 'stable';
    confidence: number;
    reasoning: string;
  }> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/predict-price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user && { 'Authorization': `Bearer ${await user.getIdToken()}` })
        },
        body: JSON.stringify({
          sneakerData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to predict price');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('AI price prediction error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    chatWithAI,
    getRecommendations,
    enhanceContent,
    analyzeImage,
    predictPrice,
    isLoading
  };
}
