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
      // Pin the section during scroll - delay start to avoid overlap with trending
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

      // Header animation timeline - delayed to wait for trending section to finish
      let headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 15%", // Wait until trending section is almost out of viewport
          end: "+=200",
          toggleActions: "play none none none"
        }
      });

      // Set initial states
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(cardsRef.current?.children || [], { opacity: 0, y: 60, scale: 0.8 });

      // Header animation sequence
      headerTl
        // Animate title words first
        .from(".latest-stories .word", {
          opacity: 0,
          y: 50,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out"
        })
        // Then animate subtitle
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1
        }, "-=0.3");

      // Cards animation timeline (separate, scroll-triggered after header)
      let cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
          onUpdate: (self) => {
            // Animate cards one by one based on scroll progress
            const cards = cardsRef.current?.children || [];
            const progress = self.progress;
            const cardCount = cards.length;
            
            Array.from(cards).forEach((card: any, index) => {
              const cardProgress = Math.max(0, Math.min(1, (progress * cardCount) - index));
              gsap.set(card, {
                opacity: cardProgress,
                y: 60 * (1 - cardProgress),
                scale: 0.8 + (0.2 * cardProgress)
              });
            });
          }
        }
      });

      // Background animation removed - now using static homepage background

    }, sectionRef);

    return () => ctx.revert();
  }, [blogPosts]); // Re-run when blog posts change

  return (
    <div
      ref={sectionRef}
      className="latest-stories min-h-screen relative flex items-center py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 30, 0.98))',
        zIndex: 1, // Ensure proper layering
      }}
      data-testid="section-latest-stories"
    >
      {/* Background gradient effects - Same as trending section */}
      <div className="absolute top-16 bottom-0 left-0 right-0 overflow-hidden">
        {/* Purple/Pink/Blue gradient orbs like trending section */}
        <div 
          className="absolute top-32 left-1/4 w-80 h-80 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(to right, #8B5CF6 0%, #EC4899 61%, #06B6D4 100%)',
            filter: 'blur(100px)',
          }}
        />
        <div 
          className="absolute bottom-20 right-1/4 w-60 h-60 rounded-full opacity-15"
          style={{
            background: 'linear-gradient(to right, #06B6D4 0%, #8B5CF6 61%, #EC4899 100%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

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
          <h2 
            ref={titleRef}
            className="font-bold leading-tight mb-6 text-white"
            style={{ 
              fontFamily: '"seasonSans", "seasonSans Fallback", "Manrope", "Inter", sans-serif',
              fontSize: 'calc(4rem * 1.4)', // 1.4 times bigger
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