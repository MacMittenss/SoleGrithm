import Navbar from '../components/Navbar'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Declare the spline-viewer custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': {
        url: string;
        style?: React.CSSProperties;
        background?: string;
        className?: string;
      };
    }
  }
}

export default function HomePage() {
  const heroTextRef = useRef<HTMLHeadingElement>(null)
  const welcomeTextRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    // Robot-synced zoom animation for SOLEGRITHM text
    if (heroTextRef.current && welcomeTextRef.current) {
      const tl = gsap.timeline({ delay: 1.2 }) // Start when robot animation starts
      
      // Split SOLEGRITHM into individual letters
      const text = heroTextRef.current
      const letters = text.textContent?.split('') || []
      text.innerHTML = letters.map((letter) => 
        `<span style="display: inline-block; opacity: 0; transform: scale(2.5) translateZ(0);">${letter}</span>`
      ).join('')

      // Set welcome text initial state
      gsap.set(welcomeTextRef.current, { opacity: 0, scale: 2.5 })

      // Animate welcome text with zoom-out effect
      tl.to(welcomeTextRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2.5,
        ease: "expo.out"
      })
      
      // Animate SOLEGRITHM letters with synchronized zoom-out
      .to(text.querySelectorAll('span'), {
        opacity: 1,
        scale: 1,
        duration: 2.5,
        ease: "expo.out",
        stagger: 0.02
      }, "-=2.3") // Start slightly after welcome text
    }
  }, [])

  return (
    <div className="home-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="fingerprint"></div>
        <div className="circle"></div>
        <div className="w-layout-blockcontainer container w-container">
          <div className="hero-wrapper">
            <h5 ref={welcomeTextRef} className="heading">Welcome To</h5>
            <h1 ref={heroTextRef} className="hero-text">SOLEGRITHM</h1>
            <a href="#brands" className="arrow-border-wrapper w-inline-block">
              <div className="icon-wrapper">
                <img
                  width="Auto"
                  height="Auto"
                  alt="arrow up"
                  src="/images/arrow_outward.svg"
                  loading="eager"
                  className="arrow"
                />
              </div>
            </a>
          </div>
        </div>
        <div className="spline">
          <iframe 
            src="https://my.spline.design/nexbotrobotcharacterconcept-MuKFwn44xdQzWJqISlDVY35e/" 
            frameBorder="0" 
            width="100%" 
            height="100%"
            style={{ 
              width: '100%', 
              height: '100%', 
              background: 'transparent'
            }}
          />
        </div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="section">
        <div className="w-layout-blockcontainer container padding-4-5rem w-container">
          <div className="space-7rem"></div>
          <div className="brands-wrapper">
            <div className="brands-grid">
              <div className="logos-wrapper">
                <img alt="brand logo" src="/images/load.png" loading="eager" />
              </div>
              <div className="logos-wrapper">
                <img loading="eager" src="/images/logowithname3.png" alt="brand logo" />
              </div>
              <div className="logos-wrapper">
                <img loading="eager" src="/images/logowithname2.png" alt="brand logo" />
              </div>
              <div className="logos-wrapper">
                <img loading="eager" src="/images/logowithname1.png" alt="brand logo" />
              </div>
            </div>
            <div className="brands-grid">
              <div className="logos-wrapper">
                <img loading="eager" src="/images/logowithname1.png" alt="brand logo" />
              </div>
              <div className="logos-wrapper">
                <img loading="eager" src="/images/logowithname2.png" alt="brand logo" />
              </div>
              <div className="logos-wrapper">
                <img loading="eager" src="/images/logowithname3.png" alt="brand logo" />
              </div>
              <div className="logos-wrapper">
                <img alt="brand logo" src="/images/load.png" loading="eager" />
              </div>
            </div>
          </div>
          <div className="space-7rem"></div>
        </div>
      </section>

      {/* Ready to add advanced sections one by one */}
      <section style={{padding: '4rem 0', textAlign: 'center', background: '#050505'}}>
        <h2 style={{color: 'white', fontSize: '2rem'}}>Ready to Add Advanced Sections</h2>
        <p style={{color: '#d1d5db', fontSize: '1.2rem', marginTop: '1rem'}}>
          Base homepage loaded successfully. Ready for section-by-section restoration.
        </p>
      </section>

    </div>
  )
}