import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uid: text("uid").notNull().unique(), // Firebase UID
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  displayName: text("display_name"),
  avatar: text("avatar"),
  bio: text("bio"),
  isVerified: boolean("is_verified").default(false),
  isPremium: boolean("is_premium").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Brands table
export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
  description: text("description"),
  isActive: boolean("is_active").default(true),
});

// Sneakers table
export const sneakers = pgTable("sneakers", {
  id: serial("id").primaryKey(),
  brandId: integer("brand_id").references(() => brands.id),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  model: text("model"),
  colorway: text("colorway"),
  styleCode: text("style_code"),
  releaseDate: timestamp("release_date"),
  retailPrice: decimal("retail_price", { precision: 10, scale: 2 }),
  description: text("description"),
  images: jsonb("images").$type<string[]>().default([]),
  categories: jsonb("categories").$type<string[]>().default([]),
  sizes: jsonb("sizes").$type<string[]>().default([]),
  materials: text("materials"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Collections table (user's personal sneaker collections)
export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  sneakerId: integer("sneaker_id").references(() => sneakers.id),
  size: text("size"),
  condition: text("condition"), // new, used, worn
  purchasePrice: decimal("purchase_price", { precision: 10, scale: 2 }),
  purchaseDate: timestamp("purchase_date"),
  notes: text("notes"),
  isWishlist: boolean("is_wishlist").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Reviews table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  sneakerId: integer("sneaker_id").references(() => sneakers.id),
  rating: integer("rating"), // 1-5 stars
  title: text("title"),
  content: text("content"),
  images: jsonb("images").$type<string[]>().default([]),
  isVerified: boolean("is_verified").default(false),
  helpfulCount: integer("helpful_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Blog posts table
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id").references(() => users.id),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  featuredImage: text("featured_image"),
  categories: jsonb("categories").$type<string[]>().default([]),
  tags: jsonb("tags").$type<string[]>().default([]),
  isPublished: boolean("is_published").default(false),
  isFeatured: boolean("is_featured").default(false),
  viewCount: integer("view_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Comments table (for blog posts and reviews)
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  postId: integer("post_id").references(() => blogPosts.id),
  reviewId: integer("review_id").references(() => reviews.id),
  parentId: integer("parent_id"), // for nested comments
  content: text("content").notNull(),
  isApproved: boolean("is_approved").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Price history table (for market tracking)
export const priceHistory = pgTable("price_history", {
  id: serial("id").primaryKey(),
  sneakerId: integer("sneaker_id").references(() => sneakers.id),
  size: text("size"),
  platform: text("platform"), // StockX, GOAT, etc.
  price: decimal("price", { precision: 10, scale: 2 }),
  currency: text("currency").default("USD"),
  recordedAt: timestamp("recorded_at").defaultNow(),
});

// AI interactions table (for tracking AI usage)
export const aiInteractions = pgTable("ai_interactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  type: text("type").notNull(), // chat, recommendation, price_prediction, etc.
  query: text("query"),
  response: text("response"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  collections: many(collections),
  reviews: many(reviews),
  blogPosts: many(blogPosts),
  comments: many(comments),
  aiInteractions: many(aiInteractions),
}));

export const brandsRelations = relations(brands, ({ many }) => ({
  sneakers: many(sneakers),
}));

export const sneakersRelations = relations(sneakers, ({ one, many }) => ({
  brand: one(brands, {
    fields: [sneakers.brandId],
    references: [brands.id],
  }),
  collections: many(collections),
  reviews: many(reviews),
  priceHistory: many(priceHistory),
}));

export const collectionsRelations = relations(collections, ({ one }) => ({
  user: one(users, {
    fields: [collections.userId],
    references: [users.id],
  }),
  sneaker: one(sneakers, {
    fields: [collections.sneakerId],
    references: [sneakers.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one, many }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  sneaker: one(sneakers, {
    fields: [reviews.sneakerId],
    references: [sneakers.id],
  }),
  comments: many(comments),
}));

export const blogPostsRelations = relations(blogPosts, ({ one, many }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  post: one(blogPosts, {
    fields: [comments.postId],
    references: [blogPosts.id],
  }),
  review: one(reviews, {
    fields: [comments.reviewId],
    references: [reviews.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBrandSchema = createInsertSchema(brands).omit({
  id: true,
});

export const insertSneakerSchema = createInsertSchema(sneakers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCollectionSchema = createInsertSchema(collections).omit({
  id: true,
  createdAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  helpfulCount: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  viewCount: true,
});

export const insertCommentSchema = createInsertSchema(comments).omit({
  id: true,
  createdAt: true,
});

export const insertPriceHistorySchema = createInsertSchema(priceHistory).omit({
  id: true,
  recordedAt: true,
});

export const insertAiInteractionSchema = createInsertSchema(aiInteractions).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Brand = typeof brands.$inferSelect;
export type InsertBrand = z.infer<typeof insertBrandSchema>;

export type Sneaker = typeof sneakers.$inferSelect;
export type InsertSneaker = z.infer<typeof insertSneakerSchema>;

export type Collection = typeof collections.$inferSelect;
export type InsertCollection = z.infer<typeof insertCollectionSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type Comment = typeof comments.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;

export type PriceHistory = typeof priceHistory.$inferSelect;
export type InsertPriceHistory = z.infer<typeof insertPriceHistorySchema>;

export type AiInteraction = typeof aiInteractions.$inferSelect;
export type InsertAiInteraction = z.infer<typeof insertAiInteractionSchema>;
