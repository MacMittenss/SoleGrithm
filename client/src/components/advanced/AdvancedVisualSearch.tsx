import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { Camera, Search, Zap, ArrowRight, Sparkles, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SplitText from './SplitText';
import GradientText from './GradientText';

export default function AdvancedVisualSearch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Demo scan animation
  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  // Animated scanning lines
  useEffect(() => {
    if (!demoRef.current || !isScanning) return;

    const ctx = gsap.context(() => {
      const scanLines = demoRef.current?.querySelectorAll('.scan-line');
      if (scanLines && scanLines.length > 0) {
        gsap.fromTo(scanLines,
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.1,
            repeat: 3,
            yoyo: true
          }
        );
      }
    }, demoRef);

    return () => ctx.revert();
  }, [isScanning]);

  return (
    <motion.section
      ref={containerRef}
      className="section background-black"
      style={{ y, opacity }}
      data-testid="section-visual-search"
    >
      <div className="w-layout-blockcontainer container padding-4-5rem w-container">
        <div className="space-7rem"></div>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(0, 150, 255, 0.1)',
                border: '1px solid rgba(0, 150, 255, 0.2)',
              }}
              whileHover={{ scale: 1.05 }}
            >
              <Camera className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">VISUAL AI SEARCH</span>
            </motion.div>

            {/* Main Title */}
            <div>
              <h2 className="font-c" style={{ 
                color: 'var(--white)',
                letterSpacing: '-.07vw',
                textTransform: 'capitalize',
                marginTop: 0,
                marginBottom: 0,
                fontSize: '4.44vw',
                fontWeight: 500,
                lineHeight: '5vw'
              }}>
                <SplitText type="words" delay={0.3}>
                  Snap, Search,
                </SplitText>
                <br />
                <GradientText className="block">
                  Discover
                </GradientText>
              </h2>
              
              <motion.p
                style={{ 
                  color: 'var(--white)',
                  letterSpacing: '.07vw',
                  marginBottom: 0,
                  fontSize: '1.11vw',
                  fontWeight: 300,
                  lineHeight: '1.89vw',
                  maxWidth: '42.22vw'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Revolutionary AI-powered visual search technology. Take a photo of any sneaker 
                and instantly discover similar styles, pricing, and availability across the globe.
              </motion.p>
            </div>

            {/* Feature list */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {[
                { icon: Eye, title: 'Instant Recognition', desc: '99.7% accuracy in sneaker identification' },
                { icon: Search, title: 'Smart Matching', desc: 'Find similar styles and colorways' },
                { icon: Zap, title: 'Real-time Results', desc: 'Get results in under 2 seconds' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mt-1"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 150, 255, 0.1), rgba(100, 50, 255, 0.1))',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <feature.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{feature.title}</h4>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <Button
                className="group relative px-8 py-4 text-lg font-semibold text-white overflow-hidden"
                style={{
                  background: 'linear-gradient(to right, #0096ff 0%, #6450ff 61%, #ff6496 100%)',
                }}
                onClick={startScan}
                data-testid="button-try-visual-search"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Try Visual Search
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Interactive Demo Column */}
          <motion.div
            ref={demoRef}
            className="relative"
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Phone mockup with camera interface */}
            <div
              className="relative mx-auto w-80 h-[600px] rounded-[3rem] p-4"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Screen */}
              <div className="w-full h-full bg-black rounded-[2.5rem] relative overflow-hidden">
                {/* Camera viewfinder */}
                <div className="absolute inset-4 border-2 border-white/30 rounded-2xl flex items-center justify-center">
                  {/* Sneaker placeholder */}
                  <motion.div
                    className="w-48 h-32 rounded-lg flex items-center justify-center text-6xl"
                    style={{
                      background: 'linear-gradient(135deg, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                    }}
                    animate={isScanning ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.5, repeat: isScanning ? 5 : 0 }}
                  >
                    👟
                  </motion.div>

                  {/* Scanning overlay */}
                  {isScanning && (
                    <>
                      {/* Corner brackets */}
                      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-blue-400" />
                      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-blue-400" />
                      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-blue-400" />
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-blue-400" />

                      {/* Scanning lines */}
                      <motion.div
                        className="scan-line absolute inset-x-4 h-0.5 bg-blue-400"
                        style={{ top: '20%' }}
                        animate={{ top: ['20%', '80%', '20%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                      <motion.div
                        className="scan-line absolute inset-y-4 w-0.5 bg-blue-400"
                        style={{ left: '30%' }}
                        animate={{ left: ['30%', '70%', '30%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
                      />
                    </>
                  )}
                </div>

                {/* Camera UI elements */}
                <div className="absolute bottom-6 inset-x-6">
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white/70" />
                    </div>
                    
                    <motion.button
                      className="w-16 h-16 rounded-full border-4 border-white bg-white/20"
                      onClick={startScan}
                      whileTap={{ scale: 0.9 }}
                      animate={isScanning ? { 
                        boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0.7)', '0 0 0 20px rgba(59, 130, 246, 0)']
                      } : {}}
                      transition={{ duration: 1, repeat: isScanning ? Infinity : 0 }}
                    >
                      <Camera className="w-8 h-8 text-white mx-auto" />
                    </motion.button>

                    <div className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center">
                      <Search className="w-6 h-6 text-white/70" />
                    </div>
                  </div>
                </div>

                {/* Results overlay */}
                {isScanning && (
                  <motion.div
                    className="absolute inset-6 bg-black/80 rounded-2xl flex flex-col justify-center items-center text-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    <motion.div
                      className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"
                    />
                    <h4 className="text-white font-semibold mb-2">Analyzing...</h4>
                    <p className="text-white/70 text-sm">AI is identifying your sneaker</p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Floating result cards */}
            <motion.div
              className="absolute -right-8 top-1/3 transform -translate-y-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div
                className="w-48 p-4 rounded-2xl backdrop-blur-xl border border-white/10"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                }}
              >
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Match Found</div>
                  <div className="font-semibold text-white mb-1">Nike Air Jordan 1</div>
                  <div className="text-sm text-green-400">97% Match</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="space-7rem"></div>
      </div>
    </motion.section>
  );
}