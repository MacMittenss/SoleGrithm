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

      {/* Flagship Features Section */}
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

      {/* About Section */}
      <section className="section">
        <div className="w-layout-blockcontainer container w-container">
          <div className="about-hero-wrapper">
            <div className="about-hero-flex">
              <div className="hero-about-image">
                <img
                  alt="About image"
                  loading="lazy"
                  src="/images/vr-lady.jpg"
                  className="hero-about-image"
                />
              </div>
              <div>
                <h3 className="heading-2">About SOLEGRITHM</h3>
                <p className="paragraph">
                  SOLEGRITHM is the ultimate AI-powered sneaker community platform, where passion meets technology. 
                  We're revolutionizing sneaker culture by combining social networking, e-commerce, and cutting-edge 
                  artificial intelligence to create personalized experiences for every sneaker enthusiast.
                </p>
                <p className="paragraph">
                  From AI-driven recommendations to virtual try-on experiences, we're building the future of 
                  sneaker discovery and community connection. Join thousands of sneakerheads who trust SOLEGRITHM 
                  for authentic releases, market insights, and cultural trends.
                </p>
                <a href="/about" className="link-button w-inline-block">
                  <div className="link-button-text">Learn More</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section">
        <div className="w-layout-blockcontainer container padding-4-5rem w-container">
          <div className="services-wrapper">
            <h2 className="heading-2">Our Services</h2>
            <div className="services-flex">
              <div className="services-card">
                <div className="services-icon">
                  <img
                    width="Auto"
                    height="Auto"
                    alt="AI service icon"
                    src="/images/Vectors-Wrapper.svg"
                    loading="lazy"
                    className="services-icon"
                  />
                </div>
                <div className="services-title-flex">
                  <h3 className="services-title">AI Discovery</h3>
                  <div className="services-text-block">
                    <p className="paragraph">
                      Intelligent sneaker recommendations powered by machine learning algorithms 
                      that understand your style preferences and predict market trends.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="services-card">
                <div className="services-icon">
                  <img
                    width="Auto"
                    height="Auto"
                    alt="Community service icon"
                    src="/images/Vectors-Wrapper_1.svg"
                    loading="lazy"
                    className="services-icon"
                  />
                </div>
                <div className="services-title-flex">
                  <h3 className="services-title">Community Platform</h3>
                  <div className="services-text-block">
                    <p className="paragraph">
                      Connect with fellow sneaker enthusiasts, share collections, trade rare finds, 
                      and participate in exclusive community events and releases.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="services-card">
                <div className="services-icon">
                  <img
                    width="Auto"
                    height="Auto"
                    alt="Market service icon" 
                    src="/images/Vectors-Wrapper_2.svg"
                    loading="lazy"
                    className="services-icon"
                  />
                </div>
                <div className="services-title-flex">
                  <h3 className="services-title">Live Market Data</h3>
                  <div className="services-text-block">
                    <p className="paragraph">
                      Real-time price tracking, market analysis, and investment insights 
                      to help you make informed decisions in the sneaker resale market.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="services-card">
                <div className="services-icon">
                  <img
                    width="Auto"
                    height="Auto"
                    alt="AR service icon"
                    src="/images/Vectors-Wrapper_3.svg" 
                    loading="lazy"
                    className="services-icon"
                  />
                </div>
                <div className="services-title-flex">
                  <h3 className="services-title">AR Try-On</h3>
                  <div className="services-text-block">
                    <p className="paragraph">
                      Virtual try-on experiences using augmented reality technology, 
                      allowing you to see how sneakers look and fit before purchase.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section className="section">
        <div className="w-layout-blockcontainer container padding-4-5rem w-container">
          <div className="works-wrapper">
            <div className="works-title-grid">
              <h2 className="heading-2">Featured Collections</h2>
              <div className="works-description">
                <p className="paragraph">
                  Explore our curated collections showcasing the best in sneaker culture, 
                  from limited releases to timeless classics.
                </p>
              </div>
            </div>
            
            <div className="works-grid">
              <div className="works-block">
                <div className="works-link-wrapper">
                  <div className="works-image-wrapper">
                    <img
                      alt="Sneaker collection"
                      loading="lazy"
                      src="/images/AppleWatch.jpg"
                      className="works-image-wrapper"
                    />
                    <div className="works-hover">
                      <div className="works-icon-wrapper">
                        <img
                          width="Auto"
                          height="Auto"
                          alt="view icon"
                          src="/images/arrow_outward.svg"
                          loading="lazy"
                          className="arrow"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="works-text-block">
                    <div className="works-flex">
                      <div className="works-title-wrapper">
                        <h3 className="works-title">Jordan Retro Collection</h3>
                        <div className="works-badge">Limited Edition</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="works-block">
                <div className="works-link-wrapper">
                  <div className="works-image-wrapper">
                    <img
                      alt="Sneaker design"
                      loading="lazy" 
                      src="/images/CreativeDesignStudioX.jpg"
                      className="works-image-wrapper"
                    />
                    <div className="works-hover">
                      <div className="works-icon-wrapper">
                        <img
                          width="Auto"
                          height="Auto"
                          alt="view icon"
                          src="/images/arrow_outward.svg"
                          loading="lazy"
                          className="arrow"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="works-text-block">
                    <div className="works-flex">
                      <div className="works-title-wrapper">
                        <h3 className="works-title">Nike Air Collection</h3>
                        <div className="works-badge">Trending</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="works-block">
                <div className="works-link-wrapper">
                  <div className="works-image-wrapper">
                    <img
                      alt="Portfolio piece"
                      loading="lazy"
                      src="/images/Poster_Mockup.jpg"
                      className="works-image-wrapper"
                    />
                    <div className="works-hover">
                      <div className="works-icon-wrapper">
                        <img
                          width="Auto"
                          height="Auto"
                          alt="view icon"
                          src="/images/arrow_outward.svg"
                          loading="lazy"
                          className="arrow"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="works-text-block">
                    <div className="works-flex">
                      <div className="works-title-wrapper">
                        <h3 className="works-title">Adidas Boost Series</h3>
                        <div className="works-badge">Featured</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="w-layout-blockcontainer container padding-4-5rem w-container">
          <div className="contact-wrapper">
            <div className="contact-flex">
              <div>
                <h2 className="heading-2">Get In Touch</h2>
                <p className="paragraph">
                  Ready to join the SOLEGRITHM community? Have questions about our platform or need support? 
                  We'd love to hear from you.
                </p>
                <div className="contact-info">
                  <p className="paragraph">
                    <strong>Email:</strong> hello@solegrithm.com
                  </p>
                  <p className="paragraph">
                    <strong>Community:</strong> Join our Discord for real-time discussions
                  </p>
                </div>
              </div>
              <div className="contact-form-wrapper">
                <form className="contact-form">
                  <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input
                      className="text-field w-input"
                      maxLength={256}
                      name="name"
                      placeholder="Your Name"
                      type="text"
                      id="name"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input
                      className="text-field w-input"
                      maxLength={256}
                      name="email"
                      placeholder="your@email.com"
                      type="email"
                      id="email"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="message">Message</label>
                    <textarea
                      className="text-field text-area w-input"
                      maxLength={5000}
                      name="message"
                      placeholder="Tell us about your sneaker passion..."
                      id="message"
                      required
                    />
                  </div>
                  <input
                    type="submit"
                    className="submit-button w-button"
                    value="Send Message"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-wrapper">
        <div className="footer-top">
          <div className="w-layout-blockcontainer container w-container">
            <div className="footer-flex">
              <div className="footer-block">
                <div className="footer-logo">
                  <div className="brand-text">SOLEGRITHM</div>
                </div>
                <p className="footer-bottom-text">
                  The ultimate AI-powered sneaker community platform. 
                  Discover, collect, and connect with sneaker culture like never before.
                </p>
              </div>
              
              <div className="footer-block">
                <h4 className="footer-title">Platform</h4>
                <div className="footer-right-flex">
                  <a href="/catalog" className="footer-link">Catalog</a>
                  <a href="/live-market" className="footer-link">Live Market</a>
                  <a href="/discover" className="footer-link">Discover</a>
                  <a href="/collections" className="footer-link">Collections</a>
                  <a href="/blog" className="footer-link">Blog</a>
                </div>
              </div>
              
              <div className="footer-block">
                <h4 className="footer-title">AI Features</h4>
                <div className="footer-right-flex">
                  <a href="/solebot" className="footer-link">SoleBot</a>
                  <a href="/visual-search" className="footer-link">Visual Search</a>
                  <a href="/soleradar" className="footer-link">SoleRadar</a>
                  <a href="/style-quiz" className="footer-link">Style Quiz</a>
                </div>
              </div>
              
              <div className="footer-block">
                <h4 className="footer-title">Community</h4>
                <div className="footer-right-flex">
                  <a href="/ar-tryon" className="footer-link">AR Try-On</a>
                  <a href="/women-in-sneakers" className="footer-link">Women in Sneakers</a>
                  <a href="/sneaker-map" className="footer-link">Sneaker Map</a>
                  <a href="/about" className="footer-link">About</a>
                  <a href="/contact" className="footer-link">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="w-layout-blockcontainer container w-container">
            <div className="footer-flex-bottom">
              <div className="footer-line"></div>
              <p className="footer-bottom-text">
                © 2025 SOLEGRITHM. All rights reserved. | Privacy Policy | Terms of Service
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}