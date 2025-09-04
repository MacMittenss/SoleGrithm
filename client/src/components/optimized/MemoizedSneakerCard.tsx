import React, { memo } from 'react';
import SneakerCard from '../SneakerCard';

interface MemoizedSneakerCardProps {
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

const MemoizedSneakerCard = memo(function MemoizedSneakerCard({
  sneaker,
  enableHoverPreview = false
}: MemoizedSneakerCardProps) {
  return (
    <SneakerCard 
      sneaker={sneaker} 
      enableHoverPreview={enableHoverPreview} 
    />
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for better performance
  return (
    prevProps.sneaker.id === nextProps.sneaker.id &&
    prevProps.sneaker.name === nextProps.sneaker.name &&
    prevProps.sneaker.price === nextProps.sneaker.price &&
    prevProps.sneaker.imageUrl === nextProps.sneaker.imageUrl &&
    prevProps.enableHoverPreview === nextProps.enableHoverPreview
  );
});

export default MemoizedSneakerCard;