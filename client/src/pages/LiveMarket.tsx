import React from 'react';
import { motion } from 'framer-motion';
import LiveMarketOverview from '@/components/LiveMarketOverview';

export default function LiveMarket() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 lg:p-8"
      data-testid="page-live-market"
    >
      <div className="max-w-7xl mx-auto">
        <LiveMarketOverview />
      </div>
    </motion.div>
  );
}