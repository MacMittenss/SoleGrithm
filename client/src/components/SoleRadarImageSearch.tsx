import { useState, useRef } from 'react'
import aiService, { type ImageAnalysis } from '../services/aiService'

export default function SoleRadarImageSearch() {
  const [analysis, setAnalysis] = useState<ImageAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    setIsLoading(true)
    try {
      const result = await aiService.analyzeImageFile(file)
      setAnalysis(result)
    } catch (error) {
      console.error('Analysis error:', error)
      setAnalysis({
        brand: 'Error',
        model: 'Analysis failed',
        colorway: 'Unknown',
        confidence: 0,
        market_insights: 'Unable to analyze this image. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file) handleImageUpload(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => {
    setDragActive(false)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleImageUpload(file)
  }

  return (
    <div className="soleradar-search max-w-4xl mx-auto">
      {/* Image Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {isLoading ? (
          <div className="space-y-4">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-lg font-medium">Analyzing your sneaker...</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI vision processing in progress</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-orange-500 rounded-full mx-auto flex items-center justify-center">
              <span className="text-2xl">📸</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Upload Sneaker Image</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Drop an image here or click to browse
              </p>
              <p className="text-sm text-gray-500 mt-2">
                AI will identify brand, model, colorway & market insights
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-center">🔍 SoleRadar Analysis</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Brand</label>
                <p className="text-lg font-bold">{analysis.brand}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Model</label>
                <p className="text-lg font-bold">{analysis.model}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Colorway</label>
                <p className="text-lg">{analysis.colorway}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Confidence</label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-orange-500 h-2 rounded-full transition-all"
                      style={{ width: `${analysis.confidence * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{Math.round(analysis.confidence * 100)}%</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Market Insights</label>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-2">
                <p className="text-sm leading-relaxed">{analysis.market_insights}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setAnalysis(null)}
            className="w-full mt-6 bg-gradient-to-r from-green-500 to-orange-500 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-orange-600 transition-colors"
          >
            Analyze Another Sneaker
          </button>
        </div>
      )}
    </div>
  )
}