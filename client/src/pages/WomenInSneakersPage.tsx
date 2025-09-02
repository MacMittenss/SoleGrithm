import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Navbar from '../components/Navbar'

export default function WomenInSneakersPage() {
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
    <div className="women-sneakers-page">
      <Navbar />
      
      <section className="hero-section" ref={pageRef}>
        <div className="w-layout-blockcontainer container w-container">
          <div className="hero-wrapper page-content">
            <h5 className="heading">Women in Sneakers</h5>
            <h1 className="hero-text">WOMEN IN SNEAKERS</h1>
            <p className="max-width-30rem">
              Celebrating female sneakerheads and women's sneaker culture
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}