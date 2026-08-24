import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const NAV_LINKS = [
  { href: '#flip', label: 'Flip' },
  { href: '#inertia', label: 'Inertia' },
  { href: '#scrolltrigger', label: 'Scroll Trigger' },
  { href: '#slider', label: 'Slider' },
  { href: '#text', label: 'Split Text' },
];

export const Footer = () => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;
    const tween = gsap.from(logoRef.current, {
      autoAlpha: 0,
      y: 24,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: logoRef.current,
        start: 'top bottom',
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <footer data-select="inverse" className="sec footer">
      <div className="comp footer">
        <div className="footer-line separator">
          <div className="col-half">
            <div className="logo-banner-w white">
              <div className="font-c" style={{ fontSize: '1.5rem' }}>
                SOLEGRITHM
              </div>
            </div>
          </div>
          <div className="col-half items-r">
            <div className="_w-ch">
              A GSAP-powered showcase built for SoleGrithm — split text, flip transitions, inertia dragging, and
              scroll-scrubbed motion woven through a women's sneaker style story.
              <br />
              <br />
              Every interaction on this page is one you can find across SoleGrithm: use it as inspiration for what
              motion design can do for a sneaker brand.
            </div>
          </div>
        </div>
        <div className="footer-line">
          <div className="col-half">
            <ul role="list" className="sub-nav-w w-list-unstyled">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link-li-w footer w-inline-block">
                    <div>{link.label}</div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-half items-r">
            <div className="op-70">
              <div className="op-7">©2025 SoleGrithm</div>
            </div>
          </div>
        </div>
      </div>
      <div ref={logoRef} className="comp footer-logo" style={{ textAlign: 'center', padding: '2vw 0' }}>
        <div className="font-c" style={{ fontSize: 'clamp(2rem, 8vw, 6rem)', opacity: 0.15 }}>
          SOLEGRITHM
        </div>
      </div>
    </footer>
  );
};
