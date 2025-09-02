import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Serve static assets
app.use('/images', express.static(path.join(__dirname, '..', 'images')));
app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

// Simple React app serving (development approach)
app.get('/', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SoleGrithm - Sneaker Community Platform</title>
    <style>
      :root {
        --black: #050505;
        --white: whitesmoke;
        --secondary: #1c1c1c;
        --light-gray: #e7e7e9;
        --primary: var(--white);
        --border-radius: 24px;
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        background-color: var(--black);
        color: var(--white);
        font-family: Inter, sans-serif;
        font-size: 1rem;
        line-height: 1.4;
        overflow-x: hidden;
      }
      
      .navbar {
        position: fixed;
        top: 0;
        width: 100%;
        padding: 1rem 2rem;
        z-index: 1000;
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .brand-text {
        color: var(--white);
        font-size: 1.5rem;
        font-weight: 600;
        letter-spacing: -0.02em;
        text-decoration: none;
      }
      
      .hero-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        background: radial-gradient(circle at center, #161616 0%, #050505 100%);
      }
      
      .hero-wrapper {
        text-align: center;
        z-index: 10;
      }
      
      .heading {
        letter-spacing: 0.14rem;
        text-transform: uppercase;
        font-size: 0.9rem;
        font-weight: 400;
        margin-bottom: 1rem;
        opacity: 0.8;
      }
      
      .hero-text {
        font-size: clamp(3rem, 8vw, 6rem);
        font-weight: 600;
        letter-spacing: -0.02em;
        margin-bottom: 2rem;
        background: linear-gradient(135deg, #ffffff 0%, #dbec62 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .arrow-border-wrapper {
        display: inline-block;
        padding: 1rem;
        border: 2px solid var(--white);
        border-radius: 50%;
        transition: all 0.3s ease;
        text-decoration: none;
      }
      
      .arrow-border-wrapper:hover {
        background-color: var(--white);
        transform: scale(1.1);
      }
      
      .arrow-border-wrapper:hover .arrow {
        filter: invert(1);
      }
      
      .arrow {
        width: 24px;
        height: 24px;
        transition: filter 0.3s ease;
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.8);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      .heading {
        animation: fadeInUp 0.8s ease 0.2s both;
      }
      
      .hero-text {
        animation: scaleIn 1.2s ease 0.4s both;
      }
      
      .arrow-border-wrapper {
        animation: fadeInUp 0.6s ease 0.8s both;
      }
    </style>
  </head>
  <body>
    <nav class="navbar">
      <a href="/" class="brand-text">SoleGrithm</a>
    </nav>
    
    <section class="hero-section">
      <div class="hero-wrapper">
        <h5 class="heading">Welcome To</h5>
        <h1 class="hero-text">SoleGrithm</h1>
        <a href="#about" class="arrow-border-wrapper">
          <svg class="arrow" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 17L17 7M17 7H7M17 7V17"/>
          </svg>
        </a>
      </div>
    </section>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script>
      // GSAP Animation enhancements
      gsap.registerPlugin(ScrollTrigger);
      
      // Enhanced hero animations
      const tl = gsap.timeline({ delay: 0.5 });
      tl.fromTo(".heading", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(".hero-text", 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.7)" }, "-=0.4"
      )
      .fromTo(".arrow-border-wrapper", 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.6"
      );
      
      // Navbar entrance
      gsap.fromTo(".navbar", 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.2 }
      );
      
      console.log("🎉 SoleGrithm loaded with GSAP animations!");
    </script>
  </body>
</html>`;
  
  res.send(html);
});

// Original Webflow template
app.get('/original', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 SoleGrithm hero section running on http://localhost:${PORT}`);
  console.log(`⚛️  "Welcome To SoleGrithm" ready with GSAP animations!`);
  console.log(`📁 Original Webflow template at /original`);
});

export default app;