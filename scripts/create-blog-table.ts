import { sql } from "drizzle-orm";
import { db } from "../server/db";

async function createBlogPostsTable() {
  try {
    console.log('Dropping existing blog_posts table if it exists...');
    await db.execute(sql`DROP TABLE IF EXISTS blog_posts`);
    
    console.log('Creating blog_posts table...');
    
    await db.execute(sql`
      CREATE TABLE blog_posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        excerpt TEXT,
        content TEXT NOT NULL,
        author_id INTEGER,
        featured_image TEXT,
        category TEXT,
        tags TEXT[],
        is_published BOOLEAN DEFAULT false,
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    console.log('✓ blog_posts table created successfully!');
  } catch (error) {
    console.error('Error creating blog_posts table:', error);
  } finally {
    process.exit(0);
  }
}

createBlogPostsTable();
