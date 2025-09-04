import React from 'react';
import { motion } from 'framer-motion';
import WomenHeroSection from '@/components/women/WomenHeroSection';
import SpotlightFeatureCard from '@/components/women/SpotlightFeatureCard';
import EditorialSection from '@/components/women/EditorialSection';
import CuratedKicks from '@/components/women/CuratedKicks';
import CommunityVoices from '@/components/women/CommunityVoices';
import EventSpotlight from '@/components/women/EventSpotlight';
import AIAssistWidget from '@/components/women/AIAssistWidget';

export default function WomenInSneakers() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-background"
      data-testid="page-women-in-sneakers"
    >
      {/* Hero Section */}
      <WomenHeroSection />
      
      {/* Spotlight Feature */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SpotlightFeatureCard />
        </div>
      </section>

      {/* Editorial Content Grid */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <EditorialSection />
        </div>
      </section>

      {/* Curated Sneakers */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <CuratedKicks />
        </div>
      </section>

      {/* Community Voices */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="max-w-7xl mx-auto">
          <CommunityVoices />
        </div>
      </section>

      {/* Event Coverage */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <EventSpotlight />
        </div>
      </section>

      {/* AI Assistant Widget */}
      <AIAssistWidget />
    </motion.div>
  );
}