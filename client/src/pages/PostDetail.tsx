import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowLeft, Share2, Heart } from "lucide-react";
import { format } from "date-fns";

export default function PostDetail() {
  const params = useParams();
  const slug = params.slug;

  const { data: post, isLoading } = useQuery({
    queryKey: ['/api/blog', slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch blog post');
      return response.json();
    },
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8" />
            <div className="h-12 bg-muted rounded w-3/4 mb-4" />
            <div className="h-4 bg-muted rounded w-1/2 mb-8" />
            <div className="h-64 bg-muted rounded mb-8" />
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Stories
          </Button>
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.category && (
              <Badge variant="secondary">
                {post.category}
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>SoleGrithm Editorial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(post.publishedAt), 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>5 min read</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative overflow-hidden rounded-2xl mb-8">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <Card>
          <CardContent className="p-8 sm:p-12">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {post.content.split('\n\n').map((paragraph: string, index: number) => {
                if (paragraph.trim() === '') return null;
                
                // Format bold text and other markdown-like formatting
                const formattedParagraph = paragraph
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>');
                
                return (
                  <p 
                    key={index} 
                    className="mb-6 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formattedParagraph }}
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">More Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Placeholder for related articles */}
            <Card className="group cursor-pointer transition-all hover:shadow-lg">
              <div className="relative overflow-hidden">
                <img
                  src="https://cms-cdn.flightclub.com/3000/8b0f7895ebbf-b709-0f11-6485-004b0029.jpg?w=800"
                  alt="Related article"
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">The Future of Sneaker Authentication</h3>
                <p className="text-sm text-muted-foreground">How blockchain and AI are revolutionizing sneaker verification...</p>
              </CardContent>
            </Card>
            
            <Card className="group cursor-pointer transition-all hover:shadow-lg">
              <div className="relative overflow-hidden">
                <img
                  src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-ac9f65b6-a2e8-4cdb-953e-e0e5e8e2f5e5/react-infinity-run-flyknit-4-road-running-shoes.png"
                  alt="Related article"
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Sustainable Sneakers: The Green Revolution</h3>
                <p className="text-sm text-muted-foreground">How major brands are embracing eco-friendly materials...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}