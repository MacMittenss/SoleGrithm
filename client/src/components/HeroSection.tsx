import { useEffect, useRef, useState } from "react";
import "@/hero-idesigner.css";

const SPLINE_SCENE_URL = "https://prod.spline.design/fP0LH65i8bXQDQjZ/scene.splinecode";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let app: import("@splinetool/runtime").Application | undefined;
    let cancelled = false;

    (async () => {
      const { Application } = await import("@splinetool/runtime");
      if (cancelled || !canvasRef.current) return;
      app = new Application(canvasRef.current);
      await app.load(SPLINE_SCENE_URL);
    })();

    return () => {
      cancelled = true;
      app?.dispose();
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="idh-section">
      <div className="idh-fingerprint"></div>
      <div className="idh-circle"></div>
      <div className="idh-container">
        <div className="idh-wrapper">
          <h5 className="idh-heading">Welcome to</h5>
          <h1 className="idh-title">SOLEGRITHM</h1>
          <a href="#brands" className="idh-arrow-wrapper">
            <div className="idh-icon-wrapper">
              <img
                width="Auto"
                height="Auto"
                alt="arrow up"
                src="/images/arrow_outward.svg"
                loading="eager"
                className="idh-arrow"
              />
            </div>
          </a>
        </div>
        <div className="idh-overlay"></div>
      </div>
      <div
        className="idh-spline"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}
      >
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </section>
  );
}
