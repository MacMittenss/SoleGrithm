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
          <h5 ref={welcomeTextRef} className="heading">Welcome</h5>
          <h1 ref={heroTextRef} className="hero-text">iDESIGNER</h1>
          <a href="#brands" className="arrow-border-wrapper w-inline-block">
            <div
              data-w-id="022bdf7a-1da5-487f-e90a-10a13619b2dd"
              className="icon-wrapper"
            >
              <img
                width="Auto"
                height="Auto"
                alt="arrow up"
                src="images/arrow_outward.svg"
                loading="eager"
                data-w-id="022bdf7a-1da5-487f-e90a-10a13619b2de"
                className="arrow"
              />
            </div>
          </a>
        </div>
        <div className="hero-overlay"></div>
      </div>
      <div
        data-w-id="769eaa28-9e57-8d2b-bd19-a0fd96681ba3"
        style={{opacity: 0}}
        className="spline"
        data-animation-type="spline"
        data-spline-url="https://prod.spline.design/fP0LH65i8bXQDQjZ/scene.splinecode"
      >
        <canvas></canvas>
      </div>
    </section>
  );
}