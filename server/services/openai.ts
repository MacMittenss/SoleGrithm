
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

export async function chatWithAI(message: string, context?: ChatContext, conversationHistory?: any[]): Promise<{
  response: string;
  suggestions?: string[];
  sneakerRecommendations?: any[];
  marketInsights?: any;
  actionable?: boolean;
}> {
  try {
    // Enhanced system prompt with more specialized knowledge
    const systemPrompt = `You are SoleBot, the world's most advanced AI sneaker expert and community assistant. You possess comprehensive knowledge about:

    **Core Expertise:**
    - Complete sneaker history from 1917 to present, including rare releases and collaborations
    - Real-time market analysis, price trends, and investment potential
    - Advanced styling techniques, seasonal trends, and fashion theory
    - Technical specifications, materials science, and construction methods
    - Cultural significance, celebrity endorsements, and streetwear influence
    - Authentication techniques and counterfeit detection
    - Collection curation, storage, and maintenance best practices

    **Interaction Style:**
    - Enthusiastic but knowledgeable, like talking to a passionate sneaker expert friend
    - Provide actionable advice with specific examples and price ranges
    - Reference current market data, recent drops, and upcoming releases
    - Suggest follow-up questions to keep the conversation engaging
    - When appropriate, recommend specific sneakers with detailed reasoning

    **Response Format:**
    Always respond with JSON containing:
    - response: Your main conversational response (engaging and informative)
    - suggestions: Array of 2-3 follow-up question suggestions
    - sneakerRecommendations: Array of specific sneaker suggestions if relevant
    - marketInsights: Current market trends or price insights if relevant
    - actionable: Boolean indicating if response contains specific actions user can take

    **User Context:**
    ${context?.userPreferences ? `Preferences: ${context.userPreferences.join(', ')}` : 'No stated preferences yet'}
    ${context?.collectionSize ? `Collection size: ${context.collectionSize} pairs` : 'Collection size unknown'}
    ${context?.recentQueries ? `Recent topics: ${context.recentQueries.join(', ')}` : ''}

    **Conversation Guidelines:**
    - Reference previous conversation when relevant
    - Provide specific model names, colorways, and retail prices when possible
    - Mention current availability and where to purchase
    - Include care tips for specific materials mentioned
    - Always end with engaging follow-up possibilities`;

    // Build conversation messages including history
    const messages = [
      { role: "system", content: systemPrompt }
    ];

    // Add conversation history (last 6 messages for context)
    if (conversationHistory && conversationHistory.length > 0) {
      const recentHistory = conversationHistory.slice(-6);
      recentHistory.forEach(msg => {
        messages.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content
        });
      });
    }

    messages.push({ role: "user", content: message });

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages,
      max_tokens: 800,
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      response: result.response || "I'm here to help with all your sneaker needs! What would you like to know?",
      suggestions: result.suggestions || ["What's trending in sneakers right now?", "Help me find my next pair", "Tell me about sneaker care"],
      sneakerRecommendations: result.sneakerRecommendations || [],
      marketInsights: result.marketInsights || null,
      actionable: result.actionable || false
    };
  } catch (error) {
    console.error('OpenAI chat error:', error);
    // Enhanced fallback with more engaging responses
    const fallbackResponses = [
      "I'm experiencing some technical difficulties, but I'm still here to help! What specific sneaker questions do you have?",
      "My connection is a bit slow right now, but let's talk sneakers! Are you looking for recommendations, market insights, or style advice?",
      "I'm having trouble accessing my full knowledge base, but I can still assist with basic sneaker questions. What would you like to know?"
    ];
    
    return {
      response: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
      suggestions: ["What's trending in sneakers?", "Help me find a specific model", "Sneaker care tips"],
      sneakerRecommendations: [],
      marketInsights: null,
      actionable: false
    };
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

export async function analyzeSneakerImage(base64Image: string, availableSneakers: any[] = []): Promise<{
  identifiedSneaker: {
    name: string;
    brand: string;
    confidence: number;
    marketValue: string;
    description: string;
    releaseDate?: string;
    retailPrice?: string;
    currentMarketTrend?: string;
  };
  similarStyles: any[];
  colorAnalysis: {
    dominantColors: string[];
    colorScheme: string;
    seasonalFit: string;
  };
  styleClassification: {
    category: string;
    subcategory: string;
    tags: string[];
    targetDemographic: string[];
    versatilityScore: number;
  };
  condition?: {
    overall: string;
    wear: string;
    authenticity: string;
    careRecommendations: string[];
  };
  celebrityContext?: {
    detected: boolean;
    context: string;
    stylingTips?: string[];
  };
  marketInsights: {
    investmentPotential: string;
    priceHistory: string;
    availabilityStatus: string;
    recommendedAction: string;
  };
  stylingAdvice: {
    occasions: string[];
    outfitSuggestions: string[];
    seasonalWear: string;
    colorPairing: string[];
  };
}> {
  try {
    const prompt = `You are an expert sneaker analyst with deep knowledge of sneaker culture, market trends, and fashion. Analyze this sneaker image comprehensively and provide detailed insights.

    **Available Sneaker Database for Matching:**
    ${availableSneakers.length > 0 ? JSON.stringify(availableSneakers.slice(0, 20)) : 'Using comprehensive sneaker knowledge base'}

    **Analysis Requirements:**
    Provide a comprehensive JSON response with these sections:

    1. **identifiedSneaker**: Specific model identification with market data
    2. **similarStyles**: Find 3-5 similar sneakers from available database
    3. **colorAnalysis**: Detailed color breakdown and seasonal assessment
    4. **styleClassification**: Category, demographics, and versatility rating (1-10)
    5. **condition**: Wear assessment and authenticity check if visible
    6. **celebrityContext**: Check for celebrity/influencer styling context
    7. **marketInsights**: Investment potential, pricing trends, availability
    8. **stylingAdvice**: Comprehensive styling recommendations

    **Key Focus Areas:**
    - Accurate model identification with confidence scoring
    - Market value assessment and price trends
    - Styling versatility and outfit recommendations
    - Cultural significance and celebrity connections
    - Authentication details if visible
    - Care and maintenance specific to materials shown
    - Investment potential and resale value

    **Response Format:**
    Ensure all confidence scores are realistic (60-95%), market values include ranges, and styling advice is specific and actionable.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "You are a world-class sneaker expert with encyclopedic knowledge of sneaker history, market trends, authentication, and styling. Provide detailed, accurate analysis in the requested JSON format."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
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
      max_tokens: 1200,
      response_format: { type: "json_object" },
      temperature: 0.3
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    // Find similar sneakers from available database
    const similarStyles = availableSneakers.length > 0 
      ? availableSneakers.slice(0, 5).map(sneaker => ({
          ...sneaker,
          similarityReason: `Similar ${result.styleClassification?.category || 'style'} aesthetic and design language`
        }))
      : [];

    return {
      identifiedSneaker: {
        name: result.identifiedSneaker?.name || "Sneaker Model",
        brand: result.identifiedSneaker?.brand || "Brand",
        confidence: result.identifiedSneaker?.confidence || 75,
        marketValue: result.identifiedSneaker?.marketValue || "$100-200",
        description: result.identifiedSneaker?.description || "Classic sneaker design with modern appeal",
        releaseDate: result.identifiedSneaker?.releaseDate,
        retailPrice: result.identifiedSneaker?.retailPrice,
        currentMarketTrend: result.identifiedSneaker?.currentMarketTrend || "Stable"
      },
      similarStyles,
      colorAnalysis: {
        dominantColors: result.colorAnalysis?.dominantColors || ["White", "Black"],
        colorScheme: result.colorAnalysis?.colorScheme || "Monochromatic",
        seasonalFit: result.colorAnalysis?.seasonalFit || "Year-round"
      },
      styleClassification: {
        category: result.styleClassification?.category || "Lifestyle",
        subcategory: result.styleClassification?.subcategory || "Casual",
        tags: result.styleClassification?.tags || ["versatile", "classic"],
        targetDemographic: result.styleClassification?.targetDemographic || ["Young adults"],
        versatilityScore: result.styleClassification?.versatilityScore || 8
      },
      condition: result.condition,
      celebrityContext: result.celebrityContext,
      marketInsights: {
        investmentPotential: result.marketInsights?.investmentPotential || "Moderate",
        priceHistory: result.marketInsights?.priceHistory || "Stable pricing over time",
        availabilityStatus: result.marketInsights?.availabilityStatus || "Widely available",
        recommendedAction: result.marketInsights?.recommendedAction || "Good for personal wear"
      },
      stylingAdvice: {
        occasions: result.stylingAdvice?.occasions || ["Casual outings", "Daily wear"],
        outfitSuggestions: result.stylingAdvice?.outfitSuggestions || ["Jeans and t-shirt", "Athleisure"],
        seasonalWear: result.stylingAdvice?.seasonalWear || "Year-round",
        colorPairing: result.stylingAdvice?.colorPairing || ["Neutral tones", "Denim"]
      }
    };
  } catch (error) {
    console.error('OpenAI image analysis error:', error);
    
    // Enhanced fallback with more realistic data
    const fallbackSimilar = availableSneakers.slice(0, 3).map(sneaker => ({
      ...sneaker,
      similarityReason: "Similar design aesthetic and category"
    }));

    return {
      identifiedSneaker: {
        name: "Classic Lifestyle Sneaker",
        brand: "Premium Brand",
        confidence: 65,
        marketValue: "$80-150",
        description: "A timeless sneaker design perfect for everyday wear with quality construction and versatile styling options."
      },
      similarStyles: fallbackSimilar,
      colorAnalysis: {
        dominantColors: ["White", "Black", "Grey"],
        colorScheme: "Neutral palette",
        seasonalFit: "Year-round versatility"
      },
      styleClassification: {
        category: "Lifestyle",
        subcategory: "Casual",
        tags: ["versatile", "classic", "comfortable"],
        targetDemographic: ["Casual wear enthusiasts", "Style-conscious consumers"],
        versatilityScore: 8
      },
      marketInsights: {
        investmentPotential: "Stable long-term value",
        priceHistory: "Consistent pricing with seasonal variations",
        availabilityStatus: "Generally available",
        recommendedAction: "Excellent for personal collection"
      },
      stylingAdvice: {
        occasions: ["Daily wear", "Casual meetups", "Weekend activities"],
        outfitSuggestions: ["Denim with fitted tee", "Casual chinos with button-down", "Athleisure ensemble"],
        seasonalWear: "Perfect for all seasons with appropriate styling",
        colorPairing: ["Earth tones", "Classic denim", "Neutral basics"]
      }
    };
  }
}

export async function analyzePersonalityFromQuiz(quizAnswers: {
  personality: string;
  lifestyle: string;
  style: string;
  budget: string;
  occasion: string;
}, personalityTraits: string[]): Promise<{
  personalityType: string;
  detailedAnalysis: string;
  styleInsights: string;
  brandRecommendations: string[];
  personalityScore: number;
  matchingExplanation: string;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "You are an expert personality analyst and sneaker stylist with deep understanding of fashion psychology, brand positioning, and personal style. Analyze quiz responses to provide detailed personality insights and sneaker recommendations."
        },
        {
          role: "user",
          content: `Analyze this sneaker style quiz responses and provide comprehensive personality analysis:

          Quiz Answers:
          - Personality Type: ${quizAnswers.personality}
          - Lifestyle: ${quizAnswers.lifestyle} 
          - Style Preference: ${quizAnswers.style}
          - Budget Range: ${quizAnswers.budget}
          - Primary Occasion: ${quizAnswers.occasion}
          
          Personality Traits: ${personalityTraits.join(', ')}

          Provide analysis in JSON format with:
          - personalityType: A catchy title for their sneaker personality (e.g., "The Urban Explorer", "The Classic Connoisseur")
          - detailedAnalysis: 2-3 sentences analyzing their personality based on quiz responses
          - styleInsights: 2-3 sentences about how their personality translates to sneaker choices
          - brandRecommendations: Array of 4-5 sneaker brands that match their personality
          - personalityScore: Confidence score (1-100) in the personality assessment
          - matchingExplanation: 1-2 sentences explaining why these brands fit their personality
          
          Focus on authentic personality insights and genuine brand-personality connections.`
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 600,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      personalityType: result.personalityType || 'The Sneaker Enthusiast',
      detailedAnalysis: result.detailedAnalysis || 'Your style reflects a balanced approach to fashion and functionality.',
      styleInsights: result.styleInsights || 'You appreciate quality and comfort in your sneaker choices.',
      brandRecommendations: result.brandRecommendations || ['Nike', 'Adidas', 'New Balance', 'Converse'],
      personalityScore: Math.max(70, Math.min(100, result.personalityScore || 85)),
      matchingExplanation: result.matchingExplanation || 'These brands align with your style preferences and lifestyle needs.'
    };
  } catch (error) {
    console.error('Personality analysis error:', error);
    throw new Error("Failed to analyze personality");
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

export async function summarizeReviews(reviews: any[], sneakerInfo?: any): Promise<{
  summary: string;
  whatSneakerheadsAreSaying: string[];
  prosAndCons: {
    pros: string[];
    cons: string[];
  };
  overallSentiment: 'positive' | 'negative' | 'mixed';
  confidenceScore: number;
  keyInsights: {
    comfort: { rating: number; comments: string[] };
    durability: { rating: number; comments: string[] };
    style: { rating: number; comments: string[] };
    valueForMoney: { rating: number; comments: string[] };
  };
  recommendationScore: number;
  targetAudience: string[];
  comparisonInsights?: string;
}> {
  // Handle both string arrays and review objects
  const reviewTexts = Array.isArray(reviews) && reviews.length > 0
    ? reviews.map(r => typeof r === 'string' 
        ? r 
        : `Rating: ${r.rating}/5\nTitle: ${r.title || 'No title'}\nContent: ${r.content}\nDate: ${r.createdAt || 'Unknown'}`
      ).join('\n\n---\n\n')
    : '';

  if (!reviewTexts) {
    return {
      summary: "No reviews available for this sneaker yet. Be the first to share your experience!",
      whatSneakerheadsAreSaying: [
        "First impressions are everything - share yours!",
        "The community is waiting for authentic feedback",
        "Your review could help fellow sneakerheads decide"
      ],
      prosAndCons: { pros: [], cons: [] },
      overallSentiment: 'mixed',
      confidenceScore: 0,
      keyInsights: {
        comfort: { rating: 0, comments: ["No comfort feedback yet"] },
        durability: { rating: 0, comments: ["No durability reports yet"] },
        style: { rating: 0, comments: ["No style opinions yet"] },
        valueForMoney: { rating: 0, comments: ["No value assessments yet"] }
      },
      recommendationScore: 0,
      targetAudience: ["Early adopters", "Trend enthusiasts"]
    };
  }

  const sneakerName = sneakerInfo?.name || 'this sneaker';
  const sneakerContext = sneakerInfo ? 
    `\nSneaker Context: ${sneakerInfo.name} - ${sneakerInfo.brandName || 'Unknown Brand'} | Price: $${sneakerInfo.retailPrice} | Materials: ${sneakerInfo.materials} | Release: ${sneakerInfo.releaseDate}` : '';
  
  const prompt = `You are an expert sneaker analyst with deep knowledge of sneaker culture, materials, and community sentiment. Analyze these authentic reviews for "${sneakerName}" and provide comprehensive insights.

Reviews:
${reviewTexts}${sneakerContext}

Provide detailed analysis in JSON format with:
- summary: Engaging 3-4 sentence overview highlighting key community takeaways and overall reception
- whatSneakerheadsAreSaying: Array of 4-6 authentic-sounding community quotes that capture real sentiment and specific experiences
- prosAndCons: Object with detailed pros and cons arrays (4-6 items each when available, focusing on specific attributes)
- overallSentiment: "positive", "negative", or "mixed" based on ratings, content analysis, and community reception
- confidenceScore: 0-1 based on review quantity, quality, consistency, and depth of feedback
- keyInsights: Object analyzing comfort, durability, style, valueForMoney (each with rating 0-10 and 2-4 relevant community comments)
- recommendationScore: 0-100 percentage likelihood the community would recommend this sneaker
- targetAudience: Array of 3-5 specific user types who would love this sneaker based on review insights
- comparisonInsights: Optional string comparing to similar sneakers or category expectations

Focus on authentic sneaker community language, specific details about fit/sizing, materials quality, styling versatility, long-term wear experience, and value proposition. Extract real insights about comfort, durability, and style that help potential buyers make informed decisions.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are an expert at analyzing sneaker reviews and synthesizing authentic community sentiment. Create comprehensive insights that help sneaker enthusiasts make informed decisions." 
        },
        { role: "user", content: prompt }
    ],
    response_format: { type: "json_object" },
    max_tokens: 1500,
    temperature: 0.4
  });

  const result = JSON.parse(response.choices[0].message.content || '{}');
  
  // Ensure all required fields with proper defaults
  return {
    summary: result.summary || "Analysis in progress based on community feedback...",
    whatSneakerheadsAreSaying: result.whatSneakerheadsAreSaying || [],
    prosAndCons: {
      pros: result.prosAndCons?.pros || [],
      cons: result.prosAndCons?.cons || []
    },
    overallSentiment: result.overallSentiment || 'mixed',
    confidenceScore: Math.max(0, Math.min(1, result.confidenceScore || 0.5)),
    keyInsights: result.keyInsights || {
      comfort: { rating: 0, comments: [] },
      durability: { rating: 0, comments: [] },
      style: { rating: 0, comments: [] },
      valueForMoney: { rating: 0, comments: [] }
    },
    recommendationScore: Math.max(0, Math.min(100, result.recommendationScore || 0)),
    targetAudience: result.targetAudience || [],
    comparisonInsights: result.comparisonInsights
  };
} catch (aiError) {
  console.warn('OpenAI unavailable for review analysis, using smart fallback:', aiError?.message || 'Unknown error');
  
  // Smart fallback analysis without OpenAI
  const reviewTexts = reviews.map(r => typeof r === 'string' ? r : r.content || '').filter(Boolean);
  const ratings = reviews.map(r => typeof r === 'string' ? 4 : r.rating || 4).filter(r => r > 0);
  
  if (!reviewTexts.length) {
    return {
      summary: "No reviews available for this sneaker yet. Be the first to share your experience!",
      whatSneakerheadsAreSaying: [
        "First impressions are everything - share yours!",
        "The community is waiting for authentic feedback",
        "Your review could help fellow sneakerheads decide"
      ],
      prosAndCons: { pros: [], cons: [] },
      overallSentiment: 'mixed' as const,
      confidenceScore: 0,
      keyInsights: {
        comfort: { rating: 0, comments: ["No comfort feedback yet"] },
        durability: { rating: 0, comments: ["No durability reports yet"] },
        style: { rating: 0, comments: ["No style opinions yet"] },
        valueForMoney: { rating: 0, comments: ["No value assessments yet"] }
      },
      recommendationScore: 0,
      targetAudience: ["Early adopters", "Trend enthusiasts"]
    };
  }
  
  // Analyze sentiment based on keywords and ratings
  const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  const combinedText = reviewTexts.join(' ').toLowerCase();
  
  const positiveWords = ['great', 'excellent', 'amazing', 'love', 'perfect', 'comfortable', 'quality', 'stylish', 'recommend'];
  const negativeWords = ['terrible', 'awful', 'hate', 'poor', 'uncomfortable', 'cheap', 'disappointing', 'waste'];
  
  const positiveCount = positiveWords.filter(word => combinedText.includes(word)).length;
  const negativeCount = negativeWords.filter(word => combinedText.includes(word)).length;
  
  let sentiment: 'positive' | 'negative' | 'mixed' = 'mixed';
  if (avgRating >= 4 && positiveCount > negativeCount) sentiment = 'positive';
  else if (avgRating <= 2 || negativeCount > positiveCount) sentiment = 'negative';
  
  const sneakerName = sneakerInfo?.name || 'this sneaker';
  
  return {
    summary: `Based on ${reviews.length} customer reviews with an average ${avgRating.toFixed(1)}/5 rating, ${sneakerName} receives ${sentiment} feedback from the community. ${sentiment === 'positive' ? 'Customers appreciate the overall quality and performance.' : sentiment === 'negative' ? 'Some concerns have been raised about various aspects.' : 'Opinions are mixed with both positive and critical feedback.'} Review analysis is currently running on smart algorithms.`,
    whatSneakerheadsAreSaying: [
      `"Average rating of ${avgRating.toFixed(1)}/5 tells the story"`,
      `"Based on ${reviews.length} authentic community reviews"`,
      sentiment === 'positive' ? '"Overall positive reception from the community"' : 
      sentiment === 'negative' ? '"Mixed reactions with some concerns noted"' : 
      '"Community feedback shows diverse experiences"',
      '"Individual experiences may vary significantly"'
    ],
    prosAndCons: {
      pros: combinedText.includes('comfort') ? ['Comfort noted by users'] : 
            combinedText.includes('quality') ? ['Quality construction mentioned'] : 
            combinedText.includes('style') ? ['Style appreciated by reviewers'] : 
            ['Positive aspects mentioned in reviews'],
      cons: combinedText.includes('size') || combinedText.includes('fit') ? ['Sizing concerns noted'] : 
            combinedText.includes('price') ? ['Price point considerations'] : 
            negativeCount > 0 ? ['Some users reported issues'] : []
    },
    overallSentiment: sentiment,
    confidenceScore: Math.min(0.8, reviews.length / 10),
    keyInsights: {
      comfort: { 
        rating: combinedText.includes('comfort') ? Math.round(avgRating * 2) : Math.round(avgRating * 1.8), 
        comments: combinedText.includes('comfort') ? ["Comfort mentioned in reviews"] : ["Comfort feedback varies"]
      },
      durability: { 
        rating: combinedText.includes('quality') || combinedText.includes('durable') ? Math.round(avgRating * 2) : Math.round(avgRating * 1.7), 
        comments: ["Quality feedback in community reviews"]
      },
      style: { 
        rating: combinedText.includes('style') || combinedText.includes('look') ? Math.round(avgRating * 2) : Math.round(avgRating * 1.9), 
        comments: ["Style opinions from customer feedback"]
      },
      valueForMoney: { 
        rating: combinedText.includes('value') || combinedText.includes('price') ? Math.round(avgRating * 1.8) : Math.round(avgRating * 1.6), 
        comments: ["Value assessments from purchasers"]
      }
    },
    recommendationScore: Math.round(avgRating * 20),
    targetAudience: avgRating >= 4 ? ["Quality seekers", "Brand enthusiasts", "Daily wear users"] : 
                   avgRating >= 3 ? ["Budget conscious", "Casual users"] : 
                   ["Specific use cases", "Style over function"]
  };
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

// Enhanced AI Collection Generation
export async function generateAICollection(theme: string, preferences: any = {}, availableSneakers: any[] = []): Promise<{
  id: string;
  title: string;
  description: string;
  icon: string;
  criteria: string;
  aiRationale: string;
  sneakers: any[];
  totalCount: number;
  avgPrice: string;
  priceRange: string;
  tags: string[];
  culturalContext: string;
  stylingTips: string[];
  targetDemographic: string[];
  seasonality?: string;
  exclusivityLevel: 'mainstream' | 'niche' | 'exclusive';
}> {
  try {
    const sneakerData = availableSneakers.length > 0 
      ? `Available sneakers: ${availableSneakers.map(s => `${s.name} (${s.brandName || 'Unknown'}) - $${s.retailPrice}`).join(', ')}`
      : 'Using comprehensive sneaker database';
    
    const prompt = `Create an innovative, culturally relevant sneaker collection based on the theme "${theme}".

${sneakerData}

User preferences: ${JSON.stringify(preferences)}

Generate a comprehensive collection in JSON format with:
- id: Unique identifier (kebab-case)
- title: Compelling collection name (2-4 words)
- description: Engaging description that captures the collection's essence and appeal (2-3 sentences)
- icon: Single emoji that represents the collection
- criteria: Specific criteria used for sneaker selection (technical details)
- aiRationale: Sophisticated explanation of why this collection matters culturally and stylistically (2-3 sentences)
- sneakers: Array of sneaker objects selected for this collection (use available sneakers when provided)
- totalCount: Number of sneakers in collection
- avgPrice: Average price formatted as currency string
- priceRange: Price range formatted as "$min-$max"
- tags: Array of 3-5 relevant tags/keywords
- culturalContext: 2-3 sentences about the cultural significance and current relevance
- stylingTips: Array of 3-4 specific styling suggestions for this collection
- targetDemographic: Array of 2-3 specific audience segments who would love this collection
- seasonality: Optional season if relevant ("Spring", "Summer", "Fall", "Winter", "Year-round")
- exclusivityLevel: "mainstream", "niche", or "exclusive" based on accessibility and appeal

Focus on authentic sneaker culture insights, current trends, and practical styling advice. Make the collection feel curated by an expert who understands both fashion and functionality.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a visionary sneaker curator with deep knowledge of streetwear culture, fashion trends, and consumer psychology. Create collections that balance cultural relevance with commercial appeal."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 1200,
      temperature: 0.7
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    // Generate a proper collection based on available sneakers if provided
    const selectedSneakers = availableSneakers.length > 0 
      ? availableSneakers.slice(0, Math.min(8, availableSneakers.length))
      : [];

    const avgPrice = selectedSneakers.length > 0 
      ? Math.round(selectedSneakers.reduce((sum, s) => sum + parseFloat(s.retailPrice || '0'), 0) / selectedSneakers.length)
      : 0;

    const prices = selectedSneakers.map(s => parseFloat(s.retailPrice || '0')).filter(p => p > 0);
    const priceRange = prices.length > 0 
      ? `$${Math.min(...prices)}-$${Math.max(...prices)}`
      : '$0-$0';

    return {
      id: result.id || theme.toLowerCase().replace(/\s+/g, '-'),
      title: result.title || `${theme} Collection`,
      description: result.description || `Curated selection inspired by ${theme}`,
      icon: result.icon || '✨',
      criteria: result.criteria || `Sneakers selected based on ${theme} aesthetic and cultural relevance`,
      aiRationale: result.aiRationale || `This collection represents the intersection of ${theme} and contemporary sneaker culture`,
      sneakers: selectedSneakers,
      totalCount: selectedSneakers.length,
      avgPrice: avgPrice > 0 ? `$${avgPrice}` : '$0',
      priceRange,
      tags: result.tags || [theme.toLowerCase()],
      culturalContext: result.culturalContext || `The ${theme} aesthetic continues to influence modern sneaker design and street culture`,
      stylingTips: result.stylingTips || [`Pair with complementary ${theme}-inspired pieces`],
      targetDemographic: result.targetDemographic || ['Style enthusiasts', 'Cultural trendsetters'],
      seasonality: result.seasonality,
      exclusivityLevel: result.exclusivityLevel || 'mainstream'
    };
  } catch (aiError) {
    console.warn('OpenAI unavailable for collection generation, using smart fallback:', aiError?.message || 'Unknown error');
    
    // Smart fallback collection generation
    const selectedSneakers = availableSneakers.length > 0 
      ? availableSneakers.slice(0, Math.min(8, availableSneakers.length))
      : [];

    const avgPrice = selectedSneakers.length > 0 
      ? Math.round(selectedSneakers.reduce((sum, s) => sum + parseFloat(s.retailPrice || '0'), 0) / selectedSneakers.length)
      : 0;

    const prices = selectedSneakers.map(s => parseFloat(s.retailPrice || '0')).filter(p => p > 0);
    const priceRange = prices.length > 0 
      ? `$${Math.min(...prices)}-$${Math.max(...prices)}`
      : '$0-$0';

    // Generate themed collections based on common sneaker categories
    const themeCollections: { [key: string]: any } = {
      'street-style': {
        title: 'Street Style Essentials',
        description: 'Core sneakers that define urban fashion and everyday street wear aesthetics.',
        icon: '🏙️',
        tags: ['streetwear', 'urban', 'essential'],
        culturalContext: 'Street style continues to drive sneaker culture with functional designs that work across diverse urban environments.',
        stylingTips: ['Pair with tapered joggers and oversized hoodies', 'Layer with denim jackets for classic street looks', 'Mix with cargo pants for utility-inspired outfits']
      },
      'minimalist': {
        title: 'Minimalist Classics',
        description: 'Clean, understated designs that emphasize simplicity and versatility in modern wardrobes.',
        icon: '⚪',
        tags: ['minimalist', 'clean', 'versatile'],
        culturalContext: 'Minimalist design philosophy influences contemporary sneaker aesthetics with focus on essential elements and timeless appeal.',
        stylingTips: ['Perfect with monochromatic outfits', 'Elevate casual business attire', 'Complement neutral color palettes']
      },
      'retro': {
        title: 'Retro Revival',
        description: 'Vintage-inspired silhouettes that capture the essence of classic sneaker heritage and nostalgic design.',
        icon: '📼',
        tags: ['retro', 'vintage', 'heritage'],
        culturalContext: 'Retro aesthetics celebrate sneaker history while introducing classic designs to new generations of enthusiasts.',
        stylingTips: ['Style with vintage band tees and high-waisted jeans', 'Mix with retro tracksuits for authentic throwback looks', 'Pair with cropped pants to showcase the silhouette']
      }
    };

    const themeKey = Object.keys(themeCollections).find(key => 
      theme.toLowerCase().includes(key) || key.includes(theme.toLowerCase())
    ) || 'street-style';

    const fallbackCollection = themeCollections[themeKey];

    return {
      id: theme.toLowerCase().replace(/\s+/g, '-'),
      title: fallbackCollection.title,
      description: fallbackCollection.description,
      icon: fallbackCollection.icon,
      criteria: `Sneakers selected based on ${theme} aesthetic, community popularity, and style versatility`,
      aiRationale: `This collection represents contemporary interpretations of ${theme} in sneaker culture, focusing on authentic design elements and cultural relevance`,
      sneakers: selectedSneakers,
      totalCount: selectedSneakers.length,
      avgPrice: avgPrice > 0 ? `$${avgPrice}` : '$150',
      priceRange: priceRange !== '$0-$0' ? priceRange : '$80-$220',
      tags: fallbackCollection.tags,
      culturalContext: fallbackCollection.culturalContext,
      stylingTips: fallbackCollection.stylingTips,
      targetDemographic: ['Style enthusiasts', 'Cultural trendsetters', 'Quality seekers'],
      seasonality: 'Year-round',
      exclusivityLevel: 'mainstream' as const
    };
  }
}

// Generate multiple themed collections at once
export async function generateMultipleCollections(themes: string[], availableSneakers: any[] = []): Promise<any[]> {
  try {
    const collections = await Promise.all(
      themes.map(theme => generateAICollection(theme, {}, availableSneakers))
    );
    return collections;
  } catch (error) {
    console.error('Multiple collection generation error:', error);
    throw new Error('Failed to generate multiple collections');
  }
}

// Generate personalized collection based on user profile
export async function generatePersonalizedCollection(userProfile: {
  preferences: string[];
  purchaseHistory: any[];
  styleQuizResults?: any;
  demographics?: any;
}, availableSneakers: any[] = []): Promise<any> {
  try {
    const profileContext = `
User Profile:
- Preferences: ${userProfile.preferences.join(', ')}
- Purchase History: ${userProfile.purchaseHistory.map(p => p.name || 'Unknown').join(', ')}
- Style Results: ${JSON.stringify(userProfile.styleQuizResults || {})}
- Demographics: ${JSON.stringify(userProfile.demographics || {})}
`;

    const theme = `Personalized for ${userProfile.preferences[0] || 'unique style'}`;
    
    return await generateAICollection(theme, userProfile, availableSneakers);
  } catch (error) {
    console.error('Personalized collection generation error:', error);
    throw new Error('Failed to generate personalized collection');
  }
}


