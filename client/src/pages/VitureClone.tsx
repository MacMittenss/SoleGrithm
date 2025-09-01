import React, { useEffect } from 'react';

const VitureClone: React.FC = () => {
  useEffect(() => {
    // Load CSS files
    const cssFiles = [
      '/viture-assets/d57423685d7b7d2e.css',
      '/viture-assets/5331630ef1684561.css', 
      '/viture-assets/4a37cdf03fa4b498.css'
    ];

    const loadedStyles: HTMLLinkElement[] = [];

    cssFiles.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
      loadedStyles.push(link);
    });

    // Skip loading JS files to avoid syntax errors
    const loadedScripts: HTMLScriptElement[] = [];

    // Apply HTML class and data attributes to the html element
    const htmlElement = document.documentElement;
    htmlElement.className = 'seasonsans_9afeb835-module__ePkFSq__variable font-season dev';
    htmlElement.setAttribute('data-theme', 'dark');
    htmlElement.style.setProperty('--vw', '25.6px');
    htmlElement.style.setProperty('--dvh', '12.88px');
    htmlElement.style.setProperty('--svh', '12.88px');
    htmlElement.style.setProperty('--lvh', '1vh');
    htmlElement.style.setProperty('--scrollbar-width', '11px');

    // Cleanup function
    return () => {
      loadedStyles.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
      loadedScripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
      
      // Restore original html element state
      htmlElement.className = '';
      htmlElement.removeAttribute('data-theme');
      htmlElement.style.removeProperty('--vw');
      htmlElement.style.removeProperty('--dvh');
      htmlElement.style.removeProperty('--svh');
      htmlElement.style.removeProperty('--lvh');
      htmlElement.style.removeProperty('--scrollbar-width');
    };
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        color: '#fff',
        zIndex: 9999,
        overflow: 'auto',
        fontFamily: 'seasonSans, Arial, sans-serif'
      }}
    >
      {/* Hide existing navbar */}
      <style>{`
        header { display: none !important; }
        body { margin: 0; padding: 0; }
      `}</style>

      {/* VITURE Navigation */}
      <nav style={{
        position: 'fixed',
        top: '2.91667vw',
        left: 0,
        width: '100%',
        height: '3.38542vw',
        zIndex: 999,
        pointerEvents: 'none'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
          padding: '0 3.125vw',
          position: 'relative'
        }}>
          <a href="/" style={{
            color: '#fff',
            textDecoration: 'none',
            lineHeight: 1,
            fontSize: '1.04167vw',
            fontWeight: 600,
            pointerEvents: 'auto'
          }}>VITURE</a>
          
          <div style={{ display: 'flex', gap: '2.08333vw', pointerEvents: 'auto' }}>
            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.625vw', fontWeight: 600, textTransform: 'uppercase' }}>Products</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.625vw', fontWeight: 600, textTransform: 'uppercase' }}>Technology</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.625vw', fontWeight: 600, textTransform: 'uppercase' }}>Support</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.625vw', fontWeight: 600, textTransform: 'uppercase' }}>Company</a>
          </div>
        </div>
      </nav>

      {/* Mobile Banner */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 'fit-content',
        backgroundColor: '#000',
        zIndex: 999,
        overflow: 'hidden',
        animation: 'scroll 10s linear infinite',
        whiteSpace: 'nowrap'
      }}>
        <div style={{
          display: 'flex',
          height: 'fit-content',
          padding: '3.2vw 0',
          gap: '10.6667vw'
        }}>
          <div style={{ whiteSpace: 'nowrap' }}>
            <p style={{
              color: '#fff',
              textAlign: 'center',
              paddingRight: '10.6667vw',
              fontSize: '2.66667vw',
              fontWeight: 400,
              lineHeight: 1.5,
              margin: 0
            }}>
              <span>Leading the Way in XR:&nbsp;</span>
              <span style={{
                fontWeight: 700,
                color: 'transparent',
                backgroundImage: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text'
              }}>
                Best Display, Best Features
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ paddingTop: '100px' }}>
        {/* Hero Section */}
        <section style={{
          backgroundColor: '#000',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 20px'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              fontWeight: 700,
              margin: '0 0 1rem 0',
              background: 'linear-gradient(90deg, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent'
            }}>
              VITURE One
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              color: '#fff',
              opacity: 0.8,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              The world's first XR glasses with Electrochromic Film technology
            </p>
          </div>

          {/* Product Showcase */}
          <div style={{
            width: 'clamp(300px, 50vw, 800px)',
            height: 'clamp(200px, 30vw, 400px)',
            background: 'linear-gradient(45deg, #ff2900, #fe7a60, #581dff)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(1rem, 3vw, 2rem)',
            color: '#fff',
            fontWeight: 600,
            marginBottom: '2rem'
          }}>
            VITURE One XR Glasses
          </div>

          {/* CTA Button */}
          <button style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50px',
            color: '#fff',
            padding: '15px 30px',
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'linear-gradient(90deg, #ff2900 0%, #fe7a60 61%, #581dff 100%)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          }}>
            Experience the Future
          </button>
        </section>

        {/* Features Section */}
        <section style={{
          backgroundColor: '#000',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '100px 20px'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 700,
            marginBottom: '3rem',
            background: 'linear-gradient(90deg, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            textAlign: 'center'
          }}>
            Next Generation Display
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            width: '100%'
          }}>
            {[
              { title: '4K Micro-OLED', desc: 'Crystal clear visuals with unprecedented detail' },
              { title: 'Electrochromic Film', desc: 'Revolutionary transparency control technology' },
              { title: 'Spatial Computing', desc: 'Immersive AR experiences anywhere' }
            ].map((feature, i) => (
              <div key={i} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: '1rem'
                }}>{feature.title}</h3>
                <p style={{
                  color: '#fff',
                  opacity: 0.7,
                  lineHeight: 1.6
                }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Background Gradient */}
      <div style={{
        position: 'fixed',
        bottom: '-20vw',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '125vw',
        height: '62.5vw',
        background: 'linear-gradient(90deg, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
        borderRadius: '50%',
        filter: 'blur(104px)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />
    </div>
  );
};

export default VitureClone;