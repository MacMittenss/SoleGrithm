import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Camera, X, RotateCcw, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';
import ARSneakerViewer from '@/components/ARSneakerViewer';
import FootTrackingCamera, { type FootTrackingData } from '@/components/FootTrackingCamera';
import type { FootPosition3D } from '@/utils/landmarkTo3D';

interface Sneaker {
  id: string;
  name: string;
  brand: string;
  brandName?: string;
  images: string[];
  retailPrice: string;
  price?: number;
  colorway?: string;
  modelUrl?: string; // URL to 3D model (GLB format)
}

export default function ARTryOn() {
  // AR session state
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSneaker, setSelectedSneaker] = useState<Sneaker | null>(null);
  const [viewMode, setViewMode] = useState<'camera' | '3d'>('3d'); // Default to 3D view
  // Use local GLB model by default
  const [modelUrl, setModelUrl] = useState<string | null>('/models/Meshy_AI_Retro_Sneaker_Classic_0103210415_generate.glb');
  const [loadingModel, setLoadingModel] = useState(false);
  const [footLandmarks, setFootLandmarks] = useState<FootTrackingData | null>(null);
  const [footPositions3D, setFootPositions3D] = useState<{ left: FootPosition3D; right: FootPosition3D } | null>(null);

  // Handler for foot detection from MediaPipe
  const handleFootDetected = (data: FootTrackingData) => {
    setFootLandmarks(data);
    
    // Store 3D positions for rendering
    if (data.positions3D) {
      setFootPositions3D(data.positions3D);
      
      // Log the converted 3D positions
      console.log('3D Positions:', {
        left: {
          anchor: data.positions3D.left.anchor,
          rotation: data.positions3D.left.rotation * (180 / Math.PI), // Convert to degrees
          scale: data.positions3D.left.scale
        },
        right: {
          anchor: data.positions3D.right.anchor,
          rotation: data.positions3D.right.rotation * (180 / Math.PI),
          scale: data.positions3D.right.scale
        }
      });
    }
  };

  // Fetch sneakers from database
  const { data: sneakers = [], isLoading: sneakersLoading } = useQuery<Sneaker[]>({
    queryKey: ['/api/sneakers'],
  });

  // Fetch 3D model when a sneaker is selected
  const fetch3DModel = async (sneaker: Sneaker) => {
    setLoadingModel(true);
    setError(null);
    
    try {
      // First, try to use the local GLB model
      const localModelPath = '/models/Meshy_AI_Retro_Sneaker_Classic_0103210415_generate.glb';
      console.log('✅ Using local 3D model:', localModelPath);
      setModelUrl(localModelPath);
      setLoadingModel(false);
      return;
      
      // If sneaker has a specific model URL, use it
      if (sneaker.modelUrl) {
        console.log('✅ Using sneaker-specific 3D model URL:', sneaker.modelUrl);
        setModelUrl(sneaker.modelUrl || null);
        setLoadingModel(false);
        return;
      }
      
      console.log('🎨 No existing model, generating 3D model for sneaker:', sneaker.id);
      console.log('⏳ This may take a few minutes...');
      
      // Generate 3D model from sneaker image
      const createResponse = await fetch(`/api/meshy/sneaker/${sneaker.id}`, {
        method: 'POST',
      });
      
      if (!createResponse.ok) {
        throw new Error('Failed to create 3D model task');
      }
      
      const { id: taskId } = await createResponse.json();
      console.log('✅ Task created:', taskId);
      
      // Poll for completion (this will automatically upload to Firebase)
      const pollResponse = await fetch(
        `/api/meshy/task/${taskId}/poll?sneakerId=${sneaker.id}&uploadToFirebase=true`
      );
      
      if (!pollResponse.ok) {
        throw new Error('Failed to generate 3D model');
      }
      
      const result = await pollResponse.json();
      console.log('✅ 3D model ready:', result);
      
      // Use Firebase URL (permanent) over Meshy URL (temporary)
      const glbUrl = result.model_urls?.glb;
      
      if (glbUrl) {
        setModelUrl(glbUrl);
        console.log('🎉 Model URL set:', glbUrl);
      } else {
        throw new Error('No model URL returned');
      }
      
    } catch (err: any) {
      console.error('❌ 3D model error:', err);
      setError(`Failed to load 3D model: ${err.message}`);
    } finally {
      setLoadingModel(false);
    }
  };

  // Stop camera and AR session
  const stopCamera = () => {
    setIsActive(false);
    setFootLandmarks(null);
  };

  // Select a sneaker to try on
  const handleSneakerSelect = (sneaker: Sneaker) => {
    setSelectedSneaker(sneaker);
    setViewMode('3d'); // Switch to 3D view when selecting
    
    // Fetch 3D model for this sneaker (will use existing URL if available)
    fetch3DModel(sneaker);
  };

  useEffect(() => {
    // Clean up on unmount
    return () => {
      setIsActive(false);
    };
  }, []);

  // Auto-select first sneaker
  useEffect(() => {
    if (sneakers.length > 0 && !selectedSneaker) {
      setSelectedSneaker(sneakers[0]);
    }
  }, [sneakers, selectedSneaker]);

  return (
    <>
      <style>{`
        html, body, #root {
          background: #000 !important;
          min-height: 100vh !important;
          height: 100%;
          margin: 0;
          padding: 0;
        }
      `}</style>
      <main className="main" style={{ background: '#000', minHeight: '100vh', padding: 0, margin: 0 }}>
        
        {/* Hero Section with 3D/Camera View */}
        <section className="section hero background-black min-h-screen flex flex-col">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                AR Virtual Try-On
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Experience sneakers in stunning 3D or try them on your feet with live camera AR
              </p>
            </div>

            {/* Main AR View */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Side - Viewer (3D or Camera) */}
              <div className="lg:col-span-2">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
                  
                  {/* View Mode Toggle */}
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setViewMode('3d')}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        viewMode === '3d'
                          ? 'bg-white text-black'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      3D View
                    </button>
                    <button
                      onClick={() => {
                        setViewMode('camera');
                        if (!isActive) setIsActive(true);
                      }}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        viewMode === 'camera'
                          ? 'bg-white text-black'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <Camera className="w-4 h-4 inline mr-2" />
                      Live AR
                    </button>
                  </div>

                  {/* Viewer Container */}
                  <div className="relative bg-black rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    
                    {/* 3D View */}
                    {viewMode === '3d' && selectedSneaker && (
                      <div className="w-full h-full">
                        {loadingModel ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                              <Loader2 className="w-16 h-16 text-white animate-spin mx-auto mb-4" />
                              <p className="text-white text-lg">
                                {selectedSneaker.modelUrl ? 'Loading 3D Model...' : 'Generating 3D Model...'}
                              </p>
                              <p className="text-white/60 text-sm mt-2">
                                {selectedSneaker.modelUrl 
                                  ? 'Please wait while we load the model' 
                                  : 'This may take a few minutes (first time only)'}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <ARSneakerViewer 
                            modelUrl={modelUrl || undefined}
                            sneakerImage={selectedSneaker.images[0]} 
                            position={[0, 0, 0]}
                            rotation={[0, 0, 0]}
                            scale={1}
                          />
                        )}
                      </div>
                    )}

                    {/* Camera View with Foot Tracking */}
                    {viewMode === 'camera' && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        {isActive ? (
                          <>
                            <FootTrackingCamera 
                              isActive={isActive}
                              onFootDetected={handleFootDetected}
                              onStop={stopCamera}
                            />
                            
                            {/* AR Overlay with selected sneaker info */}
                            {selectedSneaker && (
                              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20 z-20">
                                <p className="text-white font-semibold text-sm">
                                  Trying: {selectedSneaker.name}
                                </p>
                              </div>
                            )}

                            {/* Foot tracking data display */}
                            {footLandmarks && footPositions3D && (
                              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-lg px-4 py-3 rounded-lg border border-white/20 text-white text-xs z-20 font-mono">
                                <div className="mb-2 text-green-400 font-bold">✓ Foot Tracking Active</div>
                                <div className="space-y-1">
                                  <div className="text-cyan-300 font-semibold">Left Foot:</div>
                                  <div className="pl-2 space-y-0.5">
                                    <div>X: {footPositions3D.left.anchor.x.toFixed(1)}</div>
                                    <div>Y: {footPositions3D.left.anchor.y.toFixed(1)}</div>
                                    <div>Z: {footPositions3D.left.anchor.z.toFixed(1)}</div>
                                    <div>Rotation: {(footPositions3D.left.rotation * 180 / Math.PI).toFixed(1)}°</div>
                                    <div>Scale: {footPositions3D.left.scale.toFixed(2)}</div>
                                  </div>
                                  <div className="text-cyan-300 font-semibold mt-2">Right Foot:</div>
                                  <div className="pl-2 space-y-0.5">
                                    <div>X: {footPositions3D.right.anchor.x.toFixed(1)}</div>
                                    <div>Y: {footPositions3D.right.anchor.y.toFixed(1)}</div>
                                    <div>Z: {footPositions3D.right.anchor.z.toFixed(1)}</div>
                                    <div>Rotation: {(footPositions3D.right.rotation * 180 / Math.PI).toFixed(1)}°</div>
                                    <div>Scale: {footPositions3D.right.scale.toFixed(2)}</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-4 p-8">
                            <Camera className="w-16 h-16 text-white/30" />
                            <p className="text-white/60 text-center">
                              Start camera to begin AR try-on experience with foot tracking
                            </p>
                            <button
                              onClick={() => setIsActive(true)}
                              disabled={loading}
                              className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                              {loading ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Starting Camera...
                                </>
                              ) : (
                                <>
                                  <Camera className="w-4 h-4" />
                                  Start Camera
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Loading State */}
                    {!selectedSneaker && sneakersLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Selected Sneaker Info */}
                  {selectedSneaker && (
                    <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-bold text-lg">{selectedSneaker.name}</h3>
                          <p className="text-white/60 text-sm">
                            {selectedSneaker.brandName || selectedSneaker.brand}
                            {selectedSneaker.colorway && ` • ${selectedSneaker.colorway}`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold text-xl">
                            ${selectedSneaker.price || selectedSneaker.retailPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Sneaker Selection */}
              <div className="lg:col-span-1">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                  <h2 className="text-white text-xl font-bold mb-4">Select Sneaker</h2>
                  
                  {sneakersLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                      {sneakers.map((sneaker) => (
                        <button
                          key={sneaker.id}
                          onClick={() => handleSneakerSelect(sneaker)}
                          className={`w-full text-left p-3 rounded-xl transition-all ${
                            selectedSneaker?.id === sneaker.id
                              ? 'bg-white text-black shadow-lg'
                              : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                        >
                          <div className="flex gap-3">
                            <img
                              src={sneaker.images[0]}
                              alt={sneaker.name}
                              className="w-16 h-16 object-cover rounded-lg bg-white"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm line-clamp-2">
                                {sneaker.name}
                              </h3>
                              <p className={`text-xs mt-1 ${
                                selectedSneaker?.id === sneaker.id ? 'text-black/60' : 'text-white/60'
                              }`}>
                                ${sneaker.price || sneaker.retailPrice}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* AR Tips */}
                <div className="mt-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                  <h3 className="text-white font-bold mb-3">Pro Tips</h3>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-white">•</span>
                      Use 3D View to inspect details from all angles
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white">•</span>
                      Live AR works best in well-lit environments
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white">•</span>
                      Point camera at your feet for realistic overlay
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white">•</span>
                      Rotate your device for different perspectives
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}