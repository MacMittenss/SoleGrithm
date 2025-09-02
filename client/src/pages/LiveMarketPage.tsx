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
              <div className="catalog-content">
                <div className="section-header" style={{ marginBottom: '3rem' }}>
                  <h2 style={{ color: '#333', fontSize: '2.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Sneaker Catalog
                  </h2>
                  <p style={{ color: '#666', fontSize: '1.1rem' }}>
                    Browse our comprehensive collection of sneakers with detailed information
                  </p>
                </div>

                <div className="catalog-filters" style={{ marginBottom: '3rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {['All', 'Nike', 'Adidas', 'Jordan', 'New Balance', 'Yeezy'].map((filter) => (
                      <button key={filter} style={{
                        padding: '0.5rem 1.5rem',
                        backgroundColor: filter === 'All' ? '#333' : 'white',
                        color: filter === 'All' ? 'white' : '#333',
                        border: '2px solid #333',
                        borderRadius: '25px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}>
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="catalog-grid" style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                  gap: '2rem'
                }}>
                  {mockSneakers.map((sneaker) => (
                    <div key={sneaker.id} className="catalog-card" style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer'
                    }}>
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
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <p style={{ color: '#333', fontSize: '1.2rem', fontWeight: '600', margin: 0 }}>
                          {sneaker.price}
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {[1,2,3,4,5].map(star => (
                            <span key={star} style={{ color: star <= 4 ? '#fbbf24' : '#d1d5db' }}>★</span>
                          ))}
                        </div>
                      </div>
                      
                      <button style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: '#333',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease'
                      }}>
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}