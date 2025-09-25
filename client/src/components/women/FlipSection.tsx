import React, { useRef, useEffect } from "react";


const FlipSection: React.FC = () => {
  const listRef = useRef<HTMLUListElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let gsap: any, Flip: any;
    let flipAnimation: any = null;
    (async () => {
      gsap = (await import("gsap")).default;
      Flip = (await import("gsap/Flip")).default;
      gsap.registerPlugin(Flip);
      const list = listRef.current;
      const btns = btnsRef.current;
      if (!list || !btns) return;
      const items = Array.from(list.children);
      const buttons = Array.from(btns.querySelectorAll("button"));
      let isGrid = false;
      const switchLayout = (toGrid: boolean) => {
        const state = Flip.getState(items);
        list.className = toGrid ? "flip-list-w grid w-list-unstyled" : "flip-list-w list w-list-unstyled";
        buttons[0].classList.toggle("current", !toGrid);
        buttons[1].classList.toggle("current", toGrid);
        if (flipAnimation) flipAnimation.kill();
        flipAnimation = Flip.from(state, {
          duration: 0.7,
          ease: "expo.inOut",
          stagger: 0.05,
        });
      };
      buttons[0].addEventListener("click", () => {
        if (isGrid) {
          isGrid = false;
          switchLayout(false);
        }
      });
      buttons[1].addEventListener("click", () => {
        if (!isGrid) {
          isGrid = true;
          switchLayout(true);
        }
      });
    })();
    return () => {
      if (flipAnimation) flipAnimation.kill();
    };
  }, []);
  return (
    <section id="flip" data-animate="flip" className="sec reorganise">
      <div data-flip="toggle" className="flip-btn-w" ref={btnsRef}>
        <button className="btn flip-switch-btn current">
          <div>List</div>
        </button>
        <button className="btn flip-switch-btn">
          <div>Grid</div>
        </button>
      </div>
      <div className="layer"></div>
      <div className="comp">
        <ul data-flip="item" role="list" className="flip-list-w list w-list-unstyled" ref={listRef}>
          <li>
            <div className="flip-item">
              <div className="item-num">01</div>
              <h3 className="font-c size-md _w-ch">Hover States</h3>
              <div className="abs-img">
                <div className="dual-img">
                  <img src="/women-in-sneakers-assets/images/watch_1watch.avif" loading="eager" alt="" className="dual-img-img" />
                  <img src="/women-in-sneakers-assets/images/watch-shadow_1watch-shadow.avif" loading="eager" alt="" className="dual-img-shadow" />
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="flip-item is-2">
              <div className="item-num">02</div>
              <h3 className="font-c size-md _w-ch">ResizinG Elements</h3>
              <div className="abs-img">
                <div className="dual-img">
                  <img src="/women-in-sneakers-assets/images/can_1can.avif" loading="eager" alt="" className="dual-img-img" />
                  <img src="/women-in-sneakers-assets/images/can-shadow_1can-shadow.avif" loading="eager" alt="" className="dual-img-shadow" />
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="flip-item is-3">
              <div className="item-num">03</div>
              <h3 className="font-c size-md _w-ch">Timeline Control</h3>
              <div className="abs-img">
                <div className="dual-img">
                  <img src="/women-in-sneakers-assets/images/chair_1chair.avif" loading="eager" alt="" className="dual-img-img" />
                  <img src="/women-in-sneakers-assets/images/chair-shadow_1chair-shadow.avif" loading="eager" alt="" className="dual-img-shadow" />
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="flip-item is-4">
              <div className="item-num">04</div>
              <h3 className="font-c size-md _w-ch">Shuffling positions</h3>
              <div className="abs-img">
                <div className="dual-img">
                  <img src="/women-in-sneakers-assets/images/socks_3socks.avif" loading="eager" alt="" className="dual-img-img" />
                  <img src="/women-in-sneakers-assets/images/socks-shadow_1socks-shadow.avif" loading="eager" alt="" className="dual-img-shadow" />
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="flip-item is-5">
              <div className="item-num">05</div>
              <h3 className="font-c size-md _w-ch">Sequenced Motion</h3>
              <div className="abs-img">
                <div className="dual-img">
                  <img src="/women-in-sneakers-assets/images/headphones_1headphones.avif" loading="eager" alt="" className="dual-img-img" />
                  <img src="/women-in-sneakers-assets/images/headphones-shadows_1headphones-shadows.avif" loading="eager" alt="" className="dual-img-shadow" />
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="flip-item is-6">
              <div className="item-num">06</div>
              <h3 className="font-c size-md _w-ch">FLEXIBLE LAYOUTS</h3>
              <div className="abs-img">
                <div className="dual-img">
                  <img src="/women-in-sneakers-assets/images/tomato_1tomato.avif" loading="eager" alt="" className="dual-img-img" />
                  <img src="/women-in-sneakers-assets/images/tomato-shadow_1tomato-shadow.avif" loading="eager" alt="" className="dual-img-shadow" />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="explainer-w">
        <div data-module="explainer" data-css="explainer" className="explainer-comp">
          <label className="div">
            <input type="checkbox" className="input" />
            <span className="span">
              <div className="explainer-he">Make Show and Tell Flexible</div>
              <div className="plus-icon-w">
                <div className="plus-line rotate"></div>
                <div className="plus-line"></div>
              </div>
            </span>
          </label>
          <div data-css="" className="explainer-expandable-w">
            <div className="explainer-overflow">
              <div className="explainer-content-w">
                <p className="explainer-par">Create seamless transitions between two visual states smoothly, not instantly. It removes the visual chaos when layouts shift, making things feel smooth, considered, and intentional.</p>
              </div>
            </div>
          </div>
          <div className="explainer-copy-btn-w">
            <button data-module="copybtn" data-copy="https://cdn.prod.website-files.com/67fea42b19018db93e3fe132/6811e2c8e5f450bdf4878517_flip-final.json.txt" className="btn copy">
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
    </section>
  );
};

export default FlipSection;


