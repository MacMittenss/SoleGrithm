import { useState } from 'react'
import aiService from '../services/aiService'

interface PricePrediction {
  prediction: string
  factors: string[]
  confidence: number
}

export default function LiveMarketPredictions() {
  const [sneakerName, setSneakerName] = useState('')
  const [condition, setCondition] = useState('new')
  const [prediction, setPrediction] = useState<PricePrediction | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePredict = async () => {
    if (!sneakerName.trim()) return

    setIsLoading(true)
    try {
      const result = await aiService.predictPrice(sneakerName, condition)
      setPrediction(result)
    } catch (error) {
      console.error('Prediction error:', error)
      setPrediction({
        prediction: 'Unable to predict',
        factors: ['Service temporarily unavailable'],
        confidence: 0
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePredict()
    }
  }

  return (
    <div className="market-predictions max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-6 text-center">💰 AI Price Prediction</h3>
        
        {/* Input Form */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Sneaker Name</label>
            <input
              type="text"
              value={sneakerName}
              onChange={(e) => setSneakerName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., Air Jordan 1 High Chicago"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="new">Brand New</option>
              <option value="vnds">Very Near Deadstock</option>
              <option value="used">Used</option>
              <option value="worn">Well Worn</option>
            </select>
          </div>
          
          <button
            onClick={handlePredict}
            disabled={!sneakerName.trim() || isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg transition-colors font-medium"
          >
            {isLoading ? 'Analyzing Market...' : 'Get AI Price Prediction'}
          </button>
        </div>

        {/* Prediction Results */}
        {prediction && (
          <div className="border-t dark:border-gray-700 pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-lg mb-3">💵 Predicted Price</h4>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {prediction.prediction}
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Confidence:</span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-24">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${prediction.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{Math.round(prediction.confidence * 100)}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-3">📊 Market Factors</h4>
                <div className="space-y-2">
                  {prediction.factors.map((factor, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{factor}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}