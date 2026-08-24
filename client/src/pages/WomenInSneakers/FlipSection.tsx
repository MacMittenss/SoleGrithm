import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ITEMS = [
  { num: '01', title: 'Hover States', img: 'watch_1watch', shadow: 'watch-shadow_1watch-shadow', extra: '' },
  { num: '02', title: 'ResizinG Elements', img: 'can_1can', shadow: 'can-shadow_1can-shadow', extra: 'is-2' },
  { num: '03', title: 'Timeline Control', img: 'chair_1chair', shadow: 'chair-shadow_1chair-shadow', extra: 'is-3' },
  { num: '04', title: 'Shuffling positions', img: 'socks_3socks', shadow: 'socks-shadow_1socks-shadow', extra: 'is-4' },
  { num: '05', title: 'Sequenced Motion', img: 'headphones_1headphones', shadow: 'headphones-shadows_1headphones-shadows', extra: 'is-5' },
  { num: '06', title: 'FLEXIBLE LAYOUTS', img: 'tomato_1tomato', shadow: 'tomato-shadow_1tomato-shadow', extra: 'is-6' },
];

export const FlipSection = () => {
  const toggleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!toggleRef.current || !listRef.current) return;

    const toggles = Array.from(toggleRef.current.children) as HTMLElement[];
    const items = listRef.current;

    const flipGridList = () => {
      const state = Flip.getState(Array.from(items.children));
      items.classList.toggle('list');
      Flip.from(state, {
        duration: 0.8,
        ease: 'expo.out',
        onComplete: () => ScrollTrigger.refresh(),
      });
    };

    const handlers = toggles.map(() => () => {
      toggles[0].classList.toggle('current');
      toggles[1].classList.toggle('current');
      flipGridList();
    });

    toggles.forEach((toggle, i) => toggle.addEventListener('click', handlers[i]));

    return () => {
      toggles.forEach((toggle, i) => toggle.removeEventListener('click', handlers[i]));
    };
  }, []);

  return (
    <section id="flip" data-animate="flip" className="sec reorganise">
      <div data-flip="toggle" className="flip-btn-w" ref={toggleRef}>
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
          {ITEMS.map((item) => (
            <li key={item.num}>
              <div className={`flip-item ${item.extra}`.trim()}>
                <div className="item-num">{item.num}</div>
                <h3 className="font-c size-md _w-ch">{item.title}</h3>
                <div className="abs-img">
                  <div className="dual-img">
                    <img
                      src={`/women-in-sneakers-assets/images/${item.img}.avif`}
                      loading="eager"
                      alt=""
                      className="dual-img-img"
                    />
                    <img
                      src={`/women-in-sneakers-assets/images/${item.shadow}.avif`}
                      loading="eager"
                      alt=""
                      className="dual-img-shadow"
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
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
                <p className="explainer-par">
                  Create seamless transitions between two visual states smoothly, not instantly. It removes the
                  visual chaos when layouts shift, making things feel smooth, considered, and intentional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
