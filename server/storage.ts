import { users, brands, sneakers, collections, reviews, priceHistory, blogPosts, aiChats } from "@shared/schema";
import type { 
  User, InsertUser, Brand, InsertBrand, Sneaker, InsertSneaker,
  Collection, InsertCollection, Review, InsertReview, 
  PriceHistory, InsertPriceHistory, BlogPost, InsertBlogPost,
  AiChat, InsertAiChat
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, like, ilike, sql } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User>;

  // Brands
  getBrand(id: number): Promise<Brand | undefined>;
  getBrandBySlug(slug: string): Promise<Brand | undefined>;
  getAllBrands(): Promise<Brand[]>;
  createBrand(brand: InsertBrand): Promise<Brand>;

  // Sneakers
  getSneaker(id: number): Promise<Sneaker | undefined>;
  getSneakerBySlug(slug: string): Promise<Sneaker | undefined>;
  searchSneakers(query: string, filters?: any): Promise<Sneaker[]>;
  getFeaturedSneakers(): Promise<Sneaker[]>;
  createSneaker(sneaker: InsertSneaker): Promise<Sneaker>;
  updateSneaker(id: number, sneaker: Partial<InsertSneaker>): Promise<Sneaker>;

  // Collections
  getUserCollections(userId: number): Promise<Collection[]>;
  getUserWishlist(userId: number): Promise<Collection[]>;
  addToCollection(collection: InsertCollection): Promise<Collection>;
  removeFromCollection(id: number): Promise<void>;

  // Reviews
  getSneakerReviews(sneakerId: number): Promise<Review[]>;
  getUserReviews(userId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  updateReview(id: number, review: Partial<InsertReview>): Promise<Review>;

  // Price History
  getSneakerPrices(sneakerId: number, size?: string): Promise<PriceHistory[]>;
  addPriceRecord(priceRecord: InsertPriceHistory): Promise<PriceHistory>;

  // Blog Posts
  getBlogPosts(published?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;

  // AI Chats
  getUserChats(userId: number): Promise<AiChat[]>;
  createChat(chat: InsertAiChat): Promise<AiChat>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.firebaseUid, firebaseUid));
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
    const [user] = await db
      .update(users)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Brands
  async getBrand(id: number): Promise<Brand | undefined> {
    const [brand] = await db.select().from(brands).where(eq(brands.id, id));
    return brand || undefined;
  }

  async getBrandBySlug(slug: string): Promise<Brand | undefined> {
    const [brand] = await db.select().from(brands).where(eq(brands.slug, slug));
    return brand || undefined;
  }

  async getAllBrands(): Promise<Brand[]> {
    return await db.select().from(brands).orderBy(brands.name);
  }

  async createBrand(insertBrand: InsertBrand): Promise<Brand> {
    const [brand] = await db.insert(brands).values(insertBrand).returning();
    return brand;
  }

  // Sneakers
  async getSneaker(id: number): Promise<Sneaker | undefined> {
    const [sneaker] = await db.select().from(sneakers).where(eq(sneakers.id, id));
    return sneaker || undefined;
  }

  async getSneakerBySlug(slug: string): Promise<Sneaker | undefined> {
    const [sneaker] = await db.select().from(sneakers).where(eq(sneakers.slug, slug));
    return sneaker || undefined;
  }

  async searchSneakers(query: string, filters?: any): Promise<Sneaker[]> {
    let queryBuilder = db.select().from(sneakers);

    if (query) {
      queryBuilder = queryBuilder.where(ilike(sneakers.name, `%${query}%`));
    }

    if (filters?.brandId) {
      queryBuilder = queryBuilder.where(eq(sneakers.brandId, parseInt(filters.brandId)));
    }

    return await queryBuilder.orderBy(sneakers.name);
  }

  async getFeaturedSneakers(): Promise<Sneaker[]> {
    return await db
      .select()
      .from(sneakers)
      .orderBy(desc(sneakers.createdAt))
      .limit(8);
  }

  async createSneaker(insertSneaker: InsertSneaker): Promise<Sneaker> {
    const [sneaker] = await db.insert(sneakers).values(insertSneaker).returning();
    return sneaker;
  }

  async updateSneaker(id: number, updateData: Partial<InsertSneaker>): Promise<Sneaker> {
    const [sneaker] = await db
      .update(sneakers)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(sneakers.id, id))
      .returning();
    return sneaker;
  }

  // Collections
  async getUserCollections(userId: number): Promise<Collection[]> {
    return await db
      .select()
      .from(collections)
      .where(eq(collections.userId, userId))
      .orderBy(desc(collections.createdAt));
  }

  async getUserWishlist(userId: number): Promise<Collection[]> {
    return await db
      .select()
      .from(collections)
      .where(and(eq(collections.userId, userId), eq(collections.isWishlist, true)))
      .orderBy(desc(collections.createdAt));
  }

  async addToCollection(insertCollection: InsertCollection): Promise<Collection> {
    const [collection] = await db.insert(collections).values(insertCollection).returning();
    return collection;
  }

  async removeFromCollection(id: number): Promise<void> {
    await db.delete(collections).where(eq(collections.id, id));
  }

  // Reviews
  async getSneakerReviews(sneakerId: number): Promise<Review[]> {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.sneakerId, sneakerId))
      .orderBy(desc(reviews.createdAt));
  }

  async getUserReviews(userId: number): Promise<Review[]> {
    return await db
      .select()
      .from(reviews)
      .where(eq(reviews.userId, userId))
      .orderBy(desc(reviews.createdAt));
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const [review] = await db.insert(reviews).values(insertReview).returning();
    return review;
  }

  async updateReview(id: number, updateData: Partial<InsertReview>): Promise<Review> {
    const [review] = await db
      .update(reviews)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(reviews.id, id))
      .returning();
    return review;
  }

  // Price History
  async getSneakerPrices(sneakerId: number, size?: string): Promise<PriceHistory[]> {
    let queryBuilder = db
      .select()
      .from(priceHistory)
      .where(eq(priceHistory.sneakerId, sneakerId));

    if (size) {
      queryBuilder = queryBuilder.where(eq(priceHistory.size, size));
    }

    return await queryBuilder.orderBy(desc(priceHistory.timestamp));
  }

  async addPriceRecord(insertPriceRecord: InsertPriceHistory): Promise<PriceHistory> {
    const [record] = await db.insert(priceHistory).values(insertPriceRecord).returning();
    return record;
  }

  // Blog Posts
  async getBlogPosts(published = true): Promise<BlogPost[]> {
    let queryBuilder = db.select().from(blogPosts);
    
    if (published) {
      queryBuilder = queryBuilder.where(eq(blogPosts.published, true));
    }

    return await queryBuilder.orderBy(desc(blogPosts.createdAt));
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
    const [post] = await db
      .update(blogPosts)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return post;
  }

  // AI Chats
  async getUserChats(userId: number): Promise<AiChat[]> {
    return await db
      .select()
      .from(aiChats)
      .where(eq(aiChats.userId, userId))
      .orderBy(desc(aiChats.createdAt))
      .limit(50);
  }

  async createChat(insertChat: InsertAiChat): Promise<AiChat> {
    const [chat] = await db.insert(aiChats).values(insertChat).returning();
    return chat;
  }
}

export const storage = new DatabaseStorage();
