import React from 'react';
import { Compass, Target, Zap, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function SoleRadarSection() { 

  return (
    <div
      className="sole-radar relative py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 1), rgba(20, 20, 30, 1))', // Same as discover culture section
        minHeight: '100vh', // Ensure full viewport coverage
      }}
      data-testid="section-sole-radar"
    >
      {/* Background gradient effects - Without blur filters */}
      <div className="absolute top-16 bottom-0 left-0 right-0 overflow-hidden">
        {/* Purple/Pink/Blue gradient orbs - No blur filters */}
        <div 
          className="absolute top-32 left-1/4 w-80 h-80 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(to right, #8B5CF6 0%, #EC4899 61%, #06B6D4 100%)',
          }}
        />
        <div 
          className="absolute bottom-20 right-1/4 w-60 h-60 rounded-full opacity-15"
          style={{
            background: 'linear-gradient(to right, #06B6D4 0%, #8B5CF6 61%, #EC4899 100%)',
          }}
        />
      </div>

      {/* Static geometric shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full border border-green-500/20" />
      <div className="absolute bottom-20 left-20 w-24 h-24 rotate-45 border border-orange-500/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <div className="space-y-8">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(0, 255, 150, 0.1)',
                border: '1px solid rgba(0, 255, 150, 0.2)',
              }}
            >
              <Compass className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-white">SOLE RADAR AI</span>
            </div>

            {/* Main Title */}
            <div>
              <h2 
                className="font-bold leading-tight mb-6 text-white"
                style={{ 
                  fontFamily: '"seasonSans", "seasonSans Fallback", "Manrope", "Inter", sans-serif',
                  fontSize: 'calc(4rem * 1.4)', // 1.4 times bigger
                }}
              >
                Smart Style Discovery
              </h2>
              
              <p
                className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl"
              >
                AI-powered personalized sneaker discovery. Advanced algorithms analyze your style,
                preferences, and trends to deliver perfectly curated recommendations.
              </p>
            </div>

            {/* Feature list */}
            <div className="space-y-4">
              {[
                { icon: Compass, title: 'AI Style Matching', desc: 'Advanced analysis of your unique style preferences' },
                { icon: Target, title: 'Smart Recommendations', desc: 'Personalized suggestions based on your history' },
                { icon: Zap, title: 'Instant Discovery', desc: 'Lightning-fast results in under 1 second' }
              ].map((feature, index) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mt-1"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 255, 150, 0.1), rgba(50, 255, 100, 0.1))',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <feature.icon className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-white">{feature.title}</h4>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              <Link href="/discover">
                <button
                  className="group relative px-8 py-4 text-lg font-semibold text-white overflow-hidden rounded-full"
                  style={{
                    background: 'linear-gradient(to right, #00ff96 0%, #32ff64 61%, #ff9650 100%)',
                  }}
                  data-testid="button-start-discovery"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Discovery
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Features Grid Column */}
          <div className="relative">
            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-8">
              {[
                {
                  icon: Compass,
                  title: "AI Style Matching",
                  description: "Our AI analyzes your preferences and suggests sneakers that match your unique style perfectly."
                },
                {
                  icon: Target,
                  title: "Smart Recommendations",
                  description: "Get personalized sneaker suggestions based on your browsing history and style preferences."
                },
                {
                  icon: Zap,
                  title: "Instant Discovery",
                  description: "Find your perfect sneakers in seconds with our lightning-fast AI algorithm and search."
                },
                {
                  icon: Heart,
                  title: "Style Evolution",
                  description: "Track your style journey and discover new trends that align with your evolving taste."
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="text-center space-y-4"
                  data-testid={`feature-${feature.title.toLowerCase().replace(' ', '-')}`}
                >
                  <div 
                    className="flex items-center justify-center w-16 h-16 mx-auto rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 255, 150, 0.1), rgba(50, 255, 100, 0.1))',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <feature.icon className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}