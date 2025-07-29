import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CARE_FACTS = [
  "Shoe trees can extend your sneaker's life by up to 40%",
  "Cedar shoe trees naturally absorb moisture and odors",
  "Never dry sneakers near direct heat - it can crack materials",
  "Rotating between 2-3 pairs prevents excessive wear",
  "Suede brushes should only move in one direction",
  "White vinegar removes salt stains from winter wearing",
  "Newspaper helps sneakers dry while maintaining shape",
  "UV rays can fade colors - store away from sunlight",
  "Regular cleaning prevents permanent staining",
  "Leather conditioner should be applied every 3-6 months",
  "Jason Markk was founded by a sneaker collector for sneaker collectors",
  "Crep Protect creates an invisible barrier against liquids",
  "Some premium sneakers come with special care instructions",
  "Patent leather requires different care than regular leather",
  "Mesh materials need gentle cleaning to avoid tearing",
  "Boost material should be cleaned with specialized foam cleaners",
  "Knit uppers are more delicate than leather constructions",
  "Gore-Tex sneakers maintain waterproofing with proper care"
];

interface BackgroundCareFactsProps {
  className?: string;
}

export default function BackgroundCareFacts({ className = "" }: BackgroundCareFactsProps) {
  const [currentFact, setCurrentFact] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentFact((prev) => (prev + 1) % CARE_FACTS.length);
        setIsVisible(true);
      }, 500);
    }, 15000); // Change fact every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 max-w-xs z-0 ${className}`}>
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg p-4 shadow-sm pointer-events-none"
          >
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0 opacity-60" />
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                  Care Tip
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {CARE_FACTS[currentFact]}
                </p>
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="mt-3 flex gap-1">
              {CARE_FACTS.slice(0, 5).map((_, index) => (
                <div
                  key={index}
                  className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                    index === (currentFact % 5) 
                      ? 'bg-gray-400' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}