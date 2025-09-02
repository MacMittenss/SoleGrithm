import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Navbar from '../components/Navbar'
import LiveMarketPredictions from '../components/LiveMarketPredictions'

export default function LiveMarketPage() {
  const [activeTab, setActiveTab] = useState('live-market')
  const pageRef = useRef<HTMLDivElement>(null)
  const tabContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(".page-content", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      )
    }
  }, [])

  useEffect(() => {
    if (tabContentRef.current) {
      gsap.fromTo(tabContentRef.current, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      )
    }
  }, [activeTab])

  const mockSneakers = [
    {
      id: 1,
      name: "Air Jordan 1 Retro High OG",
      brand: "Nike",
      price: "$170",
      marketPrice: "$450",
      change: "+24%",
      image: "/api/placeholder/300/200",
      trending: true
    },
    {
      id: 2,
      name: "Yeezy Boost 350 V2",
      brand: "Adidas",
      price: "$220",
      marketPrice: "$380",
      change: "+18%",
      image: "/api/placeholder/300/200",
      trending: false
    },
    {
      id: 3,
      name: "Travis Scott x Air Jordan 1",
      brand: "Nike",
      price: "$175",
      marketPrice: "$1,200",
      change: "+85%",
      image: "/api/placeholder/300/200",
      trending: true
    },
    {
      id: 4,
      name: "Off-White x Nike Air Force 1",
      brand: "Nike",
      price: "$180",
      marketPrice: "$850",
      change: "+72%",
      image: "/api/placeholder/300/200",
      trending: true
    },
    {
      id: 5,
      name: "New Balance 550",
      brand: "New Balance",
      price: "$110",
      marketPrice: "$180",
      change: "+12%",
      image: "/api/placeholder/300/200",
      trending: false
    },
    {
      id: 6,
      name: "Dunk Low 'Panda'",
      brand: "Nike",
      price: "$100",
      marketPrice: "$220",
      change: "+45%",
      image: "/api/placeholder/300/200",
      trending: true
    }
  ]

  return (
    <div className="live-market-page">
      <Navbar />
      
      <section className="hero-section" ref={pageRef}>
        <div className="w-layout-blockcontainer container w-container">
          <div className="hero-wrapper page-content">
            <h5 className="heading">Live Market</h5>
            <h1 className="hero-text">LIVE MARKET</h1>
            <p className="max-width-30rem">
              Real-time sneaker trading with live price indicators and market analytics
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="tabs-section" style={{ padding: '2rem 0', backgroundColor: '#050505' }}>
        <div className="w-layout-blockcontainer container w-container">
          <div className="tabs-wrapper">
            <div className="tab-buttons">
              <button 
                className={`tab-button ${activeTab === 'live-market' ? 'active' : ''}`}
                onClick={() => setActiveTab('live-market')}
              >
                Live Market
              </button>
              <button 
                className={`tab-button ${activeTab === 'catalog' ? 'active' : ''}`}
                onClick={() => setActiveTab('catalog')}
              >
                Catalog
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="tab-content-section" style={{ padding: '4rem 0', backgroundColor: '#f8f9fa' }}>
        <div className="w-layout-blockcontainer container w-container">
          <div ref={tabContentRef}>
            {activeTab === 'live-market' && (
              <div className="live-market-content">
                <div className="section-header" style={{ marginBottom: '3rem' }}>
                  <h2 style={{ color: '#333', fontSize: '2.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Live Market Prices
                  </h2>
                  <p style={{ color: '#666', fontSize: '1.1rem' }}>
                    Real-time pricing data and market trends for the hottest sneakers
                  </p>
                </div>
                
                <LiveMarketPredictions />
                
                <div className="market-grid" style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '2rem',
                  marginTop: '3rem'
                }}>
                  {mockSneakers.map((sneaker) => (
                    <div key={sneaker.id} className="market-card" style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer'
                    }}>
                      {sneaker.trending && (
                        <div style={{
                          backgroundColor: '#ff6b6b',
                          color: 'white',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          display: 'inline-block',
                          marginBottom: '1rem'
                        }}>
                          🔥 TRENDING
                        </div>
                      )}
                      
                      <div style={{
                        width: '100%',
                        height: '200px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#666',
                        fontSize: '0.9rem'
                      }}>
                        Sneaker Image
                      </div>
                      
                      <h3 style={{ color: '#333', fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        {sneaker.name}
                      </h3>
                      <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        {sneaker.brand}
                      </p>
                      
                      <div className="price-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>Retail Price</p>
                          <p style={{ color: '#333', fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                            {sneaker.price}
                          </p>
                        </div>
                        <div>
                          <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>Market Price</p>
                          <p style={{ color: '#333', fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>
                            {sneaker.marketPrice}
                          </p>
                        </div>
                        <div style={{
                          backgroundColor: sneaker.change.startsWith('+') ? '#4ade80' : '#f87171',
                          color: 'white',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {sneaker.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'catalog' && (
              <div className="catalog-content builder-catalog" style={{ 
                width: '100%',
                minHeight: '832px',
                background: '#FFF',
                position: 'relative'
              }}>
                
                {/* Grain Texture Background */}
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/9701428950dde47ae49b6aabe6b53c89bc8b7882?width=2598"
                  alt=""
                  style={{
                    width: '100%',
                    height: '832px',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    mixBlendMode: 'soft-light',
                    objectFit: 'cover'
                  }}
                />
                
                {/* Main Content */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '50px 52px 50px 111px',
                  position: 'relative',
                  zIndex: 10,
                  minHeight: '832px'
                }}>
                  
                  {/* Left Side - Navigation/Menu */}
                  <div style={{
                    display: 'flex',
                    gap: '41px'
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '24px',
                      fontFamily: '"Beatrice Trial", sans-serif',
                      fontSize: '18px',
                      fontWeight: '400',
                      lineHeight: '1.2',
                      color: '#000'
                    }}>
                      <div style={{ cursor: 'pointer', transition: 'opacity 0.2s ease' }}>Men</div>
                      <div style={{ cursor: 'pointer', transition: 'opacity 0.2s ease' }}>Women</div>
                      <div style={{ cursor: 'pointer', transition: 'opacity 0.2s ease' }}>Kids</div>
                      <div style={{ cursor: 'pointer', transition: 'opacity 0.2s ease' }}>Sale</div>
                    </div>
                  </div>
                  
                  {/* Center - Main Content */}
                  <div style={{
                    textAlign: 'center',
                    maxWidth: '600px'
                  }}>
                    <h1 style={{
                      fontFamily: '"Beatrice Deck Trial", serif',
                      fontSize: '72px',
                      fontWeight: '700',
                      lineHeight: '0.89',
                      color: '#000',
                      margin: '0 0 24px 0',
                      letterSpacing: '-0.02em'
                    }}>
                      Premium Sneaker Collection
                    </h1>
                    
                    <p style={{
                      fontFamily: '"Beatrice Trial", sans-serif',
                      fontSize: '18px',
                      fontWeight: '400',
                      lineHeight: '1.4',
                      color: '#666',
                      margin: '0 0 40px 0',
                      maxWidth: '500px',
                      marginLeft: 'auto',
                      marginRight: 'auto'
                    }}>
                      Discover the latest drops from Nike, Adidas, Jordan, and exclusive limited editions. Find your perfect style from our curated collection.
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      gap: '20px',
                      justifyContent: 'center',
                      flexWrap: 'wrap'
                    }}>
                      <button style={{
                        background: '#000',
                        color: '#FFF',
                        border: 'none',
                        padding: '16px 32px',
                        borderRadius: '8px',
                        fontFamily: '"Beatrice Trial", sans-serif',
                        fontSize: '16px',
                        fontWeight: '400',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}>
                        Shop Now
                      </button>
                      
                      <button style={{
                        background: 'transparent',
                        color: '#000',
                        border: '1px solid #000',
                        padding: '16px 32px',
                        borderRadius: '8px',
                        fontFamily: '"Beatrice Trial", sans-serif',
                        fontSize: '16px',
                        fontWeight: '400',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}>
                        View Catalog
                      </button>
                    </div>
                  </div>
                  
                  {/* Right Side - Featured Product/Info */}
                  <div style={{
                    maxWidth: '300px'
                  }}>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '16px',
                      padding: '32px',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                    }}>
                      <div style={{
                        width: '100%',
                        height: '200px',
                        background: 'linear-gradient(135deg, #f1f3f4 0%, #e8eaf6 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '24px',
                        fontSize: '1.2rem',
                        color: '#666',
                        fontFamily: '"Beatrice Trial", sans-serif'
                      }}>
                        Featured Sneaker
                      </div>
                      
                      <h3 style={{
                        fontFamily: '"Beatrice Deck Trial", serif',
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#000',
                        margin: '0 0 8px 0'
                      }}>
                        Air Jordan 1 Retro
                      </h3>
                      
                      <p style={{
                        fontFamily: '"Beatrice Trial", sans-serif',
                        fontSize: '16px',
                        color: '#666',
                        margin: '0 0 20px 0'
                      }}>
                        High OG "Bred Toe"
                      </p>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{
                          fontFamily: '"Beatrice Deck Trial", serif',
                          fontSize: '28px',
                          fontWeight: '700',
                          color: '#000'
                        }}>
                          $170
                        </div>
                        
                        <button style={{
                          background: '#000',
                          color: '#FFF',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '6px',
                          fontFamily: '"Beatrice Trial", sans-serif',
                          fontSize: '14px',
                          fontWeight: '400',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Category Grid */}
                <div style={{
                  position: 'absolute',
                  bottom: '50px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 11,
                  width: '90%',
                  maxWidth: '1200px'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px'
                  }}>
                    {[
                      { name: 'Basketball', emoji: '🏀', color: '#ff6b6b' },
                      { name: 'Running', emoji: '🏃', color: '#4ecdc4' },
                      { name: 'Lifestyle', emoji: '✨', color: '#45b7d1' },
                      { name: 'Limited', emoji: '🔥', color: '#96ceb4' }
                    ].map((category, index) => (
                      <div key={index} style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(15px)',
                        borderRadius: '12px',
                        padding: '20px',
                        textAlign: 'center',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      className="category-pill">
                        <div style={{
                          fontSize: '2rem',
                          marginBottom: '8px'
                        }}>
                          {category.emoji}
                        </div>
                        
                        <div style={{
                          fontFamily: '"Beatrice Trial", sans-serif',
                          fontSize: '14px',
                          fontWeight: '400',
                          color: '#000'
                        }}>
                          {category.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}