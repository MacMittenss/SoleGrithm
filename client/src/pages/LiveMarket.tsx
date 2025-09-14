import React from 'react';
import { motion } from 'framer-motion';
import LiveMarketOverview from '@/components/LiveMarketOverview';
import BrandsGrid from '@/components/BrandsGrid';
import { Bell, ArrowLeftRight, Camera } from 'lucide-react';

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

      {/* Services Section */}
      <section className="section" data-testid="services-section">
        <div className="w-layout-blockcontainer container padding-4-5rem w-container">
          <div className="services-flex">
            <div className="services-wrapper slide-from-left-animation">
              {/* Price Alerts Card */}
              <div className="services-card" data-testid="service-card-price-alerts">
                <div className="services-title-flex">
                  <Bell className="services-icon" data-testid="icon-price-alerts" />
                  <h4>Price Alerts</h4>
                </div>
                <div className="services-text-block">
                  <p>Get notified when sneakers hit your target price across all major platforms</p>
                </div>
              </div>

              {/* AR Try-On Card */}
              <div className="services-card" data-testid="service-card-ar-try-on">
                <div className="services-title-flex">
                  <Camera className="services-icon" data-testid="icon-ar-try-on" />
                  <h4>AR Try-On</h4>
                </div>
                <div className="services-text-block">
                  <p>Visualize sneakers in augmented reality before making your purchase decision</p>
                </div>
              </div>
            </div>

            <div className="services-wrapper slide-from-right-animation">
              <h5>Market Tools</h5>
              <h2 className="services-title">SERVICES</h2>

              {/* Retailer Comparison Card */}
              <div className="services-card" data-testid="service-card-retailer-comparison">
                <div className="services-title-flex">
                  <ArrowLeftRight className="services-icon" data-testid="icon-retailer-comparison" />
                  <h4>Retailer Comparison</h4>
                </div>
                <div className="services-text-block">
                  <p>Compare prices, availability, and authenticity across StockX, GOAT, and retail stores</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Works Section */}
      <section className="section" data-testid="works-section">
        <div className="w-layout-blockcontainer container w-container">
          <div className="space-7rem"></div>
          <div className="works-title-wrapper" data-testid="works-title-wrapper">
            <h2 className="works-title" data-testid="works-title-1">MARKET INSIGHTS</h2>
            <h2 className="works-title outline-white" data-testid="works-title-2">MARKET INSIGHTS</h2>
            <h2 className="works-title" data-testid="works-title-3">MARKET INSIGHTS</h2>
            <h2 className="works-title outline-white" data-testid="works-title-4">MARKET INSIGHTS</h2>
            <h2 className="works-title" data-testid="works-title-5">MARKET INSIGHTS</h2>
            <h2 className="works-title outline-white" data-testid="works-title-6">MARKET INSIGHTS</h2>
          </div>
          <div className="space-7rem"></div>
        </div>
      </section>

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