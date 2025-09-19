import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function splitText(element: HTMLElement, type = "chars") {
  if (!element) return [];
  if (type === "chars") {
    const chars = element.textContent!.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.setAttribute("aria-hidden", "true");
      span.style.display = "inline-block";
      return span;
    });
    element.innerHTML = "";
    chars.forEach((span) => element.appendChild(span));
    return chars;
  } else if (type === "lines") {
    const lines = element.innerHTML.split("<br>").map((line) => {
      const div = document.createElement("div");
      div.innerHTML = line;
      div.setAttribute("aria-hidden", "true");
      div.style.display = "block";
      return div;
    });
    element.innerHTML = "";
    lines.forEach((div) => element.appendChild(div));
    return lines;
  }
  return [];
}

const WomenInSneakers: React.FC = () => {
  // Style override to ensure Navbar is always on top
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      #women-in-sneakers-root > header, #women-in-sneakers-root .navbar, #women-in-sneakers-root [data-component='Navbar'] {
        position: fixed !important;
        top: 0 !important;
        left: 0;
        width: 100vw !important;
        z-index: 9999 !important;
      }
      #women-in-sneakers-root {
        padding-top: 64px !important;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const parRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLLabelElement>(null);
  const alphaRef = useRef<HTMLDivElement>(null);
  const scribbleRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // ...animation logic omitted for brevity...
  }, []);

  return (
    <div id="women-in-sneakers-root">
      <Navbar />
      <div id="smooth-wrapper" data-start="hidden" className="scroll-wrapper">
        <main id="smooth-content" className="main">
          {/* HEADER / HERO SECTION ONLY */}
          <header className="sec hero" data-module="hero" id="hero" ref={heroRef}>
            <div className="comp">
              <h1 className="font-c hero-text" data-hero="title" aria-label="make it mean more with gsap" ref={titleRef}>
                <span className="main-he-span">MAKE&nbsp;IT&nbsp;MEAN</span>
                <span className="main-he-span">MORE&nbsp;WITH&nbsp;GSAP</span>
              </h1>
            </div>
            <div className="comp toggle-w">
              {/* SVG SCRIBBLE */}
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" fill="none" viewBox="0 0 1384 1012" data-hero="scribble" className="scribbles-svg" ref={scribbleRef}>
                <g className="scribbles-svg" clipPath="url(#a)">
                  {/* ...SVG paths omitted for brevity... */}
                </g>
                <defs>
                  <clipPath id="a" className="a">
                    <path fill="currentColor" d="M0 0h1383.96v1011.61H0z" />
                  </clipPath>
                </defs>
              </svg>
              {/* TOGGLE SWITCH */}
              <label className="toggle-w" data-css="toggle" aria-role="switch" aria-label="turn gsap on" data-hero="toggle" ref={toggleRef}>
                <div className="toggle-slider-shadow"></div>
                <input type="checkbox" className="toggle-html-input" />
                <span className="toggle-slider">
                  <div className="toggle-ball"></div>
                </span>
              </label>
            </div>
            <div className="comp">
              <div className="par-base _w-ch" data-hero="par" ref={parRef}>
                Well, not just because GSAP, let’s dive into why, how and when to incorporate motion design into your websites, with some cloneable templates along the way to get you started
              </div>
              <div className="hero-btn-w" data-hero="alpha" ref={alphaRef}>
                <a className="btn-link w-inline-block" data-module="btn" href="#content">
                  <div className="overflow">
                    <div>Explore templates</div>
                  </div>
                </a>
              </div>
            </div>
            {/* HERO STRIPES LAYER */}
            <div className="layer hero-alt" data-hero="layer" ref={layerRef}>
              {/* Stripe 1 */}
              <div className="hero-stripe-w">
                <div className="hero-stripe">
                  <div className="hero-stripe-text">SCROLL INTERACTIONS</div>
                  <div className="hero-stripe-text">SCROLL INTERACTIONS</div>
                  <div className="hero-stripe-text">SCROLL INTERACTIONS</div>
                </div>
              </div>
              {/* Stripe 2 */}
              <div className="hero-stripe-w">
                <div className="hero-stripe">
                  <div className="hero-stripe-text">TEXT&nbsp;EFFECTS</div>
                  <div className="hero-inner-img">
                    <div className="hero-img-tx-w" data-hero="text">
                      <img src="/women-in-sneakers-assets/images/letters-bundle-cutout_1letters-bundle-cutout.avif" alt="" className="img abs-top z-3" loading="lazy" />
                      <img src="/women-in-sneakers-assets/images/letters-bundle-shadow_1letters-bundle-shadow.avif" alt="" className="img multiply" loading="lazy" />
                    </div>
                  </div>
                  <div className="hero-stripe-text">TEXT&nbsp;EFFECTS</div>
                </div>
              </div>
              {/* Stripe 3 */}
              <div className="hero-stripe-w">
                <div className="hero-stripe">
                  <div className="hero-stripe-text">SLIDERS</div>
                  <div className="hero-stripe-text">SLIDERS</div>
                  <div className="hero-inner-img">
                    <div className="hero-slider-w" data-hero="cards">
                      <div className="hero-card layer-1">
                        <img src="/women-in-sneakers-assets/images/Frame-224_1Frame-224.avif" alt="" className="hero-card-img" loading="lazy" />
                      </div>
                      <div className="hero-card layer-1">
                        <img src="/women-in-sneakers-assets/images/Frame-226_1Frame-226.avif" alt="" className="hero-card-img" loading="lazy" />
                      </div>
                      <div className="hero-card">
                        <img src="/women-in-sneakers-assets/images/Frame-225_1Frame-225.avif" alt="" className="hero-card-img" loading="lazy" />
                      </div>
                    </div>
                  </div>
                  <div className="hero-stripe-text">SLIDERS</div>
                  <div className="hero-stripe-text">SLIDERS</div>
                </div>
              </div>
              {/* Stripe 4 */}
              <div className="hero-stripe-w higher">
                <div className="hero-stripe">
                  <div className="hero-stripe-text">Inertia Inertia</div>
                  <div className="hero-inner-img">
                    <div className="hero-running-w" data-hero="video">
                      <img src="/women-in-sneakers-assets/images/Frame-223_1Frame-223.avif" alt="" loading="lazy" />
                      <video className="alpha-video layered" autoPlay loop playsInline>
                        <source src="https://assets.itsoffbrand.io/gsap-template/assets/running.mp4" type="video/mp4; codecs=hvc1" />
                        <source src="https://assets.itsoffbrand.io/gsap-template/assets/running.webm" type="video/webm" />
                      </video>
                    </div>
                  </div>
                  <div className="hero-stripe-text">Inertia Inertia</div>
                </div>
              </div>
              {/* Stripe 5 */}
              <div className="hero-stripe-w">
                <div className="hero-stripe">
                  <div className="hero-stripe-text">MARQUEES</div>
                  <div className="hero-stripe-text">MARQUEES</div>
                  <div className="hero-stripe-text">MARQUEES</div>
                  <div className="hero-stripe-text">MARQUEES</div>
                </div>
              </div>
            </div>
          </header>
        </main>
      </div>
    </div>
  );
};

export default WomenInSneakers;
import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function splitText(element: HTMLElement, type = "chars") {
  if (!element) return [];
  if (type === "chars") {
    import React, { useEffect, useRef } from "react";
    import Navbar from "../components/Navbar";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";

    function splitText(element: HTMLElement, type = "chars") {
      if (!element) return [];
      if (type === "chars") {
        const chars = element.textContent!.split("").map((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.setAttribute("aria-hidden", "true");
          span.style.display = "inline-block";
          return span;
        });
        element.innerHTML = "";
        chars.forEach((span) => element.appendChild(span));
        return chars;
      } else if (type === "lines") {
        const lines = element.innerHTML.split("<br>").map((line) => {
          const div = document.createElement("div");
          div.innerHTML = line;
          div.setAttribute("aria-hidden", "true");
          div.style.display = "block";
          return div;
        });
        element.innerHTML = "";
        lines.forEach((div) => element.appendChild(div));
        return lines;
      }
      return [];
    }

    const WomenInSneakers: React.FC = () => {
      const heroRef = useRef<HTMLElement>(null);
      const titleRef = useRef<HTMLHeadingElement>(null);
      const parRef = useRef<HTMLDivElement>(null);
      const layerRef = useRef<HTMLDivElement>(null);
      const toggleRef = useRef<HTMLLabelElement>(null);
      const alphaRef = useRef<HTMLDivElement>(null);
      const scribbleRef = useRef<SVGSVGElement>(null);

      useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        // ...animation logic omitted for brevity...
      }, []);

      return (
        <div id="women-in-sneakers-root">
          <Navbar />
          <div id="smooth-wrapper" data-start="hidden" className="scroll-wrapper">
            <main id="smooth-content" className="main">
              {/* HEADER / HERO SECTION ONLY */}
              <header className="sec hero" data-module="hero" id="hero" ref={heroRef}>
                <div className="comp">
                  <h1 className="font-c hero-text" data-hero="title" aria-label="make it mean more with gsap" ref={titleRef}>
                    <span className="main-he-span">MAKE&nbsp;IT&nbsp;MEAN</span>
                    <span className="main-he-span">MORE&nbsp;WITH&nbsp;GSAP</span>
                  </h1>
                </div>
                <div className="comp toggle-w">
                  {/* SVG SCRIBBLE */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" fill="none" viewBox="0 0 1384 1012" data-hero="scribble" className="scribbles-svg" ref={scribbleRef}>
                    <g className="scribbles-svg" clipPath="url(#a)">
                      {/* ...SVG paths omitted for brevity... */}
                    </g>
                    <defs>
                      <clipPath id="a" className="a">
                        <path fill="currentColor" d="M0 0h1383.96v1011.61H0z" />
                      </clipPath>
                    </defs>
                  </svg>
                  {/* TOGGLE SWITCH */}
                  <label className="toggle-w" data-css="toggle" aria-role="switch" aria-label="turn gsap on" data-hero="toggle" ref={toggleRef}>
                    <div className="toggle-slider-shadow"></div>
                    <input type="checkbox" className="toggle-html-input" />
                    <span className="toggle-slider">
                      <div className="toggle-ball"></div>
                    </span>
                  </label>
                </div>
                <div className="comp">
                  <div className="par-base _w-ch" data-hero="par" ref={parRef}>
                    Well, not just because GSAP, let’s dive into why, how and when to incorporate motion design into your websites, with some cloneable templates along the way to get you started
                  </div>
                  <div className="hero-btn-w" data-hero="alpha" ref={alphaRef}>
                    <a className="btn-link w-inline-block" data-module="btn" href="#content">
                      <div className="overflow">
                        <div>Explore templates</div>
                      </div>
                    </a>
                  </div>
                </div>
                {/* HERO STRIPES LAYER */}
                <div className="layer hero-alt" data-hero="layer" ref={layerRef}>
                  {/* Stripe 1 */}
                  <div className="hero-stripe-w">
                    <div className="hero-stripe">
                      <div className="hero-stripe-text">SCROLL INTERACTIONS</div>
                      <div className="hero-stripe-text">SCROLL INTERACTIONS</div>
                      <div className="hero-stripe-text">SCROLL INTERACTIONS</div>
                    </div>
                  </div>
                  {/* Stripe 2 */}
                  <div className="hero-stripe-w">
                    <div className="hero-stripe">
                      <div className="hero-stripe-text">TEXT&nbsp;EFFECTS</div>
                      <div className="hero-inner-img">
                        <div className="hero-img-tx-w" data-hero="text">
                          <img src="/women-in-sneakers-assets/images/letters-bundle-cutout_1letters-bundle-cutout.avif" alt="" className="img abs-top z-3" loading="lazy" />
                          <img src="/women-in-sneakers-assets/images/letters-bundle-shadow_1letters-bundle-shadow.avif" alt="" className="img multiply" loading="lazy" />
                        </div>
                      </div>
                      <div className="hero-stripe-text">TEXT&nbsp;EFFECTS</div>
                    </div>
                  </div>
                  {/* Stripe 3 */}
                  <div className="hero-stripe-w">
                    <div className="hero-stripe">
                      <div className="hero-stripe-text">SLIDERS</div>
                      <div className="hero-stripe-text">SLIDERS</div>
                      <div className="hero-inner-img">
                        <div className="hero-slider-w" data-hero="cards">
                          <div className="hero-card layer-1">
                            <img src="/women-in-sneakers-assets/images/Frame-224_1Frame-224.avif" alt="" className="hero-card-img" loading="lazy" />
                          </div>
                          <div className="hero-card layer-1">
                            <img src="/women-in-sneakers-assets/images/Frame-226_1Frame-226.avif" alt="" className="hero-card-img" loading="lazy" />
                          </div>
                          <div className="hero-card">
                            <img src="/women-in-sneakers-assets/images/Frame-225_1Frame-225.avif" alt="" className="hero-card-img" loading="lazy" />
                          </div>
                        </div>
                      </div>
                      <div className="hero-stripe-text">SLIDERS</div>
                      <div className="hero-stripe-text">SLIDERS</div>
                    </div>
                  </div>
                  {/* Stripe 4 */}
                  <div className="hero-stripe-w higher">
                    <div className="hero-stripe">
                      <div className="hero-stripe-text">Inertia Inertia</div>
                      <div className="hero-inner-img">
                        <div className="hero-running-w" data-hero="video">
                          <img src="/women-in-sneakers-assets/images/Frame-223_1Frame-223.avif" alt="" loading="lazy" />
                          <video className="alpha-video layered" autoPlay loop playsInline>
                            <source src="https://assets.itsoffbrand.io/gsap-template/assets/running.mp4" type="video/mp4; codecs=hvc1" />
                            <source src="https://assets.itsoffbrand.io/gsap-template/assets/running.webm" type="video/webm" />
                          </video>
                        </div>
                      </div>
                      <div className="hero-stripe-text">Inertia Inertia</div>
                    </div>
                  </div>
                  {/* Stripe 5 */}
                  <div className="hero-stripe-w">
                    <div className="hero-stripe">
                      <div className="hero-stripe-text">MARQUEES</div>
                      <div className="hero-stripe-text">MARQUEES</div>
                      <div className="hero-stripe-text">MARQUEES</div>
                      <div className="hero-stripe-text">MARQUEES</div>
                    </div>
                  </div>
                </div>
              </header>
            </main>
          </div>
        </div>
      );
    };

    export default WomenInSneakers;
                      <div className="explainer-he">Split, animate, reveal</div>
                      <div className="plus-icon-w">
                        <div className="plus-line rotate"></div>
                        <div className="plus-line"></div>
                      </div>
                    </span>
                  </label>
                  <div data-css="" className="explainer-expandable-w">
                    <div className="explainer-overflow">
                      <div className="explainer-content-w">
                        <p className="explainer-par">Animate each one independently. It’s all motion, no compromise: screen readers and search engines still see the original text.</p>
                      </div>
                    </div>
                  </div>
                  <div className="explainer-copy-btn-w">
                    <button data-module="copybtn" data-copy="https://cdn.prod.website-files.com/67fea42b19018db93e3fe132/6811e2c873ab161c8499accd_text-final.json.txt" className="btn copy">
                      <div className="btn-cent-w">
                        <div className="text-block">Copy this</div>
                        {/* SVG icon omitted for brevity */}
                      </div>
                    </button>
                  </div>
                  <div className="mobile-explainer-prompt">Copy this on Desktop</div>
                </div>
              </div>
            </section>
            {/* Marquee Section */}
            <section id="marquee" data-animate="marquee" className="sec">
              <div className="comp scroller">
                {/* Marquee lines omitted for brevity */}
              </div>
              <div className="explainer-w">
                <div data-module="explainer" data-css="explainer" className="explainer-comp">
                  <label className="div">
                    <input type="checkbox" className="input" />
                    <span className="span">
                      <div className="explainer-he">Marquees forever</div>
                      <div className="plus-icon-w">
                        <div className="plus-line rotate"></div>
                        <div className="plus-line"></div>
                      </div>
                    </span>
                  </label>
                  <div data-css="" className="explainer-expandable-w">
                    <div className="explainer-overflow">
                      <div className="explainer-content-w">
                        <p className="explainer-par">Loop endlessly. Stack images, text, or both. Marquees give rhythm to your page without needing a single click.</p>
                      </div>
                    </div>
                  </div>
                  <div className="explainer-copy-btn-w">
                    <button data-module="copybtn" data-copy="https://cdn.prod.website-files.com/67fea42b19018db93e3fe132/6811e2c7bd787427ed9cbaa8_marquee-final.json.txt" className="btn copy">
                      <div className="btn-cent-w">
                        <div className="text-block">Copy this</div>
                        {/* SVG icon omitted for brevity */}
                      </div>
                    </button>
                  </div>
                  <div className="mobile-explainer-prompt">Copy this on Desktop</div>
                </div>
              </div>
            </section>
  );
}