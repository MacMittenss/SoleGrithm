import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrambleTextPlugin);

type TextType = 'chars' | 'words' | 'scramble' | 'alpha' | 'side' | 'updown';

const ITEMS: { type: TextType; label: string; caption: string; delay: number }[] = [
  { type: 'chars', label: 'Split Chars', caption: 'Character Split Reveal', delay: 0.1 },
  { type: 'words', label: 'Split By Words', caption: 'Word Split Reveal', delay: 0.2 },
  { type: 'scramble', label: 'Scramble', caption: 'Scramble Text Reveal', delay: 0.1 },
  { type: 'alpha', label: 'Split Alpha', caption: 'Alpha Reveal', delay: 0.1 },
  { type: 'side', label: 'From the Side', caption: 'SIide Char Reveal', delay: 0.1 },
  { type: 'updown', label: 'Up and Down', caption: 'Up and down Reveal', delay: 0.1 },
];

function split(text: HTMLElement, type: 'chars' | 'words') {
  text.setAttribute('aria-label', text.textContent || '');
  const splits = new SplitText(text, { type });
  const chars = type === 'chars' ? splits.chars : splits.words;
  chars.forEach((el) => (el as HTMLElement).setAttribute('aria-hidden', 'true'));
  return chars;
}

const baseAnimation = (item: HTMLElement, duration: number, delay: number) => ({
  duration,
  delay,
  ease: 'expo.out',
  stagger: { each: 0.04, from: 'start' as const },
  scrollTrigger: {
    trigger: item,
    toggleActions: 'play reset play reset',
  },
});

function animateSplitReveal(item: HTMLElement, type: 'chars' | 'words', duration: number, delay: number) {
  const text = split(item, type);
  item.style.overflow = 'hidden';
  return gsap.fromTo(text, { yPercent: 120 }, { ...baseAnimation(item, duration, delay), yPercent: 0 });
}

function animateScramble(item: HTMLElement, duration: number, delay: number) {
  const text = item.textContent || '';
  const randomText = Array.from({ length: text.length })
    .map(() => String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65)))
    .join('')
    .toLowerCase();
  const target = item.children[0] as HTMLElement;
  return gsap.fromTo(
    target,
    { scrambleText: randomText },
    { ...baseAnimation(item, duration, delay), scrambleText: text }
  );
}

function animateAlpha(item: HTMLElement, duration: number, delay: number) {
  const text = split(item, 'chars');
  return gsap.fromTo(text, { autoAlpha: 0 }, {
    ...baseAnimation(item, duration, delay),
    autoAlpha: 1,
    stagger: { each: 0.02, from: 'random' },
  });
}

function animateSide(item: HTMLElement, duration: number, delay: number) {
  const outer = split(item, 'chars');
  outer.forEach((char) => ((char as HTMLElement).style.overflow = 'hidden'));
  const inner = split(item.children[0] as HTMLElement, 'chars');
  return gsap.fromTo(inner, { x: 100 }, {
    ...baseAnimation(item, duration, delay),
    x: 0,
    stagger: { each: 0.02, from: 'end' },
  });
}

function animateUpDown(item: HTMLElement, duration: number, delay: number) {
  const outer = split(item, 'chars');
  outer.forEach((char) => ((char as HTMLElement).style.overflow = 'hidden'));
  const inner = split(item.children[0] as HTMLElement, 'chars');
  return gsap.fromTo(
    inner,
    { yPercent: (i: number) => (i % 2 === 0 ? 100 : -100) },
    { ...baseAnimation(item, duration, delay), yPercent: 0, stagger: { each: 0.02, from: 'random' } }
  );
}

export const TextSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = Array.from(sectionRef.current.querySelectorAll<HTMLElement>('[data-animate="text"]'));
    const tweens = items.map((item) => {
      const type = item.dataset.type as TextType;
      const duration = parseFloat(item.dataset.duration || '1.2');
      const delay = parseFloat(item.dataset.delay || '0');
      switch (type) {
        case 'chars':
          return animateSplitReveal(item, 'chars', duration, delay);
        case 'words':
          return animateSplitReveal(item, 'words', duration, delay);
        case 'scramble':
          return animateScramble(item, duration, delay);
        case 'alpha':
          return animateAlpha(item, duration, delay);
        case 'side':
          return animateSide(item, duration, delay);
        case 'updown':
          return animateUpDown(item, duration, delay);
        default:
          return null;
      }
    });

    return () => {
      tweens.forEach((tween) => {
        tween?.scrollTrigger?.kill();
        tween?.kill();
      });
    };
  }, []);

  return (
    <section id="text" className="sec" ref={sectionRef}>
      <ul role="list" className="comp text-exp w-list-unstyled">
        {ITEMS.map((item) => (
          <li key={item.type} className="text-g-item">
            <div className="text-example-container">
              <div
                data-delay={item.delay}
                data-animate="text"
                data-type={item.type}
                data-duration="1.2"
                className="text-effect-w"
              >
                <div className="text-effect-tx">{item.label}</div>
              </div>
            </div>
            <div className="text-example-tx-w">
              <div>{item.caption}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="explainer-w">
        <div data-module="explainer" data-css="explainer" className="explainer-comp">
          <label className="div">
            <input type="checkbox" className="input" />
            <span className="span">
              <div className="explainer-he">Split, animate, reveal</div>
              <div className="plus-icon-w">
                <div className="plus-line rotate"></div>
                <div className="plus-line"></div>
              </div>
            </span>
          </label>
          <div data-css="" className="explainer-expandable-w">
            <div className="explainer-overflow">
              <div className="explainer-content-w">
                <p className="explainer-par">
                  Animate each one independently. It's all motion, no compromise: screen readers and search engines
                  still see the original text.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
