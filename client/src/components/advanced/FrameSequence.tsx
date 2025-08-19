import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface FrameSequenceProps {
  frames: string[];
  className?: string;
  triggerElement?: string;
  scrub?: boolean;
  autoplay?: boolean;
  fps?: number;
}

export default function FrameSequence({
  frames,
  className = '',
  triggerElement,
  scrub = true,
  autoplay = false,
  fps = 30
}: FrameSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const isInView = useInView(containerRef, { once: true });

  // Preload images
  useEffect(() => {
    if (frames.length === 0) return;

    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    frames.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frames.length) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
      images[index] = img;
    });

    return () => {
      images.forEach(img => {
        img.onload = null;
      });
    };
  }, [frames]);

  // Setup scroll-triggered animation
  useEffect(() => {
    if (!containerRef.current || !imagesLoaded || !isInView) return;

    const ctx = gsap.context(() => {
      if (scrub) {
        // Scroll-triggered frame sequence
        ScrollTrigger.create({
          trigger: triggerElement || containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const frameIndex = Math.round(self.progress * (frames.length - 1));
            setCurrentFrame(frameIndex);
          }
        });
      } else if (autoplay) {
        // Auto-playing sequence
        const interval = setInterval(() => {
          setCurrentFrame(prev => (prev + 1) % frames.length);
        }, 1000 / fps);

        return () => clearInterval(interval);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [imagesLoaded, isInView, scrub, autoplay, fps, frames.length, triggerElement]);

  if (!imagesLoaded) {
    return (
      <div
        className={`frame-sequence-loading ${className}`}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000'
        }}
      >
        <div style={{ color: '#fff', fontSize: '14px' }}>Loading frames...</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`frame-sequence ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    >
      {frames.map((frame, index) => (
        <img
          key={index}
          src={frame}
          alt={`Frame ${index + 1}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: index === currentFrame ? 1 : 0,
            transition: scrub ? 'none' : 'opacity 0.1s ease'
          }}
        />
      ))}
      
      {/* Frame counter */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: '#fff',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          fontFamily: 'monospace'
        }}
      >
        {currentFrame + 1} / {frames.length}
      </div>
    </div>
  );
}