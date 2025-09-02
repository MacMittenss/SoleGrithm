import { useState } from 'react'
import aiService, { type SneakerRecommendation } from '../services/aiService'

interface QuizAnswers {
  style_preference: string
  occasion: string
  color_preference: string
  brand_preference: string
  budget: string
  personality: string
}

export default function StyleQuizForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({
    style_preference: '',
    occasion: '',
    color_preference: '',
    brand_preference: '',
    budget: '',
    personality: ''
  })
  const [recommendations, setRecommendations] = useState<SneakerRecommendation[]>([])
  const [styleProfile, setStyleProfile] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      question: "What's your preferred sneaker style?",
      field: 'style_preference' as keyof QuizAnswers,
      options: ['Classic/Retro', 'Modern/Futuristic', 'Minimalist', 'Bold/Statement', 'Athletic Performance']
    },
    {
      question: "When do you wear sneakers most?",
      field: 'occasion' as keyof QuizAnswers,
      options: ['Daily casual', 'Work/Professional', 'Workouts/Sports', 'Special events', 'Street fashion']
    },
    {
      question: "What colors do you gravitate toward?",
      field: 'color_preference' as keyof QuizAnswers,
      options: ['Neutral (Black/White/Gray)', 'Earth tones', 'Bright/Neon', 'Pastels', 'Bold/Dark colors']
    },
    {
      question: "Do you have brand preferences?",
      field: 'brand_preference' as keyof QuizAnswers,
      options: ['Nike', 'Adidas', 'Jordan', 'New Balance', 'No preference', 'Emerging brands']
    },
    {
      question: "What's your budget range?",
      field: 'budget' as keyof QuizAnswers,
      options: ['Under $100', '$100-200', '$200-300', '$300-500', '$500+']
    },
    {
      question: "How would you describe your style?",
      field: 'personality' as keyof QuizAnswers,
      options: ['Trendsetter', 'Classic', 'Comfort-focused', 'Performance-driven', 'Collector']
    }
  ]

  const handleAnswer = (value: string) => {
    const field = questions[currentQuestion].field
    setAnswers(prev => ({ ...prev, [field]: value }))
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      processQuizResults({ ...answers, [field]: value })
    }
  }

  const processQuizResults = async (finalAnswers: QuizAnswers) => {
    setIsLoading(true)
    try {
      const result = await aiService.processStyleQuiz(finalAnswers)
      setRecommendations(result.recommendations)
      setStyleProfile(result.style_profile)
      setShowResults(true)
    } catch (error) {
      console.error('Quiz processing error:', error)
      setRecommendations([])
      setStyleProfile('Unable to generate your style profile at this time.')
      setShowResults(true)
    } finally {
      setIsLoading(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({
      style_preference: '',
      occasion: '',
      color_preference: '',
      brand_preference: '',
      budget: '',
      personality: ''
    })
    setRecommendations([])
    setStyleProfile('')
    setShowResults(false)
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <h3 className="text-xl font-bold mb-2">Analyzing Your Style...</h3>
        <p className="text-gray-600 dark:text-gray-400">AI is creating your personalized recommendations</p>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="quiz-results max-w-4xl mx-auto">
        {/* Style Profile */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold mb-4">🎯 Your Style Profile</h3>
          <p className="text-lg leading-relaxed">{styleProfile}</p>
        </div>

        {/* Recommendations */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center">🚀 AI-Powered Recommendations</h3>
          
          {recommendations.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-2xl">👟</span>
                    </div>
                    <h4 className="font-bold text-lg">{rec.name}</h4>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">{rec.brand}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{rec.style}</p>
                    <p className="text-lg font-bold text-green-600">{rec.price_range}</p>
                    <p className="text-sm leading-relaxed">{rec.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">No recommendations available. Please try again.</p>
            </div>
          )}
        </div>

        <button
          onClick={resetQuiz}
          className="w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors font-medium"
        >
          Take Quiz Again
        </button>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="style-quiz max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-6 text-center">
          {questions[currentQuestion].question}
        </h3>
        
        <div className="grid gap-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              <span className="font-medium">{option}</span>
            </button>
          ))}
        </div>
        
        {currentQuestion > 0 && (
          <button
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            className="mt-6 text-purple-600 dark:text-purple-400 hover:underline"
          >
            ← Previous Question
          </button>
        )}
      </div>
    </div>
  )
}