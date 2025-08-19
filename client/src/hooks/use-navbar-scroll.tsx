import { useEffect } from "react";

export function useNavbarScroll() {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.style.background = 'rgba(0, 0, 0, 0.9)';
          navbar.style.backdropFilter = 'blur(20px)';
        } else {
          navbar.style.background = 'transparent';
          navbar.style.backdropFilter = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
