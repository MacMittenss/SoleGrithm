import { ReactNode } from "react";
import Header from "./Header";
import AIChat from "./AIChat";
import AuthModal from "./AuthModal";
import BackgroundCareFacts from "./BackgroundCareFacts";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative">
        {children}
      </main>
      <AIChat />
      <AuthModal />
      <BackgroundCareFacts />
    </div>
  );
}
