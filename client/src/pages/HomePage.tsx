import Navbar from '../components/Navbar'

export default function HomePage() {
  return (
    <div className="home-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
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
        </div>
        <div 
          className="spline" 
          data-animation-type="spline"
          data-spline-url="https://prod.spline.design/fP0LH65i8bXQDQjZ/scene.splinecode"
        >
          <canvas></canvas>
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

      
      <div style={{ backgroundColor: 'black', padding: '4rem 0', color: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Our Flagship Features</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', maxWidth: '1000px', margin: '0 auto', flexWrap: 'wrap' }}>
          
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '2rem', 
            borderRadius: '15px',
            width: '400px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👩‍🦰</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Women in Sneakers</h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
              Celebrating female sneakerheads and women's sneaker culture. Join our community of passionate women.
            </p>
            <a href="/women-in-sneakers" style={{ color: '#ff6b9d', textDecoration: 'none' }}>
              Explore Community →
            </a>
          </div>

          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '2rem', 
            borderRadius: '15px',
            width: '400px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📱</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AR Try-On</h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
              Virtual sneaker experience with advanced AR technology. Try on any sneaker virtually before you buy.
            </p>
            <a href="/ar-try-on" style={{ color: '#4facfe', textDecoration: 'none' }}>
              Try AR Experience →
            </a>
          </div>
          
        </div>
      </div>
    </div>
  )
}