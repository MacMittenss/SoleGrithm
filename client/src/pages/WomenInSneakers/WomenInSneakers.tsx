import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { SplitText } from 'gsap/SplitText';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { HeroSection } from './HeroSection';
import { FlipSection } from './FlipSection';
import { ScrollTriggerSection } from './ScrollTriggerSection';
import { SliderSection } from './SliderSection';
import { InertiaSection } from './InertiaSection';
import { TextSection } from './TextSection';
import { MarqueeSection } from './MarqueeSection';
import { Footer } from './Footer';
import './women-in-sneakers.css';

gsap.registerPlugin(ScrollTrigger, Flip, SplitText, Draggable, InertiaPlugin, ScrambleTextPlugin);

export default function WomenInSneakers() {
  const lenisRef = useRef<Lenis | null>(null);
  const smoothWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remove dark mode and set background for this page
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    const appWrapper = document.querySelector('.min-h-screen.bg-background') as HTMLElement;

    // Store original classes
    const originalHtmlClass = htmlElement.className;
    const originalBodyClass = bodyElement.className;
    const originalAppWrapperClass = appWrapper?.className;

    // This page ports its own Webflow reference CSS (Anton/.font-c, Work Sans) directly.
    // The site-wide anton-all font toggle collides with those same class names
    // (e.g. .hero-text) and forces the wrong font/casing, so disable it here.
    bodyElement.classList.remove('anton-all');

    // Remove dark class and set page background/text
    htmlElement.classList.remove('dark');
    htmlElement.style.backgroundColor = '#000';
    bodyElement.style.backgroundColor = '#000';
    bodyElement.style.color = '#fff';

    // Override app wrapper background
    if (appWrapper) {
      appWrapper.style.backgroundColor = '#000';
      appWrapper.style.color = '#fff';
    }
    
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Dispatch custom event for animations, and re-measure scroll triggers now
    // that custom fonts (Anton/WorkSans) have swapped in. Sections that create
    // scrub-based ScrollTriggers on mount (marquee travel distance, hero layer
    // parallax, split-char positions) measure element size/position at effect
    // time, which can happen before font swap reflows the layout - refreshing
    // here recalculates every trigger's start/end against the final layout.
    const sendGsapEvent = () => {
      window.dispatchEvent(
        new CustomEvent('GSAPReady', {
          detail: { lenis },
        })
      );
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    // Check if fonts are loaded
    if (document.fonts.status === 'loaded') {
      sendGsapEvent();
    } else {
      document.fonts.ready.then(() => {
        sendGsapEvent();
      });
    }

    // Handle resize
    let resizeTimeout: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);
    };

    window.addEventListener('resize', onResize);

    // Show content after init
    queueMicrotask(() => {
      gsap.to('[data-start="hidden"]', {
        autoAlpha: 1,
        duration: 0.1,
        delay: 0.2,
      });
    });

    return () => {
      // Restore original classes and styles when leaving page
      const appWrapper = document.querySelector('.min-h-screen.bg-background') as HTMLElement;
      
      document.documentElement.className = originalHtmlClass;
      document.documentElement.style.backgroundColor = '';
      document.body.className = originalBodyClass;
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      
      if (appWrapper) {
        appWrapper.style.backgroundColor = '';
        appWrapper.style.color = '';
        if (originalAppWrapperClass) {
          appWrapper.className = originalAppWrapperClass;
        }
      }
      
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      id="smooth-wrapper" 
      ref={smoothWrapperRef} 
      data-start="hidden" 
      className="scroll-wrapper"
      style={{
        backgroundColor: '#000',
        color: '#fff',
        minHeight: '100vh',
        width: '100%',
        position: 'relative'
      }}
    >
      <main 
        id="smooth-content" 
        className="main"
        style={{
          backgroundColor: '#000',
          minHeight: '100vh'
        }}
      >
        <HeroSection />
        <div id="content">
          <FlipSection />
          <ScrollTriggerSection />
          <SliderSection />
          <InertiaSection />
          <TextSection />
          <MarqueeSection />
          <Footer />
        </div>
      </main>
    </div>
  );
}
