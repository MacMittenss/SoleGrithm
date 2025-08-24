import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ScrollSnapContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollSnapContainer({ children, className }: ScrollSnapContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // For now, just handle the animate-in elements without conflicting scroll triggers
      let sections = gsap.utils.toArray(containerRef.current?.children || []);

      sections.forEach((section: any, i) => {
        let elements = section.querySelectorAll(".animate-in");
        if (elements.length > 0) {
          gsap.from(elements, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
              id: `animate-${i}`
            }
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
    >
      {children}
    </div>
  );
}