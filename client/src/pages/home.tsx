import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import TechnologySection from "@/components/TechnologySection";
import AwardsSection from "@/components/AwardsSection";
import UseCasesSection from "@/components/UseCasesSection";
import MarqueeSection from "@/components/MarqueeSection";
import CommunitySection from "@/components/CommunitySection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import Minimap from "@/components/Minimap";
import { useScrollAnimations } from "@/hooks/use-scroll-animations";
import { useNavbarScroll } from "@/hooks/use-navbar-scroll";

export default function Home() {
  useScrollAnimations();
  useNavbarScroll();

  useEffect(() => {
    // Add smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(target.getAttribute('href')!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="bg-dark text-white font-season overflow-x-hidden">
      <Preloader />
      <Minimap />
      
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end py-3 px-6 text-center text-sm font-medium">
        <div className="flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="text-white">
            <path d="M12.5 8.5a.5.5 0 0 1-.5.5h-2.5v2.5a.5.5 0 0 1-1 0V9H6a.5.5 0 0 1 0-1h2.5V5.5a.5.5 0 0 1 1 0V8H12a.5.5 0 0 1 .5.5z"/>
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm13 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h13z"/>
          </svg>
          <span>Leading the Way in XR Display Technology: </span>
          <span className="font-bold">Revolutionary Visual Experience</span>
        </div>
      </div>

      <Navigation />
      <main className="relative flex flex-col">
        <Hero />
        <ProductShowcase />
        <TechnologySection />
        <AwardsSection />
        <UseCasesSection />
        <MarqueeSection />
        <CommunitySection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
