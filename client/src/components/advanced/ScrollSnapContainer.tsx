import React, { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ScrollSnapContainerProps {
  children: ReactNode;
  className?: string;
}

interface ScrollSnapSectionProps {
  children: ReactNode;
  className?: string;
  sectionId: string;
  onSnapComplete?: () => void;
}

export function ScrollSnapContainer({ children, className = "" }: ScrollSnapContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Enhanced scroll snapping with GSAP
      const sections = containerRef.current?.querySelectorAll('.scroll-snap-section');
      
      if (sections) {
        sections.forEach((section, index) => {
          // Create smooth snap transitions
          ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => {
              // Trigger section animations when snapping is complete
              const sectionId = section.getAttribute('data-section-id');
              if (sectionId) {
                // Dispatch custom event for section-specific animations
                window.dispatchEvent(new CustomEvent(`snapComplete:${sectionId}`));
              }
            },
            onLeave: () => {
              // Optional: Handle section leave animations
            },
            onEnterBack: () => {
              // Handle reverse scrolling
              const sectionId = section.getAttribute('data-section-id');
              if (sectionId) {
                window.dispatchEvent(new CustomEvent(`snapComplete:${sectionId}`));
              }
            }
          });

          // Smooth scroll control for better snapping
          ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onToggle: self => {
              if (self.isActive) {
                // Section is in view - enhance snapping behavior
                gsap.to(window, {
                  duration: 0.3,
                  ease: "power2.out",
                  onComplete: () => {
                    // Snap complete - trigger animations
                    const sectionId = section.getAttribute('data-section-id');
                    if (sectionId) {
                      window.dispatchEvent(new CustomEvent(`snapAnimationStart:${sectionId}`));
                    }
                  }
                });
              }
            }
          });
        });
      }

      // Global scroll control for presentation-like experience
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: self => {
          // Enhanced scroll behavior for snap control
          const progress = self.progress;
          // Smooth progress tracking for better snap control
          gsap.to(window, {
            duration: 0.1,
            ease: "power1.out"
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`scroll-snap-container ${className}`}
    >
      {children}
    </div>
  );
}

export function ScrollSnapSection({ 
  children, 
  className = "", 
  sectionId, 
  onSnapComplete 
}: ScrollSnapSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Listen for snap complete events
    const handleSnapComplete = (event: CustomEvent) => {
      if (onSnapComplete) {
        onSnapComplete();
      }
    };

    const handleAnimationStart = (event: CustomEvent) => {
      if (sectionRef.current) {
        // Trigger section-specific GSAP animations
        const elements = sectionRef.current.querySelectorAll('[data-snap-animate]');
        
        if (elements.length > 0) {
          // Staggered reveal animation for elements with data-snap-animate
          gsap.fromTo(elements, 
            { 
              opacity: 0, 
              y: 50, 
              scale: 0.95 
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out"
            }
          );
        }

        // Animate words if section has split text
        const words = sectionRef.current.querySelectorAll('.word');
        if (words.length > 0) {
          gsap.fromTo(words,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out"
            }
          );
        }
      }
    };

    window.addEventListener(`snapComplete:${sectionId}`, handleSnapComplete as EventListener);
    window.addEventListener(`snapAnimationStart:${sectionId}`, handleAnimationStart as EventListener);

    return () => {
      window.removeEventListener(`snapComplete:${sectionId}`, handleSnapComplete as EventListener);
      window.removeEventListener(`snapAnimationStart:${sectionId}`, handleAnimationStart as EventListener);
    };
  }, [sectionId, onSnapComplete]);

  return (
    <div 
      ref={sectionRef}
      className={`scroll-snap-section ${className}`}
      data-section-id={sectionId}
    >
      {children}
    </div>
  );
}

export default ScrollSnapContainer;