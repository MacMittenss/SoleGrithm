import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Clock, User } from 'lucide-react';
import { PinterestCard } from '@/components/ui/pinterest-card';
import LazyImage from '@/components/optimized/LazyImage';
import { Badge } from '@/components/ui/badge';

interface PinterestBlogCardProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    featuredImage: string;
    author: string;
    publishedAt: string;
    readTime: number;
    category: string;
  };
  onSave?: (postId: number) => void;
  isSaved?: boolean;
  priority?: boolean;
}

export default function PinterestBlogCard({ 
  post, 
  onSave, 
  isSaved = false, 
  priority = false 
}: PinterestBlogCardProps) {
  
  const handleSave = () => {
    onSave?.(post.id);
  };

  return (
    <Link href={`/blog/${post.slug}`}>
      <PinterestCard
        className="group cursor-pointer h-fit"
        onSave={handleSave}
        isSaved={isSaved}
        priority={priority}
        aspectRatio="portrait"
      >
        <div className="relative overflow-hidden">
          {/* Featured image */}
          <LazyImage
            src={post.featuredImage || "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"}
            alt={post.title}
            className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
            fallbackSrc="https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
            priority={priority}
          />
          
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="text-xs bg-white/90 text-gray-800">
              {post.category}
            </Badge>
          </div>
          
          {/* Text overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          >
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs opacity-90 line-clamp-2 mb-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs opacity-75">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime} min</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Minimal text content - only title visible by default */}
        <div className="p-3">
          <h3 className="text-sm font-medium text-foreground line-clamp-3 leading-tight">
            {post.title}
          </h3>
        </div>
      </PinterestCard>
    </Link>
  );
}