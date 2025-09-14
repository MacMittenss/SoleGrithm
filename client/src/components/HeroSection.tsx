import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// WebGL support detection
function hasWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!context;
  } catch {
    return false;
  }
}

// Check for reduced motion preference
function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function HeroSection() {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const welcomeTextRef = useRef<HTMLHeadingElement>(null);
  const splineContainerRef = useRef<HTMLDivElement>(null);
  
  const [shouldRender3D, setShouldRender3D] = useState(false);
  const [robotLoaded, setRobotLoaded] = useState(false);
  const [robotError, setRobotError] = useState(false);

  useEffect(() => {
    // Robot-synced zoom animation for SOLEGRITHM text
    if (heroTextRef.current && welcomeTextRef.current) {
      const tl = gsap.timeline({ delay: 1.2 }); // Start when robot animation starts

      // Split SOLEGRITHM into individual letters
      const text = heroTextRef.current;
      const letters = text.textContent?.split("") || [];
      text.innerHTML = letters
        .map(
          (letter) =>
            `<span style="display: inline-block; opacity: 0; transform: scale(2.5) translateZ(0);">${letter}</span>`
        )
        .join("");

      // Set welcome text initial state (preserve typography)
      gsap.set(welcomeTextRef.current, { 
        opacity: 0, 
        scale: 2.5,
        fontSize: "0.89vw",
        letterSpacing: "0.14vw",
        textTransform: "uppercase",
        fontWeight: "400",
        lineHeight: "1.44vw"
      });

      // Animate welcome text with zoom-out effect
      tl.to(welcomeTextRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2.5,
        ease: "expo.out",
      })
        // Animate SOLEGRITHM letters with synchronized zoom-out
        .to(
          text.querySelectorAll("span"),
          {
            opacity: 1,
            scale: 1,
            duration: 2.5,
            ease: "expo.out",
            stagger: 0.02,
          },
          "-=2.3"
        ); // Start slightly after welcome text
    }
  }, []);

  // Progressive enhancement for 3D robot
  useEffect(() => {
    // Check WebGL support and user preferences
    if (!hasWebGLSupport() || prefersReducedMotion()) {
      return;
    }

    // Check environment variable (optional kill switch)
    const splineEnabled = import.meta.env.VITE_ENABLE_SPLINE !== 'false';
    if (!splineEnabled) {
      return;
    }

    // Lazy load with IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            // Defer loading with idle callback and timeout
            if (window.requestIdleCallback) {
              window.requestIdleCallback(() => {
                setTimeout(() => setShouldRender3D(true), 1200);
              });
            } else {
              setTimeout(() => setShouldRender3D(true), 1500);
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    if (splineContainerRef.current) {
      observer.observe(splineContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Timeout handler for failed loads
  useEffect(() => {
    if (shouldRender3D) {
      const timeout = setTimeout(() => {
        if (!robotLoaded) {
          setRobotError(true);
        }
      }, 5000); // 5 second timeout

      return () => clearTimeout(timeout);
    }
  }, [shouldRender3D, robotLoaded]);

  const handleRobotLoad = () => {
    setRobotLoaded(true);
    setRobotError(false);
  };

  const handleRobotError = () => {
    setRobotError(true);
    setRobotLoaded(false);
  };

  return (
    <section className="hero-section">
      <div className="fingerprint"></div>
      <div className="circle"></div>
      <div className="w-layout-blockcontainer container w-container">
        <div className="hero-wrapper">
          <h5 ref={welcomeTextRef} className="heading">
            Welcome To
          </h5>
          <h1 ref={heroTextRef} className="font-c hero-text">
            SOLEGRITHM
          </h1>
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
        ref={splineContainerRef}
        className="spline"
      >
        {/* Fallback/loading state */}
        {(!shouldRender3D || robotError || !robotLoaded) && (
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: robotError ? 0.5 : 1,
              transition: 'opacity 0.5s ease'
            }}
          >
            {/* Robot loads progressively */}
          </div>
        )}

        {/* 3D Robot iframe - only render when conditions are met */}
        {shouldRender3D && !robotError && (
          <iframe
            src="https://my.spline.design/nexbotrobotcharacterconcept-MuKFwn44xdQzWJqISlDVY35e/"
            frameBorder="0"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer"
            allow="autoplay; fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
            onLoad={handleRobotLoad}
            onError={handleRobotError}
            style={{
              width: "100%",
              height: "100%",
              background: "transparent",
            }}
          />
        )}
      </div>
    </section>
  );
}