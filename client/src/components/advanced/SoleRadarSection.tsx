import React from 'react';
import { Compass, Target, Zap, Heart, ArrowRight } from 'lucide-react';
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
        
        {/* Header Section */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start', 
          width: '100%',
          marginBottom: '2.2vw'
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

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start', 
          width: '50%',
          marginBottom: '4.4vw'
        }}>
          <p style={{ 
            color: 'whitesmoke',
            letterSpacing: '.07vw',
            marginBottom: 0,
            fontSize: '1.11vw',
            fontWeight: 300,
            lineHeight: '1.89vw',
            maxWidth: '42.22vw'
          }}>
            AI-powered personalized sneaker discovery. Advanced algorithms analyze your style,
            preferences, and trends to deliver perfectly curated recommendations.
          </p>
        </div>

        {/* Two Column Layout */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start',
          width: '100%'
        }}>
          
          {/* Left Column - Features List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {[
              { 
                icon: Compass, 
                title: 'AI Style Matching', 
                desc: 'Advanced analysis of your unique style preferences and fashion trends' 
              },
              { 
                icon: Target, 
                title: 'Smart Recommendations', 
                desc: 'Personalized suggestions based on your browsing history and preferences' 
              },
              { 
                icon: Zap, 
                title: 'Instant Discovery', 
                desc: 'Lightning-fast results powered by machine learning algorithms' 
              }
            ].map((feature, index) => (
              <div key={feature.title} style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '1.5rem' 
              }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 255, 150, 0.1)',
                  border: '1px solid rgba(0, 255, 150, 0.2)',
                  marginTop: '0.25rem'
                }}>
                  <feature.icon style={{ width: '1.5rem', height: '1.5rem', color: '#00ff96' }} />
                </div>
                <div>
                  <h4 style={{ 
                    color: 'whitesmoke',
                    fontSize: '1.11vw',
                    fontWeight: 600,
                    marginTop: 0,
                    marginBottom: '0.5rem',
                    lineHeight: '1.4'
                  }}>
                    {feature.title}
                  </h4>
                  <p style={{ 
                    color: '#a0a0a0',
                    fontSize: '0.89vw',
                    fontWeight: 300,
                    marginTop: 0,
                    marginBottom: 0,
                    lineHeight: '1.6'
                  }}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* CTA Button */}
            <div style={{ marginTop: '2rem' }}>
              <Link href="/discover">
                <button
                  style={{
                    padding: '1rem 2rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#000',
                    background: 'linear-gradient(to right, #00ff96 0%, #32ff64 61%, #ff9650 100%)',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'transform 0.2s ease'
                  }}
                  data-testid="button-start-discovery"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Start Discovery
                  <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column - Features Grid */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem'
          }}>
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
                style={{ 
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem'
                }}
                data-testid={`feature-${feature.title.toLowerCase().replace(' ', '-')}`}
              >
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 255, 150, 0.1)',
                  border: '1px solid rgba(0, 255, 150, 0.2)'
                }}>
                  <feature.icon style={{ width: '2rem', height: '2rem', color: '#00ff96' }} />
                </div>
                <h3 style={{ 
                  color: 'whitesmoke',
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginTop: 0,
                  marginBottom: 0,
                  lineHeight: '1.4'
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: '#a0a0a0',
                  fontSize: '0.875rem',
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
        </div>

        <div style={{ minHeight: '7.8vw' }}></div>
      </div>
    </section>
  );
}