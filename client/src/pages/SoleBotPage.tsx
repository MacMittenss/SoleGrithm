import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Navbar from '../components/Navbar'

export default function SoleBotPage() {
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
    <div className="solebot-page">
      <Navbar />
      
      <section className="hero-section" ref={pageRef}>
        <div className="w-layout-blockcontainer container w-container">
          <div className="hero-wrapper page-content">
            <h5 className="heading">SoleBot</h5>
            <h1 className="hero-text">SOLEBOT</h1>
            <p className="max-width-30rem">
              AI chat assistant for sneaker recommendations and discovery
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}