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
    <div className="viture-clone-container">
      {/* Banner Mobile */}
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

      {/* Additional VITURE content sections would go here */}
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>VITURE XR Glasses</h1>
          <p style={{ fontSize: '1.5rem', opacity: 0.8 }}>Next Generation AR Experience</p>
        </div>
      </div>
    </div>
  );
};

export default VitureClone;