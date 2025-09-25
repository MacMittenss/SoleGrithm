
import React, { useRef, useEffect } from "react";

const InertiaSection: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsap: any, Draggable: any, InertiaPlugin: any;
    let ctx: any;
    (async () => {
      gsap = (await import("gsap")).default;
      Draggable = (await import("gsap/Draggable")).default;
      InertiaPlugin = (await import("gsap/InertiaPlugin")).default;
      if (gsap && Draggable && InertiaPlugin) {
        gsap.registerPlugin(Draggable, InertiaPlugin);
      }
      ctx = gsap.context(() => {
        if (!wrapperRef.current || !demoRef.current) return;
        const ball = demoRef.current.querySelector(".inertia-ball");
        const shadow = demoRef.current.querySelector(".inertia-shadow");
        if (!ball || !shadow) return;

        Draggable.create(ball, {
          type: "x,y",
          inertia: true,
          edgeResistance: 0.65,
          bounds: demoRef.current,
          onDrag: function () {
            gsap.to(shadow, { x: this.x, y: this.y + 20, scale: 1.2, duration: 0.1 });
          },
          onThrowUpdate: function () {
            gsap.to(shadow, { x: this.x, y: this.y + 20, scale: 1.2, duration: 0.1 });
          },
          onRelease: function () {
            gsap.to(shadow, { scale: 1, duration: 0.3 });
          },
        });
      }, wrapperRef);
    })();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <section id="inertia" className="sec">
      <div data-animate="inertia" className="comp inertia-w" ref={wrapperRef}>
        <div className="inertia-content-w">
          <div className="inertia-title-w">
            <h2 className="font-c size-lg">INERTIA</h2>
            <div className="inertia-desc">GSAP’s inertia plugin lets you throw, flick, and drag elements with realistic momentum and natural-feeling motion.</div>
          </div>
          <div className="inertia-demo-w">
            <div className="inertia-demo" ref={demoRef}>
              <div className="inertia-ball"></div>
              <div className="inertia-shadow"></div>
            </div>
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
                  <p className="explainer-par">Use GSAP’s InertiaPlugin to add momentum-based motion to your UI, making drag-and-drop and swipe interactions feel more natural and fun.</p>
                </div>
              </div>
            </div>
            <div className="explainer-copy-btn-w">
              <button data-module="copybtn" data-copy="https://cdn.prod.website-files.com/67fea42b19018db93e3fe132/6811e2c8e5f450bdf4878517_inertia-final.json.txt" className="btn copy">
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

export default InertiaSection;
