import Navbar from '../components/Navbar'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Advanced components from commit hash fcf268da2fcf4194463596d93eb53afdedadda5a
import AdvancedLiveMarket from '../components/advanced/AdvancedLiveMarket'
import AdvancedSoleMap from '../components/advanced/AdvancedSoleMap'
import AdvancedVisualSearch from '../components/advanced/AdvancedVisualSearch'
import AdvancedCollections from '../components/advanced/AdvancedCollections'
import AdvancedLatestStories from '../components/advanced/AdvancedLatestStories'
import SoleRadarSection from '../components/advanced/SoleRadarSection'
import AdvancedFooter from '../components/advanced/AdvancedFooter'

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
      {/* Keep Current Navbar */}
      <Navbar />
      
      {/* Keep Current Hero Section */}
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

      {/* Keep Current Brands Section */}
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

      {/* Keep Current Flagship Features Section */}
      <section style={{
        backgroundColor: '#050505',
        padding: '6rem 0',
        minHeight: '50vh'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <h2 style={{ 
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
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
            gap: '3rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            
            {/* SoleBot AI Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '20px',
              padding: '2.5rem',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    🤖
                  </div>
                </div>
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '1rem'
                }}>
                  SoleBot AI
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#d1d5db',
                  lineHeight: '1.6',
                  marginBottom: '2rem'
                }}>
                  Your intelligent sneaker assistant. Get personalized recommendations, style advice, and instant answers about sneaker culture, trends, and releases.
                </p>
              </div>
              <div>
                <a href="/solebot" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#667eea',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}>
                  Chat with SoleBot →
                </a>
              </div>
            </div>

            {/* Live Market Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '20px',
              padding: '2.5rem',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    📈
                  </div>
                </div>
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '1rem'
                }}>
                  Live Market
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#d1d5db',
                  lineHeight: '1.6',
                  marginBottom: '2rem'
                }}>
                  Real-time sneaker market data and price tracking. Get live updates on releases, resale prices, and investment opportunities across major platforms.
                </p>
              </div>
              <div>
                <a href="/live-market" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#f093fb',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}>
                  View Live Data →
                </a>
              </div>
            </div>

            {/* AR Try-On Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '20px',
              padding: '2.5rem',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
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
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '1rem'
                }}>
                  AR Try-On
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#d1d5db',
                  lineHeight: '1.6',
                  marginBottom: '2rem'
                }}>
                  Virtual sneaker experience with advanced AR technology. Try on any sneaker virtually before you buy, using cutting-edge augmented reality.
                </p>
              </div>
              <div>
                <a href="/ar-try-on" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#4facfe',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}>
                  Try AR Experience →
                </a>
              </div>
            </div>

            {/* Women in Sneakers Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '20px',
              padding: '2.5rem',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
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
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '1rem'
                }}>
                  Women in Sneakers
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#d1d5db',
                  lineHeight: '1.6',
                  marginBottom: '2rem'
                }}>
                  Celebrating female sneakerheads and women's sneaker culture. Join our community of passionate women who share the love for exclusive kicks and street style.
                </p>
              </div>
              <div>
                <a href="/women-in-sneakers" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#ff6b9d',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}>
                  Explore Community →
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Advanced Live Market Section */}
      <AdvancedLiveMarket />

      {/* Advanced SoleMap Section */}
      <AdvancedSoleMap />

      {/* Advanced Visual Search Section */}
      <AdvancedVisualSearch />

      {/* Advanced Collections Section */}
      <AdvancedCollections />

      {/* Advanced Latest Stories Section */}
      <AdvancedLatestStories />

      {/* SoleRadar Section */}
      <SoleRadarSection />

      {/* Advanced Footer Section */}
      <AdvancedFooter />

    </div>
  )
}