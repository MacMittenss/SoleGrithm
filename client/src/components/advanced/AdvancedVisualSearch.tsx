import React, { useState } from 'react';
import { Camera, Search, Zap, ArrowRight, Sparkles, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdvancedVisualSearch() {
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 20, 40, 0.95), rgba(20, 0, 40, 0.9))',
      }}
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(to right, #06B6D4 0%, #8B5CF6 61%, #EC4899 100%)',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15"
          style={{
            background: 'linear-gradient(to right, #EC4899 0%, #06B6D4 61%, #8B5CF6 100%)',
          }}
        />
      </div>

      {/* Static geometric shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full border border-cyan-500/20" />
      <div className="absolute bottom-20 right-20 w-24 h-24 rotate-45 border border-purple-500/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <div className="space-y-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
              }}
            >
              <Camera className="w-4 h-4 text-cyan-500" />
              <span className="text-sm font-medium text-white">VISUAL AI SEARCH</span>
            </div>

            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
                AI-Powered
                <br />
                <span
                  style={{
                    background: 'linear-gradient(to right, #06B6D4 0%, #8B5CF6 61%, #EC4899 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Visual Search
                </span>
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl">
                Upload any sneaker image and let our advanced AI identify the model, 
                find similar styles, and discover the best prices across all platforms.
              </p>
            </div>

            {/* Feature list */}
            <div className="space-y-4">
              {[
                { icon: Eye, title: 'Image Recognition', desc: 'Instant sneaker identification from photos' },
                { icon: Search, title: 'Smart Matching', desc: 'Find similar styles and colorways' },
                { icon: Zap, title: 'Real-time Results', desc: 'Get results in under 2 seconds' }
              ].map((feature, index) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mt-1"
                    style={{
                      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <feature.icon className="w-6 h-6 text-cyan-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-white">{feature.title}</h4>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <Button
                onClick={startScan}
                className="px-8 py-4 text-lg font-semibold text-white rounded-full hover:scale-105 transition-transform"
                style={{
                  background: 'linear-gradient(to right, #06B6D4 0%, #8B5CF6 61%, #EC4899 100%)',
                }}
                data-testid="button-start-visual-search"
              >
                <Camera className="w-5 h-5 mr-2" />
                Start Visual Search
              </Button>
            </div>
          </div>

          {/* Demo Column */}
          <div className="relative">
            <div 
              className="aspect-square rounded-3xl border-2 border-dashed border-cyan-500/30 flex items-center justify-center"
              style={{
                background: 'rgba(6, 182, 212, 0.05)',
              }}
            >
              {isScanning ? (
                <div className="text-center">
                  <div className="animate-spin w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="text-cyan-500 font-medium">Analyzing image...</p>
                </div>
              ) : (
                <div className="text-center">
                  <Camera className="w-24 h-24 text-cyan-500/40 mx-auto mb-4" />
                  <p className="text-gray-400">Drop sneaker image here</p>
                  <p className="text-sm text-gray-500 mt-2">or click to browse</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}