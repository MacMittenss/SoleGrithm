
import React, { useRef, useEffect } from "react";

const slidesData = [
  {
    title: "ACTIONS",
    label: "Precise",
    desc: "GSAP turns clicks into vivid stories with precise motion, making every interaction feel intentional and alive.",
    img: "/women-in-sneakers-assets/images/face-3_1face-3.avif",
    shadow: "/women-in-sneakers-assets/images/face-1-shadow_1face-1-shadow.avif",
  },
  {
    title: "ATTENTION",
    label: "Focus",
    desc: "GSAP sharpens focus with smooth animations, drawing attention to your message for a lasting, memorable impact.",
    img: "/women-in-sneakers-assets/images/face-2_1face-2.avif",
    shadow: "/women-in-sneakers-assets/images/face-2-shadow_1face-2-shadow.avif",
  },
  {
    title: "ENGAGEMENT",
    label: "Fun",
    desc: "GSAP brings fun to the web, making your site more engaging and memorable for every visitor.",
    img: "/women-in-sneakers-assets/images/face-1_1face-1.avif",
    shadow: "/women-in-sneakers-assets/images/face-1-shadow_1face-1-shadow.avif",
  },
];

const SliderSection: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLUListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLUListElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const loopRef = useRef<any>(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    let ctx: any;
    let gsap: any, Draggable: any;
    let loop: any;
    let dots: HTMLButtonElement[] = [];
    let slides: HTMLLIElement[] = [];
    let progressBar: HTMLDivElement | null = null;
    let nextBtn: HTMLButtonElement | null = null;
    let prevBtn: HTMLButtonElement | null = null;

    (async () => {
      gsap = (await import("gsap")).default;
      Draggable = (await import("gsap/Draggable")).default;
      if (gsap && Draggable) {
        gsap.registerPlugin(Draggable);
      }

      ctx = gsap.context(() => {
        if (!sliderRef.current || !slidesRef.current || !progressRef.current || !dotsRef.current) return;
        slides = Array.from(slidesRef.current.children) as HTMLLIElement[];
        progressBar = progressRef.current.querySelector(".progress-bar");
        nextBtn = nextRef.current;
        prevBtn = prevRef.current;
        dots = Array.from(dotsRef.current.querySelectorAll(".slider-dot"));

        // Helper: update current slide/dot/progress
        const updateCurrent = (index: number) => {
          dots[currentIndex.current].classList.remove("current");
          dots[index].classList.add("current");
          slides[currentIndex.current].classList.remove("current");
          slides[index].classList.add("current");
          if (progressBar) {
            gsap.to(progressBar, {
              width: `${(index / (slides.length - 1)) * 100}%`,
              duration: 0.6,
              ease: "expo.out",
            });
          }
          currentIndex.current = index;
        };

        // Minimal horizontal loop (no inertia for now)
        let active = 0;
        function goTo(index: number) {
          if (index < 0) index = slides.length - 1;
          if (index >= slides.length) index = 0;
          updateCurrent(index);
        }

        // Dots click
        dots.forEach((dot, idx) => {
          dot.addEventListener("click", () => goTo(idx));
        });
        // Next/Prev
        if (nextBtn) nextBtn.addEventListener("click", () => goTo(currentIndex.current + 1));
        if (prevBtn) prevBtn.addEventListener("click", () => goTo(currentIndex.current - 1));

        // Init
        slides[0].classList.add("current");
        dots[0].classList.add("current");
        if (progressBar) progressBar.style.width = "0%";
      }, sliderRef);
      return () => ctx && ctx.revert();
    })();
  }, []);

  return (
    <section id="slider" className="sec">
      <div data-animate="slider" className="comp slider-w" ref={sliderRef}>
        <div className="slider-ctrls-w">
          <div data-slider="progress" className="slider-progress-w" ref={progressRef}>
            <div className="progress-bar"></div>
          </div>
        </div>
        <ul data-slider="slides" role="list" className="slides w-list-unstyled" ref={slidesRef}>
          {slidesData.map((slide, idx) => (
            <li className="slide-outer" key={idx}>
              <div className="slide">
                <div className="slide-col flex-ve">
                  <div>{slide.label}</div>
                  <div className="slide-text-block">
                    <h3 className="font-c size-md">{slide.title}</h3>
                    <div>{slide.desc}</div>
                  </div>
                </div>
                <div className="slide-col">
                  <div className="slide-img">
                    <div className="dual-img">
                      <img src={slide.img} loading="eager" alt="" className="dual-img-img" />
                      <img src={slide.shadow} loading="eager" alt="" className="dual-img-shadow" />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="slider-ctrls-w">
          <button data-slider="prev" className="btn arrow" ref={prevRef}>
            &#8592;
          </button>
          <ul data-slider="dots" role="list" className="dots-w w-list-unstyled" ref={dotsRef}>
            {slidesData.map((_, idx) => (
              <li key={idx}>
                <button className="btn slider-dot"></button>
              </li>
            ))}
          </ul>
          <button data-slider="next" className="btn arrow" ref={nextRef}>
            &#8594;
          </button>
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
                <p className="explainer-par">Use GSAP to create sliders, carousels, and other interactive UI elements that respond to user input with smooth, performant motion.</p>
              </div>
            </div>
          </div>
          <div className="explainer-copy-btn-w">
            <button data-module="copybtn" data-copy="https://cdn.prod.website-files.com/67fea42b19018db93e3fe132/6811e2c8e5f450bdf4878517_slider-final.json.txt" className="btn copy">
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

export default SliderSection;
