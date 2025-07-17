import { 
  users, brands, sneakers, collections, reviews, blogPosts, comments, priceHistory, aiInteractions,
  type User, type InsertUser, type Brand, type InsertBrand, type Sneaker, type InsertSneaker,
  type Collection, type InsertCollection, type Review, type InsertReview, type BlogPost, type InsertBlogPost,
  type Comment, type InsertComment, type PriceHistory, type InsertPriceHistory,
  type AiInteraction, type InsertAiInteraction
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, like, inArray, sql } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUid(uid: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User>;

  // Brand methods
  getBrands(): Promise<Brand[]>;
  getBrand(id: number): Promise<Brand | undefined>;
  createBrand(brand: InsertBrand): Promise<Brand>;

  // Sneaker methods
  getSneakers(filters?: {
    brandId?: number;
    search?: string;
    categories?: string[];
    limit?: number;
    offset?: number;
  }): Promise<{ sneakers: Sneaker[]; total: number }>;
  getSneaker(id: number): Promise<Sneaker | undefined>;
  getSneakerBySlug(slug: string): Promise<Sneaker | undefined>;
  createSneaker(sneaker: InsertSneaker): Promise<Sneaker>;
  updateSneaker(id: number, sneaker: Partial<InsertSneaker>): Promise<Sneaker>;

  // Collection methods
  getUserCollections(userId: number, isWishlist?: boolean): Promise<Collection[]>;
  addToCollection(collection: InsertCollection): Promise<Collection>;
  removeFromCollection(userId: number, sneakerId: number): Promise<void>;

  // Review methods
  getSneakerReviews(sneakerId: number): Promise<Review[]>;
  getUserReviews(userId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  updateReview(id: number, review: Partial<InsertReview>): Promise<Review>;

  // Blog methods
  getBlogPosts(filters?: {
    authorId?: number;
    categories?: string[];
    isPublished?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<{ posts: BlogPost[]; total: number }>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;

  // Comment methods
  getComments(postId?: number, reviewId?: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;

  // Price history methods
  getPriceHistory(sneakerId: number, size?: string): Promise<PriceHistory[]>;
  addPriceRecord(price: InsertPriceHistory): Promise<PriceHistory>;

  // AI interaction methods
  createAiInteraction(interaction: InsertAiInteraction): Promise<AiInteraction>;
  getUserAiInteractions(userId: number): Promise<AiInteraction[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUid(uid: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.uid, uid));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, updateData: Partial<InsertUser>): Promise<User> {
    const [user] = await db.update(users).set({ ...updateData, updatedAt: new Date() }).where(eq(users.id, id)).returning();
    return user;
  }

  // Brand methods
  async getBrands(): Promise<Brand[]> {
    return await db.select().from(brands).where(eq(brands.isActive, true));
  }

  async getBrand(id: number): Promise<Brand | undefined> {
    const [brand] = await db.select().from(brands).where(eq(brands.id, id));
    return brand || undefined;
  }

  async createBrand(insertBrand: InsertBrand): Promise<Brand> {
    const [brand] = await db.insert(brands).values(insertBrand).returning();
    return brand;
  }

  // Sneaker methods
  async getSneakers(filters?: {
    brandId?: number;
    search?: string;
    categories?: string[];
    limit?: number;
    offset?: number;
  }): Promise<{ sneakers: Sneaker[]; total: number }> {
    let query = db.select().from(sneakers).where(eq(sneakers.isActive, true));
    let countQuery = db.select({ count: sql<number>`count(*)` }).from(sneakers).where(eq(sneakers.isActive, true));

    // Apply filters
    const conditions = [eq(sneakers.isActive, true)];

    if (filters?.brandId) {
      conditions.push(eq(sneakers.brandId, filters.brandId));
    }

    if (filters?.search) {
      conditions.push(like(sneakers.name, `%${filters.search}%`));
    }

    if (conditions.length > 1) {
      query = query.where(and(...conditions));
      countQuery = countQuery.where(and(...conditions));
    }

    // Apply pagination
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.offset(filters.offset);
    }

    query = query.orderBy(desc(sneakers.createdAt));

    const [sneakersResult, countResult] = await Promise.all([
      query,
      countQuery
    ]);

    return {
      sneakers: sneakersResult,
      total: countResult[0]?.count || 0
    };
  }

  async getSneaker(id: number): Promise<Sneaker | undefined> {
    const [sneaker] = await db.select().from(sneakers).where(eq(sneakers.id, id));
    return sneaker || undefined;
  }

  async getSneakerBySlug(slug: string): Promise<Sneaker | undefined> {
    const [sneaker] = await db.select().from(sneakers).where(eq(sneakers.slug, slug));
    return sneaker || undefined;
  }

  async createSneaker(insertSneaker: InsertSneaker): Promise<Sneaker> {
    const [sneaker] = await db.insert(sneakers).values(insertSneaker).returning();
    return sneaker;
  }

  async updateSneaker(id: number, updateData: Partial<InsertSneaker>): Promise<Sneaker> {
    const [sneaker] = await db.update(sneakers).set({ ...updateData, updatedAt: new Date() }).where(eq(sneakers.id, id)).returning();
    return sneaker;
  }

  // Collection methods
  async getUserCollections(userId: number, isWishlist?: boolean): Promise<Collection[]> {
    const conditions = [eq(collections.userId, userId)];
    if (isWishlist !== undefined) {
      conditions.push(eq(collections.isWishlist, isWishlist));
    }

    return await db.select().from(collections).where(and(...conditions)).orderBy(desc(collections.createdAt));
  }

  async addToCollection(insertCollection: InsertCollection): Promise<Collection> {
    const [collection] = await db.insert(collections).values(insertCollection).returning();
    return collection;
  }

  async removeFromCollection(userId: number, sneakerId: number): Promise<void> {
    await db.delete(collections).where(and(
      eq(collections.userId, userId),
      eq(collections.sneakerId, sneakerId)
    ));
  }

  // Review methods
  async getSneakerReviews(sneakerId: number): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.sneakerId, sneakerId)).orderBy(desc(reviews.createdAt));
  }

  async getUserReviews(userId: number): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.userId, userId)).orderBy(desc(reviews.createdAt));
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const [review] = await db.insert(reviews).values(insertReview).returning();
    return review;
  }

  async updateReview(id: number, updateData: Partial<InsertReview>): Promise<Review> {
    const [review] = await db.update(reviews).set({ ...updateData, updatedAt: new Date() }).where(eq(reviews.id, id)).returning();
    return review;
  }

  // Blog methods
  async getBlogPosts(filters?: {
    authorId?: number;
    categories?: string[];
    isPublished?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<{ posts: BlogPost[]; total: number }> {
    let query = db.select().from(blogPosts);
    let countQuery = db.select({ count: sql<number>`count(*)` }).from(blogPosts);

    const conditions = [];

    if (filters?.authorId) {
      conditions.push(eq(blogPosts.authorId, filters.authorId));
    }

    if (filters?.isPublished !== undefined) {
      conditions.push(eq(blogPosts.isPublished, filters.isPublished));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
      countQuery = countQuery.where(and(...conditions));
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.offset(filters.offset);
    }

    query = query.orderBy(desc(blogPosts.createdAt));

    const [postsResult, countResult] = await Promise.all([
      query,
      countQuery
    ]);

    return {
      posts: postsResult,
      total: countResult[0]?.count || 0
    };
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(insertPost).returning();
    return post;
  }

  async updateBlogPost(id: number, updateData: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [post] = await db.update(blogPosts).set({ ...updateData, updatedAt: new Date() }).where(eq(blogPosts.id, id)).returning();
    return post;
  }

  // Comment methods
  async getComments(postId?: number, reviewId?: number): Promise<Comment[]> {
    const conditions = [];

    if (postId) {
      conditions.push(eq(comments.postId, postId));
    }
    if (reviewId) {
      conditions.push(eq(comments.reviewId, reviewId));
    }

    if (conditions.length === 0) {
      return [];
    }

    return await db.select().from(comments).where(and(...conditions)).orderBy(desc(comments.createdAt));
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const [comment] = await db.insert(comments).values(insertComment).returning();
    return comment;
  }

  // Price history methods
  async getPriceHistory(sneakerId: number, size?: string): Promise<PriceHistory[]> {
    const conditions = [eq(priceHistory.sneakerId, sneakerId)];
    if (size) {
      conditions.push(eq(priceHistory.size, size));
    }

    return await db.select().from(priceHistory).where(and(...conditions)).orderBy(desc(priceHistory.recordedAt));
  }

  async addPriceRecord(insertPrice: InsertPriceHistory): Promise<PriceHistory> {
    const [price] = await db.insert(priceHistory).values(insertPrice).returning();
    return price;
  }

  // AI interaction methods
  async createAiInteraction(insertInteraction: InsertAiInteraction): Promise<AiInteraction> {
    const [interaction] = await db.insert(aiInteractions).values(insertInteraction).returning();
    return interaction;
  }

  async getUserAiInteractions(userId: number): Promise<AiInteraction[]> {
    return await db.select().from(aiInteractions).where(eq(aiInteractions.userId, userId)).orderBy(desc(aiInteractions.createdAt));
  }
}

export const storage = new DatabaseStorage();
