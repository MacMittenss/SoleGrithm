import React, { useRef, useEffect, useState } from 'react';
import { Camera as CameraIcon, X, Loader2 } from 'lucide-react';
import { calculateBothFeetPositions, type FootPosition3D } from '@/utils/landmarkTo3D';

// Type declarations for MediaPipe
type Results = any;
type Pose = any;
type MediaPipeCamera = any;

export interface FootTrackingData {
  leftFoot: {
    ankle: any;
    heel: any;
    toe: any;
    index: any;
  };
  rightFoot: {
    ankle: any;
    heel: any;
    toe: any;
    index: any;
  };
  allLandmarks: any[];
  // 3D positions for rendering
  positions3D?: {
    left: FootPosition3D;
    right: FootPosition3D;
  };
}

interface FootTrackingCameraProps {
  onFootDetected?: (data: FootTrackingData) => void;
  isActive: boolean;
  onStop: () => void;
}

export default function FootTrackingCamera({ 
  onFootDetected, 
  isActive, 
  onStop 
}: FootTrackingCameraProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const poseRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const animationRef = useRef<number | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [footDetected, setFootDetected] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const initializeCamera = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if getUserMedia is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera not supported in this browser or connection is not secure (requires HTTPS)');
        }

        // Get camera access
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setLoading(false);
        }

      } catch (err: any) {
        console.error('Camera error:', err);
        
        if (err.name === 'NotAllowedError') {
          setError('Camera permission denied. Please allow camera access and try again.');
        } else if (err.name === 'NotFoundError') {
          setError('No camera found on this device.');
        } else if (err.name === 'NotReadableError') {
          setError('Camera is being used by another application.');
        } else {
          setError(`Unable to access camera: ${err.message}`);
        }
        setLoading(false);
      }
    };

    initializeCamera();

    // Cleanup
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
      if (poseRef.current) {
        poseRef.current.close();
      }
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive || loading || error) return;
    if (!videoRef.current || !canvasRef.current) return;

    const initMediaPipe = async () => {
      try {
        setLoading(true);
        
        console.log('Setting up Module object...');
        // Ensure Module object is properly set up
        const windowModule = (window as any).Module || {};
        windowModule.arguments = windowModule.arguments || [];
        windowModule.locateFile = windowModule.locateFile || ((path: string) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5/${path}`;
        });
        (window as any).Module = windowModule;
        
        // Use a simpler approach without MediaPipe Camera utility
        // Just use MediaPipe Pose with manual frame processing
        const { Pose } = await import('@mediapipe/pose');
        
        console.log('Initializing Pose...');
        const pose = new Pose({
          locateFile: (file: string) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5/${file}`;
          }
        });

        await pose.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          enableSegmentation: false,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });
        console.log('Pose initialized');

        pose.onResults((results: any) => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (results.poseLandmarks && results.poseLandmarks.length > 0) {
            // Draw simple landmarks for feet
            const footIndices = [27, 28, 29, 30, 31, 32];
            const footPoints = footIndices
              .map(idx => results.poseLandmarks[idx])
              .filter(Boolean);

            if (footPoints.length > 0) {
              setFootDetected(true);
              
              // Draw foot points
              footPoints.forEach(point => {
                ctx.beginPath();
                ctx.arc(point.x * canvas.width, point.y * canvas.height, 6, 0, 2 * Math.PI);
                ctx.fillStyle = '#00ff00';
                ctx.fill();
              });

              // Extract and send foot data
              const leftFoot = {
                ankle: results.poseLandmarks[27],
                heel: results.poseLandmarks[27],
                toe: results.poseLandmarks[31],
                index: results.poseLandmarks[31]
              };

              const rightFoot = {
                ankle: results.poseLandmarks[28],
                heel: results.poseLandmarks[28],
                toe: results.poseLandmarks[32],
                index: results.poseLandmarks[32]
              };

              const positions3D = calculateBothFeetPositions(
                { ankle: leftFoot.ankle, toe: leftFoot.toe },
                { ankle: rightFoot.ankle, toe: rightFoot.toe },
                canvas.width,
                canvas.height
              );

              if (onFootDetected) {
                onFootDetected({
                  leftFoot,
                  rightFoot,
                  allLandmarks: results.poseLandmarks,
                  positions3D
                });
              }
            } else {
              setFootDetected(false);
            }
          }
        });

        poseRef.current = pose;

        // Manual frame processing loop
        const processFrame = async () => {
          if (videoRef.current && poseRef.current && videoRef.current.readyState === 4) {
            try {
              await poseRef.current.send({ image: videoRef.current });
            } catch (err) {
              console.error('Error processing frame:', err);
            }
          }
          animationRef.current = requestAnimationFrame(processFrame);
        };

        processFrame();
        setLoading(false);
      } catch (err: any) {
        console.error('MediaPipe initialization error:', err);
        setError(`Failed to initialize pose tracking: ${err.message}`);
        setLoading(false);
      }
    };

    initMediaPipe();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (poseRef.current) {
        poseRef.current.close();
      }
    };
  }, [isActive, loading, error, onFootDetected]);

  // Update canvas size when video loads
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;

    const updateCanvasSize = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    };

    video.addEventListener('loadedmetadata', updateCanvasSize);
    
    return () => {
      video.removeEventListener('loadedmetadata', updateCanvasSize);
    };
  }, []);

  if (!isActive) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-white animate-spin mx-auto mb-4" />
            <p className="text-white text-lg">Initializing Camera...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-center p-8">
            <CameraIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-red-500 text-lg mb-4">{error}</p>
          </div>
        </div>
      )}

      {/* Video element (hidden, used for processing) */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />

      {/* Canvas overlay for drawing tracking points */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      {/* Status indicator */}
      {!loading && !error && (
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${footDetected ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
            <p className="text-white text-sm font-semibold">
              {footDetected ? 'Foot Detected' : 'Looking for feet...'}
            </p>
          </div>
        </div>
      )}

      {/* Stop button */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={onStop}
          className="p-3 bg-red-500/90 hover:bg-red-600 text-white rounded-full transition-all shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Instructions */}
      {!loading && !error && !footDetected && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20 max-w-md">
          <p className="text-white text-center text-sm">
            Point your camera at your feet. Stand on a flat surface for best results.
          </p>
        </div>
      )}
    </div>
  );
}
