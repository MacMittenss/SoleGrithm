import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const welcomeTextRef = useRef<HTMLHeadingElement>(null);

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

  return (
    <section className="hero-section">
      <div className="fingerprint"></div>
      <div className="circle"></div>
      <div className="w-layout-blockcontainer container w-container">
        <div className="hero-wrapper">
          <h5 ref={welcomeTextRef} className="heading">
            Welcome To
          </h5>
          <h1 ref={heroTextRef} className="hero-text">
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
      <div className="spline">
        <div style={{ 
          width: "100%", 
          height: "100%", 
          background: "transparent",
          display: "flex",
          alignItems: "center", 
          justifyContent: "center",
          zIndex: 15
        }}>
          {/* Fallback content when 3D fails to load */}
          <div style={{
            width: "300px",
            height: "300px",
            background: "linear-gradient(45deg, #8B5CF6, #EC4899)",
            borderRadius: "50%",
            opacity: 0.3,
            filter: "blur(50px)",
            animation: "pulse 2s ease-in-out infinite alternate"
          }} />
        </div>
      </div>
    </section>
  );
}