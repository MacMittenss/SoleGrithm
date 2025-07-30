
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

export async function generateSneakerCareTips(sneaker: {
  name: string;
  materials: string;
  colorway: string;
  brand: string;
}): Promise<{
  generalTips: string[];
  materialSpecific: string[];
  cleaningSteps: string[];
  storageAdvice: string[];
  warnings: string[];
}> {
  try {
    const prompt = `Generate comprehensive care and maintenance tips for this sneaker:
    - Name: ${sneaker.name}
    - Brand: ${sneaker.brand}
    - Materials: ${sneaker.materials}
    - Colorway: ${sneaker.colorway}
    
    Provide specific, actionable advice organized into categories. Consider the unique materials and construction of this sneaker. Format as JSON with these fields:
    - generalTips: 3-4 general maintenance tips
    - materialSpecific: 3-4 tips specific to the materials used
    - cleaningSteps: 4-5 step-by-step cleaning instructions
    - storageAdvice: 3-4 storage recommendations
    - warnings: 2-3 things to avoid or warning signs`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are a sneaker care expert. Provide detailed, accurate care instructions based on specific sneaker materials and construction. Respond only with valid JSON." 
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      max_tokens: 800,
      temperature: 0.3
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result;
  } catch (error) {
    console.error('OpenAI sneaker care generation error:', error);
    // Fallback care tips based on common materials
    return {
      generalTips: [
        "Regular cleaning prevents stains from setting and materials from deteriorating",
        "Allow sneakers to air dry completely between wears to prevent odor and mold",
        "Use shoe trees or stuff with paper to maintain shape during storage"
      ],
      materialSpecific: [
        "Test cleaning products on a small, hidden area first",
        "Use appropriate brushes - soft for delicate materials, medium for leather",
        "Avoid excessive water on suede and nubuck materials"
      ],
      cleaningSteps: [
        "Remove loose dirt with a dry brush",
        "Prepare cleaning solution appropriate for the material",
        "Clean in circular motions with gentle pressure",
        "Remove excess moisture and cleaning residue",
        "Allow to air dry away from direct heat or sunlight"
      ],
      storageAdvice: [
        "Store in a cool, dry place away from direct sunlight",
        "Use dust bags or boxes to prevent dust accumulation",
        "Maintain shape with shoe trees or paper stuffing"
      ],
      warnings: [
        "Never use bleach or harsh chemicals on colored materials",
        "Avoid machine washing unless specifically recommended by the manufacturer",
        "Don't wear the same pair multiple days in a row"
      ]
    };
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
  colorway?: string;
  dominantColors?: string[];
  styleCategory?: string;
  marketContext?: string;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "You are an expert sneaker analyst with deep knowledge of sneaker brands, models, colorways, and market trends. Analyze images with high accuracy and provide detailed insights."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this sneaker image in detail and provide:
              1. Brand identification (Nike, Adidas, Jordan, etc.)
              2. Specific model name and version
              3. Colorway description
              4. Dominant colors (hex codes if possible, or color names)
              5. Style category (Basketball, Running, Lifestyle, etc.)
              6. Confidence level (0-1)
              7. Detailed description including notable features
              8. Market context or cultural significance if recognizable
              
              Respond in JSON format with fields: brand, model, confidence, description, colorway, dominantColors (array), styleCategory, marketContext.`
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
      max_tokens: 500,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return {
      brand: result.brand || 'Unknown',
      model: result.model || 'Unknown',
      confidence: Math.max(0, Math.min(1, result.confidence || 0)),
      description: result.description || 'No description available',
      colorway: result.colorway || 'Unknown colorway',
      dominantColors: result.dominantColors || ['#000000', '#FFFFFF'],
      styleCategory: result.styleCategory || 'Lifestyle',
      marketContext: result.marketContext || 'Market analysis unavailable'
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

export async function summarizeReviews(reviews: string[], sneakerName: string): Promise<{
  summary: string;
  whatSneakerheadsAreSaying: string[];
  prosAndCons: {
    pros: string[];
    cons: string[];
  };
  overallSentiment: 'positive' | 'negative' | 'mixed';
  confidenceScore: number;
}> {
  try {
    const reviewsText = reviews.join('\n\n---\n\n');
    
    const prompt = `Analyze these reviews for the sneaker "${sneakerName}" from various sources (Reddit, StockX, social media, etc.):

${reviewsText}

Create a comprehensive summary with:
1. A general summary of what people think
2. Key quotes representing "What Sneakerheads Are Saying" (3-5 authentic-sounding quotes)
3. Clear pros and cons lists
4. Overall sentiment and confidence

Respond in JSON format with:
{
  "summary": "Overall summary paragraph",
  "whatSneakerheadsAreSaying": ["Quote 1", "Quote 2", "Quote 3"],
  "prosAndCons": {
    "pros": ["Pro 1", "Pro 2", "Pro 3"],
    "cons": ["Con 1", "Con 2", "Con 3"]
  },
  "overallSentiment": "positive/negative/mixed",
  "confidenceScore": 0.85
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are an expert at analyzing sneaker reviews and community sentiment. Synthesize authentic opinions from the sneaker community." 
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      max_tokens: 800
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return {
      summary: result.summary || "Unable to generate summary",
      whatSneakerheadsAreSaying: result.whatSneakerheadsAreSaying || [],
      prosAndCons: result.prosAndCons || { pros: [], cons: [] },
      overallSentiment: result.overallSentiment || 'mixed',
      confidenceScore: result.confidenceScore || 0.5
    };
  } catch (error) {
    console.error('OpenAI review summarization error:', error);
    throw new Error("Failed to summarize reviews");
  }
}

export async function generateSyntheticReviews(sneakerName: string, brandName: string): Promise<string[]> {
  try {
    const prompt = `Generate 8-10 realistic sneaker reviews for the "${sneakerName}" by ${brandName} that would appear on Reddit, StockX, or sneaker forums. 

Make them diverse in:
- Review length (some short, some detailed)
- User types (casual buyers, collectors, resellers)
- Perspectives (comfort, style, quality, value)
- Writing styles (casual, technical, emotional)

Each review should feel authentic and include specific details about:
- Fit and comfort
- Build quality
- Styling versatility
- Value for money
- Personal experiences

Return as an array of review strings in JSON format: {"reviews": ["review1", "review2", ...]}.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are generating realistic sneaker reviews that capture authentic community sentiment and diverse perspectives." 
        },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      max_tokens: 1200
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result.reviews || [];
  } catch (error) {
    console.error('OpenAI synthetic review generation error:', error);
    throw new Error("Failed to generate reviews");
  }
}
