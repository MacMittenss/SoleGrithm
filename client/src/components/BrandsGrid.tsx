import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';

interface Brand {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  createdAt: Date;
}

export default function BrandsGrid() {
  const { data: brands, isLoading } = useQuery<Brand[]>({
    queryKey: ['/api/brands'],
    refetchOnWindowFocus: false,
  });

  // Animation variants for the grid items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (isLoading) {
    return (
      <section id="brands" className="section">
        <div className="w-layout-blockcontainer container padding-4-5rem w-container">
          <div className="space-7rem"></div>
          <div className="brands-wrapper">
            <div className="brands-grid">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="logos-wrapper">
                  <div className="w-20 h-20 bg-gray-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-7rem"></div>
        </div>
      </section>
    );
  }

  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <section id="brands" className="section" data-testid="brands-grid">
      <div className="w-layout-blockcontainer container padding-4-5rem w-container">
        <div className="space-7rem"></div>
        <div className="brands-wrapper">
          <motion.div 
            className="brands-grid slide-up-animation"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {brands.map((brand) => (
              <motion.div 
                key={brand.id} 
                className="logos-wrapper"
                variants={itemVariants}
                data-testid={`brand-logo-${brand.slug}`}
              >
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      // Fallback to brand name if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'brand-text text-center';
                      fallback.textContent = brand.name;
                      target.parentNode?.appendChild(fallback);
                    }}
                  />
                ) : (
                  <div className="brand-text text-center" data-testid={`brand-text-${brand.slug}`}>
                    {brand.name}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="space-7rem"></div>
      </div>
    </section>
  );
}