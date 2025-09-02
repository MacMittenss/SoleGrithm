import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Navbar from '../components/Navbar'
import SneakerMapAI from '../components/SneakerMapAI'

export default function SneakerMapPage() {
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
    <div className="sneaker-map-page">
      <Navbar />
      
      <section className="hero-section" ref={pageRef}>
        <div className="w-layout-blockcontainer container w-container">
          <div className="hero-wrapper page-content">
            <h5 className="heading">Sneaker Map</h5>
            <h1 className="hero-text">SNEAKER MAP</h1>
            <p className="max-width-30rem">
              Geographic visualization of sneaker trends across major US cities
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="map-section" style={{ padding: '4rem 0', backgroundColor: '#f8f9fa' }}>
        <div className="w-layout-blockcontainer container w-container">
          <SneakerMapAI />
        </div>
      </section>
    </div>
  )
}