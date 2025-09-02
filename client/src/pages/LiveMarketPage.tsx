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
              <div className="catalog-content" style={{ backgroundColor: '#fafafa', minHeight: '600px' }}>
                <div className="catalog-layout" style={{ display: 'flex', gap: '3rem', maxWidth: '1400px', margin: '0 auto' }}>
                  
                  {/* Left Sidebar */}
                  <div className="catalog-sidebar" style={{ 
                    minWidth: '200px',
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '8px',
                    height: 'fit-content',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}>
                    <div className="categories" style={{ marginBottom: '2rem' }}>
                      <h3 style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: '600', 
                        color: '#666', 
                        marginBottom: '1.5rem',
                        letterSpacing: '0.5px'
                      }}>
                        CATEGORIES
                      </h3>
                      {['MEN', 'WOMEN', 'KIDS'].map((category) => (
                        <div key={category} style={{
                          padding: '0.75rem 0',
                          color: '#333',
                          fontSize: '1rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          borderBottom: '1px solid #f0f0f0',
                          transition: 'color 0.2s ease'
                        }}>
                          {category}
                        </div>
                      ))}
                    </div>

                    <div className="search-section">
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        padding: '0.75rem 1rem',
                        border: '1px solid #e9ecef'
                      }}>
                        <svg width="16" height="16" fill="#666" style={{ marginRight: '0.5rem' }}>
                          <circle cx="8" cy="8" r="3" stroke="#666" strokeWidth="1.5" fill="none"/>
                          <path d="m13 13-3-3"/>
                        </svg>
                        <input 
                          type="text" 
                          placeholder="Search" 
                          style={{
                            border: 'none',
                            background: 'transparent',
                            outline: 'none',
                            width: '100%',
                            color: '#333',
                            fontSize: '0.9rem'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="catalog-main" style={{ flex: 1 }}>
                    
                    {/* Collection Header */}
                    <div className="collection-header" style={{ marginBottom: '3rem', backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                          <h1 style={{ 
                            fontSize: '3.5rem', 
                            fontWeight: '800', 
                            color: '#333',
                            margin: '0 0 0.5rem 0',
                            letterSpacing: '-0.02em',
                            lineHeight: '1'
                          }}>
                            NEW<br/>COLLECTION
                          </h1>
                          <p style={{ 
                            color: '#666', 
                            fontSize: '1.1rem',
                            margin: '0 0 2rem 0'
                          }}>
                            Summer 2024
                          </p>
                          
                          <button style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '1rem 2rem',
                            backgroundColor: '#333',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}>
                            Go To Shop
                            <svg width="16" height="16" fill="white">
                              <path d="M8 0L6.5 1.5L12 7H0v2h12l-5.5 5.5L8 16l8-8z"/>
                            </svg>
                          </button>
                        </div>

                        {/* Navigation Arrows */}
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button style={{
                            width: '40px',
                            height: '40px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease'
                          }}>
                            <svg width="16" height="16" fill="#666">
                              <path d="M10 2L4 8l6 6V2z"/>
                            </svg>
                          </button>
                          <button style={{
                            width: '40px',
                            height: '40px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease'
                          }}>
                            <svg width="16" height="16" fill="#666">
                              <path d="M6 2v12l6-6-6-6z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Featured Products Grid */}
                    <div className="featured-products" style={{ marginBottom: '3rem' }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1.5rem'
                      }}>
                        {mockSneakers.slice(0, 6).map((sneaker, index) => (
                          <div key={sneaker.id} style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                          }}
                          className="featured-product-card">
                            
                            <div style={{
                              width: '100%',
                              height: '200px',
                              backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#fff7ed',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              position: 'relative'
                            }}>
                              <div style={{
                                color: '#999',
                                fontSize: '0.9rem',
                                textAlign: 'center'
                              }}>
                                {sneaker.name}
                              </div>
                              
                              {sneaker.trending && (
                                <div style={{
                                  position: 'absolute',
                                  top: '0.75rem',
                                  right: '0.75rem',
                                  backgroundColor: '#ff4757',
                                  color: 'white',
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '12px',
                                  fontSize: '0.7rem',
                                  fontWeight: '600'
                                }}>
                                  NEW
                                </div>
                              )}
                            </div>
                            
                            <div style={{ padding: '1.5rem' }}>
                              <h4 style={{ 
                                fontSize: '1rem', 
                                fontWeight: '600', 
                                color: '#333',
                                margin: '0 0 0.5rem 0'
                              }}>
                                {sneaker.name}
                              </h4>
                              <p style={{ 
                                color: '#666', 
                                fontSize: '0.9rem',
                                margin: '0 0 1rem 0'
                              }}>
                                {sneaker.brand}
                              </p>
                              <div style={{
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                color: '#333'
                              }}>
                                {sneaker.price}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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