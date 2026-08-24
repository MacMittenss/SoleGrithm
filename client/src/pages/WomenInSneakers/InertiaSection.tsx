import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin);

const IMAGES = [1, 2, 3, 4, 5, 6].map((n) => `/women-in-sneakers-assets/images/run${n}_1run${n}.avif`);

export const InertiaSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !containerRef.current) return;

    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    const items = Array.from(container.children) as HTMLElement[];

    const dragDistancePerRotation = 3000;
    let itemWidth = items[0].offsetWidth;
    let itemCount = items.length;
    let radius = (itemWidth / (2 * Math.sin(Math.PI / itemCount))) * 0.85;
    const perspective = 5000;
    const progressWrap = gsap.utils.wrap(0, 1);
    let startProgress = 0;

    gsap.set(wrapper, { perspective, transformStyle: 'preserve-3d' });
    gsap.set(container, { transformStyle: 'preserve-3d' });

    const spin = gsap.fromTo(
      items,
      { rotationY: (i: number) => (i * 360) / items.length, z: -radius },
      {
        rotationY: '-=360',
        duration: 20,
        ease: 'none',
        repeat: -1,
        transformOrigin: `50% 50% ${-radius}px`,
        z: -radius,
      }
    );

    const proxy = document.createElement('div');
    proxy.style.position = 'absolute';
    proxy.style.width = '100%';
    proxy.style.height = '100%';
    proxy.style.top = '0';
    proxy.style.left = '0';
    proxy.style.zIndex = '1';
    proxy.style.cursor = 'grab';
    wrapper.appendChild(proxy);

    function updateRotation(this: Draggable) {
      const p = startProgress + (this.startX - this.x) / dragDistancePerRotation;
      spin.progress(progressWrap(p));
    }

    const [draggable] = Draggable.create(proxy, {
      trigger: wrapper,
      type: 'x',
      inertia: true,
      onPress() {
        gsap.killTweensOf(spin);
        spin.timeScale(0);
        startProgress = spin.progress();
      },
      onDrag: updateRotation,
      onThrowUpdate: updateRotation,
      onRelease() {
        if (!this.tween || !this.tween.isActive()) {
          gsap.to(spin, { timeScale: 1, duration: 1 });
        }
      },
      onThrowComplete() {
        gsap.to(spin, { timeScale: 1, duration: 1 });
      },
    });

    function recalculatePositions() {
      itemWidth = items[0].offsetWidth;
      itemCount = items.length;
      radius = (itemWidth / (2 * Math.sin(Math.PI / itemCount))) * 0.8;
      items.forEach((item, i) => {
        gsap.set(item, { rotationY: (i * 360) / itemCount, z: -radius });
      });
      spin.vars.transformOrigin = `50% 50% ${-radius}px`;
      (spin.vars as gsap.TweenVars).z = -radius;
      spin.invalidate();
      gsap.set(wrapper, { perspective });
    }

    window.addEventListener('resize', recalculatePositions);

    const preventTouch = (e: TouchEvent) => {
      if (e.target === wrapper || e.target === proxy) e.preventDefault();
    };
    wrapper.addEventListener('touchstart', preventTouch, { passive: false });

    return () => {
      window.removeEventListener('resize', recalculatePositions);
      wrapper.removeEventListener('touchstart', preventTouch);
      draggable?.kill();
      spin.kill();
      proxy.remove();
    };
  }, []);

  return (
    <section id="inertia" data-animate="inertia" className="sec inertia" ref={wrapperRef}>
      <div data-inertia="item" className="comp inertia" ref={containerRef}>
        {IMAGES.map((src) => (
          <div className="inertia-slide" key={src}>
            <img src={src} loading="lazy" alt="" className="img-full" />
          </div>
        ))}
      </div>
      <div className="explainer-w">
        <div data-module="explainer" data-css="explainer" className="explainer-comp">
          <label className="div">
            <input type="checkbox" className="input" />
            <span className="span">
              <div className="explainer-he">Feel the inertia</div>
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
                  Continue movement from a given speed, slow naturally to a stop. Perfect for adding physicality and
                  flow to your interface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
