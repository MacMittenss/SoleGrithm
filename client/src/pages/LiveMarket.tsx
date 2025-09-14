import React from 'react';
import { motion } from 'framer-motion';
import LiveMarketOverview from '@/components/LiveMarketOverview';
import BrandsGrid from '@/components/BrandsGrid';

export default function LiveMarket() {
  return (
    <div data-testid="page-live-market">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="fingerprint"></div>
        <div className="circle"></div>
        <div className="w-layout-blockcontainer container w-container">
          <motion.div 
            className="hero-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h5 className="heading">Real-Time Data</h5>
            <h1 className="hero-text">LIVE MARKET</h1>
            <div className="arrow-border-wrapper w-inline-block">
              <div className="icon-wrapper">
                <div className="arrow">📈</div>
              </div>
            </div>
          </motion.div>
          <div className="hero-overlay"></div>
        </div>
      </section>

      {/* Brands Grid Section */}
      <BrandsGrid />

      {/* Market Overview Section */}
      <section className="section">
        <div className="w-layout-blockcontainer container padding-4-5rem w-container">
          <div className="space-7rem"></div>
          <LiveMarketOverview />
          <div className="space-7rem"></div>
        </div>
      </section>
    </div>
  );
}