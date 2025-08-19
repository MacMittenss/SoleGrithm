import { useState, useEffect } from "react";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`preloader ${!isVisible ? 'hide' : ''}`} id="preloader">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Simulated video background placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end opacity-20"></div>
        <div className="text-center z-10">
          <div className="gradient-text text-6xl font-bold mb-4" data-text="SoleGrithm">
            SoleGrithm
          </div>
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full gradient-bg animate-pulse rounded-full" style={{ width: '100%' }}></div>
          </div>
          <p className="text-gray-400 mt-4">Loading Experience...</p>
        </div>
      </div>
    </div>
  );
}
