import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  MessageCircle, 
  Menu,
  X,
  Home,
  Grid3X3,
  BookOpen,
  Compass,
  Sparkles,
  Eye,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import soleGridLogo from '@assets/S (2)_1752797110222.png';

interface HeaderProps {
  onAIChatToggle: () => void;
}

export default function Header({ onAIChatToggle }: HeaderProps) {
  const [location] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Check if we're on the home page (hero section)
  const isHomePage = location === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Track if we've scrolled at all
      setHasScrolled(scrollY > 0);
      
      if (isHomePage) {
        // Hero section behavior: transition based on hero height
        const heroHeight = window.innerHeight;
        const navbarHeight = 56; // h-14 = 56px
        setIsScrolled(scrollY >= (heroHeight - navbarHeight));
      } else {
        // Non-hero pages: immediate solid background
        setIsScrolled(true);
      }
    };

    // Initial call to set correct state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/works', label: 'Works' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => location === href;

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      isHomePage
        ? isScrolled 
          ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100' 
          : hasScrolled 
            ? 'bg-white/80 backdrop-blur-sm'
            : 'bg-transparent'
        : 'bg-white border-b border-gray-100'
    }`}>
      <div className="template-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <span className={`font-bold text-xl transition-colors ${
                isHomePage && !isScrolled ? "text-white" : "text-black"
              }`} style={{fontFamily: 'Inter, sans-serif'}}>iDESIGNER</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span className={`text-sm font-medium transition-colors hover:opacity-70 ${
                  isActive(item.href)
                    ? isHomePage && !isScrolled
                      ? "text-white border-b-2 border-white"
                      : "text-black border-b-2 border-black"
                    : isHomePage && !isScrolled
                      ? "text-white/80"
                      : "text-gray-600"
                } pb-1`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>


          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* AI Chat Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onAIChatToggle}
              className={`transition-colors ${
                isHomePage && !isScrolled
                  ? "text-white hover:opacity-70"
                  : "text-black hover:opacity-70"
              }`}
            >
              <MessageCircle className="w-5 h-5" />
            </Button>

            {/* User actions */}
            {isAuthenticated ? (
              <Link href="/profile">
                <Avatar className="w-8 h-8 cursor-pointer" data-testid="avatar-profile-mobile">
                  <AvatarImage src={user?.photoURL || undefined} />
                  <AvatarFallback className={`text-sm ${
                    isHomePage && !isScrolled 
                      ? "bg-white/20 text-white" 
                      : "bg-black text-white"
                  }`}>
                    {user?.displayName?.[0] || user?.email?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Link href="/auth">
                <span className={`text-sm font-medium transition-colors hover:opacity-70 ${
                  isHomePage && !isScrolled ? "text-white" : "text-black"
                }`} data-testid="button-sign-in-mobile">
                  Sign In
                </span>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className={`lg:hidden transition-colors ${
                isHomePage && !isScrolled
                  ? "text-white hover:opacity-70"
                  : "text-black hover:opacity-70"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-100 bg-white">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span
                    className={`block text-sm font-medium transition-colors hover:opacity-70 ${
                      isActive(item.href) 
                        ? "text-black border-b border-black pb-1" 
                        : "text-gray-600"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-gray-100">
                {!isAuthenticated && (
                  <Link href="/auth">
                    <span
                      className="block text-sm font-medium text-black hover:opacity-70"
                      onClick={() => setIsMenuOpen(false)}
                      data-testid="button-sign-in-mobile-menu"
                    >
                      Sign In
                    </span>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}