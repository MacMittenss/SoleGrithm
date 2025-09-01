import { useEffect, useState } from 'react';
import Header from '@/components/Header';

interface SplitCharProps {
  children: string;
  index: number;
  total: number;
  delay?: number;
}

const SplitChar = ({ children, index, total, delay = 0 }: SplitCharProps) => (
  <span
    className="luma-illuminate-text-module__laZ2Ka__splitChar"
    style={{
      '--char-index': index,
      '--total-chars': total,
      animationDelay: `${delay + index * 0.1}s`
    } as React.CSSProperties}
  >
    {children}
  </span>
);

const LumaIlluminateText = () => {
  const lumaChars = 'luma'.split('');
  const illuminateChars = 'Illuminate'.split('');

  return (
    <div className="luma-illuminate-text-module__laZ2Ka__lumaIlluminate">
      <div className="luma-illuminate-text-module__laZ2Ka__luma" aria-label="Luma">
        {lumaChars.map((char, index) => (
          <SplitChar key={`luma-${index}`} index={index + 1} total={10}>
            {char}
          </SplitChar>
        ))}
      </div>
      <div className="luma-illuminate-text-module__laZ2Ka__illuminate">
        {illuminateChars.map((char, index) => (
          <SplitChar key={`illuminate-${index}`} index={index} total={10}>
            {char}
          </SplitChar>
        ))}
      </div>
    </div>
  );
};

const SplitText = ({ text }: { text: string }) => {
  const words = text.split(' ');
  
  return (
    <span className="split-text-module__McvV0q__splitText">
      <span className="split-text-module__McvV0q__split" aria-label={text}>
        {words.map((word, index) => (
          <div
            key={index}
            className="word-mask"
            aria-hidden="true"
            style={{
              position: 'relative',
              display: 'inline-block',
              overflow: 'clip'
            }}
          >
            <div
              className="word"
              aria-hidden="true"
              style={{
                position: 'relative',
                display: 'inline-block',
                transform: 'translateY(0%)'
              }}
            >
              {word}
            </div>
          </div>
        ))}
      </span>
      <span className="split-text-module__McvV0q__fallback">{text}</span>
    </span>
  );
};

const DotsGrid = () => (
  <svg
    viewBox="0 0 1362 421"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="dots-grid_svg__a" cx="50%" cy="100%" r="100%">
        <stop offset="0%" stopColor="white" />
        <stop offset="100%" stopColor="black" />
      </radialGradient>
      <linearGradient id="dots-grid_svg__c" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    <mask
      id="dots-grid_svg__b"
      maskUnits="userSpaceOnUse"
    >
      <ellipse
        cx="681"
        cy="421"
        rx="681"
        ry="421"
        fill="url(#dots-grid_svg__a)"
      />
    </mask>
    <g mask="url(#dots-grid_svg__b)">
      {Array.from({ length: 85 }, (_, i) => (
        <path
          key={i}
          d={`M${129 + i * 16} 0v421`}
          stroke="url(#dots-grid_svg__c)"
          strokeWidth="2"
          strokeDasharray="2 20"
        />
      ))}
    </g>
  </svg>
);

const Preloader = ({ isVisible }: { isVisible: boolean }) => {
  const lumaChars = 'Luma'.split('');

  return (
    <div
      className="preloader-module__HuRKdq__preloader"
      style={{
        transform: isVisible ? 'translate(0%, 0%)' : 'translate(0%, -100%)',
        display: isVisible ? 'flex' : 'none'
      }}
    >
      <div className="preloader-module__HuRKdq__inner">
        <div className="preloader-module__HuRKdq__textWrapper">
          <div className="preloader-module__HuRKdq__word">
            {lumaChars.map((char, index) => (
              <span
                key={index}
                className="preloader-module__HuRKdq__char"
                style={{
                  '--char-index': index,
                  '--total-chars': 4,
                  animationDelay: `${index * 0.1}s`
                } as React.CSSProperties}
              >
                {char}
              </span>
            ))}
          </div>
          <div
            className="preloader-module__HuRKdq__word preloader-module__HuRKdq__wordBlurred"
            style={{ filter: 'blur(30px) brightness(1) saturate(1)' }}
          >
            {lumaChars.map((char, index) => (
              <span
                key={`blur-${index}`}
                className="preloader-module__HuRKdq__char"
                style={{
                  '--char-index': index,
                  '--total-chars': 4,
                  animationDelay: `${index * 0.1}s`
                } as React.CSSProperties}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
        <div className="preloader-module__HuRKdq__progressBar">
          <div className="preloader-module__HuRKdq__blurred"></div>
          <div className="preloader-module__HuRKdq__solid"></div>
        </div>
      </div>
    </div>
  );
};


const Navigation = () => (
  <div className="navigation-module__mix1Pa__navigation">
    <div className="navigation-module__mix1Pa__headerInner">
      <div className="navigation-module__mix1Pa__middle">
        <a href="https://www.viture.com/" className="navigation-module__mix1Pa__logo">
          <svg viewBox="0 0 41 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m10.1 0 16 28h-9.8L.3 0zM36 0l4.5 8h-9.8l-4.6-8z"
              fill="white"
            />
          </svg>
        </a>
      </div>
      <div className="navigation-module__mix1Pa__right">
        <div className="navigation-module__mix1Pa__glassesContainer">
          <img
            alt=""
            draggable="false"
            loading="eager"
            width="45"
            height="16"
            decoding="async"
            className="image-module___v4zoa__block"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0NiAxNiI+PHBhdGggZmlsbD0idXJsKCNhKSIgZD0iTTQ1LjAzNDQgMS44MzhjLS4zODk3LS4zMTU1LTEuMjE1NC0uMTQ4NS0yLjg5NDgtLjM4MDQtMS40MDEtLjE5NDktNC4yMzA5LS41Mjg5LTguNDcxMS0uNTI4OS01LjA1NjcgMC03LjU4MDUgMS4xNzg0LTguNjAxMSAxLjQ3NTMtMS4wMjA2LjI5NjktMS43MDcyLjI1OTgtMi4wMDQxLjI1OTgtLjI5NjkgMC0uOTgzNS4wMzctMi4wMDQxLS4yNTk4LTEuMDIwNi0uMjk3LTMuNTM1MS0xLjQ2Ni04LjU5MTgtMS40NjYtNC4yMzA5IDAtNy4wNjA4LjMzNC04LjQ3MTEuNTI4OS0xLjY3MDEuMjMyLTIuNTA1Mi4wNjQ5LTIuODk0OS4zODA0LS4zODk2LjMxNTQtLjI4NzYgMS4wNjctLjI4NzYgMS40Mjg4IDAgLjM2MTkgMCAxLjA4NTYuNTU2NyAxLjMxNzYuNTU2Ny4yMzIuOTE4Ni4wNjUgMS4zNDU0LjI5NjkuNDI2OC4yMzIuODUzNi44NTM2IDEuMTEzNCAyLjE3MTEuMjU5OCAxLjMxNzUuNTU2NyA0LjI5NTkgMS43NDQzIDYuMDAzMSAxLjE3ODQgMS43MDcyIDMuMzEyNCAyLjY2MjkgNi41OTY5IDIuNTk3OSAzLjI4NDYtLjA2NDkgNC45NTQ3LS41NTY3IDYuMzY1LTIuMDk2OSAxLjQxMDMtMS41NDAyIDIuMTM0LTQuMDM2IDIuNDU4Ny00LjkyNjguMzI0OC0uODkwNy43NTE2LTEuODkyOCAxLjExMzQtMi4xNzExLjI1OTgtLjE5NDkuNzIzNy0uMTY3Ljk1NTctLjE2Ny4yMzIgMCAuNjg2Ni0uMDI3OS45NTU3LjE2Ny4zNjE4LjI3ODMuNzg4NiAxLjI4MDQgMS4xMTM0IDIuMTcxMS4zMjQ3Ljg5MDcgMS4wNDg0IDMuMzc3MyAyLjQ1ODcgNC45MjY4IDEuNDEwNCAxLjU0MDIgMy4wODk3IDIuMDMyIDYuMzY1IDIuMDk2OSAzLjI4NDUuMDY1IDUuNDE4NS0uODkwNyA6LjU5NjktMi41OTc5IDEuMTc4My0xLjcwNzIgMS40NzUzLTQuNjk0OSAxLjc0NDMtNi4wMDMxLjI1OTgtMS4zMTc1LjY4NjYtMS45MzkyIDEuMTEzNC0yLjE3MTEuNDI2OC0uMjMyLjc4ODctLjA2NSAxLjM0NTQtLjI5Ny41NTY3LS4yMzE5LjU1NjctLjk1NTYuNTU2Ny0xLjMxNzUgMC0uMzYxOC4xMDIxLTEuMTEzNC0uMjg3Ni0xLjQyODhsLjAwOTItLjAwOTNaIi8+PGRlZnM+PGxpbmVhcmdyYWRpZW50IGlkPSJhIiB4MT0iLjgwMTgiIHgyPSI0NS4yMDIiIHkxPSIxNS42NjU4IiB5Mj0iNS42MDU4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0ZGMjkwMCIvPjxzdG9wIG9mZnNldD0iLjYwNTgiIHN0b3AtY29sb3I9IiNGRTdBNjAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1ODFERkYiLz48L2xpbmVhcmdyYWRpZW50PjwvZGVmcz48L3N2Zz4="
            style={{ color: 'transparent', objectFit: 'cover' }}
          />
        </div>
        <div className="navigation-module__mix1Pa__basePrice text16_24_normal text-white-40">
          From <strong className="text-white">$399</strong>
        </div>
        <a
          className="navigation-module__mix1Pa__buyLink"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.viture.com/product/viture-luma-xr-glasses"
        >
          <div className="navigation-module__mix1Pa__buttonHover"></div>
          <span className="navigation-module__mix1Pa__linkGradient text16_24_600">
            Order Now
          </span>
        </a>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Hide preloader after 3 seconds
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Set viewport variables
    const updateVh = () => {
      const vw = window.innerWidth / 100;
      const vh = window.innerHeight / 100;
      document.documentElement.style.setProperty('--vw', `${vw}px`);
      document.documentElement.style.setProperty('--dvh', `${vh}px`);
      document.documentElement.style.setProperty('--svh', `${vh}px`);
      document.documentElement.style.setProperty('--lvh', `${vh}px`);
    };

    updateVh();
    window.addEventListener('resize', updateVh);
    return () => window.removeEventListener('resize', updateVh);
  }, []);

  return (
    <div 
      id="lenis" 
      className="lenis"
      style={{
        '--vw': '25.6px',
        '--dvh': '12.88px',
        '--svh': '12.88px',
        '--lvh': '1vh',
        '--scrollbar-width': '11px'
      } as React.CSSProperties}
    >
      <div>
        <Header onAIChatToggle={() => {}} />
        <main className="relative flex flex-col grow font-season">
          <Preloader isVisible={showPreloader} />
          
          <section className="section-module__Fy_-CG__section overflow-x-clip section1-module__iQD6-W__section1 overflow-clip">
            <div className="h-full" style={{ filter: 'blur(0px)', transform: 'scale(1)' }}>
              <div className="section1-module__iQD6-W__sticky">
                <div className="section1-module__iQD6-W__inner">
                  <div className="absolute inset-0">
                    <img
                      alt=""
                      draggable="false"
                      loading="eager"
                      decoding="async"
                      className="desktop-only"
                      src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      style={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        inset: '0px',
                        objectFit: 'cover',
                        color: 'transparent'
                      }}
                    />
                    <img
                      alt=""
                      draggable="false"
                      loading="eager"
                      decoding="async"
                      className="mobile-only"
                      src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      style={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        inset: '0px',
                        objectFit: 'cover',
                        color: 'transparent'
                      }}
                    />
                  </div>
                  
                  <div className="dr-layout-block section1-module__iQD6-W__contentWrapper">
                    <h2 className="section1-module__iQD6-W__title h2">
                      <div className="section1-module__iQD6-W__lumaIlluWrapper">
                        <div
                          className="section1-module__iQD6-W__lumaIlluBlur"
                          aria-hidden="true"
                        >
                          <LumaIlluminateText />
                        </div>
                        <div className="section1-module__iQD6-W__lumaIllu">
                          <LumaIlluminateText />
                        </div>
                      </div>
                      <SplitText text="Your Victory" />
                    </h2>
                  </div>
                  
                  <div className="section1-module__iQD6-W__gridWrapper">
                    <DotsGrid />
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Section 2 - A 1200p 4K‑Like Display */}
          <section className="section-module__Fy_-CG__section overflow-x-clip">
            <div className="section-module__Fy_-CG__mask"></div>
            <div className="h-full">
              <div className="section2-module__24Nf6W__sticky">
                <div className="dr-layout-block-inner section2-module__24Nf6W__inner">
                  <div className="relative">
                    <div className="h-[50vh] absolute left-0 top-[100%] right-0"></div>
                    <div className="title-subtitle-module__HtnROq__titleSubtitle">
                      <h2 className="split-text-module__McvV0q__splitText h2 desktop-only" style={{opacity: 1}}>
                        <span className="split-text-module__McvV0q__split">
                          <span>A 1200p 4K‑Like Display</span>
                        </span>
                        <span className="split-text-module__McvV0q__fallback">
                          <span>A 1200p 4K‑Like Display</span>
                        </span>
                      </h2>
                      <h2 className="split-text-module__McvV0q__splitText h2 mobile-only" style={{opacity: 1}}>
                        <span className="split-text-module__McvV0q__split">
                          <span>A 1200p<br />4K‑Like<br />Display</span>
                        </span>
                        <span className="split-text-module__McvV0q__fallback">
                          <span>A 1200p<br />4K‑Like<br />Display</span>
                        </span>
                      </h2>
                      <p className="split-text-module__McvV0q__splitText subtitle text-white-40 inline-block desktop-only title-subtitle-module__HtnROq__subtitle" style={{opacity: 1}}>
                        <span className="split-text-module__McvV0q__split">
                          <span>You'll Never Forget</span>
                        </span>
                        <span className="split-text-module__McvV0q__fallback">
                          <span>You'll Never Forget</span>
                        </span>
                      </p>
                      <p className="split-text-module__McvV0q__splitText subtitle text-white-40 inline-block mobile-only title-subtitle-module__HtnROq__subtitle" style={{opacity: 1}}>
                        <span className="split-text-module__McvV0q__split">
                          <span>You'll Never Forget</span>
                        </span>
                        <span className="split-text-module__McvV0q__fallback">
                          <span>You'll Never Forget</span>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="section2-module__24Nf6W__cards grid grid-cols-1 dt:grid-cols-4 gap-gap">
                    {/* Card 1 - Resolution */}
                    <div className="card-module__JTl4uq__cardOuter bg-white-08">
                      <div className="card-module__JTl4uq__card">
                        <div className="absolute inset-0">
                          <div className="absolute top-[33%] w-full h-full bg-gradient-to-b from-purple-600/20 to-blue-600/20 circleMask"></div>
                        </div>
                        <div className="section2-module__24Nf6W__cardContent">
                          <h3 className="h4 desktop-only">
                            Up To 1200 <sup>p</sup>
                          </h3>
                          <h3 className="h4 mobile-only">
                            Up To 1200 <sup>p</sup>
                          </h3>
                          <p className="lightSubtitle text-white-40 desktop-only">
                            Resolution
                          </p>
                          <p className="lightSubtitle text-white-40 mobile-only">
                            Resolution
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Card 2 - Advanced Optical Optimization */}
                    <div className="card-module__JTl4uq__cardOuter card-module__JTl4uq__align-bottom bg-white-08 dt:col-span-2">
                      <div className="card-module__JTl4uq__card">
                        <div className="absolute inset-0">
                          <div className="absolute left-[33%] dt:left-[10%] top-[-0%] w-full h-full bg-gradient-to-r from-orange-600/20 to-red-600/20 circleMask"></div>
                        </div>
                        <div className="section2-module__24Nf6W__cardCols">
                          <div className="section2-module__24Nf6W__cardContent">
                            <p className="lightSubtitle text-white-40 desktop-only">
                              Enhanced with
                            </p>
                            <p className="lightSubtitle text-white-40 mobile-only">
                              Enhanced with
                            </p>
                            <h3 className="h4 desktop-only">
                              Advanced Optical<br />Optimization
                            </h3>
                            <h3 className="h4 mobile-only">
                              Advanced Optical<br />Optimization
                            </h3>
                            <p className="lightSubtitle text-white-40 desktop-only">
                              Delivering nearly 4K sharpness
                            </p>
                            <p className="lightSubtitle text-white-40 mobile-only">
                              Delivering nearly 4K sharpness
                            </p>
                          </div>
                          <div className="section2-module__24Nf6W__right relative">
                            <div>
                              <a
                                className="small-button-module__2USyQq__button text14_24 small-button-module__2USyQq__white"
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.viture.com/blog/leading-the-way-in-xr-best-display-best-features"
                              >
                                <div className="small-button-module__2USyQq__buttonHover"></div>
                                <span>Learn More</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Card 3 - Even Sharper */}
                    <div className="card-module__JTl4uq__cardOuter bg-white-08">
                      <div className="card-module__JTl4uq__card">
                        <div className="absolute inset-0">
                          <div className="absolute left-[0%] top-[20%] w-full h-full bg-gradient-to-t from-blue-600/20 to-cyan-600/20 circleMask"></div>
                        </div>
                        <div className="section2-module__24Nf6W__cardContent">
                          <h3 className="h4 desktop-only">Even Sharper</h3>
                          <h3 className="h4 mobile-only">Even Sharper</h3>
                          <p className="lightSubtitle text-white-40 desktop-only">
                            Than VITURE Pro — and<br />that was already the<br />sharpest
                            out there
                          </p>
                          <p className="lightSubtitle text-white-40 mobile-only">
                            Than VITURE Pro — and that<br />was already the
                            sharpest out<br />there
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 - The Best Just Got Better */}
          <section className="section-module__Fy_-CG__section overflow-x-clip section3-module__SzoO3a__section3" style={{"--aspect-ratio": 1.7777777777777777} as React.CSSProperties}>
            <div className="h-full">
              <div className="section3-module__SzoO3a__sticky">
                <div className="section3-module__SzoO3a__title dr-layout-block relative">
                  <div className="title-subtitle-module__HtnROq__titleSubtitle title-subtitle-module__HtnROq__centered">
                    <h2 className="split-text-module__McvV0q__splitText h2 desktop-only" style={{opacity: 1}}>
                      <span className="split-text-module__McvV0q__split">
                        <span>The Best Just Got Better</span>
                      </span>
                      <span className="split-text-module__McvV0q__fallback">
                        <span>The Best Just Got Better</span>
                      </span>
                    </h2>
                    <h2 className="split-text-module__McvV0q__splitText h2 mobile-only" style={{opacity: 1}}>
                      <span className="split-text-module__McvV0q__split">
                        <span>The Best Just<br />Got Better</span>
                      </span>
                      <span className="split-text-module__McvV0q__fallback">
                        <span>The Best Just<br />Got Better</span>
                      </span>
                    </h2>
                  </div>
                </div>
                <div className="section3-module__SzoO3a__viewport">
                  <div className="section3-module__SzoO3a__viewportInner">
                    <div className="absolute inset-0 top-[10%] dt:min-h-full">
                      {/* Placeholder for section3 image */}
                      <div className="w-full h-full bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center">
                        <span className="text-white-40 text-sm">Section 3 Image</span>
                      </div>
                    </div>
                    <div className="section3-module__SzoO3a__hotspots">
                      {/* Hotspot 1 - Sony's */}
                      <div className="hotspot-module__GlFlMq__hotspot" style={{"--pos-x": 28, "--pos-y": 70} as React.CSSProperties}>
                        <div className="hotspot-module__GlFlMq__inner">
                          <div className="flex flex-col">
                            <span className="split-text-module__McvV0q__splitText lightSubtitle text-white-40" style={{opacity: 1}}>
                              <span className="split-text-module__McvV0q__split">Pioneering</span>
                              <span className="split-text-module__McvV0q__fallback">Pioneering</span>
                            </span>
                            <span className="split-text-module__McvV0q__splitText hotspotTitle uppercase hotspot-module__GlFlMq__title" style={{opacity: 1}}>
                              <span className="split-text-module__McvV0q__split">Sony's</span>
                              <span className="split-text-module__McvV0q__fallback">Sony's</span>
                            </span>
                            <span className="split-text-module__McvV0q__splitText lightSubtitle" style={{opacity: 1}}>
                              <span className="split-text-module__McvV0q__split">
                                <p className="lightSubtitle desktop-only">
                                  Newest Innovation —<br />Unmatched Clarity,<br />Ultra Efficiency
                                </p>
                                <p className="lightSubtitle mobile-only">
                                  Newest Innovation —<br />Unmatched Clarity,<br />Ultra Efficiency
                                </p>
                              </span>
                              <span className="split-text-module__McvV0q__fallback">
                                <p className="lightSubtitle desktop-only">
                                  Newest Innovation —<br />Unmatched Clarity,<br />Ultra Efficiency
                                </p>
                                <p className="lightSubtitle mobile-only">
                                  Newest Innovation —<br />Unmatched Clarity,<br />Ultra Efficiency
                                </p>
                              </span>
                            </span>
                          </div>
                          <div className="hotspot-module__GlFlMq__decorator">
                            <div className="hotspot-module__GlFlMq__outerCircle"></div>
                            <div className="hotspot-module__GlFlMq__innerCircle"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Hotspot 2 - Premium */}
                      <div className="hotspot-module__GlFlMq__hotspot" style={{"--pos-x": 60, "--pos-y": 50} as React.CSSProperties}>
                        <div className="hotspot-module__GlFlMq__inner">
                          <div className="flex flex-col">
                            <span className="split-text-module__McvV0q__splitText lightSubtitle text-white-40" style={{opacity: 1}}>
                              <span className="split-text-module__McvV0q__split">Crafted with A</span>
                              <span className="split-text-module__McvV0q__fallback">Crafted with A</span>
                            </span>
                            <span className="split-text-module__McvV0q__splitText hotspotTitle uppercase hotspot-module__GlFlMq__title" style={{opacity: 1}}>
                              <span className="split-text-module__McvV0q__split">premium</span>
                              <span className="split-text-module__McvV0q__fallback">premium</span>
                            </span>
                            <span className="split-text-module__McvV0q__splitText lightSubtitle" style={{opacity: 1}}>
                              <span className="split-text-module__McvV0q__split">
                                <p className="lightSubtitle desktop-only">Translucent Aesthetic</p>
                                <p className="lightSubtitle mobile-only">Translucent Aesthetic</p>
                              </span>
                              <span className="split-text-module__McvV0q__fallback">
                                <p className="lightSubtitle desktop-only">Translucent Aesthetic</p>
                                <p className="lightSubtitle mobile-only">Translucent Aesthetic</p>
                              </span>
                            </span>
                          </div>
                          <div className="hotspot-module__GlFlMq__decorator">
                            <div className="hotspot-module__GlFlMq__outerCircle"></div>
                            <div className="hotspot-module__GlFlMq__innerCircle"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}