import { Link } from 'wouter'
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
      data-collapse="medium"
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
        <nav role="navigation" className="nav-menu w-nav-menu">
          <div className="nav-link-wrapper">
            <Link href="/live-market">
              <a className="nav-link w-nav-link">Live Market</a>
            </Link>
            <Link href="/live-market">
              <a className="nav-link move-down hide-on-tab w-nav-link">Live Market</a>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/women-in-sneakers">
              <a className="nav-link w-nav-link">Women in Sneakers</a>
            </Link>
            <Link href="/women-in-sneakers">
              <a className="nav-link move-down hide-on-tab w-nav-link">Women in Sneakers</a>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/ar-tryon">
              <a className="nav-link w-nav-link">AR Try-On</a>
            </Link>
            <Link href="/ar-tryon">
              <a className="nav-link move-down hide-on-tab w-nav-link">AR Try-On</a>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/solebot">
              <a className="nav-link w-nav-link">SoleBot</a>
            </Link>
            <Link href="/solebot">
              <a className="nav-link move-down hide-on-tab w-nav-link">SoleBot</a>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/soleradar">
              <a className="nav-link w-nav-link">SoleRadar</a>
            </Link>
            <Link href="/soleradar">
              <a className="nav-link move-down hide-on-tab w-nav-link">SoleRadar</a>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/style-quiz">
              <a className="nav-link w-nav-link">Style Quiz</a>
            </Link>
            <Link href="/style-quiz">
              <a className="nav-link move-down hide-on-tab w-nav-link">Style Quiz</a>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/sneaker-map">
              <a className="nav-link w-nav-link">Sneaker Map</a>
            </Link>
            <Link href="/sneaker-map">
              <a className="nav-link move-down hide-on-tab w-nav-link">Sneaker Map</a>
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