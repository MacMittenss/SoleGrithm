export default function AwardsSection() {
  const awards = [
    {
      icon: "🏆",
      title: "CES Innovation Award",
      year: "2024 Winner"
    },
    {
      icon: "🏅",
      title: "Red Dot Design Award",
      year: "2024 Winner"
    },
    {
      icon: "⭐",
      title: "Best XR Innovation",
      year: "Tech Awards 2024"
    }
  ];

  const reviews = [
    {
      rating: 5,
      text: "SoleGrithm represents the future of XR display technology. The visual quality is simply unmatched.",
      source: "TechCrunch",
      badge: "Editor's Choice 2024",
      badgeColor: "gradient-start"
    },
    {
      rating: 5,
      text: "A breakthrough in XR technology that sets a new standard for the industry.",
      source: "The Verge",
      badge: "Best of 2024",
      badgeColor: "gradient-end"
    }
  ];

  return (
    <section className="relative py-32" id="awards">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text" data-text="Awards &">Awards &</span>
            <br />
            Recognition
          </h2>
          <p className="text-xl text-gray-300">Industry-leading innovation recognized globally</p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {awards.map((award, index) => (
            <div key={index} className="text-center p-8 bg-secondary-dark rounded-2xl" data-testid={`card-award-${index}`}>
              <div className="w-16 h-16 gradient-bg rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                {award.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{award.title}</h3>
              <p className="text-gray-300">{award.year}</p>
            </div>
          ))}
        </div>

        {/* Review Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-secondary-dark p-8 rounded-2xl" data-testid={`card-review-${index}`}>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-xl">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <span className="ml-2 text-gray-300">{review.source}</span>
              </div>
              <p className="text-lg mb-4">"{review.text}"</p>
              <div className={`text-${review.badgeColor} font-semibold`}>{review.badge}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
