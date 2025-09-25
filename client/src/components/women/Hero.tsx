
import React, { useRef, useEffect } from "react";

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scribbleRef = useRef<SVGSVGElement>(null);
  const toggleRef = useRef<HTMLLabelElement>(null);
  const parRef = useRef<HTMLDivElement>(null);
  const alphaRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    let gsap: any, SplitType: any, ScrollTrigger: any;
    let stripesAnimation: any = null;
    let titleSplit: any, parSplit: any, layerItems: any;
    let isIn = false;
    let scribbleEls: any = [];

    const animateStripesIn = () => {
      if (stripesAnimation) stripesAnimation.kill();
      const heroStripes = Array.from(layerRef.current?.children || []).map((item: any) => item.children[0]);
      gsap.set(heroStripes, {
        autoAlpha: 1,
        x: (i: number) => (i % 2 === 0 ? -heroStripes[i].scrollWidth : heroStripes[i].scrollWidth),
        yPercent: (i: number) => (heroStripes.length / 2 - i) * 80,
      });
      stripesAnimation = gsap.to(heroStripes, {
        x: 0,
        delay: 0.2,
        duration: (i: number) => Math.random() + 1.2,
        ease: "expo.out",
      });
    };

    const animateStripesOut = () => {
      if (stripesAnimation) stripesAnimation.kill();
      const heroStripes = Array.from(layerRef.current?.children || []).map((item: any) => item.children[0]);
      stripesAnimation = gsap.to(heroStripes, {
        x: (i: number) => (i % 2 === 0 ? -heroStripes[i].scrollWidth : heroStripes[i].scrollWidth),
        duration: 0.8,
        ease: "expo.out",
      });
    };

    const animateIn = async (delay = 0) => {
      isIn = true;
      animateStripesOut();
      gsap.to(parSplit, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.8,
        delay: 0.65,
        ease: "expo.out",
        stagger: { each: 0.08 },
      });
  await gsap.to(titleSplit, {
        yPercent: 0,
        duration: 1.2,
        delay,
        ease: "expo.out",
        stagger: { each: 0.01, from: "end" },
      });
    };

    const animateOut = async () => {
      isIn = false;
      animateStripesIn();
      gsap.to(parSplit, {
        autoAlpha: 0,
        yPercent: 100,
        duration: 0.8,
        ease: "expo.out",
        stagger: { each: 0.08 },
      });
  await gsap.to(titleSplit, {
        yPercent: 110,
        duration: 0.8,
        ease: "expo.out",
        delay: 0.1,
        stagger: { each: 0.01, from: "center" },
      });
    };

    const animateScribble = (scribble: any) => {
      if (!scribble || !scribble.length) return;
      let isScribbling = false;
      if (isScribbling) return;
      isScribbling = true;
      gsap.set(scribble, { autoAlpha: 0, rotation: 0 });
      const tl = gsap.timeline();
      const scribblesToAnimate = [...scribble].reverse();
      scribblesToAnimate.forEach((item, index) => {
        const randomRotation = Math.random() * 20 - 10;
        const baseDelay = index * 0.015;
        tl.add(gsap.set(item, { autoAlpha: 1, rotation: randomRotation, delay: baseDelay }));
        tl.add(gsap.set(item, { autoAlpha: 0, delay: baseDelay + 0.01 }));
      });
      tl.call(() => { isScribbling = false; });
    };

    (async () => {
      gsap = (await import("gsap")).default;
      ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      SplitType = (await import("split-type")).default;
      gsap.registerPlugin(ScrollTrigger);

      // Split text
      if (titleRef.current) {
        // Flatten the result immediately to avoid .flat() on undefined
        titleSplit = Array.from(titleRef.current.querySelectorAll(".main-he-span"))
          .map((el) => Array.from(new SplitType(el, { types: "chars" }).chars))
          .reduce((acc, val) => acc.concat(val), []);
      }
      if (parRef.current) {
        parSplit = new SplitType(parRef.current, { types: "lines" }).lines;
      }

      // Initial state
  if (titleSplit) gsap.set(titleSplit, { yPercent: -110 });
      if (parSplit) gsap.set(parSplit, { autoAlpha: 0, yPercent: 100 });
      if (alphaRef.current) gsap.set(alphaRef.current, { autoAlpha: 0, scale: 0.7 });
      if (scribbleRef.current) {
        scribbleEls = scribbleRef.current.querySelectorAll("g > path");
        gsap.set(scribbleEls, { autoAlpha: 0 });
      }

      // Animate in
      animateIn(0.6);

      // Animate toggle
      if (toggleRef.current) {
        const input = toggleRef.current.querySelector("input");
        if (input) {
          input.addEventListener("change", (event: any) => {
            if (event.target.checked) {
              animateOut();
            } else {
              animateIn();
            }
          });
        }
        toggleRef.current.onmouseenter = () => {
          if (!isIn) return;
          animateScribble(scribbleEls);
        };
      }

      // Animate stripes
      if (layerRef.current) {
        const layer = layerRef.current;
        gsap.set(layer, { autoAlpha: 1 });
        gsap.to(layer, {
          yPercent: 10,
          scrollTrigger: {
            trigger: layer,
            start: "top top",
            end: "+=100%",
            scrub: true,
          },
        });
      }
      // Animate alpha button
      if (alphaRef.current) {
        gsap.to(alphaRef.current, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.9,
          ease: "expo.out",
        });
      }
    })();

    return () => {
      if (stripesAnimation) stripesAnimation.kill();
      if (ScrollTrigger && typeof ScrollTrigger.getAll === "function") {
        ScrollTrigger.getAll().forEach((t: any) => t.kill());
      }
    };
  }, []);

  return (
  <header id="hero" data-module="hero" className="sec hero">
      <div className="comp">
        <h1
          data-hero="title"
          aria-label="make it mean more with gsap"
          className="font-c hero-text"
          ref={titleRef}
          style={{
            textAlign: "center",
            letterSpacing: "-0.01em",
            fontSize: "min(14vw, 10rem)",
            fontWeight: 400,
            lineHeight: ".95em",
            fontFamily: "Anton, Arial, sans-serif",
            margin: 0,
            padding: 0,
            width: "100%",
            maxWidth: "100vw",
            color: "var(--primary)",
            wordBreak: "break-word",
            overflowWrap: "break-word"
          }}
        >
          <span className="main-he-span" style={{ display: "inline-block", overflow: "clip" }}>MAKE&nbsp;IT&nbsp;MEAN</span>
          <span className="main-he-span" style={{ display: "inline-block", overflow: "clip" }}>MORE&nbsp;WITH&nbsp;GSAP</span>
        </h1>
      </div>
      <div className="comp toggle-w">
        <svg
          ref={scribbleRef}
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          fill="none"
          viewBox="0 0 1384 1012"
          data-hero="scribble"
          className="scribbles-svg"
        >
          <g className="scribbles-svg" clipPath="url(#a)"></g>
          <defs>
            <clipPath id="a" className="a">
              <path fill="currentColor" d="M0 0h1383.96v1011.61H0z" />
            </clipPath>
          </defs>
        </svg>
        <label
          ref={toggleRef}
          data-css="toggle"
          aria-role="switch"
          aria-label="turn gsap on"
          data-hero="toggle"
          className="toggle-w"
        >
          <div className="toggle-slider-shadow"></div>
          <input type="checkbox" className="toggle-html-input" />
          <span className="toggle-slider">
            <div className="toggle-ball"></div>
          </span>
        </label>
      </div>
      <div className="comp">
        <div data-hero="par" className="par-base _w-ch" ref={parRef}>
          Well, not just because GSAP, let’s dive into why, how and when to incorporate motion design into your websites, with some cloneable templates along the way to get you started
        </div>
        <div
          data-hero="alpha"
          className="hero-btn-w"
          ref={alphaRef}
          style={{ zIndex: 20, position: "relative", boxShadow: "0 8px 32px 0 rgba(0,0,0,0.35)" }}
        >
          <a data-module="btn" href="#content" className="btn-link w-inline-block">
            <div className="overflow">
              <div>Explore templates</div>
            </div>
          </a>
        </div>
      </div>
      <div data-hero="layer" className="layer hero-alt" ref={layerRef}>
        {/* ...stripes and images as in template... */}
      </div>
    </header>
  );
};

export default Hero;
