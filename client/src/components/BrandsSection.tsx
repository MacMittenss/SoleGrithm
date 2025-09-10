import { useMemo } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

export default function BrandsSection() {
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

  // Show first 8 brands in 2 rows of 4 to match original layout
  const displayBrands = featuredBrands.slice(0, 8);
  const firstRow = displayBrands.slice(0, 4);
  const secondRow = displayBrands.slice(4, 8);

  return (
    <section id="brands" className="section">
      <div className="w-layout-blockcontainer container padding-4-5rem w-container">
        <div className="space-7rem"></div>
        <div className="brands-wrapper">
          <div className="brands-grid">
            {firstRow.map((brand) => (
              <Link key={`first-${brand.id}`} href={`/catalog?brand=${brand.slug}`}>
                <div className="logos-wrapper">
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
          <div className="brands-grid">
            {secondRow.map((brand) => (
              <Link key={`second-${brand.id}`} href={`/catalog?brand=${brand.slug}`}>
                <div className="logos-wrapper">
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
        </div>
        <div className="space-7rem"></div>
      </div>
    </section>
  );
}