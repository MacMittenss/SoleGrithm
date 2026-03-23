import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

interface Slide {
  label: string;
  title: string;
  description: string;
  image1: string;
  image2: string;
}

const slides: Slide[] = [
  {
    label: 'Effortless',
    title: 'CONTROL',
    description: 'GSAP gives you effortless control over every animation detail, making complex motion feel simple and intuitive.',
    image1: '/women-in-sneakers-assets/images/face-3_2face-3.avif',
    image2: '/women-in-sneakers-assets/images/face-5-shadow_1face-5-shadow.avif',
  },
  {
    label: 'Creative',
    title: 'FLEXIBILITY',
    description: 'GSAP offers creative flexibility, letting you craft unique animations that perfectly match your vision.',
    image1: '/women-in-sneakers-assets/images/face-2_2face-2.avif',
    image2: '/women-in-sneakers-assets/images/face-5-shadow_1face-5-shadow.avif',
  },
  {
    label: 'Expressive',
    title: 'Motion',
    description: 'GSAP infuses elements with expressive motion, transforming static pages into emotional, engaging journeys.',
    image1: '/women-in-sneakers-assets/images/face-1_2face-1.avif',
    image2: '/women-in-sneakers-assets/images/face-5-shadow_1face-5-shadow.avif',
  },
  {
    label: 'Powerful',
    title: 'IMPACT',
    description: 'GSAP delivers animations with powerful impact, ensuring your story resonates clearly and leaves a mark.',
    image1: '/women-in-sneakers-assets/images/face-4_2face-4.avif',
    image2: '/women-in-sneakers-assets/images/face-5-shadow_1face-5-shadow.avif',
  },
  {
    label: 'Seamless',
    title: 'FLOW',
    description: 'GSAP crafts seamless flow in motion, syncing with users to create natural, captivating interactions.',
    image1: '/women-in-sneakers-assets/images/face-5_1face-5.avif',
    image2: '/women-in-sneakers-assets/images/face-5-shadow_1face-5-shadow.avif',
  },
];

export const SliderSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const slidesContainerRef = useRef<HTMLUListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !slidesContainerRef.current || !progressRef.current) return;

    const wrapper = wrapperRef.current;
    const slidesContainer = slidesContainerRef.current;
    const slideElements = [...slidesContainer.children] as HTMLElement[];
    const progress = progressRef.current;
    const nextBtn = wrapper.querySelector('[data-slider="next"]') as HTMLButtonElement;
    const prevBtn = wrapper.querySelector('[data-slider="prev"]') as HTMLButtonElement;
    const dotsContainer = wrapper.querySelector('[data-slider="dots"]') as HTMLUListElement;
    const dots = [...dotsContainer.children].map(li => li.children[0] as HTMLButtonElement);

    let currentIndex = 0;
    let loop: any;

    const sliderParams = {
      duration: 0.5,
      ease: 'power2.out',
    };

    // Horizontal loop helper function
    function horizontalLoop(items: HTMLElement[], config: any) {
      let timeline: gsap.core.Timeline;
      config = config || {};
      
      let onChange = config.onChange,
        lastIndex = 0,
        tl = gsap.timeline({
          repeat: config.repeat,
          onUpdate: onChange && function () {
            let i = tl.closestIndex();
            if (lastIndex !== i) {
              lastIndex = i;
              onChange(items[i], i);
            }
          },
          paused: config.paused,
          defaults: { ease: 'none' },
          onReverseComplete: () => { tl.totalTime(tl.rawTime() + tl.duration() * 100); },
        }),
        length = items.length,
        startX = items[0].offsetLeft,
        times: number[] = [],
        widths: number[] = [],
        spaceBefore: number[] = [],
        xPercents: number[] = [],
        curIndex = 0,
        indexIsDirty = false,
        center = config.center,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1),
        totalWidth: number,
        timeWrap: (v: number) => number,
        getTotalWidth = () =>
          items[length - 1].offsetLeft +
          (xPercents[length - 1] / 100) * widths[length - 1] -
          startX +
          spaceBefore[0] +
          items[length - 1].offsetWidth * Number(gsap.getProperty(items[length - 1], 'scaleX')) +
          (parseFloat(config.paddingRight) || 0),
        populateWidths = () => {
          let b1 = (center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode) as HTMLElement,
            b2: DOMRect;
          
          gsap.set(items, { x: 0, xPercent: 0 });
          items[0].offsetWidth;
          startX = items[0].offsetLeft;
          
          items.forEach((el, i) => {
            widths[i] = el.offsetWidth;
            b2 = el.getBoundingClientRect();
            spaceBefore[i] = b2.left - (i ? (b1 as any).right : (b1 as any).left);
            b1 = b2 as any;
            xPercents[i] = 0;
          });
          
          gsap.set(items, { xPercent: (i) => xPercents[i] });
          totalWidth = getTotalWidth();
        },
        populateOffsets = () => {
          let timeOffset = center ? (tl.duration() * ((center as any).offsetWidth / 2)) / totalWidth : 0;
          center && times.forEach((t, i) => {
            times[i] = timeWrap(tl.labels['label' + i] + (tl.duration() * widths[i]) / 2 / totalWidth - timeOffset);
          });
        },
        getClosest = (values: number[], value: number, wrap: number) => {
          let i = values.length,
            closest = 1e10,
            index = 0,
            d: number;
          while (i--) {
            d = Math.abs(values[i] - value);
            if (d > wrap / 2) {
              d = wrap - d;
            }
            if (d < closest) {
              closest = d;
              index = i;
            }
          }
          return index;
        },
        populateTimeline = () => {
          tl.clear();
          for (let i = 0; i < length; i++) {
            let item = items[i];
            let curX = (xPercents[i] / 100) * widths[i];
            let distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
            let distanceToLoop = distanceToStart + widths[i] * Number(gsap.getProperty(item, 'scaleX'));
            
            tl.to(item, {
              xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
              duration: distanceToLoop / pixelsPerSecond,
            }, 0)
              .fromTo(item, {
                xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100),
              }, {
                xPercent: xPercents[i],
                duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                immediateRender: false,
              }, distanceToLoop / pixelsPerSecond)
              .add('label' + i, distanceToStart / pixelsPerSecond);
            
            times[i] = distanceToStart / pixelsPerSecond;
          }
          timeWrap = gsap.utils.wrap(0, tl.duration());
        },
        refresh = (deep?: boolean) => {
          let progress = tl.progress();
          tl.progress(0, true);
          gsap.set(items, { x: 0, xPercent: 0 });
          items[0].offsetWidth;
          populateWidths();
          deep && populateTimeline();
          populateOffsets();
          tl.progress(progress, true);
        };

      gsap.set(items, { x: 0 });
      populateWidths();
      populateTimeline();
      populateOffsets();

      function toIndex(index: number, vars?: any) {
        vars = vars || {};
        Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length);
        let newIndex = gsap.utils.wrap(0, length, index),
          time = times[newIndex];
        if (time > tl.time() !== index > curIndex && index !== curIndex) {
          time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        if (time < 0 || time > tl.duration()) {
          vars.modifiers = { time: timeWrap };
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
      }

      tl.toIndex = (index: number, vars?: any) => toIndex(index, vars);
      tl.closestIndex = (setCurrent?: boolean) => {
        let index = getClosest(times, tl.time(), tl.duration());
        if (setCurrent) {
          curIndex = index;
          indexIsDirty = false;
        }
        return index;
      };
      tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
      tl.next = (vars?: any) => toIndex(tl.current() + 1, vars);
      tl.previous = (vars?: any) => toIndex(tl.current() - 1, vars);
      tl.times = times;
      tl.progress(1, true).progress(0, true);

      if (config.reversed) {
        if (tl.vars.onReverseComplete) {
          tl.vars.onReverseComplete();
        }
        tl.reverse();
      }

      timeline = tl;
      return timeline;
    }

    const updateCurrent = (index: number) => {
      // Update dots
      dots[currentIndex].classList.remove('current');
      dots[index].classList.add('current');
      
      // Update slides
      slideElements[currentIndex].classList.remove('current');
      slideElements[index].classList.add('current');
      
      // Update progress bar
      gsap.to(progress.children[0], {
        width: `${(index / (slideElements.length - 1)) * 100}%`,
        duration: 0.6,
        ease: 'expo.out',
      });
      
      currentIndex = index;
    };

    // Initialize slider after a brief delay
    setTimeout(() => {
      loop = horizontalLoop(slideElements, {
        paused: true,
        draggable: true,
        center: true,
        onChange: (element: HTMLElement, index: number) => {
          updateCurrent(index);
        },
      });
    }, 500);

    // Dot click handlers
    dots.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        if (loop) loop.toIndex(index, sliderParams);
      });
    });

    // Next/Prev button handlers
    const handleNext = () => {
      if (loop) loop.next(sliderParams);
    };

    const handlePrev = () => {
      if (loop) loop.previous(sliderParams);
    };

    nextBtn?.addEventListener('click', handleNext);
    prevBtn?.addEventListener('click', handlePrev);

    return () => {
      nextBtn?.removeEventListener('click', handleNext);
      prevBtn?.removeEventListener('click', handlePrev);
      if (loop) loop.kill();
    };
  }, []);

  return (
    <section id="slider" data-animate="slider" className="sec slider" ref={wrapperRef}>
      <div className="comp slider">
        <div className="slider-prog-w" data-slider="progress" ref={progressRef}>
          <div className="slider-prog-track">
            <div className="slider-prog"></div>
          </div>
        </div>
        <ul data-slider="slides" role="list" className="slides-w w-list-unstyled" ref={slidesContainerRef}>
          {slides.map((slide, index) => (
            <li key={index} className={`slide-outer ${index === 0 ? 'current' : ''}`}>
              <div className="slide">
                <div className="slide-col flex-ve">
                  <div>{slide.label}</div>
                  <div className="slide-text-block">
                    <h3 className="font-c size-md">{slide.title}</h3>
                    <div>{slide.description}</div>
                  </div>
                </div>
                <div className="slide-col">
                  <div className="slide-img">
                    <div className="dual-img">
                      <img src={slide.image1} loading="eager" alt="" className="dual-img-img" />
                      <img src={slide.image2} loading="eager" alt="" className="dual-img-shadow" />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="slider-ctrls-w">
          <button data-slider="prev" className="btn arrow">
            <div data-wf--u-arrow-button--variant="flip" className="arrow-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 26 16" fill="none" className="svg arrow w-variant-352da3df-a236-ccac-dbb8-8845a582a471">
                <path fillRule="evenodd" clipRule="evenodd" d="M19.3431 0.929124L25.7071 7.29308C26.0976 7.68361 26.0976 8.31677 25.7071 8.7073L19.3431 15.0713C18.9526 15.4618 18.3195 15.4618 17.9289 15.0713C17.5384 14.6807 17.5384 14.0476 17.9289 13.657L22.5858 9.00019H1C0.447715 9.00019 0 8.55248 0 8.00019C0 7.44791 0.447715 7.00019 1 7.00019H22.5858L17.9289 2.34334C17.5384 1.95281 17.5384 1.31965 17.9289 0.929124C18.3195 0.538599 18.9526 0.538599 19.3431 0.929124Z" fill="currentColor"></path>
              </svg>
            </div>
          </button>
          <ul data-slider="dots" role="list" className="dots-w w-list-unstyled">
            {slides.map((_, index) => (
              <li key={index}>
                <button className={`btn slider-dot ${index === 0 ? 'current' : ''}`}></button>
              </li>
            ))}
          </ul>
          <button data-slider="next" className="btn arrow">
            <div data-wf--u-arrow-button--variant="base" className="arrow-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 26 16" fill="none" className="svg arrow">
                <path fillRule="evenodd" clipRule="evenodd" d="M19.3431 0.929124L25.7071 7.29308C26.0976 7.68361 26.0976 8.31677 25.7071 8.7073L19.3431 15.0713C18.9526 15.4618 18.3195 15.4618 17.9289 15.0713C17.5384 14.6807 17.5384 14.0476 17.9289 13.657L22.5858 9.00019H1C0.447715 9.00019 0 8.55248 0 8.00019C0 7.44791 0.447715 7.00019 1 7.00019H22.5858L17.9289 2.34334C17.5384 1.95281 17.5384 1.31965 17.9289 0.929124C18.3195 0.538599 18.9526 0.538599 19.3431 0.929124Z" fill="currentColor"></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
      <div className="explainer-w">
        <div data-module="explainer" data-css="explainer" className="explainer-comp">
          <label className="div">
            <input type="checkbox" className="input" />
            <span className="span">
              <div className="explainer-he">Endless by design</div>
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
                  Ideal for smooth marquees, auto playing sliders, and loops that just keep rolling.
                </p>
              </div>
            </div>
          </div>
          <div className="explainer-copy-btn-w">
            <button
              data-module="copybtn"
              data-copy="https://cdn.prod.website-files.com/67fea42b19018db93e3fe132/6811e2c885ad5b6f59e2efe1_slider-final.json.txt"
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
    </section>
  );
};
