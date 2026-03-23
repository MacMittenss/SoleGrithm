import React, { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

interface ARSneakerViewerProps {
  sneakerImage?: string;
  modelUrl?: string; // GLB model URL from Firebase
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

// 3D Model Loader Component
function GLBModel({ modelUrl, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: { 
  modelUrl: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the GLB model with error handling
  let scene;
  try {
    const gltf = useGLTF(modelUrl);
    scene = gltf.scene;
  } catch (error) {
    console.error('Error loading GLB model:', error);
    return (
      <Html center>
        <div style={{
          color: 'white',
          background: 'rgba(220, 38, 38, 0.9)',
          padding: '20px',
          borderRadius: '8px',
          fontFamily: 'system-ui'
        }}>
          Failed to load 3D model
        </div>
      </Html>
    );
  }
  
  // Clone the scene to avoid issues with multiple instances
  const clonedScene = React.useMemo(() => {
    if (!scene) return new THREE.Group();
    return scene.clone();
  }, [scene]);
  
  // Smooth rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  
  // Enable shadows on all meshes
  React.useEffect(() => {
    if (!clonedScene) return;
    
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Ensure geometry is properly set up
        if (child.geometry) {
          try {
            child.geometry.computeBoundingSphere();
            child.geometry.computeBoundingBox();
          } catch (e) {
            console.warn('Error computing geometry bounds:', e);
          }
        }
      }
    });
  }, [clonedScene]);
  
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        <primitive object={clonedScene} dispose={null} />
      </group>
    </Float>
  );
}

// Fallback Placeholder Model (using image texture)
function PlaceholderModel({ sneakerImage, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: ARSneakerViewerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = sneakerImage ? new THREE.TextureLoader().load(sneakerImage) : null;
  
  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
  }
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });
  
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={position} rotation={[0.1, 0.3, 0]} scale={scale}>
        {/* Simple box with texture as placeholder */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 1.5, 3]} />
          <meshStandardMaterial 
            map={texture}
            roughness={0.4}
            metalness={0.05}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Loading Indicator
function LoadingIndicator() {
  return (
    <Html center>
      <div style={{
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '20px 40px',
        borderRadius: '12px',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '20px',
          height: '20px',
          border: '3px solid rgba(255, 255, 255, 0.3)',
          borderTop: '3px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <span>Loading 3D Model...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </Html>
  );
}

// Main AR Viewer Component
export default function ARSneakerViewer({ 
  sneakerImage, 
  modelUrl, 
  position, 
  rotation, 
  scale = 1 
}: ARSneakerViewerProps) {
  const [error, setError] = useState<string | null>(null);

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', position: 'relative' }}>
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 50 }}>
        
        {/* Enhanced Lighting for product photography look */}
        <ambientLight intensity={0.4} />
        
        {/* Key light */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.2} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Fill light */}
        <directionalLight 
          position={[-3, 3, -3]} 
          intensity={0.5} 
        />
        
        {/* Rim light for depth */}
        <spotLight 
          position={[0, 5, -5]} 
          intensity={0.8} 
          angle={0.6} 
          penumbra={1}
          castShadow
        />
        
        {/* Studio environment */}
        <Environment preset="studio" />
        
        {/* 3D Model or Placeholder */}
        <Suspense fallback={<LoadingIndicator />}>
          {modelUrl ? (
            <GLBModel 
              modelUrl={modelUrl}
              position={position} 
              rotation={rotation}
              scale={scale}
            />
          ) : sneakerImage ? (
            <PlaceholderModel 
              sneakerImage={sneakerImage}
              position={position} 
              rotation={rotation}
              scale={scale}
            />
          ) : (
            <Html center>
              <div style={{
                color: 'white',
                background: 'rgba(0,0,0,0.8)',
                padding: '20px',
                borderRadius: '8px',
                fontFamily: 'system-ui'
              }}>
                No model or image available
              </div>
            </Html>
          )}
        </Suspense>
        
        {/* Soft contact shadows */}
        <Suspense fallback={null}>
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.25} 
            scale={10} 
            blur={2.5} 
            far={4}
            resolution={512}
            frames={1}
          />
        </Suspense>
        
        {/* Interactive controls */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={false}
        />
      </Canvas>
      
      {error && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(220, 38, 38, 0.9)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontFamily: 'system-ui',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}
    </div>
  );
}
