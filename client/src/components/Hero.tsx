import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2112&h=1080" 
          alt="Premium sneakers on minimal background" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
      </div>
      
      {/* Hero Content - Pure Typography Focus */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-tight">
          Where Sole<br />
          <span className="text-primary">Meets Soul</span>
        </h1>
        <p className="text-xl sm:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
          The ultimate platform for sneaker discovery, collection, and community
        </p>
      </div>
    </section>
  );
}
