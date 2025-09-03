import { Link } from 'wouter'
import { TrendingUp, Users, Smartphone, Bot, Search, Target, Map, Grid3X3, BookOpen, Eye, Heart, User, Compass } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP navbar entrance animation
    if (navRef.current) {
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out" }
      )
    }
  }, [])

  return (
    <div
      ref={navRef}
      className="navbar w-nav"
      data-animation="default"
      data-easing2="ease"
      data-easing="ease"
      data-collapse="none"
      role="banner"
      data-no-scroll="1"
      data-duration="400"
    >
      <Link href="/">
        <a className="logo-link-wrapper w-nav-brand">
          <div className="brand-text">SOLEGRITHM</div>
        </a>
      </Link>
      
      <div className="nav-container w-container">
        <nav role="navigation" className="nav-menu w-nav-menu flex-nowrap">
          <div className="nav-link-wrapper">
            <Link href="/catalog" className="nav-link w-nav-link">
              <span className="nav-icon"><Grid3X3 size={18} /></span>
              <span className="nav-text">Catalog</span>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/live-market" className="nav-link w-nav-link">
              <span className="nav-icon"><TrendingUp size={18} /></span>
              <span className="nav-text">Live Market</span>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/discover" className="nav-link w-nav-link">
              <span className="nav-icon"><Compass size={18} /></span>
              <span className="nav-text">Discover</span>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/visual-search" className="nav-link w-nav-link">
              <span className="nav-icon"><Eye size={18} /></span>
              <span className="nav-text">Visual Search</span>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/collections" className="nav-link w-nav-link">
              <span className="nav-icon"><Heart size={18} /></span>
              <span className="nav-text">Collections</span>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/blog" className="nav-link w-nav-link">
              <span className="nav-icon"><BookOpen size={18} /></span>
              <span className="nav-text">Blog</span>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/women-in-sneakers" className="nav-link w-nav-link">
              <span className="nav-icon"><Users size={18} /></span>
              <span className="nav-text">Women in Sneakers</span>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/ar-tryon" className="nav-link w-nav-link">
              <span className="nav-icon"><Smartphone size={18} /></span>
              <span className="nav-text">AR Try-On</span>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/solebot" className="nav-link w-nav-link">
              <span className="nav-icon"><Bot size={18} /></span>
              <span className="nav-text">SoleBot</span>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/soleradar" className="nav-link w-nav-link">
              <span className="nav-icon"><Search size={18} /></span>
              <span className="nav-text">SoleRadar</span>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/style-quiz" className="nav-link w-nav-link">
              <span className="nav-icon"><Target size={18} /></span>
              <span className="nav-text">Style Quiz</span>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/sneaker-map" className="nav-link w-nav-link">
              <span className="nav-icon"><Map size={18} /></span>
              <span className="nav-text">Sneaker Map</span>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/profile" className="nav-link w-nav-link">
              <span className="nav-icon"><User size={18} /></span>
              <span className="nav-text">Profile</span>
            </Link>
          </div>
        </nav>
        
        <div className="menu-button w-nav-button">
          <div className="burger-icon w-icon-nav-menu"></div>
        </div>
      </div>
    </div>
  )
}