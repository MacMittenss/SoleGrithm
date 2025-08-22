import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useQuery } from "@tanstack/react-query";
import { BookOpen } from 'lucide-react';
import { MasonryGrid } from "@/components/ui/masonry-grid";
import PinterestBlogCard from "@/components/PinterestBlogCard";
import SplitText from "./SplitText";
import GradientText from "./GradientText";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AdvancedLatestStories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Fetch blog data
  const { data: blogPosts, isLoading: blogLoading, error: blogError } = useQuery({
    queryKey: ["/api/blog"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

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
        title.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(" ");
      }

      // Timeline for section reveal
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      });

      // Set initial states
      gsap.set(badgeRef.current, { opacity: 0, y: 50 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(cardsRef.current?.children || [], { opacity: 0, y: 60, scale: 0.8 });

      // Animate badge
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      // Animate title words
      .from(".latest-stories .word", {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      // Animate subtitle
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1
      }, "-=0.3")
      // Animate cards
      .to(cardsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5");

      // Background gradient animation (independent)
      gsap.to(sectionRef.current, {
        background: 'linear-gradient(135deg, rgba(20, 30, 40, 0.95) 0%, rgba(40, 20, 30, 0.98) 50%, rgba(30, 40, 50, 0.95) 100%)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [blogPosts]); // Re-run when blog posts change

  return (
    <div
      ref={sectionRef}
      className="latest-stories min-h-screen relative flex items-center py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(20, 30, 40, 0.98), rgba(40, 20, 30, 0.95))',
      }}
      data-testid="section-latest-stories"
    >
      {/* Background effects */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 40% 60%, rgba(100, 150, 255, 0.08) 0%, rgba(255, 100, 150, 0.04) 35%, rgba(150, 255, 200, 0.06) 100%)',
        }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 rounded-full border border-blue-500/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 rotate-45 border border-pink-500/20"
        animate={{ rotate: [45, 135, 45] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(100, 150, 255, 0.1)',
              border: '1px solid rgba(100, 150, 255, 0.2)',
            }}
          >
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">LATEST STORIES</span>
          </div>

          <h2 
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{ 
              fontFamily: '"seasonSans", "seasonSans Fallback", "Manrope", "Inter", sans-serif' 
            }}
          >
            Discover Culture & Trends
          </h2>
          
          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto"
          >
            Explore the latest in sneaker culture with curated stories from our community
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div ref={cardsRef}>
          {blogLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white/10 rounded-lg aspect-[3/4] mb-3" />
                  <div className="space-y-2">
                    <div className="h-3 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            Array.isArray(blogPosts) && blogPosts.length > 0 ? (
              <MasonryGrid
                columns={{ default: 2, sm: 3, md: 4, lg: 4 }}
                gap="1rem"
                className="max-w-6xl mx-auto"
              >
                {blogPosts.slice(0, 8).map((post: any, index: number) => (
                  <div key={post.id}>
                    <PinterestBlogCard 
                      post={post}
                    />
                  </div>
                ))}
              </MasonryGrid>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No stories available yet</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}