export default function Home() {
  return (
    <div>
      {/* Navigation */}
      <div className="navbar w-nav">
        <a href="#" className="logo-link-wrapper w-nav-brand">
          <img 
            width="Auto" 
            height="Auto" 
            alt="logo" 
            src="/images/iDesigner.png" 
            loading="eager" 
            className="logo" 
          />
        </a>
        <div className="nav-container w-container">
          <nav role="navigation" className="nav-menu w-nav-menu">
            <div className="nav-link-wrapper">
              <a href="#" className="nav-link w-nav-link">Home</a>
              <a href="#" className="nav-link move-down hide-on-tab w-nav-link">Home</a>
            </div>
            <div className="nav-link-wrapper">
              <a href="#" className="nav-link w-nav-link">About</a>
              <a href="#" className="nav-link move-down hide-on-tab w-nav-link">About</a>
            </div>
            <div className="nav-link-wrapper">
              <a href="#" className="nav-link w-nav-link">Works</a>
              <a href="#" className="nav-link move-down hide-on-tab w-nav-link">Works</a>
            </div>
            <div className="nav-link-wrapper">
              <a href="#" className="nav-link w-nav-link">Contact</a>
              <a href="#" className="nav-link move-down hide-on-tab w-nav-link">Contact</a>
            </div>
          </nav>
          <div className="menu-button w-nav-button">
            <div className="burger-icon w-icon-nav-menu"></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="fingerprint"></div>
        <div className="circle"></div>
        <div className="w-layout-blockcontainer container w-container">
          <div className="hero-wrapper">
            <h5 className="heading">Welcome</h5>
            <h1 className="hero-text">iDESIGNER</h1>
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
        <div className="spline" style={{ opacity: 0 }}>
          <canvas></canvas>
        </div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="section">
        <div className="w-layout-blockcontainer container padding-4-5rem w-container">
          <div className="space-7rem"></div>
          <div className="brands-wrapper">
            <div className="brands-grid slide-up-animation">
              <div className="logos-wrapper">
                <img
                  width="Auto"
                  height="Auto"
                  alt="brand logo"
                  src="/images/load.png"
                  loading="eager"
                />
              </div>
              <div className="logos-wrapper">
                <img
                  loading="eager"
                  src="/images/logowithname3.png"
                  alt="brand logo"
                />
              </div>
              <div className="logos-wrapper">
                <img
                  loading="eager"
                  src="/images/logowithname2.png"
                  alt="brand logo"
                />
              </div>
              <div className="logos-wrapper">
                <img
                  loading="eager"
                  src="/images/logowithname1.png"
                  alt="brand logo"
                />
              </div>
            </div>
            <div className="brands-grid slide-up-animation">
              <div className="logos-wrapper">
                <img
                  loading="eager"
                  src="/images/logowithname1.png"
                  alt="brand logo"
                />
              </div>
              <div className="logos-wrapper">
                <img
                  loading="eager"
                  src="/images/logowithname2.png"
                  alt="brand logo"
                />
              </div>
              <div className="logos-wrapper">
                <img
                  loading="eager"
                  src="/images/logowithname3.png"
                  alt="brand logo"
                />
              </div>
              <div className="logos-wrapper">
                <img
                  width="Auto"
                  height="Auto"
                  alt="brand logo"
                  src="/images/load.png"
                  loading="eager"
                />
              </div>
            </div>
          </div>
          <div className="space-7rem"></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section">
        <div className="w-layout-blockcontainer container padding-4-5rem w-container">
          <div className="services-flex">
            <div className="services-wrapper slide-from-left-animation">
              <div className="services-card">
                <div className="services-title-flex">
                  <div className="services-icon">
                    <img
                      src="/images/Sticker-Mockup.jpg"
                      alt="sticker mock up"
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
                      src="/images/Wall-Hanging-Poster.jpg"
                      alt="wall hanging poster"
                      loading="lazy"
                      className="services-image"
                    />
                  </div>
                  <h4 className="caps">Marketing</h4>
                </div>
                <div className="services-text-block">
                  <p className="self-align-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum convallis, dolor sed consectetur gravida.
                  </p>
                </div>
              </div>
              <p className="max-width-30rem">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum convallis, dolor sed consectetur gravida.
              </p>
            </div>
            <div className="services-wrapper slide-from-right-animation">
              <h5>Creative Solutions</h5>
              <h2 className="services-title">SERVICES</h2>
              <div className="services-card">
                <div className="services-title-flex">
                  <div className="services-icon">
                    <img
                      src="/images/CreativeDesignStudioX.jpg"
                      alt="design studio"
                      loading="lazy"
                      className="services-image"
                    />
                  </div>
                  <h4 className="caps">Design</h4>
                </div>
                <div className="services-text-block">
                  <p className="self-align-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum convallis, dolor sed consectetur gravida.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}