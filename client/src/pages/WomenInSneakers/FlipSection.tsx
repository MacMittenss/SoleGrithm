import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

export const FlipSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    const container = wrapper.querySelector('[data-flip="container"]');
    const btns = [...wrapper.querySelectorAll('[data-flip="btn"]')];

    let flipAnimation: gsap.core.Timeline | null = null;

    const flip = () => {
      if (flipAnimation) flipAnimation.kill();
      const state = Flip.getState('[data-flip="item"]');
      container?.classList.toggle('list');

      flipAnimation = Flip.from(state, {
        duration: 0.7,
        stagger: 0.08,
        absolute: true,
        ease: 'power2.inOut',
      });
    };

    btns.forEach((btn) => {
      btn.addEventListener('click', flip);
    });

    return () => {
      if (flipAnimation) flipAnimation.kill();
      btns.forEach((btn) => {
        btn.removeEventListener('click', flip);
      });
    };
  }, []);

  return (
    <section id="flip" data-animate="flip" className="sec flip-sec">
      <div ref={wrapperRef} className="container-xl">
        <div className="flip-top-w">
          <h2 className="he-1">Flip Anything</h2>
          <div className="flip-controls-w">
            <div data-flip="btn" className="btn grid-btn">
              <div className="grid-svg-w">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 12 12" fill="none" className="svg grid-svg">
                  <rect x="0.5" y="0.5" width="4" height="4" rx="0.5" fill="currentColor"></rect>
                  <rect x="7.5" y="0.5" width="4" height="4" rx="0.5" fill="currentColor"></rect>
                  <rect x="0.5" y="7.5" width="4" height="4" rx="0.5" fill="currentColor"></rect>
                  <rect x="7.5" y="7.5" width="4" height="4" rx="0.5" fill="currentColor"></rect>
                </svg>
              </div>
              <div>Grid</div>
            </div>
            <div data-flip="btn" className="btn list-btn">
              <div className="list-svg-w">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 18 12" fill="none" className="svg list-svg">
                  <rect y="0.5" width="4" height="4" rx="0.5" fill="currentColor"></rect>
                  <rect x="7" y="1.5" width="11" height="2" rx="0.5" fill="currentColor"></rect>
                  <rect y="7.5" width="4" height="4" rx="0.5" fill="currentColor"></rect>
                  <rect x="7" y="8.5" width="11" height="2" rx="0.5" fill="currentColor"></rect>
                </svg>
              </div>
              <div>List</div>
            </div>
          </div>
        </div>
        <div data-flip="container" className="flip-container">
          <div data-flip="item" className="flip-item">
            <div className="dual-img-w">
              <img src="/women-in-sneakers-assets/images/watch1_1watch1.avif" loading="lazy" alt="" className="dual-img" />
              <img src="/women-in-sneakers-assets/images/watch2_1watch2.avif" loading="lazy" alt="" className="dual-img" />
            </div>
            <div className="he-3">Smart Watch</div>
          </div>
          <div data-flip="item" className="flip-item">
            <div className="dual-img-w">
              <img src="/women-in-sneakers-assets/images/can1_1can1.avif" loading="lazy" alt="" className="dual-img" />
              <img src="/women-in-sneakers-assets/images/can2_1can2.avif" loading="lazy" alt="" className="dual-img" />
            </div>
            <div className="he-3">Soda Can</div>
          </div>
          <div data-flip="item" className="flip-item">
            <div className="dual-img-w">
              <img src="/women-in-sneakers-assets/images/chair1_1chair1.avif" loading="lazy" alt="" className="dual-img" />
              <img src="/women-in-sneakers-assets/images/chair2_1chair2.avif" loading="lazy" alt="" className="dual-img" />
            </div>
            <div className="he-3">Office Chair</div>
          </div>
          <div data-flip="item" className="flip-item">
            <div className="dual-img-w">
              <img src="/women-in-sneakers-assets/images/socks1_1socks1.avif" loading="lazy" alt="" className="dual-img" />
              <img src="/women-in-sneakers-assets/images/socks2_1socks2.avif" loading="lazy" alt="" className="dual-img" />
            </div>
            <div className="he-3">Ankle Socks</div>
          </div>
          <div data-flip="item" className="flip-item">
            <div className="dual-img-w">
              <img src="/women-in-sneakers-assets/images/headphones1_1headphones1.avif" loading="lazy" alt="" className="dual-img" />
              <img src="/women-in-sneakers-assets/images/headphones2_1headphones2.avif" loading="lazy" alt="" className="dual-img" />
            </div>
            <div className="he-3">Headphones</div>
          </div>
          <div data-flip="item" className="flip-item">
            <div className="dual-img-w">
              <img src="/women-in-sneakers-assets/images/tomato1_1tomato1.avif" loading="lazy" alt="" className="dual-img" />
              <img src="/women-in-sneakers-assets/images/tomato2_1tomato2.avif" loading="lazy" alt="" className="dual-img" />
            </div>
            <div className="he-3">Tomatoes</div>
          </div>
        </div>
        <div className="explainer-w">
          <div data-module="explainer" data-css="explainer" className="explainer-comp">
            <label className="div">
              <input type="checkbox" className="input" />
              <span className="span">
                <div className="explainer-he">About FLIP</div>
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
                    Animate the position and dimensions of any element to a different state, automatically. No
                    matter how complex. Perfect for advanced layouts and interfaces. FLIP stands for First, Last,
                    Invert, Play.
                  </p>
                </div>
              </div>
            </div>
            <div className="explainer-copy-btn-w">
              <button
                data-module="copybtn"
                data-copy="https://cdn.prod.website-files.com/67fea42b19018db93e3fe132/6811e2c70e4a58edf2abb1a6_flip-final.json.txt"
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
