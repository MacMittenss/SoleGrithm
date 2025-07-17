import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import SneakerDetail from "./pages/SneakerDetail";
import Blog from "./pages/Blog";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import Collection from "./pages/Collection";
import Discover from "./pages/Discover";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/sneakers/:slug" component={SneakerDetail} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={PostDetail} />
      <Route path="/profile" component={Profile} />
      <Route path="/collection" component={Collection} />
      <Route path="/discover" component={Discover} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <AuthProvider>
            <Layout>
              <Router />
            </Layout>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
