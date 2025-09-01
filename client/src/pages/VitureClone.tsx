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
        {/* Section 1 - Hero */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '100px 20px',
          position: 'relative'
        }}>
          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{
              fontSize: 'clamp(4rem, 12vw, 12rem)',
              fontWeight: 700,
              margin: '0 0 2rem 0',
              background: 'linear-gradient(90deg, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              position: 'relative'
            }}>
              VITURE One
            </h1>
            <p style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
              color: '#fff',
              opacity: 0.9,
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.4
            }}>
              The world's first XR glasses with Electrochromic Film technology
            </p>
          </div>
          <div style={{
            width: 'clamp(400px, 70vw, 1000px)',
            height: 'clamp(250px, 40vw, 500px)',
            background: 'linear-gradient(45deg, #ff2900, #fe7a60, #581dff)',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            color: '#fff',
            fontWeight: 600,
            marginBottom: '3rem'
          }}>
            VITURE One XR Glasses
          </div>
        </section>

        {/* Section 2 - Next Generation Display */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '100px 20px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              fontWeight: 700,
              margin: '0 0 2rem 0',
              background: 'linear-gradient(90deg, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent'
            }}>
              Next Generation Display
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              color: '#fff',
              opacity: 0.8,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Experience the future of visual technology with our revolutionary XR display
            </p>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '30px',
            padding: '3rem',
            textAlign: 'center',
            maxWidth: '600px'
          }}>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '1rem'
            }}>4K Micro-OLED</h3>
            <p style={{
              color: '#fff',
              opacity: 0.7,
              lineHeight: 1.6,
              fontSize: '1.1rem'
            }}>Crystal clear visuals with unprecedented detail and color accuracy</p>
          </div>
        </section>

        {/* Section 10 - Immersive Experience */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '100px 20px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              fontWeight: 700,
              margin: '0 0 2rem 0',
              background: 'linear-gradient(90deg, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent'
            }}>
              Immersive Experience
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              color: '#fff',
              opacity: 0.8,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Step into a new reality with VITURE XR technology
            </p>
          </div>
          <div style={{
            width: '100%',
            height: 'clamp(300px, 50vw, 600px)',
            background: 'linear-gradient(135deg, #000 0%, #ff2900 50%, #581dff 100%)',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 600,
            maxWidth: '1200px'
          }}>
            XR Experience
          </div>
        </section>

        {/* Section 11 - Advanced Features */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '100px 20px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              fontWeight: 700,
              margin: '0 0 2rem 0',
              background: 'linear-gradient(90deg, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent'
            }}>
              Advanced Features
            </h2>
          </div>
          <div style={{
            display: 'flex',
            gap: '4rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[
              { icon: '●', label: 'Precision Tracking' },
              { icon: '■', label: 'High Resolution' },
              { icon: '▲', label: 'Ultra Lightweight' }
            ].map((feature, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(45deg, #ff2900, #fe7a60, #581dff)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  color: '#fff',
                  fontWeight: 600
                }}>
                  {feature.icon}
                </div>
                <p style={{
                  color: '#fff',
                  fontSize: '1.1rem',
                  fontWeight: 500
                }}>{feature.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 18 - Product Line */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '100px 20px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              fontWeight: 700,
              margin: '0 0 2rem 0',
              background: 'linear-gradient(90deg, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent'
            }}>
              Product Line
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '3rem',
            maxWidth: '1200px',
            width: '100%'
          }}>
            {[
              { name: 'VITURE One', subtitle: 'XR Glasses', gradient: 'linear-gradient(45deg, #ff2900, #fe7a60)' },
              { name: 'VITURE Pro', subtitle: 'Professional XR', gradient: 'linear-gradient(45deg, #fe7a60, #581dff)' },
              { name: 'VITURE Station', subtitle: 'Docking Station', gradient: 'linear-gradient(45deg, #581dff, #ff2900)' }
            ].map((product, i) => (
              <div key={i} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '30px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <div style={{
                  background: product.gradient,
                  borderRadius: '20px',
                  height: '250px',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  color: '#fff',
                  fontWeight: 600
                }}>
                  {product.name}
                </div>
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: '0.5rem'
                }}>{product.name}</h3>
                <p style={{
                  color: '#fff',
                  opacity: 0.7,
                  fontSize: '1rem'
                }}>{product.subtitle}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 20 - Final CTA */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '100px 20px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              fontWeight: 700,
              margin: '0 0 2rem 0',
              background: 'linear-gradient(90deg, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent'
            }}>
              Experience the Future
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              color: '#fff',
              opacity: 0.8,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Join the XR revolution with VITURE's next-generation technology
            </p>
          </div>
          <button style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50px',
            color: '#fff',
            padding: '20px 40px',
            fontSize: '1.2rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            letterSpacing: '1px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'linear-gradient(90deg, #ff2900 0%, #fe7a60 61%, #581dff 100%)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          }}>
            Get Started
          </button>
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