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
    <div
      className="latest-stories relative py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 1), rgba(20, 20, 30, 1))', // Fully opaque background
        minHeight: '100vh', // Ensure full viewport coverage
      }}
      data-testid="section-latest-stories"
    >
      {/* Background gradient effects - Same as trending section */}
      <div className="absolute top-16 bottom-0 left-0 right-0 overflow-hidden">
        {/* Purple/Pink/Blue gradient orbs like trending section */}
        <div 
          className="absolute top-32 left-1/4 w-80 h-80 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(to right, #8B5CF6 0%, #EC4899 61%, #06B6D4 100%)',
            filter: 'blur(100px)',
          }}
        />
        <div 
          className="absolute bottom-20 right-1/4 w-60 h-60 rounded-full opacity-15"
          style={{
            background: 'linear-gradient(to right, #06B6D4 0%, #8B5CF6 61%, #EC4899 100%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Static geometric shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full border border-blue-500/20" />
      <div className="absolute bottom-20 right-20 w-24 h-24 rotate-45 border border-pink-500/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 
            className="font-bold leading-tight mb-6 text-white"
            style={{ 
              fontFamily: '"seasonSans", "seasonSans Fallback", "Manrope", "Inter", sans-serif',
              fontSize: 'calc(4rem * 1.4)', // 1.4 times bigger
            }}
          >
            Discover Culture & Trends
          </h2>
          
          <p
            className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto"
            style={{}}
          >
            Explore the latest in sneaker culture with curated stories from our community
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div>
          {blogLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white/10 rounded-lg aspect-[3/4] mb-3" />
                  <div className="space-y-2">
                    <div className="h-3 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            Array.isArray(blogPosts) && blogPosts.length > 0 ? (
              <MasonryGrid
                columns={{ default: 2, sm: 3, md: 4, lg: 4 }}
                gap="1rem"
                className="max-w-6xl mx-auto"
              >
                {blogPosts.slice(0, 8).map((post: any, index: number) => (
                  <div key={post.id}>
                    <PinterestBlogCard 
                      post={post}
                    />
                  </div>
                ))}
              </MasonryGrid>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No stories available yet</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}