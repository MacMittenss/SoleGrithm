import React from 'react';
import { motion } from 'framer-motion';
import LiveMarketOverview from '@/components/LiveMarketOverview';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BarChart3, Activity } from 'lucide-react';

export default function LiveMarket() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      data-testid="page-live-market"
    >
      {/* Hero Section */}
      <section className="section">
        <div className="w-layout-blockcontainer container padding-9rem w-container">
          <div className="space-page-top"></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="about-hero-flex"
          >
            <div className="about-hero-wrapper">
              <h5>Real-Time Data</h5>
              <div className="about-hero-block">
                <h1 className="font-huge">LIVE MARKET</h1>
              </div>
              <p className="max-width-30rem">Track sneaker prices, trends, and market analytics in real-time across all major platforms.</p>
              <div className="space-2rem"></div>
              <Badge variant="outline" className="text-sm">
                <Activity className="w-4 h-4 mr-2" />
                Market Data Updated Live
              </Badge>
            </div>
            <div className="hero-stats-wrapper">
              <div className="stats-grid">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="stat-card"
                >
                  <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
                  <h3 className="text-2xl font-bold">15K+</h3>
                  <p className="text-sm text-muted-foreground">Tracked Items</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="stat-card"
                >
                  <BarChart3 className="w-8 h-8 text-blue-500 mb-2" />
                  <h3 className="text-2xl font-bold">$847</h3>
                  <p className="text-sm text-muted-foreground">Avg Price</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Data Section */}
      <section className="section">
        <div className="w-layout-blockcontainer container padding-13-5rem w-container">
          <LiveMarketOverview />
          <div className="space-7rem"></div>
        </div>
      </section>
    </motion.div>
  );
}