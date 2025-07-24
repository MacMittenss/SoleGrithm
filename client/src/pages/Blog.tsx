import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, Filter } from "lucide-react";
import { format } from "date-fns";

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
  const categories = blogPosts
    ? Array.from(new Set(blogPosts.map((post: any) => post.category).filter(Boolean)))
    : [];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6" style={{fontFamily: 'Staatliches, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', letterSpacing: '1px'}}>
            SOLEGRITHM STORIES
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Where AI meets sole culture. Explore expert insights, community stories, and algorithmic trends in sneaker culture.
          </p>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All Stories
              </Button>
              {categories.map((category: string) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Featured Post */}
        {!isLoading && filteredPosts?.[0] && (
          <div className="mb-16">
            <Link href={`/blog/${filteredPosts[0].slug}`}>
              <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="lg:flex">
                  <div className="lg:w-1/2">
                    <div className="relative overflow-hidden h-64 lg:h-full">
                      <img
                        src={filteredPosts[0].featuredImage || "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-jordan-1-retro-high-og-shoes-Pph9tm.png"}
                        alt={filteredPosts[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                    </div>
                  </div>
                  <div className="lg:w-1/2 p-8 lg:p-12">
                    <div className="flex gap-2 mb-4">
                      <Badge>Featured</Badge>
                      {filteredPosts[0].category && (
                        <Badge variant="secondary">{filteredPosts[0].category}</Badge>
                      )}
                    </div>
                    <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
                      {filteredPosts[0].excerpt || "Exploring the latest AI-driven trends and stories in sneaker culture..."}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(filteredPosts[0].publishedAt), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>SoleGrithm Editorial</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>5 min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        )}

        {/* Blog Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-2xl h-48 mb-4" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts?.slice(1, 6).map((post: any) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.featuredImage || "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-jordan-1-retro-high-og-shoes-Pph9tm.png"}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.category && (
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt || "Exploring the latest AI-driven trends and stories in sneaker culture..."}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{format(new Date(post.publishedAt), 'MMM dd')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>5 min read</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* View All Stories */}
        {!isLoading && filteredPosts && filteredPosts.length > 6 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Stories ({filteredPosts.length - 6} more)
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && (!filteredPosts || filteredPosts.length === 0) && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No stories yet</h3>
                <p className="text-muted-foreground mb-4">
                  Check back soon for the latest AI-powered sneaker insights and culture stories
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
