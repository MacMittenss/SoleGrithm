import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MarqueeTextProps {
  text: string;
  className?: string;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
}

export default function MarqueeText({
  text,
  className = '',
  speed = 1,
  direction = 'left',
  pauseOnHover = true
}: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !innerRef.current) return;

    const container = containerRef.current;
    const inner = innerRef.current;

    // Create multiple copies of the text for seamless loop
    const textContent = `${text} • `.repeat(10);
    inner.innerHTML = `<span>${textContent}</span><span>${textContent}</span>`;

    const ctx = gsap.context(() => {
      const spans = inner.querySelectorAll('span');
      
      // Set initial positions
      gsap.set(spans[1], { x: '100%' });

      // Create continuous animation
      const tl = gsap.timeline({ repeat: -1 });
      
      spans.forEach((span, index) => {
        tl.to(span, {
          x: direction === 'left' ? '-100%' : '100%',
          duration: speed * 20,
          ease: 'none'
        }, index * speed * 10);
      });

      // Pause on hover
      if (pauseOnHover) {
        container.addEventListener('mouseenter', () => tl.pause());
        container.addEventListener('mouseleave', () => tl.play());
      }
    }, containerRef);

    return () => ctx.revert();
  }, [text, speed, direction, pauseOnHover]);

  return (
    <div
      ref={containerRef}
      className={`marquee ${className}`}
      style={{
        display: 'flex',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%'
      }}
    >
      <div
        ref={innerRef}
        className="marquee-inner"
        style={{
          display: 'flex',
          whiteSpace: 'nowrap'
        }}
      />
    </div>
  );
}