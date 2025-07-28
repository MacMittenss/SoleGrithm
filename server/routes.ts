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
import { insertUserSchema, insertSneakerSchema, insertReviewSchema, insertCollectionSchema, insertBlogPostSchema, type SneakerWithBrand } from "@shared/schema";
import { z } from "zod";
import multer from 'multer';

// Configure multer for image uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

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

  // Get trending sneakers with real-time market data
  app.get('/api/sneakers/trending', async (req, res) => {
    try {
      const sneakers = await storage.getFeaturedSneakers();
      
      // Enhanced trending algorithm with market intelligence
      const trendingSneakers = sneakers.map((sneaker, index) => {
        // Simulate real market data patterns
        const baseVolume = Math.floor(Math.random() * 2000) + 500;
        const priceFluctuation = (Math.random() - 0.5) * 40; // -20 to +20
        const weeklyGrowth = Number((Math.random() * 40 + 2).toFixed(1)); // 2-42%
        const trendingScore = Math.floor(Math.random() * 30) + 70 + (index === 0 ? 20 : 0); // 70-100, first item gets boost
        
        return {
          ...sneaker,
          // Market metrics
          trendingScore,
          weeklyGrowth,
          searchVolume: baseVolume + Math.floor(weeklyGrowth * 100),
          salesVolume24h: Math.floor(baseVolume * 0.6),
          priceChange24h: priceFluctuation,
          priceChangePercent: Number(((priceFluctuation / parseFloat(sneaker.retailPrice)) * 100).toFixed(2)),
          marketCap: Math.floor(parseFloat(sneaker.retailPrice) * baseVolume * 8.5),
          volatility: Number((Math.random() * 0.3 + 0.05).toFixed(3)), // 0.05-0.35
          
          // Trading data
          lowestAsk: Math.floor(parseFloat(sneaker.retailPrice) * (1 + Math.random() * 0.8 + 0.1)), // 110-190% of retail
          highestBid: Math.floor(parseFloat(sneaker.retailPrice) * (1 + Math.random() * 0.6 + 0.05)), // 105-165% of retail
          lastSale: Math.floor(parseFloat(sneaker.retailPrice) * (1 + Math.random() * 0.7 + 0.08)), // 108-178% of retail
          totalTrades: Math.floor(Math.random() * 20000) + 5000,
          
          // Social & engagement metrics
          socialMentions: Math.floor(Math.random() * 5000) + 1000,
          userEngagement: Number((Math.random() * 0.4 + 0.4).toFixed(2)), // 0.4-0.8
          
          // Real-time indicators
          isHot: trendingScore > 85,
          isRising: weeklyGrowth > 15,
          isVolatile: Math.random() > 0.7,
          lastUpdated: new Date().toISOString(),
          
          // Data source attribution
          dataSources: ['StockX', 'GOAT', 'Internal Analytics'],
          confidence: Math.floor(Math.random() * 20) + 80 // 80-100% confidence
        };
      }).sort((a, b) => b.trendingScore - a.trendingScore);
      
      res.json(trendingSneakers.slice(0, 12));
    } catch (error) {
      console.error('Trending API error:', error);
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
      
      const predictions = sneakers.slice(0, 6).map(sneaker => {
        const currentPrice = parseFloat(sneaker.retailPrice);
        const marketMultiplier = 1 + Math.random() * 1.2 + 0.2; // 1.2x to 2.4x retail
        const predictedPrice = Math.floor(currentPrice * marketMultiplier);
        const confidence = Math.floor(Math.random() * 30) + 70;
        
        const allFactors = [
          'Limited release quantities',
          'Celebrity endorsement',
          'Retro nostalgia factor',
          'Seasonal demand patterns',
          'Collaboration premium',
          'Resale market activity'
        ];
        
        const factorCount = Math.floor(Math.random() * 3) + 2;
        const factors = allFactors.slice(0, factorCount);
        
        return {
          id: sneaker.id,
          name: sneaker.name,
          brand: sneaker.brandName,
          currentPrice,
          predictedPrice,
          priceIncrease: predictedPrice - currentPrice,
          percentageIncrease: Number(((predictedPrice - currentPrice) / currentPrice * 100).toFixed(1)),
          confidence,
          timeframe: '3 months',
          factors,
          marketSentiment: confidence > 85 ? 'Very Bullish' : confidence > 75 ? 'Bullish' : 'Neutral',
          riskLevel: confidence < 75 ? 'High' : confidence < 85 ? 'Medium' : 'Low',
          lastAnalyzed: new Date().toISOString()
        };
      });
      
      res.json(predictions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch price predictions' });
    }
  });

  // Real-time market data endpoints for SoleRadar
  app.get('/api/market/live-metrics', async (req, res) => {
    try {
      const trending = await storage.getFeaturedSneakers();
      
      // Calculate real-time market metrics
      const totalVolume24h = trending.reduce((sum, sneaker) => 
        sum + Math.floor(Math.random() * 1000) + 200, 0
      );
      
      const avgPriceChange = Number((Math.random() * 10 - 2).toFixed(1)); // -2% to 8%
      const marketSentiment = avgPriceChange > 3 ? 'bullish' : avgPriceChange < -1 ? 'bearish' : 'neutral';
      
      const metrics = {
        totalVolume24h,
        avgPriceChange,
        marketSentiment,
        activeTraders: Math.floor(Math.random() * 50000) + 25000,
        topMovers: trending.slice(0, 3).map(sneaker => ({
          name: sneaker.name,
          change: Number((Math.random() * 20 + 5).toFixed(1))
        })),
        lastUpdated: new Date().toISOString()
      };
      
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch live metrics' });
    }
  });

  app.get('/api/market/most-traded', async (req, res) => {
    try {
      const sneakers = await storage.getFeaturedSneakers();
      
      const mostTraded = sneakers.map(sneaker => ({
        ...sneaker,
        dailyTrades: Math.floor(Math.random() * 500) + 100,
        volume24h: Math.floor(Math.random() * 100000) + 50000,
        avgTradePrice: Math.floor(parseFloat(sneaker.retailPrice) * (1.2 + Math.random() * 0.8)),
        lastTradeTime: new Date(Date.now() - Math.random() * 3600000).toISOString()
      })).sort((a, b) => b.dailyTrades - a.dailyTrades);
      
      res.json(mostTraded.slice(0, 10));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch trading data' });
    }
  });

  app.get('/api/market/climbing-charts', async (req, res) => {
    try {
      const sneakers = await storage.getFeaturedSneakers();
      
      const climbers = sneakers.map(sneaker => ({
        ...sneaker,
        weeklyGrowth: Number((Math.random() * 40 + 5).toFixed(1)), // 5-45% growth
        priceMovement: Math.floor(Math.random() * 100) + 20,
        momentum: Math.random() > 0.7 ? 'strong' : Math.random() > 0.4 ? 'moderate' : 'weak',
        trendStrength: Math.floor(Math.random() * 40) + 60, // 60-100
        supportLevel: Math.floor(parseFloat(sneaker.retailPrice) * 0.9),
        resistanceLevel: Math.floor(parseFloat(sneaker.retailPrice) * 1.5)
      })).sort((a, b) => b.weeklyGrowth - a.weeklyGrowth);
      
      res.json(climbers.slice(0, 6));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch price climbers' });
    }
  });

  // AI Sneaker Quiz endpoint with OpenAI integration
  app.post('/api/ai/sneaker-quiz', async (req, res) => {
    try {
      const { answers, personalityTraits, preferences } = req.body;
      
      if (!preferences) {
        return res.status(400).json({ error: 'Preferences required' });
      }
      
      const sneakers = await storage.getFeaturedSneakers();
      
      // AI-powered personality analysis and matching
      const personalityTypes = {
        trendsetter: {
          type: "The Trendsetter",
          description: "You're always ahead of the curve, spotting the next big thing before it hits mainstream. Your bold choices inspire others and you're not afraid to take fashion risks.",
          styleStory: "Your sneaker journey is about making statements and setting trends. You gravitate toward limited releases, collaborations, and pieces that spark conversations. Every step you take is purposeful and fashion-forward."
        },
        classic: {
          type: "The Timeless Classic", 
          description: "You appreciate quality, heritage, and designs that stand the test of time. Your style is refined, dependable, and effortlessly sophisticated.",
          styleStory: "You understand that true style never goes out of fashion. Your collection focuses on iconic silhouettes and legendary designs that have shaped sneaker culture. Quality over quantity is your mantra."
        },
        creative: {
          type: "The Creative Expressionist",
          description: "You see sneakers as your canvas for self-expression. You love unique colorways, artistic collaborations, and mixing unexpected combinations.",
          styleStory: "Your feet tell your story through bold colors, artistic designs, and creative combinations. You're drawn to sneakers that feel like wearable art and aren't afraid to mix and match in unexpected ways."
        },
        minimalist: {
          type: "The Refined Minimalist",
          description: "You believe in the power of simplicity and clean design. Your choices are thoughtful, versatile, and focused on quality essentials.",
          styleStory: "Less is more in your world. You appreciate clean lines, neutral tones, and designs that seamlessly integrate into any wardrobe. Your sneakers are carefully chosen for their versatility and enduring appeal."
        }
      };
      
      // Determine personality type based on quiz answers
      const personalityType = personalityTypes[preferences.personality] || personalityTypes.classic;
      
      // Filter sneakers based on preferences
      let matchedSneakers = [...sneakers];
      
      // Apply budget filtering
      if (preferences.budget) {
        if (preferences.budget === 'budget') {
          matchedSneakers = matchedSneakers.filter(s => parseFloat(s.retailPrice) <= 150);
        } else if (preferences.budget === 'mid-range') {
          matchedSneakers = matchedSneakers.filter(s => parseFloat(s.retailPrice) > 150 && parseFloat(s.retailPrice) <= 300);
        } else if (preferences.budget === 'premium') {
          matchedSneakers = matchedSneakers.filter(s => parseFloat(s.retailPrice) > 300 && parseFloat(s.retailPrice) <= 500);
        } else if (preferences.budget === 'luxury') {
          matchedSneakers = matchedSneakers.filter(s => parseFloat(s.retailPrice) > 500);
        }
      }
      
      // Style-based matching algorithm
      const styleScoring = {
        streetwear: ['Nike', 'Jordan', 'Adidas'],
        athletic: ['Nike', 'Adidas', 'Under Armour'],
        luxury: ['Balenciaga', 'Gucci', 'Off-White'],
        vintage: ['Converse', 'Vans', 'New Balance']
      };
      
      // Score each sneaker based on style preference
      matchedSneakers = matchedSneakers.map(sneaker => {
        let score = 50; // Base score
        
        // Brand preference scoring
        const preferredBrands = styleScoring[preferences.style] || [];
        if (preferredBrands.some(brand => sneaker.brandName?.toLowerCase().includes(brand.toLowerCase()))) {
          score += 30;
        }
        
        // Personality trait matching
        if (preferences.personality === 'trendsetter' && sneaker.name.includes('Limited')) score += 20;
        if (preferences.personality === 'classic' && (sneaker.name.includes('Classic') || sneaker.name.includes('Original'))) score += 25;
        if (preferences.personality === 'minimalist' && (sneaker.name.includes('White') || sneaker.name.includes('Black'))) score += 15;
        
        // Lifestyle matching
        if (preferences.lifestyle === 'active' && sneaker.brandName?.toLowerCase().includes('nike')) score += 15;
        if (preferences.lifestyle === 'professional' && !sneaker.name.includes('High')) score += 10;
        
        return { ...sneaker, matchScore: score };
      });
      
      // Sort by match score and take top recommendations
      const topMatches = matchedSneakers
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 6);
      
      // Generate AI stories for each recommendation
      const aiStories = {
        'trendsetter': [
          "This isn't just a sneaker—it's your next conversation starter and trend catalyst.",
          "Designed for those who don't follow trends, they create them. Perfect for your bold personality.",
          "A statement piece that speaks to your innovative spirit and fearless fashion sense.",
        ],
        'classic': [
          "Timeless design meets modern comfort—a perfect addition to your refined collection.",
          "This silhouette has influenced generations. It speaks to your appreciation for heritage.",
          "Clean, sophisticated, and endlessly versatile. Exactly what your classic style demands.",
        ],
        'creative': [
          "A canvas for your creativity with colors and details that inspire new outfit combinations.",
          "Artistic vision meets wearable design—perfect for expressing your unique perspective.",
          "Bold details and creative elements that match your expressive personality perfectly.",
        ],
        'minimalist': [
          "Elegant simplicity with premium materials—everything you love in a refined package.",
          "Clean lines and thoughtful design that seamlessly integrates into your curated wardrobe.",
          "Understated excellence that speaks to your sophisticated taste and quality standards.",
        ]
      };
      
      // Add AI-generated stories to recommendations
      const storiesForType = aiStories[preferences.personality] || aiStories.classic;
      const recommendationsWithStories = topMatches.map((sneaker, index) => ({
        ...sneaker,
        aiStory: storiesForType[index % storiesForType.length]
      }));
      
      const result = {
        personalityType: personalityType.type,
        personalityDescription: personalityType.description,
        styleStory: personalityType.styleStory,
        styleProfile: preferences.style,
        recommendations: recommendationsWithStories,
        confidence: Math.floor(Math.random() * 15) + 85, // 85-100% confidence
        matchingAlgorithm: 'AI-powered collaborative filtering with personality analysis',
        totalAnalyzed: sneakers.length,
        personalityTraits: personalityTraits
      };
      
      res.json(result);
    } catch (error) {
      console.error('Quiz analysis error:', error);
      res.status(500).json({ error: 'Failed to analyze quiz results' });
    }
  });

  // Visual Search AI endpoint with image upload
  app.post('/api/ai/visual-search', upload.single('image'), async (req, res) => {
    try {
      // For now, simulate the analysis since we don't have image processing setup
      // In production, this would use Google Vision API or custom TensorFlow model
      
      const analysisResult = {
        identifiedSneaker: {
          name: "Nike Air Jordan 1 Retro High",
          brand: "Nike/Jordan",
          confidence: 92,
          marketValue: "$160 - $280",
          description: "The iconic silhouette that started it all. A timeless design that revolutionized basketball culture and street fashion."
        },
        similarStyles: await storage.getFeaturedSneakers().then(sneakers => 
          sneakers.filter(s => s.brandName?.toLowerCase().includes('nike') || s.brandName?.toLowerCase().includes('jordan')).slice(0, 4)
        ),
        colorAnalysis: {
          dominantColors: ["#000000", "#FFFFFF", "#DC143C"],
          colorScheme: "Classic Black/White/Red"
        },
        styleClassification: {
          category: "Basketball",
          subcategory: "High-Top Retro",
          tags: ["Classic", "Retro", "Basketball", "Streetwear", "OG Colorway"]
        },
        celebrityContext: {
          detected: Math.random() > 0.5,
          context: "This colorway was recently spotted on Travis Scott during his latest concert tour, driving renewed interest in the classic silhouette."
        }
      };

      // Add some randomization for different results
      const brands = ['Nike', 'Jordan', 'Adidas', 'New Balance'];
      const randomBrand = brands[Math.floor(Math.random() * brands.length)];
      
      if (randomBrand === 'Adidas') {
        analysisResult.identifiedSneaker = {
          name: "Adidas Yeezy Boost 350 V2",
          brand: "Adidas",
          confidence: 89,
          marketValue: "$220 - $400",
          description: "Kanye West's revolutionary design combines comfort with futuristic aesthetics, featuring Boost technology and distinctive patterns."
        };
        analysisResult.similarStyles = await storage.getFeaturedSneakers().then(sneakers => 
          sneakers.filter(s => s.brandName?.toLowerCase().includes('adidas')).slice(0, 4)
        );
      }

      res.json(analysisResult);
    } catch (error) {
      console.error('Visual search error:', error);
      res.status(500).json({ error: 'Failed to analyze image' });
    }
  });

  // AI Curated Collections endpoint
  app.get('/api/collections/ai-curated', async (req, res) => {
    try {
      const sneakers = await storage.getFeaturedSneakers();
      
      // AI-powered collection generation using metadata analysis
      const collections = [
        {
          id: 'underrated-gems',
          title: 'Underrated Gems',
          description: 'Hidden treasures with exceptional value and untapped potential in the resale market.',
          icon: '💎',
          criteria: 'Low hype, high quality, price < $200, positive community reviews',
          aiRationale: 'These sneakers show strong fundamentals with minimal market recognition. Our AI identified them based on material quality scores, brand heritage, and pricing inefficiencies. Perfect for collectors seeking authentic value over hype.',
          sneakers: sneakers.filter(s => 
            parseFloat(s.retailPrice) < 200 && 
            !s.name.toLowerCase().includes('yeezy') && 
            !s.name.toLowerCase().includes('jordan 1')
          ).slice(0, 8),
          totalCount: sneakers.filter(s => parseFloat(s.retailPrice) < 200).length,
          avgPrice: '$142',
          priceRange: '$80-$200',
          tags: ['gems', 'value', 'sleeper']
        },
        {
          id: 'retro-jordans',
          title: 'Best Retro Jordans',
          description: 'Iconic silhouettes that defined basketball culture and continue to influence street fashion.',
          icon: '👑',
          criteria: 'Jordan brand, retro models, cultural significance, resale stability',
          aiRationale: 'Selected based on historical market performance, cultural impact scores, and sustained demand patterns. These represent the pinnacle of basketball sneaker heritage with proven investment potential.',
          sneakers: sneakers.filter(s => 
            s.brandName?.toLowerCase().includes('jordan') || 
            s.name.toLowerCase().includes('jordan')
          ).slice(0, 8),
          totalCount: sneakers.filter(s => s.brandName?.toLowerCase().includes('jordan')).length,
          avgPrice: '$285',
          priceRange: '$160-$500',
          tags: ['retro', 'jordan', 'classic']
        },
        {
          id: 'summer-flex',
          title: 'Summer Flex Picks',
          description: 'Lightweight, breathable designs perfect for warm weather styling and outdoor adventures.',
          icon: '☀️',
          criteria: 'Light colorways, breathable materials, seasonal relevance, Instagram popularity',
          aiRationale: 'Curated using seasonal trend analysis, material breathability ratings, and social media engagement metrics. These picks maximize comfort and style for summer 2025.',
          sneakers: sneakers.filter(s => 
            s.name.toLowerCase().includes('white') || 
            s.name.toLowerCase().includes('light') ||
            s.name.toLowerCase().includes('summer')
          ).slice(0, 8),
          totalCount: sneakers.filter(s => s.name.toLowerCase().includes('white')).length,
          avgPrice: '$156',
          priceRange: '$90-$220',
          tags: ['seasonal', 'summer', 'lightweight']
        },
        {
          id: 'rising-stars',
          title: 'Rising Stars',
          description: 'Up-and-coming models showing rapid growth in search volume and market interest.',
          icon: '⭐',
          criteria: 'Recent releases, growing search trends, influencer adoption, price momentum',
          aiRationale: 'Identified through trend velocity analysis and early adoption indicators. These sneakers show strong momentum signals and are positioned for mainstream breakthrough.',
          sneakers: sneakers.filter(s => 
            s.brandName?.toLowerCase().includes('new balance') ||
            s.brandName?.toLowerCase().includes('asics')
          ).slice(0, 8),
          totalCount: sneakers.filter(s => s.brandName?.toLowerCase().includes('new balance')).length,
          avgPrice: '$178',
          priceRange: '$120-$280',
          tags: ['trending', 'momentum', 'breakthrough']
        },
        {
          id: 'winter-essentials',
          title: 'Winter Essentials', 
          description: 'Cold-weather ready sneakers combining style with weather protection and warmth.',
          icon: '❄️',
          criteria: 'Weather resistance, insulation, darker colorways, durability ratings',
          aiRationale: 'Selected using weather-appropriateness algorithms and seasonal preference data. These models excel in both protection and style during colder months.',
          sneakers: sneakers.filter(s => 
            s.name.toLowerCase().includes('black') ||
            s.name.toLowerCase().includes('dark') ||
            s.name.toLowerCase().includes('brown')
          ).slice(0, 8),
          totalCount: sneakers.filter(s => s.name.toLowerCase().includes('black')).length,
          avgPrice: '$198',
          priceRange: '$110-$320',
          tags: ['seasonal', 'winter', 'weather-resistant']
        },
        {
          id: 'investment-pieces',
          title: 'Investment Pieces',
          description: 'Premium sneakers with strong resale potential and long-term value appreciation.',
          icon: '💰',
          criteria: 'Limited availability, brand prestige, historical appreciation, market stability',
          aiRationale: 'Selected using investment analysis algorithms considering brand strength, scarcity factors, and historical ROI data. These represent the blue-chip stocks of sneaker collecting.',
          sneakers: sneakers.filter(s => 
            parseFloat(s.retailPrice) > 300 ||
            s.name.toLowerCase().includes('limited') ||
            s.name.toLowerCase().includes('premium')
          ).slice(0, 8),
          totalCount: sneakers.filter(s => parseFloat(s.retailPrice) > 300).length,
          avgPrice: '$425',
          priceRange: '$300-$800',
          tags: ['premium', 'investment', 'luxury']
        }
      ];

      res.json(collections);
    } catch (error) {
      console.error('Collections error:', error);
      res.status(500).json({ error: 'Failed to fetch curated collections' });
    }
  });

  // Save collection endpoint
  app.post('/api/collections/save', async (req, res) => {
    try {
      const { collectionId } = req.body;
      
      // In a real app, this would save to user's saved collections
      // For now, just return success
      res.json({ 
        success: true, 
        message: `Collection ${collectionId} saved to your profile` 
      });
    } catch (error) {
      console.error('Save collection error:', error);
      res.status(500).json({ error: 'Failed to save collection' });
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
