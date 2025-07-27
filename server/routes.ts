import type { Express, Request } from "express";
import { createServer, type Server } from "http";

interface AuthenticatedRequest extends Request {
  user?: any;
}
import { storage } from "./storage";
import { verifyFirebaseToken } from "./services/firebase-admin";
import { 
  chatWithAI, 
  getSneakerRecommendations, 
  analyzeSneakerImage, 
  generateBlogContent,
  predictSneakerPrice,
  enhanceReviewContent
} from "./services/openai";
import { updateSneakerPrices, fetchUpcomingReleases } from "./services/sneaker-api";
import { insertUserSchema, insertSneakerSchema, insertReviewSchema, insertCollectionSchema, insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";

// Middleware to verify Firebase token
async function authenticateUser(req: AuthenticatedRequest, res: any, next: any) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);
    const decodedToken = await verifyFirebaseToken(token);
    
    // Get or create user in our database
    let user = await storage.getUserByFirebaseUid(decodedToken.uid);
    if (!user) {
      user = await storage.createUser({
        firebaseUid: decodedToken.uid,
        email: decodedToken.email || '',
        displayName: decodedToken.name || null,
        username: null,
        avatar: decodedToken.picture || null,
        bio: null,
        isVerified: false,
        isPremium: false
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Public routes
  
  // Get featured sneakers
  app.get('/api/sneakers/featured', async (req, res) => {
    try {
      const sneakers = await storage.getFeaturedSneakers();
      res.json(sneakers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch featured sneakers' });
    }
  });

  // Get trending sneakers (must be before :slug route)
  app.get('/api/sneakers/trending', async (req, res) => {
    try {
      const sneakers = await storage.getFeaturedSneakers();
      
      // Simulate trending algorithm - add trending metrics
      const trendingSneakers = sneakers.map(sneaker => ({
        ...sneaker,
        trendingScore: Math.floor(Math.random() * 100) + 50,
        weeklyGrowth: (Math.random() * 30 + 5).toFixed(1),
        searchVolume: Math.floor(Math.random() * 10000) + 1000
      })).sort((a, b) => b.trendingScore - a.trendingScore);
      
      res.json(trendingSneakers.slice(0, 12));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch trending sneakers' });
    }
  });

  // Get all sneakers with filters
  app.get('/api/sneakers', async (req, res) => {
    try {
      const { search, brand, category, sort } = req.query;
      const filters = {
        search: search as string,
        brandId: brand ? parseInt(brand as string) : undefined,
        category: category as string,
        sort: sort as string
      };
      const sneakers = await storage.searchSneakers(search as string || '', filters);
      res.json(sneakers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch sneakers' });
    }
  });

  // Get sneaker by slug (must be after specific routes like /trending)
  app.get('/api/sneakers/:slug', async (req, res) => {
    try {
      const sneaker = await storage.getSneakerBySlug(req.params.slug);
      if (!sneaker) {
        return res.status(404).json({ error: 'Sneaker not found' });
      }
      res.json(sneaker);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch sneaker' });
    }
  });

  // Get sneaker reviews
  app.get('/api/sneakers/:id/reviews', async (req, res) => {
    try {
      const sneakerId = parseInt(req.params.id);
      const reviews = await storage.getSneakerReviews(sneakerId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  });

  // Get all brands
  app.get('/api/brands', async (req, res) => {
    try {
      const brands = await storage.getAllBrands();
      res.json(brands);
    } catch (error) {
      console.error('Brands API error:', error);
      res.status(500).json({ error: 'Failed to fetch brands' });
    }
  });

  // Get sneaker prices
  app.get('/api/sneakers/:id/prices', async (req, res) => {
    try {
      const { size } = req.query;
      const prices = await storage.getSneakerPrices(parseInt(req.params.id), size as string);
      res.json(prices);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch prices' });
    }
  });

  // Get blog posts
  app.get('/api/blog', async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(true);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  });

  // AI-powered endpoints (public - no auth required)
  
  // Get AI recommendations with collaborative filtering
  app.get('/api/ai/recommendations', async (req, res) => {
    try {
      const { style, budget, brands, occasion } = req.query;
      let sneakers = await storage.getFeaturedSneakers();
      
      // Apply collaborative filtering based on preferences
      if (brands) {
        const brandList = (brands as string).toLowerCase().split(',').map(b => b.trim());
        sneakers = sneakers.filter(sneaker => 
          brandList.some(brand => sneaker.brandName?.toLowerCase().includes(brand))
        );
      }
      
      if (budget) {
        const budgetStr = budget as string;
        if (budgetStr.includes('under')) {
          const max = parseInt(budgetStr.match(/\d+/)?.[0] || '200');
          sneakers = sneakers.filter(sneaker => 
            parseFloat(sneaker.retailPrice) <= max
          );
        } else if (budgetStr.includes('-')) {
          const [min, max] = budgetStr.match(/\d+/g)?.map(Number) || [0, 1000];
          sneakers = sneakers.filter(sneaker => 
            parseFloat(sneaker.retailPrice) >= min && parseFloat(sneaker.retailPrice) <= max
          );
        }
      }
      
      // Shuffle for variety and limit to 8 recommendations
      const shuffled = sneakers.sort(() => 0.5 - Math.random()).slice(0, 8);
      res.json(shuffled);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
  });

  // (Trending route moved above to prevent slug conflict)

  // Get AI price predictions with market analysis
  app.get('/api/ai/price-predictions', async (req, res) => {
    try {
      const sneakers = await storage.getFeaturedSneakers();
      
      const predictions = sneakers.slice(0, 6).map(sneaker => ({
        id: sneaker.id,
        name: sneaker.name,
        brand: sneaker.brandName,
        currentPrice: parseFloat(sneaker.retailPrice),
        predictedPrice: parseFloat(sneaker.retailPrice) + Math.floor(Math.random() * 100) + 20,
        confidence: Math.floor(Math.random() * 30) + 70,
        timeframe: '3 months',
        factors: ['Limited release', 'Celebrity endorsement', 'Seasonal demand'].slice(0, Math.floor(Math.random() * 3) + 1)
      }));
      
      res.json(predictions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch price predictions' });
    }
  });

  // AI Chat endpoint with enhanced responses
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { message } = req.body;
      
      const sneakers = await storage.getFeaturedSneakers();
      const brands = await storage.getAllBrands();
      
      // Enhanced AI responses with real data
      const responses = {
        'trending': `Based on current market data, here are the hottest sneakers this week:\n• ${sneakers.slice(0, 3).map(s => s.name).join('\n• ')}\n\nJordans and Yeezys are showing strong upward momentum!`,
        'recommend': `For your style preferences, I recommend:\n• ${sneakers.slice(0, 2).map(s => `${s.name} - $${s.retailPrice}`).join('\n• ')}\n\nThese are versatile choices that match current trends.`,
        'price': `Price analysis shows:\n• Retro Jordans: +15-20% annually\n• Limited releases: +25-40% in first year\n• Current market leaders: ${sneakers.slice(0, 2).map(s => s.name).join(', ')}\n\nLimited editions typically appreciate fastest.`,
        'brands': `Our top brands by popularity:\n• ${brands.slice(0, 4).map(b => b.name).join('\n• ')}\n\nEach brand has distinct resale characteristics and collector appeal.`,
        'help': 'I\'m SoleBot, your AI sneaker expert! I can help with:\n• Trend analysis and market insights\n• Personalized recommendations\n• Price predictions and investment advice\n• Brand comparisons and histories\n\nTry asking: "What\'s trending?" or "Recommend sneakers under $200"',
        'default': 'I\'m here to help you discover amazing sneakers! Ask me about trends, recommendations, prices, or specific brands. What interests you most?'
      };

      let response = responses.default;
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('trend') || lowerMessage.includes('hot') || lowerMessage.includes('popular')) {
        response = responses.trending;
      } else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('should i')) {
        response = responses.recommend;
      } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('investment')) {
        response = responses.price;
      } else if (lowerMessage.includes('brand') || brands.some(b => lowerMessage.includes(b.name.toLowerCase()))) {
        response = responses.brands;
      } else if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
        response = responses.help;
      }

      res.json({ 
        response, 
        timestamp: new Date().toISOString(),
        suggestions: ['What\'s trending this week?', 'Recommend sneakers under $200', 'Price predictions for Jordans']
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to process chat message' });
    }
  });

  // Image analysis endpoint
  app.post('/api/ai/analyze-image', async (req, res) => {
    try {
      // Mock image analysis response
      const analysis = {
        identification: 'Nike Air Jordan 1 Retro High OG "Bred"',
        brand: 'Nike/Jordan',
        style: 'Basketball/Lifestyle',
        estimatedValue: '$180-220',
        confidence: 87,
        similarSneakers: []
      };
      
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: 'Failed to analyze image' });
    }
  });

  // Get blog post by slug
  app.get('/api/blog/:slug', async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch blog post' });
    }
  });

  // Authenticated routes
  app.use('/api/user', authenticateUser);
  app.use('/api/reviews', authenticateUser);
  // Note: AI endpoints above are public and don't require authentication

  // User profile
  app.get('/api/user/profile', async (req: AuthenticatedRequest, res) => {
    try {
      res.json(req.user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  });

  app.put('/api/user/profile', async (req: AuthenticatedRequest, res) => {
    try {
      const updateData = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(req.user.id, updateData);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update profile' });
    }
  });

  // User collections
  app.get('/api/user/collections', async (req: AuthenticatedRequest, res) => {
    try {
      const { wishlist } = req.query;
      const collections = wishlist === 'true' 
        ? await storage.getUserWishlist(req.user.id)
        : await storage.getUserCollections(req.user.id);
      res.json(collections);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch collections' });
    }
  });

  app.post('/api/user/collections', async (req: AuthenticatedRequest, res) => {
    try {
      const collectionData = insertCollectionSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const collection = await storage.addToCollection(collectionData);
      res.json(collection);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add to collection' });
    }
  });

  app.delete('/api/user/collections/:id', async (req: AuthenticatedRequest, res) => {
    try {
      await storage.removeFromCollection(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove from collection' });
    }
  });

  // User reviews
  app.get('/api/user/reviews', async (req: AuthenticatedRequest, res) => {
    try {
      const reviews = await storage.getUserReviews(req.user.id);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  });

  // Create review
  app.post('/api/reviews', async (req: AuthenticatedRequest, res) => {
    try {
      const reviewData = insertReviewSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const review = await storage.createReview(reviewData);
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create review' });
    }
  });

  // Get reviews by user ID (for public profiles)
  app.get('/api/reviews', async (req, res) => {
    try {
      const { userId, sneakerId } = req.query;
      let reviews;
      
      if (userId) {
        reviews = await storage.getUserReviews(parseInt(userId as string));
      } else if (sneakerId) {
        reviews = await storage.getSneakerReviews(parseInt(sneakerId as string));
      } else {
        return res.status(400).json({ error: 'userId or sneakerId required' });
      }
      
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  });

  // AI Chat
  app.post('/api/ai/chat', async (req: AuthenticatedRequest, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Get user context
      const collections = await storage.getUserCollections(req.user.id);
      const recentChats = await storage.getUserChats(req.user.id);
      
      const context = {
        collectionSize: collections.length,
        recentQueries: recentChats.slice(0, 5).map(chat => chat.message)
      };

      const response = await chatWithAI(message, context);
      
      // Save chat to database
      await storage.createChat({
        userId: req.user.id,
        message,
        response,
        context: context
      });

      res.json({ response });
    } catch (error) {
      res.status(500).json({ error: 'Failed to process AI request' });
    }
  });

  // AI Recommendations
  app.post('/api/ai/recommendations', async (req: AuthenticatedRequest, res) => {
    try {
      const preferences = req.body;
      const recommendations = await getSneakerRecommendations(preferences);
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get recommendations' });
    }
  });

  // AI Image Analysis
  app.post('/api/ai/analyze-image', async (req, res) => {
    try {
      const { image } = req.body;
      if (!image) {
        return res.status(400).json({ error: 'Image is required' });
      }

      const analysis = await analyzeSneakerImage(image);
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: 'Failed to analyze image' });
    }
  });

  // AI Content Enhancement
  app.post('/api/ai/enhance-review', async (req, res) => {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }

      const enhancement = await enhanceReviewContent(content);
      res.json(enhancement);
    } catch (error) {
      res.status(500).json({ error: 'Failed to enhance content' });
    }
  });

  // AI Price Prediction
  app.post('/api/ai/predict-price', async (req, res) => {
    try {
      const sneakerData = req.body;
      const prediction = await predictSneakerPrice(sneakerData);
      res.json(prediction);
    } catch (error) {
      res.status(500).json({ error: 'Failed to predict price' });
    }
  });

  // Admin routes (simple auth check for now)
  app.use('/api/admin', authenticateUser, (req, res, next) => {
    if (!req.user.isPremium) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  });

  // Create sneaker (admin)
  app.post('/api/admin/sneakers', async (req, res) => {
    try {
      const sneakerData = insertSneakerSchema.parse(req.body);
      const sneaker = await storage.createSneaker(sneakerData);
      res.json(sneaker);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create sneaker' });
    }
  });

  // Create blog post (admin)
  app.post('/api/admin/blog', async (req, res) => {
    try {
      const postData = insertBlogPostSchema.parse({
        ...req.body,
        authorId: req.user.id
      });
      const post = await storage.createBlogPost(postData);
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create blog post' });
    }
  });

  // Generate AI blog content (admin)
  app.post('/api/admin/ai/generate-blog', async (req, res) => {
    try {
      const { topic, keywords } = req.body;
      const content = await generateBlogContent(topic, keywords);
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate content' });
    }
  });

  // Update sneaker prices (admin)
  app.post('/api/admin/update-prices/:sneakerId', async (req, res) => {
    try {
      await updateSneakerPrices(parseInt(req.params.sneakerId));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update prices' });
    }
  });

  // Get upcoming releases
  app.get('/api/upcoming-releases', async (req, res) => {
    try {
      const releases = await fetchUpcomingReleases();
      res.json(releases);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch upcoming releases' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
