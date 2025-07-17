import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { Heart, Star, TrendingUp } from 'lucide-react';

interface SneakerCardProps {
  sneaker: {
    id: number;
    name: string;
    brand: string;
    price: string;
    imageUrl: string;
    slug: string;
    isNew?: boolean;
    rating?: number;
    reviewCount?: number;
  };
}

export default function SneakerCard({ sneaker }: SneakerCardProps) {
  return (
    <Link href={`/sneakers/${sneaker.slug}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 sneaker-card">
        <div className="relative overflow-hidden">
          <img
            src={sneaker.imageUrl || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"}
            alt={sneaker.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {sneaker.isNew && (
              <Badge variant="destructive" className="bg-red-500 text-white">
                New
              </Badge>
            )}
            <Badge variant="secondary" className="bg-white/90 text-gray-800">
              {sneaker.brand}
            </Badge>
          </div>
          
          {/* Favorite Button */}
          <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/20">
            <Heart className="w-4 h-4 text-white" />
          </button>
          
          {/* Price Badge */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-sm font-semibold text-gray-800">{sneaker.price}</span>
            </div>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {sneaker.name}
            </h3>
            
            {sneaker.rating && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{sneaker.rating}</span>
                <span>({sneaker.reviewCount || 0} reviews)</span>
              </div>
            )}
            
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-muted-foreground">Starting at</span>
              <span className="text-lg font-bold text-primary">{sneaker.price}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}