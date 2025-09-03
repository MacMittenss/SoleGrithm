import CatalogHeader from "../components/CatalogHeader";
import CatalogFilters from "../components/CatalogFilters";
import CatalogProductGrid from "../components/CatalogProductGrid";

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Background Texture Overlay */}
      <div 
        className="absolute inset-0 w-full h-full opacity-30 mix-blend-soft-light"
        style={{
          backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/9701428950dde47ae49b6aabe6b53c89bc8b7882?width=2598')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      {/* Main Content */}
      <div className="relative z-10">
        <CatalogHeader />
        
        {/* Main Layout */}
        <div className="flex gap-10 px-6 md:px-12 lg:px-12">
          {/* Filters Sidebar - Hidden on mobile */}
          <div className="hidden lg:block">
            <CatalogFilters />
          </div>
          
          {/* Product Grid */}
          <CatalogProductGrid />
        </div>
      </div>
    </div>
  );
}