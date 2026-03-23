import { db } from "../server/db";
import { blogPosts } from "../shared/schema";

async function listBlogPosts() {
  try {
    const posts = await db.select().from(blogPosts);
    console.log(`\nFound ${posts.length} blog posts:\n`);
    
    if (posts.length === 0) {
      console.log("No blog posts in database yet.");
    } else {
      posts.forEach(post => {
        console.log(`ID: ${post.id}`);
        console.log(`Title: ${post.title}`);
        console.log(`Slug: ${post.slug}`);
        console.log(`Category: ${post.category || 'N/A'}`);
        console.log(`Published: ${post.published}`);
        console.log(`Created: ${post.createdAt}`);
        console.log('---');
      });
    }
  } catch (error) {
    console.error("Error listing blog posts:", error);
  } finally {
    process.exit(0);
  }
}

listBlogPosts();
