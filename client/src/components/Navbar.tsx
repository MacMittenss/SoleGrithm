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
            <Link href="/">
              <a className="nav-link w-nav-link">Home</a>
            </Link>
            <Link href="/">
              <a className="nav-link move-down hide-on-tab w-nav-link">Home</a>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/about">
              <a className="nav-link w-nav-link">About</a>
            </Link>
            <Link href="/about">
              <a className="nav-link move-down hide-on-tab w-nav-link">About</a>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/works">
              <a className="nav-link w-nav-link">Works</a>
            </Link>
            <Link href="/works">
              <a className="nav-link move-down hide-on-tab w-nav-link">Works</a>
            </Link>
          </div>
          
          <div className="nav-link-wrapper">
            <Link href="/contact">
              <a className="nav-link w-nav-link">Contact</a>
            </Link>
            <Link href="/contact">
              <a className="nav-link move-down hide-on-tab w-nav-link">Contact</a>
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