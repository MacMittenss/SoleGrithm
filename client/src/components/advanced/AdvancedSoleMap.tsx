import React, { useState } from 'react';
import { MapPin, TrendingUp, Users, Zap } from 'lucide-react';

interface CityData {
  name: string;
  coordinate: [number, number];
  trend: string;
  sales: string;
  popular: string;
}

export default function AdvancedSoleMap() {
  const [cityData] = useState<CityData[]>([
    {
      name: "New York",
      coordinate: [25, 30],
      trend: "+24%",
      sales: "8.2K",
      popular: "Jordan 1"
    },
    {
      name: "Los Angeles", 
      coordinate: [15, 60],
      trend: "+18%",
      sales: "6.7K",
      popular: "Yeezy 350"
    },
    {
      name: "Chicago",
      coordinate: [35, 45],
      trend: "+31%",
      sales: "5.1K", 
      popular: "Air Force 1"
    },
    {
      name: "Miami",
      coordinate: [45, 75],
      trend: "+15%",
      sales: "4.3K",
      popular: "Dunk Low"
    }
  ]);

  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(10, 30, 20, 0.95), rgba(30, 40, 10, 0.9))',
      }}
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(to right, #10B981 0%, #34D399 61%, #6EE7B7 100%)',
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/3 w-60 h-60 rounded-full opacity-15"
          style={{
            background: 'linear-gradient(to right, #6EE7B7 0%, #10B981 61%, #34D399 100%)',
          }}
        />
      </div>

      {/* Static geometric shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full border border-green-500/20" />
      <div className="absolute bottom-20 right-20 w-24 h-24 rotate-45 border border-emerald-500/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}
          >
            <MapPin className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-white">SOLE MAP</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
            Global Sneaker
            <br />
            <span
              style={{
                background: 'linear-gradient(to right, #10B981 0%, #34D399 61%, #6EE7B7 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Trends Map
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Explore real-time sneaker trends and market data across major cities worldwide. 
            Discover what's hot in your area and beyond.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative">
          <div 
            className="aspect-[16/10] rounded-3xl border border-white/10 relative overflow-hidden"
            style={{
              background: 'rgba(16, 185, 129, 0.05)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Simplified Map Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl text-green-500/20">🗺️</div>
            </div>

            {/* City Markers */}
            {cityData.map((city, index) => (
              <div
                key={city.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${city.coordinate[0]}%`,
                  top: `${city.coordinate[1]}%`,
                }}
              >
                <div className="relative group cursor-pointer">
                  <div 
                    className="w-4 h-4 rounded-full border-2 border-white"
                    style={{
                      background: 'linear-gradient(to right, #10B981 0%, #34D399 100%)',
                    }}
                  />
                  
                  {/* City Info Card */}
                  <div 
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 p-3 rounded-lg border border-white/10 min-w-32 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: 'rgba(0, 0, 0, 0.9)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <h4 className="font-semibold text-white text-sm mb-1">{city.name}</h4>
                    <div className="text-xs text-gray-300 space-y-1">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span>{city.trend}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-blue-400" />
                        <span>{city.sales}</span>
                      </div>
                      <div className="text-gray-400">#{city.popular}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}