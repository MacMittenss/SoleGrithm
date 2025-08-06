import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Filter, Heart, ShoppingBag, Star, Sparkles } from 'lucide-react';

interface CuratedSneaker {
  id: string;
  name: string;
  brand: string;
  image: string;
  releaseDate: string;
  whyWePicked: string;
  colorway: string;
  designer?: string;
  category: 'collab' | 'womens-exclusive' | 'designer-pick' | 'trending';
  price: string;
  sizes: string[];
}

const curatedSneakers: CuratedSneaker[] = [
  {
    id: '1',
    name: 'Air Jordan 1 High "Aleali May"',
    brand: 'Jordan',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23ffffff"/><path d="M80 140c0-25 25-50 60-50s60 25 60 50v30H80v-30z" fill="%23d946ef"/><path d="M90 170h100v15H90z" fill="%23000000"/><circle cx="130" cy="120" r="8" fill="%23ffffff"/><text x="150" y="190" text-anchor="middle" fill="%23666" font-size="12">AJ1</text></svg>',
    releaseDate: '2024-03-15',
    whyWePicked: 'A celebration of feminine strength with premium materials and unique colorway.',
    colorway: 'Court Purple/Black',
    designer: 'Aleali May',
    category: 'collab',
    price: '$170',
    sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12']
  },
  {
    id: '2',
    name: 'Nike Dunk Low "Women\'s Championship"',
    brand: 'Nike',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23ffffff"/><path d="M80 140c0-20 20-45 60-45s60 25 60 45v25H80v-25z" fill="%23ec4899"/><path d="M90 165h100v12H90z" fill="%23ffffff"/><circle cx="120" cy="115" r="6" fill="%23ffffff"/><circle cx="160" cy="115" r="6" fill="%23ffffff"/><text x="150" y="190" text-anchor="middle" fill="%23666" font-size="12">Dunk</text></svg>',
    releaseDate: '2024-04-08',
    whyWePicked: 'Perfect balance of comfort and style with women-specific fit improvements.',
    colorway: 'Pink Prime/White',
    category: 'womens-exclusive',
    price: '$110',
    sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12']
  },
  {
    id: '3',
    name: 'Yeezy Boost 350 V2 "Rose"',
    brand: 'Adidas',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23ffffff"/><path d="M80 140c0-15 15-40 60-40s60 25 60 40v30H80v-30z" fill="%23f97316"/><path d="M85 160h110v8H85z" fill="%23d97706"/><circle cx="140" cy="125" r="5" fill="%23ffffff" opacity="0.5"/><text x="150" y="190" text-anchor="middle" fill="%23666" font-size="12">Yeezy</text></svg>',
    releaseDate: '2024-02-14',
    whyWePicked: 'Romantic colorway with premium Primeknit construction and boost comfort.',
    colorway: 'Rose/Clay',
    category: 'trending',
    price: '$230',
    sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12']
  },
  {
    id: '4',
    name: 'New Balance 550 "Aime Leon Dore - Pink"',
    brand: 'New Balance',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23ffffff"/><path d="M80 140c0-22 22-45 60-45s60 23 60 45v25H80v-25z" fill="%23fbbf24"/><path d="M90 165h100v10H90z" fill="%23f59e0b"/><path d="M100 125h80v5H100z" fill="%23ffffff"/><text x="150" y="190" text-anchor="middle" fill="%23666" font-size="12">NB 550</text></svg>',
    releaseDate: '2024-01-20',
    whyWePicked: 'Sophisticated collaboration with premium leather and thoughtful color blocking.',
    colorway: 'Pink/White/Cream',
    designer: 'Aime Leon Dore',
    category: 'collab',
    price: '$130',
    sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12']
  },
  {
    id: '5',
    name: 'Converse Chuck 70 "Comme des Garcons"',
    brand: 'Converse',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23ffffff"/><path d="M80 140c0-30 30-55 60-55s60 25 60 55v25H80v-25z" fill="%23000000"/><circle cx="140" cy="110" r="25" fill="%23ffffff"/><circle cx="140" cy="110" r="15" fill="%23dc2626"/><text x="150" y="190" text-anchor="middle" fill="%23666" font-size="12">Chuck 70</text></svg>',
    releaseDate: '2024-05-12',
    whyWePicked: 'Iconic collaboration merging high fashion with streetwear accessibility.',
    colorway: 'Black/Red Heart',
    designer: 'Comme des Garcons',
    category: 'designer-pick',
    price: '$150',
    sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12']
  },
  {
    id: '6',
    name: 'Vans Old Skool "Checkerboard Pink"',
    brand: 'Vans',
    image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23ffffff"/><path d="M80 145c0-20 20-40 60-40s60 20 60 40v20H80v-20z" fill="%23ec4899"/><path d="M90 155h20v10H90z" fill="%23ffffff"/><path d="M110 155h20v10h-20z" fill="%23ec4899"/><path d="M130 155h20v10h-20z" fill="%23ffffff"/><path d="M150 155h20v10h-20z" fill="%23ec4899"/><path d="M170 155h20v10h-20z" fill="%23ffffff"/><text x="150" y="190" text-anchor="middle" fill="%23666" font-size="12">Old Skool</text></svg>',
    releaseDate: '2024-03-28',
    whyWePicked: 'Classic checkerboard pattern reimagined in feminine colorways.',
    colorway: 'Pink/White Checkerboard',
    category: 'trending',
    price: '$65',
    sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12']
  }
];

const categories = [
  { value: 'all', label: 'All Sneakers' },
  { value: 'collab', label: 'Collaborations' },
  { value: 'womens-exclusive', label: "Women's Exclusive" },
  { value: 'designer-pick', label: 'Designer Picks' },
  { value: 'trending', label: 'Trending Now' }
];

const brands = ['All Brands', 'Jordan', 'Nike', 'Adidas', 'New Balance', 'Converse', 'Vans'];

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'collab': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'womens-exclusive': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    'designer-pick': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'trending': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
  };
  return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
};

const getCategoryLabel = (category: string) => {
  const labels: { [key: string]: string } = {
    'collab': 'Collaboration',
    'womens-exclusive': "Women's Exclusive",
    'designer-pick': 'Designer Pick',
    'trending': 'Trending'
  };
  return labels[category] || category;
};

export default function CuratedKicks() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredSneakers = curatedSneakers.filter(sneaker => {
    const categoryMatch = selectedCategory === 'all' || sneaker.category === selectedCategory;
    const brandMatch = selectedBrand === 'All Brands' || sneaker.brand === selectedBrand;
    return categoryMatch && brandMatch;
  });

  const sneakersToShow = 3; // Number of sneakers visible at once
  const maxIndex = Math.max(0, filteredSneakers.length - sneakersToShow);

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const visibleSneakers = filteredSneakers.slice(currentIndex, currentIndex + sneakersToShow);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Curated Kicks
          </h2>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Hand-picked sneakers celebrating women in culture, design, and style
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-center"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter by:</span>
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Sneaker Carousel */}
      <div className="relative">
        {/* Navigation Buttons */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="rounded-full shadow-lg bg-white/80 backdrop-blur-sm"
            data-testid="button-curated-prev"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="rounded-full shadow-lg bg-white/80 backdrop-blur-sm"
            data-testid="button-curated-next"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Sneakers Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12"
          key={`${selectedCategory}-${selectedBrand}-${currentIndex}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {visibleSneakers.map((sneaker, index) => (
            <motion.div
              key={sneaker.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {/* Sneaker Image */}
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                  <img
                    src={sneaker.image}
                    alt={sneaker.name}
                    className="w-full h-48 object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className={getCategoryColor(sneaker.category)}>
                      {getCategoryLabel(sneaker.category)}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Brand and Name */}
                  <div className="space-y-2 mb-3">
                    <div className="text-sm font-medium text-muted-foreground">
                      {sneaker.brand}
                    </div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-purple-600 transition-colors">
                      {sneaker.name}
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      {sneaker.colorway}
                    </div>
                  </div>

                  {/* Designer (if applicable) */}
                  {sneaker.designer && (
                    <div className="mb-3">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span className="font-medium">Designed by {sneaker.designer}</span>
                      </div>
                    </div>
                  )}

                  {/* Why We Picked It */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      Why We Picked It
                    </h4>
                    <p className="text-sm text-foreground">
                      {sneaker.whyWePicked}
                    </p>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-foreground">
                      {sneaker.price}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        data-testid={`button-discover-${sneaker.id}`}
                      >
                        Discover
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        data-testid={`button-buy-${sneaker.id}`}
                      >
                        <ShoppingBag className="w-3 h-3 mr-1" />
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredSneakers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-muted-foreground">
              No sneakers found matching your filters. Try adjusting your selection.
            </div>
          </motion.div>
        )}
      </div>

      {/* Dots Indicator */}
      {filteredSneakers.length > sneakersToShow && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-purple-500 w-8'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-purple-300'
              }`}
              data-testid={`dot-curated-${index}`}
            />
          ))}
        </div>
      )}

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Button 
          size="lg"
          variant="outline"
          className="border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400"
          data-testid="button-view-all-curated"
        >
          View All Curated Sneakers
        </Button>
      </motion.div>
    </div>
  );
}