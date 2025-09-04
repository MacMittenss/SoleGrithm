import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'framer-motion';

interface BlurryGradientProps {
  className?: string;
  colors?: string[];
  intensity?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: 'top' | 'bottom' | 'center';
  animated?: boolean;
  lowFade?: boolean;
}

export default function BlurryGradient({
  className = '',
  colors = ['#ff2900', '#fe7a60', '#581dff'],
  intensity = 100,
  size = 'lg',
  position = 'bottom',
  animated = true,
  lowFade = false
}: BlurryGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const sizeMap = {
    sm: '200px',
    md: '400px',
    lg: '600px',
    xl: '800px'
  };

  const positionMap = {
    top: { top: `-${intensity}px` },
    bottom: { bottom: `-${intensity}px` },
    center: { top: '50%', transform: 'translateY(-50%)' }
  };

  useEffect(() => {
    if (!gradientRef.current || !isInView || !animated) return;

    const ctx = gsap.context(() => {
      // Floating animation
      gsap.to(gradientRef.current, {
        y: 20,
        rotation: 5,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });

      // Pulsing opacity
      gsap.to(gradientRef.current, {
        opacity: 0.8,
        duration: 3,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      });

      // Scale breathing effect
      gsap.to(gradientRef.current, {
        scale: 1.2,
        duration: 5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isInView, animated]);

  const gradientStyle = {
    background: `radial-gradient(ellipse, ${colors.join(', ')})`,
    width: sizeMap[size],
    height: sizeMap[size],
    filter: `blur(${intensity}px)`,
    borderRadius: '50%',
    opacity: 0.6,
    ...positionMap[position]
  };

  const maskStyle = lowFade ? {
    maskImage: `radial-gradient(closest-side, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 55%)`,
    WebkitMaskImage: `radial-gradient(closest-side, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 55%)`
  } : {};

  return (
    <div
      ref={containerRef}
      className={`blurry-gradient ${className}`}
      style={{
        position: 'absolute',
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 0,
        ...positionMap[position]
      }}
    >
      <div
        className={`blurry-gradient-mask ${lowFade ? 'low-fade' : ''}`}
        style={maskStyle}
      >
        <div
          ref={gradientRef}
          className="blurry-gradient-element"
          style={gradientStyle}
        />
      </div>
    </div>
  );
}