import React, { useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { BookOpen } from 'lucide-react';
import { MasonryGrid } from "@/components/ui/masonry-grid";
import PinterestBlogCard from "@/components/PinterestBlogCard";

export default function AdvancedLatestStories() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch blog data
  const { data: blogPosts, isLoading: blogLoading, error: blogError } = useQuery({
    queryKey: ["/api/blog"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Template-style fade-in animations using Intersection Observer
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe elements for fade-in animations
    const titleElement = sectionRef.current.querySelector('.fade-in-title');
    const subtitleElement = sectionRef.current.querySelector('.fade-in-subtitle');
    const gridElement = sectionRef.current.querySelector('.fade-in-grid');

    if (titleElement) observer.observe(titleElement);
    if (subtitleElement) observer.observe(subtitleElement);
    if (gridElement) observer.observe(gridElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section"
      style={{ backgroundColor: 'var(--black)' }}
      data-testid="section-latest-stories"
    >
      <div className="w-layout-blockcontainer container w-container">
        <div className="space-page-top"></div>
        
        {/* Header Section with template styling */}
        <div className="utilities-title fade-in-title">
          <h5 style={{ color: 'var(--white)' }}>FEATURED</h5>
          <h2 
            className="fade-in-title"
            style={{ 
              color: 'var(--white)',
              letterSpacing: '-.07vw',
              textTransform: 'capitalize',
              marginTop: 0,
              marginBottom: 0,
              fontSize: '4.44vw',
              fontWeight: 500,
              lineHeight: '5vw'
            }}
          >
            Discover Culture & Trends
          </h2>
        </div>

        <div className="space-2rem"></div>

        <div className="utilities-wrapper-paragraph fade-in-subtitle">
          <p 
            style={{ 
              color: 'var(--white)',
              letterSpacing: '.07vw',
              marginBottom: 0,
              fontSize: '1.11vw',
              fontWeight: 300,
              lineHeight: '1.89vw',
              maxWidth: '42.22vw'
            }}
          >
            Explore the latest in sneaker culture with curated stories from our community and industry insights that shape the future of footwear.
          </p>
        </div>

        <div className="space-4rem"></div>

        {/* Blog Posts Grid with template styling */}
        <div className="fade-in-grid">
          {blogLoading ? (
            <div className="utilities-grid-thirds">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="background-secondary" style={{ minHeight: '20vw', borderRadius: 'var(--border-radius)' }}>
                  <div style={{ padding: '2rem' }}>
                    <div style={{ height: '1rem', backgroundColor: 'var(--light-gray)', marginBottom: '1rem', opacity: 0.3 }} />
                    <div style={{ height: '0.5rem', backgroundColor: 'var(--light-gray)', width: '60%', opacity: 0.3 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            Array.isArray(blogPosts) && blogPosts.length > 0 ? (
              <div className="utilities-wrapper" style={{ width: '100%' }}>
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
              <div className="utilities-wrapper" style={{ textAlign: 'center', padding: '4rem 0' }}>
                <BookOpen style={{ width: '4rem', height: '4rem', color: 'var(--light-gray)', margin: '0 auto 1rem' }} />
                <p style={{ color: 'var(--light-gray)', fontSize: '1.11vw' }}>No stories available yet</p>
              </div>
            )
          )}
        </div>

        <div className="space-7rem"></div>
      </div>
    </section>
  );
}