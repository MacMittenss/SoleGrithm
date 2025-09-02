import { useState, useEffect } from 'react'
import aiService, { type SneakerRecommendation } from '../services/aiService'

export default function AIRecommendationsGrid() {
  const [recommendations, setRecommendations] = useState<SneakerRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadRecommendations()
  }, [])

  const loadRecommendations = async () => {
    setIsLoading(true)
    try {
      const result = await aiService.getRecommendations(
        'trending sneakers for sneaker enthusiasts and collectors',
        '$100-500'
      )
      setRecommendations(result)
    } catch (error) {
      console.error('Failed to load recommendations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="ai-recommendations py-12">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg font-medium">AI is curating recommendations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="ai-recommendations">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">🤖 AI Picks of the Day</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Our AI analyzes current trends, market data, and community preferences to recommend these hot sneakers
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => (
          <div key={index} className="recommendation-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105">
            <div className="gradient-bg h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="text-white font-bold text-lg">{rec.name}</h4>
                <p className="text-white/80 text-sm">{rec.brand}</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Style</span>
                  <span className="text-sm font-bold">{rec.style}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Price Range</span>
                  <span className="text-lg font-bold text-green-600">{rec.price_range}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  <span className="font-medium">Why AI Recommends:</span> {rec.reason}
                </p>
              </div>
              
              <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={loadRecommendations}
          className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors font-medium"
        >
          🔄 Get Fresh AI Recommendations
        </button>
      </div>
    </div>
  )
}