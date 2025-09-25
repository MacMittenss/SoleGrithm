
import React, { useRef, useEffect } from "react";

const TextEffectsSection: React.FC = () => {
  const demoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsap: any, SplitType: any;
    (async () => {
      gsap = (await import("gsap")).default;
      // Use SplitType or SplitText plugin if available
      try {
        SplitType = (await import("split-type")).default;
      } catch {}
      if (!demoRef.current) return;
      const lines = demoRef.current.querySelectorAll(".text-effects-demo-line");
      lines.forEach((line: any, idx: number) => {
        if (SplitType) {
          const split = new SplitType(line, { types: "chars" });
          gsap.fromTo(
            split.chars,
            { yPercent: 120, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.2,
              ease: "expo.out",
              stagger: { each: 0.04, from: "start" },
              delay: idx * 0.2,
            }
          );
        } else {
          // fallback: animate the line as a whole
          gsap.fromTo(
            line,
            { yPercent: 120, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.2,
              ease: "expo.out",
              delay: idx * 0.2,
            }
          );
        }
      });
    })();
  }, []);

  return (
    <section id="text-effects" className="sec">
      <div data-animate="text-effects" className="comp text-effects-w">
        <div className="text-effects-title-w">
          <h2 className="font-c size-lg">TEXT EFFECTS</h2>
          <div className="text-effects-desc">GSAP makes it easy to animate text with split, type, and reveal effects for dynamic headlines and engaging content.</div>
        </div>
        <div className="text-effects-demo-w">
          <div className="text-effects-demo" ref={demoRef}>
            <div className="text-effects-demo-text">
              <span className="text-effects-demo-line">GSAP</span>
              <span className="text-effects-demo-line">Text</span>
              <span className="text-effects-demo-line">Effects</span>
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
                  <p className="explainer-par">Use GSAP’s SplitText and other plugins to create animated headlines, type-on effects, and more for eye-catching text animations.</p>
                </div>
              </div>
            </div>
            <div className="explainer-copy-btn-w">
              <button data-module="copybtn" data-copy="https://cdn.prod.website-files.com/67fea42b19018db93e3fe132/6811e2c8e5f450bdf4878517_text-effects-final.json.txt" className="btn copy">
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

export default TextEffectsSection;
