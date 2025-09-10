export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="fingerprint"></div>
      <div className="circle"></div>
      <div className="w-layout-blockcontainer container w-container">
        <div className="hero-wrapper">
          <h5 className="heading">Welcome</h5>
          <h1 className="hero-text">iDESIGNER</h1>
          <a href="#brands" className="arrow-border-wrapper w-inline-block">
            <div data-w-id="022bdf7a-1da5-487f-e90a-10a13619b2dd" className="icon-wrapper">
              <img 
                width="Auto" 
                height="Auto" 
                alt="arrow up" 
                src="images/arrow_outward.svg" 
                loading="eager" 
                data-w-id="022bdf7a-1da5-487f-e90a-10a13619b2de" 
                className="arrow" 
              />
            </div>
          </a>
        </div>
        <div className="hero-overlay"></div>
      </div>
      <div 
        data-w-id="769eaa28-9e57-8d2b-bd19-a0fd96681ba3" 
        style={{opacity: 0}} 
        className="spline" 
        data-animation-type="spline" 
        data-spline-url="https://prod.spline.design/fP0LH65i8bXQDQjZ/scene.splinecode"
      >
        <canvas></canvas>
      </div>
    </section>
  );
}