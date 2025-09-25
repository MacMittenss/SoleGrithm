
import React, { useEffect, useRef } from "react";

const Footer: React.FC = () => {
  const logoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | undefined;
    (async () => {
      const gsapImport = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapImport.default;
      gsap.registerPlugin(ScrollTrigger);
      if (!logoRef.current) return;
      const svg = logoRef.current;
      const paths = Array.from(svg.querySelectorAll("path")).reverse();
      const lastPath = paths[paths.length - 1];
      const STAGGER = 0.05;
      const VISIBILITY_DURATION = 0.1;
      gsap.set(paths, { autoAlpha: 0 });
      const animateFooterLogo = () => {
        gsap.set(lastPath, { autoAlpha: 0 });
        const tl = gsap.timeline();
        paths.forEach((path, index) => {
          const baseDelay = index * STAGGER;
          const isLastPath = index === paths.length - 1;
          tl.to(
            path,
            { autoAlpha: 1, duration: 0.1, ease: "none" },
            baseDelay
          );
          if (!isLastPath) {
            tl.to(
              path,
              { autoAlpha: 0, duration: 0.1, ease: "none" },
              baseDelay + VISIBILITY_DURATION
            );
          }
        });
        return tl;
      };
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: svg,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => animateFooterLogo(),
          onEnterBack: () => animateFooterLogo(),
        });
      }, svg);
    })();
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <footer id="footer" className="footer-w">
      <div className="footer-content-w">
        <div className="footer-logo-w">
          <svg
            ref={logoRef}
            data-animate="footerlogo"
            className="comp footer-logo"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            fill="none"
            viewBox="0 0 1426 332"
          >
            <g className="animation footer">
              {/* SVG paths from template (truncated for brevity, insert all paths here) */}
              <path fill="currentColor" d="M269.779 111.176c-8.811-5.2-18.881-7.805-30.233-7.805-11.353 0-21.608 2.605-30.408 7.805-8.811 5.21-15.602 12.581-20.394 22.111-4.793 9.529-7.183 20.499-7.183 32.897s2.39 22.934 7.183 32.281c4.792 9.359 11.56 16.615 20.302 21.757 8.754 5.153 18.916 7.724 30.5 7.724 11.583 0 21.422-2.571 30.233-7.724 8.8-5.142 15.637-12.398 20.488-21.757 4.85-9.358 7.275-20.123 7.275-32.281 0-12.158-2.425-23.368-7.275-32.897-4.851-9.53-11.676-16.901-20.488-22.111Zm7.091 80.799c-3.487 7.37-8.453 13.072-14.897 17.106-6.444 4.033-13.916 6.056-22.439 6.056s-16.168-2.023-22.612-6.056c-6.444-4.034-11.375-9.736-14.805-17.106-3.43-7.371-5.139-15.964-5.139-25.791s1.709-18.865 5.139-26.407c3.43-7.542 8.361-13.358 14.805-17.46 6.444-4.091 13.974-6.136 22.612-6.136 8.638 0 15.983 2.045 22.439 6.136 6.444 4.091 11.41 9.918 14.897 17.46 3.488 7.542 5.232 16.352 5.232 26.407 0 10.056-1.744 18.42-5.232 25.791Zm116.779-87.735h-74.835a1.2 1.2 0 0 0-.889.354c-.242.24-.358.583-.358 1.051v120.027c0 .355.116.675.358.96.243.297.531.434.889.434h12.415c.474 0 .82-.148 1.062-.434.231-.285.358-.617.358-.96v-52.814h57.454c.474 0 .82-.149 1.063-.435.231-.285.358-.617.358-.959v-10.182c0-.468-.116-.811-.358-1.051-.243-.229-.589-.354-1.063-.354h-57.454V117.06h61c.473 0 .82-.114 1.062-.354.231-.228.358-.525.358-.88v-10.181c0-.468-.115-.811-.358-1.051-.242-.229-.589-.354-1.062-.354Zm96.649 0h-74.834c-.358 0-.647.114-.889.354-.243.24-.358.583-.358 1.051v120.027c0 .355.115.675.358.96.23.297.531.434.889.434h12.414c.474 0 .82-.148 1.063-.434.231-.285.358-.617.358-.96v-52.814h57.454c.473 0 .82-.149 1.062-.435.231-.285.358-.617.358-.959v-10.182c0-.468-.115-.811-.358-1.051-.242-.229-.589-.354-1.062-.354h-57.454V117.06h61.01c.474 0 .82-.114 1.063-.354.231-.228.358-.525.358-.88v-10.181c0-.468-.115-.811-.358-1.051-.243-.229-.589-.354-1.063-.354h-.011Z" className="6"></path>
              {/* ... (insert all other <path> elements from the template SVG here for full animation) ... */}
            </g>
          </svg>
        </div>
        <div className="footer-links-w">
          <a href="https://greensock.com/gsap/" target="_blank" rel="noopener noreferrer" className="footer-link">GSAP</a>
          <a href="https://greensock.com/club/" target="_blank" rel="noopener noreferrer" className="footer-link">Club GreenSock</a>
          <a href="https://greensock.com/docs/" target="_blank" rel="noopener noreferrer" className="footer-link">Docs</a>
          <a href="https://greensock.com/showcase/" target="_blank" rel="noopener noreferrer" className="footer-link">Showcase</a>
        </div>
        <div className="footer-copy">© 2025 GreenSock. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
