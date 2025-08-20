import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CinematicScrollControllerProps {
  children: React.ReactNode;
  sections: string[];
}

export default function CinematicScrollController({
  children,
  sections
}: CinematicScrollControllerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const currentSection = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Disable default scroll behavior during transitions
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioning.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (isTransitioning.current && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'PageUp' || e.key === 'PageDown' || e.key === ' ')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Add event listeners to prevent scrolling during transitions
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeydown, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Set up intersection observer for section transitions
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionElement = entry.target as HTMLElement;
        const sectionId = sectionElement.getAttribute('data-section-id');
        
        if (entry.isIntersecting && !isTransitioning.current) {
          const sectionIndex = sections.indexOf(sectionId || '');
          if (sectionIndex !== -1 && sectionIndex !== currentSection.current) {
            currentSection.current = sectionIndex;
            triggerSectionTransition(sectionElement);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    const sectionElements = container.querySelectorAll('[data-section-id]');
    sectionElements.forEach(section => observer.observe(section));

    function triggerSectionTransition(sectionElement: HTMLElement) {
      isTransitioning.current = true;
      
      // Find the cinematic transition component within this section
      const overlay = document.querySelector('.cinematic-overlay') as HTMLElement;
      
      // Custom event to trigger section animation
      const transitionEvent = new CustomEvent('cinematicTransition', {
        detail: { sectionElement }
      });
      sectionElement.dispatchEvent(transitionEvent);
      
      // Re-enable scrolling after transition completes
      setTimeout(() => {
        isTransitioning.current = false;
      }, 4000); // Adjust based on total animation duration
    }

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('touchmove', handleTouchMove);
      observer.disconnect();
    };
  }, [sections]);

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ scrollBehavior: 'smooth' }}
    >
      {children}
    </div>
  );
}