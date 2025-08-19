import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'framer-motion';

interface GradientTextProps {
  children: string;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  illuminateEffect?: boolean;
  blurIntensity?: number;
  animationDuration?: number;
}

export default function GradientText({
  children,
  className = '',
  gradientFrom = '#ff2900',
  gradientTo = '#581dff',
  illuminateEffect = true,
  blurIntensity = 30,
  animationDuration = 2
}: GradientTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const blurredRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    if (!containerRef.current || !isInView) return;

    const ctx = gsap.context(() => {
      // Create the illumination effect
      if (illuminateEffect && blurredRef.current) {
        // Animate the blurred background for glow effect
        gsap.to(blurredRef.current, {
          opacity: 0.8,
          scale: 1.1,
          duration: animationDuration,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }

      // Animate the main text reveal
      if (textRef.current) {
        gsap.fromTo(textRef.current,
          {
            backgroundPosition: '200% center',
            opacity: 0
          },
          {
            backgroundPosition: '0% center',
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            delay: 0.5
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isInView, illuminateEffect, animationDuration]);

  const gradientStyle = {
    background: `linear-gradient(90deg, ${gradientFrom} 0%, #fe7a60 61%, ${gradientTo} 100%)`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% 100%'
  };

  return (
    <div 
      ref={containerRef}
      className={`gradient-text ${className}`}
      style={{ 
        position: 'relative',
        display: 'inline-block',
        color: '#fff'
      }}
    >
      {/* Blurred background for glow effect */}
      {illuminateEffect && (
        <div
          ref={blurredRef}
          className="blurred-text"
          style={{
            ...gradientStyle,
            filter: `blur(${blurIntensity}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,
            zIndex: 0
          }}
        >
          {children}
        </div>
      )}
      
      {/* Main gradient text */}
      <div
        ref={textRef}
        className="gradient-text-main"
        style={{
          ...gradientStyle,
          position: 'relative',
          zIndex: 1
        }}
      >
        {children}
      </div>
    </div>
  );
}