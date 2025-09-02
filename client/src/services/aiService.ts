export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: Date
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

export interface PricePrediction {
  prediction: string
  factors: string[]
  confidence: number
}

class AIService {
  private baseUrl = '/api/ai'

  // SoleBot Chat
  async chat(messages: ChatMessage[]): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages })
      })
      
      if (!response.ok) {
        throw new Error('Chat request failed')
      }
      
      const data = await response.json()
      return data.response
    } catch (error) {
      console.error('Chat error:', error)
      return "I'm having trouble connecting right now. Let's talk about sneakers when I'm back online!"
    }
  }

  // Sneaker Image Analysis
  async analyzeImage(imageUrl: string): Promise<ImageAnalysis> {
    try {
      const response = await fetch(`${this.baseUrl}/analyze-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageUrl })
      })
      
      if (!response.ok) {
        throw new Error('Image analysis failed')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Image analysis error:', error)
      return {
        brand: 'Unknown',
        model: 'Analysis unavailable',
        colorway: 'Unknown',
        confidence: 0,
        market_insights: 'Unable to analyze image at this time.'
      }
    }
  }

  // Get Personalized Recommendations
  async getRecommendations(preferences: string, budget?: string): Promise<SneakerRecommendation[]> {
    try {
      const response = await fetch(`${this.baseUrl}/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ preferences, budget })
      })
      
      if (!response.ok) {
        throw new Error('Recommendations request failed')
      }
      
      const data = await response.json()
      return data.recommendations
    } catch (error) {
      console.error('Recommendations error:', error)
      return []
    }
  }

  // Market Price Prediction
  async predictPrice(sneakerName: string, condition: string = 'new'): Promise<PricePrediction> {
    try {
      const response = await fetch(`${this.baseUrl}/price-prediction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sneakerName, condition })
      })
      
      if (!response.ok) {
        throw new Error('Price prediction failed')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Price prediction error:', error)
      return {
        prediction: 'Unable to predict',
        factors: ['Service temporarily unavailable'],
        confidence: 0
      }
    }
  }

  // Style Quiz Processing
  async processStyleQuiz(answers: Record<string, any>): Promise<{
    recommendations: SneakerRecommendation[]
    style_profile: string
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/style-quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers })
      })
      
      if (!response.ok) {
        throw new Error('Style quiz processing failed')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Style quiz error:', error)
      return {
        recommendations: [],
        style_profile: 'Unable to generate style profile at this time.'
      }
    }
  }

  // Upload and analyze image file
  async analyzeImageFile(file: File): Promise<ImageAnalysis> {
    try {
      // Convert file to base64 data URL
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.readAsDataURL(file)
      })
      
      return await this.analyzeImage(base64)
    } catch (error) {
      console.error('File analysis error:', error)
      return {
        brand: 'Unknown',
        model: 'File analysis failed',
        colorway: 'Unknown',
        confidence: 0,
        market_insights: 'Unable to process this image file.'
      }
    }
  }
}

export const aiService = new AIService()
export default aiService