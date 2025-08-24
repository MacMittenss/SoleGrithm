import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import womenSneakersImage from '@assets/close-up-futuristic-sneakers (1)_1755555541238.jpg';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Define arTryonImage placeholder for now
const arTryonImage = womenSneakersImage; // You can replace this with the actual AR image

export default function AdvancedFlagshipFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the section during scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      // Split title into words for word-by-word reveal
      const title = titleRef.current;
      if (title) {
        const words = title.innerText.split(" ");
        title.innerHTML = words.map(w => `<span class="word inline-block">${w}</span>`).join(" ");
      }

      // Set initial states - everything hidden
      gsap.set(".flagship-features .word", { opacity: 0, y: 50 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(cardsRef.current?.children || [], { opacity: 0, y: 50 });
      
      // Set overlay initially hidden with rotation setup
      if (overlayRef.current) {
        gsap.set(overlayRef.current, { 
          scaleX: 0,
          scaleY: 0,
          rotation: -45,
          transformOrigin: "bottom right",
          opacity: 1
        });
      }

      // Movie-like cinematic sequence timeline
      let movieTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 100%",
          end: "top 0%",
          pin: true,
          pinSpacing: false,
          scrub: false,
          onEnter: () => {
            // Trigger the movie sequence when entering
            movieTl.play();
          }
        }
      });

      // Step 1: Rotating overlay sweeps in from bottom-right clockwise
      if (overlayRef.current) {
        movieTl.to(overlayRef.current, {
          scaleX: 3,
          scaleY: 3,
          rotation: 0,
          duration: 1.2,
          ease: "power2.out"
        });
      }

      // Step 2: Header emerges from within the overlay (word by word)
      movieTl
        .to(".flagship-features .word", {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out"
        }, "+=0.3")
        // Step 3: Subtitle emerges
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "+=0.2");

      // Step 4: Content cards animate in sequentially 
      movieTl.to(cardsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 0.8,
        ease: "power2.out"
      }, "+=0.3");

      // Timeline stays paused initially
      movieTl.pause();

      // Background animation removed - now using static homepage background

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flagship-features relative min-h-screen bg-black py-16 px-8 lg:px-16 overflow-hidden"
      style={{
        background: 'transparent',
      }}
    >
      {/* Rotating Black Overlay for Hero → Flagship Transition */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          background: '#000000',
          transformOrigin: 'bottom right',
        }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        {/* Gradient orbs */}
        <div
          className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full"
          style={{
            background: 'linear-gradient(to right, #8B5CF6 0%, #EC4899 61%, #06B6D4 100%)',
            filter: 'blur(100px)',
          }}
        />
        
        <div
          className="absolute bottom-1/3 right-1/3 w-60 h-60 rounded-full"
          style={{
            background: 'linear-gradient(to right, #06B6D4 0%, #8B5CF6 61%, #EC4899 100%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            style={{ 
              fontFamily: '"seasonSans", "seasonSans Fallback", "Manrope", "Inter", sans-serif' 
            }}
          >
            Our Flagship Features
          </h2>
          <p 
            ref={subtitleRef}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            style={{ opacity: 0 }}
          >
            Discover the cutting-edge technologies and exclusive experiences that make SoleGrithm the future of sneaker culture
          </p>
        </div>
        
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          
          {/* Women in Sneakers Card */}
          <div 
            className="group cursor-pointer"
            style={{ opacity: 0, transform: 'translateY(50px) scale(0.9)' }}
          >
            <div className="relative h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/10">
              <div 
                className="absolute inset-4 bg-cover bg-center bg-no-repeat transform transition-transform duration-700 group-hover:scale-105 rounded-2xl"
                style={{
                  backgroundImage: `url(${womenSneakersImage})`
                }}
              />
              <div className="absolute inset-4 bg-black/20 group-hover:bg-black/30 transition-all duration-500 rounded-2xl" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                <div className="max-w-lg">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                    Women in Sneakers
                  </h3>
                  <p className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8">
                    Celebrating the powerful influence of women in sneaker culture and style
                  </p>
                  <div>
                    <Link href="/women">
                      <Button 
                        size="lg"
                        className="bg-white text-black hover:bg-white/90 font-semibold transform hover:scale-105 transition-all duration-200"
                        data-testid="button-women-sneakers"
                      >
                        Explore Collection
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AR Try-On Card */}
          <div 
            className="group cursor-pointer"
            style={{ opacity: 0, transform: 'translateY(50px) scale(0.9)' }}
          >
            <div className="relative h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-white/10">
              <div 
                className="absolute inset-4 bg-cover bg-center bg-no-repeat transform transition-transform duration-700 group-hover:scale-105 rounded-2xl"
                style={{
                  backgroundImage: `url(${arTryonImage})`
                }}
              />
              <div className="absolute inset-4 bg-black/20 group-hover:bg-black/30 transition-all duration-500 rounded-2xl" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                <div className="max-w-lg">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                    AR Try-On
                  </h3>
                  <p className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8">
                    Experience the future of sneaker shopping with augmented reality technology
                  </p>
                  <div>
                    <Link href="/ar-tryeon">
                      <Button 
                        size="lg"
                        className="bg-white text-black hover:bg-white/90 font-semibold transform hover:scale-105 transition-all duration-200"
                        data-testid="button-ar-tryeon"
                      >
                        Try It Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}