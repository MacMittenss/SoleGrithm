import { useState } from 'react'

interface CommunityPost {
  id: number
  author: string
  content: string
  likes: number
  sneaker: string
  image?: string
  time: string
}

export default function WomenSneakersCommunity() {
  const [posts] = useState<CommunityPost[]>([
    {
      id: 1,
      author: 'SneakerQueen_NYC',
      content: 'Just got these Jordan 1 High OG "Lost & Found" and I\'m obsessed! The vintage aesthetic is everything. Perfect for both casual and dressy outfits.',
      likes: 247,
      sneaker: 'Air Jordan 1 High OG "Lost & Found"',
      time: '2 hours ago'
    },
    {
      id: 2,
      author: 'KickCollectorLA',
      content: 'Women\'s sneaker game is rising! Loving how brands are finally giving us more colorways and better fits. What\'s your latest cop?',
      likes: 189,
      sneaker: 'Nike Dunk Low "Panda"',
      time: '4 hours ago'
    },
    {
      id: 3,
      author: 'StreetStyleMaven',
      content: 'AI styling tip: Pair chunky sneakers with midi dresses for that perfect street-luxe vibe. Currently rocking my New Balance 2002Rs everywhere!',
      likes: 156,
      sneaker: 'New Balance 2002R "Protection Pack"',
      time: '6 hours ago'
    },
    {
      id: 4,
      author: 'SoleSearcher',
      content: 'Shoutout to all the women breaking barriers in sneaker design! From Tinker Hatfield to current designers, representation matters.',
      likes: 312,
      sneaker: 'Nike Air Max 1 "Sketch to Shelf"',
      time: '8 hours ago'
    }
  ])

  const [newPost, setNewPost] = useState('')

  const handleLike = (postId: number) => {
    // In a real app, this would update the database
    console.log(`Liked post ${postId}`)
  }

  return (
    <div className="women-community max-w-4xl mx-auto">
      {/* Community Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="stat-card bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">2.1K</div>
          <div className="text-sm opacity-90">Active Members</div>
        </div>
        <div className="stat-card bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">847</div>
          <div className="text-sm opacity-90">Posts This Week</div>
        </div>
        <div className="stat-card bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">1.5K</div>
          <div className="text-sm opacity-90">Sneaker Reviews</div>
        </div>
        <div className="stat-card bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">95%</div>
          <div className="text-sm opacity-90">Positive Vibes</div>
        </div>
      </div>

      {/* New Post */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h3 className="font-bold text-lg mb-4">💬 Share with the Community</h3>
        <div className="space-y-4">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's your latest sneaker discovery? Share your style tips, reviews, or just show off your collection!"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
          />
          <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-6 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-colors font-medium">
            Post to Community
          </button>
        </div>
      </div>

      {/* Community Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="community-post bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">👩</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-bold text-purple-600 dark:text-purple-400">{post.author}</h4>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{post.time}</span>
                </div>
                
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-3">
                  {post.content}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <span>❤️</span>
                      <span className="text-sm font-medium">{post.likes}</span>
                    </button>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors text-sm">
                      💬 Reply
                    </button>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors text-sm">
                      🔄 Share
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Featured Sneaker:</p>
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400">{post.sneaker}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Community Insights */}
      <div className="mt-8 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-center">🤖 AI Community Insights</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2">📈 Trending Topics</h4>
            <div className="space-y-2">
              <span className="inline-block bg-pink-200 dark:bg-pink-800 px-3 py-1 rounded-full text-sm">#JordanWomen</span>
              <span className="inline-block bg-purple-200 dark:bg-purple-800 px-3 py-1 rounded-full text-sm ml-2">#SustainableSneakers</span>
              <br />
              <span className="inline-block bg-indigo-200 dark:bg-indigo-800 px-3 py-1 rounded-full text-sm">#StreetStyleInspo</span>
              <span className="inline-block bg-blue-200 dark:bg-blue-800 px-3 py-1 rounded-full text-sm ml-2">#VintageFinds</span>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-2">🎯 Popular This Week</h4>
            <ul className="space-y-1 text-sm">
              <li>• Jordan 1 High OG colorways</li>
              <li>• New Balance women's exclusives</li>
              <li>• Nike Dunk styling guides</li>
              <li>• Sustainable sneaker brands</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}