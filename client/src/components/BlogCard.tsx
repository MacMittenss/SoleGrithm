import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Eye, Clock } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  categories?: string[];
  tags?: string[];
  author?: {
    id: number;
    displayName: string;
    avatar?: string;
  };
  viewCount?: number;
  createdAt: string;
  updatedAt: string;
}

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const imageUrl = post.featuredImage || "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
  
  const readingTime = Math.ceil(post.content.length / 1000); // Rough estimate
  const publishDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  if (featured) {
    return (
      <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl lg:col-span-2">
        <Link href={`/blog/${post.slug}`}>
          <div className="relative">
            <div className="aspect-[2/1] overflow-hidden">
              <img
                src={imageUrl}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              {post.categories && post.categories.length > 0 && (
                <Badge className="mb-3 bg-primary">
                  {post.categories[0]}
                </Badge>
              )}
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight group-hover:text-primary-foreground">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-white/90 text-base mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
              )}
              <div className="flex items-center space-x-4 text-sm text-white/80">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{post.author?.displayName || 'SoleGrithm Team'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{publishDate}</span>
                </div>
                {post.viewCount && (
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{post.viewCount.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          {post.categories && post.categories.length > 0 && (
            <div className="absolute top-4 left-4">
              <Badge variant="secondary">
                {post.categories[0]}
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Title */}
          <h3 className="text-lg font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{post.author?.displayName || 'SoleGrithm Team'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{publishDate}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{readingTime} min read</span>
              </div>
              {post.viewCount && (
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{post.viewCount.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}
