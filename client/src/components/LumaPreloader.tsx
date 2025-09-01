import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

interface LumaPreloaderProps {
  onComplete?: () => void;
  duration?: number;
}

export default function LumaPreloader({
  onComplete,
  duration = 3000,
}: LumaPreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Progressive loading animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 4 + 1;
      });
    }, 80);

    // Complete loading after duration
    const timer = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration, onComplete]);

  // Logo animation
  useEffect(() => {
    if (!logoRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(logoRef.current, 
        { 
          scale: 0.8,
          opacity: 0,
          y: 20
        },
        { 
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3
        }
      );

      // Floating animation
      gsap.to(logoRef.current, {
        y: -10,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.5
      });
    }, logoRef);

    return () => ctx.revert();
  }, []);

  // Progress bar animation
  useEffect(() => {
    if (!progressBarRef.current) return;

    gsap.to(progressBarRef.current, {
      width: `${progress}%`,
      duration: 0.3,
      ease: 'power2.out'
    });
  }, [progress]);

  // Exit animation
  useEffect(() => {
    if (!containerRef.current || isLoading) return;

    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  if (!isLoading) {
    return null;
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          ref={containerRef}
          className="luma-preloader"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#000000',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background gradient */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(ellipse at center, rgba(255, 41, 0, 0.1) 0%, transparent 60%)',
              animation: 'lumaGlow 4s ease-in-out infinite alternate'
            }}
          />

          {/* Main logo container */}
          <div
            ref={logoRef}
            className="luma-logo"
            style={{
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
              marginBottom: '4rem'
            }}
          >
            {/* LUMA text with gradient */}
            <div
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                background: 'linear-gradient(90deg, #ff2900 0%, #fe7a60 50%, #581dff 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              LUMA
            </div>

            {/* Subtitle */}
            <div
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.875rem',
                fontWeight: 400,
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}
            >
              Next Gen XR Glasses
            </div>
          </div>

          {/* Progress container */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              width: '320px',
              maxWidth: '80vw'
            }}
          >
            {/* Progress bar background */}
            <div
              style={{
                width: '100%',
                height: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '1px',
                overflow: 'hidden',
                marginBottom: '1rem'
              }}
            >
              {/* Progress bar fill */}
              <div
                ref={progressBarRef}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #ff2900 0%, #fe7a60 50%, #581dff 100%)',
                  borderRadius: '1px',
                  width: '0%'
                }}
              />
            </div>

            {/* Progress text */}
            <div
              style={{
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: '0.75rem',
                fontWeight: 500,
                textAlign: 'center',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
            >
              {Math.round(progress)}%
            </div>
          </div>

          <style>{`
            @keyframes lumaGlow {
              0% {
                opacity: 0.1;
                transform: scale(1);
              }
              100% {
                opacity: 0.2;
                transform: scale(1.1);
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}