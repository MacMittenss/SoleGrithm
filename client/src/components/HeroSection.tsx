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
            <div className="icon-wrapper">
              <img
                width="Auto"
                height="Auto"
                alt="arrow up"
                src="images/arrow_outward.svg"
                loading="eager"
                className="arrow"
              />
            </div>
          </a>
        </div>
        <div className="hero-overlay"></div>
      </div>
      <div
        style={{opacity: 0}}
        className="spline"
        data-animation-type="spline"
      >
        <canvas></canvas>
      </div>
    </section>
  );
}