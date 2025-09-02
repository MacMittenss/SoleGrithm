import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Navbar from '../components/Navbar'
import LiveMarketPredictions from '../components/LiveMarketPredictions'

export default function LiveMarketPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(".page-content", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      )
    }
  }, [])

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

      {/* Market Analytics Section */}
      <section className="market-section" style={{ padding: '4rem 0', backgroundColor: '#f8f9fa' }}>
        <div className="w-layout-blockcontainer container w-container">
          <LiveMarketPredictions />
        </div>
      </section>
    </div>
  )
}