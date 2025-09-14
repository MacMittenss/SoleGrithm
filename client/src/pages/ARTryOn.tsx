import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
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
  Info,
  ArrowLeft,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipForward,
  SkipBack
} from 'lucide-react';
import SneakerCard from '@/components/SneakerCard';

interface ARSession {
  isActive: boolean;
  selectedSneaker: any | null;
  cameraStream: MediaStream | null;
  isRecording: boolean;
  overlayOpacity: number;
  trackingQuality: 'high' | 'medium' | 'low';
  isFullscreen: boolean;
  isMuted: boolean;
}

interface ARControls {
  rotation: number;
  scale: number;
  position: { x: number; y: number };
  brightness: number;
  contrast: number;
  autoTracking: boolean;
  footDetection: boolean;
}

export default function ARTryOn() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [arSession, setArSession] = useState<ARSession>({
    isActive: false,
    selectedSneaker: null,
    cameraStream: null,
    isRecording: false,
    overlayOpacity: 80,
    trackingQuality: 'high',
    isFullscreen: false,
    isMuted: false
  });
  const [arControls, setArControls] = useState<ARControls>({
    rotation: 0,
    scale: 100,
    position: { x: 0, y: 0 },
    brightness: 100,
    contrast: 100,
    autoTracking: true,
    footDetection: true
  });
  const [selectedSneakerId, setSelectedSneakerId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvancedControls, setShowAdvancedControls] = useState(false);

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
      
      // Initialize enhanced AR rendering
      initializeAROverlay();
    } catch (err) {
      setError('Unable to access camera. Please check permissions and try again.');
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

  // Enhanced AR overlay initialization
  const initializeAROverlay = () => {
    if (!canvasRef.current || !videoRef.current) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    const renderARFrame = () => {
      if (!arSession.isActive) return;
      
      // Set canvas size to match video
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      
      // Apply brightness and contrast adjustments
      ctx.filter = `brightness(${arControls.brightness}%) contrast(${arControls.contrast}%)`;
      
      // Draw video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Reset filter for overlay
      ctx.filter = 'none';
      
      // Draw AR sneaker overlay if selected
      if (arSession.selectedSneaker) {
        drawEnhancedAROverlay(ctx, canvas.width, canvas.height);
      }
      
      requestAnimationFrame(renderARFrame);
    };
    
    requestAnimationFrame(renderARFrame);
  };

  // Enhanced AR sneaker overlay rendering
  const drawEnhancedAROverlay = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!arSession.selectedSneaker) return;
    
    // Calculate foot position with tracking
    const baseFootX = width * 0.5;
    const baseFootY = height * 0.75;
    const footX = baseFootX + arControls.position.x;
    const footY = baseFootY + arControls.position.y;
    
    const sneakerWidth = 180 * (arControls.scale / 100);
    const sneakerHeight = 100 * (arControls.scale / 100);
    
    ctx.save();
    ctx.translate(footX, footY);
    ctx.rotate((arControls.rotation * Math.PI) / 180);
    ctx.globalAlpha = arSession.overlayOpacity / 100;
    
    // Enhanced sneaker visualization
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, sneakerWidth/2);
    gradient.addColorStop(0, '#FF6B35');
    gradient.addColorStop(0.6, '#F7931E');
    gradient.addColorStop(1, '#C73E1D');
    
    // Main sneaker body
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(0, 0, sneakerWidth/2, sneakerHeight/2, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Sneaker sole
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.ellipse(0, sneakerHeight/3, sneakerWidth/2.2, sneakerHeight/6, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Sneaker details
    ctx.strokeStyle = '#2C3E50';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, sneakerWidth/2, sneakerHeight/2, 0, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Brand/model text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(arSession.selectedSneaker.brand || 'SoleGrithm', 0, -10);
    ctx.font = '12px Arial';
    ctx.fillText(arSession.selectedSneaker.name?.split(' ').slice(-2).join(' ') || 'AR Sneaker', 0, 8);
    
    // Foot tracking indicators
    if (arControls.footDetection) {
      ctx.strokeStyle = arControls.autoTracking ? '#00FF00' : '#FFA500';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(-sneakerWidth/2 - 15, -sneakerHeight/2 - 15, sneakerWidth + 30, sneakerHeight + 30);
      ctx.setLineDash([]);
      
      // Tracking quality indicator
      const qualityColor = arSession.trackingQuality === 'high' ? '#00FF00' : 
                          arSession.trackingQuality === 'medium' ? '#FFA500' : '#FF0000';
      ctx.fillStyle = qualityColor;
      ctx.beginPath();
      ctx.arc(sneakerWidth/2 + 20, -sneakerHeight/2 - 20, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    ctx.restore();
  };

  // Simulate AR overlay rendering (legacy support)
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
      <section className="section background-black min-h-screen">
        <div className="w-layout-blockcontainer container w-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Device Not Compatible</h1>
          <p className="text-muted-foreground">
            AR Try-On requires a device with camera access. Please use a modern smartphone or tablet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section background-black min-h-screen">
      <div className="w-layout-blockcontainer container w-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
    </section>
  );
}