import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  ArrowRight, 
  Star,
  Camera,
  Sparkles,
  Zap,
  Eye,
  RotateCcw,
  Volume2,
  Maximize2,
  Play
} from 'lucide-react';

export default function ARDemo() {
  const [isARActive, setIsARActive] = useState(false);
  const [selectedSneaker, setSelectedSneaker] = useState(0);
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

  const sneakers = [
    {
      id: 1,
      name: "Air Jordan 1 Retro High",
      brand: "Jordan",
      price: "$170",
      image: "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      colors: ["Red/Black", "White/Black", "Royal Blue"]
    },
    {
      id: 2,
      name: "Nike Dunk Low",
      brand: "Nike", 
      price: "$100",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      colors: ["White/Black", "Panda", "University Blue"]
    },
    {
      id: 3,
      name: "Adidas Yeezy Boost",
      brand: "Adidas",
      price: "$220",
      image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      colors: ["Bone", "Zebra", "Cream"]
    }
  ];

  const startARTryOn = () => {
    setIsARActive(true);
    // Simulate AR session
    setTimeout(() => {
      setIsARActive(false);
    }, 5000);
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-gradient-to-br from-orange-500/5 to-red-500/5"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Camera className="w-4 h-4" />
            AR Try-On
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            Virtual Try-On Experience
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            See how any sneaker looks on your feet with our advanced AR technology. 
            Mobile-optimized for the perfect fit preview.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content Over Phone */}
          <motion.div className="relative space-y-6" variants={itemVariants}>
            {/* Content positioned over the phone */}
            <motion.div
              className="relative z-10 bg-gradient-to-br from-background/95 to-muted/95 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border shadow-lg"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="text-center space-y-6">
                <motion.div
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl flex items-center justify-center mx-auto"
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Smartphone className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500" />
                </motion.div>
                
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">Try On Virtually</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6">
                    Point your camera at your feet and see how any sneaker looks
                  </p>
                  
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button 
                      size="lg" 
                      className="h-12 px-8 text-base"
                      onClick={startARTryOn}
                      data-testid="button-start-ar"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start AR Try-On
                    </Button>
                  </motion.div>
                </div>

                {/* Features */}
                <motion.div 
                  className="grid grid-cols-2 gap-4 pt-4"
                  variants={containerVariants}
                >
                  {[
                    { icon: Zap, label: "Instant Preview", color: "text-yellow-500" },
                    { icon: Eye, label: "360° View", color: "text-blue-500" }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.label}
                      className="text-center p-3 rounded-xl bg-card/50 backdrop-blur-sm border"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <feature.icon className={`w-5 h-5 ${feature.color} mx-auto mb-2`} />
                      <p className="text-xs font-medium">{feature.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* DaisyUI iPhone Mockup - Always Visible Behind */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              variants={itemVariants}
            >
              <motion.div 
                className="mockup-phone"
                animate={{ 
                  boxShadow: isARActive ? [
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                    "0 0 40px rgba(147, 51, 234, 0.3)",
                    "0 0 20px rgba(59, 130, 246, 0.3)"
                  ] : "0 0 0px rgba(0, 0, 0, 0)"
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="mockup-phone-camera"></div> 
                <div className="mockup-phone-display bg-gradient-to-b from-blue-500/20 to-purple-500/20 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {isARActive ? (
                      <motion.div
                        key="ar-active"
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* AR Camera Content */}
                        <div className="absolute inset-0 bg-black/10" />
                        
                        {/* Status Bar */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white text-xs z-10">
                          <span>9:41</span>
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-2 border border-white rounded-sm">
                              <div className="w-full h-full bg-white rounded-sm"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Foot outline */}
                        <motion.div 
                          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-20 border-2 border-primary/50 rounded-full"
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        
                        {/* Virtual Sneaker */}
                        <motion.img
                          src={sneakers[selectedSneaker].image}
                          alt="AR Sneaker"
                          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-28 h-20 object-cover rounded-lg"
                          animate={{
                            y: [0, -5, 0],
                            rotateY: [0, 10, 0]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        
                        {/* AR UI Elements */}
                        <div className="absolute top-12 left-4 right-4 flex justify-between">
                          <Badge variant="secondary" className="text-xs bg-black/50 text-white">
                            AR Active
                          </Badge>
                          <Badge variant="secondary" className="text-xs bg-black/50 text-white">
                            Size: 9.5
                          </Badge>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="ar-inactive"
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-center text-white/50">
                          <Camera className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm">Camera Ready</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>

            {/* AR Controls - Show when AR is active */}
            <AnimatePresence>
              {isARActive && (
                <motion.div 
                  className="flex justify-center gap-3 relative z-10"
                  variants={containerVariants}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {[
                    { icon: RotateCcw, label: "Rotate" },
                    { icon: Eye, label: "View" },
                    { icon: Volume2, label: "Sound" },
                    { icon: Maximize2, label: "Full" }
                  ].map((control, index) => (
                    <motion.button
                      key={control.label}
                      className="w-12 h-12 bg-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors border"
                      variants={itemVariants}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      data-testid={`button-ar-${control.label.toLowerCase()}`}
                    >
                      <control.icon className="w-5 h-5 text-primary" />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* AR Status Text */}
            <AnimatePresence>
              {isARActive && (
                <motion.p 
                  className="text-sm text-muted-foreground text-center relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Move your phone to see different angles
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sneaker Selection */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-xl sm:text-2xl font-semibold text-center">
              Choose a Sneaker to Try
            </h3>
            
            <motion.div className="space-y-4" variants={containerVariants}>
              {sneakers.map((sneaker, index) => (
                <motion.div
                  key={sneaker.id}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedSneaker === index
                      ? 'border-primary bg-primary/5 shadow-lg'
                      : 'border-muted bg-card hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedSneaker(index)}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  data-testid={`button-sneaker-${sneaker.id}`}
                >
                  <div className="flex gap-4">
                    <img
                      src={sneaker.image}
                      alt={sneaker.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-base line-clamp-1">
                        {sneaker.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {sneaker.brand}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">
                          {sneaker.price}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {sneaker.colors.length} colors
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {selectedSneaker === index && (
                    <motion.div
                      className="mt-4 pt-4 border-t border-primary/20"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-xs text-muted-foreground mb-2">Available Colors:</p>
                      <div className="flex gap-2">
                        {sneaker.colors.map((color, colorIndex) => (
                          <Badge key={colorIndex} variant="secondary" className="text-xs">
                            {color}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Additional Features */}
            <motion.div 
              className="grid grid-cols-2 gap-4 pt-4"
              variants={containerVariants}
            >
              {[
                { icon: Star, label: "Size Matching", desc: "Perfect fit AI" },
                { icon: Sparkles, label: "Style Tips", desc: "AI suggestions" }
              ].map((feature, index) => (
                <motion.div
                  key={feature.label}
                  className="text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border hover:shadow-lg transition-shadow"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <feature.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <h4 className="font-medium text-sm">{feature.label}</h4>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div className="text-center mt-12 sm:mt-16" variants={itemVariants}>
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button size="lg" className="h-12 px-8 text-base" data-testid="button-download-app">
              <Smartphone className="w-5 h-5 mr-2" />
              Download Mobile App
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
          <p className="text-sm text-muted-foreground mt-3">
            Full AR experience available on mobile devices
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}