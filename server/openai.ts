import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is required')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface SneakerRecommendation {
  name: string
  brand: string
  style: string
  reason: string
  price_range: string
}

export interface ImageAnalysis {
  brand: string
  model: string
  colorway: string
  confidence: number
  market_insights: string
}

// SoleBot Chat Assistant
export async function chatWithSoleBot(messages: ChatMessage[]): Promise<string> {
  try {
    const systemPrompt = `You are SoleBot, the ultimate sneaker expert AI assistant for SOLEGRITHM. You have deep knowledge about:
    - Sneaker history, brands, and releases
    - Market trends and pricing
    - Style recommendations
    - Sneaker culture and community
    
    Keep responses friendly, knowledgeable, and passionate about sneakers. Always provide specific brand/model recommendations when possible.`
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.7
    })
    
    return response.choices[0]?.message?.content || 'Sorry, I had trouble processing that. Try asking about specific sneakers!'
  } catch (error) {
    console.error('SoleBot chat error:', error)
    return 'I\'m having trouble right now. Ask me about your favorite sneakers and I\'ll get back to you!'
  }
}

// Sneaker Image Recognition
export async function analyzeSneakerImage(imageUrl: string): Promise<ImageAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this sneaker image. Identify the brand, model, colorway, and provide market insights. Return as JSON with fields: brand, model, colorway, confidence (0-1), market_insights.'
            },
            {
              type: 'image_url',
              image_url: { url: imageUrl }
            }
          ]
        }
      ],
      max_tokens: 300
    })
    
    const content = response.choices[0]?.message?.content
    if (content) {
      const analysis = JSON.parse(content)
      return analysis
    }
    
    throw new Error('No analysis returned')
  } catch (error) {
    console.error('Image analysis error:', error)
    return {
      brand: 'Unknown',
      model: 'Analysis failed',
      colorway: 'Unknown',
      confidence: 0,
      market_insights: 'Unable to analyze this image. Try a clearer photo of the sneaker.'
    }
  }
}

// Personalized Sneaker Recommendations
export async function getPersonalizedRecommendations(
  userPreferences: string,
  budget?: string
): Promise<SneakerRecommendation[]> {
  try {
    const prompt = `Based on these user preferences: "${userPreferences}" ${budget ? `and budget: ${budget}` : ''}, 
    recommend 3 specific sneakers. Include brand, model name, style category, reason for recommendation, and price range.
    Return as JSON array with fields: name, brand, style, reason, price_range.`
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.7
    })
    
    const content = response.choices[0]?.message?.content
    if (content) {
      const recommendations = JSON.parse(content)
      return Array.isArray(recommendations) ? recommendations : []
    }
    
    return []
  } catch (error) {
    console.error('Recommendations error:', error)
    return [
      {
        name: 'Air Jordan 1 High',
        brand: 'Jordan',
        style: 'Classic High-Top',
        reason: 'Timeless design perfect for any sneaker collection',
        price_range: '$120-180'
      },
      {
        name: 'Nike Air Force 1',
        brand: 'Nike',
        style: 'Classic Low-Top',
        reason: 'Versatile everyday sneaker with iconic style',
        price_range: '$90-120'
      },
      {
        name: 'Adidas Stan Smith',
        brand: 'Adidas',
        style: 'Minimalist Court',
        reason: 'Clean, simple design that goes with everything',
        price_range: '$75-100'
      }
    ]
  }
}

// Market Price Prediction
export async function predictSneakerPrice(sneakerName: string, condition: string = 'new'): Promise<{
  prediction: string
  factors: string[]
  confidence: number
}> {
  try {
    const prompt = `Analyze market trends for "${sneakerName}" in ${condition} condition. 
    Predict current market price, key factors affecting price, and confidence level.
    Return as JSON with fields: prediction (price range), factors (array), confidence (0-1).`
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300
    })
    
    const content = response.choices[0]?.message?.content
    if (content) {
      return JSON.parse(content)
    }
    
    throw new Error('No prediction returned')
  } catch (error) {
    console.error('Price prediction error:', error)
    return {
      prediction: 'Unable to predict',
      factors: ['Market data unavailable'],
      confidence: 0
    }
  }
}

export default openai