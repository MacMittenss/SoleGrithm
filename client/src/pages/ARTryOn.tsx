import React, { useState, useRef, useEffect } from 'react';

export default function ARTryOn() {
  // AR session state
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulate AR session object for template compatibility
  const arSession = { isActive };

  // Camera initialization logic
  const initializeCamera = async () => {
    setLoading(true);
    setError(null);
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsActive(true);
    } catch (err: any) {
      setError('Unable to access camera. Please allow camera permissions.');
    } finally {
      setLoading(false);
    }
  };

  // Stop camera and AR session
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
  };

  useEffect(() => {
    // Clean up camera on unmount
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <>
      <style>{`
        html, body, #root {
          background: #000 !important;
          min-height: 100vh !important;
          height: 100%;
          margin: 0;
          padding: 0;
        }
      `}</style>
      <main className="main" style={{ background: 'var(--primary, #000)', minHeight: '100vh', minWidth: 0, margin: 0, padding: 0, height: '100%' }}>
      {/* Hero Section */}
      <section className="section hero background-black min-h-[80vh] flex flex-col justify-center">
        <div className="w-layout-blockcontainer container padding-9rem w-container flex flex-col items-center justify-center min-h-[70vh]">
          {/* Header and Subheader at Top, centered */}
          <div className="mb-10 mt-8 w-full flex flex-col items-center justify-center">
            <h1 className="font-c hero-text text-white text-4xl font-bold mb-4 text-center w-full">AR Try-On</h1>
            <p className="par-base text-white/80 text-lg text-center w-full">
              Experience sneakers on your feet in real time using Augmented Reality. Enable your camera and see how the latest drops look on you—no app required!
            </p>
          </div>
          {/* Phone and Sneaker List Row */}
          <div className="flex flex-col md:flex-row gap-12 items-center justify-center grow md:justify-center md:items-center min-h-[40vh] px-8 md:px-24 w-full">
            {/* Phone Mockup */}
            <div className="flex justify-end md:w-auto md:justify-end">
              <div className="mockup-phone scale-90">
                <div className="mockup-phone-camera"></div>
                <div className="mockup-phone-display bg-gradient-to-b from-blue-500/10 to-purple-500/10 relative overflow-hidden flex items-center justify-center">
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
                    {!arSession.isActive ? (
                      <button
                        className="btn-link btn w-full"
                        style={{ background: '#000', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: 8, fontWeight: 600, fontSize: 16, border: '1px solid #fff', boxShadow: '0 2px 8px #0002' }}
                        onClick={initializeCamera}
                        disabled={loading}
                      >
                        {loading ? 'Starting Camera...' : 'Start AR Try-On'}
                      </button>
                    ) : (
                      <button
                        className="btn-link btn w-full"
                        style={{ background: '#000', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: 8, fontWeight: 600, fontSize: 16, border: '1px solid #fff', boxShadow: '0 2px 8px #0002' }}
                        onClick={stopCamera}
                      >
                        Stop AR
                      </button>
                    )}
                    {error && <p style={{ color: 'red', marginTop: 12 }}>{error}</p>}
                    <div className="w-full mt-6 flex flex-col items-center justify-center">
                      {arSession.isActive ? (
                        <>
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 12, background: '#111' }}
                          />
                          <canvas
                            ref={canvasRef}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 220, pointerEvents: 'none' }}
                          />
                        </>
                      ) : (
                        <div style={{ color: 'var(--white)', textAlign: 'center', padding: '2rem 0' }}>
                          <span style={{ fontSize: 36, opacity: 0.5 }}>🎥</span>
                          <div style={{ fontWeight: 500, marginTop: 8 }}>Camera Not Active</div>
                          <div style={{ fontSize: 13, opacity: 0.7 }}>Start your AR session to begin trying on sneakers</div>
                        </div>
                      )}
                      <div style={{ color: 'var(--white)', fontSize: 11, opacity: 0.7, marginTop: 8 }}>*Camera access required for AR features</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Sneaker Selection List + AR Tips stacked below */}
            <div className="flex-1 flex flex-col items-center md:items-start justify-center md:justify-center w-full max-w-xs">
              <h2 className="font-c text-white text-2xl font-bold mb-2 text-center md:text-left">Select a Sneaker</h2>
              <ul className="w-full space-y-2 mb-10">
                <li>
                  <button className="w-full text-left px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition">Nike Air Max 1</button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition">Adidas Yeezy Boost</button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition">New Balance 550</button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition">Jordan 1 Retro</button>
                </li>
              </ul>
              {/* AR Tips stacked below sneaker selection */}
              <div className="flex flex-col items-center justify-center w-full">
                <h2 className="font-c text-white text-2xl font-bold mb-4 text-center">AR Try-On Tips</h2>
                <div className="flex flex-col gap-4 w-full max-w-xs justify-center">
                  <div className="metrics-block" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 24, minWidth: 180 }}>
                    <h3 style={{ color: 'var(--white)', fontWeight: 700, fontSize: 17, marginBottom: 6 }}>1. Enable Camera</h3>
                    <p style={{ color: 'var(--white)', opacity: 0.8, fontSize: 14 }}>Grant camera access to start the AR experience.</p>
                  </div>
                  <div className="metrics-block" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 24, minWidth: 180 }}>
                    <h3 style={{ color: 'var(--white)', fontWeight: 700, fontSize: 17, marginBottom: 6 }}>2. Position Feet</h3>
                    <p style={{ color: 'var(--white)', opacity: 0.8, fontSize: 14 }}>Point your camera at your feet for best results.</p>
                  </div>
                  <div className="metrics-block" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 24, minWidth: 180 }}>
                    <h3 style={{ color: 'var(--white)', fontWeight: 700, fontSize: 17, marginBottom: 6 }}>3. Try On Sneakers</h3>
                    <p style={{ color: 'var(--white)', opacity: 0.8, fontSize: 14 }}>See sneakers appear on your feet in real time!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
  <section className="section border-t border-white/10" style={{ background: '#000' }}>
        <div className="w-layout-blockcontainer container py-8 md:py-12 w-container" style={{ textAlign: 'center' }}>
          <h2 className="font-c" style={{ color: 'var(--white)', fontSize: 32, fontWeight: 700, marginBottom: 16 }}>How It Works</h2>
          <div className="metrics-wrapper" style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', margin: '1rem 0' }}>
            <div className="metrics-block" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 32, minWidth: 200 }}>
              <h3 style={{ color: 'var(--white)', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>1. Enable Camera</h3>
              <p style={{ color: 'var(--white)', opacity: 0.8 }}>Grant camera access to start the AR experience.</p>
            </div>
            <div className="metrics-block" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 32, minWidth: 200 }}>
              <h3 style={{ color: 'var(--white)', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>2. Position Feet</h3>
              <p style={{ color: 'var(--white)', opacity: 0.8 }}>Point your camera at your feet for best results.</p>
            </div>
            <div className="metrics-block" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 32, minWidth: 200 }}>
              <h3 style={{ color: 'var(--white)', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>3. Try On Sneakers</h3>
              <p style={{ color: 'var(--white)', opacity: 0.8 }}>See sneakers appear on your feet in real time!</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}