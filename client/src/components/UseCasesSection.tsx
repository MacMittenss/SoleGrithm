export default function UseCasesSection() {
  const useCases = [
    {
      id: 'gaming',
      title: 'Gaming',
      description: 'Immersive gaming experiences',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
    },
    {
      id: 'productivity',
      title: 'Productivity',
      description: 'Enhanced workflow efficiency',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
    },
    {
      id: 'entertainment',
      title: 'Entertainment',
      description: 'Cinematic viewing experience',
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
    },
    {
      id: 'creative',
      title: 'Creative',
      description: 'Design and content creation',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300'
    }
  ];

  return (
    <section className="relative py-32 bg-secondary-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">
            Endless
            <span className="gradient-text ml-4" data-text="Possibilities">Possibilities</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase) => (
            <div key={useCase.id} className="text-center group" data-testid={`card-usecase-${useCase.id}`}>
              <img 
                src={useCase.image} 
                alt={`${useCase.title} with XR Display`} 
                className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" 
              />
              <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
              <p className="text-gray-300">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
