import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Navbar from '../components/Navbar'
import LiveMarketPredictions from '../components/LiveMarketPredictions'
import CatalogPage from './CatalogPage'

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
                {/* Background Texture */}
                <div 
                  className="absolute inset-0 w-full h-full opacity-20 mix-blend-soft-light -z-10"
                  style={{
                    backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/9701428950dde47ae49b6aabe6b53c89bc8b7882?width=2598')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}
                />
                
                {/* Catalog Header */}
                <div className="catalog-header mb-8">
                  <div className="flex items-center justify-between px-6 md:px-12 py-8 bg-white/80 backdrop-blur-sm rounded-lg">
                    {/* Navigation */}
                    <nav className="hidden md:flex gap-10">
                      <a href="#" className="text-black font-beatrice-deck text-sm font-medium tracking-wider uppercase hover:opacity-70 transition-opacity">
                        Home
                      </a>
                      <a href="#" className="text-black font-beatrice-deck text-sm font-medium tracking-wider uppercase hover:opacity-70 transition-opacity">
                        Collections
                      </a>
                      <a href="#" className="text-black font-beatrice-deck text-sm font-medium tracking-wider uppercase hover:opacity-70 transition-opacity">
                        New
                      </a>
                    </nav>

                    {/* Center Logo */}
                    <div className="flex-1 text-center">
                      <h1 className="text-black font-beatrice-deck text-2xl font-bold tracking-wider uppercase">
                        SOLEGRITHM
                      </h1>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center gap-6">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                        <circle cx="11" cy="11" r="8" stroke="black" strokeWidth="2"/>
                        <path d="m21 21-4.35-4.35" stroke="black" strokeWidth="2"/>
                      </svg>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                        <circle cx="8" cy="21" r="1" stroke="black" strokeWidth="2"/>
                        <circle cx="19" cy="21" r="1" stroke="black" strokeWidth="2"/>
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L21.16 9H5.12" stroke="black" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex gap-10 px-6 md:px-12">
                  {/* Filters Sidebar */}
                  <div className="hidden lg:block w-80 bg-white/80 backdrop-blur-sm rounded-lg p-6">
                    <div className="space-y-8">
                      {/* Size Filter */}
                      <div>
                        <h3 className="text-black font-beatrice-deck text-sm font-bold tracking-wider uppercase mb-4">
                          Size
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                          {['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'].map((size) => (
                            <button
                              key={size}
                              className="p-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-beatrice-deck font-medium"
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Category Filter */}
                      <div>
                        <h3 className="text-black font-beatrice-deck text-sm font-bold tracking-wider uppercase mb-4">
                          Category
                        </h3>
                        <div className="space-y-3">
                          {['Basketball', 'Running', 'Lifestyle', 'Soccer', 'Skateboarding'].map((category) => (
                            <label key={category} className="flex items-center gap-3">
                              <input type="checkbox" className="w-4 h-4" />
                              <span className="text-black font-beatrice-deck text-sm font-medium tracking-wider">
                                {category}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Brand Filter */}
                      <div>
                        <h3 className="text-black font-beatrice-deck text-sm font-bold tracking-wider uppercase mb-4">
                          Brand
                        </h3>
                        <div className="space-y-3">
                          {['Nike', 'Adidas', 'Jordan', 'New Balance', 'Puma'].map((brand) => (
                            <label key={brand} className="flex items-center gap-3">
                              <input type="checkbox" className="w-4 h-4" />
                              <span className="text-black font-beatrice-deck text-sm font-medium tracking-wider">
                                {brand}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Grid */}
                  <div className="flex-1">
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="text-black font-beatrice-deck text-xl font-bold tracking-wider uppercase">
                        Sneakers
                      </h2>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600 font-beatrice text-sm">
                          Showing {mockSneakers.length} products
                        </span>
                        <select className="border border-gray-300 rounded px-3 py-1 text-sm font-beatrice">
                          <option>Sort by: Featured</option>
                          <option>Price: Low to High</option>
                          <option>Price: High to Low</option>
                          <option>Newest</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {mockSneakers.map((sneaker) => (
                        <div key={sneaker.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                          <div className="aspect-square bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-500 font-beatrice text-sm">Sneaker Image</span>
                          </div>
                          <div className="p-4">
                            <h3 className="font-beatrice-deck font-bold text-sm tracking-wider uppercase text-black mb-1">
                              {sneaker.name}
                            </h3>
                            <p className="text-gray-600 font-beatrice text-sm mb-3">
                              {sneaker.brand}
                            </p>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-500 font-beatrice text-xs">Market Price</p>
                                <p className="font-beatrice-deck font-bold text-lg text-black">
                                  {sneaker.marketPrice}
                                </p>
                              </div>
                              <div className={`px-2 py-1 rounded text-xs font-beatrice-deck font-bold ${
                                sneaker.change.startsWith('+') 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {sneaker.change}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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