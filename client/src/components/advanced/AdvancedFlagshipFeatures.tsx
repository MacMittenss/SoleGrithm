import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Define images
const womenSneakersImage = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80';
const arTryonImage = 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80';

export default function AdvancedFlagshipFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states for elements - maintaining exact GSAP animations
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
      gsap.set(cardsRef.current?.children || [], { opacity: 0, y: 50, scale: 0.8 });

      // Split heading into words (preserving exact animation)
      const heading = titleRef.current;
      if (heading) {
        const words = heading.innerText.split(" ");
        heading.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(" ");
      }

      // Exact GSAP timeline preserved - using template visual styling
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });

      tl.from(".flagship-features .word", {
        opacity: 0,
        y: 50,
        stagger: 0.05,
        duration: 0.3,
        ease: "expo.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "expo.out"
      }, "-=0.2")
      .to(cardsRef.current?.children || [], {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.03,
        y: 0,
        ease: "back.out(1.2)"
      }, "-=0.1");

      // Pinning timeline
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flagship-features section"
      style={{
        backgroundColor: 'var(--black)',
        color: 'whitesmoke',
        fontFamily: 'Inter, sans-serif',
        minHeight: '100vh',
        padding: '4.5rem',
      }}
    >
      <div className="w-layout-blockcontainer container w-container" style={{ maxWidth: '940px', margin: '0 auto' }}>
        {/* Main Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '7.8vw' }}>
          <h5 style={{ 
            letterSpacing: '0.14vw', 
            textTransform: 'uppercase', 
            fontSize: '0.89vw', 
            fontWeight: 400, 
            lineHeight: '1.44vw',
            marginBottom: '1.1vw',
            color: 'whitesmoke'
          }}>
            Creative Solutions
          </h5>
          <h2 
            ref={titleRef}
            style={{ 
              letterSpacing: '-0.07vw',
              textTransform: 'uppercase',
              fontSize: '7.78vw',
              fontWeight: 500,
              lineHeight: '5.55vw',
              marginBottom: '2.2vw',
              color: 'whitesmoke'
            }}
          >
            Our Flagship Features
          </h2>
          <p 
            ref={subtitleRef}
            style={{
              letterSpacing: '0.07vw',
              fontSize: '1.11vw',
              fontWeight: 300,
              lineHeight: '1.89vw',
              maxWidth: '42.22vw',
              margin: '0 auto',
              color: 'whitesmoke'
            }}
          >
            Discover the cutting-edge technologies and exclusive experiences that make SoleGrithm the future of sneaker culture
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="services-flex"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            gap: '2.2vw',
            flexWrap: 'wrap'
          }}
        >
          
          {/* Left Services Wrapper */}
          <div 
            className="services-wrapper"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
              maxWidth: '43.3vw',
              gap: '2.22vw'
            }}
          >
            {/* Women in Sneakers Card */}
            <div 
              className="services-card"
              style={{
                borderRadius: '24px',
                backgroundColor: '#1c1c1c',
                padding: '2.2vw',
                minWidth: '33.3vw',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.1vw',
                transition: 'filter 0.2s ease-in-out, color 0.3s',
                cursor: 'pointer'
              }}
            >
              <div 
                className="services-title-flex"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2.22vw'
                }}
              >
                <div 
                  className="services-icon"
                  style={{
                    aspectRatio: '1',
                    borderRadius: '24px',
                    backgroundColor: '#161616',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: '8.89vw',
                    maxWidth: '8.89vw'
                  }}
                >
                  <img
                    src={womenSneakersImage}
                    alt="Women in Sneakers"
                    className="services-image"
                    style={{
                      aspectRatio: '1',
                      borderRadius: '4px',
                      minWidth: '5.55vw',
                      maxWidth: '5.55vw',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <h4 
                  style={{
                    letterSpacing: '-0.07vw',
                    textTransform: 'uppercase',
                    fontSize: '2.78vw',
                    fontWeight: 500,
                    lineHeight: '3.33vw',
                    margin: 0,
                    color: 'whitesmoke'
                  }}
                >
                  Women Sneakers
                </h4>
              </div>
              <div className="services-text-block">
                <p 
                  style={{
                    letterSpacing: '0.07vw',
                    fontSize: '1.11vw',
                    fontWeight: 300,
                    lineHeight: '1.89vw',
                    marginBottom: '1.1vw',
                    color: 'whitesmoke'
                  }}
                >
                  Celebrating the powerful influence of women in sneaker culture and style innovation.
                </p>
                <Link href="/women">
                  <Button 
                    className="bg-whitesmoke text-black hover:bg-gray-200 font-semibold transform hover:scale-105 transition-all duration-200"
                    data-testid="button-women-sneakers"
                    style={{
                      backgroundColor: 'whitesmoke',
                      color: '#050505',
                      padding: '0.5vw 1vw',
                      fontSize: '1vw',
                      borderRadius: '4px'
                    }}
                  >
                    Explore Collection
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Services Wrapper */}
          <div 
            className="services-wrapper"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
              maxWidth: '43.3vw',
              gap: '2.22vw'
            }}
          >
            {/* AR Try-On Card */}
            <div 
              className="services-card"
              style={{
                borderRadius: '24px',
                backgroundColor: '#1c1c1c',
                padding: '2.2vw',
                minWidth: '33.3vw',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.1vw',
                transition: 'filter 0.2s ease-in-out, color 0.3s',
                cursor: 'pointer'
              }}
            >
              <div 
                className="services-title-flex"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2.22vw'
                }}
              >
                <div 
                  className="services-icon"
                  style={{
                    aspectRatio: '1',
                    borderRadius: '24px',
                    backgroundColor: '#161616',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: '8.89vw',
                    maxWidth: '8.89vw'
                  }}
                >
                  <img
                    src={arTryonImage}
                    alt="AR Try-On Technology"
                    className="services-image"
                    style={{
                      aspectRatio: '1',
                      borderRadius: '4px',
                      minWidth: '5.55vw',
                      maxWidth: '5.55vw',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <h4 
                  style={{
                    letterSpacing: '-0.07vw',
                    textTransform: 'uppercase',
                    fontSize: '2.78vw',
                    fontWeight: 500,
                    lineHeight: '3.33vw',
                    margin: 0,
                    color: 'whitesmoke'
                  }}
                >
                  AR Try-On
                </h4>
              </div>
              <div className="services-text-block">
                <p 
                  style={{
                    letterSpacing: '0.07vw',
                    fontSize: '1.11vw',
                    fontWeight: 300,
                    lineHeight: '1.89vw',
                    marginBottom: '1.1vw',
                    color: 'whitesmoke'
                  }}
                >
                  Experience the future of sneaker shopping with augmented reality technology.
                </p>
                <Link href="/ar-tryeon">
                  <Button 
                    className="bg-whitesmoke text-black hover:bg-gray-200 font-semibold transform hover:scale-105 transition-all duration-200"
                    data-testid="button-ar-tryeon"
                    style={{
                      backgroundColor: 'whitesmoke',
                      color: '#050505',
                      padding: '0.5vw 1vw',
                      fontSize: '1vw',
                      borderRadius: '4px'
                    }}
                  >
                    Try It Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}