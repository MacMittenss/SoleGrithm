import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" id="navbar">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="gradient-text text-2xl font-bold" data-text="SoleGrithm">
            SoleGrithm
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#products" className="text-gray-300 hover:text-white transition-colors">
              Products
            </a>
            <a href="#technology" className="text-gray-300 hover:text-white transition-colors">
              Technology
            </a>
            <a href="#awards" className="text-gray-300 hover:text-white transition-colors">
              Awards
            </a>
            <a href="#community" className="text-gray-300 hover:text-white transition-colors">
              Community
            </a>
            <button className="gradient-bg text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity">
              Order Now
            </button>
          </div>
          
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <a href="#products" className="text-gray-300 hover:text-white transition-colors">
                Products
              </a>
              <a href="#technology" className="text-gray-300 hover:text-white transition-colors">
                Technology
              </a>
              <a href="#awards" className="text-gray-300 hover:text-white transition-colors">
                Awards
              </a>
              <a href="#community" className="text-gray-300 hover:text-white transition-colors">
                Community
              </a>
              <button className="gradient-bg text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity w-fit">
                Order Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
