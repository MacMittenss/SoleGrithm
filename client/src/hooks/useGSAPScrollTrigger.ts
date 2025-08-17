import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';

interface ScrollTriggerOptions {
  trigger?: RefObject<HTMLElement> | string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export function useGSAPScrollTrigger(
  animation: () => gsap.core.Timeline | gsap.core.Tween,
  options: ScrollTriggerOptions = {}
) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current && !options.trigger) return;

    const trigger = options.trigger
      ? typeof options.trigger === 'string'
        ? options.trigger
        : options.trigger.current
      : elementRef.current;

    if (!trigger) return;

    const tl = animation();
    
    const scrollTrigger = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: options.start || 'top bottom',
        end: options.end || 'bottom top',
        scrub: options.scrub !== undefined ? options.scrub : false,
        pin: options.pin || false,
        markers: options.markers || false,
        onEnter: options.onEnter,
        onLeave: options.onLeave,
        onEnterBack: options.onEnterBack,
        onLeaveBack: options.onLeaveBack,
      },
    });

    scrollTrigger.add(tl);

    return () => {
      scrollTrigger.kill();
    };
  }, [animation, options]);

  return elementRef;
}