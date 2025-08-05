import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { 
  Home, 
  Search, 
  ShoppingBag, 
  User, 
  Heart,
  TrendingUp,
  Compass,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const navigationItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Discover', href: '/discover', icon: Compass },
  { name: 'Live Market', href: '/live-market', icon: TrendingUp },
  { name: 'Collections', href: '/collections', icon: Heart },
  { name: 'Profile', href: '/profile', icon: User }
];

export function MobileNavigation() {
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeItemIndex = navigationItems.findIndex(item => 
    item.href === '/' ? location === '/' : location.startsWith(item.href)
  );

  return (
    <>
      {/* Bottom Navigation Bar */}
      <motion.nav
        className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border md:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === activeItemIndex;
            
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={cn(
                    "relative flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute -top-1 w-6 h-1 bg-primary rounded-full"
                      layoutId="mobile-nav-indicator"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  <Icon className={cn(
                    "h-5 w-5 mb-1 transition-transform",
                    isActive && "scale-110"
                  )} />
                  
                  <span className={cn(
                    "text-xs font-medium",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>
                    {item.name}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.nav>

      {/* Hamburger Menu for Additional Options */}
      <motion.button
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileTap={{ scale: 0.95 }}
        data-testid="mobile-menu-toggle"
      >
        <AnimatePresence mode="wait">
          {isMenuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 z-50 h-full w-80 bg-background border-l border-border shadow-xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <div className="p-6 space-y-6">
                <div className="text-lg font-semibold">Menu</div>
                
                <div className="space-y-4">
                  <Link href="/visual-search">
                    <motion.div
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Search className="h-5 w-5" />
                      <span>Visual Search</span>
                    </motion.div>
                  </Link>
                  
                  <Link href="/ai-chat">
                    <motion.div
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Compass className="h-5 w-5" />
                      <span>AI Assistant</span>
                    </motion.div>
                  </Link>
                  
                  <Link href="/wishlist">
                    <motion.div
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Heart className="h-5 w-5" />
                      <span>Wishlist</span>
                    </motion.div>
                  </Link>
                  
                  {!isAuthenticated && (
                    <motion.div
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        window.location.href = '/api/login';
                        setIsMenuOpen(false);
                      }}
                    >
                      <User className="h-5 w-5" />
                      <span>Sign In</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}