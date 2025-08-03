import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Upload, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Star,
  Eye,
  Zap,
  Smartphone
} from 'lucide-react';

export default function VisualSearchDemo() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        simulateSearch();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setSearchResults([
        {
          id: 1,
          name: "Air Jordan 1 Retro High",
          brand: "Jordan",
          confidence: 95,
          price: "$170",
          image: "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        },
        {
          id: 2,
          name: "Air Jordan 1 Mid",
          brand: "Jordan",
          confidence: 87,
          price: "$110",
          image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        },
        {
          id: 3,
          name: "Nike Dunk High",
          brand: "Nike",
          confidence: 78,
          price: "$110",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
        }
      ]);
      setIsSearching(false);
    }, 2000);
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 to-orange-500/5"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Search
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            Visual Search Magic
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload any sneaker photo and watch our AI instantly identify it with market data, 
            pricing history, and similar styles. Mobile-first, lightning-fast.
          </p>
        </motion.div>

        {/* Mobile-First Demo Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Upload Area */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <motion.div
              className="relative border-2 border-dashed border-primary/30 rounded-2xl p-8 sm:p-12 text-center bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors group"
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                data-testid="input-image-upload"
              />
              
              {uploadedImage ? (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={uploadedImage}
                    alt="Uploaded sneaker"
                    className="max-w-full h-48 sm:h-64 object-cover rounded-xl mx-auto shadow-lg"
                  />
                  <p className="text-sm text-muted-foreground">Analyzing image...</p>
                </motion.div>
              ) : (
                <motion.div
                  className="space-y-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Upload Your Sneaker Photo</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4">
                      Drag & drop or click to upload any sneaker image
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                      <Badge variant="secondary" className="text-xs">
                        <Upload className="w-3 h-3 mr-1" />
                        Upload Photo
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <Smartphone className="w-3 h-3 mr-1" />
                        Mobile Camera
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Features */}
            <motion.div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4" variants={containerVariants}>
              {[
                { icon: Zap, label: "Instant Results", color: "text-yellow-500" },
                { icon: Eye, label: "99% Accuracy", color: "text-blue-500" },
                { icon: Star, label: "Price History", color: "text-purple-500" }
              ].map((feature, index) => (
                <motion.div
                  key={feature.label}
                  className="text-center p-3 sm:p-4 rounded-xl bg-card/50 backdrop-blur-sm border group hover:shadow-lg transition-shadow"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <feature.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
                  <p className="text-xs sm:text-sm font-medium">{feature.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Results Area */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <AnimatePresence mode="wait">
              {isSearching ? (
                <motion.div
                  key="searching"
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-primary to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Search className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2">Searching...</h3>
                  <p className="text-muted-foreground">AI analyzing your sneaker image</p>
                </motion.div>
              ) : searchResults.length > 0 ? (
                <motion.div
                  key="results"
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-center">Search Results</h3>
                  {searchResults.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow group">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={result.image}
                              alt={result.name}
                              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold text-sm sm:text-base line-clamp-1">
                                    {result.name}
                                  </h4>
                                  <p className="text-xs sm:text-sm text-muted-foreground">
                                    {result.brand}
                                  </p>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {result.confidence}% match
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-primary text-sm sm:text-base">
                                  {result.price}
                                </span>
                                <Button size="sm" variant="ghost" className="text-xs" data-testid={`button-view-${result.id}`}>
                                  View
                                  <ArrowRight className="w-3 h-3 ml-1" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="text-center py-12 text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Upload an image to see the magic happen</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div className="text-center mt-12 sm:mt-16" variants={itemVariants}>
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button size="lg" className="h-12 px-8 text-base" data-testid="button-try-visual-search">
              <Camera className="w-5 h-5 mr-2" />
              Try Visual Search Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}