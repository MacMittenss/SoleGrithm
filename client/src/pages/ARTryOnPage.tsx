import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Navbar from '../components/Navbar'
import ARTryOnExperience from '../components/ARTryOnExperience'

export default function ARTryOnPage() {
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
    <div className="ar-tryon-page">
      <Navbar />
      
      <section className="hero-section" ref={pageRef}>
        <div className="w-layout-blockcontainer container w-container">
          <div className="hero-wrapper page-content">
            <h5 className="heading">AR Try-On</h5>
            <h1 className="hero-text">AR TRY-ON</h1>
            <p className="max-width-30rem">
              Virtual sneaker experience with advanced AR technology
            </p>
          </div>
        </div>
      </section>

      {/* AR Experience Section */}
      <section className="ar-section" style={{ padding: '4rem 0', backgroundColor: '#f8f9fa' }}>
        <div className="w-layout-blockcontainer container w-container">
          <ARTryOnExperience />
        </div>
      </section>
    </div>
  )
}