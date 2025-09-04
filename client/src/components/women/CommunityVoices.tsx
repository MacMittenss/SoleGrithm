import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, MessageCircle, Share2, Plus, Camera, Send, Users, Star } from 'lucide-react';

interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  sneaker?: {
    name: string;
    brand: string;
  };
  reactions: {
    hearts: number;
    comments: number;
    shares: number;
  };
  timestamp: string;
  featured: boolean;
}

const communityPosts: CommunityPost[] = [
  {
    id: '1',
    author: 'SneakerQueen23',
    avatar: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23ec4899"/><circle cx="50" cy="35" r="15" fill="%23ffffff"/><rect x="35" y="55" width="30" height="25" rx="5" fill="%23ffffff"/></svg>',
    content: "Just copped my first pair of Jordan 1s and I'm obsessed! The quality is incredible and they fit perfectly. Finally understanding what all the hype is about 💜",
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><path d="M150 200c0-30 30-60 100-60s100 30 100 60v50H150v-50z" fill="%23dc2626"/><path d="M170 250h160v20H170z" fill="%23000000"/><circle cx="200" cy="170" r="12" fill="%23ffffff"/><circle cx="300" cy="170" r="12" fill="%23ffffff"/></svg>',
    sneaker: {
      name: 'Air Jordan 1 High',
      brand: 'Jordan'
    },
    reactions: {
      hearts: 147,
      comments: 23,
      shares: 8
    },
    timestamp: '2 hours ago',
    featured: true
  },
  {
    id: '2',
    author: 'Maya_Collects',
    avatar: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%236366f1"/><circle cx="50" cy="35" r="15" fill="%23ffffff"/><rect x="35" y="55" width="30" height="25" rx="5" fill="%23ffffff"/></svg>',
    content: "Shoutout to all the women designers breaking barriers in sneaker culture! Representation matters and we're finally seeing our voices heard in this space 🙌",
    reactions: {
      hearts: 203,
      comments: 45,
      shares: 19
    },
    timestamp: '4 hours ago',
    featured: false
  },
  {
    id: '3',
    author: 'KickGameStrong',
    avatar: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f59e0b"/><circle cx="50" cy="35" r="15" fill="%23ffffff"/><rect x="35" y="55" width="30" height="25" rx="5" fill="%23ffffff"/></svg>',
    content: "My collection has grown to over 50 pairs and I love every single story behind them. Each pair represents a moment, a milestone, or a memory that's special to me.",
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><rect x="20" y="50" width="360" height="200" fill="%23ffffff" stroke="%23e5e7eb" stroke-width="2"/><rect x="40" y="80" width="80" height="60" fill="%23dc2626" rx="5"/><rect x="140" y="80" width="80" height="60" fill="%23059669" rx="5"/><rect x="240" y="80" width="80" height="60" fill="%232563eb" rx="5"/><rect x="40" y="170" width="80" height="60" fill="%23d97706" rx="5"/><rect x="140" y="170" width="80" height="60" fill="%237c3aed" rx="5"/><rect x="240" y="170" width="80" height="60" fill="%23dc2626" rx="5"/></svg>',
    reactions: {
      hearts: 89,
      comments: 12,
      shares: 5
    },
    timestamp: '6 hours ago',
    featured: false
  },
  {
    id: '4',
    author: 'DesignDriven',
    avatar: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2310b981"/><circle cx="50" cy="35" r="15" fill="%23ffffff"/><rect x="35" y="55" width="30" height="25" rx="5" fill="%23ffffff"/></svg>',
    content: "Working in footwear design as a woman has its challenges, but seeing more female perspectives in product development gives me so much hope for the future!",
    reactions: {
      hearts: 156,
      comments: 34,
      shares: 11
    },
    timestamp: '8 hours ago',
    featured: true
  },
  {
    id: '5',
    author: 'StreetStyleSarah',
    avatar: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%238b5cf6"/><circle cx="50" cy="35" r="15" fill="%23ffffff"/><rect x="35" y="55" width="30" height="25" rx="5" fill="%23ffffff"/></svg>',
    content: "Styling tip: Don't be afraid to mix feminine pieces with your favorite kicks! Some of my best outfits come from unexpected combinations ✨",
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><rect x="100" y="50" width="200" height="200" fill="%23ffffff" stroke="%23e5e7eb" stroke-width="2"/><rect x="150" y="80" width="100" height="60" fill="%23ec4899" rx="5"/><path d="M150 200c0-15 15-30 50-30s50 15 50 30v30H150v-30z" fill="%23000000"/></svg>',
    reactions: {
      hearts: 234,
      comments: 56,
      shares: 23
    },
    timestamp: '12 hours ago',
    featured: false
  },
  {
    id: '6',
    author: 'FutureFounder',
    avatar: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23ef4444"/><circle cx="50" cy="35" r="15" fill="%23ffffff"/><rect x="35" y="55" width="30" height="25" rx="5" fill="%23ffffff"/></svg>',
    content: "Starting my own sneaker boutique next year! Excited to create a space where women feel celebrated and heard in sneaker culture 🚀",
    reactions: {
      hearts: 312,
      comments: 67,
      shares: 34
    },
    timestamp: '1 day ago',
    featured: true
  }
];

export default function CommunityVoices() {
  const [selectedReaction, setSelectedReaction] = useState<{ [key: string]: boolean }>({});
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    content: '',
    author: '',
    sneaker: ''
  });

  const featuredPosts = communityPosts.filter(post => post.featured);
  const regularPosts = communityPosts.filter(post => !post.featured);

  const handleReaction = (postId: string, type: 'heart' | 'comment' | 'share') => {
    if (type === 'heart') {
      setSelectedReaction(prev => ({
        ...prev,
        [postId]: !prev[postId]
      }));
    }
    // Handle other reaction types here
  };

  const handleSubmitPost = () => {
    // Handle post submission
    console.log('Submitting post:', newPost);
    setIsSubmissionOpen(false);
    setNewPost({ content: '', author: '', sneaker: '' });
  };

  return (
    <div data-section="community" className="space-y-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Users className="w-6 h-6 text-purple-600" />
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Community Voices
          </h2>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Real stories from women in sneaker culture - share yours too!
        </p>
      </motion.div>

      {/* Submit Story CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center"
      >
        <Dialog open={isSubmissionOpen} onOpenChange={setIsSubmissionOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              data-testid="button-submit-story"
            >
              <Plus className="w-4 h-4 mr-2" />
              Submit Your Story
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share Your Sneaker Story</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="author">Your Name</Label>
                <Input
                  id="author"
                  placeholder="Enter your name or username"
                  value={newPost.author}
                  onChange={(e) => setNewPost(prev => ({ ...prev, author: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sneaker">Featured Sneaker (optional)</Label>
                <Input
                  id="sneaker"
                  placeholder="e.g., Air Jordan 1 High"
                  value={newPost.sneaker}
                  onChange={(e) => setNewPost(prev => ({ ...prev, sneaker: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Your Story</Label>
                <Textarea
                  id="content"
                  placeholder="Share your sneaker story, collection highlights, or thoughts on women in sneaker culture..."
                  rows={4}
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Camera className="w-4 h-4 mr-2" />
                  Add Photo
                </Button>
                <Button onClick={handleSubmitPost} className="flex-1 bg-purple-600 hover:bg-purple-700">
                  <Send className="w-4 h-4 mr-2" />
                  Submit
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <h3 className="text-2xl font-semibold text-foreground">Featured Voices</h3>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
                  <CardContent className="p-6">
                    {/* Author Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-foreground">{post.author}</div>
                        <div className="text-sm text-muted-foreground">{post.timestamp}</div>
                      </div>
                      <Badge className="ml-auto bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                        Featured
                      </Badge>
                    </div>

                    {/* Post Content */}
                    <p className="text-foreground mb-4 leading-relaxed">
                      {post.content}
                    </p>

                    {/* Post Image */}
                    {post.image && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src={post.image}
                          alt="Post content"
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    )}

                    {/* Sneaker Info */}
                    {post.sneaker && (
                      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="text-sm font-medium text-muted-foreground">Featured Sneaker:</div>
                        <div className="font-semibold text-foreground">
                          {post.sneaker.brand} {post.sneaker.name}
                        </div>
                      </div>
                    )}

                    {/* Reactions */}
                    <div className="flex items-center gap-6 pt-4 border-t border-border">
                      <button
                        onClick={() => handleReaction(post.id, 'heart')}
                        className={`flex items-center gap-2 transition-colors ${
                          selectedReaction[post.id] 
                            ? 'text-red-500' 
                            : 'text-muted-foreground hover:text-red-500'
                        }`}
                        data-testid={`button-heart-${post.id}`}
                      >
                        <Heart 
                          className={`w-4 h-4 ${selectedReaction[post.id] ? 'fill-current' : ''}`} 
                        />
                        <span className="text-sm">{post.reactions.hearts}</span>
                      </button>
                      
                      <button 
                        onClick={() => handleReaction(post.id, 'comment')}
                        className="flex items-center gap-2 text-muted-foreground hover:text-purple-500 transition-colors"
                        data-testid={`button-comment-${post.id}`}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{post.reactions.comments}</span>
                      </button>
                      
                      <button 
                        onClick={() => handleReaction(post.id, 'share')}
                        className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors"
                        data-testid={`button-share-${post.id}`}
                      >
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">{post.reactions.shares}</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Posts Feed */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-foreground">Community Feed</h3>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-4">
                  {/* Author Info */}
                  <div className="flex items-center gap-2 mb-3">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-foreground text-sm">{post.author}</div>
                      <div className="text-xs text-muted-foreground">{post.timestamp}</div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-sm text-foreground mb-3 leading-relaxed line-clamp-3">
                    {post.content}
                  </p>

                  {/* Post Image */}
                  {post.image && (
                    <div className="mb-3 rounded-lg overflow-hidden">
                      <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  )}

                  {/* Reactions */}
                  <div className="flex items-center gap-4 pt-3 border-t border-border">
                    <button
                      onClick={() => handleReaction(post.id, 'heart')}
                      className={`flex items-center gap-1 transition-colors ${
                        selectedReaction[post.id] 
                          ? 'text-red-500' 
                          : 'text-muted-foreground hover:text-red-500'
                      }`}
                      data-testid={`button-heart-feed-${post.id}`}
                    >
                      <Heart 
                        className={`w-3 h-3 ${selectedReaction[post.id] ? 'fill-current' : ''}`} 
                      />
                      <span className="text-xs">{post.reactions.hearts}</span>
                    </button>
                    
                    <button 
                      onClick={() => handleReaction(post.id, 'comment')}
                      className="flex items-center gap-1 text-muted-foreground hover:text-purple-500 transition-colors"
                      data-testid={`button-comment-feed-${post.id}`}
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span className="text-xs">{post.reactions.comments}</span>
                    </button>
                    
                    <button 
                      onClick={() => handleReaction(post.id, 'share')}
                      className="flex items-center gap-1 text-muted-foreground hover:text-blue-500 transition-colors"
                      data-testid={`button-share-feed-${post.id}`}
                    >
                      <Share2 className="w-3 h-3" />
                      <span className="text-xs">{post.reactions.shares}</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Load More */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Button 
          variant="outline"
          size="lg"
          className="border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400"
          data-testid="button-load-more-posts"
        >
          Load More Stories
        </Button>
      </motion.div>
    </div>
  );
}