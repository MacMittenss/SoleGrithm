import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const brandsRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const splineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Spline 3D robot
    const loadSpline = () => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.9.28/build/spline-viewer.js';
      document.head.appendChild(script);
      
      script.onload = () => {
        if (splineRef.current) {
          const splineViewer = document.createElement('spline-viewer');
          splineViewer.setAttribute('url', 'https://prod.spline.design/fP0LH65i8bXQDQjZ/scene.splinecode');
          splineRef.current.innerHTML = '';
          splineRef.current.appendChild(splineViewer);
          
          // Animate robot entrance
          gsap.fromTo(splineRef.current, 
            { opacity: 0 },
            { opacity: 1, duration: 2, ease: "power2.out", delay: 1 }
          );
        }
      };
    };

    // Hero entrance animation
    if (heroRef.current) {
      const tl = gsap.timeline()
      tl.fromTo(".hero-text", 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.7)" }
      )
      .fromTo(".heading", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.8"
      )
      .fromTo(".arrow-border-wrapper", 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.4"
      )
    }
    
    // Load the 3D robot
    loadSpline();

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

    // Services animation on scroll
    ScrollTrigger.create({
      trigger: servicesRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(".slide-from-left-animation", 
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
        )
      }
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <div className="home-page">
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