import React, { useState, useEffect } from "react";
import { Router, Route, Switch, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import AIChat from "@/components/AIChat";

// Pages
import Home from "@/pages/Home";
import Catalog from "@/pages/Catalog";
import Blog from "@/pages/Blog";
import Profile from "@/pages/Profile";
import SneakerDetail from "@/pages/SneakerDetail";
import PostDetail from "@/pages/PostDetail";
import NotFound from "@/pages/not-found";
import Discover from "@/pages/Discover";
import SneakerQuiz from "@/pages/SneakerQuiz";
import VisualSearch from "@/pages/VisualSearch";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

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

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-background text-foreground">
              <ScrollToTop />
              <Header onAIChatToggle={() => setIsAIChatOpen(!isAIChatOpen)} />
              
              <main>
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/catalog" component={Catalog} />
                  <Route path="/blog" component={Blog} />
                  <Route path="/blog/:slug" component={PostDetail} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/collection" component={Profile} />
                  <Route path="/sneakers/:slug" component={SneakerDetail} />
                  <Route path="/discover" component={Discover} />
                  <Route path="/quiz" component={SneakerQuiz} />
                  <Route path="/visual-search" component={VisualSearch} />
                  <Route component={NotFound} />
                </Switch>
              </main>

              <AIChat 
                isOpen={isAIChatOpen} 
                onClose={() => setIsAIChatOpen(false)} 
              />
              
              <Toaster />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
