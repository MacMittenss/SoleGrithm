import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { World } from "./globe";

interface SneakerGlobeProps {
  className?: string;
}

// Enhanced WebGL detection function
function isWebGLSupported() {
  // Check if running in a browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }
  
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!context) {
      return false;
    }
    
    // Test if context is usable
    const gl = context as WebGLRenderingContext;
    const renderer = gl.getParameter(gl.RENDERER);
    
    // Check for software rendering or headless environments
    if (renderer && (renderer.includes('Software') || renderer.includes('SwiftShader'))) {
      return false;
    }
    
    return true;
  } catch (e) {
    return false;
  }
}

// Simple error catching wrapper
function SafeWebGLWrapper({ children, fallback }: { children: any; fallback: any }) {
  try {
    return <>{children}</>;
  } catch (error) {
    console.log('WebGL Error caught:', error);
    return <>{fallback}</>;
  }
}

// Fallback globe component
function FallbackGlobe({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-slate-900 to-slate-700 border border-slate-600 shadow-2xl">
        {/* Globe appearance */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-900/20 to-emerald-900/20 border border-white/10" />
        
        {/* City markers */}
        <div className="absolute top-16 left-20 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
        <div className="absolute top-24 right-16 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-16 w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
        <div className="absolute bottom-16 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-400 rounded-full animate-pulse" />
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-40">
          <path d="M80 64 Q160 120 240 96" stroke="rgba(16, 185, 129, 0.6)" strokeWidth="2" fill="none" strokeDasharray="4,4" />
          <path d="M240 96 Q200 160 320 240" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" fill="none" strokeDasharray="4,4" />
          <path d="M64 240 Q160 200 320 240" stroke="rgba(251, 146, 60, 0.6)" strokeWidth="2" fill="none" strokeDasharray="4,4" />
        </svg>
        
        {/* Labels */}
        <div className="absolute top-12 left-16 text-xs text-white font-medium">NYC</div>
        <div className="absolute top-20 right-12 text-xs text-white font-medium">LA</div>
        <div className="absolute bottom-12 left-12 text-xs text-white font-medium">MIA</div>
        <div className="absolute bottom-12 right-16 text-xs text-white font-medium">CHI</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-8 text-xs text-white font-medium">ATL</div>
        
        {/* Rotating animation */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s' }}>
          <div className="absolute top-8 left-1/2 w-1 h-1 bg-white/30 rounded-full" />
          <div className="absolute bottom-8 left-1/2 w-1 h-1 bg-white/30 rounded-full" />
        </div>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-white/60 text-center">
          Global Sneaker Trends
        </div>
      </div>
    </div>
  );
}

export default function SneakerGlobe({ className = "" }: SneakerGlobeProps) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check WebGL support on mount
    setWebglSupported(isWebGLSupported());
  }, []);

  // Show loading state while checking WebGL support
  if (webglSupported === null) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
        <div className="w-80 h-80 rounded-full bg-slate-900/50 border border-slate-600 animate-pulse flex items-center justify-center">
          <div className="text-white/60 text-sm">Loading Globe...</div>
        </div>
      </div>
    );
  }

  // Use fallback globe if WebGL is not supported
  if (!webglSupported) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full h-full"
      >
        <FallbackGlobe className={className} />
      </motion.div>
    );
  }

  // Use 3D globe with error boundary if WebGL is supported
  const fallbackComponent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="w-full h-full"
    >
      <FallbackGlobe className={className} />
    </motion.div>
  );

  const globeConfig = {
    pointSize: 4,
    globeColor: "#1a1a2e",
    showAtmosphere: true,
    atmosphereColor: "#16a085",
    atmosphereAltitude: 0.1,
    emissive: "#1a1a2e",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.1)",
    ambientLight: "#16a085",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 3000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 40.7128, lng: -74.006 }, // Start at NYC
    autoRotate: true,
    autoRotateSpeed: 0.3,
  };

  // Sneaker trend connections between major cities
  const sneakerArcs = [
    {
      order: 1,
      startLat: 40.7128,
      startLng: -74.006,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.3,
      color: "#16a085",
    },
    {
      order: 2,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 41.8781,
      endLng: -87.6298,
      arcAlt: 0.2,
      color: "#e74c3c",
    },
    {
      order: 3,
      startLat: 41.8781,
      startLng: -87.6298,
      endLat: 29.7604,
      endLng: -95.3698,
      arcAlt: 0.25,
      color: "#f39c12",
    },
    {
      order: 4,
      startLat: 29.7604,
      startLng: -95.3698,
      endLat: 25.7617,
      endLng: -80.1918,
      arcAlt: 0.15,
      color: "#9b59b6",
    },
    {
      order: 5,
      startLat: 25.7617,
      startLng: -80.1918,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.2,
      color: "#3498db",
    },
    // International connections
    {
      order: 6,
      startLat: 40.7128,
      startLng: -74.006,
      endLat: 51.5074,
      endLng: -0.1278,
      arcAlt: 0.5,
      color: "#16a085",
    },
    {
      order: 7,
      startLat: 51.5074,
      startLng: -0.1278,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.7,
      color: "#e74c3c",
    },
    {
      order: 8,
      startLat: 35.6762,
      startLng: 139.6503,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.6,
      color: "#f39c12",
    },
  ];

  return (
    <SafeWebGLWrapper fallback={fallbackComponent}>
      <div className={`relative w-full h-full ${className}`}>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="w-full h-full"
        >
          <World data={sneakerArcs} globeConfig={globeConfig} />
        </motion.div>
      </div>
    </SafeWebGLWrapper>
  );
}