export default function MarqueeSection() {
  const marqueeItems = [
    "SoleGrithm 2.0",
    "Revolutionary Display",
    "XR Innovation",
    "Future Vision"
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(4)].map((_, setIndex) => (
          <div key={setIndex} className="flex">
            {marqueeItems.map((item, index) => (
              <span 
                key={`${setIndex}-${index}`}
                className={`text-6xl font-bold mx-8 ${
                  item === "Revolutionary Display" || item === "Future Vision" 
                    ? "gradient-text" 
                    : "text-gray-800"
                }`}
                data-text={item === "Revolutionary Display" || item === "Future Vision" ? item : undefined}
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
