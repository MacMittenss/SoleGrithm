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
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const subHeaderRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const overlay = overlayRef.current;
    const header = headerRef.current;
    const subHeader = subHeaderRef.current;
    const content = contentRef.current;

    // Split header text into words for animation
    if (header && headerText) {
      const words = headerText.split(' ');
      header.innerHTML = words.map(word => `<span class="word opacity-0">${word}</span>`).join(' ');
    }

    // Split subheader text into words if exists
    if (subHeader && subHeaderText) {
      const words = subHeaderText.split(' ');
      subHeader.innerHTML = words.map(word => `<span class="word opacity-0">${word}</span>`).join(' ');
    }

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

        // Step 1: Fade in black overlay
        masterTl.to(overlay, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut"
        })

        // Step 2: Animate header words in sequence
        .fromTo(header?.querySelectorAll('.word') || [], {
          opacity: 0,
          y: 50,
          rotationX: -90
        }, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "+=0.3")

        // Step 3: Animate subheader if exists
        if (subHeader) {
          masterTl.fromTo(subHeader.querySelectorAll('.word'), {
            opacity: 0,
            y: 30
          }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out"
          }, "+=0.2");
        }

        // Step 4: Animate content elements sequentially
        const contentElements = content?.children || [];
        if (contentElements.length > 0) {
          masterTl.fromTo(contentElements, {
            opacity: 0,
            y: 60,
            scale: 0.9
          }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
          }, "+=0.3");
        }

        // Step 5: Fade out overlay to reveal section
        masterTl.to(overlay, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut"
        }, "+=0.5");

        return masterTl;
      }

      function performExitTransition() {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.5,
          ease: "power2.inOut"
        });
      }

    }, section);

    return () => ctx.revert();
  }, [headerText, subHeaderText, isAnimating]);

  return (
    <div
      ref={sectionRef}
      className={`relative min-h-screen ${className}`}
      data-section-id={sectionId}
    >
      {/* Black Overlay for Transitions */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black pointer-events-none z-50 opacity-0"
        style={{ mixBlendMode: 'normal' }}
      />

      {/* Section Content */}
      <div className="relative z-10">
        {/* Header Area */}
        <div className="text-center py-16 px-8">
          <h2
            ref={headerRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ perspective: '1000px' }}
          >
            {headerText}
          </h2>
          {subHeaderText && (
            <p
              ref={subHeaderRef}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
            >
              {subHeaderText}
            </p>
          )}
        </div>

        {/* Main Content */}
        <div ref={contentRef} className="opacity-0">
          {children}
        </div>
      </div>
    </div>
  );
}