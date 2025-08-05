-- Performance optimization indexes for SoleGrithm database
-- Run these commands to improve query performance

-- Sneakers table indexes
CREATE INDEX IF NOT EXISTS idx_sneakers_brand_id ON sneakers(brand_id);
CREATE INDEX IF NOT EXISTS idx_sneakers_release_date ON sneakers(release_date DESC);
CREATE INDEX IF NOT EXISTS idx_sneakers_retail_price ON sneakers(retail_price);
CREATE INDEX IF NOT EXISTS idx_sneakers_name_search ON sneakers USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_sneakers_categories ON sneakers USING gin(categories);
CREATE INDEX IF NOT EXISTS idx_sneakers_created_at ON sneakers(created_at DESC);

-- Reviews table indexes
CREATE INDEX IF NOT EXISTS idx_reviews_sneaker_id ON reviews(sneaker_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);

-- Collections table indexes
CREATE INDEX IF NOT EXISTS idx_collections_user_id ON collections(user_id);
CREATE INDEX IF NOT EXISTS idx_collections_sneaker_id ON collections(sneaker_id);
CREATE INDEX IF NOT EXISTS idx_collections_wishlist ON collections(is_wishlist);
CREATE INDEX IF NOT EXISTS idx_collections_created_at ON collections(created_at DESC);

-- Price history table indexes
CREATE INDEX IF NOT EXISTS idx_price_history_sneaker_id ON price_history(sneaker_id);
CREATE INDEX IF NOT EXISTS idx_price_history_size ON price_history(size);
CREATE INDEX IF NOT EXISTS idx_price_history_timestamp ON price_history(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_price_history_composite ON price_history(sneaker_id, size, timestamp DESC);

-- Blog posts table indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author_id);

-- Users table indexes
CREATE INDEX IF NOT EXISTS idx_users_firebase_uid ON users(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);

-- Geographic trends table indexes
CREATE INDEX IF NOT EXISTS idx_geographic_trends_city_state ON geographic_trends(city, state);
CREATE INDEX IF NOT EXISTS idx_geographic_trends_sneaker_id ON geographic_trends(sneaker_id);
CREATE INDEX IF NOT EXISTS idx_geographic_trends_trend_score ON geographic_trends(trend_score DESC);
CREATE INDEX IF NOT EXISTS idx_geographic_trends_last_updated ON geographic_trends(last_updated DESC);

-- AI chats table indexes
CREATE INDEX IF NOT EXISTS idx_ai_chats_user_id ON ai_chats(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_chats_created_at ON ai_chats(created_at DESC);

-- Market prices table indexes
CREATE INDEX IF NOT EXISTS idx_market_prices_sneaker_id ON market_prices(sneaker_id);
CREATE INDEX IF NOT EXISTS idx_market_prices_platform ON market_prices(platform);
CREATE INDEX IF NOT EXISTS idx_market_prices_last_updated ON market_prices(last_updated DESC);
CREATE INDEX IF NOT EXISTS idx_market_prices_availability ON market_prices(availability);

-- Composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_sneakers_brand_price ON sneakers(brand_id, retail_price);
CREATE INDEX IF NOT EXISTS idx_sneakers_brand_release ON sneakers(brand_id, release_date DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_sneaker_rating ON reviews(sneaker_id, rating);

-- Full-text search indexes
CREATE INDEX IF NOT EXISTS idx_sneakers_fulltext ON sneakers USING gin(
  to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(colorway, ''))
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_fulltext ON blog_posts USING gin(
  to_tsvector('english', coalesce(title, '') || ' ' || coalesce(content, '') || ' ' || coalesce(excerpt, ''))
);