import { useState } from "react";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
}

function FilterSection({ title, children, isExpanded = false, onToggle }: FilterSectionProps) {
  return (
    <div className="mb-9">
      <div
        className="flex items-center justify-between cursor-pointer mb-4"
        onClick={onToggle}
      >
        <h3 className="text-black font-beatrice-deck text-sm font-bold tracking-wider uppercase">
          {title}
        </h3>
        {onToggle && (
          <svg
            width="7"
            height="11"
            viewBox="0 0 7 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-2 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
          >
            <path
              d="M1 10L6 5.5L1 1"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {isExpanded && children}
    </div>
  );
}

function AvailabilitySection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border border-gray-400 bg-white"></div>
        <span className="text-black font-beatrice-deck text-xs font-bold tracking-wider">
          Availability{" "}
          <span className="text-blue-800">(450)</span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border border-gray-400 bg-white"></div>
        <span className="text-black font-beatrice-deck text-xs font-bold tracking-wider">
          Out Of Stock{" "}
          <span className="text-blue-800">(18)</span>
        </span>
      </div>
    </div>
  );
}

export default function CatalogFilters() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    availability: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2X'];

  return (
    <div className="w-[266px] flex-shrink-0 pr-10">
      <h2 className="text-black font-beatrice-deck text-base font-bold tracking-wider uppercase mb-12">
        Filters
      </h2>

      {/* Size Filter */}
      <div className="mb-9">
        <h3 className="text-black font-beatrice-deck text-sm font-bold tracking-wider uppercase mb-4">
          Size
        </h3>
        <div className="flex flex-wrap gap-1">
          {sizes.map((size) => (
            <button
              key={size}
              className="w-10 h-10 border border-gray-400 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <span className="text-black font-beatrice-deck text-sm font-medium">
                {size}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <FilterSection
        title="Availability"
        isExpanded={expandedSections.availability}
        onToggle={() => toggleSection('availability')}
      >
        <AvailabilitySection />
      </FilterSection>

      {/* Category Filter */}
      <FilterSection
        title="Category"
        isExpanded={expandedSections.category}
        onToggle={() => toggleSection('category')}
      >
        <div className="space-y-3">
          {['Basketball', 'Running', 'Lifestyle', 'Training'].map((category) => (
            <div key={category} className="flex items-center gap-3">
              <div className="w-6 h-6 border border-gray-400 bg-white"></div>
              <span className="text-black font-beatrice-deck text-xs font-bold tracking-wider">
                {category}
              </span>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Colors Filter */}
      <FilterSection
        title="Colors"
        isExpanded={expandedSections.colors}
        onToggle={() => toggleSection('colors')}
      >
        <div className="flex flex-wrap gap-2">
          {['#000000', '#ffffff', '#ff0000', '#0000ff', '#00ff00', '#ffff00'].map((color) => (
            <button
              key={color}
              className="w-8 h-8 border border-gray-400 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection
        title="Price Range"
        isExpanded={expandedSections.priceRange}
        onToggle={() => toggleSection('priceRange')}
      >
        <div className="space-y-3">
          {['Under $100', '$100 - $200', '$200 - $300', 'Over $300'].map((range) => (
            <div key={range} className="flex items-center gap-3">
              <div className="w-6 h-6 border border-gray-400 bg-white"></div>
              <span className="text-black font-beatrice-deck text-xs font-bold tracking-wider">
                {range}
              </span>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Collections Filter */}
      <FilterSection
        title="Collections"
        isExpanded={expandedSections.collections}
        onToggle={() => toggleSection('collections')}
      >
        <div className="space-y-3">
          {['Air Jordan', 'Yeezy', 'Nike SB', 'Retro'].map((collection) => (
            <div key={collection} className="flex items-center gap-3">
              <div className="w-6 h-6 border border-gray-400 bg-white"></div>
              <span className="text-black font-beatrice-deck text-xs font-bold tracking-wider">
                {collection}
              </span>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Tags Filter */}
      <FilterSection
        title="Tags"
        isExpanded={expandedSections.tags}
        onToggle={() => toggleSection('tags')}
      >
        <div className="space-y-3">
          {['Limited Edition', 'Retro', 'New Release', 'Popular'].map((tag) => (
            <div key={tag} className="flex items-center gap-3">
              <div className="w-6 h-6 border border-gray-400 bg-white"></div>
              <span className="text-black font-beatrice-deck text-xs font-bold tracking-wider">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Ratings Filter */}
      <FilterSection
        title="Ratings"
        isExpanded={expandedSections.ratings}
        onToggle={() => toggleSection('ratings')}
      >
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-3">
              <div className="w-6 h-6 border border-gray-400 bg-white"></div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
                <span className="text-black font-beatrice-deck text-xs font-bold tracking-wider ml-2">
                  & Up
                </span>
              </div>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}