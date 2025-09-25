import React from "react";

const ScrollTriggerSection: React.FC = () => (
  <section id="scrolltrigger" data-animate="videogrow" className="sec scrolltrigger-sec">
    <div className="sticky-w">
      <div className="comp video">
        <div data-videogrow="title" className="font-c size-screen overflow-cut">Scrolltrigger</div>
      </div>
      <div className="layer">
        <div data-videogrow="video" className="sky-scroller">
          <img src="/women-in-sneakers-assets/images/sky_1sky.avif" loading="lazy" sizes="100vw" srcSet="/women-in-sneakers-assets/images/sky_1sky.avif 500w, /women-in-sneakers-assets/images/sky_1sky.avif 1198w" alt="" className="img-sky" />
        </div>
      </div>
    </div>
    <div className="layer flex-b z-3">
      <div className="code-block w-embed w-script">
        {/* GSAP/ScrollTrigger logic will be ported to React useEffect in a future step */}
      </div>
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
                <p className="explainer-par">Start animations when elements enter the viewport, scrub through timelines, pin elements in place, or snap to key points as users scroll.</p>
              </div>
            </div>
          </div>
          <div className="explainer-copy-btn-w">
            <button data-module="copybtn" data-copy="https://cdn.prod.website-files.com/67fea42b19018db93e3fe132/6811e2c83012fa3b59370ce3_scrolltrigger-final.json.txt" className="btn copy">
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

export default ScrollTriggerSection;
