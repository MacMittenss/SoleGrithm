import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export const ScrollTriggerSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    const section = sectionRef.current;
    const title = titleRef.current;
    const video = section.querySelector('[data-st="video"]');

    // Animate title with SplitText
    const split = new SplitText(title, { type: 'chars,words' });
    
    gsap.from(split.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.02,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    });

    // Video grow animation
    if (video) {
      gsap.fromTo(
        video,
        {
          scale: 0.8,
          borderRadius: '2rem',
        },
        {
          scale: 1,
          borderRadius: '0rem',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section id="scrolltrigger" data-animate="scrolltrigger" className="sec st" ref={sectionRef}>
      <div className="container-xl">
        <h2 ref={titleRef} className="he-1">
          Sync any animation to scroll
        </h2>
      </div>
      <div className="st-content-w">
        <div data-st="video" className="st-vid-w">
          <video
            className="vid-1 st-vid"
            autoPlay
            loop
            muted
            playsInline
            data-wf-ignore="true"
            data-object-fit="cover"
          >
            <source src="/women-in-sneakers-assets/videos/Scrolling_1scrolling.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="explainer-w">
          <div data-module="explainer" data-css="explainer" className="explainer-comp">
            <label className="div">
              <input type="checkbox" className="input" />
              <span className="span">
                <div className="explainer-he">Scroll-linked Animation</div>
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
                    ScrollTrigger lets your animations respond naturally to the scroll position, creating a seamless
                    link between user input and visual feedback. Perfect for creating immersive scroll-driven
                    experiences.
                  </p>
                </div>
              </div>
            </div>
            <div className="explainer-copy-btn-w">
              <button
                data-module="copybtn"
                data-copy="https://cdn.prod.website-files.com/67fea42b19018db93e3fe132/6811e2c7ffc63ec3f7f60942_scrolltrigger-final.json.txt"
                className="btn copy"
              >
                <div className="btn-cent-w">
                  <div className="text-block">Copy this</div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 9 11" fill="none" className="svg copy-icon">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5 1.5H1V6.5H5V1.5ZM0 0.5V7.5H6V0.5H0Z" fill="currentColor"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 8.757V10.5H9V3.5H7.42V4.5H8V9.5H4V8.757H3Z" fill="currentColor"></path>
                  </svg>
                </div>
              </button>
            </div>
            <div className="mobile-explainer-prompt">Copy this on Desktop</div>
          </div>
        </div>
      </div>
    </section>
  );
};
