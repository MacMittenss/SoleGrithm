import { useEffect } from "react";

export function useScrollAnimations() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all split-text elements
    document.querySelectorAll('.split-text').forEach(el => {
      observer.observe(el);
    });

    // Add hover effects for gradient text
    document.querySelectorAll('.gradient-text').forEach(el => {
      const element = el as HTMLElement;
      element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.05)';
        element.style.transition = 'transform 0.3s ease';
      });
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
      });
    });

    // Product card hover effects
    document.querySelectorAll('.group').forEach(card => {
      const element = card as HTMLElement;
      element.addEventListener('mouseenter', () => {
        element.style.transform = 'translateY(-10px)';
      });
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translateY(0)';
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}
