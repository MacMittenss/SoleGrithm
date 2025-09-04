import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MinimapSection {
  id: string;
  title: string;
  progress: number;
}

interface MinimapProps {
  sections: MinimapSection[];
  className?: string;
}

export default function Minimap({ sections, className = '' }: MinimapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Calculate viewport ratio for minimap scaling
    const viewportRatio = window.innerWidth / window.innerHeight;
    
    const ctx = gsap.context(() => {
      // Track scroll progress
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setOverallProgress(self.progress);
          
          // Determine active section based on scroll progress
          const sectionIndex = Math.floor(self.progress * sections.length);
          setActiveSection(Math.min(sectionIndex, sections.length - 1));
        }
      });

      // Set CSS custom properties for the minimap
      if (containerRef.current) {
        containerRef.current.style.setProperty('--viewport-ratio', viewportRatio.toString());
        containerRef.current.style.setProperty('--progress', overallProgress.toString());
      }
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [sections]);

  const handleSectionClick = (index: number, sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`minimap ${className}`}
      style={{
        position: 'fixed',
        top: '50%',
        right: '50px',
        transform: 'translateY(-50%)',
        width: '400px',
        height: 'calc(400px / var(--viewport-ratio, 1.77))',
        zIndex: 9999,
        pointerEvents: 'auto'
      }}
    >
      {/* Minimap container with blur backdrop */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'hidden'
        }}
      >
        {/* Progress indicator */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${overallProgress * 100}%`,
            backgroundColor: 'rgba(255, 41, 0, 0.3)',
            transition: 'height 0.1s ease-out'
          }}
        />

        {/* Section indicators */}
        <div style={{ position: 'relative', height: '100%', padding: '20px' }}>
          {sections.map((section, index) => (
            <div
              key={section.id}
              onClick={() => handleSectionClick(index, section.id)}
              style={{
                position: 'absolute',
                top: `${(index / sections.length) * 100}%`,
                left: '20px',
                right: '20px',
                height: `${100 / sections.length}%`,
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                cursor: 'pointer',
                backgroundColor: activeSection === index ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                borderRadius: '6px',
                transition: 'background-color 0.3s ease',
                borderLeft: activeSection === index ? '3px solid #ff2900' : '3px solid transparent'
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: activeSection === index ? '#fff' : 'rgba(255, 255, 255, 0.6)',
                  fontWeight: activeSection === index ? 500 : 400,
                  fontFamily: '"SF Pro Text", "Helvetica Neue", "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  letterSpacing: '0.01em',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease'
                }}
              >
                {section.title}
              </div>
            </div>
          ))}
        </div>

        {/* Current section highlight */}
        <div
          style={{
            position: 'absolute',
            top: `${(activeSection / sections.length) * 100}%`,
            left: '0',
            width: '4px',
            height: `${100 / sections.length}%`,
            backgroundColor: '#ff2900',
            transition: 'top 0.3s ease',
            borderRadius: '0 2px 2px 0'
          }}
        />
      </div>

      {/* Navigation arrows */}
      <div
        style={{
          position: 'absolute',
          bottom: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px'
        }}
      >
        <button
          onClick={() => {
            const prevIndex = Math.max(0, activeSection - 1);
            handleSectionClick(prevIndex, sections[prevIndex]?.id);
          }}
          disabled={activeSection === 0}
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '6px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: activeSection === 0 ? 0.3 : 1,
            transition: 'opacity 0.3s ease'
          }}
        >
          ↑
        </button>
        <button
          onClick={() => {
            const nextIndex = Math.min(sections.length - 1, activeSection + 1);
            handleSectionClick(nextIndex, sections[nextIndex]?.id);
          }}
          disabled={activeSection === sections.length - 1}
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '6px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: activeSection === sections.length - 1 ? 0.3 : 1,
            transition: 'opacity 0.3s ease'
          }}
        >
          ↓
        </button>
      </div>
    </div>
  );
}