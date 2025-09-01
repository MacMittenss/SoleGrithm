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
      link.setAttribute('data-precedence', 'next');
      document.head.appendChild(link);
      loadedStyles.push(link);
    });

    // Skip loading JS files to avoid syntax errors
    const loadedScripts: HTMLScriptElement[] = [];

    // Apply HTML class and data attributes to the html element
    const htmlElement = document.documentElement;
    htmlElement.className = 'seasonsans_9afeb835-module__ePkFSq__variable font-season dev';
    htmlElement.setAttribute('lang', 'en');
    htmlElement.setAttribute('dir', 'ltr');
    htmlElement.setAttribute('data-theme', 'dark');
    htmlElement.style.setProperty('--vw', '25.6px');
    htmlElement.style.setProperty('--dvh', '12.88px');
    htmlElement.style.setProperty('--svh', '12.88px');
    htmlElement.style.setProperty('--lvh', '1vh');
    htmlElement.style.setProperty('--scrollbar-width', '11px');

    return () => {
      // Cleanup
      loadedStyles.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
      loadedScripts.forEach(script => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      });
      
      // Reset HTML element
      htmlElement.className = '';
      htmlElement.removeAttribute('lang');
      htmlElement.removeAttribute('dir');
      htmlElement.removeAttribute('data-theme');
      htmlElement.style.removeProperty('--vw');
      htmlElement.style.removeProperty('--dvh');
      htmlElement.style.removeProperty('--svh');
      htmlElement.style.removeProperty('--lvh');
      htmlElement.style.removeProperty('--scrollbar-width');
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
      color: '#fff',
      zIndex: 9999,
      overflow: 'auto'
    }}>
      {/* Hide existing navbar */}
      <style>{`
        header { display: none !important; }
        body { margin: 0; padding: 0; }
      `}</style>

      {/* Banner Mobile - First */}
      <div className="banner-mobile-module__3zKlBq__banner mobile-only" style={{
        translate: 'none',
        rotate: 'none', 
        scale: 'none',
        opacity: 1,
        transform: 'translate(0px, 0px)'
      }}>
        <div className="banner-mobile-module__3zKlBq__content">
          <div className="banner-mobile-module__3zKlBq__left">
            <p className="banner-mobile-module__3zKlBq__text">
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

      {/* Banner Mobile - Second with Glasses */}
      <div className="banner-mobile-module__3zKlBq__banner mobile-only" style={{
        translate: 'none',
        rotate: 'none',
        scale: 'none', 
        opacity: 1,
        transform: 'translate(0px, 0px)'
      }}>
        <div className="banner-mobile-module__3zKlBq__content">
          <div className="banner-mobile-module__3zKlBq__row">
            <div className="banner-mobile-module__3zKlBq__glassesContainer">
              <svg xmlns="http://www.w3.org/2000/svg" width="46" height="16" fill="none" aria-hidden="true">
                <path fill="url(#a)" d="M45.0344 1.838c-.3897-.3155-1.2154-.1485-2.8948-.3804-1.401-.1949-4.2309-.5289-8.4711-.5289-5.0567 0-7.5805 1.1784-8.6011 1.4753-1.0206.2969-1.7072.2598-2.0041.2598-.2969 0-.9835.037-2.0041-.2598-1.0206-.297-3.5351-1.466-8.5918-1.466-4.2309 0-7.0608.334-8.4711.5289-1.6701.232-2.5052.0649-2.8949.3804-.3896.3154-.2876 1.067-.2876 1.4288 0 .3619 0 1.0856.5567 1.3176.5567.232.9186.065 1.3454.2969.4268.232.8536.8536 1.1134 2.1711.2598 1.3175.5567 4.2959 1.7443 6.0031 1.1784 1.7072 3.3124 2.6629 6.5969 2.5979 3.2846-.0649 4.9547-.5567 6.365-2.0969 1.4103-1.5402 2.134-4.036 2.4587-4.9268.3248-.8907.7516-1.8928 1.1134-2.1711.2598-.1949.7237-.167.9557-.167.232 0 .6866-.0279.9557.167.3618.2783.7886 1.2804 1.1134 2.1711.3247.8907 1.0484 3.3773 2.4587 4.9268 1.4104 1.5402 3.0897 2.032 6.365 2.0969 3.2845.065 5.4185-.8907 6.5969-2.5979 1.1783-1.7072 1.4753-4.6949 1.7443-6.0031.2598-1.3175.6866-1.9392 1.1134-2.1711.4268-.232.7887-.065 1.3454-.297.5567-.2319.5567-.9556.5567-1.3175 0-.3618.1021-1.1134-.2876-1.4288l.0092-.0093Z"></path>
                <defs>
                  <linearGradient id="a" x1=".8018" x2="45.202" y1="15.6658" y2="5.6058" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF2900"></stop>
                    <stop offset=".6058" stopColor="#FE7A60"></stop>
                    <stop offset="1" stopColor="#581DFF"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="banner-mobile-module__3zKlBq__left">
              <p className="banner-mobile-module__3zKlBq__text">
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
      </div>

      {/* Navigation */}
      <nav className="navigation-module__mix1Pa__navigation">
        <div className="navigation-module__mix1Pa__headerInner">
          <a href="/" className="navigation-module__mix1Pa__logo">VITURE</a>
          <div className="navigation-module__mix1Pa__desktop">
            <a href="/products" className="navigation-module__mix1Pa__desktopLink">Products</a>
            <a href="/technology" className="navigation-module__mix1Pa__desktopLink">Technology</a>
            <a href="/support" className="navigation-module__mix1Pa__desktopLink">Support</a>
            <a href="/company" className="navigation-module__mix1Pa__desktopLink">Company</a>
          </div>
          <div className="navigation-module__mix1Pa__mobile">
            <span>Menu</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {/* Section 1 */}
        <section className="section1-module__iQD6-W__section1">
          <div className="section1-module__iQD6-W__sticky">
            <div className="section1-module__iQD6-W__inner">
              <div className="section1-module__iQD6-W__contentWrapper">
                <div className="section1-module__iQD6-W__content">
                  <div className="title-subtitle-module__HtnROq__titleSubtitle title-subtitle-module__HtnROq__centered">
                    <h1 className="gradient-text-module__frmLeG__gradientText">
                      <span className="gradient-text-module__frmLeG__blurred">VITURE One</span>
                      <span className="gradient-text-module__frmLeG__text">VITURE One</span>
                    </h1>
                    <p className="section1-module__iQD6-W__introText">The world's first XR glasses with Electrochromic Film technology</p>
                  </div>
                  <div className="section1-module__iQD6-W__sequenceWrapper">
                    <div className="section1-module__iQD6-W__sequence">
                      {/* Product showcase placeholder */}
                      <div style={{ 
                        width: '100%', 
                        height: '100%', 
                        background: 'linear-gradient(45deg, #ff2900, #fe7a60, #581dff)', 
                        borderRadius: '20px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        color: 'white', 
                        fontSize: '2rem',
                        fontWeight: 600
                      }}>
                        VITURE One XR Glasses
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="section2-module__24Nf6W__section2">
          <div className="section2-module__24Nf6W__sticky">
            <div className="section2-module__24Nf6W__inner">
              <div className="title-subtitle-module__HtnROq__titleSubtitle title-subtitle-module__HtnROq__centered">
                <h2 className="gradient-text-module__frmLeG__gradientText">
                  <span className="gradient-text-module__frmLeG__blurred">Next Generation Display</span>
                  <span className="gradient-text-module__frmLeG__text">Next Generation Display</span>
                </h2>
                <p>Experience the future of visual technology with our revolutionary XR display</p>
              </div>
              <div className="section2-module__24Nf6W__cards">
                <div className="card-module__JTl4uq__cardOuter">
                  <div className="card-module__JTl4uq__card">
                    <h3>4K Micro-OLED</h3>
                    <p>Crystal clear visuals with unprecedented detail and color accuracy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10 - Video Background */}
        <section className="section10-module__fkP61a__section10">
          <div className="section10-module__fkP61a__sticky">
            <div className="section10-module__fkP61a__titleWrapper">
              <div className="title-subtitle-module__HtnROq__titleSubtitle title-subtitle-module__HtnROq__centered">
                <h2 className="gradient-text-module__frmLeG__gradientText">
                  <span className="gradient-text-module__frmLeG__blurred">Immersive Experience</span>
                  <span className="gradient-text-module__frmLeG__text">Immersive Experience</span>
                </h2>
                <p>Step into a new reality with VITURE XR technology</p>
              </div>
            </div>
            <div className="section10-module__fkP61a__videosWrapper">
              {/* Video content placeholder */}
              <div style={{ 
                width: '100%', 
                height: '100%', 
                background: 'linear-gradient(135deg, #000 0%, #ff2900 50%, #581dff 100%)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'white', 
                fontSize: '3rem',
                fontWeight: 600
              }}>
                XR Experience
              </div>
            </div>
          </div>
        </section>

        {/* Section 11 - Icons */}
        <section className="section11-module__XZ044a__section11">
          <div className="section11-module__XZ044a__sticky">
            <div className="title-subtitle-module__HtnROq__titleSubtitle title-subtitle-module__HtnROq__centered">
              <h2 className="gradient-text-module__frmLeG__gradientText">
                <span className="gradient-text-module__frmLeG__blurred">Advanced Features</span>
                <span className="gradient-text-module__frmLeG__text">Advanced Features</span>
              </h2>
            </div>
            <div className="section11-module__XZ044a__icons">
              <div className="section11-module__XZ044a__icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
                  <circle cx="16" cy="16" r="8" fill="currentColor"/>
                </svg>
              </div>
              <div className="section11-module__XZ044a__icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
                  <rect x="8" y="8" width="16" height="16" fill="currentColor"/>
                </svg>
              </div>
              <div className="section11-module__XZ044a__icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
                  <polygon points="16,4 28,28 4,28" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Section 18 - Product Grid */}
        <section className="section18-module__Tahmpa__section18">
          <div className="section18-module__Tahmpa__sticky">
            <div className="section18-module__Tahmpa__sectionHead">
              <div className="title-subtitle-module__HtnROq__titleSubtitle title-subtitle-module__HtnROq__centered">
                <h2 className="gradient-text-module__frmLeG__gradientText">
                  <span className="gradient-text-module__frmLeG__blurred">Product Line</span>
                  <span className="gradient-text-module__frmLeG__text">Product Line</span>
                </h2>
              </div>
            </div>
            <div className="section18-module__Tahmpa__grid">
              <div className="product-item-module__yw1N5a__productItem">
                <div className="product-item-module__yw1N5a__productItemImg" style={{ background: 'linear-gradient(45deg, #ff2900, #fe7a60)', borderRadius: '20px', height: '200px' }}></div>
                <h3 className="product-item-module__yw1N5a__productItemTitle">VITURE One</h3>
                <p className="product-item-module__yw1N5a__productItemSubtitle">XR Glasses</p>
              </div>
              <div className="product-item-module__yw1N5a__productItem">
                <div className="product-item-module__yw1N5a__productItemImg" style={{ background: 'linear-gradient(45deg, #fe7a60, #581dff)', borderRadius: '20px', height: '200px' }}></div>
                <h3 className="product-item-module__yw1N5a__productItemTitle">VITURE Pro</h3>
                <p className="product-item-module__yw1N5a__productItemSubtitle">Professional XR</p>
              </div>
              <div className="product-item-module__yw1N5a__productItem">
                <div className="product-item-module__yw1N5a__productItemImg" style={{ background: 'linear-gradient(45deg, #581dff, #ff2900)', borderRadius: '20px', height: '200px' }}></div>
                <h3 className="product-item-module__yw1N5a__productItemTitle">VITURE Station</h3>
                <p className="product-item-module__yw1N5a__productItemSubtitle">Docking Station</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 20 - Final CTA */}
        <section className="section20-module__kUzs9G__section20">
          <div className="section20-module__kUzs9G__sticky">
            <div className="title-subtitle-module__HtnROq__titleSubtitle title-subtitle-module__HtnROq__centered">
              <h2 className="gradient-text-module__frmLeG__gradientText">
                <span className="gradient-text-module__frmLeG__blurred">Experience the Future</span>
                <span className="gradient-text-module__frmLeG__text">Experience the Future</span>
              </h2>
              <p>Join the XR revolution with VITURE's next-generation technology</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <button className="small-button-module__2USyQq__button small-button-module__2USyQq__whiteText small-button-module__2USyQq__withBackground">
                <span>Get Started</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Blurry Gradient Background */}
      <div className="blurry-gradient-module__gkYgHG__blurryGradient">
        <div className="blurry-gradient-module__gkYgHG__mask"></div>
      </div>
    </div>
  );
};

export default VitureClone;