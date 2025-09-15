import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { MasonryGrid } from "@/components/ui/masonry-grid";
import PinterestBlogCard from "@/components/PinterestBlogCard";
import { BookOpen } from "lucide-react";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: async () => {
      const response = await fetch('/api/blog');
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json();
    }
  });

  // Filter posts by category
  const filteredPosts = selectedCategory
    ? blogPosts?.filter((post: any) => post.category === selectedCategory)
    : blogPosts;


  // Get unique categories
  const categories: string[] = blogPosts
    ? Array.from(new Set(blogPosts.map((post: any) => post.category).filter(Boolean)))
    : [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="w-layout-blockcontainer container w-container">
        <div style={{ paddingTop: '8rem' }}></div>
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h5 className="text-white/60 uppercase tracking-wider text-sm font-light mb-4">
            FEATURED STORIES
          </h5>
          <h1 className="font-c text-white text-6xl md:text-8xl font-bold mb-6">
            SoleGrithm Stories
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-12">
            Where AI meets sole culture. Discover the latest trends and insights.
          </p>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="flex justify-center gap-3">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null 
                  ? 'bg-white text-black hover:bg-white/90' 
                  : 'bg-transparent border-white/30 text-white hover:bg-white/10'
                }
              >
                All Stories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? 'bg-white text-black hover:bg-white/90' 
                    : 'bg-transparent border-white/30 text-white hover:bg-white/10'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          )}
        </div>


        {/* Pinterest-style Blog Grid */}
        <div>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white/5 rounded-lg aspect-[3/4] mb-3" />
                  <div className="h-3 bg-white/5 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
              <MasonryGrid
                columns={{ default: 2, sm: 3, md: 4, lg: 4 }}
                gap="1.5rem"
                className="w-full"
              >
                {filteredPosts.map((post: any) => (
                  <PinterestBlogCard 
                    key={post.id}
                    post={{
                      ...post,
                      author: 'SoleGrithm Editorial',
                      readTime: 5
                    }}
                  />
                ))}
              </MasonryGrid>
            ) : (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/60 text-lg">No stories available yet</p>
              </div>
            )
          )}
        </div>

        
        <div style={{ paddingBottom: '8rem' }}></div>
      </div>
    </div>
  );
}
