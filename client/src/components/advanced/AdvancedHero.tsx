import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import futuristicSneakerImage from '@assets/transparent-Photoroom_1755556579483.png';
import SplitText from './SplitText';
import GradientText from './GradientText';
import BlurryGradient from './BlurryGradient';
import MarqueeText from './MarqueeText';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AdvancedHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const displaySectionRef = useRef<HTMLDivElement>(null);
  const displayHeadingRef = useRef<HTMLHeadingElement>(null);
  const displayImageRef = useRef<HTMLDivElement>(null);
  const displayParaRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!heroRef.current || !displaySectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hero fade/scale out animation with pin
      gsap.to([heroTextRef.current], {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
        opacity: 0,
        y: -100,
        scale: 0.8,
        stagger: 0.2
      });

      // Split heading into words for word-by-word reveal
      const heading = displayHeadingRef.current;
      if (heading) {
        const words = heading.innerText.split(" ");
        heading.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(" ");
      }

      // Timeline for display section reveal
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: displaySectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
          pin: true,
        }
      });

      tl.from(".display-section .word", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out"
      })
      .to(displayParaRef.current, {
        opacity: 1,
        y: 0,
        duration: 1
      })
      .to(displayImageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1
      });

      // Background gradient animation (independent)
      gsap.to(heroRef.current, {
        background: 'radial-gradient(ellipse at center, rgba(255, 41, 0, 0.15) 0%, rgba(254, 122, 96, 0.08) 35%, rgba(88, 29, 255, 0.15) 100%)',
        duration: 3,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Floating elements animation
      const floatingElements = heroRef.current?.querySelectorAll('[data-float]');
      if (floatingElements) {
        gsap.to(floatingElements, {
          y: 'random(-20, 20)',
          rotation: 'random(-5, 5)',
          duration: 'random(3, 5)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.5,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      {/* Hero Section - Will fade/scale out on scroll */}
      <div
        ref={heroRef}
        className="hero relative min-h-screen flex items-center overflow-hidden px-8 lg:px-16"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 20, 0.98))',
        }}
        data-testid="hero-section"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          {/* Gradient orbs */}
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
            style={{
              background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
              filter: 'blur(100px)',
            }}
            data-float
          />
          
          <div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full"
            style={{
              background: 'linear-gradient(to right, #581dff 0%, #fe7a60 61%, #ff2900 100%)',
              filter: 'blur(80px)',
            }}
            data-float
          />
        </div>

        {/* Hero Text Content */}
        <div
          ref={heroTextRef}
          className="relative z-10 w-full h-full flex items-center justify-center"
        >
          <div className="text-center space-y-8">
            {/* Main heading */}
            <div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.85] text-white">
                Welcome To
              </h1>
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.85] bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                SoleGrithm
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto">
              Discover, Collect, and Connect Through AI-Powered Sneaker Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Display Section - Will reveal word by word */}
      <div
        ref={displaySectionRef}
        className="display-section relative min-h-screen flex items-center overflow-hidden px-8 lg:px-16"
        style={{
          background: 'linear-gradient(135deg, rgba(10, 10, 20, 0.95), rgba(30, 20, 40, 0.98))',
        }}
      >
        <div className="relative z-10 w-full h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full">
            
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <h2 
                  ref={displayHeadingRef}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                >
                  Discover Your Perfect Sneakers
                </h2>
                <p 
                  ref={displayParaRef}
                  className="text-lg md:text-xl text-gray-300 max-w-xl opacity-0"
                >
                  Experience the future of sneaker discovery with AI-powered recommendations, 
                  visual search, and immersive AR try-on technology.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/discover">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
                      data-testid="button-discover"
                    >
                      Start Discovering
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/visual-search">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="border-white/30 text-white hover:bg-white/10"
                      data-testid="button-visual-search"
                    >
                      Try Visual Search
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div 
              ref={displayImageRef}
              className="display-img relative flex items-center justify-center opacity-0 scale-75"
            >
              <div className="relative">
                <img
                  src={futuristicSneakerImage}
                  alt="Futuristic Sneaker"
                  className="w-full max-w-lg h-auto object-contain"
                />
                
                {/* Floating UI Elements */}
                <div
                  className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  data-float
                >
                  <div className="text-white text-sm font-medium">AI Match: 98%</div>
                </div>

                <div
                  className="absolute -bottom-6 -left-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-4 border border-orange-500/30"
                  data-float
                >
                  <div className="text-white text-sm font-medium">AR Ready</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}