import React, { useState, useEffect, lazy, Suspense } from "react";
import { Router, Route, Switch, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ThemeProvider } from "next-themes";
// Auth will be handled via Firebase directly
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import AIChat from "@/components/AIChat";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { SkipLinks } from "@/components/accessibility/SkipToContent";
import { PageTransition } from "@/components/transitions/PageTransition";
import { useNotifications } from '@/hooks/useNotifications';
import { ToastContainer } from '@/components/ui/notification-toast';

// Pages
import Home from "@/pages/Home";
import Catalog from "@/pages/Catalog";
import Blog from "@/pages/Blog";
import Profile from "@/pages/Profile";
import Auth from "@/pages/Auth";
import SneakerDetail from "@/pages/SneakerDetail";
import PostDetail from "@/pages/PostDetail";
import NotFound from "@/pages/not-found";
import Discover from "@/pages/Discover";
import SneakerQuiz from "@/pages/SneakerQuiz";
import VisualSearch from "@/pages/VisualSearch";
import Collections from "@/pages/Collections";
import ARTryOn from "@/pages/ARTryOn";
import ReviewSummaryDemo from "@/pages/ReviewSummaryDemo";
import TrendMap from "@/pages/TrendMap";
import Testing from "@/pages/Testing";
import WomenInSneakers from "@/pages/WomenInSneakers";

// Lazy load LiveMarket component
const LiveMarket = lazy(() => import("@/pages/LiveMarket"));



// Component to handle scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function App() {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const { notifications, removeNotification } = useNotifications();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {/* AuthProvider removed - using Firebase directly */}
          <Router>
            <div className="min-h-screen bg-background text-foreground">
              <SkipLinks />
              <ScrollToTop />
              <Header onAIChatToggle={() => setIsAIChatOpen(!isAIChatOpen)} />
              <MobileNavigation />
              
              <main id="main-content">
                <PageTransition>
                  <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/auth" component={Auth} />
                    {/* Redirect Catalog to Live Market */}
                    <Route path="/catalog">
                    <Suspense fallback={
                      <div className="min-h-screen bg-background flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                          <p className="text-muted-foreground">Loading Live Market...</p>
                        </div>
                      </div>
                    }>
                      <LiveMarket />
                    </Suspense>
                  </Route>
                  {/* Live Market page */}
                  <Route path="/live-market">
                    <Suspense fallback={
                      <div className="min-h-screen bg-background flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                          <p className="text-muted-foreground">Loading Live Market...</p>
                        </div>
                      </div>
                    }>
                      <LiveMarket />
                    </Suspense>
                  </Route>
                  <Route path="/blog" component={Blog} />
                  <Route path="/blog/:slug" component={PostDetail} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/collection" component={Profile} />
                  <Route path="/sneakers/:slug" component={SneakerDetail} />
                  <Route path="/discover" component={Discover} />
                  <Route path="/quiz" component={SneakerQuiz} />
                  <Route path="/visual-search" component={VisualSearch} />
                  <Route path="/collections" component={Collections} />
                  <Route path="/review-summary" component={ReviewSummaryDemo} />
                  <Route path="/ar-tryon" component={ARTryOn} />
                  <Route path="/trend-map" component={TrendMap} />
                  <Route path="/testing" component={Testing} />
                  <Route path="/women-in-sneakers" component={WomenInSneakers} />
                  <Route component={NotFound} />
                </Switch>
                </PageTransition>
              </main>

              <AIChat 
                isOpen={isAIChatOpen} 
                onClose={() => setIsAIChatOpen(false)} 
              />
              
              <Toaster />
              <ToastContainer 
                toasts={notifications} 
                position="top-right" 
              />
            </div>
          </Router>
        {/* End AuthProvider */}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
