import React from 'react';
import { motion } from 'framer-motion';
import LiveMarketOverview from '@/components/LiveMarketOverview';
import { Bell, ArrowLeftRight, Camera } from 'lucide-react';

export default function LiveMarket() {
  return (
    <div data-testid="page-live-market">

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

      {/* Portfolio Section */}
      <section className="section" data-testid="portfolio-section">
        <div className="w-layout-blockcontainer container padding-4-5rem w-container">
          <div className="portfolio-wrapper">
            <div className="portfolio-header">
              <h2 className="portfolio-title" data-testid="portfolio-title">FEATURED COLLECTIONS</h2>
            </div>
            <div className="portfolio-grid" data-testid="portfolio-grid">
              {/* Jordan Classics Card */}
              <motion.div 
                className="portfolio-card" 
                data-testid="card-jordan-classics"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="card-overlay"></div>
                <div className="card-content">
                  <h3 className="card-title" data-testid="title-jordan-classics">Jordan Classics</h3>
                  <p className="card-description" data-testid="desc-jordan-classics">
                    Iconic Air Jordan legacy releases from every era
                  </p>
                  <div className="card-price" data-testid="price-jordan-classics">$150 - $2,500</div>
                  <button className="card-button" data-testid="button-jordan-classics">
                    View Collection
                  </button>
                </div>
              </motion.div>

              {/* Yeezy Drop Card */}
              <motion.div 
                className="portfolio-card" 
                data-testid="card-yeezy-drop"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="card-overlay"></div>
                <div className="card-content">
                  <h3 className="card-title" data-testid="title-yeezy-drop">Yeezy Drop</h3>
                  <p className="card-description" data-testid="desc-yeezy-drop">
                    Latest Adidas Yeezy releases and rare colorways
                  </p>
                  <div className="card-price" data-testid="price-yeezy-drop">$200 - $1,800</div>
                  <button className="card-button" data-testid="button-yeezy-drop">
                    View Collection
                  </button>
                </div>
              </motion.div>

              {/* Nike SB Card */}
              <motion.div 
                className="portfolio-card" 
                data-testid="card-nike-sb"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="card-overlay"></div>
                <div className="card-content">
                  <h3 className="card-title" data-testid="title-nike-sb">Nike SB</h3>
                  <p className="card-description" data-testid="desc-nike-sb">
                    Premium skateboarding collection and limited drops
                  </p>
                  <div className="card-price" data-testid="price-nike-sb">$90 - $800</div>
                  <button className="card-button" data-testid="button-nike-sb">
                    View Collection
                  </button>
                </div>
              </motion.div>

              {/* Off-White Collab Card */}
              <motion.div 
                className="portfolio-card" 
                data-testid="card-off-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="card-overlay"></div>
                <div className="card-content">
                  <h3 className="card-title" data-testid="title-off-white">Off-White Collab</h3>
                  <p className="card-description" data-testid="desc-off-white">
                    Luxury collaboration pieces and designer exclusives
                  </p>
                  <div className="card-price" data-testid="price-off-white">$500 - $5,000</div>
                  <button className="card-button" data-testid="button-off-white">
                    View Collection
                  </button>
                </div>
              </motion.div>

              {/* Retro Runners Card */}
              <motion.div 
                className="portfolio-card" 
                data-testid="card-retro-runners"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="card-overlay"></div>
                <div className="card-content">
                  <h3 className="card-title" data-testid="title-retro-runners">Retro Runners</h3>
                  <p className="card-description" data-testid="desc-retro-runners">
                    Vintage running shoes and classic athletic designs
                  </p>
                  <div className="card-price" data-testid="price-retro-runners">$80 - $600</div>
                  <button className="card-button" data-testid="button-retro-runners">
                    View Collection
                  </button>
                </div>
              </motion.div>

              {/* Court Classics Card */}
              <motion.div 
                className="portfolio-card" 
                data-testid="card-court-classics"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="card-overlay"></div>
                <div className="card-content">
                  <h3 className="card-title" data-testid="title-court-classics">Court Classics</h3>
                  <p className="card-description" data-testid="desc-court-classics">
                    Tennis and court shoes from iconic sports brands
                  </p>
                  <div className="card-price" data-testid="price-court-classics">$70 - $450</div>
                  <button className="card-button" data-testid="button-court-classics">
                    View Collection
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
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