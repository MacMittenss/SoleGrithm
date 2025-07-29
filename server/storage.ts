import { users, brands, sneakers, collections, reviews, priceHistory, blogPosts, aiChats, geographicTrends } from "@shared/schema";
import type { 
  User, InsertUser, Brand, InsertBrand, Sneaker, InsertSneaker, SneakerWithBrand,
  Collection, InsertCollection, Review, InsertReview, 
  PriceHistory, InsertPriceHistory, BlogPost, InsertBlogPost,
  AiChat, InsertAiChat, GeographicTrend, InsertGeographicTrend
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
  getSneakerBySlug(slug: string): Promise<SneakerWithBrand | undefined>;
  searchSneakers(query: string, filters?: any): Promise<SneakerWithBrand[]>;
  getFeaturedSneakers(): Promise<SneakerWithBrand[]>;
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

  // Geographic Trends
  getGeographicTrends(): Promise<GeographicTrend[]>;
  getGeographicTrendsByRegion(city: string, state: string): Promise<GeographicTrend[]>;
  createGeographicTrend(data: InsertGeographicTrend): Promise<GeographicTrend>;
  updateTrendScore(id: number, trendScore: number): Promise<void>;
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
    const [brand] = await db.select().from(brands).where(eq(brands.name, slug));
    return brand || undefined;
  }

  async getAllBrands(): Promise<Brand[]> {
    const result = await db.select().from(brands).orderBy(brands.name);
    return result;
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

  async getSneakerBySlug(slug: string): Promise<SneakerWithBrand | undefined> {
    const [sneaker] = await db
      .select({
        id: sneakers.id,
        name: sneakers.name,
        slug: sneakers.slug,
        sku: sneakers.sku,
        brandId: sneakers.brandId,
        description: sneakers.description,
        images: sneakers.images,
        retailPrice: sneakers.retailPrice,
        releaseDate: sneakers.releaseDate,
        categories: sneakers.categories,
        sizes: sneakers.sizes,
        materials: sneakers.materials,
        colorway: sneakers.colorway,
        createdAt: sneakers.createdAt,
        updatedAt: sneakers.updatedAt,
        brandName: brands.name
      })
      .from(sneakers)
      .leftJoin(brands, eq(sneakers.brandId, brands.id))
      .where(eq(sneakers.slug, slug));
    return sneaker || undefined;
  }

  async searchSneakers(query: string, filters?: any): Promise<SneakerWithBrand[]> {
    let queryBuilder = db
      .select({
        id: sneakers.id,
        name: sneakers.name,
        slug: sneakers.slug,
        sku: sneakers.sku,
        brandId: sneakers.brandId,
        description: sneakers.description,
        images: sneakers.images,
        retailPrice: sneakers.retailPrice,
        releaseDate: sneakers.releaseDate,
        categories: sneakers.categories,
        sizes: sneakers.sizes,
        materials: sneakers.materials,
        colorway: sneakers.colorway,
        createdAt: sneakers.createdAt,
        updatedAt: sneakers.updatedAt,
        brandName: brands.name
      })
      .from(sneakers)
      .leftJoin(brands, eq(sneakers.brandId, brands.id));

    const conditions = [];

    if (query) {
      conditions.push(ilike(sneakers.name, `%${query}%`));
    }

    if (filters?.brandId) {
      conditions.push(eq(sneakers.brandId, filters.brandId));
    }

    if (filters?.category) {
      conditions.push(sql`${sneakers.categories} @> ${JSON.stringify([filters.category])}`);
    }

    if (conditions.length > 0) {
      queryBuilder = queryBuilder.where(and(...conditions));
    }

    // Apply sorting
    switch (filters?.sort) {
      case 'oldest':
        queryBuilder = queryBuilder.orderBy(sneakers.releaseDate);
        break;
      case 'price-low':
        queryBuilder = queryBuilder.orderBy(sneakers.retailPrice);
        break;
      case 'price-high':
        queryBuilder = queryBuilder.orderBy(desc(sneakers.retailPrice));
        break;
      case 'name':
        queryBuilder = queryBuilder.orderBy(sneakers.name);
        break;
      case 'newest':
      default:
        queryBuilder = queryBuilder.orderBy(desc(sneakers.releaseDate));
        break;
    }

    return await queryBuilder;
  }

  async getFeaturedSneakers(): Promise<SneakerWithBrand[]> {
    return await db
      .select({
        id: sneakers.id,
        name: sneakers.name,
        slug: sneakers.slug,
        sku: sneakers.sku,
        brandId: sneakers.brandId,
        description: sneakers.description,
        images: sneakers.images,
        retailPrice: sneakers.retailPrice,
        releaseDate: sneakers.releaseDate,
        categories: sneakers.categories,
        sizes: sneakers.sizes,
        materials: sneakers.materials,
        colorway: sneakers.colorway,
        createdAt: sneakers.createdAt,
        updatedAt: sneakers.updatedAt,
        brandName: brands.name
      })
      .from(sneakers)
      .leftJoin(brands, eq(sneakers.brandId, brands.id))
      .orderBy(desc(sneakers.releaseDate))
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

  // Reviews
  async getSneakerReviews(sneakerId: number): Promise<Review[]> {
    return await db
      .select({
        id: reviews.id,
        userId: reviews.userId,
        sneakerId: reviews.sneakerId,
        rating: reviews.rating,
        title: reviews.title,
        content: reviews.content,
        createdAt: reviews.createdAt,
        updatedAt: reviews.updatedAt,
        user: {
          displayName: users.displayName,
          avatar: users.avatar
        }
      })
      .from(reviews)
      .leftJoin(users, eq(reviews.userId, users.id))
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

  // Geographic Trends
  async getGeographicTrends(): Promise<GeographicTrend[]> {
    return await db
      .select()
      .from(geographicTrends)
      .orderBy(desc(geographicTrends.trendScore));
  }

  async getGeographicTrendsByRegion(city: string, state: string): Promise<GeographicTrend[]> {
    return await db
      .select()
      .from(geographicTrends)
      .where(and(eq(geographicTrends.city, city), eq(geographicTrends.state, state)))
      .orderBy(desc(geographicTrends.trendScore));
  }

  async createGeographicTrend(insertTrend: InsertGeographicTrend): Promise<GeographicTrend> {
    const [trend] = await db.insert(geographicTrends).values(insertTrend).returning();
    return trend;
  }

  async updateTrendScore(id: number, trendScore: number): Promise<void> {
    await db
      .update(geographicTrends)
      .set({ trendScore, lastUpdated: new Date() })
      .where(eq(geographicTrends.id, id));
  }
}

export const storage = new DatabaseStorage();
