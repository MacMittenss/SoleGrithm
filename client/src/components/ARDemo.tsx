import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  RotateCcw, 
  Eye, 
  Volume2, 
  Maximize2,
  Smartphone,
  ArrowRight,
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
      className="section background-black py-20 sm:py-36"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="w-layout-blockcontainer container w-container mx-auto sm:px-7 px-4 max-w-screen-xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-20 flex flex-col"
          variants={itemVariants}
        >
          <motion.h2 
            className="pb-2 text-3xl md:text-6xl font-bold max-w-[900px] mx-auto text-white"
            variants={itemVariants}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Try Before You 
            </motion.span>
            <motion.span 
              className="bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent font-bold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Buy
            </motion.span>
          </motion.h2>
          <motion.p 
            className="pb-10 text-lg text-white/70 max-w-[600px] mx-auto"
            variants={itemVariants}
          >
            Experience sneakers on your feet with advanced AR technology. See the perfect fit instantly.
          </motion.p>
        </motion.div>

        {/* Features Layout - Template Style */}
        <motion.div 
          className="relative flex items-center"
          variants={itemVariants}
        >
          <motion.div 
            className="mx-auto w-full max-w-[1000px] rounded-2xl shadow-2xl bg-black/80 border border-white/10 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="grid grid-cols-6 md:grid-cols-12 gap-10 items-center p-8 lg:p-12">
              {/* Left Side - Features */}
              <div className="col-span-6 md:col-span-4 text-right">
                <motion.div 
                  className="mb-10"
                  variants={itemVariants}
                  whileHover={{ x: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="mb-2 text-base font-semibold leading-tight text-white items-center flex gap-2">
                    <span className="ml-auto">Real-Time Tracking</span>
                    <motion.div 
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black text-sm font-bold"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      1
                    </motion.div>
                  </h3>
                  <p className="text-sm text-white/70">Advanced foot tracking technology provides precise sneaker placement and realistic fit visualization.</p>
                </motion.div>
                
                <motion.div 
                  className="mb-10"
                  variants={itemVariants}
                  whileHover={{ x: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="mb-2 text-base font-semibold leading-tight text-white items-center flex gap-2">
                    <span className="ml-auto">Size Prediction</span>
                    <motion.div 
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black text-sm font-bold"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      2
                    </motion.div>
                  </h3>
                  <p className="text-sm text-white/70">AI-powered size recommendations based on your foot measurements and preferred fit style.</p>
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  whileHover={{ x: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="mb-2 text-base font-semibold leading-tight text-white items-center flex gap-2">
                    <span className="ml-auto">Style Comparison</span>
                    <motion.div 
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black text-sm font-bold"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      3
                    </motion.div>
                  </h3>
                  <p className="text-sm text-white/70">Compare multiple sneaker styles side-by-side to find your perfect match.</p>
                </motion.div>
              </div>

              {/* Center - Phone Mockup */}
              <div className="hidden relative md:block col-span-4">
                <motion.div 
                  className="relative"
                  variants={itemVariants}
                >
                  <AnimatePresence mode="wait">
                    {isARActive ? (
                      <motion.div
                        key="ar-active"
                        className="text-center space-y-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Phone Mockup with AR Camera View */}
                        <motion.div 
                          className="w-64 h-[480px] bg-black rounded-[3rem] p-3 mx-auto relative"
                          animate={{ 
                            boxShadow: [
                              "0 0 20px rgba(59, 130, 246, 0.3)",
                              "0 0 40px rgba(147, 51, 234, 0.3)",
                              "0 0 20px rgba(59, 130, 246, 0.3)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {/* Screen */}
                          <div className="w-full h-full bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-[2.5rem] relative overflow-hidden">
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
                              <Badge variant="secondary" className="text-xs bg-white/90 text-black">
                                AR Active
                              </Badge>
                              <Badge variant="secondary" className="text-xs bg-white/90 text-black">
                                Size: 9.5
                              </Badge>
                            </div>
                          </div>
                        </motion.div>

                        {/* AR Controls */}
                        <motion.div 
                          className="flex justify-center gap-3"
                          variants={containerVariants}
                        >
                          {[
                            { icon: RotateCcw, label: "Rotate" },
                            { icon: Eye, label: "View" },
                            { icon: Volume2, label: "Sound" },
                            { icon: Maximize2, label: "Full" }
                          ].map((control, index) => (
                            <motion.button
                              key={control.label}
                              className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                              variants={itemVariants}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              data-testid={`button-ar-${control.label.toLowerCase()}`}
                            >
                              <control.icon className="w-5 h-5 text-primary" />
                            </motion.button>
                          ))}
                        </motion.div>

                        <p className="text-sm text-white/70">
                          Move your phone to see different angles
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="ar-preview"
                        className="text-center space-y-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Phone Mockup - Preview */}
                        <motion.div 
                          className="w-64 h-[480px] bg-black rounded-[3rem] p-3 mx-auto relative cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                          onClick={startARTryOn}
                        >
                          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 rounded-[2.5rem] relative overflow-hidden">
                            {/* Preview Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <motion.div
                                className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4"
                                whileHover={{ scale: 1.1 }}
                              >
                                <Play className="w-8 h-8 text-white ml-1" />
                              </motion.div>
                              <h4 className="text-lg font-semibold text-black mb-2">Start AR Try-On</h4>
                              <p className="text-sm text-white/70 px-4 text-center">
                                Point your camera at your feet to begin
                              </p>
                            </div>
                            
                            {/* Preview sneaker */}
                            <motion.img
                              src={sneakers[selectedSneaker].image}
                              alt="Preview sneaker"
                              className="absolute bottom-4 right-4 w-16 h-12 object-cover rounded-lg opacity-30"
                              animate={{ rotate: [0, 5, 0] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Right Side - Features */}
              <div className="col-span-6 md:col-span-4">
                <motion.div 
                  className="mb-10"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="mb-2 text-base font-semibold leading-tight text-white items-center flex gap-2">
                    <motion.div 
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black text-sm font-bold"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      4
                    </motion.div>
                    <span>HD Rendering</span>
                  </h3>
                  <p className="text-sm text-white/70">Ultra-high quality 3D models with realistic materials and lighting for authentic visualization.</p>
                </motion.div>
                
                <motion.div 
                  className="mb-10"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="mb-2 text-base font-semibold leading-tight text-white items-center flex gap-2">
                    <motion.div 
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black text-sm font-bold"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      5
                    </motion.div>
                    <span>Social Sharing</span>
                  </h3>
                  <p className="text-sm text-white/70">Share your virtual try-on experiences with friends and get feedback before making a purchase.</p>
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="mb-2 text-base font-semibold leading-tight text-white items-center flex gap-2">
                    <motion.div 
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black text-sm font-bold"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      6
                    </motion.div>
                    <span>Save Favorites</span>
                  </h3>
                  <p className="text-sm text-white/70">Bookmark your favorite combinations and create personalized collections for future reference.</p>
                </motion.div>
              </div>
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
            <Button 
              size="lg" 
              className="h-12 px-8 text-base" 
              onClick={startARTryOn}
              data-testid="button-start-ar-tryon"
            >
              <Camera className="w-5 h-5 mr-2" />
              Start AR Try-On
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
          <p className="text-sm text-white/70 mt-3">
            Full AR experience available on mobile devices
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}