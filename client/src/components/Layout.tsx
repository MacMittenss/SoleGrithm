import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AIChat from "./AIChat";
import AuthModal from "./AuthModal";
import { handleRedirectResult } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { setUser } = useAuth();

  useEffect(() => {
    // Handle Firebase redirect result
    const handleAuthRedirect = async () => {
      try {
        const result = await handleRedirectResult();
        if (result?.user) {
          setUser(result.user);
        }
      } catch (error) {
        console.error('Auth redirect error:', error);
      }
    };

    handleAuthRedirect();
  }, [setUser]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <AIChat />
      <AuthModal />
    </div>
  );
}
