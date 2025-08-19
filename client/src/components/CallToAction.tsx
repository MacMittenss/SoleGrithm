export default function CallToAction() {
  return (
    <section className="relative py-32 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          Ready to Experience
          <br />
          the Future?
        </h2>
        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Join thousands of users who have already transformed their digital experience with SoleGrithm 2.0.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            className="bg-white text-gradient-start px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
            data-testid="button-order-solegrithm"
          >
            Order SoleGrithm 2.0
          </button>
          <button 
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gradient-start transition-all"
            data-testid="button-schedule-demo"
          >
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
}
