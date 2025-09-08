import { Link, useLocation } from 'wouter'
import { TrendingUp, Users, Smartphone, Search, Target, Map, Grid3X3, BookOpen, Eye, Heart, User, Compass, ChevronDown, MessageCircle, Loader2, Home } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null)
  const [location] = useLocation()
  const [isNavigating, setIsNavigating] = useState(false)
  const [aiDropdownOpen, setAiDropdownOpen] = useState(false)
  const [communityDropdownOpen, setCommunityDropdownOpen] = useState(false)

  const handleNavigation = () => {
    setIsNavigating(true)
    // Close dropdowns when navigating
    setAiDropdownOpen(false)
    setCommunityDropdownOpen(false)
    // Reset navigation state after transition
    setTimeout(() => setIsNavigating(false), 400)
  }

  useEffect(() => {
    // GSAP navbar entrance animation
    if (navRef.current) {
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out" }
      )
    }
  }, [])

  const mainNavigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Live Market', href: '/live-market', icon: TrendingUp },
    { name: 'Collections', href: '/collections', icon: Heart },
    { name: 'Blog', href: '/blog', icon: BookOpen }
  ];

  const aiFeatures = [
    { name: 'Visual Search', href: '/visual-search', icon: Eye },
    { name: 'SoleRadar', href: '/soleradar', icon: Search },
    { name: 'Style Quiz', href: '/style-quiz', icon: Target }
  ];

  const communityFeatures = [
    { name: 'AR Try-On', href: '/ar-tryon', icon: Smartphone },
    { name: 'Women in Sneakers', href: '/women-in-sneakers', icon: Users },
    { name: 'Sneaker Map', href: '/sneaker-map', icon: Map }
  ];

  return (
    <header
      ref={navRef}
      style={{ 
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--black)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(8px)',
        width: '100%'
      }}
    >
      <nav style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          
          {/* Logo */}
          <Link href="/">
            <div onClick={handleNavigation} style={{ textDecoration: 'none', cursor: 'pointer' }} className="brand-text">
              SOLEGRITHM
            </div>
          </Link>
          
          {/* Main Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {mainNavigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link key={item.name} href={item.href}>
                  <div 
                    onClick={handleNavigation}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: location === item.href ? '#4facfe' : 'var(--white)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      transition: 'all 0.1s ease',
                      backgroundColor: location === item.href ? 'rgba(79, 172, 254, 0.1)' : 'transparent',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      if (location !== item.href) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (location !== item.href) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <IconComponent size={18} />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
            
            {/* AI Features Dropdown */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setAiDropdownOpen(true)}
              onMouseLeave={() => setAiDropdownOpen(false)}
            >
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--white)',
                  backgroundColor: aiDropdownOpen ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.1s ease',
                }}
              >
                <MessageCircle size={18} />
                <span>AI Features</span>
                <ChevronDown size={16} style={{ transform: aiDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
              </button>
              
              {aiDropdownOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    backgroundColor: 'var(--secondary)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '0.5rem',
                    minWidth: '200px',
                    marginTop: '0.5rem',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                  }}
                >
                  {aiFeatures.map((feature) => {
                    const IconComponent = feature.icon;
                    return (
                      <Link key={feature.name} href={feature.href}>
                        <div 
                          onClick={handleNavigation}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            color: location === feature.href ? '#4facfe' : 'var(--white)',
                            textDecoration: 'none',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            transition: 'all 0.1s ease',
                            backgroundColor: location === feature.href ? 'rgba(79, 172, 254, 0.1)' : 'transparent',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            if (location !== feature.href) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (location !== feature.href) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          <IconComponent size={20} />
                          <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{feature.name}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Community Features Dropdown */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setCommunityDropdownOpen(true)}
              onMouseLeave={() => setCommunityDropdownOpen(false)}
            >
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--white)',
                  backgroundColor: communityDropdownOpen ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.1s ease',
                }}
              >
                <Users size={18} />
                <span>Community</span>
                <ChevronDown size={16} style={{ transform: communityDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
              </button>
              
              {communityDropdownOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    backgroundColor: 'var(--secondary)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '0.5rem',
                    minWidth: '200px',
                    marginTop: '0.5rem',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                  }}
                >
                  {communityFeatures.map((feature) => {
                    const IconComponent = feature.icon;
                    return (
                      <Link key={feature.name} href={feature.href}>
                        <div 
                          onClick={handleNavigation}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            color: location === feature.href ? '#4facfe' : 'var(--white)',
                            textDecoration: 'none',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            transition: 'all 0.1s ease',
                            backgroundColor: location === feature.href ? 'rgba(79, 172, 254, 0.1)' : 'transparent',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            if (location !== feature.href) {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (location !== feature.href) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          <IconComponent size={20} />
                          <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{feature.name}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          
          {/* User Profile */}
          <Link href="/profile">
            <div 
              onClick={handleNavigation}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: location === '/profile' ? '#4facfe' : 'var(--white)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: '500',
                padding: '0.5rem',
                borderRadius: '8px',
                transition: 'all 0.1s ease',
                backgroundColor: location === '/profile' ? 'rgba(79, 172, 254, 0.1)' : 'transparent',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (location !== '/profile') {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (location !== '/profile') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <User size={18} />
              <span>Profile</span>
              {isNavigating && (
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
              )}
            </div>
          </Link>
        </div>
      </nav>
      
      {/* Global Loading Indicator */}
      {isNavigating && (
        <div 
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
            zIndex: 1000,
            animation: 'slideIn 0.4s ease-out'
          }}
        />
      )}
      
      <style>
        {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        `}
      </style>
    </header>
  )
}