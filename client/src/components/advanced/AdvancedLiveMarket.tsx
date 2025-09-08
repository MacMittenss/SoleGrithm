import React, { useState } from 'react';
import { TrendingUp, Zap, ArrowRight, BarChart3 } from 'lucide-react';
import { Link } from 'wouter';

interface MarketData {
  name: string;
  price: string;
  change: string;
  trend: 'up' | 'down';
  volume: string;
  image?: string;
}

export default function AdvancedLiveMarket() {
  const [marketData] = useState<MarketData[]>([
    {
      name: "Air Jordan 1 Retro High",
      price: "$420",
      change: "+12.5%",
      trend: "up",
      volume: "2.1K sales"
    },
    {
      name: "Yeezy Boost 350 V2",
      price: "$280",
      change: "-8.2%",
      trend: "down",
      volume: "1.8K sales"
    },
    {
      name: "Nike Dunk Low Panda",
      price: "$150",
      change: "+5.7%",
      trend: "up",
      volume: "3.2K sales"
    },
    {
      name: "Travis Scott x Fragment",
      price: "$1,250",
      change: "+24.1%",
      trend: "up",
      volume: "892 sales"
    }
  ]);

  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.98), rgba(30, 30, 30, 0.95))',
      }}
      data-testid="section-live-market"
    >
      {/* Background gradient effects */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(255, 41, 0, 0.08) 0%, rgba(254, 122, 96, 0.04) 35%, rgba(88, 29, 255, 0.08) 100%)',
        }}
      />

      {/* Static geometric shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full border border-orange-500/20" />
      <div className="absolute bottom-20 left-20 w-24 h-24 rotate-45 border border-purple-500/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <div className="space-y-8">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(255, 41, 0, 0.1)',
                border: '1px solid rgba(255, 41, 0, 0.2)',
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                }}
              />
              <span className="text-sm font-medium text-white">LIVE MARKET DATA</span>
            </div>

            {/* Main Title */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
                Real-time Market
                <br />
                <span
                  style={{
                    background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Intelligence
                </span>
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl">
                Advanced pricing analytics and market intelligence powered by real-time data 
                from all major sneaker platforms worldwide.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { number: 50000, label: 'Sneakers Tracked', suffix: '+' },
                { number: 15, label: 'Data Sources', suffix: '+' },
                { number: 99, label: 'Accuracy Rate', suffix: '%' }
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold mb-2">
                    <span
                      style={{
                        background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      {stat.number.toLocaleString()}
                    </span>
                    <span
                      style={{
                        background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      {stat.suffix}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              <Link href="/live-market">
                <button
                  className="group relative px-8 py-4 text-lg font-semibold text-white overflow-hidden rounded-full hover:scale-105 transition-transform"
                  style={{
                    background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                  }}
                  data-testid="button-explore-market"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Market
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Chart Column */}
          <div className="relative">
            {/* Market Data Cards */}
            <div className="space-y-4">
              {marketData.map((item, index) => (
                <div
                  key={item.name}
                  className="p-4 rounded-xl border border-white/10"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-400">{item.volume}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white">{item.price}</div>
                      <div
                        className={`text-sm font-medium ${
                          item.trend === 'up' ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {item.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 inline mr-1" />
                        ) : (
                          <Zap className="w-4 h-4 inline mr-1" />
                        )}
                        {item.change}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}