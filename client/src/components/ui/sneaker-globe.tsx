import { motion } from "framer-motion";
import { World } from "./globe";

interface SneakerGlobeProps {
  className?: string;
}

export default function SneakerGlobe({ className = "" }: SneakerGlobeProps) {
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
  );
}