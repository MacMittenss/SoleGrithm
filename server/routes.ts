import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, insertSneakerSchema, insertCollectionSchema, 
  insertReviewSchema, insertBlogPostSchema, insertCommentSchema 
} from "@shared/schema";
import { verifyFirebaseToken } from "./services/firebase-admin";
import { chatWithAI, getSneakerRecommendations, analyzeSentiment } from "./services/openai";
import { z } from "zod";

// Middleware to verify Firebase token
async function authenticateUser(req: any, res: any, next: any) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await verifyFirebaseToken(token);
    
    // Get or create user in our database
    let user = await storage.getUserByUid(decodedToken.uid);
    if (!user) {
      user = await storage.createUser({
        uid: decodedToken.uid,
        email: decodedToken.email || '',
        username: decodedToken.email?.split('@')[0] || '',
        displayName: decodedToken.name || null,
        avatar: decodedToken.picture || null,
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
  
  // Get all brands
  app.get("/api/brands", async (req, res) => {
    try {
      const brands = await storage.getBrands();
      res.json(brands);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch brands" });
    }
  });

  // Get sneakers with filters
  app.get("/api/sneakers", async (req, res) => {
    try {
      const { brandId, search, categories, page = 1, limit = 20 } = req.query;
      
      const filters = {
        brandId: brandId ? parseInt(brandId as string) : undefined,
        search: search as string,
        categories: categories ? (categories as string).split(',') : undefined,
        limit: parseInt(limit as string),
        offset: (parseInt(page as string) - 1) * parseInt(limit as string),
      };

      const result = await storage.getSneakers(filters);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sneakers" });
    }
  });

  // Get single sneaker
  app.get("/api/sneakers/:slug", async (req, res) => {
    try {
      const sneaker = await storage.getSneakerBySlug(req.params.slug);
      if (!sneaker) {
        return res.status(404).json({ error: "Sneaker not found" });
      }
      res.json(sneaker);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sneaker" });
    }
  });

  // Get sneaker reviews
  app.get("/api/sneakers/:id/reviews", async (req, res) => {
    try {
      const reviews = await storage.getSneakerReviews(parseInt(req.params.id));
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  // Get blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const { authorId, categories, page = 1, limit = 10 } = req.query;
      
      const filters = {
        authorId: authorId ? parseInt(authorId as string) : undefined,
        categories: categories ? (categories as string).split(',') : undefined,
        isPublished: true,
        limit: parseInt(limit as string),
        offset: (parseInt(page as string) - 1) * parseInt(limit as string),
      };

      const result = await storage.getBlogPosts(filters);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  // Get single blog post
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Get price history
  app.get("/api/sneakers/:id/prices", async (req, res) => {
    try {
      const { size } = req.query;
      const prices = await storage.getPriceHistory(parseInt(req.params.id), size as string);
      res.json(prices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch price history" });
    }
  });

  // AI Chat endpoint (public)
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, context } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = await chatWithAI(message, context);
      
      // Store interaction if user is authenticated
      if (req.user) {
        await storage.createAiInteraction({
          userId: req.user.id,
          type: 'chat',
          query: message,
          response: response,
          metadata: { context }
        });
      }

      res.json({ response });
    } catch (error) {
      res.status(500).json({ error: "Failed to process AI request" });
    }
  });

  // AI Recommendations endpoint
  app.post("/api/ai/recommendations", async (req, res) => {
    try {
      const { preferences, userId } = req.body;
      
      const recommendations = await getSneakerRecommendations(preferences);
      
      if (userId) {
        await storage.createAiInteraction({
          userId: parseInt(userId),
          type: 'recommendation',
          query: JSON.stringify(preferences),
          response: JSON.stringify(recommendations),
          metadata: { preferences }
        });
      }

      res.json({ recommendations });
    } catch (error) {
      res.status(500).json({ error: "Failed to get recommendations" });
    }
  });

  // Protected routes (require authentication)
  
  // Get user profile
  app.get("/api/user/profile", authenticateUser, async (req, res) => {
    res.json(req.user);
  });

  // Update user profile
  app.put("/api/user/profile", authenticateUser, async (req, res) => {
    try {
      const updateData = insertUserSchema.partial().parse(req.body);
      const updatedUser = await storage.updateUser(req.user.id, updateData);
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  // Get user collections
  app.get("/api/user/collections", authenticateUser, async (req, res) => {
    try {
      const { wishlist } = req.query;
      const isWishlist = wishlist === 'true' ? true : wishlist === 'false' ? false : undefined;
      const collections = await storage.getUserCollections(req.user.id, isWishlist);
      res.json(collections);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch collections" });
    }
  });

  // Add to collection
  app.post("/api/user/collections", authenticateUser, async (req, res) => {
    try {
      const collectionData = insertCollectionSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const collection = await storage.addToCollection(collectionData);
      res.json(collection);
    } catch (error) {
      res.status(400).json({ error: "Invalid collection data" });
    }
  });

  // Remove from collection
  app.delete("/api/user/collections/:sneakerId", authenticateUser, async (req, res) => {
    try {
      await storage.removeFromCollection(req.user.id, parseInt(req.params.sneakerId));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove from collection" });
    }
  });

  // Create review
  app.post("/api/reviews", authenticateUser, async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const review = await storage.createReview(reviewData);
      res.json(review);
    } catch (error) {
      res.status(400).json({ error: "Invalid review data" });
    }
  });

  // Create blog post
  app.post("/api/blog", authenticateUser, async (req, res) => {
    try {
      const postData = insertBlogPostSchema.parse({
        ...req.body,
        authorId: req.user.id
      });
      const post = await storage.createBlogPost(postData);
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: "Invalid blog post data" });
    }
  });

  // Create comment
  app.post("/api/comments", authenticateUser, async (req, res) => {
    try {
      const commentData = insertCommentSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const comment = await storage.createComment(commentData);
      res.json(comment);
    } catch (error) {
      res.status(400).json({ error: "Invalid comment data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
