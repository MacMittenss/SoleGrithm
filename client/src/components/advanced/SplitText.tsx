import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'framer-motion';

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  type?: 'chars' | 'words' | 'lines';
  ease?: string;
  animateOnView?: boolean;
  splitClassName?: string;
}

export default function SplitText({
  children,
  className = '',
  delay = 0,
  duration = 1.2,
  stagger = 0.02,
  type = 'chars',
  ease = 'power3.out',
  animateOnView = true,
  splitClassName = ''
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const text = children;
    
    // Split text into spans
    let splitContent = '';
    
    if (type === 'chars') {
      splitContent = text
        .split('')
        .map((char, index) => 
          char === ' ' 
            ? ' ' 
            : `<span class="split-char ${splitClassName}" style="display: inline-block; transform: translateY(100%); opacity: 0;" data-char="${index}">${char}</span>`
        )
        .join('');
    } else if (type === 'words') {
      splitContent = text
        .split(' ')
        .map((word, index) => 
          `<span class="split-word ${splitClassName}" style="display: inline-block; transform: translateY(100%); opacity: 0;" data-word="${index}">${word}</span>`
        )
        .join(' ');
    } else if (type === 'lines') {
      splitContent = text
        .split('\n')
        .map((line, index) => 
          `<span class="split-line ${splitClassName}" style="display: block; transform: translateY(100%); opacity: 0;" data-line="${index}">${line}</span>`
        )
        .join('');
    }

    container.innerHTML = splitContent;
    setIsReady(true);
  }, [children, type, splitClassName]);

  useEffect(() => {
    if (!containerRef.current || !isReady) return;
    if (animateOnView && !isInView) return;

    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll('.split-char, .split-word, .split-line');
      if (!elements || elements.length === 0) return;

      gsap.fromTo(elements, 
        { 
          y: '100%', 
          opacity: 0,
          rotationX: -90,
          transformOrigin: '50% 100%'
        },
        {
          y: '0%',
          opacity: 1,
          rotationX: 0,
          duration,
          ease,
          stagger,
          delay,
          force3D: true
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isReady, isInView, animateOnView, delay, duration, stagger, ease]);

  return (
    <span 
      ref={containerRef}
      className={`split-text ${className}`}
      style={{ position: 'relative', display: 'inline-block' }}
    />
  );
}