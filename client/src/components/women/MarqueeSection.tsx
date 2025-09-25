
import React, { useEffect, useRef } from "react";

const MarqueeSection: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | undefined;
    let anim: gsap.core.Tween | undefined;
    let gsapModule: typeof import("gsap") | undefined;

    let running = true;
    (async () => {
      const gsapImport = await import("gsap");
      gsapModule = gsapImport;
      const gsap = gsapImport.default;
      if (!marqueeRef.current || !trackRef.current) return;
      const marquee = marqueeRef.current;
      const track = trackRef.current;

      // Get width of the track and parent
      const trackWidth = track.scrollWidth;
      const parentWidth = marquee.offsetWidth;
      // Animate the track to the left, then reset
      const duration = 12; // Adjust for speed

      ctx = gsap.context(() => {
        anim = gsap.to(track, {
          x: -1 * (trackWidth - parentWidth),
          duration,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x: number) => {
              // Loop seamlessly
              return ((x % (trackWidth - parentWidth)) || 0);
            }),
          },
        });
      }, marquee);
    })();

    return () => {
      running = false;
      if (ctx) ctx.revert();
      if (anim) anim.kill();
    };
  }, []);

  return (
    <section id="marquee" className="sec">
      <div data-animate="marquee" className="comp marquee-w" ref={marqueeRef}>
        <div className="marquee-track-w">
          <div className="marquee-track" ref={trackRef}>
            <span className="marquee-text">
              GSAP MARQUEE &nbsp; GSAP MARQUEE &nbsp; GSAP MARQUEE &nbsp; GSAP MARQUEE &nbsp; GSAP MARQUEE &nbsp; GSAP MARQUEE &nbsp; GSAP MARQUEE &nbsp; GSAP MARQUEE &nbsp;
            </span>
          </div>
        </div>
        <div className="explainer-w">
          <div data-module="explainer" data-css="explainer" className="explainer-comp">
            <label className="div">
              <input type="checkbox" className="input" />
              <span className="span">
                <div className="explainer-he">Make it move</div>
                <div className="plus-icon-w">
                  <div className="plus-line rotate"></div>
                  <div className="plus-line"></div>
                </div>
              </span>
            </label>
            <div data-css="" className="explainer-expandable-w">
              <div className="explainer-overflow">
                <div className="explainer-content-w">
                  <p className="explainer-par">Use GSAP to create seamless, performant marquees and ticker animations for dynamic, attention-grabbing banners.</p>
                </div>
              </div>
            </div>
            <div className="explainer-copy-btn-w">
              <button data-module="copybtn" data-copy="https://cdn.prod.website-files.com/67fea42b19018db93e3fe132/6811e2c8e5f450bdf4878517_marquee-final.json.txt" className="btn copy">
                <div className="btn-cent-w">
                  <div className="text-block">Copy this</div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 9 11" fill="none" className="svg copy-icon">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5 1.5H1V6.5H5V1.5ZM0 0.5V7.5H6V0.5H0Z" fill="currentColor" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 8.757V10.5H9V3.5H7.42V4.5H8V9.5H4V8.757H3Z" fill="currentColor" />
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

export default MarqueeSection;
