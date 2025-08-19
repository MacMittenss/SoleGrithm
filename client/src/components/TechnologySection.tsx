export default function TechnologySection() {
  const features = [
    {
      title: "8K+ Virtual Displays",
      description: "Crystal-clear visuals with unmatched pixel density for immersive experiences.",
      color: "gradient-start"
    },
    {
      title: "120Hz Refresh Rate",
      description: "Smooth, lag-free performance for gaming and professional applications.",
      color: "gradient-mid"
    },
    {
      title: "Adaptive Brightness",
      description: "Intelligent ambient light adjustment for optimal viewing in any environment.",
      color: "gradient-end"
    }
  ];

  return (
    <section className="relative py-32 bg-secondary-dark" id="technology">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Advanced XR Display Technology" 
              className="w-full rounded-2xl shadow-2xl" 
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-5xl font-bold mb-8">
              <span className="gradient-text" data-text="Revolutionary">Revolutionary</span>
              <br />
              Display Technology
            </h2>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-3 h-3 bg-${feature.color} rounded-full mt-2 flex-shrink-0`}></div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="mt-8 gradient-bg text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity"
              data-testid="button-explore-technology"
            >
              Explore Technology
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
