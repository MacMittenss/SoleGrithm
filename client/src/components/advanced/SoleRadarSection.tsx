import React from 'react';
import { Compass, Target, Zap, Heart, ArrowRight, Sparkles, Brain } from 'lucide-react';
import { Link } from 'wouter';

export default function SoleRadarSection() {
  return (
    <section className="bg-black py-16 px-4 md:px-12 lg:px-24 xl:px-40" data-testid="section-sole-radar">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h5 className="text-blue-400 text-lg font-semibold tracking-widest mb-2">AI DISCOVERY</h5>
          <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Smart Style Discovery</h2>
        </div>
        {/* Description */}
        <div className="text-center mb-10">
          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto">
            AI-powered personalized sneaker discovery. Advanced algorithms analyze your style, preferences, and trends to deliver perfectly curated recommendations.
          </p>
        </div>
        {/* CTA Button */}
        <div className="flex justify-center mb-14">
          <Link href="/discover">
            <button className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl shadow transition text-lg">
              Start Discovery
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Compass,
              title: "AI Style Matching",
              description: "Our AI analyzes your preferences and suggests sneakers that match your unique style perfectly using advanced machine learning."
            },
            {
              icon: Target,
              title: "Smart Recommendations",
              description: "Get personalized sneaker suggestions based on your browsing history, preferences, and current fashion trends."
            },
            {
              icon: Zap,
              title: "Instant Discovery",
              description: "Find your perfect sneakers in seconds with our lightning-fast AI algorithm and intelligent search capabilities."
            },
            {
              icon: Heart,
              title: "Style Evolution",
              description: "Track your style journey and discover new trends that align with your evolving taste and fashion preferences."
            },
            {
              icon: Brain,
              title: "Learning Algorithm",
              description: "Our AI continuously learns from your choices to provide increasingly accurate and personalized recommendations."
            },
            {
              icon: Sparkles,
              title: "Trend Prediction",
              description: "Stay ahead of the curve with AI-powered trend forecasting and early access to emerging sneaker styles."
            }
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-zinc-900 rounded-2xl shadow-lg border border-white/10 p-8 flex flex-col items-center text-center h-full"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-blue-400/20 to-blue-900/10 border border-blue-400/20">
                <feature.icon className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-zinc-300 text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}