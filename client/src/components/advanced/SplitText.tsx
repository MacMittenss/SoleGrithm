import React, { useEffect, useRef, useState } from 'react';
import { motion, stagger, useInView } from 'framer-motion';

interface SplitTextProps {
  children: string;
  className?: string;
  type?: 'chars' | 'words' | 'lines';
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  animateOnView?: boolean;
}

export default function SplitText({
  children,
  className = '',
  type = 'chars',
  delay = 0,
  duration = 0.8,
  staggerDelay = 0.02,
  animateOnView = true,
}: SplitTextProps) {
  const [splits, setSplits] = useState<string[]>([]);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    let splitArray: string[] = [];
    
    switch (type) {
      case 'chars':
        splitArray = children.split('');
        break;
      case 'words':
        splitArray = children.split(' ');
        break;
      case 'lines':
        splitArray = children.split('\n');
        break;
      default:
        splitArray = children.split('');
    }
    
    setSplits(splitArray);
  }, [children, type]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 100,
      opacity: 0,
      rotateX: -90,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  const shouldAnimate = animateOnView ? isInView : true;

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      style={{ perspective: 1000 }}
    >
      {splits.map((item, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={itemVariants}
          style={{
            transformOrigin: 'bottom center',
            display: type === 'lines' ? 'block' : 'inline-block',
          }}
        >
          {item === ' ' ? '\u00A0' : item}
          {type === 'words' && index < splits.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.span>
  );
}