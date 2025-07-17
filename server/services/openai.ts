import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || "default_key"
});

interface SneakerRecommendation {
  name: string;
  brand: string;
  reason: string;
  priceRange: string;
  category: string;
}

interface ChatContext {
  userPreferences?: string[];
  recentQueries?: string[];
  collectionSize?: number;
}

export async function chatWithAI(message: string, context?: ChatContext): Promise<string> {
  try {
    const systemPrompt = `You are SoleBot, an expert AI assistant for sneaker enthusiasts. You have deep knowledge about:
    - Sneaker history, releases, and collaborations
    - Market prices and trends
    - Styling and fashion advice
    - Brand information and technical details
    - Collection management tips
    
    Provide helpful, accurate, and engaging responses about sneakers. Keep responses conversational and informative.
    
    ${context?.userPreferences ? `User preferences: ${context.userPreferences.join(', ')}` : ''}
    ${context?.collectionSize ? `User has ${context.collectionSize} sneakers in their collection` : ''}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error('OpenAI chat error:', error);
    throw new Error("Failed to process AI request");
  }
}

export async function getSneakerRecommendations(preferences: {
  brands?: string[];
  styles?: string[];
  priceRange?: string;
  size?: string;
}): Promise<SneakerRecommendation[]> {
  try {
    const prompt = `Based on these preferences, recommend 5 sneakers:
    - Preferred brands: ${preferences.brands?.join(', ') || 'any'}
    - Preferred styles: ${preferences.styles?.join(', ') || 'any'}
    - Price range: ${preferences.priceRange || 'any'}
    - Size: ${preferences.size || 'any'}
    
    Provide realistic sneaker recommendations with current market information. Format as JSON array with fields: name, brand, reason, priceRange, category.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are a sneaker expert. Provide realistic sneaker recommendations based on user preferences. Respond only with valid JSON." 
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      max_tokens: 800
    });

    const result = JSON.parse(response.choices[0].message.content || '{"recommendations": []}');
    return result.recommendations || [];
  } catch (error) {
    console.error('OpenAI recommendations error:', error);
    throw new Error("Failed to get recommendations");
  }
}

export async function analyzeSneakerImage(base64Image: string): Promise<{
  brand: string;
  model: string;
  confidence: number;
  description: string;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this sneaker image and identify the brand, model, and provide a description. Respond in JSON format with fields: brand, model, confidence (0-1), description."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 300,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return {
      brand: result.brand || 'Unknown',
      model: result.model || 'Unknown',
      confidence: result.confidence || 0,
      description: result.description || 'No description available'
    };
  } catch (error) {
    console.error('OpenAI image analysis error:', error);
    throw new Error("Failed to analyze image");
  }
}

export async function generateBlogContent(topic: string, keywords?: string[]): Promise<{
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
}> {
  try {
    const prompt = `Write a comprehensive blog post about: ${topic}
    ${keywords ? `Include these keywords: ${keywords.join(', ')}` : ''}
    
    The blog post should be engaging, informative, and appeal to sneaker enthusiasts.
    Format as JSON with fields: title, excerpt, content (in HTML), tags (array).`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are a sneaker culture expert and skilled writer. Create engaging blog content for sneaker enthusiasts." 
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      max_tokens: 1500
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return {
      title: result.title || topic,
      excerpt: result.excerpt || '',
      content: result.content || '',
      tags: result.tags || []
    };
  } catch (error) {
    console.error('OpenAI content generation error:', error);
    throw new Error("Failed to generate content");
  }
}

export async function predictSneakerPrice(sneakerData: {
  brand: string;
  model: string;
  releaseDate?: string;
  retailPrice?: number;
  currentMarketData?: any[];
}): Promise<{
  predictedPrice: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
  reasoning: string;
}> {
  try {
    const prompt = `Analyze this sneaker's market potential and predict future price:
    Brand: ${sneakerData.brand}
    Model: ${sneakerData.model}
    Release Date: ${sneakerData.releaseDate || 'Unknown'}
    Retail Price: $${sneakerData.retailPrice || 'Unknown'}
    
    Consider factors like brand popularity, rarity, cultural significance, and market trends.
    Respond in JSON format with: predictedPrice (number), trend (up/down/stable), confidence (0-1), reasoning (string).`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are a sneaker market analyst with expertise in price prediction and market trends." 
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      max_tokens: 400
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return {
      predictedPrice: result.predictedPrice || 0,
      trend: result.trend || 'stable',
      confidence: result.confidence || 0,
      reasoning: result.reasoning || 'Analysis unavailable'
    };
  } catch (error) {
    console.error('OpenAI price prediction error:', error);
    throw new Error("Failed to predict price");
  }
}

export async function enhanceReviewContent(draft: string): Promise<{
  improvedContent: string;
  suggestions: string[];
}> {
  try {
    const prompt = `Improve this sneaker review draft while maintaining the author's voice:
    "${draft}"
    
    Enhance clarity, add helpful details, and suggest improvements.
    Respond in JSON format with: improvedContent (string), suggestions (array of strings).`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are a writing assistant specializing in sneaker reviews. Help improve content while preserving authenticity." 
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      max_tokens: 600
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return {
      improvedContent: result.improvedContent || draft,
      suggestions: result.suggestions || []
    };
  } catch (error) {
    console.error('OpenAI content enhancement error:', error);
    throw new Error("Failed to enhance content");
  }
}
