import React, { useState } from 'react';
import { Bookmark, Heart, Share, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Collection {
  id: number;
  title: string;
  description: string;
  sneakerCount: number;
  image: string;
  gradient: string;
  creator: string;
}

export default function AdvancedCollections() {
  const [collections] = useState<Collection[]>([
    {
      id: 1,
      title: "Grail Collection",
      description: "Ultra-rare and highly coveted sneakers",
      sneakerCount: 24,
      image: "👑",
      gradient: "linear-gradient(135deg, #ff2900 0%, #fe7a60 61%, #581dff 100%)",
      creator: "SneakerKing"
    },
    {
      id: 2,
      title: "Daily Drivers",
      description: "Comfort meets style for everyday wear",
      sneakerCount: 18,
      image: "⚡",
      gradient: "linear-gradient(135deg, #581dff 0%, #8054ff 61%, #ff3812 100%)",
      creator: "ComfortFirst"
    },
    {
      id: 3,
      title: "Retro Vibes",
      description: "Classic silhouettes that never go out of style",
      sneakerCount: 32,
      image: "🔥",
      gradient: "linear-gradient(135deg, #ff6b35 0%, #f7931e 61%, #ff2900 100%)",
      creator: "VintageHead"
    },
    {
      id: 4,
      title: "Future Forward",
      description: "Cutting-edge designs and innovative tech",
      sneakerCount: 15,
      image: "🚀",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 61%, #8b5cf6 100%)",
      creator: "TechSneaks"
    }
  ]);

  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(30, 10, 40, 0.95), rgba(40, 20, 50, 0.9))',
      }}
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(to right, #8B5CF6 0%, #EC4899 61%, #FF6B35 100%)',
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-15"
          style={{
            background: 'linear-gradient(to right, #FF6B35 0%, #8B5CF6 61%, #EC4899 100%)',
          }}
        />
      </div>

      {/* Static geometric shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full border border-purple-500/20" />
      <div className="absolute bottom-20 left-20 w-24 h-24 rotate-45 border border-pink-500/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
            }}
          >
            <Bookmark className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-white">CURATED COLLECTIONS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
            Discover Amazing
            <br />
            <span
              style={{
                background: 'linear-gradient(to right, #8B5CF6 0%, #EC4899 61%, #FF6B35 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Collections
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Explore carefully curated sneaker collections from passionate collectors and 
            discover new styles that match your taste.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className="group cursor-pointer"
            >
              <div 
                className="relative h-80 rounded-3xl overflow-hidden border border-white/10 hover:scale-105 transition-transform duration-300"
                style={{
                  background: collection.gradient,
                }}
              >
                {/* Collection Image/Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-30">{collection.image}</div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        {collection.sneakerCount} sneakers
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                          <Heart className="w-4 h-4 text-white" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                          <Share className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {collection.title}
                      </h3>
                      <p className="text-sm text-white/80 mb-2">
                        {collection.description}
                      </p>
                      <p className="text-xs text-white/60">
                        by {collection.creator}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            className="px-8 py-4 text-lg font-semibold text-white rounded-full hover:scale-105 transition-transform"
            style={{
              background: 'linear-gradient(to right, #8B5CF6 0%, #EC4899 61%, #FF6B35 100%)',
            }}
            data-testid="button-view-all-collections"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            View All Collections
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}