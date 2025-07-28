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
