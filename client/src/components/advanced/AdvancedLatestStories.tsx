import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { BookOpen } from 'lucide-react';
import { MasonryGrid } from "@/components/ui/masonry-grid";
import PinterestBlogCard from "@/components/PinterestBlogCard";

export default function AdvancedLatestStories() {
  // Fetch blog data
  const { data: blogPosts, isLoading: blogLoading, error: blogError } = useQuery({
    queryKey: ["/api/blog"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <section 
      className="section"
      style={{ backgroundColor: '#050505', color: 'whitesmoke', minHeight: '100vh' }}
      data-testid="section-latest-stories"
    >
      <div className="w-layout-blockcontainer container w-container">
        <div style={{ minHeight: '11.11vw' }}></div>
        
        {/* Header Section */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start', 
          width: '100%',
          marginBottom: '2.2vw'
        }}>
          <h5 style={{ 
            color: 'whitesmoke',
            letterSpacing: '.14vw',
            textTransform: 'uppercase',
            marginTop: 0,
            marginBottom: 0,
            fontSize: '.89vw',
            fontWeight: 400,
            lineHeight: '1.44vw'
          }}>
            FEATURED
          </h5>
          <h2 style={{ 
            color: 'whitesmoke',
            letterSpacing: '-.07vw',
            textTransform: 'capitalize',
            marginTop: 0,
            marginBottom: 0,
            fontSize: '4.44vw',
            fontWeight: 500,
            lineHeight: '5vw'
          }}>
            Discover Culture & Trends
          </h2>
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start', 
          width: '50%',
          marginBottom: '4.4vw'
        }}>
          <p style={{ 
            color: 'whitesmoke',
            letterSpacing: '.07vw',
            marginBottom: 0,
            fontSize: '1.11vw',
            fontWeight: 300,
            lineHeight: '1.89vw',
            maxWidth: '42.22vw'
          }}>
            Explore the latest in sneaker culture with curated stories from our community and industry insights that shape the future of footwear.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div>
          {blogLoading ? (
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '2rem',
              width: '100%'
            }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ 
                  backgroundColor: '#1c1c1c', 
                  minHeight: '20vw', 
                  borderRadius: '24px',
                  padding: '2rem'
                }}>
                  <div style={{ height: '1rem', backgroundColor: '#e7e7e9', marginBottom: '1rem', opacity: 0.3 }} />
                  <div style={{ height: '0.5rem', backgroundColor: '#e7e7e9', width: '60%', opacity: 0.3 }} />
                </div>
              ))}
            </div>
          ) : (
            Array.isArray(blogPosts) && blogPosts.length > 0 ? (
              <div style={{ width: '100%' }}>
                <MasonryGrid
                  columns={{ default: 2, sm: 3, md: 4, lg: 4 }}
                  gap="2rem"
                  className="w-full"
                >
                  {blogPosts.slice(0, 8).map((post: any, index: number) => (
                    <div key={post.id}>
                      <PinterestBlogCard 
                        post={post}
                      />
                    </div>
                  ))}
                </MasonryGrid>
              </div>
            ) : (
              <div style={{ width: '100%' }}>
                <MasonryGrid
                  columns={{ default: 2, sm: 3, md: 4, lg: 4 }}
                  gap="2rem"
                  className="w-full"
                >
                  {[
                    {
                      id: 1,
                      title: 'Latest Sneaker Trends',
                      excerpt: 'Discover the hottest trends in sneaker culture and what’s driving the market.',
                      slug: 'latest-sneaker-trends',
                      featuredImage: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=1200&h=600&fit=crop',
                      author: 'SoleGrithm Editorial',
                      publishedAt: '2025-10-01',
                      readTime: 5,
                      category: 'Trends'
                    },
                    {
                      id: 2,
                      title: 'Women Move the Culture',
                      excerpt: 'Spotlight on women making waves in the sneaker world.',
                      slug: 'women-move-the-culture',
                      featuredImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&h=600&fit=crop',
                      author: 'SoleGrithm Editorial',
                      publishedAt: '2025-10-01',
                      readTime: 4,
                      category: 'Community'
                    },
                    {
                      id: 3,
                      title: 'AI & Sneakers',
                      excerpt: 'How artificial intelligence is changing sneaker design and discovery.',
                      slug: 'ai-and-sneakers',
                      featuredImage: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1200&h=600&fit=crop',
                      author: 'SoleGrithm Editorial',
                      publishedAt: '2025-10-01',
                      readTime: 6,
                      category: 'Tech'
                    },
                    {
                      id: 4,
                      title: 'Community Voices',
                      excerpt: 'Real stories from sneakerheads around the globe.',
                      slug: 'community-voices',
                      featuredImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=600&fit=crop',
                      author: 'SoleGrithm Editorial',
                      publishedAt: '2025-10-01',
                      readTime: 3,
                      category: 'Community'
                    }
                  ].map((post) => (
                    <div key={post.id}>
                      <PinterestBlogCard post={post} />
                    </div>
                  ))}
                </MasonryGrid>
              </div>
            )
          )}
        </div>

        <div style={{ minHeight: '7.8vw' }}></div>
      </div>
    </section>
  );
}