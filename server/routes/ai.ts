import express from 'express'
import { 
  chatWithSoleBot, 
  analyzeSneakerImage, 
  getPersonalizedRecommendations,
  predictSneakerPrice,
  type ChatMessage 
} from '../openai'

const router = express.Router()

// SoleBot Chat Endpoint
router.post('/chat', async (req, res) => {
  try {
    const { messages }: { messages: ChatMessage[] } = req.body
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' })
    }
    
    const response = await chatWithSoleBot(messages)
    res.json({ response })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Failed to process chat request' })
  }
})

// Sneaker Image Analysis
router.post('/analyze-image', async (req, res) => {
  try {
    const { imageUrl }: { imageUrl: string } = req.body
    
    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' })
    }
    
    const analysis = await analyzeSneakerImage(imageUrl)
    res.json(analysis)
  } catch (error) {
    console.error('Image analysis error:', error)
    res.status(500).json({ error: 'Failed to analyze image' })
  }
})

// Personalized Recommendations
router.post('/recommendations', async (req, res) => {
  try {
    const { preferences, budget }: { preferences: string; budget?: string } = req.body
    
    if (!preferences) {
      return res.status(400).json({ error: 'User preferences are required' })
    }
    
    const recommendations = await getPersonalizedRecommendations(preferences, budget)
    res.json({ recommendations })
  } catch (error) {
    console.error('Recommendations error:', error)
    res.status(500).json({ error: 'Failed to get recommendations' })
  }
})

// Market Price Prediction
router.post('/price-prediction', async (req, res) => {
  try {
    const { sneakerName, condition }: { sneakerName: string; condition?: string } = req.body
    
    if (!sneakerName) {
      return res.status(400).json({ error: 'Sneaker name is required' })
    }
    
    const prediction = await predictSneakerPrice(sneakerName, condition)
    res.json(prediction)
  } catch (error) {
    console.error('Price prediction error:', error)
    res.status(500).json({ error: 'Failed to predict price' })
  }
})

// AI-Powered Style Quiz
router.post('/style-quiz', async (req, res) => {
  try {
    const { answers }: { answers: Record<string, any> } = req.body
    
    const preferences = Object.entries(answers)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ')
    
    const recommendations = await getPersonalizedRecommendations(
      `Style quiz results - ${preferences}`,
      answers.budget
    )
    
    res.json({ 
      recommendations,
      style_profile: `Based on your quiz results, you prefer ${preferences}` 
    })
  } catch (error) {
    console.error('Style quiz error:', error)
    res.status(500).json({ error: 'Failed to process style quiz' })
  }
})

export default router