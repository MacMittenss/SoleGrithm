import React, { useState } from 'react';
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

interface HeaderProps {
  onAIChatToggle: () => void;
}

export default function Header({ onAIChatToggle }: HeaderProps) {
  const [location] = useLocation();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/catalog', label: 'Catalog', icon: Grid3X3 },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/discover', label: 'Discover', icon: Compass },
  ];

  const isActive = (href: string) => location === href;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SG</span>
            </div>
            <span className="text-xl font-bold text-foreground">SoleGrid</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive(item.href) ? "secondary" : "ghost"}
                  size="sm"
                  className="nav-link"
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search sneakers, brands, or collections..."
                className="pl-10 w-full"
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
              className="relative"
            >
              <MessageCircle className="w-4 h-4" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 w-2 h-2 p-0 text-xs">
                AI
              </Badge>
            </Button>

            {/* User actions */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ShoppingBag className="w-4 h-4" />
                </Button>
                <Link href="/profile">
                  <Avatar className="w-8 h-8 cursor-pointer">
                    <AvatarImage src={user.photoURL || undefined} />
                    <AvatarFallback className="text-xs">
                      {user.displayName?.[0] || user.email?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            ) : (
              <Link href="/auth">
                <Button size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "secondary" : "ghost"}
                    size="sm"
                    className="justify-start w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              ))}
              
              {/* Mobile Search */}
              <div className="pt-4 border-t border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search sneakers..."
                    className="pl-10 w-full"
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