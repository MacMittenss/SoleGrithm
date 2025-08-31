import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const [currentReview, setCurrentReview] = useState(0);
  
  const reviews = [
    {
      text: "I was blown away by his creativity in creating a memorable brand identity. His design work has helped us stand out.",
      name: "Davis Jones",
      role: "entrepreneur",
      image: "https://uploads-ssl.webflow.com/66a5f61b61b9f0a48636c965/66a5f61b61b9f0a48636ca00_Reviews3.jpg"
    },
    {
      text: "It was a pleasure working on a design project and I must say that the experience exceeded all my expectations.",
      name: "Jacob Black",
      role: "Director",
      image: "https://uploads-ssl.webflow.com/66a5f61b61b9f0a48636c965/66a5f61b61b9f0a48636c9f7_Reviews1.jpg"
    },
    {
      text: "I couldn't be happier with the results of our collaboration. He took our vision and brought it to life.",
      name: "Maria Smith",
      role: "Manager",
      image: "https://uploads-ssl.webflow.com/66a5f61b61b9f0a48636c965/66a5f61b61b9f0a48636ca05_Reviews2.jpg"
    }
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center bg-white overflow-hidden">
        {/* Background decorative elements */}
        <div className="fingerprint absolute opacity-10"></div>
        <div className="circle absolute opacity-10"></div>
        
        <div className="template-container relative z-10">
          <div className="hero-wrapper text-center">
            <h5 className="text-sm font-medium text-gray-600 tracking-wider uppercase mb-4">Welcome</h5>
            <h1 className="hero-text text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-black mb-8 tracking-tight">
              iDESIGNER
            </h1>
            <a href="#brands" className="arrow-border-wrapper inline-flex items-center justify-center w-16 h-16 border border-black rounded-full hover:bg-black hover:text-white transition-colors group">
              <div className="icon-wrapper">
                <ArrowRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="section py-24">
        <div className="template-container">
          <div className="space-y-16">
            <div className="brands-wrapper">
              <div className="brands-grid grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                <div className="logos-wrapper flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                  <div className="w-24 h-8 bg-gray-300 rounded"></div>
                </div>
                <div className="logos-wrapper flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                  <div className="w-24 h-8 bg-gray-300 rounded"></div>
                </div>
                <div className="logos-wrapper flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                  <div className="w-24 h-8 bg-gray-300 rounded"></div>
                </div>
                <div className="logos-wrapper flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                  <div className="w-24 h-8 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="brands-grid grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="logos-wrapper flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                  <div className="w-24 h-8 bg-gray-300 rounded"></div>
                </div>
                <div className="logos-wrapper flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                  <div className="w-24 h-8 bg-gray-300 rounded"></div>
                </div>
                <div className="logos-wrapper flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                  <div className="w-24 h-8 bg-gray-300 rounded"></div>
                </div>
                <div className="logos-wrapper flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                  <div className="w-24 h-8 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section py-24">
        <div className="template-container">
          <div className="services-flex grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="services-wrapper space-y-8">
              <div className="services-card bg-white p-8 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="services-title-flex flex items-start space-x-4 mb-4">
                  <div className="services-icon w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0"></div>
                  <h4 className="text-lg font-semibold uppercase tracking-wider">BRANDING</h4>
                </div>
                <div className="services-text-block">
                  <p className="text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis, dolor sed consectetur gravida.</p>
                </div>
              </div>
              
              <div className="services-card bg-white p-8 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="services-title-flex flex items-start space-x-4 mb-4">
                  <div className="services-icon w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0"></div>
                  <h4 className="text-lg font-semibold uppercase tracking-wider">MARKETING</h4>
                </div>
                <div className="services-text-block">
                  <p className="text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis, dolor sed consectetur gravida.</p>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed max-w-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis, dolor sed consectetur gravida.</p>
            </div>
            
            <div className="services-wrapper space-y-8">
              <div className="mb-8">
                <h5 className="text-sm font-medium text-gray-600 tracking-wider uppercase mb-2">Creative Solutions</h5>
                <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight">SERVICES</h2>
              </div>
              
              <div className="services-card bg-white p-8 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="services-title-flex flex items-start space-x-4 mb-4">
                  <div className="services-icon w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0"></div>
                  <h4 className="text-lg font-semibold uppercase tracking-wider">DEVELOPMENT</h4>
                </div>
                <div className="services-text-block">
                  <p className="text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis, dolor sed consectetur gravida.</p>
                </div>
              </div>
              
              <div className="services-card bg-white p-8 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="services-title-flex flex items-start space-x-4 mb-4">
                  <div className="services-icon w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0"></div>
                  <h4 className="text-lg font-semibold uppercase tracking-wider">DESIGN</h4>
                </div>
                <div className="services-text-block">
                  <p className="text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis, dolor sed consectetur gravida.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section className="section py-24">
        <div className="template-container">
          <div className="works-title-wrapper text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-bold text-black">My Works</h2>
          </div>
        </div>
      </section>

      {/* Works Gallery Section */}
      <section className="section bg-black py-24">
        <div className="template-container">
          <div className="works-wrapper">
            <div className="works-block">
              <a href="#" className="works-link-wrapper block group">
                <div className="works-icon-wrapper absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <h5 className="text-white font-medium">View Work</h5>
                </div>
                <div className="works-image-wrapper relative overflow-hidden rounded-lg">
                  <div className="w-full h-64 bg-gray-700 rounded-lg"></div>
                </div>
              </a>
              <div className="works-text-block mt-6">
                <h3 className="text-white text-xl font-semibold mb-4 uppercase tracking-wider">PROJECT NAME</h3>
                <div className="works-flex flex space-x-2">
                  <div className="works-badge bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                    <h5>Design</h5>
                  </div>
                  <div className="works-badge bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                    <h5>Branding</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="section py-24">
        <div className="template-container">
          <div className="metrics-wrapper grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="metrics-block">
              <h2 className="text-6xl font-bold text-black mb-2">124</h2>
              <p className="text-gray-600 text-lg">Customers</p>
            </div>
            <div className="metrics-block">
              <h2 className="text-6xl font-bold text-black mb-2">7</h2>
              <p className="text-gray-600 text-lg">Awards</p>
            </div>
            <div className="metrics-block">
              <h2 className="text-6xl font-bold text-black mb-2">85</h2>
              <p className="text-gray-600 text-lg">Projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section py-24">
        <div className="template-container">
          <div className="reviews-slider relative max-w-4xl mx-auto text-center">
            <div className="slide">
              <div className="reviews-slide">
                <Quote className="w-8 h-8 text-gray-400 mx-auto mb-6" />
                <h4 className="text-xl md:text-2xl text-gray-800 mb-8 leading-relaxed">
                  {reviews[currentReview].text}
                </h4>
                <img 
                  width="64" 
                  height="64" 
                  alt={reviews[currentReview].name}
                  src={reviews[currentReview].image}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <div className="review-name-block">
                  <h5 className="text-lg font-semibold text-black">{reviews[currentReview].name}</h5>
                  <h5 className="text-gray-600 capitalize">{reviews[currentReview].role}</h5>
                </div>
              </div>
            </div>
            
            {/* Navigation arrows */}
            <div className="flex justify-center space-x-4 mt-8">
              <button 
                onClick={prevReview}
                className="reviews-arrow p-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextReview}
                className="reviews-arrow p-3 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Dots indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentReview ? 'bg-black' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="section py-24">
        <div className="template-container">
          <div className="cta-block flex flex-col lg:flex-row items-center justify-between bg-gray-50 rounded-2xl p-12">
            <div className="cta-text-block mb-8 lg:mb-0">
              <h5 className="text-sm font-medium text-gray-600 tracking-wider uppercase mb-4">Contact me</h5>
              <div className="flex items-center space-x-4 mb-2">
                <h2 className="text-6xl md:text-7xl font-bold text-black">GET IN</h2>
                <ArrowRight className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 outline-text">
                TOUCH
              </h2>
            </div>
            <Link href="/contact">
              <button className="group relative bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors overflow-hidden">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Contact</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section bg-black text-white py-24">
        <div className="template-container">
          <div className="footer-top flex flex-col lg:flex-row justify-between mb-16">
            <div className="footer-block mb-8 lg:mb-0">
              <Link href="/" className="footer-logo-link-wrapper inline-block mb-8">
                <div className="text-2xl font-bold text-white">iDESIGNER</div>
              </Link>
              <div className="socials-wrapper flex space-x-4 mb-6">
                <a href="https://www.youtube.com/" target="_blank" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <div className="w-4 h-4 bg-white rounded"></div>
                </a>
                <a href="https://www.instagram.com/" target="_blank" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <div className="w-4 h-4 bg-white rounded"></div>
                </a>
                <a href="https://www.tiktok.com/en/" target="_blank" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <div className="w-4 h-4 bg-white rounded"></div>
                </a>
              </div>
              <p className="text-gray-400 max-w-xs">Beautiful design has the power to captivate audiences</p>
            </div>
            
            <div className="footer-right-flex grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="footer-wrapper">
                <h5 className="text-white font-semibold mb-4">Main</h5>
                <div className="space-y-2">
                  <div className="footer-link-wrapper">
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
                  </div>
                  <div className="footer-link-wrapper">
                    <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
                  </div>
                  <div className="footer-link-wrapper">
                    <Link href="/works" className="text-gray-400 hover:text-white transition-colors">Works</Link>
                  </div>
                </div>
              </div>
              
              <div className="footer-wrapper">
                <h5 className="text-white font-semibold mb-4">Pages</h5>
                <div className="space-y-2">
                  <div className="footer-link-wrapper">
                    <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
                  </div>
                  <div className="footer-link-wrapper">
                    <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link>
                  </div>
                  <div className="footer-link-wrapper">
                    <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                  </div>
                </div>
              </div>
              
              <div className="footer-wrapper">
                <h5 className="text-white font-semibold mb-4">Utilities</h5>
                <div className="space-y-2">
                  <div className="footer-link-wrapper">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Style Guide</a>
                  </div>
                  <div className="footer-link-wrapper">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Instructions</a>
                  </div>
                  <div className="footer-link-wrapper">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Licenses</a>
                  </div>
                  <div className="footer-link-wrapper">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Changelog</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-line border-t border-gray-800 mb-8"></div>
          
          <div className="footer-bottom flex flex-col lg:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 lg:mb-0">© 2024 iDESIGNER. All Rights Reserved.</p>
            <div className="footer-flex flex space-x-8">
              <div className="footer-flex-bottom flex items-center space-x-2">
                <p className="text-gray-400">Powered By</p>
                <a href="https://webflow.com/" target="_blank" className="text-white hover:text-gray-300 transition-colors">
                  Webflow
                </a>
              </div>
              <div className="footer-flex-bottom flex items-center space-x-2">
                <p className="text-gray-400">Built By</p>
                <a href="#" target="_blank" className="text-white hover:text-gray-300 transition-colors">
                  Rick Mummery
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}