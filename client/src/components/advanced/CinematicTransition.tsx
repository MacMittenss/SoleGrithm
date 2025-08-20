import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CinematicTransitionProps {
  children: React.ReactNode;
  sectionId: string;
  headerText?: string;
  subHeaderText?: string;
  delay?: number;
  className?: string;
}

export default function CinematicTransition({
  children,
  sectionId,
  headerText,
  subHeaderText,
  delay = 0,
  className = ""
}: CinematicTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const content = contentRef.current;

    const ctx = gsap.context(() => {
      // Create timeline for cinematic transition
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "center center",
          scrub: false,
          onEnter: () => {
            if (!isAnimating) {
              setIsAnimating(true);
              performCinematicTransition();
            }
          },
          onLeave: () => {
            // Trigger exit transition when leaving section
            performExitTransition();
          },
          onEnterBack: () => {
            // Re-enter from bottom
            if (!isAnimating) {
              setIsAnimating(true);
              performCinematicTransition();
            }
          }
        }
      });

      function performCinematicTransition() {
        const masterTl = gsap.timeline({
          onComplete: () => {
            setIsAnimating(false);
          }
        });

        // Animate content elements with smooth scroll entrance
        const contentElements = content?.children || [];
        if (contentElements.length > 0) {
          masterTl.fromTo(contentElements, {
            opacity: 0,
            y: 40,
            scale: 0.95
          }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
          });
        }

        return masterTl;
      }

      function performExitTransition() {
        // Simple fade effect for exit
        const contentElements = content?.children || [];
        if (contentElements.length > 0) {
          gsap.to(contentElements, {
            opacity: 0.7,
            duration: 0.3,
            ease: "power2.inOut"
          });
        }
      }

    }, section);

    return () => ctx.revert();
  }, [headerText, subHeaderText, isAnimating]);

  return (
    <div
      ref={sectionRef}
      className={`relative ${className}`}
      data-section-id={sectionId}
    >
      {/* Section Content */}
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>
    </div>
  );
}