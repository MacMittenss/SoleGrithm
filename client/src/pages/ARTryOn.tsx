import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Video, 
  VideoOff,
  RotateCcw,
  Download,
  Share2,
  Smartphone,
  Eye,
  Zap,
  Target,
  Sparkles,
  PlayCircle,
  PauseCircle,
  RefreshCw,
  Settings,
  Info
} from 'lucide-react';
import SneakerCard from '@/components/SneakerCard';

interface ARSession {
  isActive: boolean;
  selectedSneaker: any | null;
  cameraStream: MediaStream | null;
  isRecording: boolean;
}

export default function ARTryOn() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [arSession, setArSession] = useState<ARSession>({
    isActive: false,
    selectedSneaker: null,
    cameraStream: null,
    isRecording: false
  });
  const [selectedSneakerId, setSelectedSneakerId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch sneakers for try-on
  const { data: sneakers } = useQuery({
    queryKey: ['/api/sneakers/ar-compatible'],
    queryFn: async () => {
      const response = await fetch('/api/sneakers/featured');
      if (!response.ok) throw new Error('Failed to fetch sneakers');
      return response.json();
    }
  });

  // Initialize camera
  const initializeCamera = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Use back camera on mobile
        },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setArSession(prev => ({
        ...prev,
        isActive: true,
        cameraStream: stream
      }));
    } catch (err) {
      setError('Unable to access camera. Please check permissions.');
      console.error('Camera error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (arSession.cameraStream) {
      arSession.cameraStream.getTracks().forEach(track => track.stop());
    }
    setArSession(prev => ({
      ...prev,
      isActive: false,
      cameraStream: null,
      isRecording: false
    }));
  };

  // Select sneaker for try-on
  const selectSneaker = (sneaker: any) => {
    setArSession(prev => ({
      ...prev,
      selectedSneaker: sneaker
    }));
    setSelectedSneakerId(sneaker.id.toString());
  };

  // Simulate AR overlay rendering
  useEffect(() => {
    if (arSession.isActive && arSession.selectedSneaker && videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const video = videoRef.current;

      const renderFrame = () => {
        if (ctx && video.videoWidth > 0) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          // Draw video frame
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Simulate foot detection and sneaker overlay
          const footX = canvas.width * 0.5;
          const footY = canvas.height * 0.8;
          const sneakerWidth = 200;
          const sneakerHeight = 100;
          
          // Draw sneaker overlay (simplified)
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fillRect(footX - sneakerWidth/2, footY - sneakerHeight/2, sneakerWidth, sneakerHeight);
          
          // Add sneaker details
          ctx.fillStyle = '#000';
          ctx.font = '16px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(arSession.selectedSneaker.name, footX, footY - 10);
          ctx.fillText(`$${arSession.selectedSneaker.retailPrice}`, footX, footY + 10);
          
          // Draw tracking indicators
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 2;
          ctx.strokeRect(footX - sneakerWidth/2 - 10, footY - sneakerHeight/2 - 10, sneakerWidth + 20, sneakerHeight + 20);
          
          // Add confidence indicator
          const confidence = 85 + Math.random() * 10; // Simulate detection confidence
          ctx.fillStyle = '#10b981';
          ctx.font = '12px Arial';
          ctx.textAlign = 'left';
          ctx.fillText(`Tracking: ${confidence.toFixed(1)}%`, 20, 30);
        }
        
        if (arSession.isActive) {
          requestAnimationFrame(renderFrame);
        }
      };
      
      renderFrame();
    }
  }, [arSession.isActive, arSession.selectedSneaker]);

  // Take screenshot
  const takeScreenshot = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `ar-tryson-${arSession.selectedSneaker?.name || 'sneaker'}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  // Check device compatibility
  const isCompatible = 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;

  if (!isCompatible) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Device Not Compatible</h1>
          <p className="text-muted-foreground">
            AR Try-On requires a device with camera access. Please use a modern smartphone or tablet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-4">
            <Eye className="w-4 h-4 mr-2" />
            Augmented Reality
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            AR Try-On Experience
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how sneakers look on your feet before you buy. Use your camera to virtually 
            try on any sneaker with real-time AR fitting technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* AR Camera View */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  AR Camera View
                  {arSession.selectedSneaker && (
                    <Badge variant="secondary" className="ml-2">
                      {arSession.selectedSneaker.name}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                  {arSession.isActive ? (
                    <>
                      <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        playsInline
                        muted
                      />
                      <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      
                      {/* AR Controls Overlay */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <div className="bg-black/50 rounded-lg px-3 py-2">
                          <div className="flex items-center gap-2 text-white text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            AR Active
                          </div>
                        </div>
                        
                        {arSession.selectedSneaker && (
                          <div className="bg-black/50 rounded-lg px-3 py-2">
                            <div className="text-white text-sm">
                              Tracking: <span className="text-green-400">Excellent</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Bottom Controls */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={takeScreenshot}
                          disabled={!arSession.selectedSneaker}
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Capture
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {/* Reset position */}}
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Reset
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-white">
                        <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium mb-2">Camera Not Active</h3>
                        <p className="text-sm opacity-75 mb-4">
                          Start your AR session to begin trying on sneakers
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Camera Controls */}
                <div className="flex justify-center gap-4">
                  {!arSession.isActive ? (
                    <Button 
                      onClick={initializeCamera}
                      disabled={isLoading}
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Starting Camera...
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Start AR Session
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button 
                      onClick={stopCamera}
                      variant="outline"
                      size="lg"
                    >
                      <PauseCircle className="w-4 h-4 mr-2" />
                      Stop Session
                    </Button>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-red-700">
                      <Info className="w-4 h-4" />
                      <span className="text-sm font-medium">{error}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sneaker Selection */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Select Sneaker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {sneakers?.slice(0, 6).map((sneaker: any) => (
                    <div 
                      key={sneaker.id}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedSneakerId === sneaker.id.toString()
                          ? 'border-primary bg-primary/5'
                          : 'border-muted hover:border-muted-foreground/50'
                      }`}
                      onClick={() => selectSneaker(sneaker)}
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={sneaker.imageUrl || `https://images.unsplash.com/photo-1549298916-b41d501d3772?w=60&h=60&fit=crop`}
                          alt={sneaker.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {sneaker.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ${sneaker.retailPrice}
                          </div>
                        </div>
                        {selectedSneakerId === sneaker.id.toString() && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {!arSession.selectedSneaker && (
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg text-center">
                    <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Select a sneaker to start your AR try-on experience
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AR Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5" />
                  AR Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Good Lighting</div>
                      <div className="text-muted-foreground">Use natural light for best tracking</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Point Down</div>
                      <div className="text-muted-foreground">Aim camera at your feet</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Stay Still</div>
                      <div className="text-muted-foreground">Keep feet steady for best results</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}