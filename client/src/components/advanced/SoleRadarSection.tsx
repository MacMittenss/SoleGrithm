import React from 'react';
import { Compass, Target, Zap, Heart, ArrowRight, Sparkles, Brain } from 'lucide-react';
import { Link } from 'wouter';

export default function SoleRadarSection() {
  return (
    <section 
      className="section"
      style={{ backgroundColor: '#050505', color: 'whitesmoke', minHeight: '100vh' }}
      data-testid="section-sole-radar"
    >
      <div className="w-layout-blockcontainer container w-container">
        <div style={{ minHeight: '11.11vw' }}></div>
        
        {/* Header Section - Centered */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          width: '100%',
          marginBottom: '2.2vw',
          textAlign: 'center'
        }}>
          <h5 style={{ 
            color: 'whitesmoke',
            letterSpacing: '.14vw',
            textTransform: 'uppercase',
            marginTop: 0,
            marginBottom: 0,
            fontSize: '.89vw',
            fontWeight: 400,
            lineHeight: '1.44vw'
          }}>
            AI DISCOVERY
          </h5>
          <h2 style={{ 
            color: 'whitesmoke',
            letterSpacing: '-.07vw',
            textTransform: 'capitalize',
            marginTop: 0,
            marginBottom: 0,
            fontSize: '4.44vw',
            fontWeight: 500,
            lineHeight: '5vw'
          }}>
            Smart Style Discovery
          </h2>
        </div>

        {/* Description - Centered */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          width: '100%',
          marginBottom: '3vw',
          textAlign: 'center'
        }}>
          <p style={{ 
            color: 'whitesmoke',
            letterSpacing: '.07vw',
            marginBottom: 0,
            fontSize: '1.11vw',
            fontWeight: 300,
            lineHeight: '1.89vw',
            maxWidth: '60vw'
          }}>
            AI-powered personalized sneaker discovery. Advanced algorithms analyze your style,
            preferences, and trends to deliver perfectly curated recommendations.
          </p>
        </div>

        {/* CTA Button - Prominent Center Position */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          width: '100%',
          marginBottom: '4vw'
        }}>
          <Link href="/discover">
            <button
              style={{
                padding: '1.2rem 3rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#000',
                background: 'linear-gradient(to right, #00ff96 0%, #32ff64 61%, #ff9650 100%)',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(0, 255, 150, 0.3)'
              }}
              data-testid="button-start-discovery"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 255, 150, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 255, 150, 0.3)';
              }}
            >
              Start Discovery
              <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
            </button>
          </Link>
        </div>

        {/* Features - 3 Column Grid Layout */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '3rem',
          alignItems: 'start',
          width: '100%'
        }}>
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
          ].map((feature, index) => (
            <div
              key={feature.title}
              style={{ 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '2rem 1rem'
              }}
              data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div style={{
                width: '5rem',
                height: '5rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 255, 150, 0.1)',
                border: '2px solid rgba(0, 255, 150, 0.2)',
                marginBottom: '0.5rem'
              }}>
                <feature.icon style={{ width: '2.5rem', height: '2.5rem', color: '#00ff96' }} />
              </div>
              <h3 style={{ 
                color: 'whitesmoke',
                fontSize: '1.2rem',
                fontWeight: 600,
                marginTop: 0,
                marginBottom: '0.5rem',
                lineHeight: '1.4'
              }}>
                {feature.title}
              </h3>
              <p style={{ 
                color: '#a0a0a0',
                fontSize: '0.95rem',
                fontWeight: 300,
                marginTop: 0,
                marginBottom: 0,
                lineHeight: '1.6',
                textAlign: 'center'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div style={{ minHeight: '7.8vw' }}></div>
      </div>
    </section>
  );
}