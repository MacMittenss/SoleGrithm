import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const MarqueeSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const wrapper = wrapperRef.current;
    const sections = Array.from(wrapper.querySelectorAll<HTMLElement>('[data-marquee="line"]'));
    if (!sections.length) return;

    const tween = gsap.fromTo(
      sections,
      { x: (i: number) => (i % 2 === 0 ? sections[i].offsetWidth / 4 : -sections[i].offsetWidth / 4) },
      {
        x: (i: number) => (i % 2 === 0 ? -sections[i].offsetWidth / 4 : sections[i].offsetWidth / 4),
        scrollTrigger: {
          trigger: wrapper,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="marquee" data-animate="marquee" className="sec" ref={wrapperRef}>
      <div className="comp scroller">
        <div data-marquee="line" className="scroller-line first">
          <div className="scroller-text">SCROLLTRIGGER</div>
          <div className="marquee-img">
            <div className="dual-img">
              <img
                src="/women-in-sneakers-assets/images/socks_1socks.avif"
                loading="eager"
                alt=""
                className="dual-img-img"
              />
              <img
                src="/women-in-sneakers-assets/images/socks-shadow_1socks-shadow.avif"
                loading="eager"
                alt=""
                className="dual-img-shadow"
              />
            </div>
          </div>
          <div className="scroller-text"> MARQUEE</div>
        </div>
        <div data-marquee="line" className="scroller-line second">
          <div className="scroller-text"> MARQUEE</div>
          <div className="marquee-img">
            <div className="dual-img">
              <img
                src="/women-in-sneakers-assets/images/tomato_1tomato.avif"
                loading="eager"
                alt=""
                className="dual-img-img"
              />
              <img
                src="/women-in-sneakers-assets/images/tomato-shadow_1tomato-shadow.avif"
                loading="eager"
                alt=""
                className="dual-img-shadow"
              />
            </div>
          </div>
          <div className="scroller-text">SCROLLTRIGGER</div>
        </div>
      </div>
      <div className="explainer-w">
        <div data-module="explainer" data-css="explainer" className="explainer-comp">
          <label className="div">
            <input type="checkbox" className="input" />
            <span className="span">
              <div className="explainer-he">Marquees forever</div>
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
                  Loop endlessly. Stack images, text, or both. Marquees give rhythm to your page without needing a
                  single click.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
