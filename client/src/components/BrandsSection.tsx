import { useMemo, useEffect, useRef } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '@/components/advanced/SplitText';
import GradientText from '@/components/advanced/GradientText';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function BrandsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { data: brands, isLoading } = useQuery({
    queryKey: ['/api/brands'],
    staleTime: 1000 * 60 * 15, // 15 minutes cache
    refetchOnWindowFocus: false
  });

  // Iconic brands data - same as HotRightNowSlider
  const featuredBrands = useMemo(() => {
    const allBrands = [
      // Major Sportswear
      { id: 1, name: 'Nike', slug: 'nike', type: 'brand', isPopular: true },
      { id: 2, name: 'Adidas', slug: 'adidas', type: 'brand', isPopular: true },
      { id: 3, name: 'Jordan', slug: 'jordan', type: 'brand', isPopular: true },
      { id: 4, name: 'New Balance', slug: 'new-balance', type: 'brand', isPopular: false },
      { id: 5, name: 'Converse', slug: 'converse', type: 'brand', isPopular: false },
      { id: 6, name: 'Vans', slug: 'vans', type: 'brand', isPopular: false },
      { id: 7, name: 'Puma', slug: 'puma', type: 'brand', isPopular: false },
      { id: 8, name: 'Reebok', slug: 'reebok', type: 'brand', isPopular: false },
      { id: 9, name: 'ASICS', slug: 'asics', type: 'brand', isPopular: false },

      // Luxury & High-Fashion
      { id: 10, name: 'Balenciaga', slug: 'balenciaga', type: 'luxury', isPopular: true },
      { id: 11, name: 'Golden Goose', slug: 'golden-goose', type: 'luxury', isPopular: false },
      { id: 12, name: 'Off-White', slug: 'off-white', type: 'luxury', isPopular: true },
      { id: 13, name: 'Gucci', slug: 'gucci', type: 'luxury', isPopular: false },
      { id: 14, name: 'Saint Laurent', slug: 'saint-laurent', type: 'luxury', isPopular: false },
      { id: 15, name: 'Common Projects', slug: 'common-projects', type: 'luxury', isPopular: false },

      // Marketplaces
      { id: 16, name: 'GOAT', slug: 'goat', type: 'marketplace', isPopular: true },
      { id: 17, name: 'StockX', slug: 'stockx', type: 'marketplace', isPopular: true },
      { id: 18, name: 'Flight Club', slug: 'flight-club', type: 'marketplace', isPopular: false },
      { id: 19, name: 'Stadium Goods', slug: 'stadium-goods', type: 'marketplace', isPopular: false },
      { id: 20, name: 'Grailed', slug: 'grailed', type: 'marketplace', isPopular: false }
    ];

    return allBrands.map(brand => ({
      ...brand,
      logoUrl: getBrandLogo(brand.name)
    }));
  }, []);

  function getBrandLogo(brandName: string): string {
    // Using logos-world.net consistently (same source as working Gucci logo)
    const logos: Record<string, string> = {
      'Nike': 'https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png',
      'Adidas': 'https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png',
      'Jordan': 'https://logos-world.net/wp-content/uploads/2020/04/Jordan-Logo.png',
      'New Balance': 'https://logos-world.net/wp-content/uploads/2020/09/New-Balance-Logo.png',
      'Converse': 'https://logos-world.net/wp-content/uploads/2020/06/Converse-Logo.png',
      'Vans': 'https://logos-world.net/wp-content/uploads/2020/04/Vans-Logo.png',
      'Puma': 'https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png',
      'Reebok': 'https://logos-world.net/wp-content/uploads/2020/04/Reebok-Logo.png',
      'ASICS': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="60" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="#ffffff">ASICS</text></svg>')}`,
      'Balenciaga': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40"><text x="80" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="normal" fill="#ffffff">BALENCIAGA</text></svg>')}`,
      'Golden Goose': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 40"><text x="90" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="normal" fill="#ffffff">GOLDEN GOOSE</text></svg>')}`,
      'Off-White': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40"><text x="70" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="#ffffff">OFF-WHITE</text></svg>')}`,
      'Gucci': 'https://logos-world.net/wp-content/uploads/2020/04/Gucci-Logo.png',
      'Saint Laurent': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 40"><text x="90" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="normal" fill="#ffffff">SAINT LAURENT</text></svg>')}`,
      'Common Projects': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40"><text x="100" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="normal" fill="#ffffff">COMMON PROJECTS</text></svg>')}`,
      'GOAT': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40"><text x="50" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" font-weight="bold" fill="#ffffff">GOAT</text></svg>')}`,
      'StockX': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="60" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="#00AC7C">StockX</text></svg>')}`,
      'Flight Club': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40"><text x="70" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#ffffff">FLIGHT CLUB</text></svg>')}`,
      'Stadium Goods': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40"><text x="80" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="#ffffff">STADIUM GOODS</text></svg>')}`,
      'Grailed': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="60" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="#ffffff">GRAILED</text></svg>')}`
    };

    return logos[brandName] || `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><rect width="120" height="40" fill="transparent"/><text x="60" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#ffffff">${brandName}</text></svg>`)}`;
  }

  // GSAP ScrollTrigger Animation Setup - same as HotRightNowSlider
  useEffect(() => {
    if (!sectionRef.current || !gridRef.current || !headingRef.current || isLoading || !featuredBrands.length) return;

    const ctx = gsap.context(() => {
      // Get brand logo elements once
      const logoItems = gridRef.current?.querySelectorAll('[data-brand-logo]');
      
      // Set initial states for brand logo elements
      if (logoItems) {
        gsap.set(logoItems, { opacity: 0, y: 50, scale: 0.8 });
      }

      // Header animation first (scrubbed to scroll)
      gsap.fromTo(headingRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "top top",
            scrub: true,
          }
        }
      );

      // Brand logos animation (delayed, only after significant scroll progress)
      if (logoItems) {
        gsap.fromTo(logoItems,
          {
            opacity: 0,
            y: 50,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: {
              amount: 1.2, // Total time to stagger all elements
              from: "start", // Start from first element
              ease: "power2.out"
            },
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center+=50vh", // Start only after header is animated AND 50vh of additional scrolling
              end: "+=50vh",
              scrub: false, // Don't scrub to allow proper staggering
              toggleActions: "play none none reverse"
            },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, featuredBrands]);

  // Show ALL brands organized in multiple rows to fit the grid
  const brandsPerRow = 4;
  const brandRows = [];
  for (let i = 0; i < featuredBrands.length; i += brandsPerRow) {
    brandRows.push(featuredBrands.slice(i, i + brandsPerRow));
  }

  return (
    <section id="brands" className="section" ref={sectionRef}>
      <div className="w-layout-blockcontainer container padding-4-5rem w-container">
        <div className="space-7rem"></div>
        
        {/* Section Header - same as HotRightNowSlider */}
        <div
          ref={headingRef}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.8] mb-6 text-white">
            <SplitText type="words" delay={0.2}>
              Iconic Brands
            </SplitText>
            <br />
            <GradientText className="block">
              We Work With
            </GradientText>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light">
            <SplitText type="words" delay={0.4}>
              Discover the most influential sneaker brands shaping culture and setting trends worldwide
            </SplitText>
          </p>
        </div>

        <div className="brands-wrapper" ref={gridRef}>
          {brandRows.map((row, rowIndex) => (
            <div key={rowIndex} className="brands-grid">
              {row.map((brand) => (
                <Link key={`row-${rowIndex}-${brand.id}`} href={`/catalog?brand=${brand.slug}`}>
                  <div className="logos-wrapper" data-brand-logo>
                    <img 
                      alt={`${brand.name} logo`}
                      src={brand.logoUrl}
                      loading="eager"
                      data-testid={`brand-logo-${brand.slug}`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `data:image/svg+xml,${encodeURIComponent(`
                          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40">
                            <rect width="120" height="40" fill="transparent"/>
                            <text x="60" y="25" font-family="Arial, sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">${brand.name}</text>
                          </svg>
                        `)}`;
                      }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="space-7rem"></div>
      </div>
    </section>
  );
}