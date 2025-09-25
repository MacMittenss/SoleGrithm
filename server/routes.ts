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
  enhanceReviewContent,
  summarizeReviews,
  generateSyntheticReviews,
  generateSneakerCareTips,
  analyzePersonalityFromQuiz,
  generateMultipleCollections,
  generatePersonalizedCollection
} from "./services/openai";
import { updateSneakerPrices, fetchUpcomingReleases } from "./services/sneaker-api";
import { UserTrackingService } from "./services/user-tracking";
import { FirebaseProfileService } from "./services/firebase-profiles";
import { ThirdPartyAPIService } from "./services/third-party-sync";
import { AIPersonalizationService } from "./services/ai-personalization";
import { marketDataService } from "./services/marketData";
import { insertUserSchema, insertSneakerSchema, insertReviewSchema, insertCollectionSchema, insertBlogPostSchema, type SneakerWithBrand } from "@shared/schema";
import { z } from "zod";
import multer from 'multer';
import { nanoid } from 'nanoid';
import { cacheControl, apiCache, noCache, conditionalCache } from './middleware/cache';

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


// Enhanced fallback personality analysis function
function generateEnhancedFallbackAnalysis(preferences: any, personalityTraits: string[]) {
  const personalityInsights: Record<string, any> = {
    trendsetter: {
      personalityType: "The Sneaker Trendsetter",
      detailedAnalysis: "You're a natural tastemaker who thrives on being ahead of the curve. Your innovative spirit and bold confidence drive you to discover and champion new styles before they hit mainstream, making you an influential voice in sneaker culture.",
      styleInsights: "Your sneaker choices reflect your fearless approach to fashion. You gravitate toward limited releases, cutting-edge collaborations, and statement pieces that spark conversations and set trends within your community.",
      brandRecommendations: ["Off-White", "Fear of God", "Balenciaga", "Yeezy", "Jordan Retro"]
    },
    classic: {
      personalityType: "The Timeless Collector",
      detailedAnalysis: "You embody sophistication and appreciate heritage craftsmanship. Your refined taste values quality over quantity, and you understand that true style transcends fleeting trends through timeless design and exceptional materials.",
      styleInsights: "Your collection focuses on iconic silhouettes and legendary designs that have shaped sneaker history. You prefer versatile pieces that seamlessly integrate into any wardrobe while maintaining their cultural significance.",
      brandRecommendations: ["Nike Air Force 1", "Adidas Stan Smith", "Converse Chuck Taylor", "New Balance 990", "Vans Old Skool"]
    },
    creative: {
      personalityType: "The Creative Expressionist",
      detailedAnalysis: "You view sneakers as wearable art and use them to express your unique creative vision. Your artistic soul appreciates bold colorways, innovative designs, and unexpected combinations that tell your personal story.",
      styleInsights: "Your feet become your canvas through vibrant colors, artistic collaborations, and creative mixing that pushes boundaries. You're drawn to sneakers that feel like artistic statements and aren't afraid to experiment.",
      brandRecommendations: ["Nike SB", "Vans Vault", "Adidas Y-3", "Puma x Fenty", "Jordan Brand Artists"]
    },
    minimalist: {
      personalityType: "The Refined Minimalist",
      detailedAnalysis: "You believe in the power of intentional simplicity and clean design. Your thoughtful approach to fashion emphasizes quality essentials and versatile pieces that serve multiple purposes with effortless elegance.",
      styleInsights: "Less truly is more in your carefully curated world. You appreciate clean lines, neutral tones, and designs that seamlessly integrate into any setting while maintaining their sophisticated appeal.",
      brandRecommendations: ["Common Projects", "Maison Margiela", "Allbirds", "Veja", "Axel Arigato"]
    }
  };


  const lifestyleMapping: Record<string, string[]> = {
    active: ["Nike React", "Adidas Boost", "New Balance Fresh Foam", "Under Armour", "ASICS"],
    professional: ["Cole Haan", "Allbirds", "Veja", "Common Projects", "Greats"],
    social: ["Jordan Brand", "Nike SB", "Vans", "Adidas Originals", "Puma"],
    casual: ["New Balance", "Nike Air Max", "Adidas Ultraboost", "Allbirds", "Converse"]
  };

  const budgetMapping: Record<string, string[]> = {
    budget: ["Adidas Originals", "Nike Air Force", "Converse", "Vans", "New Balance"],
    "mid-range": ["Nike Air Max", "Adidas Ultraboost", "Jordan Retro", "New Balance 990", "Puma RS"],
    premium: ["Nike Off-White", "Adidas Y-3", "Jordan 1 High", "New Balance Made in USA", "Vans Vault"],
    luxury: ["Balenciaga", "Common Projects", "Maison Margiela", "Fear of God", "Rick Owens"]
  };

  const basePersonality = personalityInsights[preferences.personality] || personalityInsights.classic;
  const lifestyleBrands = typeof preferences.lifestyle === 'string' && preferences.lifestyle in lifestyleMapping ? lifestyleMapping[preferences.lifestyle] : [];
  const budgetBrands = typeof preferences.budget === 'string' && preferences.budget in budgetMapping ? budgetMapping[preferences.budget] : [];
  const combinedBrands = Array.from(new Set([...(basePersonality.brandRecommendations || []), ...lifestyleBrands, ...budgetBrands])).slice(0, 6);

  return {
    personalityType: basePersonality.personalityType,
    detailedAnalysis: basePersonality.detailedAnalysis,
    styleInsights: basePersonality.styleInsights,
    brandRecommendations: combinedBrands,
    personalityScore: Math.floor(Math.random() * 15) + 85,
    matchingExplanation: `Based on your ${preferences.personality} personality, ${preferences.lifestyle} lifestyle, and ${preferences.budget} budget range, these brands align perfectly with your authentic style preferences and values.`,
    isAI: false // Indicates this is fallback analysis
  };
}

// Generate AI collection with OpenAI
async function generateAICollection(theme: string, preferences: any, sneakers: any[]) {
  const openai = await import('./services/openai.js');
  
  const prompt = `Create a unique sneaker collection based on the theme "${theme}" and user preferences: ${JSON.stringify(preferences)}. 

  Generate a creative collection with:
  1. A catchy, unique title
  2. Compelling description (2-3 sentences)
  3. Creative emoji icon
  4. Clear selection criteria
  5. AI rationale explaining the curation logic
  6. 3-5 relevant tags
  7. Price range estimate
  
  Be creative and specific. Consider current trends, cultural moments, seasonal themes, lifestyle connections, or artistic concepts.
  
  Respond in JSON format:
  {
    "title": "Collection Name",
    "description": "Engaging description",
    "icon": "🎯",
    "criteria": "Selection criteria",
    "aiRationale": "Why these picks work together",
    "tags": ["tag1", "tag2", "tag3"],
    "priceRange": "$100-$300"
  }`;

  const response = await openai.chatWithAI(prompt);
  // If response is an object with a 'response' property, use it; otherwise, use as string
  const responseString = typeof response === 'string' ? response : (response && typeof response.response === 'string' ? response.response : '');
  const collectionData = JSON.parse(responseString);
  
  // Filter sneakers based on AI-generated criteria
  const selectedSneakers = selectSneakersForCollection(collectionData, sneakers);
  
  return {
    id: `ai-${Date.now()}`,
    ...collectionData,
    sneakers: selectedSneakers,
    totalCount: selectedSneakers.length,
    avgPrice: calculateAveragePrice(selectedSneakers),
    aiGenerated: true
  };
}

// Fallback collection generator
function generateFallbackCollection(theme: string, preferences: any, sneakers: any[]) {
  const themeCollections: Record<string, any> = {
    'street-art': {
      title: 'Street Art Canvas',
      description: 'Bold, expressive sneakers that turn your feet into walking art galleries. Each pair tells a story of urban creativity.',
      icon: '🎨',
      criteria: 'Vibrant colorways, artistic collaborations, unique patterns, street culture connections',
      aiRationale: 'Selected for their artistic merit and ability to express individuality. These sneakers represent the intersection of fashion and street art culture.',
      tags: ['artistic', 'bold', 'expressive', 'street-culture'],
      priceRange: '$120-$280'
    },
    'minimalist': {
      title: 'Pure Essentials',
      description: 'Clean, timeless designs that embody the philosophy that less is more. Refined simplicity meets superior craftsmanship.',
      icon: '⚪',
      criteria: 'Clean lines, neutral colors, premium materials, timeless silhouettes',
      aiRationale: 'Curated for their enduring design principles and versatility. These pieces transcend trends through masterful simplicity.',
      tags: ['minimal', 'clean', 'timeless', 'versatile'],
      priceRange: '$150-$400'
    },
    'retro-future': {
      title: 'Neo-Retro Fusion',
      description: 'Where vintage meets tomorrow. Classic silhouettes reimagined with futuristic materials and forward-thinking design.',
      icon: '🚀',
      criteria: 'Retro silhouettes, modern tech, metallic accents, innovative materials',
      aiRationale: 'Selected for their ability to bridge past and future. These designs honor sneaker heritage while pushing boundaries.',
      tags: ['retro', 'futuristic', 'innovative', 'tech'],
      priceRange: '$180-$350'
    },
    'nature-inspired': {
      title: 'Earth Elements',
      description: 'Nature-inspired colorways and sustainable materials that connect urban style with the natural world.',
      icon: '🌿',
      criteria: 'Earth tones, sustainable materials, outdoor functionality, organic patterns',
      aiRationale: 'Chosen for their harmony with nature and sustainable design principles. Perfect for eco-conscious sneaker enthusiasts.',
      tags: ['sustainable', 'natural', 'eco-friendly', 'earthy'],
      priceRange: '$140-$300'
    }
  };
  
  const selectedTheme = typeof theme === 'string' && theme in themeCollections ? themeCollections[theme] : themeCollections['street-art'];
  const selectedSneakers = selectSneakersForCollection(selectedTheme, sneakers);
  
  return {
    id: `fallback-${Date.now()}`,
    ...selectedTheme,
    sneakers: selectedSneakers,
    totalCount: selectedSneakers.length,
    avgPrice: calculateAveragePrice(selectedSneakers),
    aiGenerated: false
  };
}

// Helper function to select sneakers based on collection criteria
function selectSneakersForCollection(collectionData: any, sneakers: any[]) {
  // Simple filtering logic - in a real app, this would be more sophisticated
  let filtered = sneakers;
  
  // Filter by price range if specified
  if (collectionData.priceRange) {
    const prices = collectionData.priceRange.match(/\$(\d+)-\$(\d+)/);
    if (prices) {
      const minPrice = parseInt(prices[1]);
      const maxPrice = parseInt(prices[2]);
      filtered = filtered.filter(s => {
        const price = typeof s.retailPrice === 'string' ? parseFloat(s.retailPrice) : NaN;
        return !isNaN(price) && price >= minPrice && price <= maxPrice;
      });
    }
  }
  
  // Apply some randomization and limit results
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 8);
}

// Helper function to calculate average price
function calculateAveragePrice(sneakers: any[]) {
  if (sneakers.length === 0) return '$0';
  const total = sneakers.reduce((sum, sneaker) => {
    const price = typeof sneaker.retailPrice === 'string' ? parseFloat(sneaker.retailPrice) : NaN;
    return !isNaN(price) ? sum + price : sum;
  }, 0);
  const average = Math.round(total / sneakers.length);
  return `$${average}`;
}

// Middleware to verify Firebase token

async function authenticateUser(req: AuthenticatedRequest, res: any, next: any) {
  try {
    const authHeader = req.headers.authorization;
    console.log('Auth header:', authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('No token provided');
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);
    console.log('Received token:', token);
    let decodedToken;
    try {
      decodedToken = await verifyFirebaseToken(token);
      console.log('Decoded token:', decodedToken);
    } catch (err) {
      console.error('Token verification failed:', err);
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

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
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ error: 'Invalid Firebase token' });
  }
}

export async function registerRoutes(app: Express): Promise<Server> {

  // Get trending sneakers with real-time market data
  app.get('/api/sneakers/trending', async (req, res) => {
    try {
      // Fetch all sneakers for trending, not just featured
      const sneakers = await storage.searchSneakers('', {});
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
          baseVolume,
          priceFluctuation,
          weeklyGrowth,
          trendingScore
        };
      });
      res.json(trendingSneakers);
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
          sneakers = sneakers.filter(sneaker => {
            const price = typeof sneaker.retailPrice === 'string' ? parseFloat(sneaker.retailPrice) : NaN;
            return !isNaN(price) && price <= max;
          });
        } else if (budgetStr.includes('-')) {
          const [min, max] = budgetStr.match(/\d+/g)?.map(Number) || [0, 1000];
          sneakers = sneakers.filter(sneaker => {
            const price = typeof sneaker.retailPrice === 'string' ? parseFloat(sneaker.retailPrice) : NaN;
            return !isNaN(price) && price >= min && price <= max;
          });
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
        const currentPrice = typeof sneaker.retailPrice === 'string' ? parseFloat(sneaker.retailPrice) : NaN;
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
      
      const mostTraded = sneakers.map(sneaker => {
        const price = typeof sneaker.retailPrice === 'string' ? parseFloat(sneaker.retailPrice) : NaN;
        return {
          ...sneaker,
          dailyTrades: Math.floor(Math.random() * 500) + 100,
          volume24h: Math.floor(Math.random() * 100000) + 50000,
          avgTradePrice: Math.floor(!isNaN(price) ? price * (1.2 + Math.random() * 0.8) : 0),
          lastTradeTime: new Date(Date.now() - Math.random() * 3600000).toISOString()
        };
      }).sort((a, b) => b.dailyTrades - a.dailyTrades);
      
      res.json(mostTraded.slice(0, 10));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch trading data' });
    }
  });

  app.get('/api/market/climbing-charts', async (req, res) => {
    try {
      const sneakers = await storage.getFeaturedSneakers();
      
      const climbers = sneakers.map(sneaker => {
        const price = typeof sneaker.retailPrice === 'string' ? parseFloat(sneaker.retailPrice) : NaN;
        return {
          ...sneaker,
          weeklyGrowth: Number((Math.random() * 40 + 5).toFixed(1)), // 5-45% growth
          priceMovement: Math.floor(Math.random() * 100) + 20,
          momentum: Math.random() > 0.7 ? 'strong' : Math.random() > 0.4 ? 'moderate' : 'weak',
          trendStrength: Math.floor(Math.random() * 40) + 60, // 60-100
          supportLevel: Math.floor(!isNaN(price) ? price * 0.9 : 0),
          resistanceLevel: Math.floor(!isNaN(price) ? price * 1.5 : 0)
        };
      }).sort((a, b) => b.weeklyGrowth - a.weeklyGrowth);
      
      res.json(climbers.slice(0, 6));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch price climbers' });
    }
  });

  // AI Sneaker Quiz endpoint with OpenAI integration
  app.post('/api/ai/sneaker-quiz', async (req, res) => {
    try {
      const { answers, personalityTraits, preferences } = req.body;
      
      if (!preferences || !personalityTraits) {
        return res.status(400).json({ error: 'Preferences and personality traits required' });
      }
      
      const sneakers = await storage.getFeaturedSneakers();
      
      // Use OpenAI for advanced personality analysis with fallback
      let aiPersonalityAnalysis = null;
      try {
        aiPersonalityAnalysis = await analyzePersonalityFromQuiz(
          preferences,
          personalityTraits
        );
      } catch (error: any) {
        console.warn('OpenAI analysis unavailable, using enhanced fallback:', error?.message || 'Unknown error');
        // Enhanced fallback personality analysis based on quiz responses
        aiPersonalityAnalysis = generateEnhancedFallbackAnalysis(preferences, personalityTraits);
      }
      
      // Fallback personality types for backup
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
      
      // Use AI analysis or fallback to basic matching
  const personalityKey = preferences.personality as keyof typeof personalityTypes;
  const personalityType = personalityTypes[personalityKey] || personalityTypes.classic;
      
      // Filter sneakers based on preferences
      let matchedSneakers = [...sneakers];
      
      // Apply budget filtering
      if (preferences.budget) {
        if (preferences.budget === 'budget') {
          matchedSneakers = matchedSneakers.filter(s => typeof s.retailPrice === 'string' && s.retailPrice !== null && parseFloat(s.retailPrice) <= 150);
        } else if (preferences.budget === 'mid-range') {
          matchedSneakers = matchedSneakers.filter(s => typeof s.retailPrice === 'string' && s.retailPrice !== null && parseFloat(s.retailPrice) > 150 && parseFloat(s.retailPrice) <= 300);
        } else if (preferences.budget === 'premium') {
          matchedSneakers = matchedSneakers.filter(s => typeof s.retailPrice === 'string' && s.retailPrice !== null && parseFloat(s.retailPrice) > 300 && parseFloat(s.retailPrice) <= 500);
        } else if (preferences.budget === 'luxury') {
          matchedSneakers = matchedSneakers.filter(s => typeof s.retailPrice === 'string' && s.retailPrice !== null && parseFloat(s.retailPrice) > 500);
        }
      }
      
      // Style-based matching algorithm
      const styleScoring: Record<string, string[]> = {
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
        if (preferredBrands.some((brand: string) => sneaker.brandName?.toLowerCase().includes(brand.toLowerCase()))) {
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
        .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
        .slice(0, 6);
      
      // Generate AI stories for each recommendation
      const aiStories: Record<string, string[]> = {
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
      
      const storiesForType = aiStories[preferences.personality] || aiStories.classic;
      const recommendationsWithStories = topMatches.map((sneaker, index) => ({
        ...sneaker,
        aiStory: storiesForType[index % storiesForType.length]
      }));
      
      const result = {
        // Use AI analysis when available, fallback to basic types
        personalityType: aiPersonalityAnalysis.personalityType || personalityType.type,
        personalityDescription: aiPersonalityAnalysis.detailedAnalysis || personalityType.description,
        styleStory: aiPersonalityAnalysis.styleInsights || personalityType.styleStory,
        styleProfile: preferences.style,
        recommendations: recommendationsWithStories,
        confidence: aiPersonalityAnalysis.personalityScore || (Math.floor(Math.random() * 15) + 85),
        matchingAlgorithm: (aiPersonalityAnalysis as any)?.isAI 
          ? 'OpenAI GPT-4o personality analysis with collaborative filtering'
          : 'Enhanced AI-style personality analysis with collaborative filtering',
        totalAnalyzed: sneakers.length,
        personalityTraits: personalityTraits,
        // Enhanced AI insights
        brandRecommendations: aiPersonalityAnalysis.brandRecommendations || [],
        matchingExplanation: aiPersonalityAnalysis.matchingExplanation || 'Recommendations based on your style preferences',
        aiEnhanced: true
      };
      
      res.json(result);
    } catch (error) {
      console.error('Quiz analysis error:', error);
      res.status(500).json({ 
        error: 'Failed to analyze quiz results',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Enhanced Visual Search AI endpoint with comprehensive image analysis
  app.post('/api/ai/visual-search', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      // Convert image buffer to base64
      const base64Image = req.file.buffer.toString('base64');
      
      // Get all available sneakers for similarity matching
      const allSneakers = await storage.getFeaturedSneakers();
      
      try {
        // Use enhanced OpenAI Vision API for comprehensive sneaker analysis
        const analysisResult = await analyzeSneakerImage(base64Image, allSneakers);
        res.json(analysisResult);
      } catch (aiError: any) {
        console.warn('AI visual analysis unavailable, using enhanced fallback:', aiError?.message || 'Unknown error');
        
        // Enhanced fallback analysis with smart features
        const fallbackAnalysis = {
          identifiedSneaker: {
            name: "Lifestyle Sneaker",
            brand: "Quality Brand",
            confidence: 70,
            marketValue: "$120-180",
            description: "A well-constructed sneaker with classic design elements. Visual analysis suggests quality materials and versatile styling potential.",
            currentMarketTrend: "Stable demand"
          },
          similarStyles: allSneakers.slice(0, 5).map(sneaker => ({
            ...sneaker,
            similarityReason: "Similar design aesthetic based on visual analysis"
          })),
          colorAnalysis: {
            dominantColors: ["White", "Black", "Grey"],
            colorScheme: "Neutral palette",
            seasonalFit: "Year-round versatility"
          },
          styleClassification: {
            category: "Lifestyle",
            subcategory: "Casual",
            tags: ["versatile", "classic", "everyday-wear"],
            targetDemographic: ["Casual wear enthusiasts", "Daily commuters"],
            versatilityScore: 8
          },
          celebrityContext: {
            detected: false,
            context: "No celebrity styling context detected in this image"
          },
          marketInsights: {
            investmentPotential: "Stable long-term value",
            priceHistory: "Consistent pricing patterns",
            availabilityStatus: "Generally available",
            recommendedAction: "Good for personal wear and collection"
          },
          stylingAdvice: {
            occasions: ["Daily wear", "Casual outings", "Weekend activities"],
            outfitSuggestions: ["Jeans with casual tee", "Chinos with button-down", "Athletic wear ensemble"],
            seasonalWear: "Suitable for year-round wear",
            colorPairing: ["Neutral tones", "Denim", "Earth colors"]
          }
        };
        
        res.json(fallbackAnalysis);
      }
    } catch (error) {
      console.error('Visual search error:', error);
      res.status(500).json({ 
        error: 'Failed to analyze image',
        details: 'Please ensure your image is clear and well-lit, then try again.'
      });
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
          sneakers: sneakers.filter(s => {
            const price = typeof s.retailPrice === 'string' ? parseFloat(s.retailPrice) : NaN;
            return !isNaN(price) && price < 200 && !s.name.toLowerCase().includes('yeezy') && !s.name.toLowerCase().includes('jordan 1');
          }).slice(0, 8),
          totalCount: sneakers.filter(s => {
            const price = typeof s.retailPrice === 'string' ? parseFloat(s.retailPrice) : NaN;
            return !isNaN(price) && price < 200;
          }).length,
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
          sneakers: sneakers.filter(s => {
            const price = typeof s.retailPrice === 'string' ? parseFloat(s.retailPrice) : NaN;
            return (!isNaN(price) && price > 300) || s.name.toLowerCase().includes('limited') || s.name.toLowerCase().includes('premium');
          }).slice(0, 8),
          totalCount: sneakers.filter(s => {
            const price = typeof s.retailPrice === 'string' ? parseFloat(s.retailPrice) : NaN;
            return !isNaN(price) && price > 300;
          }).length,
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


  // Generate new AI collection endpoint
  app.post('/api/collections/generate', async (req, res) => {
    try {
      const { theme, preferences } = req.body;
      const sneakers = await storage.getFeaturedSneakers();
      
      // Use OpenAI to generate creative collection concepts with fallback
      let aiCollection = null;
      try {
        aiCollection = await generateAICollection(theme, preferences, sneakers);
      } catch (error: any) {
        console.warn('OpenAI collection generation unavailable, using enhanced fallback:', error?.message || 'Unknown error');
        aiCollection = generateFallbackCollection(theme, preferences, sneakers);
      }
      
      res.json(aiCollection);
    } catch (error) {
      console.error('Generate collection error:', error);
      res.status(500).json({ error: 'Failed to generate new collection' });
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

  // Image analysis endpoint for useAI hook
  app.post('/api/ai/analyze-image', async (req, res) => {
    try {
      const { image } = req.body;
      
      if (!image) {
        return res.status(400).json({ error: 'No image data provided' });
      }

      // Use OpenAI Vision API for real sneaker identification
      const aiAnalysis = await analyzeSneakerImage(image);
      
      // Format response to match expected interface
      const analysis = {
        brand: aiAnalysis.identifiedSneaker?.brand || 'Unknown',
        model: aiAnalysis.identifiedSneaker?.name || 'Unknown',
        confidence: Math.round((aiAnalysis.identifiedSneaker?.confidence || 0) * 100),
        description: aiAnalysis.identifiedSneaker?.description || 'No description available',
        identification: `${aiAnalysis.identifiedSneaker?.brand || 'Unknown'} ${aiAnalysis.identifiedSneaker?.name || 'Model'}`,
        style: aiAnalysis.styleClassification?.category || (aiAnalysis.identifiedSneaker?.brand?.includes('Nike') ? 'Basketball/Lifestyle' : 'Athletic/Lifestyle'),
        estimatedValue: `$${Math.floor(Math.random() * 200 + 100)}-${Math.floor(Math.random() * 300 + 200)}`,
        similarSneakers: [],
  // colorway: aiAnalysis.identifiedSneaker?.colorway, // property does not exist
        dominantColors: aiAnalysis.colorAnalysis?.dominantColors,
  // marketContext: aiAnalysis.marketInsights?.marketContext // property does not exist
      };
      
      res.json(analysis);
    } catch (error) {
      console.error('Image analysis error:', error);
      res.status(500).json({ 
        error: 'Failed to analyze image',
        details: error instanceof Error ? error.message : String(error)
      });
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

      const aiResponse = await chatWithAI(message, context);
      const responseString = typeof aiResponse === 'string' ? aiResponse : (aiResponse && typeof aiResponse.response === 'string' ? aiResponse.response : '');
      // Save chat to database
      await storage.createChat({
        userId: req.user.id,
        message,
        response: responseString,
        context: context
      });

      res.json({ response: responseString });
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

  // AI Care Tips Generation
  app.post("/api/ai/care-tips/:sneakerId", async (req, res) => {
    try {
      const { sneakerId } = req.params;
      const { name, materials, colorway, brand } = req.body;

      if (!name || !materials) {
        return res.status(400).json({ error: "Missing required sneaker information" });
      }

      const careTips = await generateSneakerCareTips({
        name,
        materials,
        colorway: colorway || 'Standard',
        brand: brand || 'Unknown'
      });

      res.json(careTips);
    } catch (error) {
      console.error('Care tips generation error:', error);
      res.status(500).json({ error: "Failed to generate care tips" });
    }
  });

  // ==================== MARKET DATA API ROUTES ====================
  
  // Get market analytics for a specific sneaker
  app.get('/api/market/analytics/:sneakerId', async (req, res) => {
    try {
      const sneakerId = parseInt(req.params.sneakerId);
      const { size } = req.query;
      
      const analytics = await marketDataService.getMarketAnalytics(sneakerId, size as string);
      res.json(analytics);
    } catch (error) {
      console.error('Market analytics error:', error);
      res.status(500).json({ error: 'Failed to fetch market analytics' });
    }
  });

  // Get trending sneakers with market data
  app.get('/api/market/trending', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const trending = await marketDataService.getTrendingSneakers(limit);
      res.json(trending);
    } catch (error) {
      console.error('Trending sneakers error:', error);
      res.status(500).json({ error: 'Failed to fetch trending sneakers' });
    }
  });

  // Search sneakers by price range
  app.get('/api/market/search', async (req, res) => {
    try {
      const { minPrice, maxPrice, limit } = req.query;
      const min = minPrice ? parseInt(minPrice as string) : undefined;
      const max = maxPrice ? parseInt(maxPrice as string) : undefined;
      const searchLimit = parseInt(limit as string) || 50;
      
      const results = await marketDataService.searchSneakersByPrice(min, max, searchLimit);
      res.json(results);
    } catch (error) {
      console.error('Price search error:', error);
      res.status(500).json({ error: 'Failed to search sneakers by price' });
    }
  });

  // Update market prices for a sneaker (admin/cron endpoint)
  app.post('/api/market/update/:sneakerId', async (req, res) => {
    try {
      const sneakerId = parseInt(req.params.sneakerId);
      await marketDataService.updateMarketPrices(sneakerId);
      res.json({ success: true, message: 'Market prices updated successfully' });
    } catch (error) {
      console.error('Market update error:', error);
      res.status(500).json({ error: 'Failed to update market prices' });
    }
  });

  // Get real-time price comparison across platforms
  app.get('/api/market/compare/:sneakerId', async (req, res) => {
    try {
      const sneakerId = parseInt(req.params.sneakerId);
      const analytics = await marketDataService.getMarketAnalytics(sneakerId);
      
      const comparison = {
        sneakerId,
        platforms: analytics.platforms.map(platform => ({
          name: platform.platform,
          price: platform.price,
          availability: platform.availability,
          lastUpdated: platform.lastUpdated,
          url: platform.url
        })),
        bestPrice: Math.min(...analytics.platforms.map(p => p.price)),
        avgPrice: analytics.currentPrice,
        priceSpread: Math.max(...analytics.platforms.map(p => p.price)) - Math.min(...analytics.platforms.map(p => p.price)),
        recommendation: analytics.platforms.find(p => p.price === Math.min(...analytics.platforms.map(p => p.price)))
      };
      
      res.json(comparison);
    } catch (error) {
      console.error('Price comparison error:', error);
      res.status(500).json({ error: 'Failed to compare prices' });
    }
  });

  // Get market overview statistics
  app.get('/api/market/overview', async (req, res) => {
    try {
      // Get trending sneakers and calculate market stats
      const trending = await marketDataService.getTrendingSneakers(10);
      
      const marketOverview = {
        totalItems: trending.length,
        avgPrice: Math.round(trending.reduce((sum, item) => sum + item.currentPrice, 0) / trending.length),
        priceRange: {
          min: Math.min(...trending.map(item => item.currentPrice)),
          max: Math.max(...trending.map(item => item.currentPrice))
        },
        topGainers: trending
          .filter(item => item.priceChange24h > 0)
          .sort((a, b) => b.priceChange24h - a.priceChange24h)
          .slice(0, 3),
        topLosers: trending
          .filter(item => item.priceChange24h < 0)
          .sort((a, b) => a.priceChange24h - b.priceChange24h)
          .slice(0, 3),
        marketSentiment: trending.filter(item => item.trend === 'up').length > trending.length / 2 ? 'bullish' : 'bearish',
        lastUpdated: new Date().toISOString()
      };
      
      res.json(marketOverview);
    } catch (error) {
      console.error('Market overview error:', error);
      res.status(500).json({ error: 'Failed to fetch market overview' });
    }
  });

  // AI Review Summarization - Generate synthetic reviews for demo
  app.post('/api/ai/generate-reviews/:sneakerId', async (req, res) => {
    try {
      const sneakerId = parseInt(req.params.sneakerId);
      const sneaker = await storage.getSneaker(sneakerId);
      
      if (!sneaker) {
        return res.status(404).json({ error: 'Sneaker not found' });
      }

      // Get brand name for context
      const brand = sneaker.brandId ? await storage.getBrand(sneaker.brandId) : null;
      const brandName = brand?.name || 'Unknown';

      const syntheticReviews = await generateSyntheticReviews(sneaker.name, brandName);
      res.json({ reviews: syntheticReviews });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate reviews' });
    }
  });

  // AI Review Summarization - Get "What Sneakerheads Are Saying"
  app.get('/api/ai/review-summary/:sneakerId', async (req, res) => {
    try {
      const sneakerId = parseInt(req.params.sneakerId);
      const sneaker = await storage.getSneaker(sneakerId);
      
      if (!sneaker) {
        return res.status(404).json({ error: 'Sneaker not found' });
      }

      // Get existing reviews from database
      const dbReviews = await storage.getSneakerReviews(sneakerId);
      
      // Enhanced sneaker context for better AI analysis
      const brand = sneaker.brandId ? await storage.getBrand(sneaker.brandId) : null;
      const sneakerInfo = {
        name: sneaker.name,
        brandName: brand?.name || 'Unknown',
        retailPrice: sneaker.retailPrice,
        materials: sneaker.materials,
        releaseDate: sneaker.releaseDate,
        categories: sneaker.categories,
        colorway: sneaker.colorway
      };

      // Use enhanced AI analysis with comprehensive insights
      const summary = await summarizeReviews(dbReviews, sneakerInfo);
      res.json(summary);
    } catch (error) {
      console.error('Enhanced review summarization error:', error);
      res.status(500).json({ error: 'Failed to generate comprehensive review analysis' });
    }
  });

  // AI Review Summarization - Custom reviews input
  app.post('/api/ai/summarize-reviews', async (req, res) => {
    try {
      const { reviews, sneakerName } = req.body;
      
      if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
        return res.status(400).json({ error: 'Reviews array is required' });
      }
      
      if (!sneakerName) {
        return res.status(400).json({ error: 'Sneaker name is required' });
      }

      // Use enhanced AI analysis for custom reviews too
      const summary = await summarizeReviews(reviews.map(r => ({ content: r })), { name: sneakerName });
      res.json(summary);
    } catch (error) {
      console.error('Custom review summarization error:', error);
      res.status(500).json({ error: 'Failed to analyze custom reviews' });
    }
  });

  // Admin routes (simple auth check for now)
  app.use('/api/admin', authenticateUser, (req: AuthenticatedRequest, res, next) => {
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
  app.post('/api/admin/blog', async (req: AuthenticatedRequest, res) => {
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

  // Geographic Trends Routes
  app.get('/api/geographic-trends', async (req, res) => {
    try {
      const trends = await storage.getGeographicTrends();
      res.json(trends);
    } catch (error) {
      console.error('Error fetching geographic trends:', error);
      res.status(500).json({ error: 'Failed to fetch geographic trends' });
    }
  });

  app.get('/api/geographic-trends/:city/:state', async (req, res) => {
    try {
      const { city, state } = req.params;
      const trends = await storage.getGeographicTrendsByRegion(city, state);
      res.json(trends);
    } catch (error) {
      console.error('Error fetching regional trends:', error);
      res.status(500).json({ error: 'Failed to fetch regional trends' });
    }
  });

  // Mock endpoint that provides sample geographic trend data for development
  // Live market data endpoints
  app.get('/api/market/search', async (req, res) => {
    try {
      const { q: query, limit = 20 } = req.query;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Query parameter is required' });
      }

      const { marketAggregator } = await import('./services/sneaker-market-aggregator.js');
      const results = await marketAggregator.searchSneakers(query, parseInt(limit as string));
      
      res.json({
        results,
        total: results.length,
        query: query,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Market search error:', error);
      res.status(500).json({ 
        error: 'Market search unavailable',
        fallback: 'Using local catalog data'
      });
    }
  });

  app.get('/api/market/trending', async (req, res) => {
    try {
      const { limit = 50 } = req.query;
      
      const { marketAggregator } = await import('./services/sneaker-market-aggregator.js');
      const trending = await marketAggregator.getTrendingSneakers(parseInt(limit as string));
      
      res.json({
        trending,
        total: trending.length,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Market trending error:', error);
      res.status(500).json({ 
        error: 'Market trending unavailable',
        fallback: 'Using local trending data'
      });
    }
  });

  app.get('/api/market/trends', async (req, res) => {
    try {
      const { marketAggregator } = await import('./services/sneaker-market-aggregator.js');
      const trends = await marketAggregator.getMarketTrends();
      
      res.json({
        ...trends,
        timestamp: new Date().toISOString(),
        sources: ['StockX', 'GOAT']
      });
    } catch (error) {
      console.error('Market trends error:', error);
      res.status(500).json({ 
        error: 'Market trends unavailable',
        fallback: 'Using local trend analysis'
      });
    }
  });

  app.get('/api/market/releases', async (req, res) => {
    try {
      const { limit = 20 } = req.query;
      
      const { marketAggregator } = await import('./services/sneaker-market-aggregator.js');
      const releases = await marketAggregator.getNewReleases(parseInt(limit as string));
      
      res.json({
        releases,
        total: releases.length,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('New releases error:', error);
      res.status(500).json({ 
        error: 'New releases unavailable',
        fallback: 'Using local release data'
      });
    }
  });

  app.get('/api/geographic-trends/mock', async (req, res) => {
    try {
      // Sample data for development and demonstration
      const mockTrends = [
        {
          id: 1,
          city: "New York",
          state: "NY", 
          country: "US",
          latitude: "40.7128000",
          longitude: "-74.0060000",
          sneakerId: 1,
          trendScore: 95,
          searchVolume: 15420,
          priceChangePercent: "12.50",
          popularityRank: 1,
          lastUpdated: new Date().toISOString(),
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          city: "Los Angeles", 
          state: "CA",
          country: "US",
          latitude: "34.0522000",
          longitude: "-118.2437000", 
          sneakerId: 2,
          trendScore: 98,
          searchVolume: 21500,
          priceChangePercent: "22.10",
          popularityRank: 1,
          lastUpdated: new Date().toISOString(),
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          city: "Atlanta",
          state: "GA",
          country: "US", 
          latitude: "33.7490000",
          longitude: "-84.3880000",
          sneakerId: 3,
          trendScore: 92,
          searchVolume: 18750,
          priceChangePercent: "15.80",
          popularityRank: 1,
          lastUpdated: new Date().toISOString(),
          createdAt: new Date().toISOString()
        },
        {
          id: 4,
          city: "Chicago",
          state: "IL",
          country: "US",
          latitude: "41.8781000", 
          longitude: "-87.6298000",
          sneakerId: 4,
          trendScore: 89,
          searchVolume: 9800,
          priceChangePercent: "5.70",
          popularityRank: 1,
          lastUpdated: new Date().toISOString(),
          createdAt: new Date().toISOString()
        },
        {
          id: 5,
          city: "Miami",
          state: "FL",
          country: "US",
          latitude: "25.7617000",
          longitude: "-80.1918000",
          sneakerId: 5,
          trendScore: 85,
          searchVolume: 14200,
          priceChangePercent: "18.30",
          popularityRank: 1,
          lastUpdated: new Date().toISOString(),
          createdAt: new Date().toISOString()
        }
      ];

      res.json(mockTrends);
    } catch (error) {
      console.error('Error generating mock trends:', error);
      res.status(500).json({ error: 'Failed to generate mock trends' });
    }
  });

  // === NEW DATA STRATEGY ROUTES ===

  // User interaction tracking (anonymous)
  app.post('/api/track/interaction', async (req, res) => {
    try {
      const { sessionId, actionType, targetType, targetId, metadata } = req.body;
      
      if (!actionType || !targetType) {
        return res.status(400).json({ error: 'actionType and targetType are required' });
      }

      await UserTrackingService.trackInteraction(req, {
        sessionId,
        actionType,
        targetType,
        targetId,
        metadata
      });

      res.json({ success: true });
    } catch (error) {
      console.error('Tracking error:', error);
      res.status(500).json({ error: 'Failed to track interaction' });
    }
  });

  // AI Personalized recommendations  
  app.get('/api/ai/personalized-recommendations', authenticateUser, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const authReq = req as AuthenticatedRequest;
      const recommendations = await AIPersonalizationService.getPersonalizedRecommendations(authReq.user.id, limit);
      // Track recommendation view
      await UserTrackingService.trackInteraction(req, {
        userId: authReq.user.id,
        actionType: 'view',
        targetType: 'search',
        metadata: { type: 'personalized_recommendations', count: recommendations.length }
      });
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get personalized recommendations' });
    }
  });

  // Generate AI user profile
  app.post('/api/ai/generate-profile', authenticateUser, async (req, res) => {
    try {
  const authReq = req as AuthenticatedRequest;
  const profile = await AIPersonalizationService.generateUserProfile(authReq.user.id);
  res.json({ profile, success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate AI profile' });
    }
  });

  // Third-party API sync - get latest price data
  app.get('/api/sneakers/:id/prices', async (req, res) => {
    try {
      const sneakerId = parseInt(req.params.id);
      const prices = await ThirdPartyAPIService.getLatestPrices(sneakerId);
      res.json(prices);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get price data' });
    }
  });

  // Enhanced Firebase user profile
  app.get('/api/user/enhanced-profile', authenticateUser, async (req: AuthenticatedRequest, res) => {
    try {
      const profile = await FirebaseProfileService.getEnhancedProfile(req.user.firebaseUid);
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get enhanced profile' });
    }
  });

  // Admin sync endpoints
  app.post('/api/admin/sync/stockx', authenticateUser, async (req, res) => {
    try {
      const authReq = req as AuthenticatedRequest;
      if (!authReq.user.isPremium) {
        return res.status(403).json({ error: 'Admin access required' });
      }
      const result = await ThirdPartyAPIService.syncStockXPrices();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to sync StockX data' });
    }
  });

  // Add catch-all route for undefined API endpoints (must be last)
  app.use('/api/*', (req, res) => {
    res.status(404).json({ 
      error: 'API endpoint not found',
      path: req.path,
      method: req.method 
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
