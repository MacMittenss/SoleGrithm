import React, { useEffect, useRef } from "react";


const SubNav: React.FC = () => {
  const ulRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    let gsap: any, Flip: any;
    let flipAnimation: any = null;
    (async () => {
      gsap = (await import("gsap")).default;
      Flip = (await import("gsap/Flip")).default;
      gsap.registerPlugin(Flip);
      const wrapper = ulRef.current;
      if (!wrapper) return;
      const items = Array.from(wrapper.children) as HTMLElement[];
      const highlight = wrapper.querySelector("[data-selector='highlight']") as HTMLElement;
      let currentIndex = 0;
      const sections = Array.from(document.querySelectorAll("section"));
      // IntersectionObserver for section highlight
      const createObserver = (section: Element, cb: (el: Element) => void) => {
        const observer = new window.IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
              cb(entry.target);
            }
          });
        }, { threshold: 0.2 });
        observer.observe(section);
      };
      const moveHighlightTo = (index: number) => {
        const state = Flip.getState(highlight);
        items[index].appendChild(highlight);
        if (flipAnimation) flipAnimation.kill();
        flipAnimation = Flip.from(state, {
          duration: 0.5,
          ease: "expo.out",
        });
      };
      sections.forEach((section, index) => {
        createObserver(section, () => {
          items[currentIndex].classList.remove("current");
          currentIndex = index;
          items[currentIndex].classList.add("current");
          moveHighlightTo(index);
        });
      });
      items.forEach((item, index) => {
        item.addEventListener("click", () => {
          window.scrollTo({
            top: document.getElementById(items[index].dataset.to || "")?.offsetTop || 0,
            behavior: "smooth",
          });
        });
        item.addEventListener("mouseenter", () => {
          moveHighlightTo(index);
        });
        item.addEventListener("mouseleave", () => {
          moveHighlightTo(currentIndex);
        });
      });
    })();
    return () => {
      if (flipAnimation) flipAnimation.kill();
    };
  }, []);
  return (
    <div className="overflow-w">
      <div className="sub-nav-bg">
        <ul
          data-animate="sectionselector"
          role="list"
          className="sub-nav-w w-list-unstyled"
          ref={ulRef}
        >
          <li data-to="flip" className="link-li-w current">
            <div>Flip</div>
            <div data-selector="highlight" className="current-highlight"></div>
          </li>
          <li data-to="scrolltrigger" className="link-li-w">
            <div>Scroll Trigger</div>
          </li>
          <li data-to="slider" className="link-li-w">
            <div>Slider</div>
          </li>
          <li data-to="inertia" className="link-li-w">
            <div>Inertia</div>
          </li>
          <li data-to="text-effects" className="link-li-w">
            <div>Text Effects</div>
          </li>
          <li data-to="marquee" className="link-li-w">
            <div>Marquee</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SubNav;
