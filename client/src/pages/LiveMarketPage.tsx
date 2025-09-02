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
              <div className="catalog-content builder-inspired" style={{ 
                flex: 1,
                width: '100%',
                height: '100vh',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Full-screen background image */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: 'url(https://api.builder.io/api/v1/image/assets/TEMP/eb31eb5ad05104dd9ea0ff4e45358086ad4a2ff1?placeholderIfAbsent=true&apiKey=d7a59c268b1d457db5e1952ba6299412)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }} />
                
                {/* Content overlay - centered catalog showcase */}
                <div style={{
                  position: 'relative',
                  zIndex: 10,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '2rem',
                  background: 'rgba(0, 0, 0, 0.2)'
                }}>
                  
                  {/* Central Hero Content */}
                  <div style={{
                    textAlign: 'center',
                    maxWidth: '800px',
                    margin: '0 auto'
                  }}>
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '30px',
                      padding: '4rem 3rem',
                      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15)',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}>
                      <h1 style={{
                        fontSize: '4.5rem',
                        fontWeight: '900',
                        color: '#1a1a1a',
                        margin: '0 0 1.5rem 0',
                        letterSpacing: '-0.04em',
                        lineHeight: '0.9',
                        background: 'linear-gradient(135deg, #1a1a1a 0%, #667eea 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        SNEAKER
                        <br/>
                        CATALOG
                      </h1>
                      
                      <p style={{
                        fontSize: '1.3rem',
                        color: '#666',
                        margin: '0 0 3rem 0',
                        lineHeight: '1.6',
                        fontWeight: '400'
                      }}>
                        Discover premium sneakers from the world's top brands.<br/>
                        Find your perfect fit and make your statement.
                      </p>
                      
                      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '1.2rem 3rem',
                          borderRadius: '50px',
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem'
                        }}>
                          Browse Collection
                          <svg width="20" height="20" fill="white">
                            <path d="M8 0L6.5 1.5L12 7H0v2h12l-5.5 5.5L8 16l8-8z"/>
                          </svg>
                        </button>
                        
                        <button style={{
                          background: 'rgba(255, 255, 255, 0.8)',
                          color: '#667eea',
                          border: '2px solid rgba(102, 126, 234, 0.3)',
                          padding: '1.2rem 3rem',
                          borderRadius: '50px',
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.3s ease'
                        }}>
                          New Arrivals
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Featured Categories */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '4rem auto 0 auto',
                    width: '100%'
                  }}>
                    {[
                      { name: 'Air Jordan Collection', count: '120+ styles', color: '#ff6b6b' },
                      { name: 'Yeezy Exclusives', count: '85+ styles', color: '#4ecdc4' },
                      { name: 'Nike Classics', count: '200+ styles', color: '#45b7d1' },
                      { name: 'Limited Editions', count: '45+ styles', color: '#96ceb4' }
                    ].map((category, index) => (
                      <div key={index} style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(15px)',
                        borderRadius: '20px',
                        padding: '2rem',
                        textAlign: 'center',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      className="category-card">
                        <div style={{
                          width: '80px',
                          height: '80px',
                          background: `linear-gradient(135deg, ${category.color}, ${category.color}88)`,
                          borderRadius: '50%',
                          margin: '0 auto 1.5rem auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2rem',
                          boxShadow: `0 10px 25px ${category.color}40`
                        }}>
                          👟
                        </div>
                        
                        <h3 style={{
                          fontSize: '1.2rem',
                          fontWeight: '700',
                          color: '#1a1a1a',
                          margin: '0 0 0.5rem 0'
                        }}>
                          {category.name}
                        </h3>
                        
                        <p style={{
                          fontSize: '0.9rem',
                          color: '#666',
                          margin: 0
                        }}>
                          {category.count}
                        </p>
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