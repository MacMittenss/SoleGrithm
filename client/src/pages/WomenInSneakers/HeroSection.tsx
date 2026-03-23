import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export const HeroSection = () => {
  const wrapperRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const parRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLLabelElement>(null);
  const alphaRef = useRef<HTMLDivElement>(null);
  const scribbleRef = useRef<SVGSVGElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isIn, setIsIn] = useState(false);
  const [titleSplit, setTitleSplit] = useState<any>(null);
  const [parSplit, setParSplit] = useState<any>(null);

  // Split text utility
  const split = (element: Element | Element[], type = "chars") => {
    const elements = Array.isArray(element) ? element : [element];
    
    // Set aria labels
    elements.forEach((el) => {
      if (el && typeof el.setAttribute === "function") {
        el.setAttribute("aria-label", el.textContent || "");
      }
    });
    
    // Split text and set aria-hidden
    const splits = new SplitText(element, { type });
    (splits as any)[type].forEach((char: Element) => {
      if (char && typeof char.setAttribute === "function") {
        char.setAttribute("aria-hidden", "true");
      }
    });
    
    return (splits as any)[type];
  };

  // Stripe animations
  const calcX = (i: number, heroStripes: HTMLElement[]) => {
    return i % 2 === 0
      ? -heroStripes[i].scrollWidth
      : heroStripes[i].scrollWidth;
  };

  const animateStripesIn = (heroStripes: HTMLElement[], stripes: Element[]) => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    
    gsap.set(heroStripes, {
      autoAlpha: 1,
      x: (i) => calcX(i, heroStripes),
      yPercent: (i) => (heroStripes.length / 2 - i) * 80,
    });
    
    gsap.set(stripes, {
      rotation: () => Math.random() * 30,
      ease: "expo.out",
    });
    
    gsap.to(heroStripes, {
      x: 0,
      delay: 0.2,
      duration: () => Math.random() + 1.2,
      ease: "expo.out",
    });
  };

  const animateStripesOut = (heroStripes: HTMLElement[]) => {
    gsap.to(heroStripes, {
      x: (i) => calcX(i, heroStripes),
      duration: 0.8,
      ease: "expo.out",
    });
  };

  // Title and content animations
  const animateIn = async (titleChars: Element[], parLines: Element[], delay = 0) => {
    setIsIn(true);
    
    if (layerRef.current) {
      const stripes = [...layerRef.current.children];
      const heroStripes = stripes.map(item => item.children[0] as HTMLElement);
      animateStripesOut(heroStripes);
    }
    
    gsap.to(parLines, {
      autoAlpha: 1,
      yPercent: 0,
      duration: 0.8,
      delay: 0.65,
      ease: "expo.out",
      stagger: {
        each: 0.08,
      },
    });
    
    await gsap.to(titleChars, {
      yPercent: 0,
      duration: 1.2,
      delay: delay,
      ease: "expo.out",
      stagger: {
        each: 0.01,
        from: "end",
      },
    });
  };

  const animateOut = async (titleChars: Element[], parLines: Element[]) => {
    setIsIn(false);
    
    if (layerRef.current) {
      const stripes = [...layerRef.current.children];
      const heroStripes = stripes.map(item => item.children[0] as HTMLElement);
      animateStripesIn(heroStripes, stripes);
    }
    
    gsap.to(parLines, {
      autoAlpha: 0,
      yPercent: 100,
      duration: 0.8,
      ease: "expo.out",
      stagger: {
        each: 0.08,
      },
    });
    
    await gsap.to(titleChars, {
      yPercent: 110,
      duration: 0.8,
      ease: "expo.out",
      delay: 0.1,
      stagger: {
        each: 0.01,
        from: "center",
      },
    });
  };

  // Scribble animation
  const animateScribble = (scribbles: SVGPathElement[]) => {
    gsap.set(scribbles, { autoAlpha: 0, rotation: 0 });
    
    const tl = gsap.timeline();
    const scribblesToAnimate = [...scribbles].reverse();
    
    scribblesToAnimate.forEach((item, index) => {
      const randomRotation = Math.random() * 20 - 10;
      const baseDelay = index * 0.015;
      
      tl.add(
        gsap.set(item, {
          autoAlpha: 1,
          rotation: randomRotation,
          delay: baseDelay,
        })
      );
      
      tl.add(
        gsap.set(item, {
          autoAlpha: 0,
          delay: baseDelay + 0.01,
        })
      );
    });
  };

  useEffect(() => {
    if (!wrapperRef.current || !titleRef.current || !parRef.current || !layerRef.current) return;

    // Split text
    const titleSpans = titleRef.current.querySelectorAll('.main-he-span');
    const titleChars = split([...titleSpans], 'chars');
    const parLines = split([parRef.current], 'lines');
    
    setTitleSplit(titleChars);
    setParSplit(parLines);

    // Initial states
    gsap.set(titleChars, { yPercent: -110 });
    gsap.set(layerRef.current, { autoAlpha: 1 });
    gsap.set(toggleRef.current, { scale: 3, rotation: 360 });
    gsap.set(parLines, { autoAlpha: 0, yPercent: 100 });
    gsap.set(alphaRef.current, { autoAlpha: 0, scale: 0.7 });
    
    if (scribbleRef.current) {
      const scribbles = scribbleRef.current.querySelectorAll('path');
      gsap.set(scribbles, { autoAlpha: 0 });
    }

    // Parallax layer effect
    gsap.to(layerRef.current, {
      yPercent: 10,
      scrollTrigger: {
        trigger: layerRef.current,
        start: "top top",
        end: "+=100%",
        scrub: true,
      },
    });

    // Hide hero stripes initially
    const stripes = [...layerRef.current.children];
    const heroStripes = stripes.map(item => item.children[0] as HTMLElement);
    gsap.set(heroStripes, { autoAlpha: 0 });

    // Initial animation in
    animateIn(titleChars, parLines, 0.6);
    
    gsap.to(toggleRef.current, {
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: "expo.inOut",
    });
    
    gsap.to(alphaRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.8,
      delay: 0.9,
      ease: "expo.out",
    });

    return () => {
      gsap.killTweensOf([titleChars, parLines, layerRef.current, toggleRef.current, alphaRef.current]);
    };
  }, []);

  // Toggle handler
  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!titleSplit || !parSplit) return;
    
    if (e.target.checked) {
      animateOut(titleSplit, parSplit);
    } else {
      animateIn(titleSplit, parSplit);
    }
  };

  // Scribble hover handler
  const handleScribbleHover = () => {
    if (!isIn || !scribbleRef.current) return;
    const scribbles = scribbleRef.current.querySelectorAll('path') as NodeListOf<SVGPathElement>;
    animateScribble([...scribbles]);
  };

  return (
    <header id="hero" ref={wrapperRef} data-module="hero" className="sec hero">
      <div className="comp">
        <h1 ref={titleRef} data-hero="title" aria-label="make it mean more with gsap" className="font-c hero-text">
          <span className="main-he-span">MAKE IT MEAN</span>
          <span className="main-he-span">MORE WITH GSAP</span>
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
          onMouseEnter={handleScribbleHover}
        >
          <g className="scribbles-svg" clipPath="url(#a)">
            <path fill="currentColor" d="M219.464 334.793c-1.777-.164-3.165-.327-4.554-1.001-4.514-2.144-9.762-2.43-14.112-4.595-4.861-2.41-10.58-1.593-15.052-5.004-1.593-1.205-4.023-1.123-6.045-1.674-8.782-2.39-17.053-6.515-26.162-7.945-2.859-.449-5.024-2.941-7.883-3.758-5.494-1.552-11.131-2.757-16.318-4.983-2.839-1.225-6.433-1.123-8.537-4.105-.776-1.123-2.349-.919-3.656-.98-3.819-.204-7.25-1.266-9.946-4.187-.408-.449-1.225-1.082-1.593-.939-3.39 1.307-5.493-.286-7.209-2.962-4.922-.408-9.088-3.451-13.99-3.962-2.838-.286-5.963.348-8.067-2.43-5.677-.245-9.925-4.534-15.317-5.412-2.165-.347-3.022-2.206-4.942-2.859-5.943-2.002-11.968-4.044-17.462-7.005-4.044-2.186-8.557-3.145-12.417-5.923-2.737-1.961-6.556-2.287-9.292-4.799-3.676-3.37-8.108-5.617-12.887-7.046-2.124-.633-2.492-2.471-3.207-4.024-2.001-4.35 0-9.966 4.105-11.988 1.062-.531 1.859 0 2.758.347 2.164.838 3.941 2.288 5.902 3.452 7.78 4.636 15.154 9.925 23.22 14.092 1.001.51 1.961 1.266 3.064 1.429 7.148 1.062 13.336 4.514 19.688 7.638 2.593 1.287 5.432 2.492 8.271 2.798 3.268.368 5.84 1.798 8.435 3.452a13.564 13.564 0 0 0 4.452 1.858c6.882 1.552 13.724 3.248 19.994 6.679 5.616-.593 8.618 4.942 13.867 5.738 5.106.777 9.701 3.615 14.316 6.046.286.143.572.408.879.429 8.822.673 16.624 4.942 24.936 7.352 5.821 1.695 11.641 3.737 17.38 5.902 4.268 1.593 8.475 3.656 13.132 4.125.49.041 1.062-.04 1.429.164 6.086 3.492 12.826 4.758 19.566 6.351 6.555 1.552 12.866 4.207 19.197 6.658 3.615 1.389 7.373 1.001 11.029 1.552 1.143.184 2.062-.735 3.063-1.307 6.249-3.615 12.438-7.454 19.177-9.966 6.474-2.43 12.887-4.963 19.198-7.781 5.698-2.533 11.212-5.555 17.645-5.862.327 0 .694-.04.96-.204 6.739-4.37 15.072-3.696 22.118-7.087.143-.061.306-.163.449-.143 7.577 1.124 14.643-2.287 22.098-2.43 6.331-.122 12.621-1.021 18.932-1.511 5.085-.409 10.211.531 15.317.898 5.106.368 9.395 2.798 13.397 5.004 8.986 4.922 10.906 14.214 4.044 22.363-3.206 3.819-5.494 8.394-9.354 11.743-.612.531-1.164 1.328-1.858 1.512-5.065 1.225-9.047 4.983-13.99 6.229-3.492.878-6.555 2.798-10.109 3.369-.797.123-1.675.205-2.369.552-5.657 2.92-12.131 2.941-17.952 5.248-1.144.45-2.226.715-3.308.327-2.267-.837-4.126-.204-5.923 1.185-.654.51-1.654 1.103-2.247.633-2.675-2.124-5.677 1.348-8.332-.633-.245-.184-1.001.041-1.348.286-3.247 2.246-6.821 1.429-10.416 1.368-6.617-.102-13.213.184-19.83.347-2.635.061-5.167-.51-7.7-1.062-1.266-.286-2.614-1.103-3.778-.878-6.78 1.266-12.785-2.001-19.157-3.063-.796-.123-1.613-.307-2.43-.307-3.206-.041-6.331 0-9.252-1.96-1.776-1.185-4.023-1.042-6.065.081-4.309 2.349-8.231 5.208-10.11 9.865-1.531 3.798-5.167 4.676-7.964 6.739-.674.49-1.593 0-2.247-.531-.633-.51-1.123-1.246-1.818-1.613-1.817-1.001-4.125-1.471-3.962-4.289.205-3.431.143-7.189 3.227-9.333 2.267-1.573 3.656-3.513 4.963-6.229l-.041-.041Zm40.662-6.576c6.699 2.307 13.173 3.247 19.81 3.349 1.287.02 2.574-.184 3.819.49 1.655.919 3.431.572 5.229.592 6.269.041 12.478-1.184 18.809-.592 4.187.409 8.782.572 12.683-.715 7.842-2.573 16.706-.857 23.833-6.024 4.493.367 8.455-1.941 12.744-2.472 1.838-.224 3.411-.776 4.943-1.858 2.062-1.45 4.125-3.411 6.453-3.86 4.616-.919 7.843-3.717 10.947-6.74 2.328-2.266 1.552-5.024-1.368-6.474-1.634-.796-3.289-1.245-5.127-1.307-2.675-.081-5.534.123-7.985-.408-6.106-1.368-11.784.735-17.645 1.082-5.31.307-10.416 2.288-15.889 1.614-3.901-.49-7.782.143-11.192 2.389-.735.47-1.43.49-2.288.388-6.126-.694-11.743.776-16.787 4.35-.552.388-1.103.94-1.695.695-2.716-1.103-4.575 1.082-6.821 1.715-3.574 1.021-6.618 3.615-10.58 3.615-1.102 0-2.185.511-3.104 1.307-1.899 1.634-4.37 2.042-6.576 3.023-3.942 1.736-8.088 3.022-12.193 5.82l-.02.021 Z" className="6"></path>
            {/* Additional paths... */}
          </g>
          <defs>
            <clipPath id="a" className="a">
              <path fill="currentColor" d="M0 0h1383.96v1011.61H0z"></path>
            </clipPath>
          </defs>
        </svg>
        
        <label 
          ref={toggleRef}
          data-css="toggle" 
          role="switch" 
          aria-label="turn gsap on" 
          data-hero="toggle" 
          className="toggle-w"
        >
          <div className="toggle-slider-shadow"></div>
          <input type="checkbox" className="toggle-html-input" onChange={handleToggleChange} />
          <span className="toggle-slider">
            <div className="toggle-ball"></div>
          </span>
        </label>
      </div>
      
      <div className="comp">
        <div ref={parRef} data-hero="par" className="par-base _w-ch">
          Well, not just because GSAP, let's dive into why, how and when to incorporate motion design into your websites, with some cloneable templates along the way to get you started
        </div>
        <div ref={alphaRef} data-hero="alpha" className="hero-btn-w">
          <a data-module="btn" href="#content" className="btn-link w-inline-block">
            <div className="overflow">
              <div>Explore templates</div>
            </div>
          </a>
        </div>
      </div>
      
      <div ref={layerRef} data-hero="layer" className="layer hero-alt">
        <div className="hero-stripe-w">
          <div className="hero-stripe">
            <div className="hero-stripe-text">SCROLL INTERACTIONS</div>
            <div className="hero-stripe-text">SCROLL INTERACTIONS</div>
            <div className="hero-stripe-text">SCROLL INTERACTIONS</div>
          </div>
        </div>
        
        <div className="hero-stripe-w">
          <div className="hero-stripe">
            <div className="hero-stripe-text">TEXT EFFECTS</div>
            <div className="hero-inner-img">
              <div data-hero="text" className="hero-img-tx-w">
                <img src="/women-in-sneakers-assets/images/letters-bundle-cutout_1letters-bundle-cutout.avif" loading="lazy" alt="" className="img abs-top z-3" />
                <img src="/women-in-sneakers-assets/images/letters-bundle-shadow_1letters-bundle-shadow.avif" loading="lazy" alt="" className="img multiply" />
              </div>
            </div>
            <div className="hero-stripe-text">TEXT EFFECTS</div>
          </div>
        </div>
        
        <div className="hero-stripe-w">
          <div className="hero-stripe">
            <div className="hero-stripe-text">SLIDERS</div>
            <div className="hero-stripe-text">SLIDERS</div>
            <div className="hero-inner-img">
              <div data-hero="cards" className="hero-slider-w">
                <div className="hero-card layer-1"><img src="/women-in-sneakers-assets/images/Frame-224_1Frame-224.avif" loading="lazy" alt="" className="hero-card-img" /></div>
                <div className="hero-card layer-1"><img src="/women-in-sneakers-assets/images/Frame-226_1Frame-226.avif" loading="lazy" alt="" className="hero-card-img" /></div>
                <div className="hero-card"><img src="/women-in-sneakers-assets/images/Frame-225_1Frame-225.avif" loading="lazy" alt="" className="hero-card-img" /></div>
              </div>
            </div>
            <div className="hero-stripe-text">SLIDERS</div>
            <div className="hero-stripe-text">SLIDERS</div>
          </div>
        </div>
        
        <div className="hero-stripe-w higher">
          <div className="hero-stripe">
            <div className="hero-stripe-text">Inertia Inertia</div>
            <div className="hero-inner-img">
              <div data-hero="video" className="hero-running-w">
                <img src="/women-in-sneakers-assets/images/Frame-223_1Frame-223.avif" loading="lazy" alt="" />
                <video ref={videoRef} loop playsInline autoPlay muted className="alpha-video layered">
                  <source src="https://assets.itsoffbrand.io/gsap-template/assets/running.mp4" type="video/mp4; codecs=hvc1" />
                  <source src="https://assets.itsoffbrand.io/gsap-template/assets/running.webm" type="video/webm" />
                </video>
              </div>
            </div>
            <div className="hero-stripe-text">Inertia Inertia</div>
          </div>
        </div>
        
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
  );
};
