import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface EarthProps {
  width?: number;
  height?: number;
  showControls?: boolean;
}

function EarthSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Auto-rotate the earth
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 32]}>
      <meshPhongMaterial
        color="#2563eb"
        shininess={100}
        transparent
        opacity={0.9}
      />
      {/* Globe wireframe overlay */}
      <Sphere args={[2.01, 32, 16]}>
        <meshBasicMaterial
          color="#60a5fa"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>
    </Sphere>
  );
}

function Earth({ width = 300, height = 300, showControls = true }: EarthProps) {
  return (
    <div style={{ width, height, margin: '0 auto' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        
        <EarthSphere />
        
        {showControls && (
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate={false}
            minDistance={4}
            maxDistance={10}
          />
        )}
      </Canvas>
    </div>
  );
}

export default Earth;