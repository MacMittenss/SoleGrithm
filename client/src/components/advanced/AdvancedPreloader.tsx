import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import SplitText from './SplitText';

interface AdvancedPreloaderProps {
  onComplete?: () => void;
  duration?: number;
  brandText?: string;
}

export default function AdvancedPreloader({
  onComplete,
  duration = 3000,
  brandText = "SoleGrithm"
}: AdvancedPreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, duration);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 3;
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration, onComplete]);

  useEffect(() => {
    if (!progressBarRef.current) return;

    gsap.to(progressBarRef.current, {
      width: `${progress}%`,
      duration: 0.1,
      ease: 'none'
    });
  }, [progress]);

  useEffect(() => {
    if (!containerRef.current || isLoading) return;

    const ctx = gsap.context(() => {
      // Exit animation
      gsap.to(containerRef.current, {
        y: '-100%',
        duration: 1.2,
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
          className="preloader"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Video/Image Background */}
          <div
            ref={videoWrapperRef}
            className="video-wrapper"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0.3
            }}
          >
            {/* Animated gradient background */}
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'radial-gradient(ellipse at center, rgba(255, 41, 0, 0.3) 0%, rgba(254, 122, 96, 0.2) 35%, rgba(88, 29, 255, 0.3) 100%)',
                animation: 'pulse 2s ease-in-out infinite alternate'
              }}
            />
          </div>

          {/* Main Content */}
          <div className="preloader-inner" style={{ zIndex: 1, textAlign: 'center' }}>
            {/* Brand Text with Split Animation */}
            <div className="text-wrapper" style={{ marginBottom: '2rem' }}>
              <div
                className="text-6xl md:text-8xl font-normal text-white"
                style={{
                  fontFamily: '"SF Pro Display", "Helvetica Neue", "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  fontWeight: 450,
                  letterSpacing: '0.02em'
                }}
              >
                <SplitText
                  type="chars"
                  stagger={0.05}
                  duration={0.8}
                  delay={0.5}
                >
                  {brandText}
                </SplitText>
              </div>
            </div>

            {/* Progress Bar */}
            <div
              className="progress-container"
              style={{
                width: '300px',
                height: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '1px',
                overflow: 'hidden',
                margin: '0 auto'
              }}
            >
              <div
                ref={progressBarRef}
                className="progress-bar"
                style={{
                  height: '100%',
                  backgroundColor: '#fff',
                  width: '0%',
                  borderRadius: '1px'
                }}
              />
            </div>

            {/* Loading Text */}
            <div
              className="loading-text"
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '14px',
                marginTop: '1rem',
                fontFamily: '"SF Pro Text", "Helvetica Neue", "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                fontWeight: 400,
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
            >
              Loading {Math.round(progress)}%
            </div>
          </div>

          <style>{`
            @keyframes pulse {
              0% {
                opacity: 0.3;
                transform: scale(1);
              }
              100% {
                opacity: 0.5;
                transform: scale(1.05);
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}