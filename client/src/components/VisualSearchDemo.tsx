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
      className="py-20 sm:py-36 bg-gray-50"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="mx-auto sm:px-7 px-4 max-w-screen-xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-20 flex flex-col"
          variants={itemVariants}
        >
          <motion.h2 
            className="pb-2 text-3xl md:text-6xl font-bold max-w-[900px] mx-auto text-slate-700"
            variants={itemVariants}
          >
            Snap, Search & 
            <span className="text-primary"> Discover</span>
          </motion.h2>
          <motion.p 
            className="pb-10 text-lg text-gray-600 max-w-[600px] mx-auto"
            variants={itemVariants}
          >
            Upload any sneaker photo and let our AI instantly identify it with market data and pricing.
          </motion.p>
        </motion.div>

        {/* Clean Demo Interface */}
        <motion.div 
          className="relative flex items-center"
          variants={itemVariants}
        >
          {/* Main Demo Area with Phone Mockup Style */}
          <motion.div 
            className="mx-auto w-full max-w-[1000px] rounded-2xl shadow-2xl bg-white overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Left Side - Upload Interface */}
              <motion.div 
                className="lg:col-span-5 p-8 lg:p-12 bg-gradient-to-br from-slate-50 to-white"
                variants={itemVariants}
              >
                <motion.div
                  className="relative border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center hover:border-primary/50 transition-all duration-300 group min-h-[300px] flex flex-col justify-center"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ duration: 0.3 }}
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
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.img
                        src={uploadedImage}
                        alt="Uploaded sneaker"
                        className="max-w-full h-48 object-cover rounded-xl mx-auto shadow-lg"
                        animate={{ 
                          rotate: [0, 1, -1, 0],
                          scale: [1, 1.02, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                      <motion.p 
                        className="text-sm text-gray-600 font-medium"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Analyzing image...
                      </motion.p>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="space-y-6"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto"
                        whileHover={{ 
                          rotate: [0, -10, 10, 0],
                          scale: 1.1
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <Camera className="w-10 h-10 text-primary" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold mb-3 text-slate-700">Drop Your Sneaker Photo</h3>
                        <p className="text-gray-600 mb-6">
                          Drag & drop or click to upload any sneaker image
                        </p>
                        <motion.div 
                          className="flex gap-3 justify-center"
                          variants={containerVariants}
                        >
                          <motion.div
                            className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-medium text-slate-700 shadow-sm border"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Upload className="w-4 h-4" />
                            Upload
                          </motion.div>
                          <motion.div
                            className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-medium text-slate-700 shadow-sm border"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Smartphone className="w-4 h-4" />
                            Camera
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Features Grid */}
                <motion.div 
                  className="grid grid-cols-3 gap-4 mt-8"
                  variants={containerVariants}
                >
                  {[
                    { icon: Zap, label: "Instant", color: "text-yellow-600", bg: "bg-yellow-50" },
                    { icon: Eye, label: "99% Accurate", color: "text-blue-600", bg: "bg-blue-50" },
                    { icon: Star, label: "Market Data", color: "text-purple-600", bg: "bg-purple-50" }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.label}
                      className={`text-center p-4 rounded-xl ${feature.bg} group cursor-pointer`}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -3,
                        boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.4 }}
                      >
                        <feature.icon className={`w-6 h-6 ${feature.color} mx-auto mb-2`} />
                      </motion.div>
                      <p className="text-xs font-semibold text-slate-700">{feature.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Side - Results Area */}
              <motion.div 
                className="lg:col-span-7 p-8 lg:p-12 bg-white"
                variants={itemVariants}
              >
                <AnimatePresence mode="wait">
                  {isSearching ? (
                    <motion.div
                      key="searching"
                      className="text-center py-12 flex flex-col justify-center h-full"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Search className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-lg font-semibold mb-2 text-slate-700">AI Analyzing...</h3>
                      <p className="text-gray-600">Processing your sneaker image</p>
                    </motion.div>
                  ) : searchResults.length > 0 ? (
                    <motion.div
                      key="results"
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-lg font-semibold text-slate-700 mb-6">Search Results</h3>
                      {searchResults.map((result, index) => (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all group">
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <img
                                  src={result.image}
                                  alt={result.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <h4 className="font-semibold text-slate-700 line-clamp-1">
                                        {result.name}
                                      </h4>
                                      <p className="text-sm text-gray-600">
                                        {result.brand}
                                      </p>
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                      {result.confidence}% match
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-primary">
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
                      className="text-center py-12 text-gray-600 flex flex-col justify-center h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                      <p>Upload an image to see the magic happen</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12 sm:mt-16"
          variants={itemVariants}
        >
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