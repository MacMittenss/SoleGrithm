import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Keep GSAP ScrollTrigger in lockstep with Lenis's smoothed scroll
    // position instead of raw native scroll (otherwise every ScrollTrigger
    // on the page fires against stale positions).
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Add lenis class to html
    document.documentElement.classList.add('lenis');

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      document.documentElement.classList.remove('lenis');
    };
  }, []);

  return lenisRef.current;
}