export default function CommunitySection() {
  const communityItems = [
    {
      icon: "💬",
      title: "Discord Community",
      description: "Join our active Discord community for real-time discussions and support.",
      action: "Join Discord",
      color: "gradient-start"
    },
    {
      icon: "🎓",
      title: "SoleGrithm Academy",
      description: "Learn tips, tricks, and tutorials to master your XR experience.",
      action: "Explore Academy",
      color: "gradient-mid"
    },
    {
      icon: "👥",
      title: "Developer Forum",
      description: "Connect with developers building the future of XR applications.",
      action: "Join Forum",
      color: "gradient-end"
    }
  ];

  return (
    <section className="relative py-32" id="community">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">
            Join the
            <span className="gradient-text ml-4" data-text="Community">Community</span>
          </h2>
          <p className="text-xl text-gray-300">Connect with thousands of XR enthusiasts and innovators</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {communityItems.map((item, index) => (
            <div 
              key={index} 
              className="text-center p-8 bg-secondary-dark rounded-2xl hover:bg-gray-800 transition-colors group"
              data-testid={`card-community-${index}`}
            >
              <div className="w-16 h-16 gradient-bg rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform text-2xl">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-300 mb-4">{item.description}</p>
              <button 
                className={`text-${item.color} hover:text-gradient-end transition-colors`}
                data-testid={`button-${item.action.toLowerCase().replace(' ', '-')}`}
              >
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
