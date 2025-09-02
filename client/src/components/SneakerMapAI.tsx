import { useState } from 'react'

interface CityTrend {
  city: string
  state: string
  trend: string
  popular_styles: string[]
  heat_level: number
  insights: string
}

export default function SneakerMapAI() {
  const [cityTrends] = useState<CityTrend[]>([
    {
      city: 'New York',
      state: 'NY',
      trend: 'High-Fashion Streetwear',
      popular_styles: ['Jordan Retros', 'Luxury Sneakers', 'Limited Editions'],
      heat_level: 95,
      insights: 'NYC drives premium sneaker trends with strong focus on exclusivity and statement pieces'
    },
    {
      city: 'Los Angeles',
      state: 'CA',
      trend: 'Athletic Performance',
      popular_styles: ['Performance Basketball', 'Running Shoes', 'Lifestyle Athletic'],
      heat_level: 88,
      insights: 'LA culture emphasizes performance and lifestyle fusion with celebrity influence'
    },
    {
      city: 'Chicago',
      state: 'IL',
      trend: 'Classic Americana',
      popular_styles: ['Air Jordan Heritage', 'Classic Basketball', 'Retro Runners'],
      heat_level: 85,
      insights: 'Chicago maintains strong loyalty to heritage brands and classic silhouettes'
    },
    {
      city: 'Atlanta',
      state: 'GA',
      trend: 'Southern Comfort',
      popular_styles: ['Lifestyle Comfort', 'Fashion Sneakers', 'Hip-Hop Culture'],
      heat_level: 78,
      insights: 'Atlanta blends comfort with style, heavily influenced by music culture'
    },
    {
      city: 'Miami',
      state: 'FL',
      trend: 'Vibrant Colors',
      popular_styles: ['Colorful Editions', 'Beach Lifestyle', 'Latin Influence'],
      heat_level: 82,
      insights: 'Miami favors bold colors and tropical vibes in sneaker choices'
    }
  ])

  const [selectedCity, setSelectedCity] = useState<CityTrend | null>(null)

  const getHeatColor = (level: number) => {
    if (level >= 90) return 'from-red-500 to-orange-500'
    if (level >= 80) return 'from-orange-500 to-yellow-500'
    if (level >= 70) return 'from-yellow-500 to-green-500'
    return 'from-green-500 to-blue-500'
  }

  return (
    <div className="sneaker-map-ai max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Map Visualization */}
        <div className="map-section">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-center">🗺️ US Sneaker Heat Map</h3>
            
            <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg h-80 overflow-hidden">
              <div className="absolute inset-4 space-y-2">
                {cityTrends.map((city, index) => (
                  <div
                    key={index}
                    className={`city-marker absolute cursor-pointer transition-all hover:scale-110 ${
                      selectedCity?.city === city.city ? 'scale-125 z-10' : ''
                    }`}
                    style={{
                      left: `${20 + (index * 15)}%`,
                      top: `${30 + (index * 10)}%`
                    }}
                    onClick={() => setSelectedCity(city)}
                  >
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${getHeatColor(city.heat_level)} shadow-lg`}></div>
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                      {city.city}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Heat Level:</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500"></div>
                    <span>Low</span>
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-green-500"></div>
                    <span>Medium</span>
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500"></div>
                    <span>High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* City Details */}
        <div className="details-section">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            {selectedCity ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold">{selectedCity.city}, {selectedCity.state}</h3>
                  <p className="text-lg text-purple-600 dark:text-purple-400 font-medium">
                    {selectedCity.trend}
                  </p>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <span className="text-sm">Heat Level:</span>
                    <div className={`w-16 h-2 rounded-full bg-gradient-to-r ${getHeatColor(selectedCity.heat_level)}`}></div>
                    <span className="font-bold">{selectedCity.heat_level}%</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-3">🔥 Popular Styles</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCity.popular_styles.map((style, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-3">📊 AI Market Insights</h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm leading-relaxed">{selectedCity.insights}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Select a City</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Click any city on the map to see AI-powered trend analysis and market insights
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* National Trends */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-center">🌟 National AI Trend Analysis</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg">
            <div className="text-2xl mb-2">🔥</div>
            <p className="font-bold">Hottest Trend</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Retro Basketball</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
            <div className="text-2xl mb-2">📈</div>
            <p className="font-bold">Rising Market</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Women's Sneakers</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <div className="text-2xl mb-2">💎</div>
            <p className="font-bold">Premium Focus</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Limited Editions</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <p className="font-bold">Fast Growing</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sustainable Brands</p>
          </div>
        </div>
      </div>
    </div>
  )
}