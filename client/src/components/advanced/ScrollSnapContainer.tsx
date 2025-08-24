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
      // Grab all sections
      let sections = gsap.utils.toArray("section");

      // Loop through sections and apply snapping + pinning
      sections.forEach((section: any, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          pin: true,           // Keeps section fixed until scroll passes it
          pinSpacing: false,   // Prevents extra space being added
          snap: 1,             // Snaps to the nearest section (1 = whole section)
          markers: false       // Turn on for debugging: true
        });
      });

      // Animate elements inside each section when it becomes active
      sections.forEach((section: any) => {
        let elements = section.querySelectorAll(".animate-in"); // Add this class in your HTML
        if (elements.length > 0) {
          gsap.from(elements, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: section,
              start: "top center",
              toggleActions: "play none none reverse"
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