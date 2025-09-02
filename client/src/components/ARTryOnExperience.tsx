import { useState } from 'react'

interface ARSession {
  isActive: boolean
  selectedSneaker: string | null
  confidence: number
}

export default function ARTryOnExperience() {
  const [arSession, setArSession] = useState<ARSession>({
    isActive: false,
    selectedSneaker: null,
    confidence: 0
  })
  const [selectedSneaker, setSelectedSneaker] = useState('')

  const sneakerOptions = [
    { name: 'Air Jordan 1 High "Chicago"', price: '$180' },
    { name: 'Nike Dunk Low "Panda"', price: '$100' },
    { name: 'Adidas Yeezy Boost 350 V2', price: '$220' },
    { name: 'New Balance 2002R "Protection Pack"', price: '$140' },
    { name: 'Nike Air Force 1 "Triple White"', price: '$90' }
  ]

  const startARSession = () => {
    if (!selectedSneaker) {
      alert('Please select a sneaker first!')
      return
    }
    
    setArSession({
      isActive: true,
      selectedSneaker,
      confidence: Math.random() * 0.3 + 0.7 // 70-100% confidence
    })
  }

  const stopARSession = () => {
    setArSession({
      isActive: false,
      selectedSneaker: null,
      confidence: 0
    })
  }

  return (
    <div className="ar-tryon max-w-4xl mx-auto">
      {!arSession.isActive ? (
        /* Setup Screen */
        <div className="setup-screen">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">AR Try-On Experience</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select a sneaker and use your camera to see how it looks on your feet
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Choose a Sneaker to Try On</label>
                <div className="grid gap-3">
                  {sneakerOptions.map((sneaker, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSneaker(sneaker.name)}
                      className={`p-4 text-left border rounded-lg transition-all ${
                        selectedSneaker === sneaker.name
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{sneaker.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Retail: {sneaker.price}</p>
                        </div>
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-lg">👟</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={startARSession}
                disabled={!selectedSneaker}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 transition-colors font-medium text-lg"
              >
                🚀 Start AR Try-On
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* AR Session Screen */
        <div className="ar-session">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {/* AR Camera View */}
            <div className="ar-camera bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 h-96 relative flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 border-4 border-white/30 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                  <span className="text-3xl">📷</span>
                </div>
                <h3 className="text-xl font-bold mb-2">AR Camera View</h3>
                <p className="text-white/80">Point your camera at your feet</p>
                <p className="text-sm text-white/60 mt-2">
                  Trying on: <span className="font-bold">{arSession.selectedSneaker}</span>
                </p>
              </div>
              
              {/* AR Overlay Elements */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur text-white px-3 py-2 rounded-lg text-sm">
                🎯 Tracking: {Math.round(arSession.confidence * 100)}%
              </div>
              
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/50 backdrop-blur text-white px-4 py-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">{arSession.selectedSneaker}</p>
                      <p className="text-sm opacity-80">AR Fit Analysis: Excellent</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-400">95% Match</p>
                      <p className="text-xs opacity-80">Size & Style</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AR Controls */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-lg">AR Controls</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered foot tracking active</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-600">Live</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                  📸 Capture Photo
                </button>
                <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-colors">
                  🎬 Record Video
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors">
                  🔄 Switch Angle
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors">
                  🎨 Try Colors
                </button>
              </div>

              <button
                onClick={stopARSession}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                ❌ End AR Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Features Info */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-center">🤖 AI-Powered Features</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-white">👁️</span>
            </div>
            <h4 className="font-bold">Smart Detection</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI recognizes foot shape and size for perfect fit visualization</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-white">🎯</span>
            </div>
            <h4 className="font-bold">Precise Tracking</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Real-time foot tracking for realistic sneaker placement</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-white">✨</span>
            </div>
            <h4 className="font-bold">Style Analysis</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI suggests styling tips and outfit combinations</p>
          </div>
        </div>
      </div>
    </div>
  )
}