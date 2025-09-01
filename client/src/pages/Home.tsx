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
        <div className="fingerprint absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10c22.091 0 40 17.909 40 40S72.091 90 50 90 10 72.091 10 50 27.909 10 50 10z' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3Cpath d='M50 20c16.569 0 30 13.431 30 30s-13.431 30-30 30-30-13.431-30-30 13.431-30 30-30z' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3Cpath d='M50 30c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20z' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          backgroundPosition: '20% 30%',
          backgroundRepeat: 'no-repeat'
        }}></div>
        <div className="circle absolute top-1/4 right-1/4 w-96 h-96 opacity-3" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='%23000' stroke-width='0.3'/%3E%3Ccircle cx='50' cy='50' r='30' fill='none' stroke='%23000' stroke-width='0.3'/%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='%23000' stroke-width='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}></div>
        
        <div className="w-layout-blockcontainer container w-container relative z-10">
          <div className="hero-wrapper text-center">
            <h5 className="heading text-sm font-medium text-gray-600 tracking-wider uppercase mb-4">Welcome</h5>
            <h1 className="hero-text text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-black mb-8 tracking-tight">
              iDESIGNER
            </h1>
            <a href="#brands" className="arrow-border-wrapper w-inline-block inline-flex items-center justify-center w-16 h-16 border border-black rounded-full hover:bg-black hover:text-white transition-colors group">
              <div className="icon-wrapper">
                <ArrowRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform arrow" />
              </div>
            </a>
          </div>
          <div className="hero-overlay absolute inset-0 pointer-events-none"></div>
        </div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="section">
        <div className="w-layout-blockcontainer container padding-4-5rem w-container">
          <div className="space-7rem"></div>
          <div className="brands-wrapper">
            <div className="brands-grid slide-up-animation grid grid-cols-4 gap-8 mb-8">
              <div className="logos-wrapper flex items-center justify-center h-24 bg-gray-50 rounded-lg p-4">
                <svg className="w-full h-full text-gray-400" viewBox="0 0 100 50" fill="currentColor">
                  <text x="50" y="30" textAnchor="middle" className="text-sm font-semibold">BRAND</text>
                </svg>
              </div>
              <div className="logos-wrapper flex items-center justify-center h-24 bg-gray-50 rounded-lg p-4">
                <svg className="w-full h-full text-gray-400" viewBox="0 0 100 50" fill="currentColor">
                  <text x="50" y="30" textAnchor="middle" className="text-sm font-semibold">LOGO</text>
                </svg>
              </div>
              <div className="logos-wrapper flex items-center justify-center h-24 bg-gray-50 rounded-lg p-4">
                <svg className="w-full h-full text-gray-400" viewBox="0 0 100 50" fill="currentColor">
                  <text x="50" y="30" textAnchor="middle" className="text-sm font-semibold">DESIGN</text>
                </svg>
              </div>
              <div className="logos-wrapper flex items-center justify-center h-24 bg-gray-50 rounded-lg p-4">
                <svg className="w-full h-full text-gray-400" viewBox="0 0 100 50" fill="currentColor">
                  <text x="50" y="30" textAnchor="middle" className="text-sm font-semibold">STUDIO</text>
                </svg>
              </div>
            </div>
            <div className="brands-grid slide-up-animation grid grid-cols-4 gap-8">
              <div className="logos-wrapper flex items-center justify-center h-24 bg-gray-50 rounded-lg p-4">
                <svg className="w-full h-full text-gray-400" viewBox="0 0 100 50" fill="currentColor">
                  <text x="50" y="30" textAnchor="middle" className="text-sm font-semibold">CREATIVE</text>
                </svg>
              </div>
              <div className="logos-wrapper flex items-center justify-center h-24 bg-gray-50 rounded-lg p-4">
                <svg className="w-full h-full text-gray-400" viewBox="0 0 100 50" fill="currentColor">
                  <text x="50" y="30" textAnchor="middle" className="text-sm font-semibold">AGENCY</text>
                </svg>
              </div>
              <div className="logos-wrapper flex items-center justify-center h-24 bg-gray-50 rounded-lg p-4">
                <svg className="w-full h-full text-gray-400" viewBox="0 0 100 50" fill="currentColor">
                  <text x="50" y="30" textAnchor="middle" className="text-sm font-semibold">PORTFOLIO</text>
                </svg>
              </div>
              <div className="logos-wrapper flex items-center justify-center h-24 bg-gray-50 rounded-lg p-4">
                <svg className="w-full h-full text-gray-400" viewBox="0 0 100 50" fill="currentColor">
                  <text x="50" y="30" textAnchor="middle" className="text-sm font-semibold">WORKS</text>
                </svg>
              </div>
            </div>
          </div>
          <div className="space-7rem"></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section">
        <div className="w-layout-blockcontainer container padding-4-5rem w-container">
          <div className="services-flex grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="services-wrapper slide-from-left-animation space-y-8">
              <div className="services-card">
                <div className="services-title-flex flex items-start space-x-4 mb-4">
                  <div className="services-icon w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)'}}></div>
                  </div>
                  <h4 className="caps text-lg font-semibold uppercase tracking-wider">BRANDING</h4>
                </div>
                <div className="services-text-block">
                  <p className="self-align-left text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis, dolor sed consectetur gravida.</p>
                </div>
              </div>
              
              <div className="services-card">
                <div className="services-title-flex flex items-start space-x-4 mb-4">
                  <div className="services-icon w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: 'linear-gradient(135deg, #667eea, #764ba2)'}}></div>
                  </div>
                  <h4 className="caps text-lg font-semibold uppercase tracking-wider">MARKETING</h4>
                </div>
                <div className="services-text-block">
                  <p className="self-align-left text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis, dolor sed consectetur gravida.</p>
                </div>
              </div>
              
              <p className="max-width-30rem text-gray-600 leading-relaxed max-w-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis, dolor sed consectetur gravida.</p>
            </div>
            
            <div className="services-wrapper slide-from-right-animation space-y-8">
              <h5 className="text-sm font-medium text-gray-600 tracking-wider uppercase mb-2">Creative Solutions</h5>
              <h2 className="services-title text-4xl md:text-5xl font-bold text-black tracking-tight mb-8">SERVICES</h2>
              
              <div className="services-card">
                <div className="services-title-flex flex items-start space-x-4 mb-4">
                  <div className="services-icon w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: 'linear-gradient(135deg, #11998e, #38ef7d)'}}></div>
                  </div>
                  <h4 className="text-lg font-semibold uppercase tracking-wider">DEVELOPMENT</h4>
                </div>
                <div className="services-text-block">
                  <p className="text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis, dolor sed consectetur gravida.</p>
                </div>
              </div>
              
              <div className="services-card">
                <div className="services-title-flex flex items-start space-x-4 mb-4">
                  <div className="services-icon w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: 'linear-gradient(135deg, #ff758c, #ff7eb3)'}}></div>
                  </div>
                  <h4 className="caps text-lg font-semibold uppercase tracking-wider">DESIGN</h4>
                </div>
                <div className="services-text-block">
                  <p className="self-align-left text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis, dolor sed consectetur gravida.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section className="section">
        <div className="w-layout-blockcontainer container w-container">
          <div className="space-7rem"></div>
          <div className="works-title-wrapper relative overflow-hidden text-center py-16">
            <h2 className="works-title text-6xl md:text-7xl lg:text-8xl font-bold text-black absolute inset-0 flex items-center justify-center">My Works</h2>
            <h2 className="works-title outline-white text-6xl md:text-7xl lg:text-8xl font-bold text-transparent stroke-2 stroke-white absolute inset-0 flex items-center justify-center" style={{
              WebkitTextStroke: '2px #fff',
              transform: 'translateX(20px)'
            }}>My Works</h2>
            <h2 className="works-title text-6xl md:text-7xl lg:text-8xl font-bold text-black relative z-10">My Works</h2>
            <h2 className="works-title outline-white text-6xl md:text-7xl lg:text-8xl font-bold text-transparent stroke-2 stroke-white absolute inset-0 flex items-center justify-center" style={{
              WebkitTextStroke: '2px #fff',
              transform: 'translateX(-20px)'
            }}>My Works</h2>
          </div>
        </div>
      </section>
      
      {/* Works Gallery Section */}
      <section className="section background-black bg-black">
        <div className="w-layout-blockcontainer container overflow w-container">
          <div className="space-4rem py-16"></div>
          <div className="slide-up-animation">
            <div className="works-wrapper grid grid-cols-1 gap-8">
              <div className="works-block relative group cursor-pointer">
                <div className="works-link-wrapper block relative overflow-hidden rounded-lg">
                  <div className="works-icon-wrapper absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                    <h5 className="works-hover text-white font-semibold">View Work</h5>
                  </div>
                  <div className="works-image-wrapper relative h-96 overflow-hidden">
                    <div className="parallax-image w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                         style={{
                           backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                         }}>
                    </div>
                    <div className="parallax-trigger absolute inset-0"></div>
                  </div>
                </div>
                <div className="works-text-block mt-6">
                  <h3 className="caps text-white text-xl font-bold mb-4">Creative Project</h3>
                  <div className="works-flex flex gap-4">
                    <div className="works-badge">
                      <h5 className="text-sm text-gray-300 px-3 py-1 bg-gray-800 rounded">Design</h5>
                    </div>
                    <div className="works-badge">
                      <h5 className="text-sm text-gray-300 px-3 py-1 bg-gray-800 rounded">Branding</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Metrics Section */}
      <section className="section">
        <div className="w-layout-blockcontainer container padding-9rem w-container">
          <div className="space-7rem"></div>
          <div className="metrics-wrapper grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="metrics-block">
              <h2 className="metrics-text text-6xl font-bold text-black mb-4">124</h2>
              <p className="text-gray-600 text-lg">Customers</p>
            </div>
            <div className="metrics-block">
              <h2 className="metrics-text text-6xl font-bold text-black mb-4">7</h2>
              <p className="text-gray-600 text-lg">Awards</p>
            </div>
            <div className="metrics-block">
              <h2 className="metrics-text text-6xl font-bold text-black mb-4">85</h2>
              <p className="text-gray-600 text-lg">Projects</p>
            </div>
          </div>
          <div className="space-7rem"></div>
        </div>
      </section>
      
      {/* Reviews Section */}
      <section className="section">
        <div className="w-layout-blockcontainer container padding-9rem w-container">
          <div className="reviews-slider slide-up-animation bg-white rounded-lg p-12 shadow-lg">
            <div className="reviews-slide text-center max-w-4xl mx-auto">
              <div className="mb-8">
                <svg className="w-12 h-12 mx-auto text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              <h4 className="text-2xl font-medium text-gray-900 mb-8 leading-relaxed">
                I was blown away by his creativity in<br/>
                creating a memorable brand identity. His<br/>
                design work has helped us stand out.
              </h4>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-4"></div>
                <div className="review-name-block">
                  <h5 className="font-semibold text-gray-900">Davis Jones</h5>
                  <h5 className="font-primary text-gray-500">entrepreneur</h5>
                </div>
              </div>
            </div>
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