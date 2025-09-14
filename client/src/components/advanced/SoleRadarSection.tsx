import React from 'react';
import { Compass, Target, Zap, Heart, ArrowRight, Sparkles, Brain } from 'lucide-react';
import { Link } from 'wouter';

export default function SoleRadarSection() {
  return (
    <section 
      className="section background-black"
      data-testid="section-sole-radar"
    >
      <div className="w-layout-blockcontainer container padding-4-5rem w-container">
        <div className="space-7rem"></div>
        
        {/* Header Section - Centered */}
        <div className="utilities-wrapper-title" style={{ 
          width: '100%',
          textAlign: 'center',
          alignItems: 'center',
          marginBottom: '2.2vw'
        }}>
          <h5 className="heading">
            AI DISCOVERY
          </h5>
          <h2 style={{ 
            color: 'var(--white)',
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
        <div className="utilities-wrapper-paragraph" style={{ 
          width: '100%',
          textAlign: 'center',
          alignItems: 'center',
          marginBottom: '3vw'
        }}>
          <p style={{ 
            color: 'var(--white)',
            letterSpacing: '.07vw',
            marginBottom: 0,
            fontSize: '1.11vw',
            fontWeight: 300,
            lineHeight: '1.89vw',
            maxWidth: '42.22vw',
            margin: '0 auto'
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
            <div className="button-with-circle-icon">
              <div className="button-text">Start Discovery</div>
              <div className="button-arrow-wrapper">
                <ArrowRight className="arrow" />
              </div>
            </div>
          </Link>
        </div>

        {/* Features - 3 Column Grid Layout */}
        <div className="utilities-grid-thirds">
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