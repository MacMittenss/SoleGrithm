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
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <BookOpen style={{ width: '4rem', height: '4rem', color: '#e7e7e9', margin: '0 auto 1rem' }} />
                <p style={{ color: '#e7e7e9', fontSize: '1.11vw' }}>No stories available yet</p>
              </div>
            )
          )}
        </div>

        <div style={{ minHeight: '7.8vw' }}></div>
      </div>
    </section>
  );
}