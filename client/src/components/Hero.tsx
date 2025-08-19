export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-start rounded-full blur-gradient animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-end rounded-full blur-gradient animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-mid rounded-full blur-gradient animate-float" style={{ animationDelay: '-4s' }}></div>
      </div>
      
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <div className="split-text mb-8">
          <h1 className="text-6xl md:text-8xl font-bold leading-tight">
            <span className="block">IMMERSION</span>
            <span className="block">LIKE NO</span>
            <span className="block gradient-text" data-text="OTHER">OTHER</span>
          </h1>
        </div>
        
        <div className="split-text mb-12" style={{ animationDelay: '0.2s' }}>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of XR display technology with SoleGrithm 2.0. 
            Revolutionary visual fidelity meets cutting-edge innovation.
          </p>
        </div>
        
        <div className="split-text flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.4s' }}>
          <button 
            className="gradient-bg text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity animate-pulse-glow"
            data-testid="button-experience"
          >
            Experience SoleGrithm
          </button>
          <button 
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all"
            data-testid="button-learn-more"
          >
            Learn More
          </button>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
