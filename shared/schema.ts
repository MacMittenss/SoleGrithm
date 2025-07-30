import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firebaseUid: text("firebase_uid").notNull().unique(),
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
  username: text("username").unique(),
  avatar: text("avatar"),
  bio: text("bio"),
  isVerified: boolean("is_verified").default(false),
  isPremium: boolean("is_premium").default(false),
  // Enhanced user profile data
  preferences: jsonb("preferences"), // Stores user preferences for personalization
  lastActiveAt: timestamp("last_active_at").defaultNow(),
  totalInteractions: integer("total_interactions").default(0),
  favoriteCategories: text("favorite_categories").array(),
  sizesOwned: text("sizes_owned").array(),
  preferredBrands: text("preferred_brands").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// User interaction tracking table for anonymous data collection
export const userInteractions = pgTable("user_interactions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id"), // Anonymous session tracking
  userId: integer("user_id").references(() => users.id), // Optional - for logged in users
  actionType: text("action_type").notNull(), // click, save, like, view, search, etc.
  targetType: text("target_type").notNull(), // sneaker, brand, blog, etc.
  targetId: integer("target_id"), // ID of the target item
  metadata: jsonb("metadata"), // Additional context data
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
  timestamp: timestamp("timestamp").defaultNow()
});

// User personalization profiles
export const userPersonalization = pgTable("user_personalization", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  aiProfile: jsonb("ai_profile"), // AI-generated user profile
  recommendationHistory: jsonb("recommendation_history"), // Track AI recommendations
  interactionPatterns: jsonb("interaction_patterns"), // Behavioral patterns
  stylePreferences: jsonb("style_preferences"), // AI-learned style preferences
  lastPersonalizationUpdate: timestamp("last_personalization_update").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  logo: text("logo"),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow()
});

export const sneakers = pgTable("sneakers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  sku: text("sku").unique(),
  brandId: integer("brand_id").references(() => brands.id),
  description: text("description"),
  images: text("images").array(),
  retailPrice: decimal("retail_price", { precision: 10, scale: 2 }),
  releaseDate: timestamp("release_date"),
  categories: text("categories").array(),
  sizes: text("sizes").array(),
  materials: text("materials"),
  colorway: text("colorway"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  sneakerId: integer("sneaker_id").references(() => sneakers.id),
  size: text("size"),
  condition: text("condition"),
  purchasePrice: decimal("purchase_price", { precision: 10, scale: 2 }),
  purchaseDate: timestamp("purchase_date"),
  isWishlist: boolean("is_wishlist").default(false),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow()
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  sneakerId: integer("sneaker_id").references(() => sneakers.id),
  rating: integer("rating").notNull(),
  title: text("title"),
  content: text("content").notNull(),
  verified: boolean("verified").default(false),
  helpfulCount: integer("helpful_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Third-party API sync tracking
export const apiSyncLog = pgTable("api_sync_log", {
  id: serial("id").primaryKey(),
  provider: text("provider").notNull(), // stockx, goat, etc.
  endpoint: text("endpoint").notNull(),
  lastSyncAt: timestamp("last_sync_at").defaultNow(),
  status: text("status").notNull(), // success, error, pending
  recordsUpdated: integer("records_updated").default(0),
  errorMessage: text("error_message"),
  metadata: jsonb("metadata")
});

export const priceHistory = pgTable("price_history", {
  id: serial("id").primaryKey(),
  sneakerId: integer("sneaker_id").references(() => sneakers.id),
  size: text("size"),
  platform: text("platform"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("USD"),
  timestamp: timestamp("timestamp").defaultNow()
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  authorId: integer("author_id").references(() => users.id),
  featuredImage: text("featured_image"),
  category: text("category"),
  tags: text("tags").array(),
  published: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const aiChats = pgTable("ai_chats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  message: text("message").notNull(),
  response: text("response").notNull(),
  context: jsonb("context"),
  createdAt: timestamp("created_at").defaultNow()
});

export const geographicTrends = pgTable("geographic_trends", {
  id: serial("id").primaryKey(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  country: text("country").default("US"),
  latitude: decimal("latitude", { precision: 10, scale: 7 }).notNull(),
  longitude: decimal("longitude", { precision: 10, scale: 7 }).notNull(),
  sneakerId: integer("sneaker_id").references(() => sneakers.id),
  trendScore: integer("trend_score").notNull(), // 0-100
  searchVolume: integer("search_volume").default(0),
  priceChangePercent: decimal("price_change_percent", { precision: 5, scale: 2 }).default("0"),
  popularityRank: integer("popularity_rank").default(1),
  lastUpdated: timestamp("last_updated").defaultNow(),
  createdAt: timestamp("created_at").defaultNow()
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  collections: many(collections),
  reviews: many(reviews),
  blogPosts: many(blogPosts),
  aiChats: many(aiChats)
}));

export const brandsRelations = relations(brands, ({ many }) => ({
  sneakers: many(sneakers)
}));

export const sneakersRelations = relations(sneakers, ({ one, many }) => ({
  brand: one(brands, {
    fields: [sneakers.brandId],
    references: [brands.id]
  }),
  collections: many(collections),
  reviews: many(reviews),
  priceHistory: many(priceHistory)
}));

export const collectionsRelations = relations(collections, ({ one }) => ({
  user: one(users, {
    fields: [collections.userId],
    references: [users.id]
  }),
  sneaker: one(sneakers, {
    fields: [collections.sneakerId],
    references: [sneakers.id]
  })
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id]
  }),
  sneaker: one(sneakers, {
    fields: [reviews.sneakerId],
    references: [sneakers.id]
  })
}));

export const priceHistoryRelations = relations(priceHistory, ({ one }) => ({
  sneaker: one(sneakers, {
    fields: [priceHistory.sneakerId],
    references: [sneakers.id]
  })
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id]
  })
}));

export const aiChatsRelations = relations(aiChats, ({ one }) => ({
  user: one(users, {
    fields: [aiChats.userId],
    references: [users.id]
  })
}));

export const geographicTrendsRelations = relations(geographicTrends, ({ one }) => ({
  sneaker: one(sneakers, {
    fields: [geographicTrends.sneakerId],
    references: [sneakers.id]
  })
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertBrandSchema = createInsertSchema(brands).omit({
  id: true,
  createdAt: true
});

export const insertSneakerSchema = createInsertSchema(sneakers).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertCollectionSchema = createInsertSchema(collections).omit({
  id: true,
  createdAt: true
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertPriceHistorySchema = createInsertSchema(priceHistory).omit({
  id: true,
  timestamp: true
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertAiChatSchema = createInsertSchema(aiChats).omit({
  id: true,
  createdAt: true
});

export const insertGeographicTrendSchema = createInsertSchema(geographicTrends).omit({
  id: true,
  createdAt: true,
  lastUpdated: true
});

// Insert schemas for new data strategy tables
export const insertUserInteractionSchema = createInsertSchema(userInteractions).omit({
  id: true,
  timestamp: true
});

export const insertUserPersonalizationSchema = createInsertSchema(userPersonalization).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastPersonalizationUpdate: true
});

export const insertApiSyncLogSchema = createInsertSchema(apiSyncLog).omit({
  id: true,
  lastSyncAt: true
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Brand = typeof brands.$inferSelect;
export type InsertBrand = z.infer<typeof insertBrandSchema>;

export type Sneaker = typeof sneakers.$inferSelect;
export type InsertSneaker = z.infer<typeof insertSneakerSchema>;

// Extended type for sneakers with brand information
export type SneakerWithBrand = Sneaker & {
  brandName?: string | null;
  matchScore?: number;
};

export type Collection = typeof collections.$inferSelect;
export type InsertCollection = z.infer<typeof insertCollectionSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type PriceHistory = typeof priceHistory.$inferSelect;
export type InsertPriceHistory = z.infer<typeof insertPriceHistorySchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type AiChat = typeof aiChats.$inferSelect;
export type InsertAiChat = z.infer<typeof insertAiChatSchema>;

export type GeographicTrend = typeof geographicTrends.$inferSelect;
export type InsertGeographicTrend = z.infer<typeof insertGeographicTrendSchema>;

// New data strategy types
export type UserInteraction = typeof userInteractions.$inferSelect;
export type InsertUserInteraction = z.infer<typeof insertUserInteractionSchema>;

export type UserPersonalization = typeof userPersonalization.$inferSelect;
export type InsertUserPersonalization = z.infer<typeof insertUserPersonalizationSchema>;

export type ApiSyncLog = typeof apiSyncLog.$inferSelect;
export type InsertApiSyncLog = z.infer<typeof insertApiSyncLogSchema>;
