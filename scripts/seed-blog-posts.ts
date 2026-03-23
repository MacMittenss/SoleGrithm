import { db } from "../server/db";
import { blogPosts } from "../shared/schema";

const sampleBlogPosts = [
  {
    title: 'Latest Sneaker Trends',
    slug: 'latest-sneaker-trends',
    excerpt: 'Discover the hottest trends in sneaker culture and what is driving the market.',
    content: 'The sneaker industry continues to evolve at a rapid pace, with new trends emerging that reshape how we think about footwear. From sustainable materials to AI-driven design, the future of sneakers is here. Major brands are now prioritizing eco-friendly materials, with recycled plastics, organic cotton, and plant-based alternatives becoming standard in new releases.',
    featuredImage: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=1200&h=600&fit=crop',
    author: 'SoleGrithm Editorial',
    category: 'Trends',
    published: true,
    tags: ['trends', 'innovation', 'sustainability']
  },
  {
    title: 'Women Move the Culture',
    slug: 'women-move-the-culture',
    excerpt: 'Spotlight on women making waves in the sneaker world.',
    content: 'Women have always been at the forefront of sneaker culture, yet their contributions often go underrecognized. Today, that is changing as more women take center stage in design, retail, and community building. Female designers are bringing fresh perspectives to major sneaker brands, creating silhouettes that resonate with diverse audiences.',
    featuredImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&h=600&fit=crop',
    author: 'SoleGrithm Editorial',
    category: 'Community',
    published: true,
    tags: ['community', 'culture', 'representation']
  },
  {
    title: 'AI & Sneakers',
    slug: 'ai-and-sneakers',
    excerpt: 'How artificial intelligence is changing sneaker design and discovery.',
    content: 'Artificial intelligence is revolutionizing every aspect of the sneaker industry, from how shoes are designed to how consumers discover their perfect pair. Machine learning algorithms are now capable of generating unique sneaker designs by analyzing thousands of existing models, color combinations, and consumer preferences. Our platform leverages cutting-edge AI to provide personalized sneaker recommendations, market insights, and trend predictions.',
    featuredImage: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1200&h=600&fit=crop',
    author: 'SoleGrithm Editorial',
    category: 'Tech',
    published: true,
    tags: ['AI', 'technology', 'innovation', 'future']
  },
  {
    title: 'Community Voices',
    slug: 'community-voices',
    excerpt: 'Real stories from sneakerheads around the globe.',
    content: 'The sneaker community is built on shared passion, unique stories, and connections that transcend geography. From Tokyo to New York, London to Sao Paulo, sneakerheads around the world share their experiences. What unites these voices is the universal language of sneaker culture—a community that celebrates diversity, creativity, and the stories behind every pair.',
    featuredImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=600&fit=crop',
    author: 'SoleGrithm Editorial',
    category: 'Community',
    published: true,
    tags: ['community', 'global', 'culture', 'stories']
  }
];

async function seedBlogPosts() {
  try {
    console.log('Checking existing blog posts...');
    const existing = await db.select().from(blogPosts);
    
    if (existing.length > 0) {
      console.log(`Found ${existing.length} existing blog posts. Skipping seed.`);
      console.log('To re-seed, please delete existing posts first.');
      return;
    }

    console.log('Seeding blog posts...');
    
    for (const post of sampleBlogPosts) {
      const [inserted] = await db.insert(blogPosts).values(post).returning();
      console.log(`✓ Created: ${inserted.title} (ID: ${inserted.id})`);
    }
    
    console.log(`\n✓ Successfully seeded ${sampleBlogPosts.length} blog posts!`);
  } catch (error) {
    console.error('Error seeding blog posts:', error);
  } finally {
    process.exit(0);
  }
}

seedBlogPosts();
