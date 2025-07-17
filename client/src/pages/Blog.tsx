import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const categories = [
  "All",
  "Release News",
  "Reviews", 
  "Culture",
  "History",
  "Style Guide",
  "Market Analysis"
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/blog', { page, category: selectedCategory, search: searchTerm }],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '12');
      
      if (selectedCategory !== "All") {
        params.append('categories', selectedCategory);
      }
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await fetch(`/api/blog?${params}`);
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json();
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const totalPages = data ? Math.ceil(data.total / 12) : 0;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Sneaker Stories
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the latest news, reviews, and deep dives into sneaker culture
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {data && (
          <div className="mb-6">
            <p className="text-muted-foreground">
              {data.total} article{data.total !== 1 ? 's' : ''} found
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">Failed to load blog posts. Please try again.</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="bg-muted rounded-2xl h-48"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-6 bg-muted rounded w-full"></div>
                  <div className="h-16 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Blog Posts Grid */}
        {data?.posts && data.posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {data.posts.map((post: any) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={page === pageNum ? "default" : "outline"}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                
                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {data?.posts && data.posts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No articles found matching your criteria
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setPage(1);
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Featured Categories */}
        <div className="mt-16 pt-16 border-t">
          <h2 className="text-2xl font-bold mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.filter(cat => cat !== "All").map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className="p-4 rounded-lg border-2 border-muted hover:border-primary transition-colors text-center group"
              >
                <div className="font-semibold group-hover:text-primary transition-colors">
                  {category}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
