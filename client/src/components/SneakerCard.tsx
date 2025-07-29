import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { Heart, Star, TrendingUp } from 'lucide-react';
import SneakerHoverPreview from './SneakerHoverPreview';

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
    // Extended properties for hover preview
    brandName?: string;
    description?: string;
    images?: string[];
    retailPrice?: number;
    categories?: string[];
    sizes?: string[];
    materials?: string;
    colorway?: string;
    releaseDate?: string;
    sku?: string;
  };
  enableHoverPreview?: boolean;
}

export default function SneakerCard({ sneaker, enableHoverPreview = false }: SneakerCardProps) {  
  const [showPreview, setShowPreview] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!enableHoverPreview) return;
    
    clearTimeout(hoverTimeoutRef.current);
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    hoverTimeoutRef.current = setTimeout(() => {
      setShowPreview(true);
    }, 500); // 500ms delay before showing preview
  };

  const handleMouseLeave = () => {
    if (!enableHoverPreview) return;
    
    clearTimeout(hoverTimeoutRef.current);
    setShowPreview(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableHoverPreview) return;
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Prepare sneaker data for preview with fallbacks
  const previewSneaker = {
    id: sneaker.id,
    name: sneaker.name,
    slug: sneaker.slug,
    brandName: sneaker.brandName || sneaker.brand,
    description: sneaker.description || `Premium ${sneaker.brand} sneaker with authentic design and quality construction.`,
    images: sneaker.images || [sneaker.imageUrl],
    retailPrice: sneaker.retailPrice || parseFloat(sneaker.price.replace(/[^0-9.]/g, '')),
    categories: sneaker.categories || ['Lifestyle'],
    sizes: sneaker.sizes || ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    materials: sneaker.materials || 'Premium materials and construction',
    colorway: sneaker.colorway || 'Classic',
    releaseDate: sneaker.releaseDate || new Date().toISOString(),
    sku: sneaker.sku || `SKU-${sneaker.id}`
  };

  return (
    <>
      <Link href={`/sneakers/${sneaker.slug}`}>
        <Card 
          ref={cardRef}
          className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 sneaker-card"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
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
      
      {/* Hover Preview */}
      {enableHoverPreview && (
        <SneakerHoverPreview
          sneaker={previewSneaker}
          isVisible={showPreview}
          position={mousePosition}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}