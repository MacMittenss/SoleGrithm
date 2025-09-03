import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const brandsRef = useRef<HTMLDivElement>(null)
  const flagshipRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const splineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero entrance animation
    if (heroRef.current) {
      gsap.fromTo(".hero-text", 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.7)" }
      )
      gsap.fromTo(".heading", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.4 }
      )
    }

    // Brands animation on scroll
    ScrollTrigger.create({
      trigger: brandsRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(".slide-up-animation", 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
        )
      }
    })

    // Flagship features animation on scroll
    ScrollTrigger.create({
      trigger: flagshipRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(".flagship-card-animation", 
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.3, ease: "power3.out" }
        )
      }
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <div className="home-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="fingerprint"></div>
        <div className="circle"></div>
        <div className="w-layout-blockcontainer container w-container">
          <div className="hero-wrapper">
            <h5 className="heading">Welcome To</h5>
            <h1 className="hero-text">SOLEGRITHM</h1>
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
          <div className="hero-overlay"></div>
        </div>
        <div 
          ref={splineRef}
          style={{ opacity: 0 }}
          className="spline" 
          data-animation-type="spline"
          data-spline-url="https://prod.spline.design/fP0LH65i8bXQDQjZ/scene.splinecode"
        >
          <canvas></canvas>
        </div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="section" ref={brandsRef}>
        <div className="w-layout-blockcontainer container padding-4-5rem w-container">
          <div className="space-7rem"></div>
          <div className="brands-wrapper">
            <div className="brands-grid slide-up-animation">
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
            <div className="brands-grid slide-up-animation">
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

      {/* Flagship Features Section */}
      <section className="section flagship-section" ref={flagshipRef} style={{
        backgroundColor: '#050505',
        padding: '6rem 0',
        minHeight: '100vh'
      }}>
        <div className="w-layout-blockcontainer container padding-4-5rem w-container">
          <div className="flagship-wrapper">
            <div className="section-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
              <h2 className="section-title" style={{ 
                fontSize: '3rem', 
                fontWeight: '600', 
                color: '#ffffff', 
                marginBottom: '1rem',
                letterSpacing: '0.05em'
              }}>
                Our Flagship Features
              </h2>
              <p style={{ 
                fontSize: '1.2rem', 
                color: '#d1d5db', 
                maxWidth: '600px', 
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Discover the future of sneaker culture with our innovative community and technology features
              </p>
            </div>
            
            <div className="flagship-features-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
              gap: '3rem',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              
              {/* Women in Sneakers Card */}
              <div className="flagship-card flagship-card-animation" style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '2.5rem',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div className="feature-icon" style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #ff6b9d, #c44569)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      👩‍🦰
                    </div>
                  </div>
                  <h3 className="feature-title" style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '1rem',
                    letterSpacing: '0.02em'
                  }}>
                    Women in Sneakers
                  </h3>
                  <p className="feature-description" style={{
                    fontSize: '1.1rem',
                    color: '#d1d5db',
                    lineHeight: '1.6',
                    marginBottom: '2rem'
                  }}>
                    Celebrating female sneakerheads and women's sneaker culture. Join our community of passionate women who share the love for exclusive kicks and street style.
                  </p>
                </div>
                <div className="feature-action">
                  <a href="/women-in-sneakers" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#ff6b9d',
                    fontSize: '1rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}>
                    Explore Community →
                  </a>
                </div>
              </div>

              {/* AR Try-On Card */}
              <div className="flagship-card flagship-card-animation" style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '2.5rem',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div className="feature-icon" style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      📱
                    </div>
                  </div>
                  <h3 className="feature-title" style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '1rem',
                    letterSpacing: '0.02em'
                  }}>
                    AR Try-On
                  </h3>
                  <p className="feature-description" style={{
                    fontSize: '1.1rem',
                    color: '#d1d5db',
                    lineHeight: '1.6',
                    marginBottom: '2rem'
                  }}>
                    Virtual sneaker experience with advanced AR technology. Try on any sneaker virtually before you buy, using cutting-edge augmented reality.
                  </p>
                </div>
                <div className="feature-action">
                  <a href="/ar-try-on" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#4facfe',
                    fontSize: '1rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}>
                    Try AR Experience →
                  </a>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section" ref={servicesRef}>
        <div className="w-layout-blockcontainer container padding-4-5rem w-container">
          <div className="services-flex">
            <div className="services-wrapper slide-from-left-animation">
              <div className="services-card">
                <div className="services-title-flex">
                  <div className="services-icon">
                    <img
                      alt="sticker mock up"
                      src="/images/Sticker-Mockup.jpg"
                      loading="lazy"
                      className="services-image"
                    />
                  </div>
                  <h4 className="caps">Branding</h4>
                </div>
                <div className="services-text-block">
                  <p className="self-align-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum convallis, dolor sed consectetur gravida.
                  </p>
                </div>
              </div>
              
              <div className="services-card">
                <div className="services-title-flex">
                  <div className="services-icon">
                    <img
                      alt="wall hanging poster"
                      src="/images/Wall-Hanging-Poster.jpg"
                      loading="lazy"
                      className="services-image"
                    />
                  </div>
                  <h4 className="caps">Design</h4>
                </div>
                <div className="services-text-block">
                  <p className="self-align-left">
                    Creative solutions that bring your vision to life with
                    stunning visual impact and user experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}