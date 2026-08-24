import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export const ScrollTriggerSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const videoLayerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !videoLayerRef.current || !imgRef.current) return;

    const section = sectionRef.current;
    const video = videoLayerRef.current;
    const img = imgRef.current;

    const split = new SplitText(titleRef.current, { type: 'chars' });
    split.chars.forEach((char) => (char as HTMLElement).setAttribute('aria-hidden', 'true'));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom bottom+=100%',
        invalidateOnRefresh: true,
        scrub: 1,
      },
    });

    gsap.set(split.chars, {
      scale: 0,
      rotation: () => Math.random() * 360 - 180,
    });

    tl.to(split.chars, {
      scale: 1,
      duration: 0.2,
      rotation: 0,
      ease: 'expo.out',
      stagger: { each: 0.05, from: 'random' },
    });

    tl.fromTo(
      video,
      { clipPath: 'inset(10% 50% 10% 50%)', yPercent: 100 },
      { ease: 'power3', clipPath: 'inset(0% 0% 0% 0%)', duration: 1, yPercent: 0 },
      '.3'
    );

    tl.fromTo(
      video,
      { scale: 0.5 },
      { ease: 'back.inOut(.2)', scale: 1, duration: 0.8 },
      '<'
    );

    tl.fromTo(
      img,
      { scale: 2.8, yPercent: 40 },
      { scale: 1.2, duration: 0.8, delay: 0.2, yPercent: 0 },
      '<'
    );

    tl.to(video, { scale: 0.9, ease: 'linear' });
    tl.to(img, { scale: 1, ease: 'linear' }, '<');

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) trigger.kill();
      });
    };
  }, []);

  return (
    <section
      id="scrolltrigger"
      data-animate="videogrow"
      className="sec scrolltrigger-sec"
      ref={sectionRef}
    >
      <div className="sticky-w">
        <div className="comp video">
          <div ref={titleRef} data-videogrow="title" className="font-c size-screen overflow-cut">
            Scrolltrigger
          </div>
        </div>
        <div className="layer" ref={videoLayerRef}>
          <div data-videogrow="video" className="sky-scroller">
            <img
              ref={imgRef}
              src="/women-in-sneakers-assets/images/sky_1sky.avif"
              loading="lazy"
              sizes="100vw"
              alt=""
              className="img-sky"
            />
          </div>
        </div>
      </div>
      <div className="layer flex-b z-3">
        <div className="explainer-w">
          <div data-module="explainer" data-css="explainer" className="explainer-comp">
            <label className="div">
              <input type="checkbox" className="input" />
              <span className="span">
                <div className="explainer-he">Scroll with purpose</div>
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
                    Start animations when elements enter the viewport, scrub through timelines, pin elements in
                    place, or snap to key points as users scroll.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
