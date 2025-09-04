import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Star } from 'lucide-react';

export default function WomenHeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleExploreClick = () => {
    // Smooth scroll to spotlight section
    const spotlightSection = document.querySelector('[data-section="spotlight"]');
    spotlightSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmitStoryClick = () => {
    // Scroll to community section
    const communitySection = document.querySelector('[data-section="community"]');
    communitySection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"
          style={{
            backgroundImage: videoLoaded ? 'none' : `linear-gradient(135deg, 
              rgba(147, 51, 234, 0.9) 0%, 
              rgba(236, 72, 153, 0.9) 50%, 
              rgba(251, 146, 60, 0.9) 100%),
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"><rect width="1920" height="1080" fill="%23f3f4f6"/><path d="M0 540l80-40c80-40 240-120 400-120s320 80 480 80 320-80 480-80 320 80 480 120l80 40v540H0V540z" fill="%23e5e7eb" opacity="0.5"/></svg>')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><g fill='%23ffffff' fill-opacity='0.1' fill-rule='nonzero'><path d='M30 30c0-16.569 13.431-30 30-30v60C43.431 60 30 46.569 30 30zM0 30c0 16.569 13.431 30 30 30V0C13.431 0 0 13.431 0 30z'/></g></svg>")`,
              backgroundSize: '60px 60px'
            }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-300 fill-current" />
              <span className="text-white font-medium">Celebrating Women in Sneaker Culture</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
          >
            Women Move
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              the Culture
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Stories, sneakers, and spotlight moments curated for and by women in the game.
            Discover the voices shaping sneaker culture today.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={handleExploreClick}
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
              data-testid="button-explore-features"
            >
              Explore Features
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={handleSubmitStoryClick}
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-white/10"
              data-testid="button-submit-story"
            >
              Submit Your Story
              <Play className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-white/80">Featured Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">200+</div>
              <div className="text-white/80">Curated Sneakers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1K+</div>
              <div className="text-white/80">Community Voices</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}