import React from 'react';
import SneakerMap from '@/components/SneakerMap';

const TrendMap: React.FC = () => {
  return (
  <div className="dark" style={{ minHeight: '100vh', background: '#111', color: '#fff', width: '100%' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#fff', marginBottom: '1rem', letterSpacing: '0.03em' }}>
            Sneaker Discovery Map
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#ccc', maxWidth: '700px', margin: '0 auto' }}>
            Explore real-time sneaker trends across the United States. See what's hot in different cities, 
            track price movements, and discover regional preferences that drive the sneaker market.
          </p>
        </div>

        {/* Interactive Map Component */}
        <SneakerMap />

        {/* Feature Highlights */}
        <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          <div style={{ textAlign: 'center', padding: '2rem', border: '1px solid #222', borderRadius: '12px', background: '#181818' }}>
            <div style={{ width: '48px', height: '48px', background: '#222', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <svg style={{ width: '28px', height: '28px', color: '#4facfe' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff' }}>Real-Time Trends</h3>
            <p style={{ color: '#ccc' }}>
              Live data from resale platforms and community activity to show what's trending now.
            </p>
          </div>

          <div style={{ textAlign: 'center', padding: '2rem', border: '1px solid #222', borderRadius: '12px', background: '#181818' }}>
            <div style={{ width: '48px', height: '48px', background: '#222', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <svg style={{ width: '28px', height: '28px', color: '#4facfe' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff' }}>Geographic Insights</h3>
            <p style={{ color: '#ccc' }}>
              Discover regional preferences and see how sneaker culture varies across different cities.
            </p>
          </div>

          <div style={{ textAlign: 'center', padding: '2rem', border: '1px solid #222', borderRadius: '12px', background: '#181818' }}>
            <div style={{ width: '48px', height: '48px', background: '#222', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <svg style={{ width: '28px', height: '28px', color: '#4facfe' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff' }}>Price Analytics</h3>
            <p style={{ color: '#ccc' }}>
              Track price movements and market value changes across different regions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendMap;