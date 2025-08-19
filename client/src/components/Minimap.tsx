import { useState, useEffect } from "react";

export default function Minimap() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollPosition / documentHeight;
      setScrollPercent(percent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const minimapHeight = 300;
  const indicatorHeight = 20;
  const maxTop = minimapHeight - indicatorHeight;
  const indicatorTop = scrollPercent * maxTop;

  return (
    <div className="minimap hidden lg:block">
      <div 
        className="minimap-indicator" 
        style={{ top: `${indicatorTop}px` }}
        id="minimapIndicator"
      ></div>
    </div>
  );
}
