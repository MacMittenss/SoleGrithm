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
  Compass
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import soleGridLogo from '@assets/S (2)_1752797110222.png';

interface HeaderProps {
  onAIChatToggle: () => void;
}

export default function Header({ onAIChatToggle }: HeaderProps) {
  const [location] = useLocation();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get hero section height (assuming it's min-h-screen)
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      setIsScrolled(scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/catalog', label: 'Catalog', icon: Grid3X3 },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/discover', label: 'Discover', icon: Compass },
  ];

  const isActive = (href: string) => location === href;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg border-b border-gray-200' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center h-16 px-4 py-2 bg-black rounded-sm">
              <span className="text-white font-thin text-lg tracking-widest" style={{fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'}}>SOLE</span>
              <span className="text-orange-500 font-thin text-lg tracking-widest ml-1" style={{fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'}}>GRID</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive(item.href) ? "secondary" : "ghost"}
                  size="sm"
                  className={`nav-link transition-colors ${
                    isScrolled
                      ? isActive(item.href)
                        ? "bg-black text-white hover:bg-black/90"
                        : "text-black hover:bg-black/10"
                      : isActive(item.href)
                        ? "bg-white text-black hover:bg-white/90"
                        : "text-white hover:bg-white/10"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Search Bar - Hidden on mobile for cleaner mobile experience */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                isScrolled ? "text-gray-500" : "text-white/70"
              }`} />
              <Input
                type="text"
                placeholder="Search sneakers..."
                className={`pl-10 w-full text-sm transition-colors ${
                  isScrolled 
                    ? "bg-gray-100 border-gray-300 text-black placeholder:text-gray-500"
                    : "bg-white/10 border-white/20 text-white placeholder:text-white/70 backdrop-blur-sm"
                }`}
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* AI Chat Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onAIChatToggle}
              className={`relative transition-colors ${
                isScrolled 
                  ? "text-black hover:bg-black/10" 
                  : "text-white hover:bg-white/10"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 w-2 h-2 p-0 text-xs">
                AI
              </Badge>
            </Button>

            {/* User actions - Mobile optimized */}
            {user ? (
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className={`hidden sm:flex transition-colors ${
                  isScrolled ? "text-black hover:bg-black/10" : "text-white hover:bg-white/10"
                }`}>
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className={`hidden sm:flex transition-colors ${
                  isScrolled ? "text-black hover:bg-black/10" : "text-white hover:bg-white/10"
                }`}>
                  <ShoppingBag className="w-4 h-4" />
                </Button>
                <Link href="/profile">
                  <Avatar className="w-7 h-7 cursor-pointer">
                    <AvatarImage src={user.photoURL || undefined} />
                    <AvatarFallback className="bg-white/20 text-white text-xs">
                      {user.displayName?.[0] || user.email?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            ) : (
              <Link href="/auth" className="hidden sm:block">
                <Button size="sm" className={`text-sm transition-colors ${
                  isScrolled 
                    ? "bg-black text-white border-black hover:bg-black/90"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm"
                }`}>
                  <User className="w-4 h-4 mr-1" />
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className={`md:hidden transition-colors ${
                isScrolled 
                  ? "text-black hover:bg-black/10" 
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 bg-black/50 backdrop-blur-sm">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "secondary" : "ghost"}
                    size="sm"
                    className={`justify-start w-full hover:bg-white/10 ${
                      isActive(item.href) 
                        ? "bg-white text-black hover:bg-white/90" 
                        : "text-white"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              ))}
              
              {/* Mobile Search */}
              <div className="pt-4 border-t border-white/20">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search sneakers..."
                    className="pl-10 w-full bg-white/10 border-white/20 text-white placeholder:text-white/70"
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}